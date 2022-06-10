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
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                    <text class="tip"></text>
                </view>
                <view class='input-container'>
                    <input v-model="secret" placeholder="请输入secret" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                    <text class="tip"></text>
                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none">
                        加入房间(推流)
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none">
                        加入房间(不推流)
                    </button>
                    <button @tap="addCdnPublish" data-role="0" hover-class="none">
                        增加转推cdn
                    </button>
                    <button @tap="removeCdnPublish" data-role="0" hover-class="none">
                        删除转推cdn
                    </button>
                    <button @tap="publishCdn" data-role="0" hover-class="none">
                        推流cdn
                    </button>
                    <button @tap="logout" class="logout-room" hover-class="none">退出房间</button>
                </view>
            </view>
        </view>
        <setting-camera-record :canShow="canShow" />
    </view>
</template>

<script>
import commonMixin from '../../mixin/common-mixin'
import { initSDK, authCheck } from '../../utils/common';
import md5 from '../../utils/md5.js'

let { zegoAppID, server } = getApp().globalData;
let zg;
export default {
    mixins: [commonMixin], // 方法混合，包含登录房间，推拉流，退出房间
    data() {
        return {
            secret: ''
        }
    },
    onReady() {
        zg = initSDK(this);
        this._zg = zg // _zg不监听，监听会报错
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
        async addCdnPublish() {
            if (!this.secret) {
                uni.showModal({
                    title: '提示',
                    content: '请输入secret',
                    showCancel: false,
                });
                return;
            }
            const result = await zg.addPublishCdnUrl(
                this.pushStreamID,
                //The calculation of the signature is recommended to be placed in the background server
                md5(zegoAppID + Math.ceil(new Date().getTime() / 1000).toString() + this.secret),
                'rtmp://wsdemo.zego.im/livestream/' + this.pushStreamID,
            );
            if (result.errorCode == 0) {
                console.warn('add push target success');

            } else {
                console.warn('add push target fail ' + result.errorCode);
            }

        },
        async removeCdnPublish() {
            const result = await zg.removePublishCdnUrl(
                this.pushStreamID,
                //The calculation of the signature is recommended to be placed in the background server
                'rtmp://wsdemo.zego.im/livestream/' + this.pushStreamID,
            );
            console.warn('result', result);
            if (result.errorCode == 0) {
                console.warn('remove push target success');
            } else {
                console.warn('remove push target fail ' + result.errorCode);
            }

        },
        async publishCdn() {
            this.startPush({ sourceType: 'CDN' });
        },
    }
}
</script>

<style>
</style>