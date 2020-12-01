<template>
  <div class="login">
    <div class="LoginTop">
      <div class="LoginTop_left" @click="onClickBack">
        <van-icon name="arrow-left" size="25px" />
      </div>

      <div class="LoginTop_cen">
        <span>登录 or 注册</span>
      </div>

      <!-- <div class="LoginTop_right"></div> -->
    </div>
    <div class="LoginCon">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    initRouter() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.$router.push("/wlogin");
      }
    },
    onClickBack() {
      this.$router.replace("/");
      return;
      if (this.$route.path == "/wlogin") {
        this.$router.go(-2);
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style>
.login {
  width: 95%;
  height: calc(100vh - 100px);
  margin: 0px auto;
}
.LoginTop {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 50px;
  width: 100%;
  border-bottom: 1px #eee solid;
}
.LoginTop_left {
  float: left;
  height: 50px;
  line-height: 65px;
  padding-left: 15px;
}
.LoginTop_cen {
  float: left;
  height: 50px;
  line-height: 50px;
  margin-left: 25%;
  font-size: 20px;
  font-weight: 400;
}
.LoginCon {
  margin-top: 70px;
}
</style>