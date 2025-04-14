<template>
    <view class="page-content">
        <view v-if="canShow == 1" class="">
            <view class="containerBase">
                <live-pusher class="testpusher" v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4"
                    @statechange="onPushStateChange" mode="SD" min-bitrate="800" max-bitrate="1500"
                    @audiovolumenotify="audiovolumenotify" @netstatus="onPushNetStateChange"
                    waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                <live-player v-for="item in livePlayerList" :key="item.streamID" :id="item.streamID" :src="item.url"
                    mode="RTC" autoplay :enable-metadata="true" @metadatachange="datachange"
                    @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange"></live-player>
            </view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                    <text class="tip"></text>
                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none" class="openRoom">
                        加入房间(推流)
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none" class="openRoom">
                        加入房间(不推流)
                    </button>
                    <button @tap="publishStream" data-role="1" hover-class="none" class="openRoom">
                        推流
                    </button>

                    <button @tap="stopPushStream" data-role="1" hover-class="none" class="openRoom">
                        停止推流
                    </button>
                    <button @tap="stopPullStream" data-role="0" hover-class="none" class="openRoom">
                        停止拉流
                    </button>
                    <button @tap="switchPullStream" data-role="0" hover-class="none" class="openRoom">
                        切换拉流
                    </button>

                    <button class="logout-room" @tap="logout" hover-class="none">退出房间</button>
                </view>
            </view>
        </view>
        <setting-camera-record :canShow="canShow" />
    </view>
</template>

<script>

import {
    initSDK,
    authCheck,
    startPush,
} from '../../utils/common';
import commonMixin from '../../mixin/common-mixin'
import { ZegoExpressEngine } from "zego-express-engine-miniprogram";
let { zegoAppID, server, userID } = getApp().globalData

let zg = null
export default {
    mixins: [commonMixin],
    data() {
        return {
            mirror: true,
            num: 0,
            livePlaying: [],
        }
    },
    async onReady() {
        console.log('onReady')
        zg = initSDK(this);
        this._zg = zg // _zg不监听，监听会报错
        console.log('sdk version: ', zg.getVersion());

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
    methods: {
        publishStream() {
            this.startPush()
        },
        stopPushStream() {
            this.stopPush()
        },
        //  //切换拉流
        async switchPullStream() {
            const zg2 = new ZegoExpressEngine(zegoAppID, server)
            const token = getApp().globalData.token;
            // 登录房间，成功则返回 true
            const result = await zg2.loginRoom(this.roomID, token, {
                userID: userID, // userID，需用户自己定义，保证全局唯一，建议设置为业务系统中的用户唯一标识
                userName: userID // userName 用户名
            }, {
                userUpdate: true // 是否接收用户进出房间的回调，设置为 true 才能接收到房间内其他用户进出房间的回调
            });
            const reslult = await zg2.startPlayingStream(
                this.pushStreamID, {
                sourceType: "BGP"
            })
            this.livePlayerList.push(reslult)
        },
        audiovolumenotify(e) {
            // console.log("audiovolumenotify", e.detail.volume)
        },
        datachange(e) {
            console.log(e)
        },
    }
}
</script>

<style>
</style>