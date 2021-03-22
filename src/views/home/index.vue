<template>
  <!-- :class="[!btnShow ? 'home-page' : 'home-pages']" -->
  <div class="home-page">
    <page-header ref="pageHeader" @addArticle="addArticle" />

    <span class="bar_btn" @click="showChannel" v-if="activeNav.length > 20">
      <van-icon name="wap-nav" size="20" color="#909090" />
    </span>

    <van-tabs
      v-if="activeNav.length > 0"
      :lazy-render="true"
      swipeable
      :ellipsis="false"
      @click="changeChannel"
      @change="changeChannel"
      v-model="activeIndex"
      title-active-color="#07C160"
      title-inactive-color="#202020"
    >
      <van-tab
        :title="item.nav_name"
        v-for="(item, index) in activeNav"
        :key="index"
      >
        <div
          ref="scroll-wrapper"
          class="scroll-wrapper"
          @scroll="remember($event)"
        >
          <van-pull-refresh v-model="item.downLoading" @refresh="onRefresh">
            <div
              class="my-super-attention-ent"
              v-if="item.nid == 47 && mySuperEntList.length > 0"
            >
              <div
                class="my-super-attention-ent-list"
                @click="goEntHome(superItem.mem_attention_item)"
                v-for="(superItem, superIndex) in mySuperEntList"
                :key="superIndex"
              >
                <img
                  :src="superItem.mem_attention_item.ent_logo"
                  alt=""
                  width="50px"
                  height="50px"
                />
                <span>{{
                  superItem.mem_attention_item.ent_name | strSub(3)
                }}</span>
              </div>
            </div>
            <van-list
              v-model="item.upLoading"
              :finished="item.finished"
              @load="onLoad"
              finished-text="没有更多了"
            >
              <div
                v-if="item.pageData.length > 0"
                :class="[item.nid == 74 ? 'pageData-item-father' : '']"
              >
                <div :class="[item.nid == 74 ? 'pageData-item' : '']">
                  <template v-if="item.nid === 74">
                    <!--瀑布流左侧-->
                    <div class="waterful-side" ref="warterfulLeft">
                      <div
                        class="product-video"
                        v-for="items in waterfulData.leftSideData"
                        :key="items.g_rel_id"
                      >
                        <div
                          class="product-video-plot"
                          @click="goDetail(items)"
                        >
                          <img class="icon" src="./img/video_play.svg" alt="" />
                          <img
                            class="poster"
                            :src="items.graphic_surface_plot"
                            alt=""
                          />
                        </div>
                        <div
                          class="product-video-title"
                          @click="goDetail(items)"
                        >
                          {{ items.graphic_name | strSub(18) }}
                        </div>
                        <div class="product-video-user">
                          <div class="user-avtor">
                            <van-image
                              :src="items.mem_head_portrait"
                              round
                              width="20px"
                              height="20px"
                            >
                              <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                              </template>
                            </van-image>
                          </div>
                          <div class="user-name">
                            {{ items.mem_name | strSub(4) }}
                          </div>
                          <div
                            class="user-type"
                            v-if="items.mmt_id == 3 && items.memid != 1"
                            @click="goEntHome(items)"
                          >
                            <van-button color="#D04443" size="mini"
                              >进店</van-button
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--瀑布流右侧-->
                    <div class="waterful-side" ref="warterfulRight">
                      <div
                        class="product-video"
                        v-for="items in waterfulData.rightSideData"
                        :key="items.g_rel_id"
                      >
                        <div
                          class="product-video-plot"
                          @click="goDetail(items)"
                        >
                          <img class="icon" src="./img/video_play.svg" alt="" />
                          <img
                            class="poster"
                            :src="items.graphic_surface_plot"
                            alt=""
                          />
                        </div>
                        <div
                          class="product-video-title"
                          @click="goDetail(items)"
                        >
                          {{ items.graphic_name | strSub(18) }}
                        </div>
                        <div class="product-video-user">
                          <div class="user-avtor">
                            <van-image
                              :src="items.mem_head_portrait"
                              round
                              width="20px"
                              height="20px"
                            >
                              <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                              </template>
                            </van-image>
                            <!-- <img :src="items.mem_head_portrait"> -->
                          </div>
                          <div class="user-name">
                            {{ items.mem_name | strSub(4) }}
                          </div>
                          <div
                            class="user-type"
                            v-if="items.mmt_id == 3 && items.memid != 1"
                            @click="goEntHome(items)"
                          >
                            <van-button color="#D04443" size="mini"
                              >进店</van-button
                            >
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </template>

                  <van-cell v-else>
                    <div v-for="items in item.pageData" :key="items.g_rel_id">
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
                        <template>
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

                      <template v-else-if="item.nid === 71">
                        <new-add-merchant
                          :merItem="items"
                          :key="items.entid + '-' + item.nid"
                        />
                      </template>

                      <template v-else-if="item.nid === 77">
                        <small-video
                          :smallItem="items"
                          :key="items.entid + '-' + item.nid"
                        />
                      </template>

                      <template v-else-if="item.nid === 146">
                        <van-card
                          :num="items.pro_inventory"
                          :price="priceTransform(items.pro_price)"
                          :desc="items.pro_introduction"
                          :title="items.pro_name"
                          :thumb="items.pro_thumbnail"
                          @click="goProductDetail(items)"
                          style="margin-bottom: 10px"
                        >
                          <template #footer>
                            <van-button size="mini">去购买</van-button>
                          </template>
                        </van-card>
                      </template>
                    </div>
                  </van-cell>
                </div>
              </div>
              <div v-else>
                <van-empty description="" />
              </div>
            </van-list>
          </van-pull-refresh>
          <!-- </van-cell-group> -->
        </div>
      </van-tab>
    </van-tabs>
    <div v-else>
      <van-empty description="数据为空" />
    </div>
    <!-- <channel-edit
      v-model="showEditChannel"
      :value="false"
      @closeEditHandeler="changeFocus"
    /> -->

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

    <van-popup
      v-model="show"
      round
      position="bottom"
      class="van-pops"
      :style="{ height: 'auto;' }"
    >
      <div class="operationClass">
        <div class="popup-close" @click="show = false">
          <van-icon name="cross" size="25px" />
        </div>
        <!-- <div class="CutPanelClass" @click="CutPanel">
          <div>
            <span>切换</span>
            <van-icon name="exchange" size="25px" />
          </div>
        </div> -->
      </div>

      <p>城事乐家助力实体企业</p>
      <p>线上发展</p>
      <!-- <div class="tittle">快捷发布</div> -->
      <div class="type_class" v-if="publishData.length > 0">
        <div
          class="type_item"
          v-for="(item, index) in publishData"
          :key="index"
          @click="handle(item)"
        >
          <div class="icon">
            <img :src="item.icon || item.nav_icon" alt="" />
          </div>
          <div class="type_item_text">{{ item.title || item.nav_name }}</div>
        </div>
      </div>
    </van-popup>

    <!-- 关注公众号 -->
    <van-overlay :show="attqrcode" @click="attqrcode = false">
      <div
        class="qrwrapper"
        @click.stop="attqrcode = false"
        v-if="att_qrcode.src != ''"
      >
        <div class="block">
          <span>{{ att_qrcode.title }}</span>
          <img :src="att_qrcode.src" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import ArticleItem from "@/views/home/components/ArticleItem";
import RentItem from "@/views/home/components/RentItem";
import AdvItem from "@/views/home/components/AdvItem";
import JobItem from "@/views/home/components/JobItem";
import VideoItem from "@/views/home/components/VideoItem";
import RecommendedVideoItem from "@/views/home/components/RecommendedVideoItem";
import MerChant from "@/views/home/components/MerChant";
import ChannelEdit from "@/views/home/components/ChannelEdit";
import newAddMerchant from "@/views/home/components/newAddMerchant";
import smallVideo from "@/views/home/components/smallVideo";
import {
  getHome,
  forwardArticles,
  getHomeNav,
  getSuperAttentionEnt,
} from "./actions";
import { getTabbat } from "@/api";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { wxJSSDK } from "@/utils/wxshare.js";
import { Toast } from "vant";

export default {
  name: "home",
  components: {
    PageHeader,
    ArticleItem,
    RentItem,
    AdvItem,
    JobItem,
    MerChant,
    VideoItem,
    RecommendedVideoItem,
    ChannelEdit,
    newAddMerchant,
    smallVideo,
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
      activeIndex: 1, //导航选中索引
      activeNav: [], //导航数据
      activePreNav: [], //二级导航数据
      pageData: [], //页面数据
      showAllPrenav: false, // 显示所有二级分类
      showEditChannel: false, //我的导航
      value: "", //我的导航数据
      btnShow: false, //置顶按钮
      forwardMark: false, //分享弹窗
      videoKey: 1, // 更新视频组件
      tabbarShow: 0, //底部导航
      scrollWrapper: 0,
      show: false,
      tabbarData: "",
      publish: 0,
      publishData: [],
      waterfulData: {
        leftSideData: [],
        rightSideData: [],
        leftLength: 0,
        rightLength: 0,
      },
      attqrcode: false,
      att_qrcode: {
        src: "",
        title: "请扫码关注公众号",
      },
      mySuperEntList: [],
    };
  },
  // 组件开启缓存生效，激活组件(初始化和激活都执行)
  activated() {
    if (this.$refs["scroll-wrapper"]) {
      const dom = this.$refs["scroll-wrapper"][
        this.activeNav[this.activeIndex].scrollWrapper
      ];
      dom.scrollTop = this.activeNav[this.activeIndex].scrollTop;
    }
  },
  created() {
    this.initLogin();
    this.getHomeNav();
    this.getTabbat();
  },
  watch: {
    // $route(to, from) {
    //   if (to.query) {
    //     this.$parent.TabBar(0);
    //   }
    // },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    goDetail(val) {
      if (val.graphic_width / val.graphic_height < 1) {
        if (this.$route.path == `/article/full_screen_play/${val.gid}`) return;

        this.$router.push(`/article/full_screen_play/${val.gid}`);
      } else {
        if (this.$route.path == `/videoDetail/${val.gid}`) return;

        this.$router.push(`/videoDetail/${val.gid}`);
      }
    },
    goEntHome(val) {
      if (val.mmt_id === 3) {
        if (this.$route.path == "/merchants/produce") {
          Toast("您已经在店铺内了");
          return;
        }
        var obj = {
          entid: val.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {
        if (this.$route.path == `/user/page/${val.mem_id}`) {
          Toast("您已经在自己的主页了");
          return;
        }

        this.$router.push({
          path: `/user/page/${val.mem_id}`,
          query: { type: "u" },
        });
      }
    },
    async getTabbat(type = 2) {
      const res = await getTabbat(type);
      this.tabbarData = res.data.tabbar;
      if (type == 2) {
        var sel = localStorage.getItem("selectives");
        if (sel && this.user.id != 1) {
          res.data.publish = JSON.parse(sel);
          this.publishData[0] = res.data.publish;
        } else {
          this.publishData = res.data.publish;
        }
      } else {
        this.publishData = res.data.publish;
      }
    },
    addArticle() {
      localStorage.removeItem("selective");
      this.getTabbat();
      var sel = localStorage.getItem("selectives");
      if (sel && this.user.id != 1) {
        var val = JSON.parse(sel);
        console.log(val);
        this.$router.push(val.nav_link + "?id=" + val.nid);
      } else {
        if (this.user.mmtid == 3) {
          this.show = true;
        } else {
          this.show = false;
          // this.$router.replace("/inviteBusinessmen");
        }
      }
    },
    // tabbar用户点击操作
    handle(val) {
      localStorage.removeItem("selective");
      this.show = false;
      var href = val.href || val.nav_link;
      var id = val.id || val.nid;
      this.$router.push(href + "?id=" + id);
    },
    goProductDetail(val) {
      var obj = {
        proid: val.proid,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/commdityPay",
        query: {
          res: res,
        },
      });
    },
    priceTransform(val) {
      return parseFloat(val).toFixed(2);
    },
    getHomeNav(type = 1, id = 0) {
      getHomeNav(type, id).then((res) => {
        res.data.forEach((item, index) => {
          item["downLoading"] = false;
          item["upLoading"] = false;
          item["finished"] = false;
          item["pageData"] = [];
          item["num"] = 0;
          item["size"] = 10;
          item["scrollWrapper"] = 0;
        });

        if (type == 1) {
          this.activeNav = res.data;
        } else if (type == 2) {
          if (res.data.length > 0) {
            this.activePreNav = res.data;
          }
        } else {
          this.activePreNav = res.data;
        }
        //获取二级导航
        // if (this.activePreNav.length <= 0 && type == 1) {
        //   if (id == 0) {
        //     this.getHomeNav(2, this.activeNav[this.activeIndex].nid);
        //     this.getHomeData(1, this.activeNav[this.activeIndex].nid);
        //   }
        // }
      });
    },
    // 首页数据
    getHomeData(type, id) {
      var obj = {
        size: this.activeNav[this.activeIndex].size,
        num: this.activeNav[this.activeIndex].num,
        nid: id,
      };

      if (type == 2) {
        obj.size = 10;
        obj.num = 1;
      }

      getHome(obj).then((res) => {
        Toast.clear();
        if (type == 2) {
          if (res.data.length < 0) {
            Toast("数据为空");
            return false;
          }
        }

        if (res.data.length > 0) {
          if (type == 2) {
            //下拉刷新时初始化数据
            this.waterfulData = {
              leftSideData: [],
              rightSideData: [],
              leftLength: 0,
              rightLength: 0,
            };
            this.activeNav[this.activeIndex].size = 2;
          }
          // 页面渲染完延时关闭
          this.activeNav[this.activeIndex].num > 1
            ? this.activeNav[this.activeIndex].pageData.push(...res.data)
            : (this.activeNav[this.activeIndex].pageData = res.data);
          //瀑布流处理数据函数
          this.handleWaterfulData(res.data);
        } else {
          this.activeNav[this.activeIndex].finished = true;
          this.activeNav[this.activeIndex].downLoading = false;
        }
        if (id == 47) {
          this.getSuperAttentionEntFun();
        }
      });
    },
    getSuperAttentionEntFun() {
      getSuperAttentionEnt().then((res) => {
        this.mySuperEntList = res.data;
      });
    },
    //获取图片像素比例
    handleWaterfulData(data) {
      if (this.activeNav[this.activeIndex].nid != 74) return;

      for (let i = 0; i < data.length; i++) {
        let imgUrl = data[i].graphic_surface_plot;
        let img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          this.computeImgHeightVal(data[i]);
        };
      }
    },
    //分类瀑布流数据
    computeImgHeightVal(data) {
      let leftHeight = this.$refs.warterfulLeft[0].offsetHeight;
      let rightHeight = this.$refs.warterfulRight[0].offsetHeight;
      if (this.waterfulData.leftLength <= this.waterfulData.rightLength) {
        this.waterfulData.leftSideData.push(data);
        this.waterfulData.leftLength = leftHeight;
      } else {
        this.waterfulData.rightSideData.push(data);
        this.waterfulData.rightLength = rightHeight;
      }
    },
    //利用DOM高度处理瀑布流尾部
    checkWaterful(data) {
      let leftHeight = this.$refs.warterfulLeft[0].offsetHeight;
      let rightHeight = this.$refs.warterfulRight[0].offsetHeight;

      if (leftHeight <= rightHeight) {
        this.waterfulData.leftSideData.push(data);
      } else {
        this.waterfulData.rightSideData.push(data);
      }
    },
    preNav(id) {
      this.activeNav[this.activeIndex].pageData = [];
      this.getHomeData(2, id);
      this.getHomeNav(2, id);
    },
    // 切换频道
    changeChannel(val) {
      // this.$parent.TabBar(0);

      if (
        this.activeNav[this.activeIndex].scrollWrapper == 0 &&
        this.activeIndex != 1
      ) {
        this.activeNav[this.activeIndex].scrollWrapper = this.scrollWrapper++;
      }

      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        overlay: true,
      });

      this.getHomeNav(3, this.activeNav[val].nid);
      if (this.activeNav[val].pageData.length > 0) {
        //   this.getHomeData(this.activeNav[val].nid);
        // }else{

        Toast.clear();
        // 下一帧：延时一会执行，定位到以往阅读位置
        this.$nextTick(() => {
          const dom = this.$refs["scroll-wrapper"][
            this.activeNav[this.activeIndex].scrollWrapper
          ];
          dom.scrollTop = this.activeNav[this.activeIndex].scrollTop;
        });
      }
    },
    // 触底加载数据
    onLoad() {
      this.activeNav[this.activeIndex].num++;

      this.getHomeData(1, this.activeNav[this.activeIndex].nid);
      setTimeout(() => {
        this.activeNav[this.activeIndex].upLoading = false;
      }, 1000);
    },
    // 下拉刷新
    async onRefresh() {
      // this.$parent.TabBar(0);
      this.activeNav[this.activeIndex].finished = false;
      this.getHomeData(2, this.activeNav[this.activeIndex].nid);
      this.getHomeNav(2, this.activeNav[this.activeIndex].nid);

      setTimeout(() => {
        this.activeNav[this.activeIndex].downLoading = false;
      }, 1000);
    },

    handleAnimation(anim) {
      this.anim = anim;
    },
    changeFocus(val) {
      this.getHomeData();
    },
    ...mapMutations(["setUser", "delUser"]),
    ...mapState(["user"]),
    // 初始化登录信息,与员工任务
    initLogin() {
      // if (
      //   (this.user.id != undefined && !this.user.phone) ||
      //   this.user.phone == ""
      // ) {
      //   this.$router.push({
      //     path: "/bindingPhone",
      //     query: {
      //       back: "no",
      //     },
      //   });
      // }
      // if (!this.user.id && !this.$route.query.wechatLoginConfig) {
      //   let ua = window.navigator.userAgent.toLowerCase();
      //   if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //     axios
      //       .post("http://api.lejiagx.cn/public/index.php/api/wechatLogin")
      //       .then((res) => {
      //         const data = res.data;
      //         if (data.code === 2) {
      //           const url = window.localStorage.beforeLoginUrl;

      //           localStorage.setItem("LoginToken", data.loginToken);
      //           window.location.href = data.url;
      //         } else if (data.code === 200) {
      //           localStorage.removeItem("LoginToken");
      //           localStorage.removeItem("Token");
      //           this.$toast(data.msg);
      //         } else {
      //           localStorage.removeItem("LoginToken");
      //           localStorage.setItem("Token", data.token);
      //         }
      //       })
      //       .catch((err) => {
      //         this.$toast("登录失败,请重试");
      //       });
      //   }
      // }
      if (this.$route.query.wechatLoginConfig) {
        var codeState = JSON.parse(
          this.$Utils.demoResponse(this.$route.query.wechatLoginConfig)
        );

        var url = "http://api.lejiagx.cn/public/index.php/api/wechatUser";
        this.login(codeState, url);
      }
    },
    // 微信登录
    login(obj, url) {
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
              this.$parent.TabBar(2);
              localStorage.removeItem("LoginToken");
              sessionStorage.removeItem("codeState");

              var host = location.host;
              location.href = "http://" + host + "/#/";

              // if (
              //   !data.userSession.mem_phone ||
              //   data.userSession.mem_phone == ""
              // ) {
              //   this.$router.push({
              //     path: "/bindingPhone",
              //     query: {
              //       back: "no",
              //     },
              //   });
              // }
            } else if (data.code === 202) {
              this.attqrcode = true;
              this.att_qrcode.src = data.src;
              this.att_qrcode.title = data.msg;
            } else {
              localStorage.removeItem("LoginToken");
              sessionStorage.removeItem("codeState");

              this.$toast(res.msg);
            }
          })
          .catch((err) => {
            localStorage.removeItem("LoginToken");
            sessionStorage.removeItem("codeState");
          });
      } else {
        return false;
      }
    },
    // 打开频道管理列表
    showChannel() {
      this.showEditChannel = true;
    },
    // 监听滚动事件
    remember(e) {
      // tabbarS大于0向下滑动,小于0向上滑动
      var tabbarS = e.target.scrollTop - this.tabbarShow;
      this.tabbarShow = e.target.scrollTop;
      this.activeNav[this.activeIndex].scrollTop = e.target.scrollTop;

      if (tabbarS < 0) {
        // this.$parent.TabBar(0);

        if (e.target.scrollTop <= 150) {
          this.btnShow = false;
        }
      } else {
        if (this.btnShow == true) {
          // this.$parent.TabBar(1);
        }

        if (e.target.scrollTop > 150) {
          if (e.target.scrollTop >= 400) {
            this.btnShow = true;
          }
        }
      }
    },
    // 回到顶部
    goTop() {
      if (this.$refs["scroll-wrapper"]) {
        const dom = this.$refs["scroll-wrapper"][
          this.activeNav[this.activeIndex].scrollWrapper
        ];
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
      this.activeNav[this.activeIndex].pageData.splice(index, 1);
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
    initSocketIO() {
      var socket = io("http://39.100.118.74:2120");
      // 当连接服务端成功时触发connect默认事件
      var uid = this.user.id;
      var _this = this;
      socket.on("connect", function () {
        socket.emit("login", uid);
      });
      // 后端推送来消息时
      socket.on("new_msg", function (msg) {
        _this.msgShow = true;
        _this.msgText = msg;

        // Notify({
        //   type: "success",
        //   message: msg,
        //   duration: 4000,
        // });

        setTimeout(() => {
          _this.msgShow = false;
          _this.$refs.pageHeader.getMessage();
        }, 2000);
      });
      // 后端推送来在线数据时
      socket.on("update_online_count", function (online_stat) {
        console.log(online_stat);
      });
    },
    // 显示分享
    showForward(article) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        forwardArticles(article.gid, 1).then((res) => {
          this.forwardMark = true;

          if (res.code == 100) {
            if (article.type === "article") {
              var imgUrl = "http://api.lejiagx.cn/static/icon/lejia_logo.png";

              if (article.graphic_thumbnail.length > 0) {
                imgUrl = article.graphic_thumbnail[0].graphic_thumbnail_path;
              }

              var form = {
                title: article.graphic_name,
                link:
                  window.location.href +
                  `article/detail/${article.gid}?goindex=true&key=` +
                  res.data.mem_urlkey,
                imgUrl: imgUrl,
                desc:
                  article.graphic_intro || "来自" + article.mem_name + "的分享",
              };
            } else {
              if (article.graphic_width / article.graphic_height < 1) {
                var toUrl = `article/full_screen_play/${article.gid}`;
              } else {
                var toUrl = `videoDetail/${article.gid}`;
              }

              var form = {
                title: article.graphic_name,
                link:
                  window.location.href +
                  toUrl +
                  `?goindex=true&key=` +
                  res.data.mem_urlkey,
                imgUrl:
                  article.graphic_surface_plot ||
                  "http://api.lejiagx.cn/static/icon/lejia_logo.png",
                desc:
                  article.graphic_intro || "来自" + article.mem_name + "的分享",
                type: "video",
                dataUrl: article.graphic_video_path,
              };
            }

            wxJSSDK(form);

            setTimeout(() => {
              this.forwardMark = false;
              this.$toast("分享成功");
              if (article.type === "article") {
                this.$refs.articleItem[article.index].showForwardOper(1);
              } else {
                this.$refs.videoItem[article.index].showForwardOper(1);
              }
            }, 4000);
          } else {
            this.forwardMark = false;
            this.$toast(res.msg);
            if (article.type === "article") {
              this.$refs.articleItem[article.index].showForwardOper(0);
            } else {
              this.$refs.videoItem[article.index].showForwardOper(0);
            }
          }
        });
      } else {
        this.$toast("请在微信中分享");
      }
    },
    autoForward(val = "") {
      // 注册微信分享
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var imgUrl = "http://api.lejiagx.cn/static/logo/logo.png";

        var title = "城事乐家";
        var desc = "助力实体企业线上发展";
        if (val != "") {
          title = val.nav_name;
          desc = "生活圈,你身边的事";
          this.forwardMark = true;
          setTimeout(() => {
            this.forwardMark = false;
          }, 4000);
        }

        var form = {
          title: title,
          link: window.location.href + "?vitasphere=" + this.activeIndex,
          imgUrl: imgUrl,
          desc: desc,
        };

        wxJSSDK(form);
      }
    },
  },
  mounted: function () {
    this.initSocketIO();
    this.autoForward();
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
  height: calc(100vh - 50px);
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
  /deep/ .van-tab--active {
    font-size: 17px;
    font-weight: 600;
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
      padding-bottom: 150px;
      overflow-y: auto;
    }
  }
}
.my-super-attention-ent {
  width: 96%;
  margin: 0 auto;
  padding: 10px 0 10px 0;
  min-height: 60px;
  .my-super-attention-ent-list {
    display: flex;
    width: 60px;
    flex-direction: column;
    align-items: center;
    > img {
      border-radius: 4px;
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
.pre-nav-class {
  width: 96%;
  height: auto;
  min-height: 40px;
  margin-left: 2%;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  // padding-top: 5px;
  z-index: 20;
  background: #ffffff;
  .pre-nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    height: 30px;
    background: #f0f0f0;
    border-radius: 5px;
    color: #111111;
    font-size: 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 0px 5px 0px 5px;
  }
  .pre-nav-item:active {
    opacity: 0.1;
  }
}
.pre-nav-class-sticky {
  position: sticky;
  top: 0px;
}
.pageData-item-father {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100vw;
  padding: 5px 5px 0 5px;
  background: #f6f6f6;
  .pageData-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
    padding: 5px;
    border-radius: 4px;
    margin: 0 auto;
    background: #fff;
    margin-bottom: 10px;
    .waterful-side {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      height: min-content;
      width: 45vw;
      flex: 1;
    }
    .product-video {
      width: 90%;
      margin: 10px auto;
      // border-radius: 3px;
      border-top-left-radius: 3px;
      border-top-right-radius: 4px;
      box-shadow: 1px 1px 3px #ccc;
      .product-video-plot {
        position: relative;
        width: 100%;
        height: auto;
        .icon {
          position: absolute;
          width: 20px;
          height: 20px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.6;
        }
        .poster {
          width: 100%;
          max-height: 250px;
          object-fit: fill;
          border-radius: 5px 5px 0 0;
        }
      }
      .product-video-title {
        display: flex;
        align-items: center;
        height: 40px;
        width: 100%;
        padding: 0px 5px 5px 5px;
        // border-radius: 0 0 5px 5px;
        font-size: 14px;
        font-weight: 500;
      }
      .product-video-user {
        width: 100%;
        display: flex;
        background: rgba(0, 0, 0, 0.041);
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        // border-radius: 0 0 5px 5px;
        .user-avtor {
          width: 20px;
          height: 20px;
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
        .user-name {
          flex: 1;
          font-size: 12px;
          color: #111;
          margin-left: 5px;
        }
        .user-type {
          margin-left: 5px;
        }
      }
    }
  }
}
.van-popup {
  // max-height: 50% !important;
  .operationClass {
    width: 100%;
    // height: 100px;
    overflow: auto;
    .CutPanelClass {
      width: 50%;
      float: right;
      height: 66px;
      line-height: 66px;
      font-size: 16px;
      text-align: right;
      padding-right: 10px;
      span {
        float: right;
        display: block;
        height: 66px;
        line-height: 50px;
        margin-left: 10px;
      }
    }
    .popup-close {
      float: left;
      width: 50%;
      height: 66px;
      line-height: 66px;
      font-size: 16px;
      padding-left: 20px;
    }
  }

  p {
    color: #d04443;
    margin-left: 20px;
    font-size: 24px;
  }
  .tittle {
    height: 78px;
    line-height: 78px;
    font-size: 18px;
    margin-left: 20px;
    font-weight: 500px;
  }
  .type_class {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    .type_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      width: 25%;
      .icon {
        width: 38px;
        height: 39px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .type_item_text {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        text-align: center;
      }
      img {
        width: 50px;
        height: 45px;
      }
    }
    .type_item:nth-child(1) {
      .icon {
        width: 49px;
        height: 44.5px;
        margin-top: -7px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .type_item_text {
        width: 100%;
        text-align: center;
        padding-right: 3px;
      }
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
