<template>
  <div class="life-home-page">
    <page-header :isAddShow="false"></page-header>
    <transition name="van-fade">
      <div class="go-top" v-show="btnShow" @click="goTop">
        <van-icon name="arrow-up" />
      </div>
    </transition>
    <van-tabs
      swipeable
      duration="0.5"
      line-height="0"
      line-width="0"
      :ellipsis="false"
      :lazy-render="true"
      title-inactive-color="#202020"
      title-active-color="#07C160"
      :border="false"
      v-model="activeIndex"
      @change="changeChannel"
    >
      <van-tab
        v-for="(item, index) in navList"
        :key="index"
        :title="item.ent_class_name"
      >
        <div
          ref="scroll-wrapper"
          class="scroll-wrapper"
          @scroll="remember($event)"
        >
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="scroll">
                <div
                  class="item"
                  v-for="(val, inx) in pageData"
                  :key="inx"
                  @click="userHandle(val.entid)"
                >
                  <div class="img">
                    <van-image
                      :src="val.ent_logo"
                      v-if="val.ent_name"
                      width="55"
                      height="55"
                      lazy-load
                      fit="contain"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </div>
                  <div class="center">
                    <div class="title">
                      <div class="name">
                        {{ val.ent_name }}
                        <!-- <span v-if="inx == 0">
                          <img src="./images/no1.png" alt="">
                        </span>
                        <span v-if="inx == 1">
                          <img src="./images/no2.png" alt="">
                        </span>
                        <span v-if="inx == 2">
                          <img src="./images/no3.png" alt="">
                        </span> -->
                      </div>
                      <div class="msg">
                        <span v-if="val.ent_detailed_site != '无'"
                          >{{ val.ent_detailed_site }}
                        </span>
                        <span v-if="val.ent_introduction != '无'"
                          >| {{ val.ent_introduction }}</span
                        >
                      </div>
                      <div class="star">
                        <div class="star-rate">
                          <van-rate
                            v-model="val.ent_grade"
                            :size="18"
                            color="#ffd21e"
                            void-icon="star"
                            void-color="#eee"
                            readonly
                          />
                        </div>
                        <!-- <div
                          v-for="(val,index) in 5"
                          :key="index"
                          :class="index < parseInt(val.ent_grade)? 'huang': 'hui'"
                        >
                          <img src="./images/星(1).png" alt />
                        </div> -->
                        <div class="score">{{ val.ent_grade }}.0</div>
                      </div>
                    </div>
                    <!-- <div class="act" v-if="inx%2 == 0">
                      <div class="tuan">
                        <span>团</span>2人套餐200元
                      </div>
                      <div class="tuan">
                        <span>券</span>满100-20元
                      </div>
                    </div> -->
                  </div>
                  <div class="right">
                    <div>进店</div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { phoneList } from "./actions/index";
import { mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  name: "lift-index",
  components: {
    PageHeader,
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
      navList: [],
      isLoading: false,
      loading: false,
      finished: false,
      query: {
        num: 1,
        size: 10,
      },
      page: 1,
      pageData: [],
      activeIndex: 0,
      searchHistory: "服务 行业信息 装修",
      prvUrl: "",
      activeChannel: {
        index: 0,
        scrollTop: "",
      },
      btnShow: false,
    };
  },
  // 组件开启缓存生效，激活组件(初始化和激活都执行)
  activated() {
    // 驼峰获取dom无效问题
    if (this.$refs["scroll-wrapper"]) {
      const dom = this.$refs["scroll-wrapper"][this.activeIndex];
      dom.scrollTop = this.activeChannel.scrollTop;
      this.activeIndex = this.activeChannel.index;
    }
  },
  watch: {},
  created() {
    this.get();
  },
  computed: {
    activeList() {
      return this.navList[this.activeIndex];
    },
  },
  methods: {
    ...mapMutations(["setMerchant"]),
    // 去企业首页
    userHandle(id) {
      var obj = {
        entid: id,
        entfid: 0,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/merchants/produce",
        query: { res: res },
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.finished = false;
        this.query.num = 0;
        this.get();
      }, 3000);
    },
    onLoad() {
      this.query.num++;
      this.get();
      // 加载状态结束
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    // 获取企业列表
    async get() {
      const res = await phoneList(this.query);

      setTimeout(function () {
        Toast.clear();
      }, 200);

      const data = res.data;

      this.prvUrl = res.data.prvUrl;
      this.navList = data.phone_job;

      this.query.num > 1
        ? this.pageData.push(...data.phone_number)
        : (this.pageData = data.phone_number);

      //去掉列表重复项
      let deWeight = () => {
        let map = new Map();
        for (let item of this.pageData) {
          if (!map.has(item.entid)) {
            map.set(item.entid, item);
          }
        }
        return [...map.values()];
      };
      this.pageData = deWeight();

      if (data.phone_number.length == 0) {
        this.finished = true;
      }
    },
    changeChannel(val) {
      this.query.num = 0;
      this.query.pjid = this.activeIndex + 1;
      this.activeChannel.index = this.activeIndex;
      this.get();
      // if (val != this.activeChannel.index) {

      //   this.query = {
      //     num: 1,
      //     size: 10,
      //     pjid: this.activeIndex + 1
      //   }

      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   this.finished = true

      //   this.activeChannel.index = this.activeIndex
      //   this.get()

      // }else{
      //   // 下一帧：延时一会执行，定位到以往阅读位置
      //   this.$nextTick(() => {
      //     const dom = this.$refs['scroll-wrapper'][this.activeIndex]
      //     dom.scrollTop = this.activeChannel.scrollTop
      //   })
      // }
    },
    // 监听滚动事件
    remember(e) {
      this.activeChannel.scrollTop = e.target.scrollTop;
      if (e.target.scrollTop <= 150) {
        this.btnShow = false;
      }
      if (e.target.scrollTop >= 400) {
        this.btnShow = true;
      }
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
  },
  mounted() {},
};
</script>

<style scoped lang='less'>
.life-home-page {
  margin-top: 44px;
  height: calc(100vh);
  padding: 0 5px;
  .go-top {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: #fff;
    box-shadow: 0 0 2px #eee;
    right: 17px;
    bottom: 70px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    -moz-box-shadow: 0px 0px 3px #333333;
    -webkit-box-shadow: 0px 0px 3px #333333;
    box-shadow: 0px 0px 3px #333333;
  }
  .van-tabs {
    height: calc(100vh - 92px);
    display: flex;
    flex-direction: column;
    background: #fff;
    position: relative;
    /deep/ .van-tab--active {
      font-size: 17px;
      font-weight: 550;
    }
    /deep/ .van-tabs__line {
      display: none;
    }
    /deep/ .van-tabs__wrap {
      height: 35px;
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
  .item {
    padding: 0px 10px 10px 10px;
    margin-top: 20px;
    display: flex;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    .img {
      height: 55px;
      width: 55px;
      margin-right: 10px;
      .van-image {
        img {
          border-radius: 2px;
        }
      }
    }
    .center {
      flex: 1;
      .title {
        display: flex;
        flex-direction: column;
        min-height: 55px;
        justify-content: space-between;
      }
      .name {
        font-size: 15px;
        min-height: 15px;
        line-height: 100%;
        font-family: Source Han Sans CN;
        font-weight: 700;
        color: rgba(33, 33, 33, 1);
        span {
          display: inline-block;
          width: 38px;
          height: 15px;
          padding: 0;
          text-align: center;
          img {
            height: 100%;
            width: 100%;
            vertical-align: -2px;
          }
        }
      }
      .msg {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 21px;
        color: rgba(61, 61, 61, 1);
        opacity: 1;
        margin-top: 5px;
        span {
          margin: 0px;
        }
      }
      .star {
        display: flex;
        align-items: flex-end;
        .star-rate {
          width: 110px;
        }
        .score {
          width: 20px;
          height: 25px;
          display: flex;
          align-items: flex-end;
          font-size: 15px;
          font-family: Avenir;
          font-weight: 500;
          color: rgba(250, 191, 80, 1);
          opacity: 1;
        }
      }
      .act {
        margin-top: 20px;
        .tuan {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 21px;
          color: rgba(90, 90, 90, 1);
          opacity: 1;
          span {
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background: linear-gradient(
              90deg,
              rgba(255, 108, 80, 1) 0%,
              rgba(245, 23, 36, 1) 100%
            );
            opacity: 1;
            border-radius: 2px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 15px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .right {
      width: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      div {
        width: 45px;
        height: 30px;
        border: 1px solid rgb(51, 160, 233);
        opacity: 1;
        border-radius: 2px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 30px;
        text-align: center;
        color: rgb(51, 160, 233);
      }
    }
  }
}
</style>
