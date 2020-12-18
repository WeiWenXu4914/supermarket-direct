<template>
  <div class="merchantsHomeClass">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div :class="[SkShow ? 'container' : 'containers']" v-if="flag">
        <transition transition name="van-slide-down">
          <div class="page-title" v-show="SkShow">
            <van-icon name="arrow-left" size="25" @click="back" />
            <van-search
              clearable
              v-bind="onSearch"
              v-model="searchValue"
              placeholder="搜索商品"
              input-align="center"
              :show-action="searchShow"
              @cancel="searchShowFun(0)"
              @focus="searchShowFun(1)"
            >
            </van-search>
          </div>
        </transition>

        <transition transition name="van-slide-down">
          <div class="page-head" v-show="!searchShow">
            <merchant-header
              :merchantInfo="merchantInfo"
              @changeFocus="changeFocus"
            />
          </div>
        </transition>

        <van-tabs
          background="#F5F6F8"
          v-model="isActive"
          animated
          swipeable
          line-height="0"
          line-width="0"
          :ellipsis="false"
          :lazy-render="false"
          title-active-color="#fff"
          :border="false"
          sticky
          @click="changeFun"
          @change="changeFun"
          @scroll="remember($event)"
          :style="[{ marginTop: searchShow ? '60px' : '' }]"
          v-if="tabbarList.length > 0"
        >
          <van-tab
            :title="item.class_name"
            ref="merchantTabbar"
            v-for="(item, index) in tabbarList"
            :key="index"
          >
            <div class="page-inner">
              <template v-if="item.entfid === 0">
                <produce
                  :key="merchantInfo.entid + activeKey"
                  ref="product"
                ></produce>
              </template>
              <template v-if="item.entfid === 1">
                <discounts
                  :key="merchantInfo.entid + activeKey"
                  :Discounts="merchantInfo"
                ></discounts>
              </template>
              <template v-else-if="item.entfid === 2">
                <luck
                  :key="merchantInfo.entid + activeKey"
                  :info="merchantInfo"
                  :awardsSon="awards"
                  :aid="aid"
                  :allMsg="awardsListAll"
                ></luck>
              </template>
              <template v-else-if="item.entfid === 3">
                <groupBooking
                  :key="merchantInfo.entid + activeKey"
                  :groupBooking="merchantInfo"
                ></groupBooking>
              </template>
              <template v-else-if="item.entfid === 4">
                <groupPurchase
                  :key="merchantInfo.entid + activeKey"
                  :groupPurchase="merchantInfo"
                ></groupPurchase>
              </template>
              <template v-else-if="item.entfid === 5">
                <graphic-all
                  :key="merchantInfo.entid + activeKey"
                  :graphic="merchantInfo"
                  @showForward="showForward"
                ></graphic-all>
              </template>
              <template v-else-if="item.entfid === 6">
                <graphic-article
                  :key="merchantInfo.entid + activeKey"
                  :graphic="merchantInfo"
                  @showForward="showForward"
                ></graphic-article>
              </template>
              <template v-else-if="item.entfid === 8">
                <graphic-video
                  :key="merchantInfo.entid + activeKey"
                  :graphic="merchantInfo"
                  @showForward="showForward"
                ></graphic-video>
              </template>
              <template v-else-if="item.entfid === 9">
                <graphic-other
                  :key="merchantInfo.entid + activeKey"
                  :graphic="merchantInfo"
                  @showForward="showForward"
                ></graphic-other>
              </template>
              <template v-else-if="item.entfid === 11"> 拼团 </template>
              <template v-else-if="item.entfid === 10"> 套餐 </template>
              <template v-else-if="item.entfid === 14">
                <produce-app
                  :key="merchantInfo.entid + activeKey"
                  ref="productApp"
                ></produce-app>
              </template>
            </div>
          </van-tab>
        </van-tabs>
        <van-empty v-else description="该企业很懒，未发布任何内容" />
        <!-- <bottomTabr v-show="SkShow"/> -->

        <!-- <div class="ImClass" v-show="showImBtn" @click="getImInfo">客户群</div> -->
        <!-- <van-share-sheet
          v-if="group != ''"
          v-model="showGroup"
          title="商家的群聊"
          :options="group"
          @select="imRouter"
        /> -->
      </div>
    </van-pull-refresh>
    <!-- 分享 -->
    <transition on name="van-fade">
      <div v-if="forwardMark" class="forward" @click="forwardMark = false">
        <div class="box">
          <div class="icon">
            <img src="../../assets/icons/forward.png" alt="" />
          </div>
          <div class="text">点击右上角发送给指定朋友或者分享到朋友圈。</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getChatInfo, getUserChatInfo } from "@/api/im";
import PageTitle from "@/components/PageTitle";
import MerchantHeader from "./components/MerchantHeader";
import MerchantTabbar from "./components/MerchantTabbar";
import produce from "./produce";
import luck from "./luck";
import groupBooking from "./groupBooking";
import groupPurchase from "./groupPurchase";
import graphicAll from "./graphicAll";
import graphicArticle from "./graphicArticle";
import graphicVideo from "./graphicVideo";
import graphicOther from "./graphicOther";
import discounts from "./discounts";
import produceApp from "./produceApp";
import BottomTabr from "./components/BottomTabr";
import { getEnterpriseHomepage } from "./actions/index.js";
import { Toast, ShareSheet } from "vant";
import { RotaryDraw, startActivity } from "./actions/index";
export default {
  name: "user-chat",
  components: {
    PageTitle,
    MerchantHeader,
    MerchantTabbar,
    BottomTabr,
    produce,
    luck,
    discounts,
    groupBooking,
    groupPurchase,
    graphicAll,
    graphicArticle,
    graphicVideo,
    graphicOther,
    produceApp,
  },
  beforeCreate() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 0,
    });
  },
  data() {
    return {
      searchValue: "",
      searchShow: false,
      isActive: 0,
      fromPath: "",
      merchantInfo: {},
      tabbarList: [],
      flag: false,
      fromRouter: "",
      SkShow: true,
      group: "",
      showGroup: false,
      showImBtn: false,
      //抽奖数据
      awardsList: [],
      awardsListAll: [],
      awards: [],
      aid: null,
      activeKey: 0,
      forwardMark: false,
      isLoading: false,
    };
  },
  watch: {
    'isActive':function (newVal,oldVal) {

      let obj = {
        path: this.$route.path,
        active: newVal
      }

      this.$store.commit('setStoreTab',obj);

    }
  },
  computed: {
    onSearch() {
      if (this.searchValue != "") {
        this.onSearchFun();
      }
    },
  },
  created() {
    this.getPageData();
    this.getPrizeList();
    this.keepTabState();
  },
  methods: {
    //保存tab标签状态
    keepTabState() {
      let obj = this.$store.state.watchStoreTab;
      if(this.$route.path == obj.path) {
        this.isActive = obj.active;
      }
    },
    onRefresh() {
      this.getPageData();
      this.getPrizeList();
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    showForward(val) {
      if (val.type == 1) {
        this.forwardMark = true;
      } else {
        this.forwardMark = false;
      }
    },
    back() {
      if (this.$route.query.qrcode_entid) {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    },
    changeFun() {
      // this.activeKey = Date.parse(new Date());
    },
    onSearchFun() {
      this.$refs.product[0].productSearch(this.searchValue);
    },
    searchShowFun(type) {
      if (type == 1) {
        this.searchShow = true;
      } else {
        this.searchShow = false;
        this.searchValue = "";
        this.$refs.product[0].productSearch();
      }
    },
    getImInfo() {
      this.showGroup = !this.showGroup;
      // 获取group信息
      this.getGroupInfo();
    },
    // 获取群聊信息
    getGroupInfo() {
      var data = {
        url: "queryMyCreatGroups",
        memid: this.merchantInfo.memid,
        res: JSON.parse(this.$Utils.demoResponse(this.$route.query.res)),
      };
      getChatInfo(data).then((value) => {
        if (value.code == 100) {
          if (value.data.data == null) {
            Toast(value.data.message);
          } else {
            this.group = value.data.data;
            this.getUserChatInfoFun();
          }
        } else {
          Toast(value.msg);
        }
      });
    },
    getUserChatInfoFun() {
      // 获取聊天信息
      getUserChatInfo(this.merchantInfo.memid)
        .then((value) => {
          let loginResult = this.imService.login(
            value.data.data,
            this.merchantInfo.memid
          );
          if (loginResult) {
            loginResult
              .then(() => {
                // 连接IM
                this.imService.connectIM();
              })
              .catch((err) => {});
          } else {
            Toast("获取聊天信息失败，请返回重试");
          }
        })
        .catch((err) => {});
    },
    imRouter(option, index) {
      var obj = {
        entid: this.merchantInfo.entid,
        memid: this.merchantInfo.memid,
        group: this.group[index],
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: "/im",
        query: { res: res },
      });
    },
    remember(e) {
      this.SkShow = !e.isFixed;
    },
    // 获取企业信息
    getPageData() {
      var id = JSON.parse(this.$Utils.demoResponse(this.$route.query.res));
      getEnterpriseHomepage(id.entid).then((res) => {

        setTimeout(function () {
          Toast.clear();
        }, 200);
        if (res.code === 100) {
          this.merchantInfo = res.data;
          this.flag = true;
          this.tabbarList = res.data.ent_features;

          //删除全部标签
          for(let i = 0; i < this.tabbarList.length; i++) {
            if(this.tabbarList[i].class_name == '全部') {
              this.tabbarList.splice(i,1);
              break;
            }
          }

          if (res.data.mem_attention != "未关注") {
            this.showImBtn = true;
          }
        } else {
          this.$toast(res.msg);
          setTimeout(() => {
            this.$router.push("/life");
          }, 300);
        }
      });
    },
    changeFocus(type) {
      if (type == 1) {
        this.showImBtn = true;
        this.merchantInfo.attention_my_num =
          this.merchantInfo.attention_my_num + 1;
      } else {
        this.showImBtn = false;
        this.merchantInfo.attention_my_num =
          this.merchantInfo.attention_my_num - 1;
      }
    },
    //获取奖品列表
    getPrizeList() {
      let id = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
        .entid;
      RotaryDraw(id).then((res) => {
        if (res.code == 100) {
          this.aid = res.data.aid;
          this.awardsListAll = res.data;
          let dataList = res.data;
          //取出奖品列表(数组)
          let reg = /aprid/;
          for (let key in dataList) {
            if (key.match(reg)) {
              this.awardsList.push(dataList[key]);
            }
          }
          //处理转盘数据格式
          for (let i = 0; i < this.awardsList.length; i++) {
            this.awards[i] = {
              name: this.awardsList[i].apr_name,
              photo_url: this.awardsList[i].photo_url,
            };
          }
        }
      });
    },
  },
  mounted: function () {},
};
</script>

<style scoped lang='less'>
.merchantsHomeClass {
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .page-inner {
    //height:300px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 55px;
    background: #f5f6f8;
    //overflow: hidden;
  }
  .page-head {
    background: #fff;
    border-radius: 0px 0px 5px 5px;
  }
  .container {
    min-height: calc(100vh - 50px);
    margin-top: 50px;
    // margin-bottom:52px;
    background: #f5f6f8;
    //overflow:hidden;
    //border:1px red solid;
  }
  .containers {
    min-height: calc(100vh);
    background: #f5f6f8;
    //overflow: hidden;
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .page-title {
    height: auto;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-icon {
      width: 10%;
      padding-left: 8px;
    }
    .van-search {
      width: 90%;
    }
  }
  /deep/ .van-tabs {
    background: #f5f6f8;
    margin-top: 10px;
  }
  /deep/ .van-tab--active {
    .van-tab__text {
      background: #d04443;
      border-radius: 30px;
      font-size: 15px;
      padding: 5px 10px 5px 10px;
      font-weight: 500;
    }
  }
  .ImClass {
    width: 52px;
    height: 52px;
    border-radius: 52px;
    position: fixed;
    bottom: 65px;
    right: 10px;
    text-align: center;
    line-height: 52px;
    background: linear-gradient(138deg, #fd5947 0%, #f7282d 100%);
    box-shadow: 0px 2px 5px #f93835;
    opacity: 1;
    color: #fff;
  }
}
.forward {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  overflow: auto;
  top: 0px;
  .icon {
    width: 100%;
    text-align: right;
    padding-right: 20px;
  }
  .text {
    width: 100%;
    text-align: right;
    color: #fff;
  }
}
</style>