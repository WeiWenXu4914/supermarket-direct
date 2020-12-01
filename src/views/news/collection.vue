<template>
  <div class="collection">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()" />
      <p class="p1">物流</p>
    </div>
    <div class="list">
      <div class="up">
        <p class="circle"></p>
        <p class="p1">订单已发货</p>
        <p class="p2">昨天 14:22</p>
      </div>
      <div class="model">
        <div class="left">
          <p class="p1">HP惠普tank 411原装连供打印机家用小型复印扫描一体机彩色喷墨</p>
          <p class="p2">运单编号：321646743364245</p>
        </div>
        <div class="right">
          <img src="../../components/img1/photo1.png" alt />
        </div>
      </div>
      <div class="up">
        <p class="circle"></p>
        <p class="p1">订单已发货</p>
        <p class="p2">昨天 14:22</p>
      </div>
      <div class="model">
        <div class="left">
          <p class="p1">HP惠普tank 411原装连供打印机家用小型复印扫描一体机彩色喷墨</p>
          <p class="p2">运单编号：321646743364245</p>
        </div>
        <div class="right">
          <img src="../../components/img1/photo1.png" alt />
        </div>
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
.collection {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .list {
    .up {
      display: flex;
      margin: 1rem 0rem 0rem 0.3rem;
      .circle {
        width: 0.25rem;
        height: 0.25rem;
        background-color: #d90f42;
        border-radius: 50%;
        margin: 0.2rem 0rem 0rem 0rem;
      }
      .p1 {
        color: #292929;
        font-size: 0.45rem;
        font-weight: bold;
        margin-left: 0.2rem;
      }
      .p2 {
        color: #888888;
        font-size: 0.4rem;
        margin: 0.1rem 0rem 0rem 4.8rem;
      }
    }
    .model {
      width: 95%;
      display: flex;
      border-bottom: 1px solid #e1e1e1;
      margin-left: 0.3rem;
      padding-bottom: 0.5rem;
      .left {
        width: 70%;
        margin: 0.5rem 0rem 0rem 0rem;
        .p1 {
          color: #282828;
          font-size: 0.4rem;
          font-weight: bold;
        }
        .p2 {
          color: #5c5c5c;
          font-size: 0.4rem;
          margin-top: 0.2rem;
        }
      }
      .right {
        margin: 0.5rem 0rem 0rem 0.8rem;
        img {
          width: 2.1rem;
          height: 2.1rem;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>