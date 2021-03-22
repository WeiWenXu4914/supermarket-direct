// 配置axios,使用配置好的axios
// 处理js最大安全数值，使用jsonbigint
// 配置请求头携带token值
// 导出一个发请求的工具函数
// import axios from 'axios';
import store from '@/store';
import { Dialog, Toast } from "vant";
import router from '../router/index'
// import router from '../router'
const nAxios = window.axios.create({
  // baseURL: 'http://userapi.lejiagx.cn/'
  baseURL: 'http://api.lejiagx.cn/public/index.php/'
});
// 请求拦截器配置
nAxios.interceptors.request.use(
  config => {
    // 成功拦截，修改headers,获取token,配置token
    if (store.state.user.token) {
      config.headers.token = store.state.user.token;
    } else {
      config.headers.token = localStorage.getItem("Authorization");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
); // 出错直接返回promise错误对象
// 响应拦截器，获取有效数据res.data.data
nAxios.interceptors.response.use(
  res => {
    //token过期跳转到登录首页
    if (res.data.code == 2) {

      localStorage.removeItem("LoginToken");
      localStorage.removeItem("Token");
      localStorage.removeItem("LeHome-user-auth");
      localStorage.removeItem("Authorization");

      window.localStorage.beforeLoginUrl = window.location.hash;

      Toast.clear();
      Dialog.confirm({
        title: '登陆',
        message: res.data.msg,
      }).then(() => {
        router.replace('/wlogin');
      }).catch(() => {
        window.history.back()
      });

    }else if (!(res.data.code == 100 || res.data.code == 101 ||res.data.code == 2 || res.data.code == 1 || res.data.code == 202)) {

      //状态码不为100、101、1、2的时候 返回服务器错误
      Toast(res.data.msg);
    }
    
    // 处理响应
    // 调用接口是，then()的传参就是现在的return
    try {
      return res.data; // 直接返回数据，不需要自己data.data找数据
    } catch (e) {
      return res;
    }

  },
  async errs => { }
);
// 导出配置好的axios用来发送请求
export default (url, method, data) => {
  return nAxios({
    url,
    method,
    // 当请求方式是get 用params来传参，其他用data方式传参
    // 根据方式不同，设置不同传参属性，params | data
    // []写表达式，返回的结果一定要是字符串
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  });
};
