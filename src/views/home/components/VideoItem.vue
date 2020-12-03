<template>
  <div class="video-item">
    <div class="item-info">
      <div class="avator" @click.stop="userHandle">
        <van-image :src="videoItemVal.mem_head_portrait" round>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="name" @click.stop="userHandle">
        <p>
            {{ videoItemVal.mem_name }}
            <van-icon name="http://api.lejiagx.cn/static/icon/官方授权.png" 
                size="15px" 
                v-if="videoItemVal.mem_id == 1" 
                style="margin-right:5px;" />
            <van-tag plain color="#f3a683" v-if="videoItemVal.mmt_id == 3 && videoItemVal.mem_id != 1">{{
              videoItemVal.ent_district || videoItemVal.mmt_type_name
            }}</van-tag>
          </p>
      </div>
      <!-- <div
        class="buttons"
        v-if="user.id !== videoItemVal.memid"
        @click="checkFouce(videoItemVal.AattState)"
      >
        {{ videoItemVal.AattName }}
      </div> -->
      <div
        style="margin-left: 10px"
        v-if="videoItemVal.mmt_id == 3"
        @click="userHandle"
      >
        <van-button color="#D04443" size="mini">进店</van-button>
      </div>
    </div>

    <!--视频分类下视频信息区域-->
    <div @click="goDetail(videoItemVal)">
      <div class="title">
        <span
          >{{ videoItemVal.graphic_name | strSub(70) | emoji_decode }}
          <span class="allArt" v-if="videoItemVal.graphic_name.length > 70"
            >全文</span
          >
        </span>
      </div>
      <div class="item-playerimg">
        <van-image
          width="100%"
          height="auto"
          fit="contain"
          radius="3px"
          lazy-load
          :src="videoItem.graphic_surface_plot"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="imgPlayer" @click="goDetail(videoItemVal)">
          <img
            src="http://apis.lejiagx.cn/static/img/video_player5.png"
            style="object-fit: cover; width: 70px"
          />
        </div>
      </div>
    </div>

    <div class="user">
      <div class="user-handle">
        <div class="handle-item" @click="showForward(videoItemVal)">
          <span class="icon">
            <img src="../img/fx.png" alt="" />
          </span>
          <span style="margin-left: 2px; margin: 4px">分享</span>
          <span class="num">{{ videoItemVal.graphic_forward }}</span>
        </div>
        <div class="handle-item" @click="onComm">
          <span class="icon">
            <img src="../img/pl.png" alt="" />
          </span>
          <span style="margin-left: 2px; margin: 4px">评论</span>
          <span class="num">{{ videoItemVal.graphic_comment }}</span>
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
          <span style="margin-left: 2px; margin: 4px" :style="status.isLike"
            >点赞</span
          >
          <span class="num" :style="status.isLike">{{
            videoItemVal.graphic_like
          }}</span>
        </div>
      </div>
    </div>
    <div class="item-editDel" v-if="isUser">
      <div class="editDelTime">
        发布于：{{ videoItemVal.graphic_addtime | relTime }}
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
          <!-- <span v-if="visible" @click="operation(1,videoItemVal)">编辑</span> -->
          <span v-if="visible" @click="operation(0, videoItemVal)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  changeFouce as focus,
  forwardvideoItems,
  memberLike,
  articleDel,
} from "../actions";
import { Toast, Icon } from "vant";
import { mapMutations, mapState } from "vuex";
import animate from "animate.css";
export default {
  name: "video-item",
  props: {
    index: {
      type: Number,
      required: true,
    },
    videoItem: Object,
    title: String,
  },
  data() {
    return {
      videoItemVal: "",
      isUser: false,
      visible: false,
      status: {
        //点赞等状态
        // isLike: 'color:#d81e06'
        isLike: "",
      },
      functionState: false, //是否显示功能区域(转发/点赞)
      timer: {},
      videoTime: "", //视频时长
    };
  },
  created() {
    // console.log(this.videoItem)
    this.initVideo();
    if (this.user.id == this.videoItem.mem_id) {
      this.isUser = true;
    }
  },

  computed: {
    ...mapState(["user"]),
  },
  methods: {
    //处理视频时间
    secondsFormat() {
      let video = document.getElementById("video_null");
      let sec = parseInt(video.duration);

      let hour = Math.floor(sec / 3600);
      let minute = Math.floor((sec - hour * 3600) / 60);
      let second = sec - hour * 3600 - minute * 60;
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      if (hour > 0) {
        this.videoTime = hour + ":" + minute + ":" + second;
      } else {
        this.videoTime = minute + ":" + second;
      }
    },
    //显示功能区
    changeFunctionState() {
      clearTimeout(this.timer);
      this.functionState = !this.functionState;
      if (this.functionState === true) {
        this.timer = setTimeout(() => {
          this.functionState = false;
        }, 3000);
      }
    },
    //判断是否点过赞
    //  isLike() {
    //     memberLike(this.videoItem.gid, 1, 1)
    //     .then((res) => {

    //         if( res.code == 100 ) {
    //             this.status.isLike = '';
    //             memberLike(this.videoItem.gid, 1, 0)
    //         } else if(res.code == 101) {
    //             this.status.isLike = 'color:#d81e06';
    //         }

    //     })
    // },
    playerVideo(val) {
      this.$emit("playerVideo", { ...val });
    },
    //视频只允许同时播放一个视频
    ...mapMutations(["setMerchant"]),
    showForward(article) {
      this.$emit("showForward", {
        type: "video",
        ...article,
        index: this.index,
      });
    },
    showForwardOper(oper) {
      if (oper == 0) {
        if (parseInt(this.videoItemVal.graphic_forward) - 1 >= 0) {
          this.videoItemVal.graphic_forward =
            parseInt(this.videoItemVal.graphic_forward) - 1;
        }
      } else if (oper == 1) {
        this.videoItemVal.graphic_forward =
          parseInt(this.videoItemVal.graphic_forward) + 1;
      }
    },
    onComm() {
      this.$router.push({
        path: `/article/detail/${this.videoItem.gid}`,
        query: { type: "pl" },
      });
    },
    initVideo() {
      this.videoItemVal = this.videoItem;
    },
    userHandle() {
      if (this.videoItem.mmt_id === 3) {
        if (this.$route.path == "/merchants/produce") {
          Toast("您已经在店铺内了");
          return;
        }

        this.setMerchant(this.$route.path);

        var obj = {
          entid: this.videoItem.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });

        // this.$router.push({
        //   path: '/merchants/home/',
        //   query: {id: this.videoItem.rel_id}
        // })
      } else {
        if (this.$route.path == `/user/page/${this.videoItem.mem_id}`) {
          Toast("您已经在自己的主页了");
          return;
        }

        this.$router.push({
          path: `/user/page/${this.videoItem.mem_id}`,
          query: { type: "u" },
        });
      }
    },
    async checkFouce(type) {
      if (type == 1) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否取消关注",
          })
          .then(async () => {
            const query = {
              id: this.videoItem.mem_id,
              state: 1,
            };
            const res = await focus(query);
            if (res.code === 100) {
              this.$toast.success("取消关注");
              this.$emit("changeFocus", { type: type, id: this.videoItem.gid });
            } else {
              this.$toast.fail("操作失败");
            }
          })
          .catch(() => {});
      } else if (type === 3 || type === 4) {
        const query = {
          id: this.videoItem.mem_id,
          state: 0,
        };
        const res = await focus(query);
        if (res.code === 100) {
          this.$toast.success("关注成功");
          this.$emit("changeFocus", { type: type, id: this.videoItem.gid });
        } else {
          this.$toast.fail("关注失败");
        }
      }
    },
    forward() {
      forwardvideoItems(this.videoItem.gid, 1).then((res) => {
        if (res.code == 100) {
          this.$toast.success(res.msg);
          this.videoItem.graphic_forward =
            parseInt(this.videoItem.graphic_forward) + 1;
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    like() {
      // 点赞， 如果点赞失败则请求取消点赞
      memberLike(this.videoItem.gid, 1, 1).then((res) => {
        if (res.code == 100) {
          this.$toast.success(res.msg);
          this.videoItem.graphic_like =
            parseInt(this.videoItem.graphic_like) + 1;
          this.status.isLike = "color:#d81e06";
        } else {
          memberLike(this.videoItem.gid, 1, 0)
            .then((res) => {
              if (res.code == 100) {
                this.$toast.success(res.msg);
                this.videoItem.graphic_like =
                  parseInt(this.videoItem.graphic_like) - 1;

                this.status.isLike = "";
              } else {
                this.$toast.fail(res.msg);
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
    goDetail(val) {

      if(val.graphic_height >= 800){

        this.$router.push(`/article/full_screen_play/${val.gid}`);
      }else{
        
        this.$router.push(`/article/detail/${val.gid}`);
      }
    },
  },
};
</script>

<style scoped lang="less">
.video-item {
  width: 100%;
  border-bottom: 1px solid #eee;
  margin: 0px 0;
  padding-bottom: 5px;
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0px;
    .avator {
      width: 34px;
      margin-right: 6px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    /deep/ .van-image {
      width: 34px;
      height: 34px;
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
  .title {
    width: 100%;
    font-size: 0.42667rem;
    margin: 10px 0 5px 0;
  }
  .user {
    align-items: center;
    margin: 0px 0;
    .user-handle {
      width: 100%;
      display: flex;
      justify-content: space-around;
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
            width: 100%;
            height: 100%;
          }
        }
        .num {
          font-size: 15px;
        }
      }
    }
  }
  .video-area {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    font-family: Arial, Helvetica, sans-serif;
    .top {
      display: flex;
      margin: 5px 0;
      justify-content: space-between;
      h4 {
        font-size: 16px;
        flex: 1;
        letter-spacing: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        height: 50px;
      }
      .picture {
        position: relative;
        width: 160px;
        height: 90px;
        margin-left: 10px;
        .van-image {
          height: 100%;
          height: 100%;
          border-radius: 5px !important;
          img {
            height: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .video-icon {
          position: absolute;
          display: flex;
          align-items: center;
          bottom: 10px;
          right: 10px;
          img {
            width: 15px;
            height: 15px;
          }
          span {
            padding-left: 5px;
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
    .bottom {
      display: flex;
      position: relative;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0px;
      .message {
        flex: 1;
        transition: all 0.8s linear 0.5s;
        span {
          color: #737373;
          margin-right: 12px;
          font-size: 12px;
        }
      }
      //...视频功能区样式
      .function {
        display: flex;
        position: relative;
        align-items: center;
        // overflow: hidden;
        .van-icon-ellipsis::before {
          /* content: "\F04E"; */
          font-size: 25px;
          color: #000;
        }
        .function-item-all {
          position: absolute;
          opacity: 0;
          right: 360px;
          width: 300px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 36px;
          border-radius: 2px;
          // background-color: #ccc;
          // border: 1px solid #ccc;
          background-color: #fff;
          transition: all 0.5s linear;
          div {
            height: 100%;
            display: flex;
            align-items: center;
          }
          img {
            width: 18px;
            height: 18px;
            transform: translateY(2px);
          }
        }
      }
    }
  }
  .item-playerimg {
    position: relative;
    .van-image {
      max-height: 200px;
    }
    img {
      max-height: 200px;
    }
    .imgPlayer {
      width: 100%;
      text-align: center;
      display: block;
      position: absolute;
      top: 62.25px;
      left: 0px;
      z-index: 2;
    }
  }
  .van-image {
    background: rgba(0, 0, 0, 1);
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
}
.allArt {
  color: rgba(4, 0, 255, 0.925);
  padding-left: 5px;
}
</style>
