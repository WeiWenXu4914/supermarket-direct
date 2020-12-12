<template>
  <div id="shops-head-root" v-if="merchantInfo">
    <div class="shops-head">
      <div class="head-left">
        <div class="head-image">
          <van-image
            :src="merchantInfo.ent_logo"
            width="100%"
            height="100%"
            fit="contain"
            lazy-load
            @click="userHandle"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="head-info">
          <div
            class="head-title"
            @click="$router.push(`/company/home/${merchantInfo.entid}`)"
          >
            {{ merchantInfo.ent_name }}
            <van-icon name="arrow" color="#717171" size="15" />
          </div>
          <div class="head-star">
            <!-- <div class="star-text">{{ merchantInfo.starText }}</div> -->
            <van-rate
              v-model="merchantInfo.ent_grade"
              :size="20"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              readonly
            />
            <div class="star-number">{{ str(+merchantInfo.ent_grade) }}</div>
          </div>
        </div>
      </div>
      <div class="head-command">
        <van-button
          @click="changeFocus(merchantInfo.mem_attention)"
          type="danger"
          class="custom-btn"
          >{{ merchantInfo.mem_attention }}</van-button
        >
      </div>
    </div>
    <div class="numbers">
      <div class="number-item">
        <div class="numbers-rec">
          <div class="rec-desc">关注</div>
          <div class="rec-num">{{ merchantInfo.my_attention_num }}</div>
        </div>
        <div class="numbers-rec">
          <div class="rec-desc">粉丝</div>
          <div class="rec-num">{{ merchantInfo.attention_my_num }}</div>
        </div>
        <!-- <div class="numbers-rec">
          <div class="rec-desc">员工</div>
          <div class="rec-num">{{ merchantInfo.my_employee }}</div>
        </div> -->
      </div>
      <div class="myIdcard" @click="showIdcard">
        <span>我的名片</span>
        <van-icon name="qr" size="15" />
      </div>
    </div>
    <div
      class="image-group"
      v-html="merchantInfo.ent_style"
      @click="getpreview($event)"
    >
      <!-- <img v-for="(image, index) in merchantInfo.images" :key="index" :src="image" /> -->
    </div>
    <div class="time">
      <div class="time_left">
        <div class="time_text">
          <span class="time_title">营业时间：</span>
          <span
            class="time_con"
            v-for="(item, index) in merchantInfo.ent_business_days"
            :key="index"
          >
            {{ item }}
          </span>
          <br />
          <span
            class="time_time"
            v-if="
              merchantInfo.ent_business_hours != null ||
              merchantInfo.ent_proofing_time != null
            "
          >
            {{ merchantInfo.ent_business_hours }} -
            {{ merchantInfo.ent_proofing_time }}
          </span>
        </div>
        <div class="time_site">
          <div>
            <span class="time_title">店铺地址：</span>
            <span class="time_con">{{ merchantInfo.ent_detailed_site }}</span>
          </div>
          <!-- <img src="../img/site.svg" alt="" @click="openMap"> -->
        </div>
      </div>
      <div class="phone" @click="callPhone(merchantInfo.service_phone)">
        <van-icon name="phone" color="#D04443" />
      </div>
    </div>
    <div class="qrcode-item-back" v-show="idCardShow">
      <div class="qrcode-item">
        <div class="qrcode-top" ref="entIdcard" v-if="imgUrl == ''">
          <div class="qrcode-user">
            <div class="qrcode-user-item">
              <div class="qrcode-user-head" @click="userHandle">
                <img :src="merchantInfo.ent_logo_base64" width="70px" height="70px" />
              </div>
              <div
                class="qrcode-user-name"
                @click="$router.push(`/company/home/${merchantInfo.entid}`)"
              >
                <div class="head-title">
                  {{ merchantInfo.ent_name }}
                </div>
              </div>
            </div>
            <div class="qrcode-number-item">
              <div class="numbers-rec">
                <div class="rec-desc">关注</div>
                <div class="rec-num">{{ merchantInfo.my_attention_num }}</div>
              </div>
              <div class="numbers-rec">
                <div class="rec-desc">粉丝</div>
                <div class="rec-num">{{ merchantInfo.attention_my_num }}</div>
              </div>
              <div class="numbers-rec">
                <div class="rec-desc">员工</div>
                <div class="rec-num">{{ merchantInfo.my_employee }}</div>
              </div>
            </div>
          </div>
          <div class="qrcode-image">
            <vue-qr
              :margin="0"
              :text="href"
              :size="200"
              :logoSrc="merchantInfo.ent_logo_base64"
            />
          </div>
          <div class="qrcode-time">
            <div class="time_left">
              <div class="time_text">
                <span class="time_title">营业时间：</span>
                <span
                  class="time_con"
                  v-for="(item, index) in merchantInfo.ent_business_days"
                  :key="index"
                >
                  {{ item }}
                </span>
                <br />
                <span
                  class="time_time"
                  v-if="
                    merchantInfo.ent_business_hours != null ||
                    merchantInfo.ent_proofing_time != null
                  "
                >
                  {{ merchantInfo.ent_business_hours }} -
                  {{ merchantInfo.ent_proofing_time }}
                </span>
              </div>
              <div class="time_site">
                <span class="time_title">店铺地址：</span>
                <span class="time_con">
                  {{ merchantInfo.ent_detailed_site }}</span
                >
              </div>
              <div
                class="time_site"
                @click="callPhone(merchantInfo.service_phone)"
              >
                <span class="time_title">联系方式：</span>
                <span class="time_con"> {{ merchantInfo.service_phone }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="qrcode-top" v-else>
          <img :src="imgUrl"  width="100%">
        </div>
        <div class="qrcode-btn">
          <div class="qrcode-btn-top">
            <div class="qrcode-btn-top-items" @click="toImage">
              <van-button type="primary" :loading="doanLoading" :disabled="doanDisabled">{{ doanText }}</van-button>
            </div>
            <div class="qrcode-btn-top-items" @click="showForward">
              <van-button color="#D04443">转发</van-button>
            </div>
          </div>
          <div class="qrcode-btn-bottom" @click="idCardShow = false">取消</div>
        </div>
      </div>
    </div>

    <!-- 分享 -->
    <transition on name="van-fade">
      <div v-if="forwardMark" class="forward" @click="forwardMark = false">
        <div class="box">
          <div class="icon">
            <img src="@/assets/icons/forward.png" alt="" />
          </div>
          <div class="text">点击右上角发送给指定朋友或者分享到朋友圈。</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import StarCard from "./star";
import { ImagePreview, Toast } from "vant";
import { changeFouce as focus, forwardArticles } from "../../home/actions";
import { wxJSSDK } from "@/utils/wxshare.js";
import VueQr from "vue-qr";
import { mapState, mapMutations } from 'vuex'
import html2canvas from "html2canvas";
import wx from 'weixin-js-sdk';
export default {
  components: {
    StarCard,
    VueQr,
    html2canvas,
  },
  props: {
    merchantInfo: {
      type: Object,
    },
  },
  data() {
    return {
      idCardShow: false,
      href: "",
      forwardMark: false,
      imgUrl:'',
      doanText:'保存',
      doanLoading:false,
      doanDisabled:false
    };
  },
  computed : {
    ...mapState(['user'])
  },
  methods: {
    getLocation() {
      return new Promise((resovle,reject) => {
        
          wx.ready(() => {
                  wx.getLocation({
                      type: 'wgs84', 
                      success: (res) => { 
                          resovle(res);
                      }
              });
          })

          wx.error((res) => {
              reject(res);
          });

      })
      
            
    },
    async openMap() {
     
        Toast("请稍等，正在为您打开地图");
        await this.getLocation()
        .then((res) => {
            wx.openLocation({
              latitude: parseFloat(res.latitude), // 纬度，浮点数，范围为90 ~ -90
              longitude: parseFloat(res.longitude), // 经度，浮点数，范围为180 ~ -180。
              name: '本人地址', // 位置名
              address: '', // 地址详情说明
              scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
              // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        })
        .catch((err) => {
          Toast("因权限受限，无法为您打开地图");
            console.log(err);
        })

        
    },
    callPhone(phoneNumber) {
      window.location.href = "tel://" + phoneNumber;
    },
    // 页面元素转图片
    toImage() {
      this.doanLoading = true;
      this.doanDisabled = true;
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      html2canvas(this.$refs.entIdcard, {
        backgroundColor: null,
      }).then((canvas) => {
        let url = canvas.toDataURL("image/png");
        this.imgUrl = url;
        this.doanText = '由于微信限制,请长按保存';
        this.doanLoading = false;
        this.doanDisabled = false;
        setTimeout(()=>{
          this.doanText = '保存';
        },4000)
      });
    },
    getpreview(e) {
      if (e.target.tagName == "IMG") {
        ImagePreview({
          images: [e.target.src],
          showIndex: false,
          closeable: true,
          closeOnPopstate: true, //页面回退关闭预览
        });
      }
    },
    str(value) {
      return value.toFixed(2);
    },
    async changeFocus(type) {
      if (type == "已关注") {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否取消关注",
          })
          .then(async () => {
            //获取当前关注状态
            //调取接口改变关注状态

            const query = {
              id: this.merchantInfo.memid,
              mem_attention_class: 1,
              state: 1,
            };
            const res = await focus(query);

            if (res.code === 100) {
              this.$toast.success("取消关注");
              this.merchantInfo.mem_attention = "未关注";
              this.$emit("changeFocus", 0);
            } else {
              this.$toast.fail("操作失败");
            }
            //刷新页面
          })
          .catch(() => {});
      } else if (type == "未关注") {
        const query = {
          id: this.merchantInfo.memid,
          mem_attention_class: 1,
          state: 0,
        };
        const res = await focus(query);

        if (res.code === 100) {
          this.$toast.success("关注成功");
          this.merchantInfo.mem_attention = "已关注";
          this.$emit("changeFocus", 1);
        } else {
          this.$toast.fail("关注失败");
        }
      }
    },
    userHandle() {
      this.$router.push({
        path: `/user/page/${this.merchantInfo.memid}`,
        query: { type: "u" },
      });
    },
    showIdcard() {
      this.idCardShow = true;
    },
    // 显示分享
    showForward() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        forwardArticles(this.merchantInfo.memid, 3).then((res) => {
          this.forwardMark = true;

          if (res.code == 100) {
            var imgUrl = this.merchantInfo.ent_logo;

            var title = this.merchantInfo.ent_name;
            var desc = this.merchantInfo.ent_introduction;
            if (desc == "无") {
              desc = "城事乐家,助力实体企业线上发展";
            }

            var form = {
              title: title,
              link: this.href,
              imgUrl: imgUrl,
              desc: desc,
            };

            wxJSSDK(form);
          } else {
            this.idCardShow = false;
            this.forwardMark = false;
          }

          setTimeout(() => {
            this.forwardMark = false;
          }, 4000);
        });
      } else {
        this.$toast("请在微信中分享");
      }
    },
    autoForward() {
      var link =
        window.location.href + "&qrcode_entid=" + this.merchantInfo.entid;
      if (this.user.id != undefined) {
        link =
          window.location.href +
          "&qrcode_entid=" +
          this.merchantInfo.entid +
          "&qrcode_memid=" +
          this.user.id;
      }

      this.href = link;
      // 注册微信分享
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var imgUrl = this.merchantInfo.ent_logo;

        var title = this.merchantInfo.ent_name;
        var desc = this.merchantInfo.ent_introduction;
        if (desc == "无") {
          desc = "城事乐家,助力实体企业线上发展";
        }

        var form = {
          title: title,
          link: link,
          imgUrl: imgUrl,
          desc: desc,
        };

        wxJSSDK(form);
      }
    },
  },
  mounted: function () {
    this.autoForward();

    let URL = '';
    if (window.__wxjs_is_wkwebview === true) {
      URL = window.location.href.split('#')[0] || window.location.href
    }

    // wexinConfig(URL)
    // .then((res) => {
      
    //   wx.config({
    //     debug: false, 
    //     appId: res.data.appId,
    //     timestamp: res.data.timestamp,
    //     nonceStr: res.data.nonceStr,
    //     signature: res.data.signature,
    //     jsApiList: [
    //       'checkJsApi',
    //       'onMenuShareTimeline',
    //       'onMenuShareAppMessage',
    //       'onMenuShareQQ',
    //       'onMenuShareWeibo',
    //       'onMenuShareQZone',
    //       'hideMenuItems',
    //       'showMenuItems',
    //       'hideAllNonBaseMenuItem',
    //       'showAllNonBaseMenuItem',
    //       'translateVoice',
    //       'startRecord',
    //       'stopRecord',
    //       'onVoiceRecordEnd',
    //       'playVoice',
    //       'onVoicePlayEnd',
    //       'pauseVoice',
    //       'stopVoice',
    //       'uploadVoice',
    //       'downloadVoice',
    //       'chooseImage',
    //       'previewImage',
    //       'uploadImage',
    //       'downloadImage',
    //       'getNetworkType',
    //       'openLocation',
    //       'getLocation',
    //       'hideOptionMenu',
    //       'showOptionMenu',
    //       'closeWindow',
    //       'scanQRCode',
    //       'chooseWXPay',
    //       'openProductSpecificView',
    //       'addCard',
    //       'chooseCard',
    //       'openCard'
    //   ] // 必填，需要使用的JS接口列表
    //   });
    // })
    // wx.error(function(res){});
  
  },
};
</script>

<style lang='less' scoped>
#shops-head-root {
  //margin-top: 50px;
  padding: 15px 15px 5px 15px;
  .shops-head {
    display: flex;
    justify-content: space-between;
    .head-left {
      display: flex;
      justify-content: center;
      .head-image {
        width: 45px;
        height: 45px;
        overflow: hidden;
        /deep/ .van-image {
          img {
            width: 100%;
            height: 100%;
            border-radius: 2px;
          }
        }
      }
      .head-info {
        margin-left: 11px;
        .head-title {
          width: 50vw;
          font-family: ArialMT;
          font-weight: 400;
          color: #212121;
          font-size: 15px;
          display: flex;
          align-items: center;
        }
        .head-star {
          height: 22px;
          margin-top: 5px;
          display: flex;
          align-content: center;
          .star-text {
            font-size: 13px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 22px;
            color: rgba(61, 61, 61, 1);
          }
          .star-number {
            width: 20px;
            height: 22px;
            font-size: 13px;
            font-family: Avenir;
            font-weight: 500;
            line-height: 26px;
            color: rgba(250, 191, 80, 1);
            opacity: 1;
            margin-left: 10px;
          }
        }
      }
    }
    .head-command {
      align-items: flex-end;
      line-height: 45px;
      .custom-btn {
        // width:50px;
        height: 28px;
        background: rgba(208, 68, 67, 1);
        border-radius: 3px;
        font-size: 13px;
      }
    }
  }
  .numbers {
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .number-item {
      width: 70%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .numbers-rec {
        margin-right: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .rec-desc {
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 22px;
          color: rgba(116, 116, 116, 1);

          margin-right: 5px;
        }
        .rec-num {
          font-size: 16px;
          font-family: DIN;
          font-weight: 500;
          line-height: 20px;
          color: rgba(61, 61, 61, 1);
        }
      }
    }
    .myIdcard {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        font-size: 15px;
        color: rgba(116, 116, 116, 1);
      }
      i {
        margin-top: 2px;
        margin-left: 5px;
      }
    }
  }
  .image-group {
    width: 100%;
    /deep/ p {
      display: none;
    }
    /deep/ div {
      width: auto !important;
      height: 82px;
    }
    /deep/ ul {
      margin-top: 15px;
      height: 82px;
      overflow-x: auto;
      white-space: nowrap;
      overflow-y: hidden;
      width: auto;
      li {
        margin-right: 5px;
        width: 121px !important;
        height: 82px;
        display: inline-block;
        float: none !important;
        img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          border-radius: 2px;
        }
      }
    }
  }
  .qrcode-item-back {
    width: 100%;
    position: fixed;
    z-index: 9999;
    left: 0;
    bottom: 0px;
    height: 100vh;
    background: rgba(111, 111, 111, 0.4);
    .qrcode-item {
      width: 100%;
      overflow: auto;
      position: fixed;
      bottom: 0;
      .qrcode-top {
        width: 90%;
        margin: 0 auto;
        border-radius: 5px;
        background: #ffffff;
        -moz-box-shadow: 0px 0px 2px #8a8a8a;
        -webkit-box-shadow: 0px 0px 2px #8a8a8a;
        box-shadow: 0px 0px 2px #8a8a8a;
        .qrcode-user {
          width: 100%;
          margin: 0 auto;
          padding-top: 10px;
          .qrcode-user-item {
            width: 100%;
            text-align: center;
            .qrcode-user-head {
              margin-top: 5px;
              img {
                border-radius: 100%;
              }
            }
            .qrcode-user-name {
              font-size: 15px;
              font-weight: 400;
              margin-top: 5px;
            }
          }
          .qrcode-number-item {
            width: 100%;
            margin-top: 3px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            .numbers-rec {
              margin-right: 8px;
              display: flex;
              flex-direction: row;
              align-items: center;
              .rec-desc {
                font-size: 13px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 22px;
                color: rgba(116, 116, 116, 1);
                margin-right: 5px;
              }
              .rec-num {
                font-size: 16px;
                font-family: DIN;
                font-weight: 500;
                line-height: 18px;
                color: rgba(61, 61, 61, 1);
              }
            }
          }
        }
        .qrcode-image {
          width: 100%;
          margin: 0 auto;
          padding: 10px 0px 10px 0px;
          display: flex;
          justify-content: center;
        }
        .qrcode-time {
          width: 85%;
          margin: 0 auto;
          min-height: 60px;
          margin-top: 10px;
          padding-bottom: 10px;
          overflow: auto;
          .time_left {
            float: left;
            width: 84%;
            height: 100%;
            .time_text {
              width: 100%;
              min-height: 50%;
              height: auto;
              // background:#1ee;
            }
            .time_site {
              display: flex;
              width: 100%;
              height: 50%;
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
          .phone {
            float: right;
            width: 15%;
            height: 100%;
            line-height: 70px;
            text-align: center;
            font-size: 30pt;
          }
          .time_title {
            width: 112px;
            height: 28px;
            font-size: 15px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 30px;
            color: rgba(103, 103, 103, 1);
            opacity: 1;
          }
          .time_con {
            width: 146px;
            font-size: 15px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 30px;
            color: rgba(31, 31, 31, 1);
            opacity: 1;
          }
          .time_time {
            margin-left: 75px;
            width: 75px;
            font-size: 15px;
            font-family: Arial;
            font-weight: 400;
            line-height: 30px;
            color: rgba(69, 69, 69, 1);
            opacity: 1;
          }
        }
      }
      .qrcode-btn {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .qrcode-btn-top {
          width: 100%;
          background: #f8f8f8;
          text-align: center;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: center;
          justify-content: space-between;
          align-items: center;
          font-size: 17px;
          color: #111;
          font-weight: 500;
          border-radius: 10px 10px 0px 0px;
          padding: 10px 0px 10px 0px;
          -moz-box-shadow: 0px 0px 2px #333333;
          -webkit-box-shadow: 0px 0px 2px #333333;
          box-shadow: 0px 0px 2px #333333;
          .qrcode-btn-top-items {
            width: 50%;
            height: 50px;
            line-height: 50px;
          }
        }
        .qrcode-btn-bottom {
          width: 100%;
          background: #ffffff;
          text-align: center;
          font-size: 17px;
          color: #111;
          font-weight: 500;
          padding: 15px 0px 15px 0px;
        }
      }
    }
  }
  .time {
    width: 100%;
    min-height: 60px;
    margin-top: 10px;
    overflow: auto;
    .time_left {
      float: left;
      width: 84%;
      height: 100%;
      .time_text {
        width: 100%;
        min-height: 50%;
        height: auto;
        // background:#1ee;
      }
      .time_site {
        display: flex;
        width: 100%;
        height: 50%;
        align-items: center;
        img {
          widows: 30px;
          height: 30px;
          margin-left: 15px;
        }
      }
    }
    .phone {
      float: right;
      width: 15%;
      height: 100%;
      line-height: 70px;
      text-align: center;
      font-size: 30pt;
    }
    .time_title {
      width: 112px;
      height: 28px;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 30px;
      color: rgba(103, 103, 103, 1);
      opacity: 1;
    }
    .time_con {
      //margin-left:10px;
      width: 146px;
      height: 28px;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 30px;
      color: rgba(31, 31, 31, 1);
      opacity: 1;
    }
    .time_time {
      margin-left: 73px;
      width: 75px;
      height: 33px;
      font-size: 15px;
      font-family: Arial;
      font-weight: 400;
      line-height: 30px;
      color: rgba(69, 69, 69, 1);
      opacity: 1;
    }
  }
  .forward {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    .box {
      position: absolute;
      right: 30px;
      top: 60px;
      box-sizing: border-box;
      padding: 5px;
      background: none;
      border: 1px solid #fff;
      border-radius: 3px;
      color: #fff;
      width: 110px;
      font-size: 13px;
      .icon {
        top: -64px;
        height: 70px;
        left: 45px;
        img {
          height: 100%;
          transform: rotate(-9deg);
        }
        position: absolute;
      }
    }
  }
}
</style>
