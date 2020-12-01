<template>
  <div id="fans-root">
    <div class="head-card">
    </div>
    <div class="custom-html">
      <img :src="shops.bigimgs" width="100%" />
    </div>
    <bottom-tabr></bottom-tabr>
  </div>
</template>

<script>
import BottomTabr from './components/BottomTabr'
export default {
  name: 'phonebookinfo-ready',
  components: {
    BottomTabr
  },
  data () {
    return {
      value: '',
      shops: {
        head: require('./icons/928cedf0031246aeb20eae5d7b6eaa95.png'),
        name: 'Adids 阿迪达斯',
        star: 4.0,
        starText: '实力雄厚',
        concerns: '3W',
        staff: 3254,
        fans: 999,
        images: [
          require('./icons/01bf105cd8e4e6a801214168328397.jpg@1280w_1l_2o_100sh (1).png'),
          require('./icons/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh.png'),
          require('./icons/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh.png'),
          require('./icons/016d6d5caac31fa801214168289e0d.jpg@1280w_1l_2o_100sh.png')
        ],
        bigimgs: require('./icons/webp.webp (1).png')
      },
      btns: ['投票选举', '线上产品', '团购', '预约']
    }
  }
}
</script>

<style lang='less' scoped>
#fans-root {
  overflow: auto;
  .costom-header {
    /deep/ .title-search {
      width: 641px;
    }
    /deep/ .title-right {
      display: none;
    }
    background: #fff;
    overflow: hidden;
    z-index: 99999;
  }
  .head-card {
    background: #fff;
  }
  .custom-html {
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 50px;
    // height: 380px;
  }
}
</style>
