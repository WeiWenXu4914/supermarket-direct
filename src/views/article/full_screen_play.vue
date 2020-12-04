<template>
  <div v-if="article != ''">
    <van-swipe
      style="height: 100vh"
      vertical
      :loop="false"
      :show-indicators="false"
      @change="change_event"
    >
      <van-swipe-item>
        <div class="video-class" :style="'backgroundImage:url(\''+ article.graphic_surface_plot + '\')'">
          <div class="back" @click="$router.go(-1)">
            <van-icon name="arrow-left" size="30px" color="#fff" />
            <span>{{ article.graphic_name | strSub(15) | emoji_decode }}</span>
          </div>

          <div class="video-top" :style="'backgroundImage:url(\''+ article.graphic_surface_plot + '\')'">
            <div class="bg"></div>
          </div>
          <video
            ref="detailVideo0"
            class="video-item"
            controls=""
            :poster="article.graphic_surface_plot"
            preload="auto"
            webkit-playsinline=""
            playsinline=""
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portrait"
            :src="article.graphic_video_path"
            @click="play_video(2)"
          ></video>

          <div class="imgPlayer" v-show="pause_show">
            <img
              src="http://apis.lejiagx.cn/static/img/video_player5.png"
              style="object-fit: cover; width: 70px"
              v-if="play_pause"
              @click="play_video(1)"
            />
            <van-icon
              name="pause-circle-o"
              v-if="!play_pause"
              color="#fff"
              size="70"
              @click="play_video(2)"
            />
          </div>

          <div class="video-bottom" :style="'backgroundImage:url(\''+ article.graphic_surface_plot + '\')'">
            <div class="bg"></div>
          </div>

          <div class="video-detail">
            <div
              :class="[
                musicList.length > 0
                  ? 'video-detail-user'
                  : 'video-detail-users',
              ]"
              @click="userHandle(article)"
            >
              <div class="user-name">
                <span>@{{ article.mem_name | strSub(15) | emoji_decode }}</span>
                <span v-if="article.mmt_id == 3">进店</span>
              </div>
              <div class="video-title">
                <span>{{ intro | emoji_decode }}</span>
              </div>
            </div>

            <!--音频播放-->
            <div
              v-if="musicList.length > 0"
              class="musicVideo"
              :style="[
                {
                  justifyContent:
                    musicList.length > 1 ? 'space-between' : 'flex-end',
                },
              ]"
            >
              <aplayer
                mini="true"
                :listFolded="false"
                ref="player"
                :music="music"
              >
              </aplayer>

              <div
                class="musicList"
                v-if="musicList.length > 1"
                @click="musicListMore = true"
              >
                <van-icon name="arrow-up" />
                <span>更多</span>
              </div>
            </div>
          </div>

          <div class="video-oper">
            <!-- 关注 -->
            <div class="oper-item">
              <div class="user-head" @click="userHandle(article)">
                <van-image
                  round
                  width="40px"
                  height="40px"
                  :src="article.mem_head_portrait"
                />
              </div>
              <div
                class="att-btn"
                @click="focus"
                v-if="show && user.id !== article.mem_id"
              >
                <span>+</span>
              </div>
            </div>
            <!-- 点赞 -->
            <div class="oper-item" @click="like">
              <van-icon
                name="like"
                size="35px"
                color="red"
                v-if="article.mem_like_state == 1"
              />
              <van-icon name="like" size="35px" color="#fff" v-else />
              <span v-if="article.graphic_like > 0">{{
                articleNum(article.graphic_like)
              }}</span>
            </div>
            <!-- 评论 -->
            <div class="oper-item" @click="inputChange">
              <van-icon name="chat" size="35px" color="#fff" />
              <span v-if="article.graphic_comment > 0">{{
                articleNum(article.graphic_comment)
              }}</span>
            </div>
            <!-- 收藏 -->
            <div class="oper-item" @click="collect">
              <van-icon name="star" size="35px" color="#fff" />
              <span v-if="article.graphic_collect > 0">{{
                articleNum(article.graphic_collect)
              }}</span>
            </div>
            <!-- 分享 -->
            <div class="oper-item" @click="forward">
              <van-icon name="share" size="35px" color="#fff" />
              <span v-if="article.graphic_forward > 0">{{
                articleNum(article.graphic_forward)
              }}</span>
            </div>
            <!-- 录音 -->
            <div
              class="oper-item"
              @click="musicListMore = true"
              v-if="musicAuthority"
            >
              <van-icon
                name="http://api.lejiagx.cn/static/icon/语音.png"
                size="35px"
                color="#fff"
              />
              <span v-if="article.rec_list.length > 0">{{
                article.rec_list.length
              }}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="recommended-class">
          <van-divider
            v-if="userInner.userList.length"
            content-position="left"
            style="
              margin: 10px 0px 5px 0px;
              padding: 0px;
              color: #111;
              font-size: 15px;
            "
          >
            推荐
          </van-divider>

          <van-swipe @change="onChange" v-if="userInner.userList.length">
            <van-swipe-item
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
            </van-swipe-item>
          </van-swipe>
        </div>
      </van-swipe-item>
    </van-swipe>

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
      <div v-if="forwardMark" class="forward" @click="forwardMark = false">
        <div class="box">
          <div class="icon">
            <img src="../../assets/icons/forward.png" alt="" />
          </div>
          <div class="text">点击右上角发送给指定朋友或者分享到朋友圈。</div>
        </div>
      </div>
    </transition>

    <!-- 评论列表 -->
    <transition name="van-fade">
      <div v-show="onShowd" class="conShowMb">
        <div class="conShowMbS">
          <div class="close" @click.stop="conShow">
            <van-icon name="close" size="30px" />
          </div>
          <comm-list :commList="commList" @replay="replay"></comm-list>
        </div>
      </div>
    </transition>

    <!-- 卖家心声 -->
    <van-popup
      v-model="musicListMore"
      closeable
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div
        v-for="(item, index) in musicList"
        :key="index"
        class="musicListMore"
        @click="musicListClick(index)"
      >
        <van-cell
          :value="item.time"
          :title="'卖家心声' + (index + 1)"
          is-link
          icon="play-circle"
        >
          <template #right-icon>
            <van-icon
              name="close"
              color="red"
              @click="delMusicItem(item.grid)"
            />
          </template>
        </van-cell>
      </div>

      <div class="mainBtn">
        <!-- <div class="ctrlProcessWave" v-show="recTimer">
          <img src="./img/musicPlay.gif" alt="" />
        </div> -->
        <button
          class="ctrlBtn"
          @touchstart="gotouchstart"
          @touchmove="gotouchmove"
          @touchend="gotouchend"
        >
          开始录音
        </button>
      </div>
    </van-popup>

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
  name: "full_screen_play",
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
      article: "",
      articleContent: "",
      atyicleTitle: "",
      commList: [],
      inputShow: false,
      commVal: "",
      query: {},
      strSearch: "",
      commType: 1,
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
      play_pause: true,
      pause_show: true,
      musicListMore: false,
      intro: "",
    };
  },
  watch: {
    $route(to, from) {
      if (to.query) {
        this.$router.go(0);
      }
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
    play_video(type) {
      if (type == 1) {
        this.$refs.detailVideo0.play();
        // this.FullScreen();
        this.play_pause = false;
        setTimeout(() => {
          this.pause_show = false;
        }, 2000);
      } else {
        this.$refs.detailVideo0.pause();
        this.play_pause = true;
        this.pause_show = true;
      }
    },
    //进入全屏
    FullScreen() {
      var ele = document.documentElement;
      console.log(ele)
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      var de = document;
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    },
    // 暂停播放,加载推荐
    change_event(index) {
      index = 0;
      this.$refs["detailVideo" + index].pause();
      this.userIndex();
      this.play_pause = true;
      this.pause_show = true;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        overlay: true,
        duration: 0,
      });
    },
    articleNum(val) {
      if (val > 100) {
        return "99+";
      } else {
        return val;
      }
    },
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
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) != "micromessenger") {
        Toast("请在微信中打开!");
        return false;
      }

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
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) != "micromessenger") {
        Toast("请在微信中打开!");
        return false;
      }

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
        this.$refs.detailVideo0.pause();
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
      //上传语音大于5 提示用户
      if (this.musicList.length > 4) {
        Dialog.confirm({
          title: "上传受限",
          message: `至多上传5条音频`,
          confirmButtonColor: "green",
        });
        return;
      }

      this.changeMirco = true;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(() => {
        this.startRecord();
      }, 600);
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        this.stopRecord();
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
    // 获取推荐
    async userIndex() {
      const id = this.article.gid;
      let res;
      if (id) {
        res = await GraphicRecommend(id);
      } else {
        res = await GraphicRecommend();
      }
      Toast.clear();
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
            ? ((this.article.mem_like_state = 1),
              (this.article.graphic_like = this.article.graphic_like + 1))
            : ((this.article.mem_like_state = 0),
              (this.article.graphic_like = this.article.graphic_like - 1));
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
          type: 1,
          id: res.data.gid,
        };

        const commList = await articleCommList(query);
        this.commList = commList.data.reverse();
      } else {
        this.$toast("这篇文章飞向外太空了！");
        setTimeout(() => {
          this.$router.push("/");
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

      setTimeout(function () {
        Toast.clear();
      }, 200);

      if (res.code === 100) {
        this.article = res.data;
        this.intro = res.data.graphic_intro || res.data.graphic_name;

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

        // 自动注册微信分享
        this.autoForward();
        this.initShowHandle();
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
    this.getCommList();
  },
};
</script>
<style scoped lang="less">
.van-swipe-item {
  width: 100%;
  height: 100%;
  .video-class {
    width: 100%;
    height: 100vh;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    // background-image: url("http://api.lejiagx.cn/static/adv2/img/6.jpg");
    background-size: cover;
    background-repeat: "no-repeat";
    background-position: center;
    .back {
      width: 100%;
      height: 40px;
      background: rgba(0000, 0000, 0000, 0.1);
      position: fixed;
      display: flex;
      align-items: center;
      padding-left: 10px;
      top: 0;
      left: 0;
      z-index: 1;
      span {
        flex: 1;
        text-align: center;
        padding-right: 40px;
        font-size: 17px;
        color: #fff;
      }
    }
    .imgPlayer {
      position: absolute;
      text-align: center;
      width: 100%;
      top: calc(50vh - 40px);
    }
    .video-item {
      width: 100%;
      height: auto;
      max-height: 100vh;
      outline: none;
    }
    .video-detail {
      width: 100%;
      color: #fff;
      position: absolute;
      padding-left: 15px;
      bottom: 20px;
      left: 0px;
      z-index: 2;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .video-detail-users {
        width: 96%;
        background: rgba(0000, 0000, 0000, 0.5);
        padding: 4px;
        border-radius: 5px;
        .user-name {
          span:nth-child(1) {
            font-size: 17px;
            font-weight: 600;
          }
          span:nth-child(2) {
            background: #d04443;
            margin-left: 8px;
            padding: 2px 4px 2px 4px;
            border-radius: 4px;
          }
        }
        .video-title {
          font-size: 15px;
          font-weight: 500;
          margin-top: 5px;
        }
      }
      .video-detail-user {
        flex: 1;
        background: rgba(0000, 0000, 0000, 0.5);
        padding: 4px;
        border-radius: 5px;
        .user-name {
          span:nth-child(1) {
            font-size: 17px;
            font-weight: 600;
          }
          span:nth-child(2) {
            background: #d04443;
            margin-left: 8px;
            padding: 2px 4px 2px 4px;
            border-radius: 4px;
          }
        }
        .video-title {
          font-size: 15px;
          font-weight: 500;
          margin-top: 5px;
        }
      }
      .musicVideo {
        position: relative;
        width: 100px;
        margin: 0 auto;
        z-index: 0;
        display: flex;
        align-items: center;
        .musicList {
          width: 40px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .musicIcon {
            color: #1989fa;
          }
        }
        /deep/ .aplayer-narrow {
          margin-top: 14px;
          width: 50px;
          height: 50px;
          border-radius: 30px;
          background: #161817;
        }
        /deep/ .aplayer-pic {
          width: 100%;
          height: 50px;
          background: none;
        }
      }
    }
    .video-oper {
      width: 20%;
      min-height: 200px;
      max-height: 400px;
      position: absolute;
      right: 0px;
      bottom: 200px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .oper-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        color: #fff;
        .user-head {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 100%;
          -moz-box-shadow: 0px 0px 2px #ebebeb;
          -webkit-box-shadow: 0px 0px 2px #ebebeb;
          box-shadow: 0px 0px 2px #ebebeb;
        }
        .att-btn {
          height: 17px;
          width: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 550;
          font-size: 17px;
          background: crimson;
          border-radius: 17px;
          margin-top: -8px;
          z-index: 2;
        }
      }
    }
    .video-bottom {
      flex: 1;
      position: relative;
      width: 100%;
      background-size: cover;
      background-position: bottom;
      filter: blur(2px);
    }
    .video-top {
      flex: 1;
      width: 100%;
      background-size: cover;
      background-position: top;
      filter: blur(2px);
    }
  }
}
.recommended-class {
  width: 96%;
  height: 100vh;
  margin: 5px auto;
  overflow: auto;
}
.conShowMb {
  width: 100%;
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 60px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  .conShowMbS {
    width: 100%;
    padding: 10px;
    max-height: calc(100vh / 2);
    background: #fff;
    border-radius: 10px 10px 0px 0px;
    margin-top: 40px;
    .comm-list {
      max-height: calc(100vh / 2);
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
video::-webkit-media-controls {
  display: none;
}
.musicListMore {
  width: 96%;
  background: #fff;
  color: #111;
  margin: 50px auto;
}
.mainBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 5px;
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
</style>