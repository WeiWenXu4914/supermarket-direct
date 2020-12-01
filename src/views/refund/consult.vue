<template>
  <div class="consult">
    <div class="top">
      <img src="../../components/img1/返回.png" alt @click="back()" />
      <p class="p1">协商历史</p>
    </div>
    <div class="center">
      <div class="list">
        <div class="model">
          <div class="left">
            <img src="../../components/img1/webp.webp-(8).png" alt />
          </div>
          <div class="right">
            <p class="p1">克鲁斯堡</p>
            <p class="p2">2020-05-10 18:22:15</p>
          </div>
        </div>
        <p class="agree">商家同意，退款给买家 288.00 元。</p>
      </div>
      <div class="list">
        <div class="model">
          <div class="left">
            <img src="../../components/img1/webp.webp-(8).png" alt />
          </div>
          <div class="right">
            <p class="p1">克鲁斯堡</p>
            <p class="p2">2020-05-10 18:22:15</p>
          </div>
        </div>
        <p class="agree">商家拒绝了本次退款。拒绝原因：商品退回来后才能退款，拒绝说明：没收到货，仓库收到货确认无误后立即安排退款。</p>
        <div class="photo">
            <img src="../../components/img1/webp.webp (9).png" alt="">
            <img src="../../components/img1/webp.webp (9).png" alt="">
        </div>
      </div>
      <div class="list" style="border:none;padding-bottom:1.5rem">
        <div class="model">
          <div class="left">
            <img src="../../components/img1/webp.webp-(8).png" alt />
          </div>
          <div class="right">
            <p class="p1">克鲁斯堡</p>
            <p class="p2">2020-05-10 18:22:15</p>
          </div>
        </div>
        <p class="agree">修改了仅退款申请，货物状态：未收到货，原因：其他，金额：288.00元。说明：无</p>
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
.consult {
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
  .center {
    .list {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 0.5rem;
      .agree {
        width: 90%;
        margin: 0.3rem 0rem 0rem 0.5rem;
        font-size: 0.45rem;
      }
      .photo{
          margin-top: 0.5rem;
          img{
              width: 3rem;
              height: 3rem;
              margin-left: 0.5rem;
          }
      }
      .model {
        display: flex;
        margin: 1rem 0rem 0rem 0.5rem;
        .left {
          img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.1rem;
          }
        }
        .right {
          margin: 0rem 0rem 0rem 0.3rem;
          .p1 {
            color: #2f2f2f;
            font-size: 0.45rem;
            font-weight: bold;
          }
          .p2 {
            color: #7b7b7b;
            font-size: 0.45rem;
            margin-top: 0.2rem;
          }
        }
      }
    }
  }
}
</style>