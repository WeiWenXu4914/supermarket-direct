<template>
  <div class="agora-all-commdity">
    <page-header ref="pageHeader"/>

    <div :class="navBarFixed == true ? 'navBarWrap' : 'body'">
      <div class="bodyClass">
        <van-tabs
          v-model="active"
          :border="true"
          animated
          swipeable
          sticky
          :ellipsis="false"
          :lazy-render="false"
          title-active-color="#07C160"
          title-inactive-color="#202020"
          line-width="0"
        >
          <van-tab title="全部">
            <div v-show="dataList.data.length === 0 ? false : true" class="content-item-all" ref="content-item-all" @scroll="handleScroll($event)">
              <content-item-all :key="new Date()"></content-item-all>
            </div>
            <div v-show="dataList.data.length === 0 ? true : false">
              <van-empty description="无商品信息" />
            </div>
          </van-tab>
          <van-tab
            v-for="(item,index) in items"
            :key="item.pbcid"
            :title="item.pbc_name"
          >
            <div class="content-item-all" ref="content-item" @scroll="handleScroll($event,index)">
              <content-item :cindex="item.pbcid" :key="new Date()"></content-item>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { getLejiaProductList } from "./actions/index";
import contentItem from "./component/contentItem";
import contentItemAll from "./component/contentItemAll";
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
      scrollTop: '',
      index: 0
    };
  },
  // 注册组件
  components: {
    PageHeader,
    contentItem,
    contentItemAll,
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
  activated () {
    try {
      if (this.$refs['content-item-all']) {
        const dom = this.$refs['content-item-all']
        dom.scrollTop = this.scrollTop
      }
      if (this.$refs['content-item']) {
        const dom1 = this.$refs['content-item']
        dom1[this.index].scrollTop = this.scrollTop
      }
    } catch(e) {

    }
  },
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
          console.log(res)
          if (res) {
            Toast.clear()
          }
        })
        .catch((res) => {
          console.log(res);
          Toast.fail("获取数据失败，请重试");
        });
    },
    
  },
};
</script>

<style lang="less">
.agora-all-commdity {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fff;
  .content-item-all {
    height: 700px;
    overflow: scroll;
  }
  .body {
    width: 100%;
    background: #fff;
    height: calc(100vh - 92px);
    margin: 44px auto;
    transition: all 0.5s ease;
    overflow-y: auto;
  }
  .navBarWrap {
    width: 100%;
    height: 100%;
    background: #fff;
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
    background: #fff;
    .van-tab__pane-wrapper {
      background: #F0F0F0;
      min-height: calc(100vh - 159px);
    }
    .van-tab--active {
      .van-tab__text {
        transition: all 0.5s ease;
        font-size: 18px;
        font-weight: 800;
      }
    }
  }
  .titleicon {
    .mid {
      background-color: #D04443;
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
    height: 44px;
  }
}
</style>
