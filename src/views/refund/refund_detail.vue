<template>
  <div class="refund_detail">
    <div class="header">
      <div class="top">
        <img src="../../components/img1/返回.png" alt @click="back()" />
        <p class="p1">退款详情</p>
      </div>
      <div class="succed">
        <div class="up">
          <p class="p1">!</p>
          <p class="p2">退款被拒绝，建议修改申请</p>
        </div>
      </div>
    </div>
    <div class="time">
      <div class="tem">
        <p class="pp">商家回复：东西没有问题</p>
        <p class="p2">售后类型：换货</p>
        <p class="line"></p>
      </div>
      <div class="tem">
        <p class="p1">申请原因：其他</p>
        <p>申请说明：无</p>
        <p>订单编号：456789987689098766</p>
        <p>申请时间：2020-5-10 2020-5-10</p>
      </div>
    </div>
    <div class="history">
      <p class="p1">协商历史</p>
      <p class="p2">></p>
    </div>
    <div class="bottom">
        <div style="height:0.1rem"></div>
        <van-button type="primary" class="b1">申请客服介入</van-button>
        <van-button type="primary" class="b2">修改申请</van-button>
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
.refund_detail {
  background-color: #f7f7f7;
  .header {
    background-color: #ffffff;
    padding-bottom: 0.3rem;
    .top {
      display: flex;
      margin-top: 0.5rem;
      img {
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
    .succed {
      margin: 0.5rem 0rem 0rem 0.3rem;
      padding-bottom: 0.3rem;
      .up {
        display: flex;
        .p1 {
          background-color: #D04443;
          color: #ffffff;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          text-align: center;
          margin: 0.1rem 0rem 0rem 0rem;
        }
        .p2 {
          color: #161616;
          font-family: Source Han Sans CN;
          font-weight: 500;
          font-size: 0.45rem;
          margin-left: 0.1rem;
        }
      }
    }
  }
  .time {
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.3rem;
    padding-bottom: 0.5rem;
    .tem {
      position: relative;
      p{
        margin: 0rem 0rem 0rem 0.5rem;
        color: #212121;
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 0.4rem;
      }
      .p1 {
        padding-top: 0.5rem;
      }
      .p2{
          margin-top: 0.5rem;
      }
      .pp{
           padding-top: 0.5rem;
           color: #D04443;
           font-size: 0.45rem;
      }
      .line {
        width: 75%;
        height: 1px;
        background-color: #e5e5e5;
        margin: 0.7rem 0rem 0rem 2.5rem;
      }
      .p3 {
        margin: 0.3rem 0rem 0rem 0.5rem;
      }
      .wechat{
        position: absolute;
        right: 0.3rem;
        top:1.2rem;
        color: #D04443;
      }
    }
  }
  .history {
    display: flex;
    background-color: #ffffff;
    margin-top: 0.3rem;
    padding-bottom: 0.6rem;
    .p1 {
      color: #212121;
      font-size: 0.45rem;
      margin: 0.5rem 0rem 0rem 0.5rem;
    }
    .p2 {
      color: #717171;
      margin: 0.5rem 0rem 0rem 7rem;
      font-size: 0.45rem;
    }
  }
  .bottom {
    background-color: #ffffff;
    margin:0.3rem 0rem 0rem 0rem;
    button{
        border: none;
        outline: none;
        border-radius: 0.1rem;
    }
    .b1{
        color: #D04443;
        background-color: #ffffff;
        border: 1px solid #D04443;
        height: 1rem;
        width: 2.5rem;
        position: absolute;
        bottom: 0.4rem;
        right: 3rem;

    }
    .b2{
        color: #FCFCFC;
        background-color: #D04443;
        width: 2rem;
        height: 1rem;
        position: absolute;
        bottom: 0.4rem;
        right: 0.7rem;
    }
  }
}
</style>