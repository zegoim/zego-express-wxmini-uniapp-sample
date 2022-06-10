<template>
	<view class="content">
		<view class='tips'>
			<text>以下展示即构科技实时音视频能力</text>
		</view>
		<view class='guide-box'>
			<view v-for="(item, index) in entryInfos" :key="index" :id="index" class='guide' @click='onEntryTap'>
				<image class="guide_icon" :src="item.icon" mode="aspectFit" />
				<view class="guide_label">{{ item.title }}</view>
				<view class="guide_label sub_title">{{ item.subtitle }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { sharePage } from '../../utils/util';
export default {
	data() {
		return {
			tapTime: new Date(),
			entryInfos: [
				{
					icon: '../../static/interactionLive.png',
					subtitle: '基础推拉流_组件',
					title: '视频直播',
					navigateTo: '../base_zego/base_zego'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '《基础推拉流》',
					title: '视频直播',
					navigateTo: '../base/base'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '摄像头、麦克风等',
					title: '基础演示',
					navigateTo: '../native/native'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '《实时消息》',
					title: '视频直播',
					navigateTo: '../message/message'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: 'CDN',
					title: '视频直播',
					navigateTo: '../cdn/cdn'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '混流',
					title: '视频直播',
					navigateTo: '../mix/mix'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '背景音',
					title: '视频直播',
					navigateTo: '../bgm/bgm'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '截图',
					title: '视频直播',
					navigateTo: '../snapshot/snapshot'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: 'token v3',
					title: 'token鉴权',
					navigateTo: '../tokenRole/tokenRole'
				},
				{
					icon: '../../static/interactionLive.png',
					subtitle: '',
					title: '自定义推拉流',
					navigateTo: '../customlive/customlive'
				},
				{
					icon: "../../static/setting.png",
					subtitle: '设置APPID',
					title: "自定义设置",
					navigateTo: "../setting/setting"
				},
				{
					icon: "../../static/interactionLive.png",
					subtitle: '多节点',
					title: "重试",
					navigateTo: "../multi/multi"
				},
			]
		}
	},
	onShareAppMessage() {
		console.log('onShareAppMessage');
		return sharePage();
	},
	methods: {
		onEntryTap(e) {
			// 防止两次点击操作间隔太快
			let nowTime = new Date();
			if (nowTime.getTime() - new Date(this.tapTime).getTime() < 1000) {
				return;
			}
			let toUrl = this.entryInfos[e.currentTarget.id].navigateTo;
			console.log(toUrl);

			uni.navigateTo({
				url: toUrl
			});
			this.tapTime = nowTime
		}
	}
}
</script>

<style>
.mainUI {
	position: relative;
	width: 100vw;
	height: 100vh;
}

.tips {
	color: #3c3c3c;
	font-size: 12px;
	text-align: center;
	padding: 22 rpx 0 22 rpx;
	margin-top: 3vh;
}

.guide-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 0 2vw;

}

.guide {
	width: 30vw;
	height: 30vw;
	background-color: rgba(13, 112, 255, 0.7);
	text-align: center;
	margin: 1vw;
	vertical-align: top;
}

.guide-nomore {
	display: inline-block;
	width: 30vw;
	height: 30vw;
	text-align: center;
	margin: 1.5px;
	vertical-align: top;
}

.guide-nomore-bk {
	background-color: rgba(0, 0, 0, 0.3);
}

.guide_icon {
	display: block;
	width: 36px;
	height: 36px;
	margin: 16px auto 0;
}

.guide_label {
	display: block;
	margin-top: 10px;
	color: #ffffff;
	font-size: 32rpx;
	font-family: "PingFang SC";
}

.guide_label.sub_title {
	font-size: 28rpx;
	color: #ffffff;
	margin-top: 2rpx;
}

.guide_nomore_label {
	margin-top: 24px;
	color: rgba(256, 256, 256, 0.3);
	font-size: 14px;
}

.settings {
	position: absolute;
	bottom: 50vh;
	width: 70vw;
	left: 15vw;
}

.settings button {
	border-radius: 0px;
	background-color: rgba(13, 112, 255, 0.7);
}
</style>
