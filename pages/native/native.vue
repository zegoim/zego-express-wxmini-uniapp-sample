<template>
    <view class="page-content">
        <view v-if="canShow == 1">
            <view class="live-wrapper">
                <view class="containerBase">
                    <live-pusher v-if="livePusherUrl" :url="livePusherUrl" mode="RTC" aspect="3:4"
                        :min-bitrate="pushConfig.minBitrate" :max-bitrate="pushConfig.maxBitrate"
                        :enable-camera="pushConfig.enableCamera" :muted="pushConfig.muted" :beauty="pushConfig.isBeauty"
                        :whiteness="pushConfig.isWhiteness" :mirror="pushConfig.isMirror"
                        :orientation="pushConfig.orientation" :debug="pushConfig.showLog"
                        @statechange="onPushStateChange" @netstatus="onPushNetStateChange" @error="onPushError"
                        @audiovolumenotify="onPushAudiovolumenotify"
                        waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                    <live-player v-for="item in livePlayerList" :key="item.streamID" :src="item.url" :id="item.streamID"
                        mode="RTC" autoplay @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange"
                        @error="onPlayError" @audiovolumenotify="onPlayAudiovolumenotify">
                        <cover-view class='img-box'>
                            <button class='img-view' size="mini" :id="'s-' + item.streamID" @tap="toggleFullScreen">
                                {{ !!playConfig.fullScreen ? "返回" : "全屏" }}
                            </button>
                        </cover-view>
                    </live-player>
                </view>
            </view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID"
                        placeholder-style='color: #b3b3b3; font-size: 14px;' class="room-input" />
                    <text class="tip"></text>
                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none" class="util-btn">
                        加入房间(推流)
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none" class="util-btn">
                        加入房间(不推流)
                    </button>
                    <button @tap="switchCamera" class="util-btn">
                        切换相机({{ pushConfig.frontCamera ? '前' : '后' }})
                    </button>
                    <button @tap="enableMute" class="util-btn">
                        {{ pushConfig.muted ? '打开' : '关闭' }}麦克风
                    </button>
                    <button @tap="setMirror" class="util-btn">
                        {{ pushConfig.isMirror ? '关闭' : '打开' }}镜像
                    </button>
                    <button @tap="setBeauty" class="util-btn">
                        {{ pushConfig.isBeauty ? '关闭' : '打开' }}美颜
                    </button>
                    <button @tap="setWhiteness" class="util-btn">
                        {{ pushConfig.isWhiteness ? '关闭' : '打开' }}美白
                    </button>
                    <button @tap="toggleOrientation" class="util-btn">画面方向</button>
                    <button @tap="showLog" class="util-btn">
                        {{ pushConfig.showLog ? '关闭' : '打开' }}日志
                    </button>
                    <button class="logout-room" @tap="logout" hover-class="none">退出房间</button>
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
            pushConfig: {           // 推流配置项
                mode: 'RTC',
                aspect: '3:4',        // 画面比例，取值为 3:4, 或者 9:16
                minBitrate: 200,      // 最小视频编码码率
                maxBitrate: 500,      // 最大视频编码码率
                isBeauty: 6,          // 美颜程度，取值范围 [0,9]
                isWhiteness: 6,       // 美白程度，取值范围 [0,9]
                muted: false,         // 推流是否静音
                showLog: false,       // 是否显示 log
                frontCamera: true,    // 前后置摄像头，false 表示后置
                enableCamera: true,   // 是否开启摄像头
                isMirror: false,      // 画面是否镜像
                orientation: 'vertical',
                audioReverbType: 0
            },
            playConfig: {
                fullScreen: false
            },
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
        onNetworkStatus() {
            uni.onNetworkStatusChange(res => {
                console.error('net', res);
                if (res.isConnected && this.connectType === 1 && zg) {
                    console.log('connectType', this.connectType);
                    this.reLogin();
                }
            })
        },
        // 推流画面配置
        switchCamera() {
            this.pushConfig.frontCamera = !this.pushConfig.frontCamera;
            this.livePusher && this.livePusher.switchCamera();
        },
        // 开关麦克风
        enableMute() {
            this.pushConfig.muted = !this.pushConfig.muted
        },
        // 设置镜像
        setMirror() {
            this.pushConfig.isMirror = !this.pushConfig.isMirror
        },
        // 美颜
        setBeauty() {
            this.pushConfig.isBeauty = this.pushConfig.isBeauty === 0 ? 6 : 0;
        },
        // 美白
        setWhiteness() {
            this.pushConfig.isWhiteness = this.pushConfig.isWhiteness === 0 ? 6 : 0;
        },
        // 画面方向
        toggleOrientation() {
            this.pushConfig.orientation = this.data.pushConfig.orientation === 'vertical' ? 'horizontal' : 'vertical'
        },
        // 日志
        showLog() {
            this.pushConfig.showLog = !this.pushConfig.showLog
        },
        publishStream() {
            this.startPush(zg)
        },
        stopPushStream() {
            this.stopPush(zg)
        }
    }
}
</script>

<style>
</style>