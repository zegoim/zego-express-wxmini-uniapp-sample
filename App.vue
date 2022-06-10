<script>
export default {
	globalData: {
		zegoAppID: 1739272706, // 填写自己账号下的AppID
		server: 'wss://webliveroom-test.zego.im/ws', // 填写自己账号下的server
		tokenURL: 'https://wsliveroom-alpha.zego.im:8282/token', // 即构提供的，开发阶段获取token，只能用于测试环境，正式环境一定要由业务服务器实现token
		cgi_token: "", //即构测试用,开发者请忽略
		tokenTestURL: "https://wssliveroom-demo.zego.im/token", //即构测试用,开发者请忽略
	},
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
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
