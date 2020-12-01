<template>
  <div id="fans-root">
    <div class="message-card">
      <user-head-block
        username="阿迪达斯"
        :head="require('./icons/01987a5d837c0fa8012060bef252eb.png')"
        message="本文以百度即将推出的隐私检测应用为思考点"
      />
      <user-head-line
        :head="require('./icons/01987a5d837c0fa8012060bef252eb.png')"
        message="本文以百度即将推出的隐私检测应用为思考点"
      />
      <user-head-block
        username="阿迪达斯"
        :head="require('./icons/01987a5d837c0fa8012060bef252eb.png')"
        message="本文以百度即将推出的隐私检测应用为思考点"
      />
    </div>
  </div>
</template>

<script>

import UserHeadBlock from './components/UserHeadBlock'
import UserHeadLine from './components/UserHeadLine'
export default {
  name: 'fans-welfare',
  components: {
    UserHeadBlock,
    UserHeadLine
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
#fans-root {
  height: 100%;
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
  .message-card {
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>
