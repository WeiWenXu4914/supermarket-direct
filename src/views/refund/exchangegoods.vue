<template>
  <div class="only">
    <div class="header">
      <div class="top">
        <img src="../../components/img1/返回.png" alt @click="back()" />
        <p class="p1">换货详情</p>
      </div>
      <div class="content">
        <p class="agree">商家同意换货，请处理</p>
        <div class="list">
          <p class="p1">剩</p>
          <p class="p2">23</p>
          <p class="p1">小时</p>
          <p class="p2">59</p>
          <p class="p1">分钟</p>
        </div>
      </div>
      <div class="step">
        <p class="up">换货步骤</p>
        <div class="down">
          <p class="p1">1.寄出</p>
          <p class="p2"></p>
          <p class="p3">2.及时填写换货信息</p>
        </div>
      </div>
      <div class="adress">
        <div class="tem">
          <p class="p1" style="margin-top:0.5rem">退货地址：</p>
          <p class="p2" style="margin-top:0.5rem">内蒙古 包头市 东河区 维多利4号楼2101室</p>
        </div>
        <div class="tem">
          <p class="p1">收件人：</p>
          <p class="p3">克鲁斯堡</p>
        </div>
        <div class="tem">
          <p class="p1">联系电话：</p>
          <p class="p2">18610781752</p>
        </div>
      </div>
      <div class="time">
        <div class="tem">
          <p class="p1">售后类型：换货</p>
          <p class="line"></p>
        </div>
        <div class="tem">
          <p class="p1">申请原因：其他</p>
          <p>申请说明：尽快退货！</p>
          <p>订单编号：456789987689098766</p>
          <p>申请时间：2020-5-10 2020-5-10</p>
        </div>
      </div>
    </div>
    <div class="history">
      <p class="p1">协商历史</p>
      <p class="p2">></p>
    </div>
    <div class="history2">
      <p class="p1">图片凭证:</p>
      <div class="photo">
        <img src="../../components/img1/webp.webp-(8).png" alt />
        <img src="../../components/img1/webp.webp (9).png" alt />
        <img src="../../components/img1/webp.webp-(8).png" alt />
        <img src="../../components/img1/webp.webp (9).png" alt />
      </div>
    </div>
    <div class="bottom">
      <p class="biao">退款商品</p>
      <div class="model">
        <div class="left">
          <img src="../../components/img1/photo1.png" alt />
        </div>
        <div class="center">
          <p class="p1">收纳袋子大号装衣物被子搬家行李打包</p>
          <p class="p2">￥</p>
          <p class="p3">50.00</p>
        </div>
        <div class="right">
          <button>物流配送</button>
          <p class="p2">x1</p>
        </div>
      </div>
    </div>
    <div class="btn">
      <button class="b2">撤销申请</button>
      <button class="b3">填写换货物流</button>
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
.only {
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
    .content {
      margin: 1rem 0rem 0rem 0.5rem;
      .agree {
        color: #2f2f2f;
        font-size: 0.45rem;
        font-weight: bold;
      }
      .list {
        display: flex;
        .p1 {
          color: #2f2f2f;
          font-size: 0.45rem;
          margin-left: 0.1rem;
          font-weight: 500;
        }
        .p2 {
          color: #d04443;
          font-size: 0.45rem;
          margin-left: 0.2rem;
          font-weight: bold;
        }
      }
    }
    .step {
      background-color: #fdf5f5;
      width: 90%;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      padding-bottom: 0.4rem;
      .up {
        color: #474747;
        font-size: 0.43rem;
        margin: 0rem 0rem 0rem 0.5rem;
        padding: 0.2rem 0rem 0rem 0rem;
      }
      .down {
        display: flex;
        margin: 0.2rem 0rem 0rem 0.5rem;
        .p1 {
          color: #2f2f2f;
          font-size: 0.4rem;
        }
        .p2 {
          width: 2rem;
          height: 1px;
          background-color: #707070;
          margin: 0.3rem 0rem 0rem 0.2rem;
        }
        .p3 {
          color: #2f2f2f;
          font-size: 0.4rem;
          margin-left: 0.2rem;
        }
      }
    }
    .adress {
      background-color: #fdf5f5;
      width: 90%;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      padding-bottom: 0.5rem;

      .tem {
        display: flex;
        .p1 {
          color: #474747;
          font-size: 0.43rem;
          margin: 0.3rem 0rem 0rem 0.5rem;
        }
        .p2 {
          width: 60%;
          font-size: 0.4rem;
          color: #474747;
          margin: 0.3rem 0rem 0rem 0.1rem;
        }
        .p3 {
          width: 60%;
          font-size: 0.4rem;
          color: #474747;
          margin: 0.3rem 0rem 0rem 0.5rem;
        }
      }
    }
    .time {
      width: 100%;
      background-color: #ffffff;
      margin-top: 0.3rem;
      padding-bottom: 0.5rem;
      .up {
        .u1 {
          display: flex;
          color: #212121;
          .left {
            margin: 0.5rem 0rem 0rem 0.5rem;
            .p1 {
              font-size: 0.4rem;
            }
          }
          .right {
            margin-top: 0.3rem;
            .p1 {
              font-size: 0.4rem;
              color: #212121;
            }
            .p2 {
              color: #848484;
            }
          }
        }
        .line {
          width: 75%;
          height: 1px;
          background-color: #e5e5e5;
          margin: 0.7rem 0rem 0rem 2.5rem;
        }
      }
      .tem {
        position: relative;
        p {
          margin: 0rem 0rem 0rem 0.5rem;
          color: #212121;
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 0.4rem;
        }
        .p1 {
          padding-top: 0.5rem;
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
        .wechat {
          position: absolute;
          right: 0.3rem;
          top: 1.2rem;
          color: #d04443;
        }
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
  .history2 {
    background-color: #ffffff;
    margin-top: 0.3rem;
    padding-bottom: 0.6rem;
    .p1 {
      color: #212121;
      font-size: 0.45rem;
      margin: 0.5rem 0rem 0rem 0.5rem;
      padding-top: 0.5rem;
    }
    .photo {
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-around;
      img {
        width: 2.1rem;
        height: 2.1rem;
      }
    }
  }
  .bottom {
    background-color: #ffffff;
    margin: 0.3rem 0rem 0rem 0rem;
    padding-bottom: 0.5rem;
    .biao {
      font-size: 0.38rem;
      color: #212121;
      margin: 0.3rem 0rem 0rem 0.5rem;
      padding-top: 0.5rem;
    }
    .model {
      display: flex;
      margin: 0.5rem 0rem 0rem 0.5rem;
      .left {
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .center {
        margin-left: 0.3rem;
        .p1 {
          width: 80%;
          font-size: 0.4rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
        }
        .p2 {
          color: #db1043;
          display: inline-block;
          margin-top: 0.2rem;
        }
        .p3 {
          color: #db1043;
          display: inline-block;
          font-size: 0.5rem;
          font-weight: bold;
          margin-top: 0.2rem;
        }
      }
      .right {
        width: 30%;
        button {
          color: #ffffff;
          border: none;
          outline: none;
          background-color: #d04443;
          border-radius: 0.1rem;
          width: 1.7rem;
        }
        .p2 {
          font-size: 0.5rem;
          margin: 0.8rem 0rem 0rem 1.2rem;
        }
      }
    }
  }
  .btn {
    background-color: #ffffff;
    padding: 0.3rem 0rem 0.3rem 0rem;
    button {
      border: none;
      outline: none;
      height: 1rem;
      border-radius: 0.1rem;
    }
    .b2 {
      color: #d04443;
      border: 1px solid #d04443;
      background-color: #ffffff;
      width: 2rem;
      margin-left: 4.4rem;
    }
    .b3 {
      color: #ffffff;
      background-color: #d04443;
      width: 3rem;
      margin-left: 0.2rem;
    }
  }
}
</style>