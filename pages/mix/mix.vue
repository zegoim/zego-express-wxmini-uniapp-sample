<template>
    <view class="page-content">
        <view v-if="canShow == 1">
            <view class="live-wrapper">
                <view class="containerBase">
                    <live-pusher v-if="livePusherUrl" :url="livePusherUrl" aspect="3:4" @statechange="onPushStateChange"
                        @netstatus="onPushNetStateChange"
                        waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                    <live-player v-for="item in livePlayerList" :key="item.streamID" :id="item.streamID" :src="item.url"
                        mode="RTC" autoplay @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange">
                    </live-player>
                </view>
                <view class="containerBase">
                    <live-player v-for="item in mixPlayerUrls" :key="item.streamID" :id="item.streamID" :src="item.url"
                        mode="RTC" autoplay @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange">
                    </live-player>
                </view>
            </view>
            <view class="index-container">
                <view class='input-container'>
                    <input v-model="roomID" placeholder="请输入房间 ID" placeholder-style='color: #b3b3b3; font-size: 14px;'
                        class="room-input" />
                    <text class="tip"></text>
                </view>
                <view class="button-container">
                    <button @tap="openRoom" data-role="1" hover-class="none" class="util-btn">
                        加入房间(推流)
                    </button>
                    <button @tap="openRoom" data-role="0" hover-class="none" class="util-btn">
                        加入房间(不推流)
                    </button>
                    <button @tap="mixStream" class="util-btn">
                        {{ mixStreamStart ? '停止混流' : '开始混流' }}
                    </button>
                    <!-- <button @tap="logout" class="util-btn" hover-class="none">退出房间</button> -->
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
            mixStreamStart: false,
            mixStreamID: 'xcx-mixS-' + new Date().getTime(),
            mixTaskID: 'xcx-mixT-' + new Date().getTime(),
            mixPlayerUrls: []
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
        async mixStream() {
            this.mixStreamStart = !this.mixStreamStart
            if (this.mixStreamStart) {
                const inputList = [{
                    streamID: this.pushStreamID,
                    contentType: 'video',
                    layout: {
                        top: 0,
                        left: 0,
                        bottom: 480,
                        right: 640,
                    }
                }];
                if (this.livePlayerList.length > 0) {
                    const playerStream = this.livePlayerList[0]
                    inputList.push({
                        streamID: playerStream.streamID,
                        contentType: 'video',
                        layout: {
                            top: 480,
                            left: 0,
                            bottom: 960,
                            right: 640
                        }
                    });
                }
                const outputList = [{
                    target: this.mixStreamID,
                }]
                const outputConfig = {
                    outputBitrate: 800 * 1000,
                    outputFPS: 15,
                    outputWidth: 640,
                    outputHeight: 960,
                }
                const mixParam = {
                    taskID: this.mixTaskID,
                    inputList: inputList,
                    outputList,
                    outputConfig
                };
                console.log('mixParam', mixParam);
                try {
                    const result = await zg.startMixerTask(mixParam)
                    console.log('mixPlayInfoList: ', result);
                    const _mixPlayerUrls = []
                    if (result.errorCode !== 0) {
                        console.error('mix fail', result);
                    }
                    const { streamID, url } = await zg.startPlayingStream(this.mixStreamID, { isMix: true })
                    console.log('>>>[liveroom-room] startPlayingStream, streamID: ', streamID, ' url: ', url);
                    _mixPlayerUrls.push({
                        streamID,
                        url
                    })
                    this.mixPlayerUrls =  _mixPlayerUrls
                } catch (err) {
                    console.log('err: ', err);
                };
            } else {
                try {
                    const { errorCode } = await zg.stopMixerTask(this.mixTaskID)
                    console.log('stopMixerTask ', errorCode)
                    if (this.mixPlayerUrls.length > 0) {
                        this.mixPlayerUrls.forEach((item) => {
                            zg.stopPlayingStream(item.streamID);
                        })
                        this.mixPlayerUrls = []
                    }
                } catch (error) {
                    console.error('error: ', error);
                }

            }
        },
    }
}
</script>

<style>
</style>