<template>
  <div class="user-page">
    <page-title></page-title>
    <div class="user-info">
      <div class="info-img">
        <!-- <van-image
          round
          lazy-load
          @click="userHeadEdit"
          :src="userInner.userInfo.mem_head_portrait">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image> -->
        <van-uploader
          v-model="coverList"
          :after-read="afterReadImg"
          multiple
          lazy-load
          :max-count="1"
          :deletable="showHandle"
        />
        <!-- <span class="icon">
          <img src="../../assets/icons/zs.png" alt="">
        </span> -->
      </div>

      <div class="info">
        <div class="info-name" @click="goUserIntro(1)">
          <span>{{ userInner.userInfo.mem_name }}</span>
          <img v-if="showHandle" src="../../assets/icons/edit.png" alt="" />
        </div>
        <div class="info-introduce" @click="goUserIntro(2)">
          <span>{{ userInner.userInfo.mem_intros }}</span>
          <img v-if="showHandle" src="../../assets/icons/edit.png" alt="" />
        </div>
      </div>
    </div>
    <div class="user-article">
      <div class="article-num">
        <div class="num-item" @click="userHandle('concern')">
          <span class="text">关注</span>
          <span class="num">{{
            userInner.userInfo.my_attention_num || 0
          }}</span>
        </div>
        <div class="num-item" @click="userHandle('fans')">
          <span class="text">粉丝</span>
          <span class="num">{{
            userInner.userInfo.attention_my_num || 0
          }}</span>
        </div>
        <div class="num-item">
          <span class="text">内容</span>
          <span class="num">{{ userInner.userInfo.graphic_num || 0 }}</span>
        </div>
        <div class="num-item">
          <span class="text">获赞</span>
          <span class="num">{{ userInner.userInfo.like_num || 0 }}</span>
        </div>
      </div>

      <div class="article-tabs">
        <div
          class="tabs-item"
          v-for="(item, index) in tabbarList"
          :key="index"
          :class="{ 'tabs-item-active': index === actived }"
          @click="tabsChange(index)"
        >
          {{ item.name }}
        </div>
      </div>

      <template v-if="actived === 0">
        <template v-if="userInner.userList.length">
          <div
            class="article-list"
            v-for="(item, index) in userInner.userList"
            :key="index"
          >
            <template v-if="item.gc_id === 1">
              <article-item
                :isUser="showHandle"
                :article="item"
                @showForward="showForward"
                @deleteIndex="del"
                :index="index"
                :key="index"
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
                :key="index"
              />
            </template>

            <template v-else-if="item.gc_id === 3">
              <rent-item
                v-if="item.gc_id === 3"
                :rentItem="item"
                @deleteIndex="del"
                :index="index"
                :key="index"
              />
            </template>

            <template v-else-if="item.gc_id === 4">
              <job-item
                v-if="item.gc_id === 4"
                :jobItem="item"
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
      </template>

      <template v-else-if="actived === 1">
        <template v-if="userInner.articleList.length">
          <div
            class="article-list"
            v-for="(item, index) in userInner.articleList"
            :key="index"
          >
            <article-item
              :article="item"
              :isUser="showHandle"
              @showForward="showForward"
              @deleteIndex="del"
              :index="index"
              :key="gid"
            />
          </div>
        </template>
        <template v-else>
          <van-empty class="empty" description="这里什么都没有" />
        </template>
      </template>

      <template v-else-if="actived === 2">
        <template v-if="userInner.videoList.length">
          <div
            class="article-list"
            v-for="(item, index) in userInner.videoList"
            :key="index"
          >
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
          </div>
        </template>
        <template v-else>
          <van-empty class="empty" description="这里什么都没有" />
        </template>
      </template>

      <template v-else-if="actived === 3">
        <template v-if="userInner.otherList.length">
          <div
            class="article-list"
            v-for="(item, index) in userInner.otherList"
            :key="index"
          >
            <rent-item
              v-if="item.gc_id === 3"
              :rentItem="item"
              @deleteIndex="del"
              :index="index"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <van-empty class="empty" description="这里什么都没有" />
        </template>
      </template>
      <template v-else>
        <van-empty class="empty" description="这里什么都没有" />
      </template>
    </div>

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
import PageTitle from "@/components/PageTitle";
import ArticleItem from "@/views/home/components/ArticleItem";
import RentItem from "@/views/home/components/RentItem";
import AdvItem from "@/views/home/components/AdvItem";
import JobItem from "@/views/home/components/JobItem";
import VideoItem from "@/views/home/components/VideoItem";
import { userInfo, userIndex, forwardArticles, userEdit } from "./actions";
import { uploadImg } from "@/api";
import { wxJSSDK } from "@/utils/wxshare.js";
import { mapState, mapMutations } from "vuex";
import { Grid, GridItem, Toast } from "vant";
export default {
  name: "user-profile",
  components: {
    PageTitle,
    ArticleItem,
    RentItem,
    AdvItem,
    JobItem,
    VideoItem,
  },
  data() {
    return {
      actived: 0,
      tabbarList: [
        { id: 0, name: "全部" },
        { id: 1, name: "文章" },
        { id: 2, name: "视频" },
        { id: 3, name: "中介信息" },
        // { id: 4, name: '开通服务' }
      ],
      userInner: {
        userInfo: {},
        userList: [],
        articleList: [],
        videoList: [],
        otherList: [],
      },
      showHandle: undefined,
      forwardMark: false,
      coverList: [],
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
        if (this.user.id == this.$route.params.id) {
          this.showHandle = true;
        } else {
          this.showHandle = false;
        }
      } else {
        this.showHandle = true;
      }
    },
    // 编辑个人介绍
    goUserIntro(type) {
      if (this.showHandle) {
        if (type == 2) {
          console.log("aaa")
          this.$router.push({
            path: "/user/introduce",
            query: {
              data: this.userInner.userInfo.mem_intros
            }
          });
        } else {
          var obj = {
            memid: 1,
            mem_name: this.userInner.userInfo.mem_name,
          };

          var res = this.$Utils.demoRequest(JSON.stringify(obj));

          this.$router.push({
            path: "/user/nameedit",
            query: { res: res },
          });
        }
      }
    },
    // 获取用户发布信息
    async userIndex() {
      const id = this.$route.params.id;
      let res;
      if (id) {
        res = await userIndex(id);
      } else {
        res = await userIndex();
      }

      const userInfo = res.data.user;

      this.coverList[0] = {
        url: userInfo.mem_head_portrait,
        isImage: true,
      };

      const userList = res.data.graphic;
      userList.map((item) => {
        if (item.gc_id === 1) {
          this.userInner.articleList.push(item);
        } else if (item.gc_id === 2) {
          this.userInner.videoList.push(item);
        } else if (item.gc_id === 3) {
          this.userInner.otherList.push(item);
        }
      });
      this.userInner.userInfo = userInfo;
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
                  "http://" +
                  window.location.host +
                  `/#/article/detail/${article.gid}?goindex=true&key=` +
                  res.data.mem_urlkey,
                imgUrl: imgUrl,
                desc:
                  article.graphic_intro || "来自" + article.mem_name + "的分享",
              };
            } else {
              var form = {
                title: article.graphic_name,
                link:
                  "http://" +
                  window.location.host +
                  `/#/article/detail/${article.gid}?goindex=true&key=` +
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
  padding-top: 50px;
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
    border-radius: 21px 21px 0 0;
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
.forward {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20000;
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
