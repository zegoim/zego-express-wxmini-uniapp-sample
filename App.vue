<script>
export default {
	globalData: {
		zegoAppID: 123456, // 填写自己账号下的AppID
		server: '', // 填写自己账号下的server
		token: '',
		userID: ''
	},
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		const _globalData = uni.getStorageSync('globalData')
		if(_globalData instanceof Object) {
			// const {zegoAppID, server, token, userID} =_globalData
			// this.globalData.zegoAppID = zegoAppID
			// this.globalData.server = server
			// this.globalData.token = token
			// this.globalData.userID = userID
		}
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
</style>
