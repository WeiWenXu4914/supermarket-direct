import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
    /**
     * 过滤器函数
     * @param {String} strDate - 就是过滤器 | 前的表达式的值
     */
const relTime = (strDate) => {
        // 转换的逻辑
        // moment 插件  dayjs 插件  都是处理时间格式
        // dayjs 轻量一些
        return dayjs().locale('zh-cn').from(strDate)
    }
    // 截取字符串限值100
const strSub = (str, maxLen = 18) => {
    if (str.length > maxLen) {
        return str.substring(0, maxLen) + '...'
    }
    return str
}

/**
 * @param 字符串 emoji_encode("😋😘我们")
 * @returns 编码emoji
 */
function emoji_encode(e){var n=/[\ud800-\udbff][\udc00-\udfff]/g;return e=e.replace(n,function(e){var n,r;return 2===e.length?(n=e.charCodeAt(0),r=e.charCodeAt(1),"&#"+(1024*(n-55296)+65536+r-56320)+";"):e})}
/**
 * emoji_decode("&#128523;&#128536;我们")
 * @param 字符串
 * @returns 解码emoji仅js中需要
 */
function emoji_decode(e){var n=/\&#.*?;/g;return e.replace(n,function(e){var n,r,t;return 9==e.length?(t=parseInt(e.match(/[0-9]+/g)),n=Math.floor((t-65536)/1024)+55296,r=(t-65536)%1024+56320,unescape("%u"+n.toString(16)+"%u"+r.toString(16))):e})}

export default {
    install(Vue) {
        Vue.filter('relTime', relTime)
        Vue.filter('strSub', strSub)
        Vue.filter('emoji_encode', emoji_encode)
        Vue.filter('emoji_decode', emoji_decode)
    }
}
