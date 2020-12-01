<template>
  <div class="article-list">
    <!-- 关注商家 -->
    <div class="company-item">
      <div class="item-info">
        <div class="avator">
          <img src="../img/userimg.png" alt="" />
        </div>
        <div class="name">
          <p>
            点淘名品屋
            <span class="icon">企业</span>
          </p>
          <span>
            昨天 14：22
          </span>
        </div>
        <div class="buttons" v-if="!isFocus" @click="$router.push('/merchants/fanswelfare')">
            进店逛逛
            <van-icon name="arrow" />
        </div>
      </div>
      <div class="item-grade">
        <span class="xx" v-for="(i,index) in 5" :key="index"><img :src="4 < (index+1) ? xx_n : xx" alt=""></span>
        <span class="num">4.0</span>
      </div>
      <div class="item-title">
        上新3件商品
      </div>
      <div class="item-img">
        <div class="big-img">
          <div class="icon">
            <img src="../img/sx.png" alt="">
          </div>
          <img src="../img/big-img.png" alt="">
          <div class="price">
            ¥50.2
          </div>
        </div>
        <div class="small-img">
          <div class="item" style="margin-bottom:4px">
            <div class="icon">
              <img src="../img/sx.png" alt="">
            </div>
            <img src="../img/small1.png" alt="">
            <div class="price">
              ¥50.2
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="../img/sx.png" alt="">
            </div>
            <img src="../img/small2.png" alt="">
            <div class="price">
              ¥50.2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-merchant',
  props: {
    isFocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      xx: require('../img/xx.png'),
      xx_n: require('../img//xx_n.png')
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style scoped lang='less'>
.company-item {
  box-sizing: border-box;
  padding: 20px 0 0 0;
  border-bottom: 1px solid #eee;
  .item-info {
    display: flex;
    align-items: center;
    height: 34px;
    .avator {
      width: 34px;
      height: 34px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 6px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      flex: 1;
      p {
        font-size: 14px;
        color: #3a3a3a;
        height: 14px;
        padding-bottom: 4px;
      }
      .icon {
        padding: 1px 2px;
        height: 15px;
        border-radius: 2px;
        background: #f3a683;
        font-size: 11px;
        color: #e93c3b;
      }
      span {
        margin-top: -3px;
        font-size: 11px;
        color: #737373;
      }
    }
    .buttons {
      width: 80.5px;
      height: 28.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      border: 1px solid #E93C3B;
      font-size: 14px;
      color: #d04443;
      padding: 0 4px;
    }
  }
  .item-grade{
        display: flex;
        padding-left: 37px;
        span {
            display: flex;
            align-items: center;
        }
        .xx{
            img{
              width: 15px;
              height: 15px;
            }
        }
        .num {
            padding-left: 4px;
            font-size: 13px;
            color: #FABF50;
        }
        align-items: center;
      }
  .item-title {
    font-size: 16px;
    color: #232323;
  }
  .item-img {
    background: #fff;
    display: flex;
    padding: 10px 0 20px 0;
    .big-img{
      width: 224px;
      height: 234px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      background: #F4F4F4;
      border-radius: 2px;
      position: relative;
      img{
        width: 221px;
        height: 206px;
      }
      .icon {
        position: absolute;
        top: -3px;
        left: 0;
        width: 46px;
        height: 15px;
        img{
          margin: 0;
          width: 100%;
          height: 100%;
        }
      }
      .price{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 52.5px;
        height: 23.5px;
        display:flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #FFFFFF;
        background: #575757;
        border: 2px 0 2px 0;
      }
    }
    .small-img{
      margin-left: 4px;
      .item {
        height: 115px;
        background: #f4f4f4;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        position: relative;
        img{
          margin-top: 10px;
          width: 70%;
          height: 65%;
        }
        .icon {
          position: absolute;
          top: -10px;
          left: 0;
          width: 46px;
          height: 15px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .price{
           position: absolute;
          bottom: 0;
          right: 0;
          width: 41px;
          height: 18.5px;
          display:flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #FFFFFF;
          background: #575757;
          border: 2px 0 2px 0;
          opacity: .62;
        }
      }
    }
  }
  .item-handle {
    display: flex;
    justify-content: space-around;
    padding-top: 5px;
    .handle-item {
      width: 90px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 3px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .num {
        font-size: 15px;
        color: #3a3a3a;
      }
    }
  }
}
.job-item {
  box-sizing: border-box;
  padding: 20px 0 0 0;
  border-bottom: 1px solid #eee;
  .job-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-title {
      font-weight: 500;
      font-size: 16px;
      color: #2f2f2f;
    }
    .info-money {
      font-weight: 500;
      font-size: 19px;
      color: #d04443;
    }
  }
  .job-handle {
    p {
      font-size: 14px;
      color: #2f2f2f;
      padding: 2px 0;
    }
    .job-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tags {
        display: flex;
        align-items: center;
        span {
          text-align: center;
          border-radius: 2px;
          margin-right: 5px;
          width: 44px;
          height: 21px;
          background: #ececec;
          font-size: 12px;
          color: #2f2f2f;
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        width: 64px;
        height: 26px;
        background: #d04443;
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .job-user {
    height: 35px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    .user-img {
      width: 35px;
      height: 35px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      font-weight: 500;
      font-size: 13px;
      .time {
        font-size: 11px;
        font-weight: normal;
        color: #737373;
      }
    }
  }
}
.adv-item {
  box-sizing: border-box;
  padding: 15px 0 10px 0;
  display: flex;
  border-bottom: 1px solid #eee;
  .adv-img {
    width: 134px;
    height: 104px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .adv-info {
    flex: 1;
    width: 0;
    .title {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 16px;
      color: #2f2f2f;
      font-weight: 500;
    }
    .desc {
      font-size: 14px;
      color: #808080;
      padding: 3px 0;
    }
    .tags {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 18px;
        padding: 0 3px;
        border-radius: 2px;
        font-size: 13px;
        border: 1px solid #386ff2;
        color: #386ff2;
        margin-right: 6px;
      }
    }
    .money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .money-item {
        font-size: 19px;
        color: #d04443;
        font-weight: 500;
      }
      .time {
        font-size: 11px;
        color: #888888;
      }
    }
  }
}
.plugin {
  box-sizing: border-box;
  padding: 20px 0 0 0;
  .plu-title {
    padding: 10px 0;
    font-size: 16px;
    color: #232323;
    .title-icon {
      width: 66px;
      height: 22px;
      float: left;
      padding-right: 5px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 83%;
      }
    }
  }
  .plu-img {
    background: #f0f0f0;
    .img {
      height: 195px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .txt {
      display: flex;
      font-size: 13px;
      justify-content: space-between;
      padding: 8px 10px;
      .now {
        font-size: 15px;
        color: #d04443;
        font-weight: 400;
      }
    }
  }
  .plu-buttons {
    display: flex;
    justify-content: space-between;
    padding: 10px 3px;
    .tags {
      display: flex;
      align-items: center;
      .tag {
        display: flex;
        align-items: center;
        padding: 1px 3px;
        border-radius: 2px;
        border: 1px solid #e93c3b;
        color: #e93c3b;
        font-size: 12px;
        height: 15px;
        margin-right: 10px;
      }
      .time {
        font-size: 11px;
        color: #737373;
      }
    }
    .more {
      font-size: 12px;
      color: #5c5c5c;
    }
  }
}
</style>
