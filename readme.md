## 如何启动项目
需下载HBuilderX，在HBuilderX导入项目，启动项目

## 运行环境
目前仅支持微信小程序环境

## 可能会出现的问题
调用uni.authorize 失败且无失败码，请查看小程序appId是否为游客模式，游客模式有些api调用不了

## 需要在main.js 添加以下代码，uniapp实例对象没有setData
```
// 针对小程序setData方法判断
Vue.prototype.setData = Vue.prototype.setData || function () {
  const data = arguments[0] || {}
  for(let key in data) {
    this[key] = data[key]
  }
}
```