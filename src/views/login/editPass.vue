<template>
  <div class="login">
    <div class="title3">修改密码</div>
    <div class="tel">
      <van-cell-group>
        <van-field
          v-model="form.mobile"
          type="tel"
          placeholder="请输入手机号"
        />
      </van-cell-group>
      <van-field
        v-model="form.pass"
        right-icon="eye-o"
        :type="showPass"
        @click-right-icon="showPassFun"
        placeholder="输入密码"
      />
      <van-field
        v-model="form.code"
        center
        clearable
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            class="add"
            @click="settime"
            :disabled="isDis"
            :loading="isDis"
            :loading-text="settimeText"
          >
            <span class="btn-font">
              {{ settimeText }}
            </span>
          </van-button>
        </template>
      </van-field>
    </div>
    <div class="log">
      <div class="wx" @click="passLogin">
        <span>密码登录</span>
      </div>
      <div class="but">
        <button @click="login" :disabled="loginLoading">修改</button>
      </div>
    </div>
    <van-loading v-show="loginLoading" color="#1989fa" size="36px" vertical
      >登录中...</van-loading
    >
    <div class="wxLogin">
      <div class="wx" @click="$router.push('/wlogin')">
        <img src="../../assets/icons/wechat.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, codeLogin } from "@/api/login";
import { isvalidPhone, isvalidCode } from "@/utils/validate";
import { Notify, Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import { editPass } from "./actions/index";
import { GetQueryByString } from "@/api/GetQueryByString.js";

export default {
  name: "editPass",
  data() {
    return {
      form: {
        mobile: "",
        code: "",
        pass: "",
      },
      loginLoading: false,
      settimeCode: 60,
      settimeText: "获取验证码",
      isDis: false,
      showPass: 'password'
    };
  },
  created() {
    var href = window.location.href;

    if (href.includes("cn/?code")) {
      //上线cn  测试 cn

      var obj = {
        code: GetQueryByString(href, "code"),
        state: GetQueryByString(href, "state").substring(0, 7),
        loginToken: localStorage.getItem("LoginToken"),
      };
      sessionStorage.setItem("codeState", JSON.stringify(obj));

      this.initLogin();
    }
  },
  methods: {
    ...mapMutations(["setUser", "delUser"]),
    showPassFun() {
      if(this.showPass =="password"){
        this.showPass = 'text';
      }else{
        this.showPass ="password"
      }
    },
    // 初始化登录信息
    initLogin() {
      var LoginToken = localStorage.getItem("LoginToken");
      var Token = localStorage.getItem("LeHome-user-auth");
      var codeState = JSON.parse(sessionStorage.getItem("codeState"));

      if (LoginToken != null || LoginToken != undefined) {
        localStorage.removeItem("Token");

        Toast.loading({
          message: "登录中...",
          overlay: true,
          forbidClick: true,
          duration: 0,
        });

        // 获取用户token
        var url = "http://api.lejiagx.cn/public/index.php/api/wechatUser";
        this.loginGet(codeState, url);
      }
    },
    // 微信登录
    loginGet(obj, url) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        axios
          .post(url, obj)
          .then((res) => {
            const data = res.data;

            if (data.code === 1) {
              const user = {
                id: data?.userSession?.memid,
                wxid: data?.userSession?.wx_id,
                relid: data?.userSession?.rel_id,
                mmtid: data?.userSession?.mmt_id,
                name: data?.userSession?.mem_name,
                avator: data?.userSession?.mem_head_portrait,
                phone: data?.userSession?.mem_phone,
                token: data?.token,
              };

              this.setUser(user);
              localStorage.removeItem("LoginToken");
              sessionStorage.removeItem("codeState");

              var href = window.location.href;
              var jingPosit = href.indexOf("cn/") + 4; //上线:cn  调试: 端口号   上线 + 3   调试 +4
              var urlLeft = href.substring(0, jingPosit);

              Toast.clear();
              if (!data.userSession.mem_phone) {
                window.location = urlLeft + "#/bindingPhone?back=no";
              } else {
                window.location = urlLeft + "#/";
              }
            } else {
              localStorage.removeItem("LoginToken");
              sessionStorage.removeItem("codeState");
              Toast.clear();
              this.$toast(res.msg);
              setTimeout(() => {
                var href = window.location.href;
                var jingPosit = href.indexOf("cn/") + 4; //上线:cn  调试: 端口号   上线 + 3   调试 +4
                var urlLeft = href.substring(0, jingPosit);
                window.location = urlLeft + "#/plogin";
              }, 600);
            }
          })
          .catch((err) => {});
      } else {
        return false;
      }
    },
    register() {
      this.$router.push("/Register");
    },
    //获取验证码
    getCodeHandler(cd) {
      //校验
      if (isvalidPhone(this.form.mobile)) {
        getCode(this.form).then((res) => {
          if (res.code == 100) {
            cd({ code: 1, msg: res.msg });
          } else {
            cd({ code: 0, msg: res.msg });
          }
        });
      } else {
        cd({ code: 0, msg: "请输入正确的手机号码" });
      }
    },
    //登录
    login() {
      //开启加载
      this.loginLoading = true;
      //校验
      if (isvalidPhone(this.form.mobile) && isvalidCode(this.form.code)) {
        editPass(this.form)
          .then((res) => {
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
              //关闭加载
              this.loginLoading = false;

              if (window.localStorage.commdityTaskInfo) {
                //员工任务链接跳转

                let commdityTaskInfo = JSON.parse(
                  window.localStorage.commdityTaskInfo
                );

                this.$router.push({
                  path: "/commdityPay",
                  query: {
                    res: commdityTaskInfo.res,
                    taskKey: commdityTaskInfo.taskKey,
                  },
                });
              } else {
                this.$router.push("/");
              }

              Notify({ type: "success", message: res.msg, duration: 1000 });
            } else {
              this.loginLoading = false;
            }
          })
          .catch(() => {
            //关闭加载
            this.loginLoading = false;
          });
      } else {
        //关闭加载
        this.loginLoading = false;
        Notify({ type: "danger", message: "手机号码或验证码有误" });
      }
    },
    wxLogin(url) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        axios
          .post("http://apis.lejiagx.cn/api/wechatLogin")
          .then((res) => {
            const data = res.data;
            if (data.code === 2) {
              this.data = data.loginToken;
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
    passLogin() {
      this.$router.push("/passLogin");
    },
    settime() {
      if (this.settimeCode == 60) {
        this.getCodeHandler((res) => {
          if (res.code == 1) {
            Notify({ type: "success", message: res.msg });
          } else {
            Notify({ type: "danger", message: res.msg });
            return;
          }
        });
      }

      if (this.settimeCode == 0) {
        this.settimeText = "获取验证码";
        this.settimeCode = 60;
        this.isDis = false;
        return;
      } else {
        this.isDis = true;
        this.settimeText = "重新发送(" + this.settimeCode + ")";
        this.settimeCode--;
      }

      setTimeout(() => {
        this.settime();
      }, 1000);
    },
  },
};
</script>

<style lang="less">
.login {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  .FormLabel_agreement {
    display: flex;
    margin-top: 20px;
    margin-left: 15px;
    p {
      color: #D04443;
    }
  }
  .title1 {
    margin-top: 50px;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .title2 {
    display: inline;
  }
  .title3 {
    color: #D04443;
    display: inline;
  }
  .tel {
    margin-top: 30px;
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
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wx {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        margin-right: 10px;
      }
      span {
        margin-left: 7px;
        font-size: 14px;
      }
    }
    .but {
      button {
        width: 100px;
        height: 35px;
        background-color: #D04443;
        color: #fff;
        border: none;
        border-radius: 35px;
      }
    }
  }
  .wxLogin {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 50px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .wx {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        margin-right: 10px;
      }
    }
  }
}
</style>