<template>
  <div class='title-wrapper' :style="{background: background}">
    <van-icon name="arrow-left"  class="title-icon" :style="{color: iconColor,fontSize: iconSize +'px'}" @click="back" />
    <div class="title-text" v-if="title" :style="{fontSize: titleSize + 'px',fontWeight: titleFontWeight,color: titleColor}">{{title}}</div>
    <div class="title-search">
      <slot name="search"></slot>
    </div>
    <div class="title-right" :style="{width: rightHandleWidth + 'px', height: rightHandleHeight + 'px'}">
      <slot name="title-right"></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'mall-index',
  props: {
    title: String,
    titleSize: {
      type: Number,
      default: 19
    },
    titleFontWeight: {
      type: String,
      default: 'normal'
    },
    titleColor: {
      type: String,
      default: '#484848'
    },
    iconSize: {
      type: Number,
      default: 22
    },
    iconColor: {
      type: String,
      default: '#414141'
    },
    rightHandleWidth: {
      type: Number,
      default: 60
    },
    rightHandleHeight: {
      type: Number,
      default: 50
    },
    background: {
      type: String,
      default: '#fff'
    },
    goRouter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {
    ...mapState(['isMerchants'])
  },
  created () {
  },
  methods: {
    // 回退
    back () {
      if (this.goRouter) {
        if (this.isMerchants) {
          this.$router.push(this.isMerchants)
        } else {
          if (this.$route.query.goindex === 'true') {
            this.$router.push('/')
          } else {
            this.$router.back(-1)
          }
        }
      } else {
        if (this.$route.query.goindex === 'true') {
          this.$router.push('/')
        } else {
          this.$router.back(-1)
        }
      }
      
    }
  }
}
</script>

<style scoped lang='less'>
.title-wrapper{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 14px;
  z-index: 999;
  overflow: hidden;
  .title-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 19px;
    color: #484848;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title-search{
    width: 319px;
  }
  .title-right{
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

</style>
