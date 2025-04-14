import { ZegoExpressEngine } from "zego-express-engine-miniprogram";

const app = getApp()

let zg

export const initSDK = (context, pushAtr, playAtr) => {
  if (!_checkParam(app.globalData.zegoAppID, app.globalData.server)) return false
  /** 初始化SDK，userID 为用户自定义ID，全局唯一 */
  zg = new ZegoExpressEngine(app.globalData.zegoAppID, app.globalData.server)

  console.log("version", zg.getVersion())
  zg.setDebugVerbose(false)
  authCheck(context)

  zg.initContext({
    wxContext: context,
    pushAtr,
    playAtr
  })

  // console.log(this);
  zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
    console.warn("roomStreamUpdate", roomID, updateType, streamList);
    if (updateType === "ADD") {
      for (let i = 0; i < streamList.length; i++) {
        try {
          // 设置 zego-player 组件属性
          const zegoPlayerAttr = {
            componentID: `zego-${streamList[i].streamID}`,
            playerId: streamList[i].streamID
          }
          // 添加到组件列表中
          context.zegoPlayerList.push(zegoPlayerAttr)
          // 更新，并渲染组件列表
          context.zegoPlayerList = context.zegoPlayerList
          // 在zegoPlayerList更新后， 将zg实例传入对应的流id的组件内
          context.$nextTick(async () => {
            const zegoPlayer = context.selectComponent(`#${zegoPlayerAttr.componentID}`).$vm || context.selectComponent(`#${zegoPlayerAttr.componentID}`)
            if (!zegoPlayer) return uni.showToast({ icon: "none", title: "未能获取到组件节点" })
            // 开始播放
            await zegoPlayer.startPlay(zg, streamList[i].streamID)
          })
        } catch (error) {
          console.error("playStream error", error)
        }
      }
    } else {
      streamList.forEach((streamItem) => {
        zg.getPlayerInstance(streamItem.streamID).stop()
        // 流停止，并且移除对应的组件
        context.zegoPlayerList = context.zegoPlayerList.filter(
          (comItem) => streamItem.streamID !== comItem.playerId
        )
      })
      context.zegoPlayerList = context.zegoPlayerList
    }
  })
  // the event is triggered when one join or leave the room
  zg.on("roomUserUpdate", (roomID, updateType, userList) => {
    console.log("roomID: ", roomID, " updateType: ", updateType === "ADD" ? "join" : "leave", " userList: ", userList)
    let roomUserList = context.roomUserList
    if (updateType === "DELETE") {
      userList.forEach((user) => {
        const i = roomUserList.findIndex((item) => item.userID === user.userID)
        roomUserList.splice(i, 1)
      })
    } else if (updateType === "ADD") {
      userList.forEach((user) => {
        if (user.userID !== context.userID) {
          roomUserList.push(user)
        }
      })
    }
    context.roomUserList = roomUserList
  })
  zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
    console.warn("roomStateUpdate", roomID, state, errorCode, extendedData);
    if (state === "DISCONNECTED") {
      context.connectType = 0
    } else if (state === "CONNECTED") {
      context.connectType = 1;
    }
  });
  zg.on("publisherStateUpdate", (result) => {
    console.warn("publishStateUpdate", result)
  })
  zg.on("playerStateUpdate", (result) => {
    console.log("playStateUpdate", result)
  })
  zg.on("publishQualityUpdate", (streamID, publishStats) => {
    console.log("publishQualityUpdate", streamID, publishStats)
  })
  zg.on("playQualityUpdate", (streamID, playStats) => {
    console.log("playQualityUpdate", streamID, playStats)
  })
  zg.on("roomOnlineUserCountUpdate", (roomID, userCount) => {
    console.warn("roomOnlineUserCountUpdate", roomID, userCount)
  })
  zg.on("recvReliableMessage", (roomID, userCount, trans_type) => {
    console.warn("recvReliableMessage", roomID, userCount, trans_type)
  })
  zg.on("tokenWillExpire", (roomID) => {
    console.warn("tokenWillExpire", roomID)
  })

  return zg
}

export const playAll = async (streamList, context) => {
  console.log("streamList", streamList)
  if (streamList.length === 0) {
    console.log("startPlayingStream, streamList is null")
    return
  }

  // 获取每个 streamId 对应的拉流 url
  for (let i = 0; i < streamList.length; i++) {
    /** 开始拉流，返回拉流地址 */
    try {
      let { streamID, url } = await zg.startPlayingStream(streamList[i].streamID, {
        sourceType: "BGP"
      })
      console.log("streamID", streamID, url)
      setPlayUrl(streamID, url, context)
    } catch (error) {
      console.error("error", error)
    }
  }
}

export const startPush = async (pushStreamID, publishOption, config) => {
  try {
    /** 开始推流，返回推流地址 */
    zg.createPusher()
    zg.zegoWechatMini.setPusherAttributes(config)
    await zg.getPusherInstance().start(pushStreamID, publishOption)
  } catch (error) {
    console.error("error", error)
  }
}

export const setPlayUrl = (streamID, url, context) => {
  if (!url) {
    console.log(">>>[liveroom-room] setPlayUrl, url is null")
    return
  }
  console.log("setPlayUrl", streamID, url)
  for (let i = 0; i < context.livePlayerList.length; i++) {
    if (context.livePlayerList[i]["streamID"] === streamID && context.livePlayerList[i]["url"] === url) {
      console.log(">>>[liveroom-room] setPlayUrl, streamID and url are repeated")
      return
    }
  }

  let streamInfo = {
    streamID: "",
    url: ""
  }
  let isStreamRepeated = false

  // 相同 streamID 的源已存在，更新 Url
  for (let i = 0; i < context.livePlayerList.length; i++) {
    if (context.livePlayerList[i]["streamID"] === streamID) {
      isStreamRepeated = true
      context.livePlayerList[i]["url"] = url
      break
    }
  }

  // 相同 streamID 的源不存在，创建新 player
  if (!isStreamRepeated) {
    streamInfo["streamID"] = streamID
    streamInfo["url"] = url
    streamInfo["playerContext"] = uni.createLivePlayerContext(streamID)
    context.livePlayerList.push(streamInfo)
  }
  app.globalData.livePlayerList = context.livePlayerList
  context.livePlayerList = context.livePlayerList
  context.addStreamRefer && context.addStreamRefer()
}

export const stopPlayAll = (streamList, context) => {
  if (streamList.length === 0) {
    console.log("stopPlayAll, streamList is empty")
    return
  }
  let playStreamList = context.livePlayerList
  for (let i = 0; i < streamList.length; i++) {
    let streamID = streamList[i].streamID
    zg.stopPlayingStream(streamID)
    // 把远程被删除的流从播放的流列表中删除
    for (let j = 0; j < playStreamList.length; j++) {
      if (playStreamList[j]["streamID"] === streamID) {
        playStreamList.splice(j, 1)
        break
      }
    }
  }
  context.livePlayerList = playStreamList
}

export const authCheck = async (context) => {
  if (!zg) return
  let result
  try {
    result = await zg.checkSystemRequirements()
  } catch (error) {

  }
  console.log("checkSystemRequirements", result)
  if (result && result.code === 10001) {
    console.log("result ", result.code)
    uni.showModal({
      title: "提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后再试。",
      showCancel: false
    })
    context.canShow = 0
  } else if (!result || result.code === 10002) {
    console.log("result ", result && result.code)
    let hasCamera = false
    let hasRecord = false
    uni.authorize({
      scope: "scope.camera",
      success() {
        hasCamera = true
        context.scanShow = hasRecord ? 1 : 0
      },
      fail(err) {
        console.log('授权摄像头失败：', err)
        hasCamera = false
        context.canShow = 0
      }
    })

    uni.authorize({
      scope: "scope.record",
      success() {
        hasRecord = true
        context.canShow = hasCamera ? 1 : 0
      },
      fail(err) {
        console.log('获取麦克风失败：', err)
        hasRecord = false
        context.canShow = 0
      }
    })
  } else {
    context.canShow = 1
  }
}

export const _checkParam = (zegoAppID, server) => {
  if (!zegoAppID) {
    uni.showToast({
      title: `请在app.js中提供正确的zegoAppID`,
      icon: "none",
      duration: 5000
    })
    console.error("未设置正确的zegoAppID")
    return false
  }
  if (!server) {
    uni.showToast({
      title: `请在app.js中提供正确的server`,
      icon: "none",
      duration: 5000
    })
    console.error("未设置正确的server")
    return false
  }
  return true
}
