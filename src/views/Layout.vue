<template>
  <div class="layout-page">
    <!-- 内容容器 -->
    <div class="my-wrapper" >
      <!-- 二级路由对应组件显示容器 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <!-- 底部tab栏 -->
    <transition transition name="van-slide-up">
      <tab-bar ref="TabBar" v-show="tabShow"></tab-bar>
    </transition>
    <!-- <van-overlay :show="show">
      <div style="width: 50%;height: 200px;border:1px red solid;float: left;margin-top: 50%;">
        
      </div>
      <div style="width: 50%;height: 200px;border:1px red solid;float: right;margin-top: 50%;"></div>
    </van-overlay> -->
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'index',
  components: {
    TabBar
  },
  data () {
    return {
      tabShow:true
    }
  },
  methods: {
    TabBar(val){
      if(val == 2){
        
        this.$refs.TabBar.getTabbat();
      }else if (val == 1) {
        if (this.tabShow == true) {
          this.tabShow = !this.tabShow;
        }
      }else{
        if (this.tabShow == false) {
          this.tabShow = !this.tabShow;
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.layout-page{
  width: 100%;
  height: 100%;
  .my-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    //padding-top: 58px;
    padding-bottom: 65px;
    box-sizing: border-box;
  }
}
</style>
