<template>
    <view class="page-content">
        <view v-if="canShow == 1" class="">
            <view class="containerBase">
                <live-pusher class="testpusher" v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4"
                    @statechange="onPushStateChange" mode="SD" min-bitrate="800" max-bitrate="1500"
                    @netstatus="onPushNetStateChange"
                    waiting-image="https://storage.zego.im/downloads/pause_publish.png">
                </live-pusher>
                <live-player v-for="item in livePlayerList" :key="item.streamID" :id="item.streamID" :src="item.url"
                    mode="RTC" autoplay enable-metadata="true" @metadatachange="binddatachange"
                    @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange"></live-player>

            </view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" data-role="roomID" placeholder="请输入房间 ID"
                        placeholder-style='color: #b3b3b3; font-size: 14px;' class="room-input" />
                    <text class="tip"></text>
                    <input v-model="userID" data-role="userID" placeholder="请输入用户 ID"
                        placeholder-style='color: #b3b3b3; font-size: 14px;' class="room-input" />
                    <text class="tip"></text>
                    <input v-model="token" maxlength="-1" data-role="token" placeholder="请输入 token"
                        placeholder-style='color: #b3b3b3; font-size: 14px;' class="room-input" />
                    <text class="tip"></text>
                </view>
                <view class="button-container">
                    <button @tap="loginRoom" data-role="0" hover-class="none" class="openRoom">
                        加入房间(不推流)
                    </button>
                    <button @tap="publishStream" data-role="1" hover-class="none" class="openRoom">
                        推流
                    </button>
                    <button @tap="renewToken" data-role="1" hover-class="none" class="openRoom">
                        更新token
                    </button>
                    <button @tap="logout" hover-class="none">退出房间</button>
                </view>
            </view>
        </view>
        <setting-camera-record :canShow="canShow" />
    </view>
</template>

<script>
import { initSDK, authCheck } from '../../utils/common';
import commonMixin from '../../mixin/common-mixin'

let { zegoAppID, server } = getApp().globalData;
let zg;
export default {
    mixins: [commonMixin],
    data() {
        return {
            mirror: true,
        }
    },
    async onReady() {
        getApp().globalData.zegoAppID = 383110717;
        getApp().globalData.server = 'wss://webliveroom383110717-api.zego.im/ws';
        console.log('onReady')
        zg = initSDK(this);
        console.log('sdk version: ', zg.getVersion());

        this._zg = zg // _zg不监听，监听会报错

        // 覆盖全局回调, 只是为了特殊处理推流鉴权失败, 主动停止推流
        zg.off("publisherStateUpdate")
        zg.on("publisherStateUpdate", (result) => {
            console.error("publishStateUpdate", result);
            if (result.state === "NO_PUBLISH") {
                zg.stopPublishingStream(this.pushStreamID);
                this.livePusher.stop();
                this.livePusherUrl = ''
            }
        });
    },
    onShow() {
        console.log('onShow: ', this.handupStop, this.connectType, server);
        authCheck(this);
        // if (zg && this.roomID) {
        //     this.reLogin();
        // }
        this._zg = zg // _zg不监听，监听会报错
        // 刷新全局变量
        zegoAppID = getApp().globalData.zegoAppID;
        server = getApp().globalData.server;

    },
    onUnload() {
        getApp().globalData.zegoAppID = 1739272706;
        getApp().globalData.server = 'wss://webliveroom-test.zego.im/ws';
        this.logout();
        uni.offNetworkStatusChange()
    },
    methods: {
        loginRoom(e) {
            if (!this.userID) {
                uni.showModal({
                    title: '提示',
                    content: '请输入用户ID',
                    showCancel: false,
                });
                return;
            }
            if (!this.token) {
                uni.showModal({
                    title: '提示',
                    content: '请输入token',
                    showCancel: false,
                });
                return;
            }
            this.openRoom(e)
        }
    }
}
</script>

<style>
</style>