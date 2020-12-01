<template>
  <div class="take">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1"  @click="back()"/>
      <p class="p1">换货详情</p>
    </div>
     <div class="model">
        <p class="p1">等待商家确认收货</p>
        <p class="p2">剩余：23小时59分钟</p>
      </div>
      <div class="adress">
        <div class="left">
        <img src="../../components/img1/快递 (1).png" alt />
        </div>
        <div class="right">
        <p class="name">已签收  签收人：希金斯</p>
        <p class="adr">2020-5-10 18:20:15</p>
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
      this.$router.go(-5);
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.take {
    .top {
    display: flex;
    margin-top: 0.5rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
   .model {
      width: 90%;
      height: 2.5rem;
      background-color: #d04443;
      display: flex;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      .p1 {
        color: #ffffff;
        font-size: 0.43rem;
        font-weight: 500;
        margin: 0.9rem 0rem 0rem 0.3rem;
      }
      .p2 {
        color: #ffffff;
        font-size: 0.43rem;
        font-weight: 500;
        margin: 0.9rem 0rem 0rem 1rem;
      }
    }
    .adress {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 0.5rem;
      .left{
        img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.6rem 0rem 0rem 0.5rem;
      }

      }
      .right{
        .name {
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .phone {
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .adr {
        margin: 0rem 0rem 0rem 0.3rem;
        color: #676767;
      }
      .left {
        margin: -0.8rem 0rem 0rem 0.8rem;
        color: #717171;
        font-size: 0.6rem;
      }

      }
      
      
    }
}
</style>