/*
 * 将公用逻辑抽离出来
 *
*/
let { userID } = getApp().globalData

export default {
    data() {
        return {
            roomID: '001', // 房间ID
            token: '', // 服务端校验token
            pushStreamID: 'xcx-streamID-' + new Date().getTime(), // 推流ID
            livePusherUrl: '', // 推流地址
            livePusher: null, // live-pusher 的 Context，内部只有一个对象
            userID: userID, // 用户ID,
            livePlayerList: [],
            connectType: -1, // 房间连接状态：-1为初始状态，1为连接，0断开连接
            canShow: -1,
            handupStop: false,
            role: undefined,
            roomUserList: [],
            isReLoginging: false
        }
    },
    onHide() {
        // this.logout();
    },
    onUnload() {
        this.logout();
        uni.offNetworkStatusChange()
    },
    onLoad() {
        // 监听网络状态
        this.onNetworkStatus();
    },
    async mounted() {
        let { token, userID } = getApp().globalData
        this.token = token;
        this.userID = userID
    },
    methods: {
        async openRoom(e, force) {
            if (!this.roomID) {
                uni.showModal({
                    title: '提示',
                    content: '请输入房间号',
                    showCancel: false,
                });
                return;
            }
            const role = parseInt(typeof e === 'number' ? e : e.target.dataset && e.target.dataset.role);
            // console.warn("登录房间", this.connectType , role, force)
            if (force || this.connectType !== 1) {
                // 登录房间，成功则返回 true
                const result = await this._zg.loginRoom(this.roomID, this.token, {
                    userID: this.userID, // userID，需用户自己定义，保证全局唯一，建议设置为业务系统中的用户唯一标识
                    userName: this.userID // userName 用户名
                }, {
                    userUpdate: true // 是否接收用户进出房间的回调，设置为 true 才能接收到房间内其他用户进出房间的回调
                });
                if (result) this.connectType = 1
            }
            this.role = role
            if (role === 1) {
                // console.warn("开始推流", this.connectType , role, force)
                this.startPush()
            }
        },
        async startPush(publishOption) {
            try {
                /** 开始推流，返回推流地址 */
                const { url } = await this._zg.startPublishingStream(this.pushStreamID, publishOption);
                console.info('startPush', url);
                this.livePusherUrl = url
                this.livePusher = uni.createLivePusherContext()
                this.livePusher.start();
            } catch (error) {
                console.error("error", error);
            }
        },
        stopPush() {
            if (this.livePusherUrl) {
                this.livePusher.stop()
                this.livePusherUrl = ''
                this._zg.stopPublishingStream(this.pushStreamID);
            }
        },
        stopPull() {
            if (this.livePlayerList.length) {
                this.livePlayerList.forEach(item => {
                    this._zg.stopPlayingStream(item.streamID)
                });
                this.livePlayerList = []
            }
            if (this.mixPlayerUrls && this.mixPlayerUrls.length) {
                this.mixPlayerUrls.forEach(item => {
                    this._zg.stopPlayingStream(item.streamID)
                })
                this.mixPlayerUrls = []
            }
        },
        async logout() {
            try {
                this.stopPush(this._zg)
                this.stopPull(this._zg)
                /** 登出房间 */
                if (this._zg && this.connectType === 1) await this._zg.logoutRoom(this.roomID);
            } catch (error) {
                console.error('error: ', error);
            }

        },
        async reLogin() {
            console.warn("重新登录 role", this.role, this.isReLoginging)
            if (this.isReLoginging) return;
            this.isReLoginging = true;
            try {
                await this.logout(this.roomID);
                await this.openRoom(this.role, true)
            } catch (error) {
                console.error('error: ', error);
            }
            this.isReLoginging = false;
        },
        onNetworkStatus() {
            wx.offNetworkStatusChange()
            uni.onNetworkStatusChange(res => {
                // console.warn("网络变化",res.isConnected, this.roomID, this.connectType)
                if (res.isConnected && this.connectType === 1 && this._zg) {
                    this.reLogin();

                }
            })
        },
        // live-pusher 绑定推流事件，透传推流事件给 SDK
        onPushStateChange(e) {
            console.error('onPushStateChange', e.detail.code, e.detail.message);
            if (e.detail.code === 5000) {
                this.handupStop = true
                // this.livePusher && (this.livePusher! as wx.LivePusherContext).stop();
            }
            this._zg.updatePlayerState(this.pushStreamID, e);
        },
        // live-pusher 绑定网络状态事件，透传网络状态事件给 SDK
        onPushNetStateChange(e) {
            this._zg.updatePlayerNetStatus(this.pushStreamID, e);
        },
        // live-player 绑定网络状态事件，透传网络状态事件给 SDK
        onPlayNetStateChange(e) {
            this._zg.updatePlayerNetStatus(e.currentTarget.id, e);
        },
        //live-player 绑定拉流事件，透传拉流事件给 SDK
        onPlayStateChange(e) {
            this._zg.updatePlayerState(e.currentTarget.id, e);
        },
        onPushError(e) {
            console.log('onPushError', e);
        },
        onPlayError(e) {
            console.log('onPlayError', e);
        },
        onPushAudiovolumenotify(e) {
            console.log('onPushAudiovolumenotify', e.detail.volume);
        },
        onPlayAudiovolumenotify(e) {
            console.log('onPlayAudiovolumenotify', e.detail.volume);
        }
    }
}