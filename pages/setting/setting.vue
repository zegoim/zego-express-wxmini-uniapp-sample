<template>
    <view class="page-content">
        <view class="settings">

            <view class="items">
                <label>appID:</label>
                <input v-model="appID" />
            </view>
            <view class="items">
                <label>serverURL:</label>
                <input v-model="serverURL"  />
            </view>
            <view class="items">
                <label>userID:</label>
                <input v-model="userID"  />
            </view>
            <view class="items">
                <label>token:</label>
                <textarea v-model="token" maxlength="10000"></textarea>
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
export default {
    data() {
        return {
            appID: '',
            serverURL: '',
            userID: '',
            token: '',
        }
    },
    onShow() {
        this.init()
    },
    methods: {
        async submit() {
            let { zegoAppID, server, userID, token } = getApp().globalData;
            if (this.appID !== zegoAppID ||
                this.token != token ||
                this.userID != userID ||
                this.serverURL !== server) {
                const _this = this;
                uni.showModal({
                    title: '',
                    content: '确定要修改么？',
                    success(data) {
                        if(data.cancel) return uni.navigateBack({ delta: 1 });
                        getApp().globalData.zegoAppID = _this.appID * 1;
                        getApp().globalData.server = _this.serverURL;
                        getApp().globalData.token = _this.token;
                        getApp().globalData.userID = _this.userID;
                        uni.setStorage({
                            key: 'globalData',
                            data: getApp().globalData
                        })
                        uni.navigateBack({ delta: 1 })
                    }
                })
            } else {
                uni.navigateBack({ delta: 1 })
            }
        },
        init() {
            let globalData = getApp().globalData;
            let { zegoAppID, server, userID, token } = globalData;
            this.appID = zegoAppID;
            this.serverURL = server;
            this.userID = userID;
            this.token = token;
        },
        reset() {
            this.init()
            uni.navigateBack({ delta: 1 });
        },
        async scanQR() {
            try {
                const { result, scanType } = await uni.scanCode({})
                console.log(result, scanType)
                if (scanType === "QR_CODE") {
                    let { appid, server, token, userid } = JSON.parse(result);
                    this.appID = appid ? appid : this.appID
                    this.serverURL = server ? server : this.serverURL
                    this.token = token;
                    this.userID = userid;
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