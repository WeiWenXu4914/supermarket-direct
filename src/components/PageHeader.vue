<template>
  <div class="page-wrapper" :style="getStyle()">
    <div class="page-heade">
      <div class="page-left" @click="$router.push('/searchNewer')">
        <!-- <div class="page-location" @click="openMap">
          <div class="txt">{{ local.district || "定位中" }}</div>
          <van-icon color="#D04443" size="15" name="arrow-down" />
        </div> -->
        <div class="seach">
          <van-icon name="search" color="#8D8D8D" size="17" />
          <span>此项目正在试运行</span>
        </div>
      </div>

      <div
        class="page-right"
        :style="[{ justifyContent: addshow ? '' : 'flex-end' }]"
      >
        <van-icon
          name="edit"
          @click="addArticle"
          color="#fff"
          size=".8rem"
          v-if="addshow"
          style="margin-left: 10px"
        />
        <van-icon
          name="scan"
          @click="scanAudit"
          color="#fff"
          size=".8rem"
          v-if="user.mmtid == 4 || user.id == 1"
          style="margin-left: 10px; margin-right: 10px"
        />
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
    <van-popup
      v-model="scanQrAudit"
      position="bottom"
      closeable
      round
      :style="{ height: '97%' }"
    >
      <div class="scanQrAudit-class" v-if="SupermarketList != ''">
        <van-cell
          title="联系方式"
          :label="SupermarketList.contact_number"
          size="large"
          value="请认真核对信息"
        />
        <van-cell
          title="自提点名称"
          :label="SupermarketList.contact_name"
          size="large"
        />
        <van-cell title="自提地址" :label="statusInfoSite()" size="large" />
        <van-cell title="门店照片" size="large" />
        <div class="scanQrAudit-img">
          <van-image
            width="98%"
            height="auto"
            lazy-load
            :src="SupermarketList.pickup_photos"
          />
        </div>

        <van-cell title="营业执照" size="large" />
        <div class="scanQrAudit-img">
          <van-image
            width="98%"
            height="auto"
            lazy-load
            :src="SupermarketList.business_license"
          />
        </div>

        <van-button type="info" size="large" @click="passStatus"
          >通过</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { wxMapGetAddress } from "@/utils/wxshare.js";
import { getLngLatLocation } from "@/utils/map.js";
import { getMessage, TencentArticl01 } from "@/api/index";
import { wexinConfig, inviterInfo, passInviter } from "./actions";
import wx from "weixin-js-sdk";
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
      addshow: false,
      SupermarketList: "",
      scanQrAudit: false,
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
    if (this.user.mmtid == 3) {
      this.addshow = true;
    }
    wexinConfig(URL).then((res) => {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "translateVoice",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "onVoicePlayEnd",
          "pauseVoice",
          "stopVoice",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard",
        ], // 必填，需要使用的JS接口列表
      });
    });
    wx.error(function (res) {});
    // this.initLocal();
    this.getMessage();
  },
  methods: {
    ...mapMutations(["delUser", "setUserMap"]),
    scanAudit() {
      var _this = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr;
          console.log(result);
          inviterInfo(result).then((res) => {
            _this.SupermarketList = res.data;
            _this.scanQrAudit = true;
          });
        },
      });
    },
    statusInfoSite() {
      return (
        this.SupermarketList.province +
        this.SupermarketList.city +
        this.SupermarketList.district +
        this.SupermarketList.detailed_site
      );
    },
    passStatus() {
      passInviter(this.SupermarketList.mem_phone).then((res) => {
        console.log(res);
        this.$toast(res.msg);
        this.scanQrAudit = false;
      });
    },
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
        this.$router.push("/wlogin");
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
    },
  },
};
</script>

<style scoped lang='less'>
.page-wrapper {
  width: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  height: 44px;
  background: #07c160;
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
      flex: 1;
      height: 28px;
      border-radius: 5px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .page-location {
        flex: 1;
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
        color: #07c160;
        padding-left: 15px;
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
      min-width: 100px;
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
  .scanQrAudit-class {
    width: 100%;
    height: 100%;
    border: 1px red solid;
    overflow: auto;
    padding-bottom: 120px;
    margin-top: 40px;
    .scanQrAudit-img {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
