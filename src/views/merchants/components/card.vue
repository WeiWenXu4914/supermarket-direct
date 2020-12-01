<template>
  <article ref="panel" class="panel">
    <div id="card" @click="proDetail(item)">
      <div class="img-head">
      <van-image 
        :src="commodities.pro_thumbnail" 
        width="98%" 
        height="140" 
        lazy-load 
        fit="contain"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      </div>
      <!-- <img :src="commodities.pro_thumbnail" class="img-head"/> -->
      <div class="com-info">{{ commodities.pro_name | strSub(10) }}</div>
      <div class="com-tag">{{ commodities.pro_introduction }}</div>
      <div class="com-price">￥{{ commodities.pro_price }}</div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    commodities: Object
  },
  data() {
    return {

    }
  },
  methods: {
    proDetail(res){
      this.$emit('proDetail', {...res})
    }
  }
}
</script>

<style lang="less" scoped>
#card{
  padding: 10px;
  box-sizing: border-box;
  .img-head{
    height: 140px;
    margin: 0 auto;
    margin-top:5px;
    margin-bottom: 10px;
    display: flex;
    /deep/ .van-image {
      img {
        border-radius: 2px;
      }
    }
  }
  .com-info{
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:500;
    line-height:16px;
    color:rgba(40,40,40,1);
    opacity:1;
  }
  .com-tag{
    margin-top: 5px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height:16px;
    color:rgba(180,177,170,1);
    opacity:1;
  }
  .com-price{
    margin-top: 5px;
    font-size:16px;
    font-family:DIN;
    font-weight:500;
    line-height:20px;
    color:rgba(225,66,63,1);
    opacity:1;
  }
}
</style>
