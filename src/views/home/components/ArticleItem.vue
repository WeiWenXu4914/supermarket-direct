<template>
  <div class="article-list">
    <!-- 文章 -->
    <div class="article-item">
      <div class="item-info">
        <div class="avator" @click.stop="userHandle">
          <van-image :src="article.mem_head_portrait" round>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="name" @click.stop="userHandle">
          <p>
            <span v-if="!selectPhoneNumber(article.mem_name)">
              {{ article.mem_name }}
            </span>
            <span v-else>
              {{ selectPhoneNumber(article.mem_name).name }}
            </span>

            <van-icon
              name="http://api.lejiagx.cn/static/icon/官方授权.png"
              size="15px"
              v-if="article.mem_id == 1"
              style="margin-right: 5px"
            />

            <van-tag
              plain
              color="#f3a683"
              v-if="article.mmt_id == 3 && article.mem_id != 1"
            >
              {{ article.ent_district || article.mmt_type_name }}
            </van-tag>
          </p>
        </div>
        <!-- <div
          class="buttons"
          v-if="user.id !== article.memid"
          @click="checkFouce(article.AattState)"
        >
          {{ article.AattName }}
        </div> -->
        <div
          style="margin-left: 10px"
          v-if="article.mmt_id == 3 && article.memid != 1"
          @click="userHandle"
        >
          <van-button color="#D04443" size="mini">进店</van-button>
        </div>
      </div>

      <div
        class="graphic-item"
        v-if="
          article.graphic_name.length > 50 &&
          article.graphic_thumbnail.length == 1
        "
      >
        <div class="item-title" @click="goDetail(article.gid)">
          <span
            class="title-icon"
            v-if="article.graphic_sort_top === '黄金展位'"
          >
            <img src="../../../assets/icons/hjzw.png" alt="" />
          </span>
          <span
            >{{ article.graphic_name | strSub(70) | emoji_decode }}
            <span class="allArt" v-if="article.graphic_name.length > 70"
              >全文</span
            >
          </span>
        </div>
        <div class="item-img">
          <div class="imgs">
            <div
              v-for="(item, index) in article.graphic_thumbnail"
              :key="item.gtid"
              @click="getpreview(article.graphic_thumbnail)"
            >
              <img v-lazy="item.graphic_thumbnail_path" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="item-title" @click="goDetail(article.gid)">
          <span
            class="title-icon"
            v-if="article.graphic_sort_top === '黄金展位'"
          >
            <img src="../../../assets/icons/hjzw.png" alt="" />
          </span>
          <span
            >{{ article.graphic_name | strSub(70) | emoji_decode
            }}<span class="allArt" v-if="article.graphic_name.length > 70"
              >全文</span
            ></span
          >
        </div>
        <div class="item-img" style="padding-bottom: 7px">
          <div class="imgs">
            <div :class="'w' + imgClass">
              <img
                @click="getpreview(article.graphic_thumbnail)"
                v-if="index < 3"
                alt=""
                v-for="(item, index) in article.graphic_thumbnail"
                :key="item.gtid"
                v-lazy="item.graphic_thumbnail_path"
              />
            </div>
            <div
              v-if="this.article.graphic_thumbnail.length > 3"
              class="wsPlus"
              @click="goDetail(article.gid)"
            >
              +{{ this.article.graphic_thumbnail.length - 3 }}
            </div>
          </div>
        </div>
      </div>

      <div class="item-handle">
        <div class="handle-item" @click="showForward(article)">
          <span class="icon">
            <img src="../img/fx.png" alt="" />
          </span>
          <span>分享</span>
          <span class="num">{{ article.graphic_forward }}</span>
        </div>
        <div class="handle-item" @click="onComm">
          <span class="icon">
            <img src="../img/pl.png" alt="" />
          </span>
          <span>评论</span>
          <span class="num">{{ article.graphic_comment }}</span>
        </div>
        <div class="handle-item" @click="like">
          <span class="icon">
            <img
              src="../img/like.svg"
              v-show="status.isLike == '' ? true : false"
            />
            <img
              src="../img/likeActive.svg"
              v-show="status.isLike == '' ? false : true"
            />
          </span>
          <span :style="status.isLike">点赞</span>
          <span class="num" :style="status.isLike">{{
            article.graphic_like
          }}</span>
        </div>
      </div>
      <div class="item-editDel" v-if="isUser">
        <div class="editDelTime">
          发布于：{{ article.graphic_addtime | relTime }}
        </div>
        <div class="editDelBtn">
          <van-icon
            name="ellipsis"
            class="buttonss"
            v-if="!visible"
            @click="visible = !visible"
          />
          <van-icon
            name="cross"
            class="buttonss"
            v-if="visible"
            @click="visible = !visible"
          />
          <div :class="[visible ? 'more-handle' : 'more-handle-no']">
            <!-- <span v-if="visible" @click="operation(1,article)">编辑</span> -->
            <span v-if="visible" @click="operation(0, article)">删除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changeFouce as focus, memberLike, articleDel } from "../actions";
import { ImagePreview, Toast, Icon } from "vant";
import { mapMutations, mapState } from "vuex";
import { wxJssdkChooseImage } from "@/utils/wxshare.js";
import wx from "weixin-js-sdk"; //微信sdk依赖
export default {
  name: "article-item",
  props: {
    isFocus: {
      type: Boolean,
      default: false,
    },
    article: Object,
    index: {
      type: Number,
      required: true,
    },
    imgVal: [],
  },
  data() {
    return {
      index: 0,
      show: false,
      imgClass: 0,
      isUser: false,
      visible: false,
      status: {
        isLike: "",
      },
    };
  },
  watch: {},
  created() {
    wxJssdkChooseImage();
    if (this.article.graphic_thumbnail.length > 3) {
      this.imgClass = "s";
    } else {
      this.imgClass = this.article.graphic_thumbnail.length;
    }

    if (this.user.id == this.article.mem_id) {
      this.isUser = true;
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setMerchant"]),
    //判断是否点过赞
    //  isLike() {
    //     memberLike(this.article.gid, 1, 1)
    //     .then((res) => {
    //         if( res.code == 100 ) {
    //             this.status.isLike = '';
    //             memberLike(this.article.gid, 1, 0)
    //         } else if( res.code == 101 ){
    //             this.status.isLike = 'color:#d81e06';
    //         }
    //     })
    // },
    selectPhoneNumber(str) {
      var regx = /(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g;
      var phoneNums = str.match(regx);
      var item = {};
      if (phoneNums) {
        for (var i = 0; i < phoneNums.length; i++) {
          var temp = phoneNums[i];

          item = {
            phone: temp,
            name: str.replace(phoneNums[i], ""),
          };
        }
      } else {
        item = false;
      }
      return item;
    },
    showForward(article) {
      this.$emit("showForward", {
        type: "article",
        ...article,
        index: this.index,
      });
    },
    showForwardOper(oper) {
      if (oper == 0) {
        if (parseInt(this.article.graphic_forward) - 1 >= 0) {
          this.article.graphic_forward =
            parseInt(this.article.graphic_forward) + 1;
        }
      } else if (oper == 1) {
        this.article.graphic_forward =
          parseInt(this.article.graphic_forward) + 1;
      }
    },
    onComm() {
      this.$router.push({
        path: `/article/detail/${this.article.gid}`,
        query: { type: "pl" },
      });
    },
    getpreview(val) {
      this.goDetail(this.article.gid);
      return false;

      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) != "micromessenger") {
        this.goDetail(this.article.gid);
        return false;
      }

      this.imgVal = [];

      for (var i = 0; i < val.length; i++) {
        Vue.set(this.imgVal, i, val[i].graphic_thumbnail_path);
      }

      var that = this;

      const jsApiList = [
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ",
        "onMenuShareQZone",
        "openLocation",
        "getLocation",
        "chooseImage",
        "getLocalImgData",
        "previewImage",
      ];

      var res = JSON.parse(sessionStorage.getItem("wechatConfig"));
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: jsApiList,
      });
      wx.previewImage({
        current: that.imgVal[0], // 当前显示图片的http链接
        urls: that.imgVal, // 需要预览的图片http链接列表
      });

      // if (e.target.tagName == "IMG") {
      //  ImagePreview({
      //      images: [e.target.src],
      //      showIndex: false,
      //      closeOnPopstate: true //页面回退关闭预览
      //    });
      //  }
    },
    userHandle() {

      if (this.article.memid == 1) {
        return;
      }

      if (this.article.mmt_id === 3) {
        if (this.$route.path == "/merchants/produce") {
          Toast("您已经在店铺内了");
          return;
        }
        
        this.setMerchant(this.$route.path);

        var obj = {
          entid: this.article.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {
        
        if (this.$route.path == `/user/page/${this.article.mem_id}`) {
          Toast("您已经在自己的主页了");
          return;
        }

        this.$router.push({
          path: `/user/page/${this.article.mem_id}`,
          query: { type: "u" },
        });
      }
    },
    async checkFouce(type) {
      // if (type == 1) {
      //   this.$dialog
      //     .confirm({
      //       title: "提示",
      //       message: "是否取消关注",
      //     })
      //     .then(async () => {
      //       const query = {
      //         id: this.article.mem_id,
      //         state: 1,
      //       };
      //       const res = await focus(query);
      //       if (res.code === 100) {
      //         this.$toast.success("取消关注");
      //         this.$emit("changeFocus", { type: type, id: this.article.gid });
      //       } else {
      //         this.$toast.fail("取消失败");
      //       }
      //     })
      //     .catch(() => {});
      // } else if (type === 4) {
      //   const query = {
      //     id: this.article.mem_id,
      //     state: 0,
      //   };
      //   const res = await focus(query);

      //   if (res.code === 100) {
      //     this.$toast.success("关注成功");
      //     this.$emit("changeFocus", { type: type, id: this.article.gid });
      //   } else {
      //     this.$toast.fail("关注失败");
      //   }
      // }

      if (type === 4) {
        const query = {
          id: this.article.mem_id,
          state: 0,
        };
        const res = await focus(query);

        if (res.code === 100) {
          this.$toast.success("关注成功");
          this.$emit("changeFocus", { type: type, id: this.article.gid });
        }
      } else {
        this.userHandle();
      }
    },
    like() {
      // 点赞， 如果点赞失败则请求取消点赞
      memberLike(this.article.gid, 1, 1).then((res) => {
        if (res.code == 100) {
          this.$toast.success(res.msg);
          this.status.isLike = "color:#d81e06";
          this.article.graphic_like = parseInt(this.article.graphic_like) + 1;
        } else {
          memberLike(this.article.gid, 1, 0)
            .then((res) => {
              if (res.code == 100) {
                this.$toast.success(res.msg);
                this.article.graphic_like =
                  parseInt(this.article.graphic_like) - 1;
                this.status.isLike = "";
              }
            })
            .catch(() => {
              this.$toast.fail("点赞操作失败");
            });
        }
      });
    },

    onChange(index) {
      this.index = index;
    },
    operation(type, res) {
      this.$emit("deleteIndex", res.gid);
      if (type == 0) {
        articleDel(res.gid).then((data) => {
          if (data.code == 100) {
            this.$emit("deleteIndex", res.gid);
            Toast("删除成功");
          }
        });
      } else {
        // 编辑
      }
    },
    goDetail(id) {
      // if (id != this.$route.params.id && this.$route.params.id != undefined) {
      //   this.$router.push(`/article/detail/${id}`);

      //   setTimeout(()=>{
      //     this.$router.go(0)
      //   },200)

      // }else{
      this.$router.push(`/article/detail/${id}`);
      // }
    },
  },
};
</script>

<style scoped lang="less">
.article-item {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  overflow: auto;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  .item-info {
    display: flex;
    align-items: center;
    .avator {
      width: 30px;
      // border-radius: 100%;
      // overflow: hidden;
      margin-right: 6px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    /deep/ .van-image {
      width: 30px;
      height: 30px;
      background: #fff;
    }
    .name {
      flex: 1;
      p {
        font-size: 14px;
        color: #3a3a3a;
        padding-bottom: 4px;
      }
      .icon {
        padding: 1px 2px;
        height: 15px;
        border-radius: 2px;
        background: #f3a683;
        font-size: 11px;
        color: #e93c3b;
      }
    }
    .buttons {
      font-size: 14px;
      color: #d04443;
    }
  }
  .graphic-item {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin-top: 5px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      object-fit: cover;
    }
  }
  .item-title {
    padding: 10px 0;
    font-size: 16px;
    color: #232323;
    .title-icon {
      width: 66px;
      height: 22px;
      float: left;
      padding-right: 5px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 83%;
        object-fit: cover;
      }
    }
  }
  .item-img {
    .imgs {
      position: relative;
    }
    .w1 {
      width: 100%;
      height: 150px;
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .w2 {
      display: flex;
      justify-content: space-between;
      img {
        border-radius: 3px;
        width: 49.5%;
        height: 100px;
        object-fit: cover;
      }
    }
    .w3 {
      display: flex;
      justify-content: space-between;
      img {
        border-radius: 3px;
        width: 32%;
        height: 83px;
        object-fit: cover;
      }
    }
    .ws {
      display: flex;
      justify-content: space-between;
      img {
        border-radius: 3px;
        width: 32%;
        height: 83px;
        object-fit: cover;
      }
    }
    .wsPlus {
      position: absolute;
      width: 32%;
      height: 83px;
      background: rgba(0, 0, 0, 0.3);
      line-height: 83px;
      font-size: 26px;
      text-align: center;
      z-index: 15;
      bottom: 0px;
      right: 0px;
      color: #fff;
      border-radius: 3px;
      padding-right: 10px;
    }
  }
  .item-handle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    .handle-item {
      width: 33%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 3px;
        img {
          width: 18px;
          height: 18px;
          object-fit: cover;
        }
      }
      .num {
        font-size: 15px;
        color: #3a3a3a;
      }
    }
  }
  .item-editDel {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    .editDelTime {
      width: 50%;
      height: 35px;
      line-height: 35px;
      font-size: 11px;
      color: #737373;
    }
    .editDelBtn {
      width: 50%;
      .buttonss {
        height: 35px;
        line-height: 35px;
        overflow: auto;
        font-size: 25px;
        font-weight: 700;
        color: #bfbfbf;
        float: right;
      }
      .more-handle {
        float: right;
        margin-right: 10px;
        background: #fff;
        border-left: 1px solid #bfbfbf;
        color: #3a3a3a;
        transition: all 0.3s;
        overflow: auto;
        span {
          float: left;
          height: 34px;
          line-height: 34px;
          width: 60px;
          text-align: center;
          color: #fff;
          // background: #E8E8E8;
          background: red;
        }
        span:nth-child(2) {
          background: red;
          margin-left: 2px;
        }
      }
      .more-handle-no {
        transition: all 0.3s;
        overflow: hidden;
        width: 0;
      }
    }
  }
  .allArt {
    color: rgba(4, 0, 255, 0.925);
    padding-left: 5px;
  }
}
</style>
