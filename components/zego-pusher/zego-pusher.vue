<template>
    <live-pusher v-if="pusher.url" :url="pusher.url" :mode="pusher.mode" :autopush="pusher.autopush" :enable-camera="pusher.enableCamera"
        :enable-mic="pusher.enableMic" :muted="!pusher.enableMic" :enable-agc="pusher.enableAgc"
        :enable-ans="pusher.enableAns" :enable-ear-monitor="pusher.enableEarMonitor"
        :auto-focus="pusher.enableAutoFocus" :zoom="pusher.enableZoom" :min-bitrate="pusher.minBitrate"
        :max-bitrate="pusher.maxBitrate" :video-width="pusher.videoWidth" :video-height="pusher.videoHeight"
        :beauty="pusher.beautyLevel" :whiteness="pusher.whitenessLevel" :orientation="pusher.videoOrientation"
        :aspect="pusher.videoAspect" :device-position="pusher.frontCamera" :remote-mirror="pusher.enableRemoteMirror"
        :local-mirror="pusher.localMirror" :background-mute="pusher.enableBackgroundMute"
        :audio-quality="pusher.audioQuality" :audio-volume-type="pusher.audioVolumeType"
        :audio-reverb-type="pusher.audioReverbType" :waiting-image="pusher.waitingImage"
        :beauty-style="pusher.beautyStyle" :filter="pusher.filter" @statechange="onPushStateChange"
        @audiovolumenotify="bindaudiovolumenotify" @netstatus="onPushNetStateChange"
        waiting-image="https://storage.zego.im/downloads/pause_publish.png" />
</template>

<script>
let zgInstance
export default {
    props: {
        pusher: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {

        };
    },
    watch: {
        pusher(newData) {
            console.log('pusher update:', newData)
        }
    },
    methods: {
        async startPush(zegoExpressEngineInstance, pushStreamID, publishOption, config) {
            try {
                // 获取页面上的zego实例
                this.zgInstance = zegoExpressEngineInstance
                // 创建 pusher
                zegoExpressEngineInstance.createPusher()
                // 设置属性
                zegoExpressEngineInstance.zegoWechatMini.setPusherAttributes(config)
                // 开始推流
                const res = (await zegoExpressEngineInstance.getPusherInstance()).start(pushStreamID, publishOption)
                console.log("startPush res", res);    

            } catch (error) {
                console.error("error in startPush", error)
            }
        },
        onPushStateChange(e) {
            this.zgInstance.updatePlayerState(this.pusher.id, e)
        },
        // live-pusher 绑定网络状态事件，透传网络状态事件给 SDK
        onPushNetStateChange(e) {
            this.zgInstance.updatePlayerNetStatus(this.pusher.id, e)
        },
        // live-pusher 音量监听，
        bindaudiovolumenotify(e) {
            this.zgInstance.updateAudioVolumeNotify(this.pusher.id, e)
        },
        onPushError(e) {
            this.console.log("onPushError e", e)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
</style>
