<template>
  <div class="article-page" v-if="article != ''">
    <page-title :title="atyicleTitle | emoji_decode" style="z-index: 999" />

    <div class="goindex" v-if="goindex == true" @click="goHome">
      <van-icon name="wap-home-o" size="25px" />
    </div>

    <div
      class="article"
      @scroll="scroll($event)"
      @click.stop.prevent="closeInput"
    >
      <!-- :style="[{marginBottom:(show?'100px':'10px')}]" -->

      <div class="article-titile">
        {{ atyicleTitle | emoji_decode }}
      </div>

      <!-- 关注 -->
      <transition name="van-fade">
        <!-- v-if="show && user.id !== article.mem_id" -->
        <div class="article-user">
          <div class="user-info" @click="userHandle(article)">
            <div class="img">
              <van-image
                :src="article.mem_head_portrait"
                lazy-load
                round
                height="40"
                width="40"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <div class="name">{{ article.mem_name | strSub(7) }}</div>
          </div>
          <div class="buttons-item">
            <div
              class="buttons"
              @click="focus"
              v-if="show && user.id !== article.mem_id"
            >
              关注
            </div>
            <div
              class="buttons"
              @click="userHandle(article)"
              v-if="article.mmt_id == 3"
            >
              进店
            </div>
          </div>
          <!-- <div class="close" @click="show = false">
            <van-icon class="icon" name="cross" />
          </div> -->
          <div @click="forward" class="forwards">
            <img src="../../assets/icons/fx.png" alt="" />
            <span>转发</span>
          </div>
        </div>
      </transition>

      <div class="liveStreamVideo" v-if="article.gc_id === 2">
        <!-- :style="[{marginTop:(atyicleTitle.length < 9?'60px':'10px')}]" -->

        <div v-if="!article.graphic_intro">
          <div>{{ article.graphic_intro | emoji_decode }}</div>

          <video
            ref="detailVideo"
            class="mediaVideo"
            controls=""
            :poster="options.poster"
            preload="auto"
            autoplay="true"
            :src="options.mp4"
          ></video>
        </div>
        <div
          v-else
          ref="detailVideo"
          v-html="articleContent"
          @click="showImg($event)"
          class="html-class"
        ></div>
      </div>

      <div
        v-else-if="article.gc_id != 2"
        class="article-content"
      >
        <!-- :style="[{marginTop:(atyicleTitle.length < 9?'60px':'')}]"  -->
        <div v-for="(gi, gk) in article.graphic_thumbnail" :key="gk">
          <van-image
            :src="gi.graphic_thumbnail_path"
            lazy-load
            @click="showImg($event)"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div
          v-html="articleContent"
          @click="showImg($event)"
          class="html-class"
        ></div>
      </div>

      <div v-else class="article-content">
        <!-- :style="[{marginTop:(atyicleTitle.length < 9?'60px':'')}]"  -->
        <!-- <div v-for="(gi,gk) in article.graphic_thumbnail" :key="gk">
          <van-image
            :src="gi.graphic_thumbnail_path"
            lazy-load
            @click="showImg($event)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div> -->
        <div
          v-html="articleContent"
          @click="showImg($event)"
          class="html-class"
        ></div>
      </div>

      <div v-if="phone_number.length > 0">
        <div
          class="phone-content"
          v-for="(item, index) in phone_number"
          :key="index"
        >
          <div @click="getPhone(item.number)">
            <van-icon name="phone-o" size="30px" color="red" />
            <span>{{ item.type + "：" + item.number }}</span>
          </div>
        </div>
      </div>

      <!--音频播放-->
      <div class="musicVideo" v-show="music.url">
        <div class="textVideo" @click="musicStatuChange">
          <h4>卖家心声</h4>
          <p>{{ music.time }}</p>
        </div>

        <div class="musicImg" v-show="isPlay" @click="musicStatuChange">
          <img src="./img/musicPlayStatic.png" alt="" />
        </div>
        <div class="musicImg" v-show="!isPlay" @click="musicStatuChange">
          <img src="./img/musicPlay.gif" alt="" />
        </div>

        <aplayer mini="true" :listFolded="false" ref="player" :music="music">
        </aplayer>

        <div
          v-for="(item, index) in musicList"
          :key="index"
          class="musicList"
          @click="musicListClick(index)"
        >
          <van-icon
            name="play-circle"
            :class="index === musicListActive ? `musicIcon` : null"
          />

          <span>卖家心声{{ index + 1 }}</span>
          <span> {{ item.time }} </span>
          <span v-if="musicAuthority">
            <van-icon
              name="close"
              color="red"
              @click="delMusicItem(item.grid)"
            />
          </span>
        </div>
      </div>

      <recom-ent :article="article.mem_id"></recom-ent>

      <!-- <van-divider content-position="right">
        发布于 {{article.graphic_addtime | relTime}}
      </van-divider> -->

      <!-- <comm-list :commList="commList" @replay="replay"></comm-list> -->

      <van-collapse
        v-model="activeNames"
        :border="false"
        v-if="MemForward.length > 0"
      >
        <van-collapse-item title="帮忙分享的用户" name="1">
          <div
            v-for="(item, index) in MemForward"
            class="mem_forward van-hairline--bottom"
            :key="index"
          >
            <div class="user-info" @click="userHandle(item)">
              <div class="img">
                <van-image
                  round
                  width="40px"
                  height="40px"
                  :src="item.mem_head_portrait"
                />
              </div>
              <div class="name">{{ item.mem_name | strSub(7) }}</div>
            </div>
            <div class="user_right">
              <div class="user_rightText">
                分享于： {{ item.mem_forward_addtime | relTime }} <br />
                浏览量： {{ item.mem_forward_click_num }} 次
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>

      <van-divider
        v-if="userInner.userList.length"
        content-position="left"
        style="margin: 10px 0px 5px 0px; padding: 0px; color: #111; font-size: 7px"
      >
        推荐
      </van-divider>

      <template v-if="userInner.userList.length">
        <div
          class="article-list"
          v-for="(item, index) in userInner.userList"
          :key="index"
        >
          <template v-if="item.gc_id === 1">
            <article-item
              ref="articleItem"
              :isUser="showHandle"
              :article="item"
              @showForward="showForward"
              @deleteIndex="del"
              :index="index"
            />
          </template>

          <template v-else-if="item.gc_id === 2">
            <video-item
              :videoItem="item"
              @changeFocus="changeFocus"
              ref="videoItem"
              @playerVideo="playerVideo(item)"
              @showForward="showForward"
              @deleteIndex="del"
              :index="index"
            />
          </template>

          <template v-else-if="item.gc_id === 3">
            <rent-item
              v-if="item.gc_id === 3"
              :rentItem="item"
              @deleteIndex="del"
              :index="index"
            />
          </template>

          <template v-else-if="item.gc_id === 4">
            <job-item
              v-if="item.gc_id === 4"
              :jobItem="item"
              @deleteIndex="del"
              :index="index"
            />
          </template>
        </div>
      </template>
    </div>

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
              :src="article.mem_like === '已点赞' ? zan.yes : zan.no"
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
          <div class="item" @click="goTop" v-show="goTopShow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 19V6M5 12l7-7 7 7" />
            </svg>
          </div>
        </div>
      </div>
    </transition>

    <!-- 发表评论 -->
    <transition name="van-slide-up">
      <div class="comm-btn" v-if="inputShow">
        <div class="ipt">
          <input ref="inputVal" v-model="commVal" type="text" />
        </div>
        <div class="btn" @click="submitComm(commType)">发送</div>
      </div>
    </transition>

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
import PageTitle from "@/components/PageTitle";
import ArticleItem from "@/views/home/components/ArticleItem";
import RentItem from "@/views/home/components/RentItem";
import AdvItem from "@/views/home/components/AdvItem";
import JobItem from "@/views/home/components/JobItem";
import VideoItem from "@/views/home/components/VideoItem";

import ShareSheet from "@/components/ShareSheet";
import CommList from "./components/CommList";
import RecomEnt from "./components/RecomEnt";
import {
  articleDetail,
  articleCommList,
  articleComm,
  forwardArticles,
  memForward,
  uploadAudio,
  delAudio,
  GraphicRecommend,
  wexinConfig,
  memberCollect,
} from "./actions";
import { changeFouce as focus, memberLike } from "@/views/home/actions/index";
import { wxJSSDK } from "@/utils/wxshare.js";
import wx from "weixin-js-sdk";
import { mapState, mapMutations } from "vuex";
import { ImagePreview, Notify, List, Dialog, Toast } from "vant";
import Aplayer from "vue-aplayer";

Vue.use(List);
export default {
  name: "user-profile",
  components: {
    Aplayer,
    PageTitle,
    ShareSheet,
    CommList,
    RecomEnt,
    ArticleItem,
    RentItem,
    AdvItem,
    JobItem,
    VideoItem,
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
      timeOutEvent: 0,
      RecStart: false,
      show: false,
      onShowd: false,
      goTopShow: false,
      article: "",
      articleContent: "",
      atyicleTitle: "",
      commList: [],
      inputShow: false,
      commVal: "",
      query: {},
      strSearch: "",
      commType: 1,
      zan: {
        no: require("../../assets/icons/zan.png"),
        yes: require("../../assets/icons/zan_hv.png"),
      },
      forwardMark: false,
      goindex: false,
      MemForward: {},
      activeNames: ["1"],
      userInner: {
        userList: [],
        articleList: [],
        videoList: [],
        otherList: [],
      },
      options: {
        mp4: "",
        poster: "",
      },
      showHandle: undefined,
      key: "",
      detailVideo: "",
      phone_number: {},
      //切换到语音
      changeStatus: false,
      //切换录音状态
      changeMirco: false,
      //作者id
      userid: null,
      gid: null,
      //音乐logo暂停/播放
      isPlay: false,
      initStatu: false,
      //音乐数据
      music: [],
      musicList: [],
      //用户录音权限
      musicAuthority: false,
      //列表活跃
      musicListActive: 0,
      //音频文件
      voice: {
        localId: "",
        serverId: "",
      },
      //音频计时器
      recTimer: false,
      testURL: "",
      //录音权限
      authority: true,
      //是否收藏
      isCollection: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.query) {
        this.$router.go(0);
      }
    },
    article: function () {
      this.$nextTick(function () {
        // 页面渲染完延时关闭
        setTimeout(function () {
          Toast.clear();
        }, 200);
      });
    },
  },
  created() {
    this.isComm();
    this.getDetail();

    if (this.$route.query.goindex == "true") {
      this.goindex = true;
    }

    let URL = "";
    if (window.__wxjs_is_wkwebview === true) {
      URL = window.location.href.split("#")[0] || window.location.href;
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
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    //上传录音
    uploadR() {
      var This = this;
      if (This.voice.localId == "") {
        return;
      }
      wx.uploadVoice({
        localId: This.voice.localId,
        success: function (res) {
          //上传音频
          let obj = {
            id: res.serverId,
            gid: This.gid,
          };
          uploadAudio(obj)
            .then((res) => {
              This.getAudioMsg();
              Toast.success("上传成功");
            })
            .catch((res) => {
              Toast.fail("上传失败");
            });
        },
      });
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
    //利用Promise解决函数作为参数形成封闭作用域的问题
    getLocalId() {
      return new Promise(function (resolve, reject) {
        wx.stopRecord({
          success: function (res) {
            resolve(res.localId);
          },
        });
      });
    },
    playR(localRecID) {
      wx.playVoice({
        localId: localRecID, // 需要播放的音频的本地ID，由stopRecord接口获得
      });
      Toast.success("播放音频");
    },
    //删除音频项
    delMusicItem(id) {
      Dialog.confirm({
        title: "删除音频",
        message: `确定要删除该音频吗?`,
        confirmButtonColor: "#ee0a24",
      })
        .then((e) => {
          this.music = [];
          delAudio(id);
          this.getAudioMsg();
        })
        .catch((e) => {});
    },
    //切换播放列表
    musicListClick(index) {
      this.musicListActive = index;
      this.isPlay = true;
      this.music = this.musicList[index];
      //暂停视频
      if (this.article.gc_id == 2) {
        this.detailVideo.pause();
      }
    },
    //切换录音播放状态
    musicStatuChange() {
      if (!this.initStatuinti) {
        this.$refs.player.toggle();
        this.isPlay = !this.isPlay;
        //暂停视频
        if (this.article.gc_id == 2) {
          this.detailVideo.pause();
        }
      } else {
        //初始化
        this.initStatu = true;
      }
    },
    //切换到输入语音
    changeStatu() {
      this.changeStatus = !this.changeStatus;
    },
    gotouchstart() {
      //暂停视频
      if (this.article.gc_id == 2) {
        this.detailVideo.pause();
      }
      //上传语音大于5 提示用户
      if (this.musicList.length > 4) {
        Dialog.confirm({
          title: "上传受限",
          message: `至多上传5条音频`,
          confirmButtonColor: "green",
        });
        return;
      }
      if (!this.rec) {
        this.recOpen();
      }
      this.changeMirco = true;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(() => {
        this.recStart();
      }, 600);
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        this.recStop();
        this.RecStart = false;
      }
      this.changeMirco = false;
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
    getPhone(res) {
      window.location.href = "tel:" + res;
    },
    initVideos() {
      if (!this.article.graphic_intro) {
        this.detailVideo = this.$refs.detailVideo;
        this.detailVideo.autoPlay = true;
        this.detailVideo.play();
      }else{
        
        this.$refs.detailVideo.children.forEach((item,index)=>{
          if(item.localName == 'video'){
            this.detailVideo = this.$refs.detailVideo.children[index];
          }
        })
        this.detailVideo.autoPlay = true;
        this.detailVideo.play();
      }
    },
    conShow() {
      this.onShowd = !this.onShowd;
      this.inputShow = !this.inputShow;
    },
    userHandle(article) {
      
      if (article.mmt_id === 3) {
        var obj = {
          entid: article.rel_id,
          entfid: 0,
        };
        var res = this.$Utils.demoRequest(JSON.stringify(obj));
        this.$router.push({
          path: "/merchants/produce",
          query: { res: res },
        });
      } else {
        this.$router.push({
          path: `/user/page/${article.mem_id}`,
          query: { type: "u" },
        });
      }
    },
    // 判断是否自己的主页
    initShowHandle() {
      if (this.$route.query.type) {
        if (this.user.id == this.article.mem_id) {
          this.showHandle = true;
        } else {
          this.showHandle = false;
        }
      } else {
        this.showHandle = true;
      }
    },
    // 获取用户发布信息
    async userIndex() {
      const id = this.article.gid;
      let res;
      if (id) {
        res = await GraphicRecommend(id);
      } else {
        res = await GraphicRecommend();
      }

      const userList = res.data;
      userList.map((item) => {
        if (item.gc_id === 1) {
          this.userInner.articleList.push(item);
        } else if (item.gc_id === 2) {
          this.userInner.videoList.push(item);
        } else if (item.gc_id === 3) {
          this.userInner.otherList.push(item);
        }
      });
      this.userInner.userList = userList;
    },
    // 分享转发
    forward() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        forwardArticles(this.article.gid, 1).then((res) => {
          this.forwardMark = true;

          if (res.code == 100) {
            if (this.article.gc_id == 1) {
              var imgUrl = "http://api.lejiagx.cn/static/icon/lejia_logo.png";

              if (this.article.graphic_thumbnail.length > 0) {
                imgUrl = this.article.graphic_thumbnail[0]
                  .graphic_thumbnail_path;
              }

              var form = {
                title: this.article.graphic_name,
                link:
                  window.location.href +
                  "?goindex=true&key=" +
                  res.data.mem_urlkey,
                imgUrl: imgUrl,
                desc:
                  this.article.graphic_intro ||
                  "来自" + this.article.mem_name + "的分享",
              };
            } else {
              var form = {
                title: this.article.graphic_name,
                link:
                  window.location.href +
                  "?goindex=true&key=" +
                  res.data.mem_urlkey,
                imgUrl:
                  this.article.graphic_surface_plot ||
                  "http://api.lejiagx.cn/static/icon/lejia_logo.png",
                desc:
                  this.article.graphic_intro ||
                  "来自" + this.article.mem_name + "的分享",
                type: "video",
                dataUrl: this.article.graphic_video_path,
              };
            }

            wxJSSDK(form);

            setTimeout(() => {
              this.forwardMark = false;
              this.$toast("分享成功");
              // if (article.type === 'article') {

              //   this.$refs.articleItem[article.index].showForwardOper()
              // }else{

              //   this.$refs.videoItem[article.index].showForwardOper()
              // }
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

    isComm() {
      if (this.$route.query.type) {
        this.inputChange();
      }
    },
    // 点赞
    like() {
      const state = this.article.mem_like === "已点赞" ? 0 : 1;
      memberLike(this.article.gid, 1, state).then((res) => {
        if (res.code === 100) {
          state === 1
            ? (this.article.mem_like = "已点赞")
            : (this.article.mem_like = "未点赞");
        }
      });
    },
    //收藏
    collect() {
      let state = this.isCollection === true ? 0 : 1;
      memberCollect(this.article.gid, 1, state)
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
          console.log(res);
        });
    },
    // 关注
    async focus() {
      const query = {
        id: this.article.mem_id,
        state: 0,
      };
      const res = await focus(query);
      if (res.code === 100) {
        this.$toast.success("关注成功");
        this.show = false;
      } else {
        this.$toast.fail("关注失败");
      }
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
        id: this.article.gid,
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

        this.article.mem_attention_state === 1
          ? (this.show = false)
          : (this.show = true);

        const query = {
          type: res.data.gc_id,
          id: res.data.gid,
        };

        const commList = await articleCommList(query);
        this.commList = commList.data.reverse();
      } else {
        this.$toast("这篇文章飞向外太空了！");
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      }
    },
    closeInput() {
      this.inputShow = false;
    },
    inputChange() {
      this.inputShow = true;
      this.onShowd = true;
      this.$nextTick(() => {
        this.$refs.inputVal.focus();
      });
    },
    // 获取文章详情
    async getDetail() {
      if (this.$route.query.key) {
        this.key = this.$route.query.key;
      }

      var obj = {
        id: this.$route.params.id,
        key: this.key,
      };

      const res = await articleDetail(obj);

      if (res.code === 100) {
        this.atyicleTitle = res.data.graphic_name;
        this.articleContent = res.data.graphic_details;
        this.article = res.data;
        //存储用户id
        this.userid = res.data.mem_id;
        this.gid = res.data.gid;
        //获取播放列表
        this.musicList = [];
        let musicList = res.data.rec_list;
        for (let i = 0; i < musicList.length; i++) {
          let urlList = {
            url: musicList[i].gr_url,
            time: musicList[i].gr_addtime,
            grid: musicList[i].grid,
          };

          this.musicList.push(urlList);
          this.music = {
            url: musicList[0].gr_url,
            time: musicList[0].gr_addtime,
          };
        }
        //数组去重
        this.musicList = new Set(this.musicList);
        this.musicList = Array.from(this.musicList);

        if (this.user.id === res.data.mem_id && this.user.id != undefined) {
          this.musicAuthority = true;
          // console.log("用户当前页")
        } else {
          // console.log("非用户当前页")
        }
        if (res.data.phone_number != undefined) {
          if (res.data.phone_number.mobile.length > 0) {
            this.phone_number = res.data.phone_number.mobile;
          }
        }

        this.article.mem_attention_state === 1
          ? (this.show = false)
          : (this.show = true);

        const query = {
          type: res.data.gc_id,
          id: res.data.gid,
        };

        const commList = await articleCommList(query);
        this.commList = commList.data.reverse();

        if (res.data.gc_id == 2) {
          this.options.poster = res.data.graphic_surface_plot;
          this.options.mp4 = res.data.graphic_video_path;
          this.initVideos();
        }

        // 自动注册微信分享
        this.autoForward();
        this.initShowHandle();
        this.userIndex();
        this.getMemForward();
      } else {
        this.$toast("这篇文章飞向外太空了！");
        setTimeout(() => {
          this.$router.go(-1);
        }, 600);
      }
    },
    // 获取分享
    async getMemForward() {
      const res = await memForward(this.$route.params.id);
      this.MemForward = res.data;
    },
    goHome() {
      this.$router.push("/");
    },
    autoForward() {
      // 注册微信分享
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        if (this.article.gc_id == 2) {
          var form = {
            title: this.article.graphic_name,
            link: window.location.href + "?goindex=true",
            imgUrl:
              this.article.graphic_surface_plot ||
              "http://api.lejiagx.cn/static/icon/lejia_logo.png",
            desc:
              this.article.graphic_intro ||
              "来自" + this.article.mem_name + "的分享",
            type: "video",
            dataUrl: this.article.graphic_video_path,
          };
        } else {
          var imgUrl = "http://api.lejiagx.cn/static/icon/lejia_logo.png";

          if (this.article.graphic_thumbnail.length > 0) {
            imgUrl = this.article.graphic_thumbnail[0].graphic_thumbnail_path;
          }

          var form = {
            title: this.article.graphic_name,
            link: window.location.href + "?goindex=true",
            imgUrl: imgUrl,
            desc:
              this.article.graphic_intro ||
              "来自" + this.article.mem_name + "的分享",
          };
        }

        wxJSSDK(form);
      }
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
                  "?goindex=true&key=" +
                  res.data.mem_urlkey,
                imgUrl: imgUrl,
                desc:
                  article.graphic_intro || "来自" + article.mem_name + "的分享",
              };

              this.$refs.articleItem[article.index].showForwardOper(1);
            } else {
              var form = {
                title: article.graphic_name,
                link:
                  window.location.href +
                  "?goindex=true&key=" +
                  res.data.mem_urlkey,
                imgUrl:
                  article.graphic_surface_plot ||
                  "http://api.lejiagx.cn/static/icon/lejia_logo.png",
                desc:
                  article.graphic_intro || "来自" + article.mem_name + "的分享",
                type: "video",
                dataUrl: article.graphic_video_path,
              };

              this.$refs.VideoItem[article.index].showForwardOper(1);
            }

            wxJSSDK(form);

            setTimeout(() => {
              this.forwardMark = false;
              this.$toast("分享成功");
            }, 4000);
          } else {
            this.forwardMark = false;
            this.$toast(res.msg);

            if (article.type === "article") {
              this.$refs.articleItem[article.index].showForwardOper(0);
            } else {
              this.$refs.VideoItem[article.index].showForwardOper(0);
            }
          }
        });
      } else {
        this.$toast("请在微信中分享");
      }
    },
    goTop() {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    showImg(e) {
      if (e.target.tagName == "IMG") {
        ImagePreview({
          images: [e.target.src],
          showIndex: false,
          closeOnPopstate: true, //页面回退关闭预览
          closeable: true,
        });
      }
    },
    scroll(e) {
      if (e.path[1].scrollY >= 400) {
        this.goTopShow = true;
      } else if (e.path[1].scrollY <= 400) {
        this.goTopShow = false;
      }

      if (this.article.gc_id == 2 && e.path[1].scrollY >= 400) {
        this.detailVideo.pause();
      }
    },
    //获取音频信息
    async getAudioMsg() {
      if (this.$route.query.key) {
        this.key = this.$route.query.key;
      }

      var obj = {
        id: this.$route.params.id,
        key: this.key,
      };

      const res = await articleDetail(obj);

      if (res.code === 100) {
        //获取播放列表
        this.musicList = [];
        let musicList = res.data.rec_list;
        for (let i = 0; i < musicList.length; i++) {
          let urlList = {
            url: musicList[i].gr_url,
            time: musicList[i].gr_addtime,
            grid: musicList[i].grid,
          };

          this.musicList.push(urlList);
          this.music = {
            url: musicList[0].gr_url,
            time: musicList[0].gr_addtime.split(" ")[0],
          };
        }
        //数组去重
        this.musicList = new Set(this.musicList);
        this.musicList = Array.from(this.musicList);
        //用户录音权限
        if (this.$store.state.user.relid === res.data.mem_id) {
          this.musicAuthority = true;
          // console.log("用户当前页")
        } else {
          // console.log("非用户当前页")
        }
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
    this.getCommList();
    this.musicStatuChange();
  },
};
</script>

<style scoped lang='less'>
.article-page {
  font-size: 17px;
  min-height: 100%;
  padding: 50px 15px 60px 15px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  .article {
    .article-titile {
      // margin-top: 60px;
      margin-top: 10px;
      font-size: 21px;
      color: #3a3a3a;
      font-weight: 500;
    }
    .article-content {
      margin-top: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      & /deep/ img {
        width: 100%;
        margin-top: 2px;
        padding-top: 5px;
        max-height: calc(100vh / 2);
        object-fit: cover;
      }
      & /deep/ a {
        text-decoration: none;
        color: #00a8ff;
      }
      & /deep/ pre {
        font-family: Consolas;
        font-size: 14px;
        margin: 10px 0;
        border-radius: 5px;
      }
      & /deep/ h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 10px 0;
      }
      & /deep/ p {
        line-height: 30px;
        font-size: 17px;
        position: relative;
        color: #636363;
        img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
        }
      }
    }
    .phone-content {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px #eee solid;
      .van-icon {
        float: right;
        line-height: 40px;
      }
      span {
        color: blue;
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
  .article-user {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 7px;
    box-shadow: 0px 2px 10px rgba(117, 117, 117, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    z-index: 999;
    overflow: hidden;
    .user-info {
      width: 170px;
      display: flex;
      align-items: center;
      .img {
        width: 60px;
        height: 40px;
        overflow: hidden;
        img {
          border-radius: 100%;
          width: 40px;
          height: 40px;
        }
      }
      .name {
        width: 150px;
        font-size: 14px;
        color: #3a3a3a;
      }
    }
    .buttons-item {
      width: 100px;
      display: flex;
      justify-content: flex-end;
      .buttons {
        width: 48px;
        height: 28px;
        border-radius: 18px;
        background: #d04443;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        margin-right: 10px;
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      background: #eeeeee;
      border-radius: 0 0 0 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 14px;
      .icon {
        margin-right: 2px;
        margin-bottom: 3px;
      }
    }
    .forwards {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
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
  .btn {
    text-align: center;
    width: 60px;
    font-size: 15px;
    color: #d04443;
    font-weight: 400;
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
.mem_forward {
  width: 100%;
  margin-top: 10px;
  // border-bottom: 1px solid rgba(230, 230, 230, 1);
  margin-bottom: 20px;
  padding-bottom: 5px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .user-info {
    display: flex;
    align-items: center;
    .img {
      width: 60px;
      height: 40px;
      overflow: hidden;
      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
    }
    .name {
      font-size: 14px;
      color: #3a3a3a;
    }
  }
  .user_right {
    width: 50%;
    height: 40px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  .user_rightText {
    margin-left: 5px;
  }
}
.videoClass {
  width: 100%;
  height: 400px;
  background-color: rgb(0, 0, 0);
}
.liveStreamVideo {
  width: 100%;
  margin-bottom: 5px;
  .mediaVideo {
    width: 100%;
    height: auto;
    max-height: calc(100vh / 3);
  }
}
pre {
  white-space: pre-wrap;
}
a {
  text-decoration: none;
  color: #06c;
}
a:hover {
  color: #f00;
}
//录音
.musicVideo {
  position: relative;
  width: 90%;
  margin: 0 auto;
  z-index: 0;
  .musicList {
    width: 100%;
    margin: 15px auto;
    border-bottom: 1px solid #ccc;
    .musicIcon {
      color: #1989fa;
    }
    span:nth-of-type(1) {
      padding: 0 20px 0 16px;
      font-weight: 600;
      font-size: 16px;
    }
    span:nth-of-type(2) {
      font-size: 12px;
      color: #ccc;
    }
    span:nth-of-type(3) {
      float: right;
    }
    span:nth-of-type(3)::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  .textVideo {
    position: absolute;
    padding: 5px 0 0 25px;
    width: 50%;
    z-index: 1;
    h4 {
      color: #646464;
    }
    p {
      padding-top: 1px;
      font-size: 12px;
      color: #ccc;
    }
  }
  .musicImg {
    position: absolute;
    width: 50%;
    right: 0;
    text-align: center;
    z-index: 1;
    img {
      width: 50%;
      height: 50px;
    }
  }
  /deep/ .aplayer-narrow {
    margin-top: 14px;
    width: 100%;
    height: 50px;
    border-radius: 30px;
  }
  /deep/ .aplayer-pic {
    width: 100%;
    height: 50px;
    background: none;
  }
}
.html-class {
  /deep/.ql-video {
    width: 100%;
  }
  width: 100%;
  /deep/ p {
    img {
      width: 100%;
      object-fit: cover;
    }
  }
}
video {
  width: 100%;
}
.article-list {
  margin-bottom: 10px;
}
</style>
