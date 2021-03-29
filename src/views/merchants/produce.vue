<template>
  <div id="fans-root">
    <div class="custom-html" v-if="proList.code == 100">
      <Cardr
        v-for="(item, index) in proList.data"
        :key="index"
        :commodities="item"
        class="card"
        @proDetail="proDetail(item)"
      />
    </div>
    <div v-else>
      <van-empty description="数据为空" />
    </div>
  </div>
</template>

<script>
import Cardr from "./components/card.vue";
import { entProduct } from "./actions/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "produce",
  components: {
    Cardr,
  },
  beforeCreate() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 0,
    });
  },
  data() {
    return {
      proList: {},
      shows: 0
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getEntProduct();
    if (!this.user.id && this.$route.query.qrcode_entid) {
      this.initLogin();
    }
  },
  methods: {
    initLogin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        axios
          .post("http://api.lejiagx.cn/public/index.php/api/wechatLogin")
          .then((res) => {
            const data = res.data;
            if (data.code === 2) {

              var super_url = {
                path: this.$route.path,
                res: this.$route.query.res,
                qrcode_entid: this.$route.query.qrcode_entid,
              }
              localStorage.setItem("LoginToken", data.loginToken);
              localStorage.setItem("super_url", JSON.stringify(super_url));
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
    getEntProduct(searchVal) {
      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res));
      if (searchVal) {
        data.val = searchVal;
      } else {
        data.val = "";
      }
      entProduct(data).then((res) => {
        this.proList = res;
        setTimeout(() => {
          this.$toast.clear();
        }, 200);
      });
    },
    productSearch(res) {
      this.getEntProduct(res);
    },
    proDetail(res) {
      var obj = {
        proid: res.proid,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/commdityPay",
        query: {
          res: res,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#fans-root {
  overflow: auto;
  .costom-header {
    /deep/ .title-search {
      width: 641px;
    }
    /deep/ .title-right {
      display: none;
    }
    background: #fff;
    overflow: hidden;
    z-index: 99999;
  }
  .head-card {
    background: #fff;
  }
  .custom-html {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    background: rgba(245, 246, 248, 1);
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    padding: 0 15px;
    .card {
      width: 168px;
      padding-bottom: 5px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;
      border-radius: 3px;
      // margin: 0px 15px 15px 15px;
      margin-bottom: 15px;
    }
  }
}
.qrwrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  > .block {
    max-width: 50%;
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
    img {
      width: 100%;
      margin-top: 5px;
    }
    span {
      font-size: 17px;
    }
  }
}
</style>
