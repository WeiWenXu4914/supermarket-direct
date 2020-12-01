<template>
  <div class="self">
    <div class="head">
      <div class="top">
        <img src="../../components/img1/返回.png" alt @click="back()" />
        <p class="p1">订单详情</p>
      </div>
      <div class="model">
        <div class="model_content" v-for="(item,index) in state" :key="index"> 
          <img :src='item.img' alt />
          <p class="p1">{{item.name}}</p>
          <p class="p2">{{item.time}}</p>
        </div>
      </div>
      <div class="adress">
        <div class="a1">
          <p class="p1">提货人</p>
          <p class="p2">希金斯</p>
        </div>
        <div class="a1">
          <p class="p1">手机号</p>
          <p class="p2">18610781752</p>
        </div>
        <div class="a1">
          <p class="p1">提货地址</p>
          <p class="p3">内蒙古 包头市 东河区 维多利4号楼2101室</p>
        </div>
      </div>
      <div class="message">
        <div class="brand">
          <img src="../../components/img1/928cedf0031246aeb20eae5d7b6eaa95.png" alt />
          <p class="p1">Adidas 阿迪达斯</p>
          <p class="p2">></p>
        </div>
        <div class="bottom">
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
    <div class="time">
      <div class="tem">
        <p class="p1">订单编号：321646743364245</p>
        <p>下单时间：2020-5-10 18:20:15</p>
        <p class="line"></p>
        <p class="p3">收货方式：物流配送</p>
      </div>
    </div>
    <div class="price">
      <div class="list">
        <p class="p1">商品总额</p>
        <p class="p2">￥</p>
        <p class="p3">50.00</p>
      </div>
      <div class="list">
        <p class="p1">运费</p>
        <p class="p4">+</p>
        <p class="p3">0.00</p>
      </div>
      <div class="list">
        <p class="p1">优惠</p>
        <p class="p5">-</p>
        <p class="p3">0.00</p>
      </div>
    </div>
    <div class="word">
      <p class="p1">留言：</p>
      <p class="p2">无</p>
    </div>
    <div class="btn">
      <p class="p1">共2件 实付款：</p>
      <p class="p2">￥</p>
      <p class="p3">50.00</p>
      <van-button type="primary" class="b1">取消订单</van-button>
      <van-button type="primary" class="b2">立即支付</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state:[
      {img:require('../../components/img1/时间 (1).png'), name:'待付款',time:'剩余:23小时59分钟',type:1},
      {img:require('../../components/img1/货物堆.png'), name:'待收货',time:'自动收货时间:23小时59分钟',type:2}
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.self {
  background-color: #f7f7f7;
  .head {
    background-color: #fff;
    padding-bottom: 0.2rem;
    .top {
      display: flex;
      align-items: center;
      padding: 0.5rem 0rem 0rem 0.3rem;
      img {
        width: 0.5rem;
      }
      .p1 {
        margin-left: 3.3rem;
        color: #2f2f2f;
        font-size: 0.5rem;
        font-weight: 500;
      }
    }
    .model {
      width: 95%;
      height: 2.5rem;
      background-color: #d04443;
      margin: 0 auto;
      margin-top: 0.5rem;
      border-radius: 0.1rem;
      .model_content {
        display: flex;
        position: relative;
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin: 1rem 0rem 0rem 0.5rem;
        }
        .p1 {
          color: #ffffff;
          font-size: 0.45rem;
          font-weight: 500;
          margin: 0.9rem 0rem 0rem 0.1rem;
        }
        .p2 {
          color: #ffffff;
          font-size: 0.45rem;
          font-weight: 500;
          position: absolute;
          right: 0.5rem;
          top: 0.9rem;
        }
      }
    }
    .adress {
      margin-top: 0.5rem;
      .a1 {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        width: 95%;
        margin:  0 auto;
        padding-bottom: 0.5rem;
        margin-top: 0.5rem;
        .p1 {
          font-size: 0.45rem;
          color: #212121;
          font-weight: 500;
        }
        .p2 {
          width: 65%;
          font-size: 0.43rem;
          color: #212121;
          font-weight: 500;
          margin-left: 1.5rem;
        }
        .p3 {
          width: 70%;
          font-size: 0.43rem;
          color: #212121;
          font-weight: 500;
          margin-left: 1rem;
        }
      }
    }
    .message {
      .brand {
        display: flex;
        align-items: center;
        margin: 0.5rem 0rem 0rem 0.5rem;
        img {
          width: 0.8rem;
        }
        .p1 {
          font-size: 0.5rem;
          margin-left: 0.2rem;
        }
        .p2 {
          margin-left: 4rem;
          font-size: 0.6rem;
          color: #717171;
        }
      }
      .bottom {
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
  .time {
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    .tem {
      p {
        margin: 0rem 0rem 0rem 0.5rem;
        color: #212121;
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
        margin: 0.5rem 0rem 0rem 2.5rem;
      }
      .p3 {
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
    }
  }
  .price {
    margin-top: 0.2rem;
    background-color: #ffffff;
    padding-top: 0.5rem;
    padding-bottom: 0.3rem;
    .list {
      display: flex;
      .p1 {
        color: #212121;
        margin-left: 0.5rem;
        font-size: 0.45rem;
      }
      .p2 {
        color: #1c1c1c;
        font-size: 0.3rem;
        margin-left: 6rem;
        margin-top: 0.08rem;
      }
      .p3 {
        color: #1c1c1c;
        font-size: 0.4rem;
        font-weight: bold;
      }
      .p4 {
        margin-left: 7.2rem;
      }
      .p5 {
        margin-left: 7.3rem;
      }
    }
  }
  .word {
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    .p1 {
      display: inline-block;
      color: #212121;
      font-size: 0.45rem;
      font-weight: 400;
      margin-left: 0.5rem;
    }
    .p2 {
      display: inline-block;
      color: #5e5e5e;
      font-size: 0.4rem;
    }
  }
  .btn {
    position: relative;
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 1rem;
    .p1 {
      margin: 1.5rem 0rem 0rem 5.5rem;
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    .p2 {
      display: inline-block;
      color: #db1043;
      font-size: 0.4rem;
    }
    .p3 {
      display: inline-block;
      color: #db1043;
      font-size: 0.5rem;
      font-weight: bold;
    }
    .b1 {
      outline: none;
      border: none;
      background-color: #ffffff;
      width: 2rem;
      height: 1rem;
      border: 1px solid #b0b0b0;
      border-radius: 0.1rem;
      position: absolute;
      right: 2.5rem;
      bottom: 0.2rem;
      color: #2a2a2a;
    }
    .b2 {
      outline: none;
      border: none;
      background-color: #d04443;
      width: 2rem;
      height: 1rem;
      border-radius: 0.1rem;
      color: #ffffff;
      position: absolute;
      right: 0.3rem;
      bottom: 0.2rem;
    }
    .b3 {
      outline: none;
      border: none;
      background-color: #ffffff;
      width: 2rem;
      height: 1rem;
      border: 1px solid #b0b0b0;
      border-radius: 0.1rem;
      position: absolute;
      right: 4.7rem;
      bottom: 0.2rem;
    }
  }
}
</style>