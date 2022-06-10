<template>
    <view class="page-content">
        <view v-if="canShow == 1">
            <view class="containerBase">
                <live-pusher v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4"
                    :enable-camera="pushConfig.enableCamera" :muted="pushConfig.muted" @statechange="onPushStateChange"
                    @netstatus="onPushNetStateChange"
                    waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                <live-player v-for="item in livePlayerList" :key="item.streamID" :id="item.streamID" :src="item.url"
                    mode="RTC" autoplay @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange">
                </live-player>
                <view> {{ livePusherUrl }}</view>
            </view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                    <text class="tip"></text>
                </view>
                <view v-if="isTest">
                    <input type="number" v-model="pushErrCnt" data-type="push"
                        placeholder-style='color: #b3b3b3; font-size: 14px;' placeholder="请输入推流重试次数 不大于5"
                        class="room-input" />
                    <input type="number" v-model="playErrCnt" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        placeholder="请输入拉流重试次数 不大于5" class="room-input" />
                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none" class="openRoom">
                        创建房间
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none" class="openRoom">
                        加入房间
                    </button>
                    <button @tap="openRetryPush" class="openRoom">
                        {{ !isTest ? '开启多节点重试' : '关闭多节点重试' }}
                    </button>
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
            pushErrCnt: 0,
            playErrCnt: 0,
            pushConfig: { // 推流配置项
                muted: false, // 推流是否静音
                enableCamera: true, // 是否开启摄像头
            },
            isTest: false
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
        openRetryPush() {
            this.isTest = !this.isTest
        },
    }
}
</script>

<style>
</style>