<template>
  <div class="detail" @scroll="scroll($event)">
        <van-nav-bar
            title="我的拼团"
            left-arrow
            fixed
            :border="false"
            @click-left="back"
            :class="[!barClass ? '' : 'navClassTrue']"
        />
        <van-tabs v-model="active" animated swipeable sticky @change="changeFun">
            <van-tab :title="item.val" v-for="(item, index) in title" :key="index">
              <div v-if="dataList != '' && dataList.length > 0">
                <group-booking :dataList="dataList"></group-booking>
              </div>
              <van-empty v-else :description="'没有'+title[active].val+'订单'" />
            </van-tab>
        </van-tabs>
  </div>
</template>

<script>
import { MyOpenJoinGroupBuying } from './actions'
import GroupBooking from './components/GroupBooking';
export default {
  name: "group-booking-detail",
  components: {
    GroupBooking
  },
  data() {
    return {
      barClass:false,
      active: 0,
      title:[
        {val:'全部'},
        {val:'开团'},
        {val:'参团'},
        {val:'已过期'},
        {val:'已完成'}
      ],
      dataList:''
    };
  },
  created() {
    this.getMyGroupList()
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getMyGroupList(val='') {
      MyOpenJoinGroupBuying(val).then(res=>{
        this.dataList = res.data;
      })
    },
    changeFun() {
      this.getMyGroupList(this.active);
    },
    back() {
      this.$router.go(-1)
    },
    scroll(e) {
      if(e.path[1].scrollY >= 50){
        this.barClass = true;
      }else if (e.path[1].scrollY <= 50) {
        this.barClass = false;
      }
    }
  },
  mounted() {
    document.addEventListener('scroll',this.scroll)
  }
};
</script>

<style scoped lang="less">
.detail {
    width: 100%;
    background-color: rgb(247, 247, 247);
    /deep/ .van-tabs {
        margin-top: 50px;
    }
    /deep/ .van-tabs__content {
        min-height: calc(100vh - 95px);
    }
    /deep/ .van-nav-bar {
        background: #fff;
        .van-nav-bar__left {
            .van-nav-bar__text {
                color: #111;
            }
            .van-icon-arrow-left {
                color: #111;
            }
        }
        .van-nav-bar__title {
            color: #111;
        }
    }
    .navClassTrue {
        background:rgba(255,255,255,0);
    }
}
</style>