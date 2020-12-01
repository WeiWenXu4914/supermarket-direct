<template>
  <div class="type">
    <div class="top">
      <img src="../../components/img1/返回.png" alt  @click="back()"/>
      <p class="p1">选择售后类型</p>
    </div>
    <div class="list">
      <div class="model">
        <p class="p1">我要退货退款</p>
        <p class="right">></p>
        <p class="p2">已收到货，需要退还已收到的货物</p>
      </div>
      <div class="model">
        <p class="p1">我要退款</p>
        <p class="right">></p>
        <p class="p2">未收到货，或与商家协商之后申请</p>
      </div>
      <div class="model">
        <p class="p1">我要换货</p>
        <p class="right">></p>
        <p class="p2">对收到的商品不满意，可与商家协商换货</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.type {
  .top {
    display: flex;
    margin-top: 0.5rem;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.8rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 2.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .list {
    .model {
        position: relative;
        border-bottom: 1px solid #E1E1E1;
        padding-bottom:0.3rem;
      .p1 {
        color: #2f2f2f;
        font-size: 0.5rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        margin: 0.3rem 0rem 0rem 0.3rem ;
      }
      .p2{
          color: #8C8C8C;
          font-size: 0.4rem;
           margin: 0.3rem 0rem 0rem 0.3rem ;

      }
      .right{
          position: absolute;
          right: 0.45rem;
          top: 0.4rem;
          color:#B9B9B9 ;
          font-size: 0.5rem;
      }
    }
  }
}
</style>