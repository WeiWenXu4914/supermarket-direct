<template>
    <van-popup v-model="showShare" position="bottom"
    round :style="{ height: '32%' }"
    :close-on-click-overlay="false"
    @click-overlay="onClose"
    >
      <div class="share-title">{{title}}</div>
      <div class="share-items">
        <div class="item" v-for="(item,index) in options" :key="index">
          <div class="icon">
            <van-icon name="hot" />
          </div>
          <div class="name">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="bottons">
        <van-button round type="info" block color="#E4E4E4" @click="onClose">取消</van-button>
      </div>
    </van-popup>
</template>

<script>

export default {
  name: 'share-sheet',
  props: {
    title: {
      type: String,
      default: '分享至'
    },
    showShare: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {
  },
  created () {
  },
  methods: {
    onClose () {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped lang='less'>
.van-popup {
  border-radius: 5px 5px 0 0 !important;
  .share-title{
    padding:20px 0  15px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #2C2C2C;
    justify-content: center;
  }
  .share-items{
    display: flex;
    justify-content: space-around;
    padding:5px 0 25px 0;
    .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 43px;
        height: 43px;
        background: #EEEEEE;
        border-radius: 100%;
        font-size: 25px;
        color: #999;
      }
      .name{
        padding-top: 5px;
        font-size: 11px;
        color: #5A5A5A;
      }
    }
  }
  .bottons{
    width: 100%;
    display: flex;
    justify-content: center;
    /deep/ .van-button{
      width: 90%;
      font-size: 16px;
      height: 50px;
      color: #434343 !important;
    }
  }
}
</style>
