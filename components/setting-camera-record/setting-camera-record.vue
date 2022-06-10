<template>
    <view class="settings">
        <button v-if="canShow==0" open-type="openSetting" @opensetting="settingCallback">
            授权使用摄像头和麦克风
        </button>
    </view>
</template>

<script>
export default {
    props: {
        canShow: {
            type: [Number]
        }
    }
};
</script>

