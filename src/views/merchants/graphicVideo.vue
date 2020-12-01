<template>
  <div class="user-page">
    <div class="user-article">
      <template v-if="userInner.videoList.length">
        <div
          class="article-list"
          v-for="(item, index) in userInner.videoList"
          :key="index"
        >
        
          <template v-if="item.gc_id === 2">
            <video-item
              :videoItem="item"
              @changeFocus="changeFocus"
              ref="videoItem"
              @playerVideo="playerVideo(item)"
              @showForward="showForward"
              @deleteIndex="del"
              :index="index"
              :key="index"
            />
          </template>
        </div>
      </template>
      <template v-else>
        <van-empty class="empty" description="您还未发布任何内容" />
      </template>
    </div>
  </div>
</template>

<script>
import VideoItem from "@/views/home/components/VideoItem";
import { userInfo, userIndex, forwardArticles } from "@/views/user/actions";
import { uploadImg } from "@/api";
import { wxJSSDK } from "@/utils/wxshare.js";
import { mapState, mapMutations } from "vuex";
import { Grid, GridItem, Toast } from "vant";
export default {
  name: "user-profile",
  components: {
    VideoItem
  },
  props: {
    graphic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userInner: {
        videoList: [],
      },
      showHandle: undefined,
      forwardMark: false,
    };
  },
  created() {
    this.initShowHandle();
    this.userIndex();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["upUser"]),
    // 判断是否自己的主页
    initShowHandle() {
      if (this.$route.query.type) {
        if (this.user.id == this.graphic.memid) {
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
      const id = this.graphic.memid;
      let res;
      if (id) {
        res = await userIndex(id);
      } else {
        res = await userIndex();
      }

      const userList = res.data.graphic;
      userList.map((item) => {
        if (item.gc_id === 2) {
          this.userInner.videoList.push(item);
        }
      });
      this.userInner.userList = userList;
    },
    tabsChange(index) {
      this.actived = index;
    },
    userHandle(type) {
      if (type) {
        if (this.showHandle) this.$router.push(`/user/${type}`);
      }
    },
    // 显示分享
    showForward(article) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        forwardArticles(article.gid, 1).then((res) => {

          if (res.code == 100) {
            
            this.$emit("showForward", {
              type: 1,
            });
            if (article.type === "article") {
              var imgUrl = "http://api.lejiagx.cn/static/icon/lejia_logo.png";

              if (article.graphic_thumbnail.length > 0) {
                imgUrl = article.graphic_thumbnail[0].graphic_thumbnail_path;
              }

              var form = {
                title: article.graphic_name,
                link:
                  'http://' + window.location.host +`/#/article/detail/${article.gid}?goindex=true&key=` +
                  res.data.mem_urlkey,
                imgUrl: imgUrl,
                desc:
                  article.graphic_intro || "来自" + article.mem_name + "的分享",
              };
            } else {
              var form = {
                title: article.graphic_name,
                link:
                  'http://' + window.location.host +`/#/article/detail/${article.gid}?goindex=true&key=` +
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
              this.$emit("showForward", {
                type: 0,
              });
              this.$toast("分享成功");
              // if (article.type === 'article') {

              //   this.$refs.articleItem[article.index].showForwardOper()
              // }else{

              //   this.$refs.videoItem[article.index].showForwardOper()
              // }
            }, 4000);
          } else {
            this.$emit("showForward", {
              type: 0,
            });
            this.$toast(res.msg);
          }
        });
      } else {
        this.$toast("请在微信中分享");
      }
    },
    del(index) {
      this.userInner.userList.splice(index, 1);
    },
    // 修改头像
    async afterReadImg(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      const res = await uploadImg(data);
      if (res.code === 100) {
        // 修改头像
        var obj = {
          type: 2,
          val: res.data.src,
        };

        userEdit(obj).then((val) => {
          if (val.code === 100) {
            var obj = {
              key: "avator",
              val: res.data.src,
            };
            this.upUser(obj);

            Toast.success("修改成功");
          } else {
            Toast.error("修改失败");
          }
        });
      } else {
        this.$toast.error("图片上传失败");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.user-page {
  display: flex;
  flex-direction: column;
  //   padding-top: 50px;
  min-height: 100%;
  background: #eee;
  .user-info {
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .info-img {
      width: 78px;
      height: 78px;
      position: relative;
      img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
      }
      .icon {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 100%;
        img {
          width: 80%;
          height: 80%;
        }
      }
    }
    .info {
      margin-top: 10px;
      color: #313131;
      text-align: center;
      .info-name {
        font-size: 19px;
        padding-bottom: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 5px;
          width: 14px;
          height: 14px;
        }
      }
      .info-introduce {
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 5px;
          width: 9px;
          height: 9px;
        }
      }
    }
  }
  .user-article {
    flex: 1;
    // border-radius: 21px 21px 0 0;
    box-sizing: border-box;
    padding: 20px 15px;
    background: #fff;
    .article-num {
      display: flex;
      justify-content: space-around;
      .num-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 15px;
          color: #808080;
          padding-bottom: 5px;
        }
        .num {
          font-size: 19px;
          color: #2e2e2e;
          font-weight: 500;
        }
      }
    }
    .article-tabs {
      padding: 10px 0;
      display: flex;
      justify-content: space-around;
      .tabs-item {
        padding: 7px 14px;
        border-radius: 18px;
        background: #e8e8e8;
        font-size: 12px;
        color: #646464;
      }
      .tabs-item-active {
        background: #d04443;
        color: #ffffff;
      }
    }
  }
  /deep/ .van-uploader__preview-image {
    border-radius: 100%;
  }
}
.article-list {
  margin-bottom: 10px;
}
</style>
