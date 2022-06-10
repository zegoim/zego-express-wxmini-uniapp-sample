export function getLoginToken(appID, userID) {
        let { tokenURL, cgi_token, tokenTestURL } = getApp().globalData;
        console.log('>>> get token');
        return new Promise(resolve => {
                if (cgi_token) {
                        try {
                                uni.request({
                                        url: tokenTestURL,
                                        data: {
                                                app_id: appID,
                                                id_name: userID,
                                                cgi_token
                                        },
                                        header: {
                                                'content-type': 'text/plain'
                                        },
                                        success (res) {
                                                if(res.statusCode === 200) resolve(res.data)
                                        }
                                })
                        } catch (error) {
                                console.error('>>> get test token fail: ', error);
                                return;
                        }
                }
                try {
                        let res
                        uni.request({
                                url: tokenURL,  //该接口由开发者后台自行实现，开发者的 Token 从各自后台获取
                                // 请求参数中的appID与userID分别为初始化SDK所填的appID与userID
                                data: {
                                        app_id: appID,
                                        id_name: userID,
                                },
                                header: {
                                        'content-type': 'text/plain'
                                },
                                success (res) {
                                        if(res.statusCode === 200) resolve(res.data)
                                }
                        });
                } catch (error) {
                        console.error('>>> get token fail: ', error);
                        return;
                }
        })

}