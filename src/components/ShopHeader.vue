<template>
  <div class="shopheader">
    <div class="top">
      <div class="left">
        <img src="../components/img1/返回.png"  @click="back()"/>
      </div>
      <div class="right">
        <img src="../components/img1/搜索.png" alt />
        <input type="text" name id placeholder="在店铺内搜索" />
      </div>
    </div>
    <div class="shop">
      <div class="icon">
        <img src="../components/img1/928cedf0031246aeb20eae5d7b6eaa95.png" alt />
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
      <van-button type="primary" class="btn" color="#d04443" >关注</van-button>
    </div>
    <div class="photo">
      <img
        src="../components/img1/01bf105cd8e4e6a801214168328397.jpg@1280w_1l_2o_100sh (1).png"
        alt
      />
      <img src="../components/img1/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh(1).png" alt />
      <img src="../components/img1/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh(1).png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "shopheader",
  data() {
    return {
      value:4
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
.shopheader {
  .top {
    display: flex;
    position: relative;
    .left {
      img {
        width: 0.6rem;
        margin: 0.75rem 0rem 0rem 0.5rem;
      }
    }
    .right {
      width: 80%;
      height: 1rem;
      background-color: #f2f2f2;
      margin: 0.5rem 0rem 0rem 0.5rem;
      img {
        width: 0.7rem;
        margin: 0.2rem 0rem 0rem 2.5rem;
      }
      input {
        width: 3rem;
        height: 0.6rem;
        position: absolute;
        left: 4.8rem;
        top: 0.75rem;
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
      margin: 0.6rem 0rem 0rem 1.8rem;
      border-radius: 0.1rem;
      height: 0.8rem;
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
}
</style>