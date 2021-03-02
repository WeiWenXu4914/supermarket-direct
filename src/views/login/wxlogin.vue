<template>
  <div class="wxlogin-page">

    <div class="login-box">
      <van-button
        style="width: 90%; margin: 30px auto"
        type="primary"
        @click="login"
        >微信登录 or 注册</van-button
      >
    </div>
    <!-- <div class="log">
      <div class="wx" @click="$router.push('/plogin')">
        <van-icon name="phone" color="#07C160" size="50" />
        <span>验证码登录</span>
      </div>
    </div>
    <div class="FormLabel_agreement">
      <van-checkbox
        name="1"
        v-model="radios"
        shape="square"
        icon-size="16px"
        checked-color="#D04443"
        >同意并认真阅读</van-checkbox
      >
      <p @click="toAgreement">《用户注册规则协议》</p>
    </div> -->
    <div class="bottom-msg">
        <span class="other">其他登录方式</span>
          <div class="way-wrapper">
            <div class="login-way" @click="$router.replace('/passLogin')">
              <img src="./img/password_login.svg" alt="">
              <span>密码登录</span>
            </div>
            <div class="login-way" @click="$router.replace('/plogin')">
              <img src="./img/phone_logo.svg" alt="" class="weChat">
              <span>手机验证</span>
            </div>
        </div>
        <p>登录即视为已阅读并同意<span @click="toAgreement">《乐家便民隐私政策》</span></p>
    </div>
  </div>
</template>

<script>
import { wxLogin } from "./actions";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "wx-login",
  components: {},
  data() {
    return {
      loginLoading: false,
      radios: true, //协议状态
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {},
  methods: {
    toAgreement() {
      this.$router.push({
        path: "/agreementAll",
        query: {
          title: "注册协议",
        },
      });
    },
    login(url) {
      
      if (!this.radios) {
        this.$toast("请先同意注册协议");
        return false;
      }

      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        axios
          .post("http://api.lejiagx.cn/public/index.php/api/wechatLogin")
          .then((res) => {
            const data = res.data;
            if (data.code === 2) {
              const url = window.localStorage.beforeLoginUrl;

              localStorage.setItem("LoginToken", data.loginToken);
              window.location.href = data.url;

            } else if (data.code === 200) {
              localStorage.removeItem("LoginToken");
              localStorage.removeItem("Token");
              this.$toast(data.msg);
            } else {
              localStorage.removeItem("LoginToken");
              localStorage.setItem("Token", data.token);
            }
          })
          .catch((err) => {
            this.$toast("登录失败,请重试");
          });
      } else {
        this.$toast("请在微信打开");
      }
    },
    
  },
};
</script>

<style scoped lang='less'>
.wxlogin-page {
  padding: 60px 14px 20px 14px;
  .login-box {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
  }
  .FormLabel_agreement {
    display: flex;
    margin-top: 20px;
    margin-left: 15px;
    p {
      color: #D04443;
    }
  }
  .log {
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .wx {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      a {
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }

  .bottom-msg {
    position: fixed;
    padding: 30px 0 40px 0;
    bottom: 0;
    width: calc(100vw - 20%);
    margin-left: 50%;
    transform: translateX(-57%);
    border-top: 1px solid #F2F2F2;
    .other {
      position: absolute;
      padding: 0 15px;
      font-size: 12px;
      color: #999999;
      top: 0;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
    }
    .way-wrapper {
      display: flex;
      justify-content: space-evenly;
      .login-way {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #999999;
        img {
          width: 45px;
          height: 45px;
        }
        .weChat {
          width: 40px;
          height: 40px;
          margin: 2px 0 3px 0;
        }
        span {
          padding-top: 5px;
        }
      }
    }
    p {
      margin-top: 20px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #999999;
      span {
        color: #C54A4D;
      }
    }
  }
  @media screen and (min-width: 500px) and (max-width: 1980px) {
      .bottom-msg {
        position: relative;
        margin-left: 50%;
        transform: translateX(-50%);
      }
  }
}

</style>
