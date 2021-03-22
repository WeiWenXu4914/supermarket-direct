import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import plugin from '@/utils/plugin'
import '@/styles/index.css'
import '@/styles/index.scss'
import App from './App.vue'
// 1.全局引用
import Utils from './utils/utils'
import IMService from './views/im/assets/lib/imservice';
import { GetQueryByString } from '@/api/GetQueryByString.js'

Vue.prototype.$Utils = Utils

// import style
// import 'swiper/swiper-bundle.css'
// Vue.use(VueAwesomeSwiper)

// 大转盘抽奖
// import LuckDraw from 'vue-luck-draw'
// Vue.use(LuckDraw)

// 注册好了 支持v-lazy指令
window.Vue.use(Lazyload)
window.Vue.use(Vant)
window.Vue.use(plugin)
window.Vue.config.productionTip = false

Vue.prototype.imService = new IMService();

var href = window.location.href;

if (href.includes("cn/?code")) { //上线8080  测试 8080

  var url = href.substring(0, href.length - 2);

  var obj = {
    code: GetQueryByString(url, 'code'),
    state: GetQueryByString(url, 'state'),
    loginToken: localStorage.getItem("LoginToken")
  }

  sessionStorage.setItem("codeState", JSON.stringify(obj));

  var jingPosit = url.indexOf("cn/") + 3;    //上线:cn  调试: 端口号   上线 + 3   调试 +4

  var urlLeft = url.substring(0, jingPosit);

  var res = Utils.demoRequest(JSON.stringify(obj));

  location.href = urlLeft + '#/?timestamp=' + Math.random() + '&wechatLoginConfig=' + res;

}

new window.Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
