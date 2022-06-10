<template>
    <view class="page-content">
        <view v-if="canShow == 1">
            <view class="containerBase">
                <live-pusher v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4" @statechange="onPushStateChange"
                    mode="RTC" min-bitrate="1500" @netstatus="onPushNetStateChange"
                    waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                <live-player v-for="item in livePlayerList" :key="item.streamID" :id="item.streamID" :src="item.url"
                    min-cache="0.3" max-cache="0.8" mode="RTC" autoplay @statechange="onPlayStateChange"
                    @netstatus="onPlayNetStateChange"></live-player>
            </view>
            <scroll-view class="message-view" scroll-y="true" :scroll-into-view="scrollToView">
                <view class="message-item" v-for="item in messageList" :key="indeitem.ID" :id="item.ID">
                    <view>
                        <span>{{ item.name }}:</span>
                        {{ item.content }}
                    </view>
                </view>
            </scroll-view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                    <input v-model="message" confirm-type='send' @confirm="sendMsg" placeholder="说点什么吧～"
                        placeholder-style='color: #b3b3b3; font-size: 14px;' class="msg-input" />
                </view>
                <view>

                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none" >
                        加入房间(推流)
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none" >
                        加入房间(不推流)
                    </button>
                    <button @tap="sendMsg" hover-class="none" >广播发送</button>
                    <button @tap="sendBarrageMsg" hover-class="none" >弹幕发送</button>
                    <button @tap="sendCustomCommand" hover-class="none" >指定发送</button>
                    <button @tap="updateStreamExtra" hover-class="none" >更新信息</button>
                    <button @tap="setRoomExtraInfo" hover-class="none" >发送可靠消息</button>
                    <button @tap="logout" hover-class="none" class="logout-room">退出房间</button>
                </view>
            </view>
        </view>
        <view class="settings">
            <button v-if="canShow == 0" open-type="openSetting" @opensetting="settingCallback">
                授权使用摄像头和麦克风
            </button>
        </view>
    </view>
</template>

<script>
import commonMixin from '../../mixin/common-mixin'
import { initSDK, authCheck } from '../../utils/common';

let { zegoAppID, server } = getApp().globalData;
let zg;
export default {
    mixins: [commonMixin], // 方法混合，包含登录房间，推拉流，退出房间
    data() {
        return {
            message: '',
            scrollToView: "",
            messageList: [],
        }
    },
    async onReady() {
        zg = initSDK(this);
        console.log("message sdk version: ", zg.getVersion());
        console.log(zg);
        this._zg = zg // _zg不监听，监听会报错
        zg && this.bindCallback();
    },
    onShow() {
        console.log('server: ', server);
        authCheck(this);
        if (zg && this.roomID) {
            this.reLogin();
        }
        this._zg = zg // _zg不监听，监听会报错
        // 刷新全局变量
        zegoAppID = getApp().globalData.zegoAppID;
        server = getApp().globalData.server;
    },
    methods: {
        async sendMsg() {
            let message = {
                ID: this.userID + new Date().getTime(),
                name: this.userID,
                // @ts-ignore
                time: new Date().format("hh:mm:ss"),
                content: this.message,
            };
            console.log('>>> currentMessage', this.message);
            this.messageList = [...this.messageList, message]
            this.scrollToView = message.ID
            try {
                const isSent = await zg.sendBroadcastMessage(this.roomID, this.message)
                console.log('>>> sendMsg success, ', isSent);
            } catch (error) {
                console.log('>>> sendMsg, error: ', error);
            };
        },
        async sendBarrageMsg() {
            let message = {
                ID: this.userID + new Date().getTime(),
                name: this.userID,
                // @ts-ignore
                time: new Date().format("hh:mm:ss"),
                content: this.message,
            };
            console.log('>>> barrageMessage', this.message);
            this.messageList = [...this.messageList, message]
            this.scrollToView = message.ID
            try {
                const isSent = await zg.sendBarrageMessage(this.roomID, this.message)
                console.log('>>> barrageMessage success, ', isSent);
            } catch (error) {
                console.log('>>> barrageMessage, error: ', error);
            };
        },
        updateStreamExtra() {
            zg.setStreamExtraInfo(this.pushStreamID, 'setStreamExtraInfo test, send at ' + new Date().toLocaleString())
        },
        setRoomExtraInfo() {
            zg.setRoomExtraInfo(this.pushStreamID, '2', 'ReliableMessage test002')
        },
        async sendCustomCommand() {
            console.error(this.roomUserList);
            const toUserList = this.roomUserList.map(item => {
                return item.userID
            });
            try {
                const res = await zg.sendCustomCommand(this.roomID, this.message, toUserList);
                console.warn('send custom success ' + res)
            } catch (error) {
                console.error(JSON.stringify(error))
            }
        },
        async bindCallback() {
            zg.on('playerStateUpdate', (result) => {
                console.log('playStateUpdate', result);
            });
            zg.on('publisherStateUpdate', (result) => {
                console.log('publishStateChange', result);
            });
            zg.on('IMRecvBroadcastMessage', (roomID, chatData) => {
                
                console.log('IMRecvBroadcastMessage', roomID, chatData);
                let message = {
                    ID: 'zego' + chatData[0].fromUser.userID + chatData[0].sendTime,
                    name: chatData[0].fromUser.userName,
                    // @ts-ignore
                    time: format(chatData[0].sendTime),
                    content: chatData[0].message + '(广播发送)'
                }
                this.messageList = [...this.messageList, message]
                this.scrollToView = message.ID
            });
            zg.on('IMRecvCustomCommand', (roomID, fromUser, command) => {
                
                console.log('IMRecvCustomCommand', roomID, fromUser, command);
                let message = {
                    ID: fromUser.userID,
                    name: fromUser.userName,
                    time: format(new Date().getTime()),
                    content: command + '(自定义发送)'
                }
                this.messageList = [...this.messageList, message]
                this.scrollToView = message.ID
            });
            zg.on('roomExtraInfoUpdate', (roomID, roomExtraInfoList) => {
                console.error('roomExtraInfoUpdate', roomID, roomExtraInfoList);
            })
            zg.on('IMRecvBarrageMessage', (roomID, chatData) => {
                
                console.log('IMRecvBroadcastMessage', roomID, chatData);
                let message = {
                    ID: 'zego' + chatData[0].fromUser.userID + chatData[0].sendTime,
                    name: chatData[0].fromUser.userName,
                    // @ts-ignore
                    time: format(chatData[0].sendTime),
                    content: chatData[0].message + '(弹幕发送)'
                }
                this.messageList = [...this.messageList, message]
                this.scrollToView = message.ID
            });
            zg.on('streamExtraInfoUpdate', (roomID, streamList) => {
                console.log('streamExtraInfoUpdate', roomID, streamList);
                let _content = '';
                streamList.forEach(item => {
                    _content += `${item.user.userID} set stream ${item.streamID} extraInfo ${item.extraInfo} \n`;
                })
                uni.showModal({
                    title: '流附加消息',
                    content: _content,
                    showCancel: false,
                })
            });

        },
    }
}
</script>

<style>
</style>