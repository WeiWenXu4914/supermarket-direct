<template>
  <div
    :class="[!btnShow ? 'home-page' : 'home-pages']"
    :style="[{ height: seaShow && btnShow ? 'calc(100vh - 41px)' : '' }]"
  >
    <page-header ref="pageHeader" :local="local" />

    <!-- <span class="bar_btn" @click="showChannel" v-if="activeNav.length > 0">
      <van-icon name="wap-nav" size="20" color="#909090" />
    </span> -->

    <van-tabs
      v-if="activeNav.length > 0"
      :lazy-render="true"
      swipeable
      :ellipsis="false"
      @click="changeChannel"
      @change="changeChannel"
      v-model="activeIndex"
    >
      <van-tab
        :title="item.nav_name"
        v-for="(item, index) in activeNav"
        :key="index"
      >
        <div ref="scroll-wrapper" class="scroll-wrapper">
          <van-cell-group>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <!-- 二级菜单  -->
              <van-grid
                :disabled="true"
                :column-num="5"
                square
                icon-size="25px"
                clickable
                :border="false"
              >
                <van-grid-item
                  :icon="preitems.nav_icon"
                  :key="preindex"
                  v-for="(preitems, preindex) in activePreNav"
                  :text="preitems.nav_name"
                  @click="preNav(preitems.nid, preitems.nav_name)"
                />
              </van-grid>

              <van-list
                v-model="isLoading"
                :finished="!finished"
                finished-text="没有更多了"
                @onload="onLoad"
              >
                <div v-for="(items, index) in pageData" :key="items.gid">
                  <van-cell>
                    <template v-if="items.gc_id === 1">
                      <!-- 图文 -->
                      <article-item
                        v-if="items.gc_id === 1"
                        :article="items"
                        @changeFocus="changeFocus"
                        ref="articleItem"
                        @showForward="showForward"
                        :key="items.gid"
                        @deleteIndex="deleteIndex"
                        :index="index"
                      />
                    </template>

                    <template v-else-if="items.gc_id === 2">
                      <!-- 视频 -->
                      <video-item
                        :videoItem="items"
                        @changeFocus="changeFocus"
                        @showForward="showForward"
                        :key="videoKey"
                        ref="videoItem"
                        @playerVideo="playerVideo(items)"
                        @deleteIndex="deleteIndex"
                        :index="index"
                        :title="item.nav_name"
                      />
                    </template>

                    <template v-else-if="items.gc_id === 3">
                      <!-- 中介 -->
                      <rent-item
                        v-if="items.gc_id === 3"
                        :rentItem="items"
                        :key="items.gid"
                        @deleteIndex="deleteIndex"
                        :index="index"
                      />
                    </template>

                    <template v-else-if="items.gc_id === 4">
                      <!-- 招聘 -->
                      <job-item
                        v-if="items.gc_id === 4"
                        :jobItem="items"
                        :key="items.gid"
                        @deleteIndex="deleteIndex"
                        :index="index"
                      />
                    </template>

                    <template v-else-if="items.gc_id === 6">
                      <!-- 广告 -->
                      <adv-item
                        v-if="items.gc_id === 6"
                        :advItem="items"
                        :key="items.gid"
                      />
                    </template>

                    <template v-else-if="items.gc_id === 999">
                      <!-- 商品 -->
                      <mer-chant
                        v-if="items.gc_id === 999"
                        :proItem="items"
                        :key="items.gid"
                      />
                    </template>
                  </van-cell>
                </div>
              </van-list>
            </van-pull-refresh>
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
    <div v-else>
      <van-empty description="数据为空" />
    </div>
    <channel-edit
      v-model="showEditChannel"
      :value="false"
      @closeEditHandeler="changeFocus"
    />

    <transition name="van-fade">
      <div class="go-top" v-show="btnShow" @click="goTop">
        <van-icon name="arrow-up" />
      </div>
    </transition>

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

    <!-- 底部tab栏 -->
    <transition transition name="van-slide-up">
      <tab-bar ref="TabBar" v-show="tabShow" :tabbarItem="2"></tab-bar>
    </transition>
  </div>
</template>

<script>
import * as click from "../../assets/lottie/click.json";
import PageHeader from "@/components/PageHeader";
import FirmRecom from "@/views/home/components/FirmRecom";
import ArticleItem from "@/views/home/components/ArticleItem";
import RentItem from "@/views/home/components/RentItem";
import AdvItem from "@/views/home/components/AdvItem";
import JobItem from "@/views/home/components/JobItem";
import VideoItem from "@/views/home/components/VideoItem";
import RecommendedVideoItem from "@/views/home/components/RecommendedVideoItem";
import MerChant from "@/views/home/components/MerChant";
import ChannelEdit from "@/views/home/components/ChannelEdit";
import {
  getHome,
  getHomeList,
  wexinConfig,
  forwardArticles,
  getHomeNav,
} from "./actions";
import { login } from "@/api";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import wx from "weixin-js-sdk";
import { getLocation, getLngLatLocation } from "@/utils/map.js";
import { wxJSSDK } from "@/utils/wxshare.js";
import Vue from "vue";
import { Grid, GridItem, Toast, Notify } from "vant";
import { userInfo } from "../user/actions/index";
import TabBar from "@/components/TabBar";

export default {
  name: "home",
  components: {
    PageHeader,
    FirmRecom,
    ArticleItem,
    RentItem,
    AdvItem,
    JobItem,
    MerChant,
    VideoItem,
    RecommendedVideoItem,
    ChannelEdit,
    TabBar,
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
      VideoShow: false,
      videoVal: {},
      GraphicRecommended: {},
      channelsList: [],
      downLoadText: "",

      activeIndex: 1,
      activeNav: [],
      activePreNav: [],
      pageData: [],
      isLoading: false,
      finished: false,
      tabShow: true,

      showEditChannel: false,
      value: "",
      firmList: [],
      btnShow: false,
      seaShow: true,
      scrollTop: 0,
      forwardMark: false,
      videoKey: 1, // 更新视频组件
      preDataId: 0, // 二级导航
      preData: {}, // 二级导航数据
      local: {},
      Loading: false,
      tabbarShow: 0,
      SuperiorNavName: [],
      clickOptions: {
        animationData: click.default,
      }
    };
  },
  // 组件开启缓存生效，激活组件(初始化和激活都执行)
  activated() {
    // 驼峰获取dom无效问题
    if (this.$refs["scroll-wrapper"]) {
      const dom = this.$refs["scroll-wrapper"][this.activeIndex];
      dom.scrollTop = this.activeChannel.scrollTop;
    }
  },
  created() {
    this.getHomeNav();
  },
  watch: {
    $route(to, from) {
      if (to.query) {
        this.$parent.TabBar(0);
      }
    },
    channelsList: function () {
      this.$nextTick(function () {
        // 页面渲染完延时关闭
        setTimeout(function () {
          Toast.clear();
        }, 200);
      });
    },
  },
  computed: {
    ...mapState(["user"]),
    activeChannel() {
      return this.channelsList[this.activeIndex];
    },
    nid() {
      return this.activeIndex + 1;
    },
    isFocus() {
      return this.activeIndex === 0;
    },
  },
  methods: {
    getHomeNav(type = 1, id = 0) {
      getHomeNav(type, id).then((res) => {
        if (type == 1) {
          this.activeNav = res.data;
          this.getHomeData(res.data[this.activeIndex].nid);
        } else {
          this.activePreNav = res.data;
        }
      });
    },
    // 首页数据
    getHomeData(id) {
      getHome(id).then((res) => {
        this.pageData = res.data;
      });
    },
    TabBar(val) {
      if (val == 2) {
        this.$refs.TabBar.getTabbat();
      } else if (val == 1) {
        if (this.tabShow == true) {
          this.tabShow = !this.tabShow;
        }
      } else {
        if (this.tabShow == false) {
          this.tabShow = !this.tabShow;
        }
      }
    },
    preNav(id) {
      this.getHomeData(id);
    },

    handleAnimation(anim) {
      this.anim = anim;
    },
    changeFocus(val) {
      this.getHomeData();
    },
    ...mapMutations(["setUser", "delUser"]),
    ...mapState(["user"]),
    // 打开频道管理列表
    showChannel() {
      this.showEditChannel = true;
    },
    // 切换频道
    changeChannel(val) {
      this.getHomeNav(2, this.activeNav[val].nid);
      this.getHomeData(this.activeNav[val].nid);
    },
    // 监听滚动事件
    remember(e) {},
    // 触底加载数据
    async onLoad() {
      console.log("123");
      // this.getHomeList(1, this.activeNav[this.activeIndex].nid, type);
    },
    // 下拉刷新
    async onRefresh() {
      this.getHomeData(this.activeNav[this.activeIndex].nid);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 回到顶部
    goTop() {
      if (this.$refs["scroll-wrapper"]) {
        const dom = this.$refs["scroll-wrapper"][this.activeIndex];
        let i = 0;
        const timeTop = setInterval(() => {
          dom.scrollTop = this.easeInOutQuad(
            10 * i,
            dom.scrollTop,
            -dom.scrollTop,
            500
          );
          // dom.scrollTop -= 50
          if (dom.scrollTop <= 0) {
            clearInterval(timeTop);
          }
          i++;
        }, 30);
      }
    },
    easeInOutQuad(t, b, c, d) {
      // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
      } else {
        // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
        return (-c / 2) * (--t * (t - 2) - 1) + b;
      }
    },
    del(index) {
      this.channelsList[0].navVal.splice(index, 1);
    },
    userHandle(type) {
      if (this.user.mmtid === 3) {
        var obj = {
          entid: this.user.relid,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        if (type == 1) {
          this.$router.push({
            path: `/user/page/${this.user.id}`,
            query: { type: "u" },
          });
        } else {
          this.$router.push({
            path: "/merchants",
            query: { res: res },
          });
        }
      } else {
        this.$router.push({
          path: `/user/page/${this.user.id}`,
          query: { type: "u" },
        });
      }
    },
  },
  mounted: function () {
    // 页面渲染完延时关闭
    setTimeout(function () {
      Toast.clear();
    }, 200);
  },
};
</script>

<style scoped lang='less'>
.home-page {
  height: calc(100vh - 93px);
  transition: all 0.5s ease;
  margin-top: 44px;
}
.home-pages {
  transition: all 0.5s ease;
  height: calc(100vh);
}
.homepage {
  padding: 10px 0 0 0;
  border-radius: 5px 5px 0 0;
  position: relative;
  background: #fff;
  overflow: hidden;
  height: 60px;
  margin-top: 58px;
}
.homepages {
  padding: 10px 0 0 0;
  border-radius: 5px 5px 0 0;
  position: relative;
  background: #fff;
  overflow: hidden;
  height: 60px;
  margin-top: 0px;
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  /deep/ .van-tabs__wrap {
    width: 96%;
    left: 2%;
    height: 40px;
    position: relative;
  }
  // /deep/ .van-tabs__wrap::before{
  // 	position: absolute;
  // 	right: -3px;
  // 	top: 3px;
  // 	display: block;
  // 	width: 35px;
  // 	height: 35px;
  // 	content: '';
  // 	background:url('./img/more.png') no-repeat center center;
  // 	background-size:53% 53%;
  // }
  /deep/ .van-tab--complete {
    color: #202020;
  }
  /deep/ .van-tab--active {
    font-size: 17px;
    font-weight: 700;
    color: #d04442;
  }
  /deep/ .van-tabs__line {
    display: none;
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  height: 40px;
  position: fixed;
  z-index: 999;
  top: 44px;
  right: 2%;
  padding-left: 2px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s ease;
  background-color: #fff;
  box-shadow: -15px 0px 6px -4px rgba(255, 255, 255, 0.7);
}
.bar_btns {
  height: 40px;
  position: fixed;
  z-index: 999;
  top: 40px;
  right: 2%;
  padding-left: 2px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s ease;
  background-color: #fff;
  box-shadow: -15px 0px 6px -4px rgba(255, 255, 255, 0.568);
}
.go-top {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 0 2px #111;
  right: 17px;
  bottom: 70px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
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
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.close {
  position: fixed;
  bottom: 20px;
  font-size: 30px;
  right: 5%;
  z-index: 100000;
}
.vitasphere {
  width: auto;
  height: 40px;
  border-radius: 5px;
  float: right;
  margin-top: 5px;
  background-color: #d04443;
  background-image: linear-gradient(45deg, #d04443 0%, #c32a5c 87%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 15px;
  span {
    padding-right: 10px;
  }
}
.moreFunction {
  width: 90%;
  margin: 0 auto;
  height: auto;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .moreFunction-item {
    width: 49%;
    min-height: 80px;
    background: linear-gradient(134deg, #fc5061 0%, #fea15f 100%);
    opacity: 1;
    border-radius: 5px;
    margin-bottom: 10px;
    .moreFunction-title {
      width: 90%;
      height: 40px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #ffffff;
      opacity: 1;
      display: flex;
      align-items: flex-end;
      text-align: left;
      margin-left: 10%;
      /deep/.van-image {
        margin-right: 5px;
      }
    }
    .moreFunction-to {
      width: 90%;
      min-height: 35px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.77;
      margin-top: 3px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      margin-left: 10%;
      .moreFunction-to-item {
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
