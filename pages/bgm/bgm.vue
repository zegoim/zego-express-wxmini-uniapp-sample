<template>
    <view class="page-content">
        <view v-if="canShow == 1">
            <view class="containerBase">
                <live-pusher v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4" @statechange="onPushStateChange"
                    @netstatus="onPushNetStateChange" @bgmstart="onBgmStart" @bgmprogress="onBgmProgress"
                    @bgmcomplete="onBgmComplete" @error="onPushError"
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
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none">
                        加入房间(推流)
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none">
                        加入房间(不推流)
                    </button>
                    <button @tap="playOrStopBgm">
                        {{ bgmStart ? '停止背景音' : '播放背景音' }}
                    </button>
                    <button @tap="handleBgm">
                        {{ bgmPaused ? '恢复背景音' : '暂停背景音' }}
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

let { zegoAppID, server } = getApp().globalData;
let zg;
export default {
    mixins: [commonMixin], // 方法混合，包含登录房间，推拉流，退出房间
    data() {
        return {
            bgmStart: false,
            bgmPaused: false
        }
    },
    onReady() {
        zg = initSDK(this);
        this._zg = zg // _zg不监听，监听会报错
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
        if (this.bgmStart) {
            this.bgmStartEvent()

        }
    },
    methods: {
        playOrStopBgm() {
            if (!this.livePusher.playBGM) {
                uni.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
                    showCancel: false,
                });
                return;
            }
            this.bgmStart = !this.bgmStart
            if (this.bgmStart) {
                this.bgmStartEvent()
            } else {
                this.livePusher && this.livePusher.stopBGM();
            }
        },
        bgmStartEvent() {
            this.livePusher && this.livePusher.playBGM({
                url: 'https://zego-sdkdemospace.oss-cn-shanghai.aliyuncs.com/demo/bgm.mp3',
                success: function (res) {
                    console.log('suc', res)
                },
                fail: function (err) {
                    console.log('fail', err)
                }
            });
        },
        handleBgm() {
            if (!this.livePusher.pauseBGM) {
                uni.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。',
                    showCancel: false,
                });
                return;
            }
            if (!this.bgmStart) return;
            this.bgmPaused = !this.bgmPaused
            if (this.bgmPaused) {
                this.livePusher && this.livePusher.pauseBGM()
            } else {
                this.livePusher && this.livePusher.resumeBGM()
            }
        },
        onBgmStart(e) {
            console.log('onBgmStart', e);
        },
        onBgmProgress(e) {
            console.log('onBgmProgress', e);
        },
        onBgmComplete(e) {
            console.log('onBgmComplete', e);
        },
    }
}
</script>

<style>
</style>