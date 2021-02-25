<template>
  <div class="agora-all-commdity">
    <page-header ref="pageHeader" :isAddShow="false" />

    <div :class="navBarFixed == true ? 'navBarWrap' : 'body'">
      <div class="bodyClass">
        
        <div v-for="item in items" :key="item.pbcid">
          <div
            class="content-item-all"
            ref="scroll-wrapper"
            @scroll="remember"
          >
            <content-item :cindex="item.pbcid"></content-item>
          </div>
        </div>

      </div>
    </div>
    <transition name="van-fade">
        <div class="go-top" v-show="btnShow" @click="goTop">
            <van-icon name="arrow-up" />
        </div>
    </transition>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { getLejiaProductList } from "./actions/index";
import contentItem from "./component/contentItem";
// import contentItemAll from "./component/contentItemAll";
import { Toast, Empty } from "vant";
Vue.use(Toast);
Vue.use(Empty);
export default {
  data() {
    return {
      local: {},
      //商品类
      active: 0,
      //标签头
      items: [],
      dataList: {
        //需写默认值，否则Vue模板渲染的时候会读取空值报错
        data: [],
      },
      //菜单栏
      iactive: 0,
      //滚轮
      navBarFixed: false,
      //切换
      indexItem: 0,
      isLoading: false,
      scrollTop: "",
      index: 0,
      btnShow: false,
    };
  },
  // 注册组件
  components: {
    PageHeader,
    contentItem,
    // contentItemAll,
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
    this.getLejiaProductListFun();
  },
  // activated() {
  //   try {
  //     if (this.$refs["content-item-all"]) {
  //       const dom = this.$refs["content-item-all"];
  //       dom.scrollTop = this.scrollTop;
  //     }
  //     if (this.$refs["content-item"]) {
  //       const dom1 = this.$refs["content-item"];
  //       dom1[this.index].scrollTop = this.scrollTop;
  //     }
  //   } catch (e) {}
  // },
  methods: {
    handleScroll(e, index) {
      // console.log(e.target.scrollTop)
      this.scrollTop = e.target.scrollTop;
      this.index = index;
    },
    getLejiaProductListFun() {
      let obj = {
        page: 1,
        pagesize: 100,
      };
      getLejiaProductList(obj)
        .then((res) => {
          this.items = res.data.class;
          this.dataList = res.data.list;
          console.log(res);
          if (res) {
            Toast.clear();
          }
        })
        .catch((res) => {
          console.log(res);
          Toast.fail("获取数据失败，请重试");
        });
    },
    // 监听滚动事件
        remember(e) {
            if (e.target.scrollTop <= 150) {
                this.btnShow = false;
            }
            if (e.target.scrollTop >= 400) {
                this.btnShow = true;
            }
        },
        // 回到顶部
        goTop() {
            const dom = this.$refs["scroll-wrapper"][0];
            console.log(dom)
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
};
</script>

<style lang="less">
.agora-all-commdity {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #f6f6f6;
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
  .content-item-all {
    height: calc(100vh - 95px);
    padding-bottom: 20px;
    overflow: scroll;
  }
  .body {
    width: 100%;
    background: #f6f6f6;
    height: calc(100vh - 92px);
    margin: 44px auto;
    transition: all 0.5s ease;
    overflow-y: auto;
  }
  .navBarWrap {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    height: calc(100vh - 65px);
    transition: all 0.5s ease;
    margin: 0px auto;
    overflow-y: auto;
  }
  .bodyClass {
    width: 100%;
    height: 100%;
    margin: 0px auto;
    border-radius: 5px 5px 0px 0px;
    z-index: 500000000;
    background: #f0f0f0;
    .van-tab__pane-wrapper {
      background: #f0f0f0;
      min-height: calc(100vh - 159px);
    }
    .van-tab--active {
      .van-tab__text {
        transition: all 0.5s ease;
        font-size: 18px;
        font-weight: 550;
      }
    }
  }
  .titleicon {
    .mid {
      background-color: #d04443;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      margin-top: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      .jia {
        width: 20px;
        height: 20px;
      }
    }
    .sicon {
      width: 27.8px;
      height: 27.8px;
    }
    .sicon1 {
      width: 22px;
      height: 22px;
    }
  }
  /deep/.van-tabs__wrap {
    height: 35px;
  }
}
</style>
