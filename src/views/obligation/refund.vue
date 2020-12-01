<template>
  <div class="refund">
    <div class="top">
      <img src="../../components/img1/返回.png" alt  @click="back()"/>
      <p class="p1">退款/售后</p>
    </div>
    <div class="content">
      <div class="list">
        <div class="icon">
          <img src="../../components/img1/TB1.2hjRpXXXXcLXpXXXXXXXXXX-274-96.png" alt />
        </div>
        <p class="p1">易倍思教育 ></p>
        <p class="p2">退款成功</p>
      </div>
    </div>
    <div class="goods">
      <div class="left">
        <div class="photo">
          <img
            src="../../components/img1/chanel-19-flap-bag-black-goatskin-gold-tone-silver-tone-ruthenium-finish-metal-goatskin-gold-tone-silver-tone-ruthenium-finish-metal-packshot-default-.png"
            alt
          />
        </div>
      </div>
      <div class="center">
        <p class="p1">CHANEL 19口盖包</p>
        <p class="p2">包邮</p>
      </div>
      <div class="right">
        <p class="p1">￥</p>
        <p class="p2">50.00</p>
        <p class="p3">x1</p>
      </div>
    </div>
    <div class="last">
      <p class="p1">共1件商品</p>
      <p class="p2">实付:</p>
      <p class="p3">￥</p>
      <p class="p4">50.00</p>
      <p class="p5">退款金额:</p>
      <p class="p6">￥</p>
      <p class="p7">50.00</p>
    </div>
    <div class="btn">
      <van-button type="primary" class="b1">删除记录</van-button>
      <van-button type="primary" class="b2">售后详情</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "refund",
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
.refund {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .content {
    margin: 0.5rem 0rem 0rem 0.5rem;
    .list {
      display: flex;
      .icon {
        width: 1rem;
        height: 1rem;
        background-color: #0066ff;
        border-radius: 0.1rem;
        img {
          width: 0.8rem;
          margin-left: 50%;
          margin-top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .p1 {
        color: #212121;
        font-size: 0.4rem;
        font-weight: bold;
        margin: 0.15rem 0rem 0rem 0.2rem;
      }
      .p2 {
        color: #d04443;
        font-size: 0.45rem;
        margin: 0.15rem 0rem 0rem 3.5rem;
      }
    }
  }
  .goods {
    display: flex;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.5rem;
    .left {
      margin: 0.5rem 0rem 0rem 0.2rem;
      .photo {
        width: 2rem;
        height: 2rem;
        background-color: #f5f5f5;
        img {
          width: 2rem;
          margin-left: 50%;
          margin-top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .center {
      .p1 {
        font-size: 0.44rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        margin: 0.6rem 0rem 0rem 0.2rem;
      }
      .p2 {
        width: 1rem;
        color: #d04443;
        border: 1px solid #d04443;
        text-align: center;
        border-radius: 0.1rem;
        margin: 0.6rem 0rem 0rem 0.2rem;
      }
    }
    .right {
      .p1 {
        display: inline-block;
        margin: 0.7rem 0rem 0rem 1.5rem;
      }
      .p2 {
        display: inline-block;
        font-size: 0.5rem;
        color: #242424;
      }
      .p3 {
        color: #878787;
        font-size: 0.45rem;
        margin: 0rem 0rem 0rem 2.5rem;
      }
    }
  }
  .last {
    display: flex;
    margin: 0.5rem 0rem 0rem 0.5rem;
    .p1 {
      color: #767676;
      font-size: 0.4rem;
    }
    .p2 {
      color: #232323;
      margin-left: 1.5rem;
    }
    .p3 {
      font-size: 0.3rem;
      margin-top: 0.05rem;
    }
    .p4 {
      font-size: 0.45rem;
      margin-top: -0.1rem;
    }
    .p5 {
      color: #232323;
      margin-left: 0.2rem;
    }
    .p6 {
      color: #d04443;
      font-size: 0.3rem;
      margin-top: 0.05rem;
    }
    .p7 {
      color: #d04443;
      font-size: 0.45rem;
      margin-top: -0.1rem;
    }
  }
  .btn {
    button {
      outline: none;
      background-color: #ffffff;
      border: none;
      width: 2rem;
      border: 1px solid #b0b0b0;
      height: 1rem;
      color: #2a2a2a;
      font-family: Source Han Sans CN;
      font-weight: 400;
      border-radius: 0.1rem;
      font-weight: bold;
    }
    .b1 {
      margin: 0.5rem 0rem 0rem 5rem;
    }
    .b2 {
      margin-left: 0.4rem;
    }
  }
}
</style>