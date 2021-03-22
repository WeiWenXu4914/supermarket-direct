<template>
  <div class="payment">
    <!-- <div class="top">
      <p @click="$router.push('/agora')"><van-icon name="cross" /></p>
    </div> -->
    <div class="content">
      <img src="../../components/img1/空心对勾.png" alt />
      <p>支付成功</p>
    </div>
    <div class="center">
        <p>订单编号：{{ $route.query.resNumber }}</p>
        <p>下单时间：{{ $route.query.resTime }}</p>
        <p>支付方式：微信支付</p>
    </div>
    <div class="btn">
        <button @click="toDetail">前往订单查看提货凭证</button>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  methods: {
    toDetail() {
            let item = {
              order_number: this.$route.query.resNumber
            }
            let data = JSON.stringify(item);
          //   this.$router.push({
          //       path: "/goodsdetail",
          //       query: {
          //           data
          //       }
          // })
          this.$router.push({
            path: '/all',
            query: {
              state: 0,
              route: true
            }
          })
      },
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.payment {
  .top {
    margin: 0.5rem 0rem 0rem 0.3rem;
    p {
      font-size: 0.7rem;
      color: #242424;
    }
  }
  .content{
      img{
          width: 1.5rem;
          height: 1.5rem;
          margin-left: 50%;
          transform: translate(-50%);
      }
      p{
          color:#2F2F2F;
          font-size:0.6rem;
          margin: 0.2rem 0rem 0rem 3.8rem;
      }
  }
  .center{
      margin: 1.5rem 0rem 0rem 0.5rem;
      p{
          font-size: 0.45rem;
          color: #313131;
          margin-top: 0.3rem;
      }
  }
  .btn{
      margin: 2rem auto;
      text-align: center;
      button{
          color: #242424;
          width: 5rem;
          height: 1rem;
          border: none;
          outline: none;
          background-color: #f1f1f1;
          border: 1px solid #C5C5C5;
          border-radius: 0.1rem;
          font-size: 0.4rem;
      }
  }
}
</style>