<template>
  <div class="page-wrapper" :style="getStyle()">
    <div class="page-heade">
      <div class="page-left">
        <div class="page-location" @click="openMap">
          <div class="txt">{{ local.district || "定位中" }}</div>
          <!-- <van-icon color="#D04443" size="15" name="arrow-down" /> -->
        </div>
        <div class="seach" @click="$router.push('/searchNew')">
          <van-icon name="search" color="#8D8D8D" size="17" />
          <span>您喜欢的内容</span>
        </div>
      </div>

      <div class="page-right" :style="[{ justifyContent: addshow ? '' : 'flex-end' }]">
        <van-icon name="edit" @click="addArticle" color="#fff" size=".8rem" v-if="addshow" />
        <!-- <van-icon name="chat" :badge="NmessageNumCount" @click.stop="goMessage" v-if="messageShow" color="#fff" size=".8rem" /> -->
        <!-- <van-icon name="chat" @click.stop="goMessage" v-else color="#fff" size=".8rem" /> -->
        <div v-if="user.avator" class="head">
          <span class="headMsg" v-if="messageShow"></span>
          <van-image
            :src="user.avator"
            @click.stop="userDetail"
            class="icon"
            round
          />
        </div>
        <van-icon
          v-else
          name="manager"
          color="#fff"
          size="30"
          @click.stop="userDetail"
          :badge="NmessageNumCount"
        />
      </div>
      <!-- 
      <p>
        <img :src="titleImg" alt="">
      </p>
      <span  class="page-user" @click.stop="userDetail">
        <div class="email">
          <van-icon size="35" :badge="NmessageNumCount" name="envelop-o"  @click.stop="goMessage" v-show="messageShow" />
        </div>
        <div class="tx">
          <img v-if="user.avator" :src="user.avator" alt="">
          <img v-else src="../assets/icons/no_login.png" alt="">
        </div>
      </span> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { wxMapGetAddress } from "@/utils/wxshare.js";
import { getLngLatLocation } from "@/utils/map.js";
import { getMessage, TencentArticl01 } from "@/api/index";
import axios from "axios";
export default {
  name: "page-header",
  props: {
    bgcolor: String,
    noradius: Boolean,
    type: {
      type: Boolean,
      default: false,
    },
    isAddShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      titleImgOther: require("../assets/icons/headertext.png"),
      titleImgMall: require("../assets/icons/headermall.png"),
      local: {},
      messageShow: false,
      NmessageNumCount: 1,
      addshow: false
    };
  },
  watch: {},
  computed: {
    ...mapState(["user", "userMapLoacl"]),
    titleImg() {
      return this.type ? this.titleImgMall : this.titleImgOther;
    },
  },
  created() {
    if (this.user.mmtid == 3 && this.isAddShow) {
      this.addshow = true;
    }
    this.initLocal();
    this.getMessage();
  },
  methods: {
    ...mapMutations(["delUser", "setUserMap"]),
    // 初始化用户定位
    async initLocal() {
      if (this.userMapLoacl) this.local = this.userMapLoacl.local;
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        const res = await wxMapGetAddress();
        if (res.errMsg === "getLocation:ok") {
          let lnglat = [];
          lnglat[0] = res.longitude;
          lnglat[1] = res.latitude;
          const userMap = await getLngLatLocation(lnglat);
          this.setUserMap(userMap);
          this.local = userMap.local;
        } else {
          this.$toast("定位信息获取失败，请检查网络连接");
        }
      } else {
        const res = await TencentArticl01();

        if (res.data.status == 375) {
          this.local.district = res.data.message;
        } else {
          this.local = res.data.result.ad_info;
        }
      }
    },
    openMap() {
      this.$toast("暂时无法切换位置");
    },
    // 获取消息
    async getMessage() {
      const res = await getMessage();

      if (res.NmessageNumCount > 0) {
        // setInterval(()=>{
        this.messageShow = true;
        // },10000)
        this.NmessageNumCount = res.NmessageNumCount;
      } else {
        this.messageShow = false;
      }
    },
    goMessage() {
      this.$router.push("/user/message");
    },
    // 跳转到用户详情
    userDetail() {
      if (this.user.token) {
        this.$router.push("/user");
      } else {
        this.$router.push("/login");
      }
    },
    // 获取头部组件样式
    getStyle() {
      let style = {};
      if (this.bgcolor) {
        style.background = this.bgcolor;
      }
      if (this.noradius) {
        style["border-radius"] = "0";
      }
      if (this.zindexsub) {
        style["z-index"] = "0";
      }

      return style;
    },
    addArticle() {
      this.$emit("addArticle");
    }
  },
};
</script>

<style scoped lang='less'>
.page-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
  background: #07C160;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 8px 0;
  .page-heade {
    width: 92%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-left {
      width: 75%;
      height: 28px;
      border-radius: 5px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .page-location {
        min-width: 20%;
        max-width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        border-right: 1px #eee solid;
        padding-right: 5px;
        .txt {
          color: #111111;
          font-size: 15px;
          margin: 0 5px;
          padding-left: 2px;
          font-weight: 500;
        }
      }
      .seach {
        width: 60%;
        color: #8D8D8D;
        // line-height: 42px;
        display: flex;
        align-items: center;
        align-content: center;
        .van-icon {
          padding-right: 5px;
        }
        span {
          font-size: 13px;
          display: flex;
          align-items: center;
          align-content: center;
          font-weight: 600;
        }
      }
    }
    .page-right {
      width: 22%;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .van-image {
        border-radius: 100%;
        min-width: 28px;
        min-height: 28px;
      }
      .icon {
        width: 30px;
        height: 30px;
      }
      .head {
        position: relative;
        display: flex;
        align-items: center;
        .headMsg {
          position: absolute;
          font-size: 13px;
          width: 10px;
          height: 10px;
          line-height: 15px;
          z-index: 1;
          text-align: center;
          color: #ffffff;
          border: 1px #ffffff solid;
          background: crimson;
          border-radius: 100%;
          right: 1px;
          top: 0px;
        }
      }
    }

    p {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 180px;
      }
    }
    span {
      // width: 35px;
      height: 40px;
      // border-radius: 100%;
    }
  }
  .page-user {
    // border-radius: 100%;
    // overflow: hidden;
    // border:1px #eee solid;
    // display: flex;
    // align-items: center;
    width: 22%;
    display: flex;
    justify-content: space-between;
    .email {
      .van-icon {
        //top: -35px;
        //left: 35px;
        color: white;
        // width: 25px;
      }
      margin-right: 5px;
    }
    .tx {
      img {
        width: 35px;
        height: 35px;
        border-radius: 100%;
      }
    }
  }
}
</style>
