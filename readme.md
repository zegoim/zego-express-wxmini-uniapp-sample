#### 如何启动本示例项目
需下载[HBuilderX](https://www.dcloud.io/hbuilderx.html)，在HBuilderX导入项目，启动项目
#### 本示例使用的vue以及node版本
vue: 2.0
node: v16.15.0
如果遇到因node版本不同导致运行不起来，请利用安装nvm切换node版本号。
#### 对于开发的要求
需要先熟悉使用[vue](https://cn.vuejs.org/v2/guide/)，以及了解[uniapp](https://uniapp.dcloud.net.cn/)开发、小程序开发。
#### 关于项目的创建以及运行
1. [uniapp项目创建教程](https://uniapp.dcloud.io/quickstart-cli.html#%E5%88%9B%E5%BB%BAuni-app)；
2. 小程序配置：需要在manifest.json配置好appid:
```
/* 小程序特有相关 */
    "mp-weixin" : {
        "appid" : "xxxxxxx",
        ......
    },
```
或者如下图，在HBuilderX点击manifest.json进行配置
![guide_1.png](/static/guide_1.png)
3. 导入SDK
开发者可通过以下任意一种方式集成 SDK。
##### 方式一：从官网下载SDK，手动集成
（1）请参考 [下载 SDK 包](https://doc-zh.zego.im/article/3208)，下载最新版本的 SDK。

（2）解压 SDK 压缩包，将 “ZegoExpressWebRTC-x.x.x.js” 文件拷贝到项目中。

（3）在使用到插件的 js 文件的最前面导入 SDK。
```
import { ZegoExpressEngine } from '../libs/ZegoExpressMiniProgram-x.x.x';
```
##### 方式二： 使用 npm 获取 SDK
（1）执行 `npm i zego-express-engine-miniprogram` 命令安装依赖。
（2）在使用到插件的 js 文件的最前面导入 SDK。
```
import { ZegoExpressEngine } from "zego-express-engine-miniprogram"; // 以npm的方式引用
```
4. 运行小程序
![guide_4.png](/static/guide_4.png)
5. 关于HBuilderX配置微信开发者工具路径，在运行设置里面的微信开发者工具路径中输入微信开发者工具的软件安装位置
![guide_2.png](/static/guide_2.png)
![guide_3.png](/static/guide_3.png)
#### 运行环境
这里所使用的插件sdk仅支持微信小程序环境，虽然这里用的uniapp，但由于这里用的sdk目前是仅支持微信小程序环境。若有支持H5的需要，此方案不适用，或者用户可利用[uniapp的条件编译](https://uniapp.dcloud.io/tutorial/platform.html#preprocessor)引入web版的sdk进行h5开发，从而实现多端适配。

#### 关于如何使用sdk的api
由此进入[小程序使用sdk官方文档](https://doc-zh.zego.im/article/8939)，根据文档说明使用。
#### 关于组件引入
在这个示例代码中，我们使用的组件采用的是自动引入的原则，具体用法请参考`uniapp` 的 [easycom](https://uniapp.dcloud.net.cn/component/#%E7%BB%84%E4%BB%B6%E7%9A%84%E7%B1%BB%E5%88%AB)，用户亦可选择在组件内自行引入。

#### 可能会出现的问题
1. 调用uni.authorize 失败且无失败码，请查看小程序appId是否为游客模式，游客模式有些api调用不了。
2. 需要在main.js 添加以下代码，uniapp实例对象没有setData，没有加的话，会报错。
```
// 针对小程序setData方法判断
Vue.prototype.setData = Vue.prototype.setData || function () {
  const data = arguments[0] || {}
  for(let key in data) {
    this[key] = data[key]
  }
}
```
3. 由于ZegoExpressEngine的示例对象过于复杂，若利用vue进行数据监听ZegoExpressEngine的实例的话，会出现深拷贝报错，因为uniapp里面用的
JSON.stringify()无法处理所有数据类型，会报错，建议是不监听，且没必要监听，建议是直接赋值到实例对象的属性上，如`this._zg = new ZegoExpressEngine(appID, server)`

```
  data() {
        return {
            zegoEG: null
        }
    },
    async onReady() {
        this._zg = ZegoExpressEngine(zegoAppID, server) // _zg不监听，监听会报错，建议使用这种方式
        this.zegoEG = ZegoExpressEngine(zegoAppID, server) // zegoEG近行数据监听，会报错，报错可能如下图
    }
```
![error.png](/static/error_example.png)
