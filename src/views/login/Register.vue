<template>
  <div class="register">
    <div class="tel">
      <van-cell-group>
        <van-field
          v-model="form.phoneNumber"
          type="tel"
          placeholder="请输入手机号"
        />
      </van-cell-group>
      <van-field
        v-model="form.code"
        center
        clearable
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button class="add" @click="getCodeHandler"
            ><span class="btn-font">获取验证码</span></van-button
          >
        </template>
      </van-field>
    </div>
    <div class="already">
      <div class="bla">已有账号？</div>
      <div class="re" @click="Login">登陆</div>
    </div>
    <div class="log">
      <div class="wx">
        <img src="../../assets/icons/wechat.png" alt="" />
        <router-link :to="{ name: 'wlogin' }">微信登录</router-link>
      </div>
      <div class="but">
        <button @click="refister">注册</button>
      </div>
    </div>
    <van-loading v-show="loginLoading" color="#1989fa" size="36px" vertical
      >注册中...</van-loading
    >
  </div>
</template>
<script>
import { Notify } from "vant";
import { getCode, refister } from "@/api/login";
import { isvalidPhone, isvalidCode } from "@/utils/validate";
export default {
  data() {
    return {
      form: {
        phoneNumber: "",
        code: "",
      },
      loginLoading: false,
    };
  },
  methods: {
    Login() {
      this.$router.push("/Login");
    },
    //获取验证码
    getCodeHandler() {
      //校验
      if (isvalidPhone(this.form.phoneNumber)) {
        getCode(this.form.phoneNumber).then((res) => {
          Notify({ type: "success", message: res.message });
        });
      } else {
        Notify({ type: "danger", message: "请输入正确的手机号码" });
      }
    },
    refister() {
      //开启加载
      this.loginLoading = true;
      //校验
      if (isvalidPhone(this.form.phoneNumber) && isvalidCode(this.form.code)) {
        this.$store.dispatch("Login", this.form).then(() => {
          //关闭加载
          this.loginLoading = false;
          this.$router.push("/Home");
          Notify({ type: "success", message: "登陆成功", duration: 1000 });
        });
      } else {
        //关闭加载
        this.loginLoading = false;
        Notify({ type: "danger", message: "手机号码或验证码有误" });
      }
    },
  },
};
</script>

<style lang="less">
.register {
  .titel {
    margin: 18px 10px;
    display: flex;
    align-items: center;
    font-size: 18px;
    .title_text {
      width: 50vh;
    }
  }
  .already {
    width: 90%;
    margin: 0 auto;
    /*margin-left: 34vh;*/ //george改
    display: flex;
    .bla {
      color: #7A7A7A;
    }
    .re {
      color: #D04443;
    }
  }
  .tel {
    width: 90%;
    margin: 0 auto;
    margin-top: 80px;
    .van-cell.van-cell--center.van-field {
      padding: 10px 0px;
    }
    .van-hairline--top-bottom {
      position: inherit;
      .van-cell {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0px;
        overflow: hidden;
        color: #323233;
        line-height: 24px;
        background-color: #fff;
      }
    }

    .van-field {
      border-bottom: 1px solid #fcfcfc;
      .van-cell {
        padding: 10px 0px;
      }
      .add {
        position: relative;
        border: none;
        color: #D04443;
        background: white;
      }
      .btn-font {
        color: #D04443;
        font-size: 16px;
        position: relative;
        top: -2px;
      }
    }
  }
  .log {
    width: 90%;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wx {
      display: flex;
      align-items: center;
      img {
        width: 35px;
      }
      span {
        margin-left: 7px;
        font-size: 14px;
      }
    }
    .but {
      button {
        width: 87px;
        height: 35px;
        background-color: #D04443;
        color: #fff;
        border: none;
        border-radius: 35px;
      }
    }
  }
}
</style>