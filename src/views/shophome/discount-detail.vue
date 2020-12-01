<template>
  <div class="discount-detail">
    <div class="top">
      <img src="../../components/img1/返回.png" alt @click="back()" />
      <p class="p1">优惠劵详情</p>
    </div>
    <div class="zong">
      <div class="center">
        <div class="title">
          <img src="../../components/img1/928cedf0031246aeb20eae5d7b6eaa95.png" alt />
          <p>Adidas 阿迪达斯</p>
        </div>
        <div class="name">
          <p class="p1">100元全店通用卷</p>
          <p class="p2">100</p>
          <p class="p3">满600元使用</p>
          <p class="p4">有效期:2020.04.26 00:00-2020.05.25 23:59</p>
          <button class="b1">立即使用</button>
          <div class="ewm">
            <img src="../../components/img1/二维码@2x.png" alt class="erweima" />
            <p class="p5">点击此处出示销核码</p>
          </div>
        </div>
        <div class="inp">
          <div class="list">
            <p class="p1">转赠好友</p>
            <p class="p2">></p>
          </div>
          <div class="list">
            <p class="p1">店铺主页</p>
            <p class="p2">></p>
          </div>
          <div class="list" style="border:none">
            <p class="p1">使用须知</p>
            <p class="p2">></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "discount-detail",
  data() {
    return {};
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
.discount-detail {
  background-color: #d04443;
  height: 97.2%;
  .top {
    display: flex;
    margin: 0.5rem 0rem 0rem 0rem;
    background-color: #ffffff;
    padding-bottom: 0.3rem;
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
      font-weight: 600;
    }
  }
  .zong {
    padding-top: 0.2rem;
    .center {
      width: 89%;
      margin-left: 0.5rem;
      margin-top: 0.5rem;
      background-color: #ffffff;
      padding-top: 0.1rem;
      padding-bottom: 0.5rem;
      .title {
        display: flex;
        margin: 0.5rem 0rem 0rem 0.3rem;
        border-bottom: 2px dotted #707070;
        // padding-bottom: 0.5rem;
        width: 90%;
        img {
          width: 1rem;
          height: 1rem;
        }
        p {
          font-size: 0.4rem;
          color: #212121;
          font-weight: bold;
          margin: 0.1rem 0rem 0rem 0.2rem;
        }
      }
      .name {
        .p1 {
          text-align: center;
          font-size: 0.4rem;
          color: #3b3b3b;
          margin-top: 1rem;
        }
        .p2 {
          text-align: center;
          color: #242424;
          font-size: 1rem;
          font-weight: bold;
        }
        .p3 {
          text-align: center;
          color: #3b3b3b;
          font-size: 0.4rem;
        }
        .p4 {
          text-align: center;
          font-size: 0.4rem;
          color: #3b3b3b;
          margin-top: 0.2rem;
        }
        .b1 {
          width: 5.5rem;
          height: 1.2rem;
          border-radius: 0.5rem;
          color: #ffffff;
          background-color: #d04443;
          border: none;
          outline: none;
          margin-top: 0.8rem;
          margin-left: 20%;
        }
        .ewm {
          .erweima {
            width: 0.35rem;
            margin: 0.8rem 0rem 0rem 2.5rem;
          }
          .p5 {
            display: inline-block;
            color: #d04443;
            font-size: 0.4rem;
            margin-left: 0.2rem;
          }
        }
      }
      .inp {
        margin-top: 1rem;
        .list {
          width: 90%;
          border-bottom: 1px solid #dcdcdc;
          margin: 0.5rem 0rem 0rem 0.5rem;
          padding-bottom: 0.3rem;
          
          .p1 {
            display: inline-block;
            color: #303030;
            font-weight: 400;
          }
          .p2 {
            display: inline-block;
            margin-left: 6rem;
            color: #838383;
          }
        }
      }
    }
  }
}
</style>