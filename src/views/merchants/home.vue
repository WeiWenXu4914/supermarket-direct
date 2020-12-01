<template>
  <div id="fans-root">
    <div class="custom-html">
      <img :src="shops.bigimgs" width="100%" />
    </div>
    <bottom-tabr></bottom-tabr>
  </div>
</template>

<script>
import BottomTabr from './components/BottomTabr'
export default {
  components: {
    BottomTabr
  },
  data () {
    return {
      shops: {
        bigimgs: require('./icons/phone7.png')
      },
    }
  },
  created () {
    var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
#fans-root {
  overflow: auto;
  .custom-html {
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 50px;
  }
}
</style>
