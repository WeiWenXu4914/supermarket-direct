<template>
  <div class="shophome">
    <div class="top">
      <div class="left">
        <img src="../../components/img1/返回.png" alt @click="back()" />
      </div>
      <div class="right">
        <img src="../../components/img1/搜索.png" alt />
        <input type="text" name id placeholder="在店铺内搜索" />
      </div>
    </div>
    <div class="shop">
      <div class="icon">
        <img src="../../components/img1/928cedf0031246aeb20eae5d7b6eaa95.png" alt />
      </div>
      <div class="name">
        <p class="brand">Adidas 阿迪达斯 ></p>
        <van-rate
          v-model="value"
          :size="15"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          class="rate"
        />
        <p class="grade">{{value.toFixed(2)}}</p>
      </div>
      <van-button type="primary" class="btn" color="#d04443">关注</van-button>
    </div>
    <div class="attention">
      <span class="s1">关注</span>
      <span class="s2">3w</span>
      <span class="s1">粉丝</span>
      <span class="s2">999</span>
      <span class="s1">员工</span>
      <span class="s2">3254</span>
    </div>
    <div class="photo">
      <img
        src="../../components/img1/01bf105cd8e4e6a801214168328397.jpg@1280w_1l_2o_100sh (1).png"
        alt
      />
      <img
        src="../../components/img1/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh(1).png"
        alt
      />
      <img
        src="../../components/img1/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh(1).png"
        alt
      />
    </div>
    <div class="adress">
      <div class="time">
        <span class="s1">营业时间</span>
        <span class="s2">周一至周日 06:30-20:00</span>
      </div>
      <div class="shopadress">
        <span class="s1">店铺地址</span>
        <span class="s2">北京市海淀区上地十街10号百度大厦</span>
      </div>
      <img src="../../components/img1/电话.png" alt />
    </div>
    <div class="bottom">
      <div class="biao">
        <p>商品</p>
        <p class="p1">幸运大转盘</p>
        <p>优惠</p>
      </div>
      <div class="sort">
        <p>高端系</p>
      </div>
      <div class="model">
        <div class="left">
          <img src="../../components/img1/201909270609595d8de0ab5d18a(1).png" alt />
          <p class="p1">收纳袋子大号装衣物被子</p>
          <p class="p1">搬家行李打包</p>
          <button class="b1">自提</button>
          <button class="b2">物流配送</button>
          <div class="price">
            <p class="p2">￥</p>
            <p class="p3">1299</p>
          </div>
        </div>
        <div class="left">
          <img src="../../components/img1/201909270609595d8de0ab5d18a(1).png" alt />
          <p class="p1">收纳袋子大号装衣物被子</p>
          <p class="p1">搬家行李打包</p>
          <button class="b1">自提</button>
          <button class="b2">物流配送</button>
          <div class="price">
            <p class="p2">￥</p>
            <p class="p3">1299</p>
          </div>
        </div>
      </div>
    </div>
    <div class="vip">
      <img src="../../components/img1/会员.png" alt />
      <button>店铺会员</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "shophome",
  data() {
    return {
      value: 4,
    };
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
.shophome {
  .top {
    display: flex;
    position: relative;
    .left {
      img {
        width: 0.6rem;
        margin: 0.75rem 0rem 0rem 0.3rem;
      }
    }
    .right {
      width: 80%;
      height: 1rem;
      background-color: #f2f2f2;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      img {
        width: 0.6rem;
        margin: 0.2rem 0rem 0rem 2.5rem;
      }
      input {
        width: 3rem;
        height: 0.6rem;
        position: absolute;
        left: 4.5rem;
        top: 0.65rem;
        outline: none;
        border: none;
        background-color: #f2f2f2;
      }
    }
  }
  .shop {
    display: flex;
    .icon {
      img {
        width: 1.5rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
    }
    .name {
      position: relative;
      .brand {
        color: #212121;
        font-size: 0.45rem;
        font-weight: 500;
        font-family: Source Han Sans CN;
        margin: 0.5rem 0rem 0rem 0.2rem;
      }
      .rate {
        margin: 0.2rem 0rem 0rem 0.2rem;
      }
      .grade {
        color: #fabf50;
        font-size: 0.4rem;
        display: inline-block;
        margin-left: 0.1rem;
      }
    }
    .btn {
      margin: 0.5rem 0rem 0rem 1.8rem;
      border-radius: 0.1rem;
    }
  }
  .attention {
    margin: 0.5rem 0rem 0rem 0.3rem;
    .s1 {
      color: #747474;
      margin-left: 0.2rem;
    }
    .s2 {
      color: #3d3d3d;
      font-size: 0.5rem;
      margin-left: 0.2rem;
      font-weight: bold;
    }
  }
  .photo {
    display: flex;
    margin: 0.5rem 0rem 0rem 0.3rem;
    img {
      width: 3.8rem;
      height: 2.5rem;
      margin-left: 0.2rem;
    }
  }
  .adress {
    margin: 0.5rem 0rem 0rem 0.3rem;
    position: relative;
    .s1 {
      color: #676767;
      font-size: 0.4rem;
    }
    .s2 {
      color: #1f1f1f;
      font-weight: bold;
      margin-left: 0.2rem;
    }
    img {
      width: 1rem;
      position: absolute;
      right: 0.2rem;
      top: 0;
    }
  }
  .bottom {
    background-color: #f5f6f8;
    .biao {
      display: flex;
      margin-top: 0.5rem;
      border-bottom: 1px solid #dbdbdb;
      padding-bottom: 0.3rem;
      padding-top: 0.3rem;
      p {
        font-size: 0.45rem;
        margin-left: 0.3rem;
      }
      .p1 {
        color: #ffffff;
        background: #d04443;
        border-radius: 0.5rem;
        width: 3.2rem;
        height: 0.8rem;
        text-align: center;
      }
    }
    .sort {
      p {
        border-left: 2.5px solid #d04443;
        margin: 0.5rem 0rem 0rem 0.5rem;
        height: 0.4rem;
        padding-left: 0.2rem;
        font-weight: bold;
        font-size: 0.4rem;
        opacity: 1;
        line-height: 0.4rem;
      }
    }
    .model {
      display: flex;
      justify-content: space-around;
      img {
        width: 5rem;
      }
      .p1 {
        font-weight: bold;
        color: #282828;
        margin-left: 0.5rem;
      }
      button {
        outline: none;
        border: none;
        border: 1px solid #d04443;
        color: #d04443;
        background-color: #f5f6f8;
        margin-top: 0.1rem;
      }
      .b1 {
        margin-left: 0.5rem;
      }
      .b2 {
        margin-left: 0.2rem;
      }
      .price {
        margin: 0.4rem 0rem 0rem 0.3rem;
        .p2 {
          color: #d04443;
          display: inline-block;
        }
        .p3 {
          display: inline-block;
          color: #d04443;
          font-size: 0.5rem;
          font-weight: bold;
          padding-bottom: 0.5rem;
        }
      }
    }
  }
  .vip {
    position: relative;
    background-color: #f5f6f8;
    button {
      width: 100%;
      height: 1.5rem;
      background-color: #fabf50;
      border-top-right-radius: 0.3rem;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 0.45rem;
    }
    img {
      width: 0.5rem;
      position: absolute;
      left: 3.5rem;
      top: 0.5rem;
    }
  }
}
</style>