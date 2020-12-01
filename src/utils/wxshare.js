import wx from 'weixin-js-sdk' //微信sdk依赖
import axios from 'axios' // 引用全局
import store from '@/store/index.js'
import { getLngLatLocation } from '@/utils/map.js'
const jsApiList = [
    'updateAppMessageShareData', 
    'updateTimelineShareData', 
    'onMenuShareAppMessage', 
    'onMenuShareTimeline', 
    'onMenuShareQQ', 
    'onMenuShareQZone', 
    'openLocation', 
    'getLocation',
    'chooseImage',
    'getLocalImgData'
]

//要用到微信API
const getWxConfig = () => {
    return new Promise((resovle, reject) => {
        // 调用后台接口换取参数
        let _url = ''
        if (window.__wxjs_is_wkwebview === true) {
            _url = window.location.href.split('#')[0] || window.location.href
        } else {
            _url = window.location.href.split('#')[0] || window.location.href
        }

        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            axios.post('http://api.lejiagx.cn/public/index.php/api/wexinConfig', {
                    url: _url
                })
                .then(res => resovle(res.data))
                .catch(err => {
                    reject(err)
                })
        }
    })
}

// 微信分享
export const wxJSSDK = (dataForWeixin,cd) => {
    getWxConfig().then(res => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        })
        wx.ready(function() {
            wx.updateAppMessageShareData({
                title: dataForWeixin.title,
                desc: dataForWeixin.desc,
                link: dataForWeixin.link,
                imgUrl: dataForWeixin.imgUrl,
                type: dataForWeixin.type || 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: dataForWeixin.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {},
            });
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.updateTimelineShareData({
                title: dataForWeixin.title,
                desc: dataForWeixin.desc,
                link: dataForWeixin.link,
                imgUrl: dataForWeixin.imgUrl,
                type: dataForWeixin.type || 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: dataForWeixin.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {},
            });
        })
        wx.error(function(res) {});
    })
}

// 微信定位
export const wxMapJSSDK = (res) => {
    getWxConfig().then(res => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: async(res) => {
                    console.log(res)
                    let lnglat = []
                    lnglat[0] = res.longitude
                    lnglat[1] = res.latitude
                    const userMap = await getLngLatLocation(lnglat)
                    store.state.userMapLoacl = userMap
                        //使用微信内置地图查看位置接口
                    wx.openLocation({
                        latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                        longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                        name: '我的位置', // 位置名
                        address: userMap.local.localText || '我的位置', // 地址详情说明
                        scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: 'http://www.gongjuji.net' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
                    });
                }
            });
        })
        wx.error((res) => {
            // console.log(JSON.stringify(res) + "微信验证失败");
            // alert(JSON.stringify(res)+"微信验证失败");
        });
    })
}

// 打开微信地图
export const wxMapGetAddress = (res) => {
    return new Promise((resovle, reject) => {
        getWxConfig().then(res => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
                jsApiList: jsApiList // 必填，需要使用的JS接口列表
            })
            wx.ready(() => {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: (res) => { resovle(res) }
                });
            })
            wx.error((res) => {
                reject(res)
                // console.log(JSON.stringify(res) + "微信验证失败");
            });
        })
    })
}

export const wxJssdkChooseImage = () => {
    
    getWxConfig().then(res => {
        sessionStorage.setItem('wechatConfig',JSON.stringify(res.data));
    });
}