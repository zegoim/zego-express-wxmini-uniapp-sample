<template>
    <view class="page-content">
        <view>
            <view class="tool-wrapper">
                <text>流地址(仅支持rtmp/flv)</text>
                <textarea placeholder="输入流URL" v-model="streamUrl" bindinput="inputUrl"></textarea>
                <view class="tool-btns">
                    <button @tap="pushStream" hover-class="none">{{ pushStart ? '停止推流' : '开始推流' }}</button>
                    <button @tap="playStream" hover-class="none">{{ playStart ? '停止拉流' : '开始拉流' }}</button>
                    <button @tap="scanQR" hover-class="none">扫描</button>
                    <button @tap="copy" hover-class="none">复制URL</button>
                </view>
            </view>
            <view class="live-container">
                <live-pusher class="liver" :url="pushUrl" aspect="3:4" mode="RTC" @statechange="onPushStateChange"
                    @netstatus="onPushNetStateChange"
                    waiting-image="https://storage.zego.im/downloads/pause_publish.png"></live-pusher>
                <live-player class="liver" :src="playUrl" mode="RTC" id="live-player"
                    @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange"></live-player>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            streamUrl: '',
            pushStart: false,
            pushUrl: '',
            pushContext: null,
            playStart: false,
            playUrl: '',
            playContext: null,
            canShow: -1,
            roomUserList: []
        }
    },
    onShareAppMessage() {
        return sharePage();
    },
    onLoad() {
        // 监听网络重连，恢复播放状态
        uni.onNetworkStatusChange(res => {
            if (res.isConnected && this.playStart) {
                this.playUrl = this.streamUrl
                this.playContext.play();
            }
        })
    },
    methods: {
        async scanQR() {
            try {
                const {
                    result,
                    scanType
                } = await uni.scanCode();
                if (scanType === 'QR_CODE') {
                    this.streamUrl = result
                } else {
                    console.error('扫描的不是二维码');
                }
            } catch (err) {
                console.error('扫码失败：', err);
            }
        },
        async copy() {
            try {
                await uni.setClipboardData({
                    data: this.streamUrl
                });
                const clipboardData = await uni.getClipboardData();
                console.log('copy success, clipboardData: ', clipboardData);
            } catch (err) {
                console.error('复制失败：', err);
            }
        },
        pushStream() {
            this.checkUrl(this.streamUrl);
            this.pushStart = !this.pushStart
            if (this.pushStart) {
                this.pushUrl = this.streamUrl
                this.pushContext = uni.createLivePusherContext() 
                this.pushContext.start();
            } else {
                this.pushContext.stop();
                this.pushUrl = ''

            }
        },
        playStream() {
            this.checkUrl(this.streamUrl);
            this.playStart = !this.playStart
            if (this.playStart) {
                this.playUrl = this.streamUrl
                this.playContext = uni.createLivePlayerContext("live-player")
                this.playContext.play();

            } else {
                this.playContext.stop();
                this.playUrl = ''

            }
        },
        checkUrl(url) {
            if (!url) {
                uni.showToast({
                    title: '地址不能为空',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }
            if (!url.startsWith('rtmp://') && !url.endsWith('.flv')) {
                uni.showToast({
                    title: '地址格式不正确',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }
        },
        onPushStateChange(e) {
            console.log('onPushStateChange: ', e);
        },
        onPushNetStateChange(e) {
            console.log('onPushNetStateChange: ', e);
        },
        onPlayStateChange(e) {
            console.log('onPlayStateChange: ', e);
        },
        onPlayNetStateChange(e) {
            console.log('onPlayNetStateChange: ', e);
        },
    }
}
</script>

<style>
</style>