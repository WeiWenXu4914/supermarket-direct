<template>
  <div class="video-detail-small">
    <van-icon
      name="arrow-left"
      size="0.6rem"
      color="#fff"
      @click="$router.back()"
      class="icon-arrow-left"
    />
    <div class="goindex" v-if="goindex == true" @click="goHome">
      <van-icon name="wap-home-o" size="25px" color="#FFFFFF" />
    </div>
    <div class="video-area">
      <video
        ref="video"
        @canplay="canplay"
        :class="videoStyle"
        :src="dataAll.graphic_video_path"
        :poster="dataAll.graphic_surface_plot"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        controls
      ></video>
    </div>
    <div class="rec-pro" v-if="ProductSetList != '' && recProShow">
      <div class="pro-img" @click="recProShow = false">
        <van-icon name="close" size="20" color="red" />
        <img :src="ProductSetList.pro_thumbnail" alt="" />
      </div>
      <div class="pro-title" @click="goProductDetail(ProductSetList)">
        <span>{{ ProductSetList.pro_name | strSub(5) }}</span>
        <span>￥ {{ ProductSetList.pro_price }}</span>
      </div>
      <div class="pro-btn" @click="goProductDetail(ProductSetList)">去购买</div>
    </div>
    <!--关注-->
    <div class="user-info">
      <div class="user">
        <img :src="dataAll.mem_head_portrait" />
        <h4>{{ dataAll.mem_name }}</h4>
      </div>
      <button @click="toStore" v-if="dataAll.mem_id != 1">进店</button>
      <button
        @click="focus"
        v-show="!isLoading"
        :style="buttonStatus ? 'background:#ccc' : ''"
      >
        {{ buttonStatus ? "已关注" : "关注" }}
      </button>
      <van-button v-show="isLoading" loading type="primary" />
    </div>
    <!--简介-->
    <div class="introduce">
      <h3>{{ dataAll.graphic_name }}</h3>
      <span>原创</span>
      <span>|</span>
      <span>{{ dataAll.graphic_addtime }} 发布</span>
    </div>
    <!--点赞转发-->
    <div class="function">
      <div :class="dataAll.mem_like === '已点赞' ? 'like' : ''" @click="like">
        <img :src="dataAll.mem_like === '已点赞' ? zan.yes : zan.no" alt="" />
        <span>{{ dataAll.graphic_like }}</span>
      </div>
      <div @click="forward">
        <img src="../../assets/icons/fx.png" alt="" />
        <span>转发</span>
      </div>
      <div @click="collect" :class="isCollection ? 'colletion' : ''">
        <img src="./img/collection.svg" alt="" v-show="!isCollection" />
        <img src="./img/collctionActive.svg" alt="" v-show="isCollection" />
        <span>收藏</span>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <transition on name="van-fade">
      <div v-if="forwardMark" class="forward" @click="forwardMark">
        <div class="box">
          <div class="icon">
            <img src="../../assets/icons/forward.png" alt="" />
          </div>
          <div class="text">点击右上角发送给指定朋友或者分享到朋友圈。</div>
        </div>
      </div>
    </transition>
    <!--更多推荐-->
    <div class="more-recommend" v-if="videoList.length !== 0">
      <div class="title">
        <h3>更多好物甄选</h3>
        <!-- <span>共有 {{ videoList.length }} 个好物为您推荐 <van-icon name="arrow" class="arrow" size=".4rem"/></span> -->
        <span>共有 {{ videoList.length }} 个产品为您推荐</span>
      </div>
      <div class="video-items">
        <div class="wrapper">
          <div
            class="item"
            v-for="(item, index) in videoList"
            :key="index"
            @click="goDetail(item)"
          >
            <van-image
              width="4rem"
              height="2.5rem"
              lazy-load
              :src="item.graphic_surface_plot"
              fit="cover"
            />
            <h4>{{ item.graphic_name }}</h4>
            <img class="icon" src="./img/play_video.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!--底部评论-->
    <!-- 评论  点赞 -->
    <transition name="van-fade">
      <div class="article-handle" v-if="!inputShow">
        <!--切换语音文字-->
        <div v-show="musicAuthority">
          <div class="changeStatus" v-show="!changeStatus" @click="changeStatu">
            <img src="./img/microphone.svg" alt="" />
          </div>

          <div
            class="changeStatusKey"
            v-show="changeStatus"
            @click="changeStatu"
          >
            <img src="./img/keyboard.svg" alt="" />
          </div>
        </div>
        <div class="inputd" @click.stop="inputChange" v-show="!changeStatus">
          <span class="comm_num" v-if="commList.length > 0">{{
            commList.length > 100 ? "99+" : commList.length
          }}</span>
          <span>
            <img src="../../assets/icons/edit.png" alt="" />
          </span>
          <span>写评论...</span>
        </div>
        <div class="mainBtn" v-show="changeStatus">
          <div class="ctrlProcessWave" v-show="recTimer">
            <img src="./img/musicPlay.gif" alt="" />
          </div>
          <button
            class="ctrlBtn"
            @touchstart="startRecord"
            @touchend="stopRecord"
          >
            开始录音
          </button>
        </div>
        <div class="items">
          <!-- <div class="item" @click="conShow">
                    <span>{{ commList.length>100?'99+':commList.length }}</span>
                    <img src="../../assets/icons/pl.png" alt="">
                    </div> -->
          <div class="item" @click="like">
            <img
              :src="dataAll.mem_like === '已点赞' ? zan.yes : zan.no"
              alt=""
            />
          </div>
          <div class="item" @click="collect" v-show="!isCollection">
            <img src="./img/collection.svg" alt="" />
          </div>
          <div class="item" @click="collect" v-show="isCollection">
            <img src="./img/collctionActive.svg" alt="" />
          </div>
          <div class="item" @click="forward">
            <img src="../../assets/icons/fx.png" alt="" />
          </div>
          <!-- <div class="item" @click="goTop" v-show="goTopShow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
                    </div> -->
        </div>
      </div>
    </transition>

    <!-- 发表评论 -->
    <transition name="van-slide-up">
      <div class="comm-btn" v-if="inputShow">
        <div class="ipt">
          <input ref="inputVal" v-model="commVal" type="text" />
        </div>
        <div class="btn-send" @click="submitComm(commType)">发送</div>
      </div>
    </transition>

    <!-- 评论列表 -->
    <transition name="van-slide-up">
      <div v-show="onShowd" class="conShowMb">
        <div class="conShowMbS">
          <div class="close" @click.stop="conShow">
            <van-icon name="close" size="30px" />
          </div>
          <comm-list :commList="commList" @replay="replay"></comm-list>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { articleDetail, getProductSetList } from "./actions";
import { Icon, Toast, Image as VanImage, Lazyload } from "vant";
import { wxJSSDK } from "@/utils/wxshare.js";
import ShareSheet from "@/components/ShareSheet";
import CommList from "./components/CommList";
import RecomEnt from "./components/RecomEnt";
import {
  changeFouce as focus,
  memberLike,
  forwardArticles,
  memberCollect,
  GraphicRecommend,
  articleCommList,
  articleComm,
} from "./actions/index";
export default {
  components: {
    CommList,
    ShareSheet,
    RecomEnt,
  },
  data() {
    return {
      dataAll: {},
      videoStyle: "",
      buttonStatus: false,
      isLoading: false,
      zan: {
        no: require("../../assets/icons/zan.png"),
        yes: require("../../assets/icons/zan_hv.png"),
      },
      forwardMark: false,
      isCollection: false,
      videoList: [],
      inputShow: false,
      musicAuthority: false,
      changeStatus: false, //切换到语音
      commList: [],
      commVal: "",
      query: {},
      commType: 1,
      ProductSetList: "",
      recProShow: false,
      goindex: false,
    };
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
  created() {
    if (this.$route.query.goindex == "true") {
      this.goindex = true;
    }
    if (this.$route.query.type == "pl") {
      this.inputShow = true;
      this.onShowd = true;
    }
    this.getData();
    this.getCommList();
  },
  watch: {
    $route(to, from) {
      if (to.query) {
        this.getData();
        this.userIndex();
        this.getCommList();
      }
    },
  },
  methods: {
    canplay() {
      let ua = navigator.userAgent;
      if ( !ua.match(/iPhone/i) ) {
        this.$refs.video.play();
      }
    },
    toStore() {
      let obj = {
        entid: this.dataAll.rel_id,
        entfid: 0,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/merchants/produce",
        query: { res: res },
      });
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
    conShow() {
      this.onShowd = !this.onShowd;
      this.inputShow = !this.inputShow;
    },
    // 回复
    async replay(query) {
      this.strSearch = "@" + query.name + "：";
      this.commVal = this.strSearch;
      this.inputChange();
      this.query = {
        id: this.article.gid,
        comment_class: this.article.gc_id,
        mcid: query.mcid,
        state: query.state,
      };
      this.commType = 2;
    },
    // 评论
    submitComm(type) {
      type === 1 ? this.Comm() : this.CommReplay();
    },
    async Comm() {
      if (!this.commVal) return this.$toast("先说点什么吧~");

      const query = {
        id: this.dataAll.gid,
        comment_text: this.commVal,
        comment_class: 1,
        state: 1,
      };

      const res = await articleComm(query);
      if (res.code === 100) {
        this.$toast.success("评论成功");
        this.commVal = "";
        this.getCommList();
        this.onShowd = true;
      }
    },
    async CommReplay() {
      this.commVal = this.commVal.split(this.strSearch)[1];
      this.query.comment_text = this.commVal;

      const res = await articleComm(this.query);
      this.commVal = "";

      if (res.code === 100) {
        this.$toast.success("回复成功");
        this.getCommList();
        this.onShowd = true;
      }
    },
    // 更新获取评论列表
    async getCommList() {
      var obj = {
        id: this.$route.params.id,
      };

      const res = await articleDetail(obj);
      if (res.code === 100) {
        this.atyicleTitle = res.data.graphic_name;
        this.articleContent = res.data.graphic_details;

        this.dataAll.mem_attention_state === 1
          ? (this.show = false)
          : (this.show = true);

        const query = {
          type: 1,
          id: res.data.gid,
        };

        if (res.data.pro_id) {
          const prores = await getProductSetList(res.data.pro_id);
          if(prores.length > 0) {
            this.ProductSetList = prores.data[0];
            this.recProShow = true;
          }
        }

        const commList = await articleCommList(query);
        this.commList = commList.data.reverse();
      } else {
        this.$toast("这篇文章飞向外太空了！");
        setTimeout(() => {
          this.$router.go(-1);
        }, 600);
      }
    },
    closeInput() {
      this.inputShow = false;
    },
    //开始录音
    startRecord() {
      var This_ = this;
      wx.startRecord({
        cancel: function () {
          This_.authority = false;
        },
      });
      Toast.success("开始录音");
      this.recTimer = true;
    },
    stopRecord() {
      this.getLocalId()
        .then((res) => {
          this.voice.localId = res;
        })
        .catch((err) => {
          Toast.fail(err);
        });

      Toast.success("录音结束");

      this.recTimer = false;

      Dialog.confirm({
        title: "录音结束",
        message: "是否要上传音频音频",
      })
        .then(() => {
          this.uploadR();
        })
        .catch(() => {});
    },
    inputChange() {
      this.inputShow = true;
      this.onShowd = true;
      this.$nextTick(() => {
        this.$refs.inputVal.focus();
      });
    },
    //到视频详情
    goDetail(val) {
      if (val.graphic_width / val.graphic_height < 1) {
        if (this.$route.path == `/article/full_screen_play/${val.gid}`) return;

        this.$router.push(`/article/full_screen_play/${val.gid}`);
      } else {
        if (this.$route.path == `/videoDetail/${val.gid}`) return;

        this.$router.push(`/videoDetail/${val.gid}`);
      }
    },
    // 获取用户发布信息
    async userIndex() {
      const id = this.dataAll.gid;
      let res = [];
      if (id) {
        res = await GraphicRecommend(id);
      } else {
        res = await GraphicRecommend();
      }

      const userList = res.data;
      /*
      * 利用哈希表键值不重复特性进行数组对象去重
      */
      const map = new Map();
      for (const item of userList) {
        if (item.gc_id === 2 && !map.has(item.gid)) {
          map.set(item.gid, item)
        }
      }
      this.videoList = [...map.values()];

    },
    //收藏
    collect() {
      let state = this.isCollection === true ? 0 : 1;
      memberCollect(this.dataAll.gid, 1, state)
        .then((res) => {
          if (res.code == 100 && state == 1) {
            this.isCollection = true;
          } else if (res.code == 100 && state == 0) {
            this.isCollection = false;
          }
          Toast(res.msg);
        })
        .catch((res) => {
          Toast("请求出错");
        });
    },
    // 关注
    async focus() {
      this.isLoading = true;
      const query = {
        id: this.dataAll.mem_id,
        state: this.buttonStatus ? 1 : 0,
      };
      const res = await focus(query);
      if (res.code === 100) {
        this.buttonStatus = !this.buttonStatus;
      } else {
        this.$toast.fail("关注失败");
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    //获取所有数据
    async getData() {
      const obj = {
        id: this.$route.params.id,
      };
      await articleDetail(obj)
        .then((res) => {
          if (res.code === 100) {
            this.dataAll = res.data;
            this.buttonStatus =
              this.dataAll.mem_attention_state == 0 ? false : true;
            this.isCollection =
              this.dataAll.mem_collect == "已收藏" ? true : false;
            // this.$refs.video.play();

            this.userIndex();
          } else {
            Toast(res.msg);
          }
          Toast.clear();
        })
        .catch((err) => {
          Toast("请求出错");
          Toast.clear();
        });
      this.computeVideoStyle(
        this.dataAll.graphic_width,
        this.dataAll.graphic_height
      );

      this.autoForward();
    },
    computeVideoStyle(width, height) {
      let layoutWay = width / height > 5 / 3;
      if (layoutWay) {
        this.videoStyle = "horizontal";
      } else {
        this.videoStyle = "video";
      }
    },
    // 点赞
    like() {
      const state = this.dataAll.mem_like === "已点赞" ? 0 : 1;
      memberLike(this.dataAll.gid, 1, state)
        .then((res) => {
          if (res.code === 100) {
            state === 1
              ? (this.dataAll.mem_like = "已点赞")
              : (this.dataAll.mem_like = "未点赞");
            state === 1
              ? this.dataAll.graphic_like++
              : this.dataAll.graphic_like--;
          } else {
            Toast(res.msg);
          }
        })
        .catch((err) => {
          Toast("请求出错");
        });
    },
    goHome() {
      this.$router.push("/");
    },
    autoForward() {
      // 注册微信分享
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        if (this.dataAll.gc_id == 2) {
          if (
            !this.dataAll.graphic_intro ||
            this.dataAll.graphic_intro == "无"
          ) {
            var desc = "来自用户《" + this.dataAll.mem_name + "》的分享";
          } else {
            // 检测是否存在p标签
            var regPtags = RegExp(/<p>/);
            if (regPtags.exec(this.dataAll.graphic_details)) {

              var desc = this.dataAll.graphic_intro;
            }else {
              
              var desc = this.dataAll.graphic_details;
            }
          }

          var form = {
            title: this.dataAll.graphic_name,
            link: window.location.href + "?goindex=true",
            imgUrl:
              this.dataAll.graphic_surface_plot ||
              "http://api.lejiagx.cn/static/icon/lejia_logo.png",
            desc: desc,
            type: "video",
            dataUrl: this.dataAll.graphic_video_path,
          };
        } else {
          var imgUrl = "http://api.lejiagx.cn/static/icon/lejia_logo.png";

          if (this.dataAll.graphic_thumbnail.length > 0) {
            imgUrl = this.dataAll.graphic_thumbnail[0].graphic_thumbnail_path;
          }

          if (
            !this.dataAll.graphic_intro ||
            this.dataAll.graphic_intro == "无"
          ) {
            var desc = "来自用户《" + this.dataAll.mem_name + "》的分享";
          } else {
            
            // 检测是否存在p标签
            var regPtags = RegExp(/<p>/);
            if (regPtags.exec(this.dataAll.graphic_details)) {

              var desc = this.dataAll.graphic_intro;
            }else {
              
              var desc = this.dataAll.graphic_details;
            }
          }

          var form = {
            title: this.dataAll.graphic_name,
            link: window.location.href + "?goindex=true",
            imgUrl: imgUrl,
            desc: desc,
          };
        }

        wxJSSDK(form);
      }
    },
    // 分享转发
    forward() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        forwardArticles(this.dataAll.gid, 1).then((res) => {
          this.forwardMark = true;

          if (res.code == 100) {
            if (this.dataAll.gc_id == 1) {
              var imgUrl = "http://api.lejiagx.cn/static/icon/lejia_logo.png";

              if (this.dataAll.graphic_thumbnail.length > 0) {
                imgUrl = this.dataAll.graphic_thumbnail[0]
                  .graphic_thumbnail_path;
              }

              if (
                !this.dataAll.graphic_intro ||
                this.dataAll.graphic_intro == "无"
              ) {
                var desc = "来自用户《" + this.dataAll.mem_name + "》的分享";
              } else {
                // 检测是否存在p标签
                var regPtags = RegExp(/<p>/);
                if (regPtags.exec(this.dataAll.graphic_details)) {

                  var desc = this.dataAll.graphic_intro;
                }else {
                  
                  var desc = this.dataAll.graphic_details;
                }
              }

              var form = {
                title: this.dataAll.graphic_name,
                link:
                  window.location.href +
                  "?goindex=true&key=" +
                  res.data.mem_urlkey,
                imgUrl: imgUrl,
                desc: desc,
              };
            } else {
              if (
                !this.dataAll.graphic_intro ||
                this.dataAll.graphic_intro == "无"
              ) {
                var desc = "来自用户《" + this.dataAll.mem_name + "》的分享";
              } else {
                // 检测是否存在p标签
                var regPtags = RegExp(/<p>/);
                if (regPtags.exec(this.dataAll.graphic_details)) {

                  var desc = this.dataAll.graphic_intro;
                }else {
                  
                  var desc = this.dataAll.graphic_details;
                }
              }

              var form = {
                title: this.dataAll.graphic_name,
                link:
                  window.location.href +
                  "?goindex=true&key=" +
                  res.data.mem_urlkey,
                imgUrl:
                  this.dataAll.graphic_surface_plot ||
                  "http://api.lejiagx.cn/static/icon/lejia_logo.png",
                desc: desc,
                type: "video",
                dataUrl: this.dataAll.graphic_video_path,
              };
            }

            wxJSSDK(form);

            setTimeout(() => {
              this.forwardMark = false;
            }, 4000);
          } else {
            this.forwardMark = false;
            this.$toast(res.msg);
          }
        });
      } else {
        this.$toast("请在微信中分享");
      }
    },
    //切换到输入语音
    changeStatu() {
      this.changeStatus = !this.changeStatus;
    },
  },
};
</script>

<style lang="less">
.video-detail-small {
  .goindex {
    width: 15%;
    height: 50px;
    position: fixed;
    top: 0px;
    z-index: 5000;
    right: 0px;
    text-align: center;
    line-height: 60px;
  }
  .icon-arrow-left {
    position: absolute;
    left: 13px;
    top: 13px;
    z-index: 999;
  }
  .video-area {
    // position: relative;
    width: 100vw;
    // height: 60vw;
    background-color: #000;
    .video {
      // position: absolute;
       width: 100%;
      height: 100%;
      // margin-left: 50%;
      // top: 0;
      // transform: translateX(-50%);
    }
    .horizontal {
      // position: absolute;
      width: 100%;
      // top: 50%;
      // left: 0;
      // transform: translateY(-50%);
    }
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    margin: 15px auto;
    .user {
      display: flex;
      align-items: center;
      width: 200px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      h4 {
        color: #1e1e1e;
        margin-left: 10px;
      }
    }
    button:nth-of-type(1) {
      background-color: #fff;
      color: #f04043;
      border: 1px solid #f04043;
      // transform: translateX(40px);
    }
    button {
      width: 60px;
      height: 26px;
      border: none;
      color: #fff;
      border-radius: 5px;
      background-color: #f04043;
    }
  }
  .introduce {
    width: 92%;
    margin: 0 auto;
    span {
      display: inline-block;
      font-size: 12px;
      margin: 7px 0;
      color: #ccc;
    }
    span:nth-of-type(2) {
      margin: 0 8px;
    }
  }
  .function {
    display: flex;
    width: 92%;
    justify-content: space-between;
    margin: 0px auto;
    padding: 10px 0 20px 0;
    border-bottom: 1px solid #e5e5e5;
    div {
      display: flex;
      width: 100px;
      height: 34px;
      border: 1px solid #e6e6e6;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 20px;
      height: 20px;
      transform: translateY(-1px);
    }
    span {
      margin-left: 3px;
      color: #1f1f1f;
      font-size: 15px;
    }
    .like {
      box-shadow: 0 0 1px 0.5px #d04443;
      border: none;
      span {
        color: #d04443;
      }
    }
    .colletion {
      box-shadow: 0 0 1px 0.5px #d04443;
      border: none;
      span {
        color: #d04443;
      }
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
      right: 20px;
      top: 60px;
      box-sizing: border-box;
      padding: 5px;
      background: none;
      border: 1px solid #fff;
      border-radius: 3px;
      color: #fff;
      width: 115px;
      font-size: 13px;
      text-align: center;
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
  .more-recommend {
    width: 100%;
    padding-bottom: 100px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      width: 92%;
      margin: 0 auto;
      h3 {
        font-size: 18px;
        color: #000;
      }
      .arrow {
        transform: translateY(2px);
      }
    }
    .video-items {
      position: relative;
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
      .wrapper {
        display: flex;
        flex-wrap: nowrap;
        .item {
          position: relative;
          margin: 0 5px;
          img {
            border-radius: 4px;
          }
          h4 {
            margin: 7px 0;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .icon {
            position: absolute;
            left: 50%;
            top: 25%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  .article-handle {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 45px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    background: #fff;
    z-index: 998;
    .changeStatus {
      position: relative;
      padding: 0 5px;
      width: 28px;
      height: 28px;
      border: 2px solid #868686;
      border-radius: 50%;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .changeStatusKey {
      margin-left: -5px;
      width: 34px;
      height: 34px;
      img {
        width: 34px;
        height: 34px;
        color: #242424 !important;
      }
    }
    .inputd {
      background: #f3f3f3;
      width: 120px;
      height: 30px;
      border-radius: 21px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 20px;
      margin-left: 18px;
      position: relative;
      .comm_num {
        position: absolute;
        font-size: 13px;
        min-width: 15px;
        height: 15px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        padding: 2px;
        z-index: 1;
        text-align: center;
        color: #ffffff;
        border: 1px #ffffff solid;
        background: crimson;
        border-radius: 100%;
        right: -5px;
        top: -5px;
      }
      span {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #646464;
        img {
          width: 15px;
          height: 15px;
          margin-right: 6px;
        }
      }
    }
    .mainBtn {
      flex-grow: 1;
      position: relative;
      width: 150px;
      margin-right: 40px;
    }
    .ctrlBtn:active {
      background: #0a1;
    }
    .ctrlBtn {
      border-radius: 3px;
      border: none;
      background: #0b1;
      color: #fff;
      line-height: 100%;
      height: 40px;
      width: 200px;
      overflow: hidden;
      margin-left: 18px;
      // vertical-align: middle;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
    .ctrlProcessWave {
      position: absolute;
      width: 200px;
      height: 40px;
      bottom: 50px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: bottom;
      background: #fff;
      margin-left: 18px;
      img {
        margin-left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 40px;
      }
    }
    .items {
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      padding-left: 20px;
      .item {
        width: 26px;
        height: 26px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          font-size: 13px;
          min-width: 15px;
          height: 15px;
          display: flex;
          align-content: center;
          align-items: center;
          justify-content: center;
          padding: 2px;
          z-index: 1;
          text-align: center;
          color: #ffffff;
          border: 1px #ffffff solid;
          background: crimson;
          border-radius: 100%;
          right: -5px;
          top: -5px;
        }
      }
    }
  }
  .comm-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 18px;
    background: #fff;
    z-index: 9999;
    .ipt {
      flex: 1;
      height: 36px;
      border-radius: 3px;
      background: #ededed;
      input {
        padding-left: 10px;
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        font-size: 14px;
        color: #424242;
      }
    }
    .btn-send {
      text-align: center;
      width: 60px;
      font-size: 15px;
      color: #d04443;
      font-weight: 400;
    }
  }
  .conShowMb {
    width: 100%;
    height: calc(100vh - 60px);
    position: fixed;
    bottom: 60px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .conShowMbS {
      width: 100%;
      padding: 10px;
      height: calc(100vh - 100px);
      background: #fff;
      border-radius: 10px 10px 0px 0px;
      margin-top: 40px;
      .comm-list {
        height: calc(100vh - 160px);
        overflow: auto;
        margin-bottom: 50px;
        padding-bottom: 50px;
      }
    }
    .close {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }
}
.rec-pro {
  width: 90%;
  height: 50px;
  background: #fff;
  //   position: fixed;
  top: 20px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin: 10px auto;
  .pro-img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    position: relative;
    i {
      position: absolute;
      top: -8px;
      left: -8px;
    }
    img {
      width: 100%;
      height: 50px;
      border-radius: 4px;
      object-fit: cover;
    }
  }
  .pro-title {
    flex: 1;
    height: 50rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span:nth-child(1) {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
    }
    span:nth-child(2) {
      flex: 1;
      margin-top: 5px;
      text-align: right;
      padding-right: 4px;
      color: #d04443;
    }
  }
  .pro-btn {
    width: 50px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background: #d04443;
    border-radius: 4px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0 4px 0 4px;
  }
}
</style>