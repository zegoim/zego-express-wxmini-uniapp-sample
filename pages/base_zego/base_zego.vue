<template>
    <view class="page-content">
        <template v-if="canShow == 1">
            <view>
                <view class="containerBase">
                    <zego-pusher id="zegoPusher" :pusher="pusher" />
                    <zego-player v-for="item in zegoPlayerList" :key="id" :id="item.componentID"
                        :playerId="item.playerId" :playerList="zegoPlayerList" />
                </view>
                <view class="index-container">
                    <view class='input-container'>
                        <input v-model="roomID" placeholder="请输入房间 ID"
                            placeholder-style='color: #b3b3b3; font-size: 14px;' class="room-input" />
                        <text class="tip" />

                    </view>
                    <view class="button-container">
                        <button @tap="openRoom" data-role="1" data-option="videoAndAudio" hover-class="none"
                            class="openRoom">
                            加入房间(推流)
                        </button>
                        <button @tap="openRoom" data-role="0" hover-class="none" class="openRoom">
                            加入房间(不推流)
                        </button>
                        <button @tap="openRoom" data-role="1" data-option="audio" hover-class="none" class="openRoom">
                            加入房间(推纯音频)
                        </button>
                        <button @tap="openRoom" data-role="1" data-option="video" hover-class="none" class="openRoom">
                            加入房间(推纯视频)
                        </button>
                        <button @tap="pausePush" data-role="1" data-option="video" hover-class="none" class="openRoom">
                            暂停推流
                        </button>
                        <button @tap="resumePush" data-role="1" data-option="video" hover-class="none" class="openRoom">
                            恢复推流
                        </button>
                        <button class="logout-room" @tap="logout" hover-class="none">退出房间</button>
                    </view>
                </view>
            </view>
        </template>
        <setting-camera-record :canShow="canShow" />
    </view>
</template>

<script>
import {
    getLoginToken
} from '../../utils/server';
import {
    initSDK,
    authCheck,
    startPush,
} from '../../utils/common_zego';
let {
    zegoAppID,
    server
} = getApp().globalData;
let zg
export default {
    data() {
        return {
            roomID: '001',
            pushStreamID: 'xcx-streamID-' + new Date().getTime(), // 推流ID
            userID: 'xcx-userID-' + new Date().getTime(), // 用户ID,
            livePlayerList: [],
            connectType: -1, // -1为初始状态，1为连接，0断开连接
            canShow: -1,
            role: '',
            roomUserList: [],
            handupStop: false,
            mirror: true,
            num: 0,
            livePlaying: [],
            isReLoginging: false,
            pusher: {},  // live-pusher的属性，sdk进行管理
            playerList: [],  // live-player的属性列表，sdk进行管理
            zegoPlayerList: [],  // 组件列表
        }
    },
    async onReady() {
        console.log('onReady')
        zg = initSDK(this, "pusher", "playerList");
        console.log("zg", zg);
        console.log('sdk version: ', zg.getVersion());
    },
    onShow() {
        console.log('onShow: ', this.handupStop, this.connectType, server);
        authCheck(this);
        // 初始化 zego-player列表
        this.zegoPlayerList = []
        if (zg && this.roomID) {
            // this.reLogin();
        }
        // 刷新全局变量
        zegoAppID = getApp().globalData.zegoAppID;
        server = getApp().globalData.server;

    },
    onHide() {
        this.logout();
    },
    onUnload() {
        this.logout();
        uni.offNetworkStatusChange()
    },
    onLoad() {
        // 监听网络状态
        this.onNetworkStatus()
    },
    methods: {
        async openRoom(e) {
            console.log(this)
            if (!this.roomID) {
                uni.showModal({
                    title: '提示',
                    content: '请输入房间号',
                    showCancel: false,
                });
                return;
            }
            if (this.connectType !== 1) {
                console.log(this)
                try {
                    /** 获取token */
                    const token = await getLoginToken(zegoAppID, this.userID);
                    /** 开始登录房间 */
                    let isLogin = await zg.loginRoom(this.roomID, token, {
                        userID: this.userID,
                        userName: 'nick' + this.userID
                    }, {
                        userUpdate: true
                    });
                    isLogin ? console.log('login success') : console.error('login fail');
                    this.connectType = 1
                    // zg.setCustomSignalUrl([`rtmp://120.77.40.218/zegostg/${this.pushStreamID}`]); //wss://webrtctest.zego.im/ws?a=webrtc-demo
                } catch (error) {
                    console.error('error: ', error);
                    return;
                }
            }
            // 创建房间，开始推流
            if (e.target.dataset && e.target.dataset.role == 1) {
                let config = { mode: "SD" };
                if (e.target.dataset.option == "video") {
                    config.enableMic = false;
                } else if (e.target.dataset.option == "audio") {
                    config.enableCamera = false;
                }
                this.config = config
                // 将zg实例传递给组件。
                const zegoPusher = this.selectComponent("#zegoPusher").$vm || this.selectComponent("#zegoPusher") 
                await zegoPusher.startPush (zg, this.pushStreamID, undefined, this.config);
            }
            this.role = e.target.dataset.role
        },
        async logout() {
            try {
                if (this.pusher && this.pusher.url) {
                    zg.getPusherInstance().stop()
                }

                this.playerList && this.playerList.forEach(i => {
                    zg.getPlayerInstance(i.id).stop()
                })

                this.setData({
                    zegoPlayerList: []
                })
                /** 登出房间 */
                if (zg && this.connectType === 1) await zg.logoutRoom();
            } catch (error) {
                console.error('error: ', error);
            }

        },
        //  //切换拉流
        async reLogin() {
            console.error("重新登录")

            if (this.isReLoginging) return;
            this.isReLoginging = true;
            try {
                await zg.logoutRoom();
                // this.livePusher && (this.livePusher! as wx.LivePusherContext).stop();
                let token = await getLoginToken(zegoAppID, this.userID);
                if (!token) {
                    console.error("获取token 失败");
                    this.reLogin();
                    return
                }
                this.token = token
                console.error('login ', this.userID, this.token, this.roomID, zegoAppID);
                let isLogin = await zg.loginRoom(this.roomID, this.token, {
                    userID: this.userID,
                    userName: 'nick' + this.userID
                });
                isLogin ? console.log('login success') : console.error('login fail');
                this.connectType = 1;
                //console.log('pushStream: ', this.pushStreamID, this.livePusherUrl, this.role);
                if (this.role == 1) {
                    startPush(this.pushStreamID, undefined, this.config)
                }
                this.isReLoginging = false;

            } catch (error) {
                console.error('error: ', error);
            }
        },
        // 停止推流
        pausePush() {
            zg.getPusherInstance().pause({
                success: () => {
                    console.warn(" success")
                },
                fail: (e) => {
                    console.warn(" fail " + e)
                },
                complete: () => {
                    console.warn("complete")
                }
            })
        },
        onNetworkStatus() {
            uni.onNetworkStatusChange(res => {
                if (res.isConnected && this.connectType === 1 && zg) {
                    console.warn('data', this.data);
                    console.warn('roomID', this.roomID);
                    this.reLogin();
                }
            })
        },
        resumePush() {
            zg.getPusherInstance().resume({
                success: () => {
                    console.warn(" success")
                },
                fail: (e) => {
                    console.warn(" fail " + e)
                },
                complete: () => {
                    console.warn("complete")
                }
            })
        }
    }
}
</script>

<style>
</style>