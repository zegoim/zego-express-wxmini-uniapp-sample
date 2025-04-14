<template>
    <view class="page-content">
        <view v-if="canShow == 1">
            <view class="containerBase">
                <live-pusher v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4" @statechange="onPushStateChange"
                    @netstatus="onPushNetStateChange"
                    waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                <live-player v-for="item in livePlayerList" :key="item.streamID" :id="item.streamID" :src="item.url"
                    mode="RTC" autoplay @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange">
                </live-player>
            </view>
            <scroll-view class="message-view" scroll-y="true" :scroll-into-view="scrollToView">
                <view class="message-item" v-for="item in messageList" :key="item.id" id="item.id">
                    <view>
                        <span>{{ item.name }}:</span>
                        <image v-if="item.isImg" :src="item.content" alt=""></image>
                        <text v-else>{{ item.content }}</text>
                    </view>
                </view>
            </scroll-view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none" class="util-btn">
                        加入房间
                    </button>
                    <button @tap="snapshot" data-type="1" class="util-btn">推流截图</button>
                    <button @tap="snapshot" data-type="0" class="util-btn">拉流截图</button>
                    <!-- <button @tap="logout" hover-class="none" class="util-btn">退出房间</button> -->
                </view>
            </view>
        </view>
        <setting-camera-record :canShow="canShow" />
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
            scrollToView: "",
            messageList: []
        }
    },
    onReady() {
        zg = initSDK(this);
        this._zg = zg // _zg不监听，监听会报错
        this.bindCallback();
    },
    onShow() {
        console.log('server: ', server);
        authCheck(this);
        // if (zg && this.roomID) {
        //     this.reLogin();
        // }
        this._zg = zg // _zg不监听，监听会报错
        // 刷新全局变量
        zegoAppID = getApp().globalData.zegoAppID;
        server = getApp().globalData.server;
    },
    methods: {
        async bindCallback() {
            zg.on('IMRecvBroadcastMessage', (roomID, chatData) => {
                console.log('IMRecvBroadcastMessage', roomID, chatData);
                const isImg = /.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(chatData[0].message);
                let message = {
                    id: chatData[0].fromUser.userID + chatData[0].sendTime,
                    name: chatData[0].fromUser.userName,
                    // @ts-ignore
                    time: format(result[0].sendTime),
                    content: chatData[0].message,
                    isImg
                }
                this.messageList = [...this.messageList, message]
                this.scrollToView = message.id
            });
        },

        async snapshot(e) {
            const sucCallback = async (ret) => {
                console.log('ret', ret.tempImagePath);
                // uni.showLoading({ title: '正在上传...' });
                const imgPath = 'sdk-doc/mini-snapshot-' + new Date().getTime() + '.jpg'
                setTimeout(async () => {
                    const saveRes = await uni.showModal({
                        title: '提示',
                        content: '是否保存到手机相册',
                    });
                    if (saveRes.confirm) {
                        console.log('saveImageToPhotosAlbum confirm');
                        uni.hideLoading()
                        this._saveImageToPhotosAlbum(ret.tempImagePath);
                    } else if (saveRes.cancel) {
                        uni.hideLoading();
                        console.log('saveImageToPhotosAlbum cancel');
                    }
                }, 3000)
            }
            const failCallback = (err) => {
                console.log('snapshot fail', err)
            }
            if (e.target.dataset && e.target.dataset.type == "1") {
                this.livePusher && this.livePusher.snapshot({
                    success: sucCallback,
                    fail: failCallback,
                });
            } else if (e.target.dataset && e.target.dataset.type == "0") {
                // show live-player how to use snapshot
                const _livePlayer = this.livePlayerList[0]
                if(!_livePlayer) return
                const livePlayerContext = uni.createLivePlayerContext(_livePlayer.streamID)
                livePlayerContext.snapshot({
                    success: sucCallback,
                    fail: failCallback,
                });
            }
        },
        async _saveImageToPhotosAlbum(imgPath) {
            // 保存图片到本地相册
            const settingInfo = await uni.getSetting({});
            if (!settingInfo.authSetting['scope.writePhotosAlbum']) {
                await uni.authorize({ scope: 'scope.writePhotosAlbum' })
                console.log('授权成功')
                try {
                    const res = await uni.saveImageToPhotosAlbum({ filePath: imgPath });
                    console.log('writePhotosAlbum', res);
                } catch (err) {
                    console.log('writePhotosAlbum', err);
                }
            } else if (settingInfo.authSetting['scope.writePhotosAlbum']) {
                try {
                    const res = await uni.saveImageToPhotosAlbum({ filePath: imgPath });
                    console.log('writePhotosAlbum', res);
                } catch (err) {
                    console.log('writePhotosAlbum', err);
                }
            }
        },
    }
}
</script>

<style>
</style>