<template>
  <div class="passClass">
    <img class="login-user-login" src="./img/logo.jpg" alt="">
    <div class="login-form">
      <input 
       type="text" 
       placeholder="请输入手机号码"
       v-model="form.mobile"
       maxlength="11"
      >
      <div class="password">
        <input 
         type="password" 
         placeholder="输入登录密码" 
         ref="password"
         v-model="form.pass"
        >
        <button class="forget-password" @click="$router.push('/editPass')">忘记密码</button>
        <img src="./img/not_see.svg" v-show="isShow" @click="changePasswor">
        <img src="./img/can_see.svg" v-show="!isShow" @click="changePasswor">
      </div>
    </div>
    <button class="confirm" @click="refister">登录</button>
    <div class="bottom-msg" v-show="isInput">
        <span class="other">其他登录方式</span>
          <div class="way-wrapper">
            <div class="login-way" @click="$router.push('/wlogin')">
              <img src="./img/weChat_logo.svg" alt="">
              <span>微信登录</span>
            </div>
            <div class="login-way" @click="$router.push('/plogin')">
              <img src="./img/phone_logo.svg" alt="">
              <span>手机验证</span>
            </div>
        </div>
        <p>登录即视为已阅读并同意<span @click="toAgreement">《乐家便民隐私政策》</span></p>
    </div>
    <van-loading v-show="loginLoading" color="#1989fa" size="36px" vertical
      >登录中...</van-loading
    >
  </div>
</template>
<script>
import { Notify } from "vant";
import { refister } from "@/api/login";
import { passLogin } from "./actions/index";
import { isvalidPhone, isvalidCode } from "@/utils/validate";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        mobile: "",
        pass: "",
      },
      loginLoading: false,
      isShow: true,
      isInput: true,
      fullHeight: '',
    };
  },
  mounted() {
    this.fullHeight= `${document.documentElement.clientHeight}`;//默认值
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
    }
  },
  watch: {
      fullHeight :function(newVal,oldVal) {

          if(newVal > oldVal) {
            this.isInput = true;
          } else {
            this.isInput = false;
          }
        
      }
  },
  methods: {
    ...mapMutations(["setUser", "delUser"]),
    Login() {
      this.$router.push("/Login");
    },
    refister() {
      //开启加载
      this.loginLoading = true;
      //校验
      if (isvalidPhone(this.form.mobile)) {
        passLogin(this.form).then(res => {

            if (res.code == 1) {
              const user = {
                id: res?.userSession?.memid,
                wxid: res?.userSession?.wx_id,
                relid: res?.userSession?.rel_id,
                mmtid: res?.userSession?.mmt_id,
                name: res?.userSession?.mem_name,
                avator: res?.userSession?.mem_head_portrait,
                phone: res?.userSession?.mem_phone,
                token: res?.token,
              };
              this.setUser(user);
              this.$router.push("/");
              Notify({ type: "success", message: "登陆成功", duration: 1000 });
          }else{
            Notify({ type: "success", message: res.msg, duration: 1000 });
          }
          //关闭加载
          this.loginLoading = false;
        });
      } else {
        //关闭加载
        this.loginLoading = false;
        Notify({ type: "danger", message: "手机号码或验证码有误" });
      }
    },
    changePasswor() {
      this.isShow = !this.isShow;
      if(this.isShow) {
        this.$refs.password.type = "password";
      } else {
        this.$refs.password.type = "text";
      }
    },
    toAgreement() {
      this.$router.push({
        path: "/agreementAll",
        query: {
          title: "隐私协议",
        },
      });
    },
  }
};
</script>

<style lang="less">
.passClass {
  padding-top: 30px;
  .login-user-login {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    border: 1px solid #F8F8F8;
    border-radius: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .login-form {
    width: 94%;
    margin: 0 auto;
    input {
      margin-top: 10px;
      width: 100%;
      height: 50px;
      border: none;
      border-bottom: 1px solid #F2F2F2;
    }
    .password {
      display: flex;
      position: relative;
      align-items: center;
      margin-top: 10px;
      border-bottom: 1px solid #F2F2F2;
      input {
        width: auto;
        flex: 1;
        border: none;
        margin-top: 0;
      }
      img {
        position: absolute;
        right: 90px;
      }
      .forget-password {
        padding: 0 10px 0 15px;
        border: none;
        background-color: #fff;
        border-left: 1px solid #E5E5E5;
        height: 25px;
        color: #A2A2A2;
      }
    }
  }
  .confirm {
    width: 100%;
    height: 40px;
    color: #fff;
    background: linear-gradient(to right,#F3170B,#F1470C);
    margin-top: 30px;
    border: none;
    border-radius: 20px;
    font-size: 15px;
    // box-shadow: 0px 1px 3px 1px #F2450B;
  }
  .bottom-msg {
    position: fixed;
    padding: 30px 0 40px 0;
    bottom: 0;
    width: calc(100vw - 10%);
    margin: 0 auto;
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
          width: 40px;
          height: 40px;
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
}
</style>