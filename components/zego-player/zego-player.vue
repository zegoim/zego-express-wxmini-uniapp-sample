<template>
    <live-player v-if="player.url" :id="player.id" :src="player.url" mode="live" :autoplay="true"
        :mute-audio="player.muteAudio" :mute-video="player.muteVideo" :orientation="player.orientation"
        :object-fit="player.objectFit" :min-cache="player.minCache" :max-cache="player.maxCache"
        :sound-mode="player.soundMode" :enable-recv-message="player.enableRecvMessage"
        :auto-pause-if-navigate="player.autoPauseIfNavigate" :auto-pause-if-open-native="player.autoPauseIfOpenNative"
        enable-metadata="true" @statechange="onPlayStateChange" @netstatus="onPlayNetStateChange">
    </live-player>
</template>

<script>
export default {
    props: {
        player:{
            type: Object,
            default: () => ({})
        },
        playerId: {
            type: String
        },
        instance: Object
    },
    methods: {
        async startPlay(zegoExpressEngineInstance, streamID) {
            try {
                // 获取页面上的zego实例
                this.zgInstance = zegoExpressEngineInstance
                // 等待 getPlayerInstance 创建 live-player的上下文后，将组件内的this绑定到 player的上下文上。
                const res = (await this.zgInstance.getPlayerInstance(streamID)).play()
                console.log("startPlay res", res)
            } catch (error) {
                console.error("error in startPlay ", error)
            }
        },
        //live-player 绑定拉流事件，透传拉流事件给 SDK
        onPlayStateChange(e) {
            this.zgInstance.updatePlayerState(e.currentTarget.id, e)
        },
        // live-player 绑定网络状态事件，透传网络状态事件给 SDK
        onPlayNetStateChange(e) {
            this.zgInstance.updatePlayerNetStatus(e.currentTarget.id, e)
        }
    }
};
</script>

<style scoped lang="scss">
</style>
