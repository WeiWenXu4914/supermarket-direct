<template>
  <div class="exchange">
    <div class="header">
      <div class="top">
        <img src="../../components/img1/返回.png" alt @click="back()" />
        <p class="p1">退款详情</p>
      </div>
      <div class="succed">
        <div class="up">
          <p class="p1">√</p>
          <p class="p2">换货成功</p>
        </div>
      </div>
    </div>
    <div class="time">
      <div class="up">
        <div class="u1">
          <div class="left">
            <p class="p1">物流信息：</p>
          </div>
          <div class="right">
            <p class="p1">已签收 签收人：希金斯</p>
            <p class="p2">2020-5-10 18:20:15</p>
          </div>
        </div>
        <p class="line"></p>
      </div>
      <div class="tem">
        <p class="p1">售后类型：换货</p>
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
.exchange {
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
          background-color: #8ed997;
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
  .history {
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
}
</style>