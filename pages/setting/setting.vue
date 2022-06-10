<template>
    <view class="page-content">
        <view class="settings">

            <view class="items">
                <label>appID:</label>
                <input disabled v-model="_appID" data-name="appID" />
            </view>
            <view class="items">
                <label>serverURL:</label>
                <input disabled v-model="_serverURL" data-name="serverURL" />
            </view>

        </view>


        <view class="handler">
            <button class="leftTop" @tap="scanQR">扫描</button>
            <button class="leftBottom" @tap="submit">确定</button>
            <button class="rightBottom" @tap="reset"> 重置</button>
        </view>
    </view>
</template>

<script>
let globalData = getApp().globalData;
let { zegoAppID, server, cgi_token } = globalData;
export default {
    data() {
        return {
            _appID: zegoAppID,
            _serverURL: server
        }
    },
    methods: {
        async submit() {
            if (this._appID !== zegoAppID ||
                this._cgi_token != cgi_token ||
                this._serverURL !== server) {
                const res = await uni.showModal({
                    title: '',
                    content: '确定要修改么？',
                })
                if (res.confirm) {
                    globalData.zegoAppID = this._appID * 1;
                    console.log('zegoAppID', globalData.zegoAppID);
                    globalData.server = this._serverURL;
                    globalData.cgi_token = this._cgi_token;
                    uni.navigateBack({ delta: 1 });
                }
            } else {
                uni.navigateBack({ delta: 1 });
            }
        },
        reset() {

            globalData.zegoAppID = 1739272706;
            // globalData.tokenURL = "https://wsliveroom-alpha.zego.im:8282/token";
            globalData.server = "wss://webliveroom-test.zego.im/ws";

            uni.navigateBack({ delta: 1 });
        },
        async scanQR() {
            try {
                const { result, scanType } = await uni.scanCode({})
                console.log(result, scanType)
                if (scanType === "QR_CODE") {
                    let { appid, server, cgi_token } = JSON.parse(result);
                    this._appID = appid ? appid : this._appID
                    this._serverURL = server ? server : this._serverURL
                    this._cgi_token = cgi_token,
                        this.useQR = 1;
                } else {
                    console.error('扫描的不是二维码')
                }
            } catch (error) {
                console.error('扫描失败', error);
            }
        }
    }
}
</script>

<style>
</style>