<template>
  <div class="detail" @scroll="scroll($event)">
        <van-nav-bar
            title="我的团购"
            left-arrow
            fixed
            :border="false"
            @click-left="back"
            :class="[!barClass ? '' : 'navClassTrue']"
        />
        <van-tabs v-model="active" animated swipeable sticky>
            <van-tab title="全部"><van-empty description="数据为空" /></van-tab>
            <van-tab title="待支付"><van-empty description="数据为空" /></van-tab>
            <van-tab title="待发货"><van-empty description="数据为空" /></van-tab>
            <van-tab title="已完成"><van-empty description="数据为空" /></van-tab>
        </van-tabs>
  </div>
</template>

<script>
export default {
  name: "my-group-purchase",
  data() {
    return {
      barClass:false,
      active: 0
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
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