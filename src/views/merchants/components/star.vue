<template>
  <van-rate
    v-model="value"
    :size="15"
    :gutter="3"
    allow-half
    readonly
    color="#ffffff"
    void-icon="star"
    void-color="#ffffff"
    class="coustom-star"
  />
</template>

<script>
export default {
  name: 'star',
  props:{
    value: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="less" scoped>
.coustom-star{
  margin: 0 4px;
  /deep/ .van-rate__item{
    height: 22px;
    box-sizing: border-box;
    padding-top: 3.5px;
  }
  /deep/ .van-rate__icon--full{
    background: #FABF50!important;
  }
  /deep/ .van-rate__icon--half{
    top: 3.5px;
  }
  /deep/ .van-rate__icon{
    background: #E5E5E5;
  }
}
</style>