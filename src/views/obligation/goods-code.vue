<template>
  <div class="goods-code">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1"  @click="back()"/>
      <p class="p1">订单提货凭证</p>
    </div>
    <div class="content">
      <p class="p1">{{ data.ent_name }}</p>
      <p class="p2">提货点</p>
      <p class="p3">未核销</p>
    </div>
    <div class="adress">
        <div class="address-info">
          <img src="../../components/img1/dingwei.png" alt="">
          <p class="p1">{{ data.product_invite.pinv_city }} {{ data.product_invite.pinv_district }} {{ data.product_invite.pinv_addres }}</p>
        </div>
        <p class="p2"><van-icon name="arrow" /></p>
    </div>
    <div class="phone">
        <img src="../../components/img1/dianhua.png" alt="">
        <p>{{ data.product_invite.pinv_phone }}</p>
    </div>
    <div class="center">
        <vue-qr :text="orderNumber"></vue-qr>
        <p>提货码：{{ data.order_number }}</p>
        <p>提示：长按保存二维码</p>
    </div>
    <div class="date">
        <p>有效期：{{ data.order_paytime }} 至 {{ data.order_expirationtime }}</p>
    </div>

  </div>
</template>

<script>
import vueQr from 'vue-qr';
import { Icon } from 'vant';
export default {
  data() {
    return {
      data: {},
      orderNumber: ''  
    }
  },
  created() {
    if(this.$route.query.data) {
      this.data = JSON.parse(this.$route.query.data)
      console.log(this.data)
    }

    this.orderNumber = "http://wechat.lejiagx.cn/merchant/#/Ordercancellation?orderNumber="+this.data.order_number;
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
.goods-code {
  .top {
    display: flex;
    margin-top: 0.5rem;
    padding-bottom: 0.3rem;
    background-color: #ffffff;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 2.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .content {
    display: flex;
    position: relative;
    margin: 0.5rem 0rem 0rem 0.5rem;
    .p1 {
      font-size: 0.5rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
    }
    .p2{
        width: 1.2rem;
        height: 0.5rem;
        text-align: center;
        color: #D04443;
        border: 1px solid #D04443;
        border-radius: 0.1rem;
        font-size: 0.3rem;
        margin: 0.15rem 0rem 0rem 0.2rem;
    }
    .p3{
        position: absolute;
        color: #D04443;
        right: 5%;
        font-size:0.4rem;

    }
  }
  .adress{
      display: flex;
      margin: 0.5rem 0rem 0.5rem 0.5rem;
      justify-content: space-between;
      .address-info {
        display: flex;
        flex: 1;
      }
      img{
          width: 0.45rem;
          height: 0.45rem;
          margin-top: 0.1rem;
      }
      .p1{
          font-size: 0.42rem;
          margin-left: 0.1rem;
          color: #242424;
      }
      .p2{
          margin-right: 5%;
          font-size: 0.5rem;
          color: #838383;
      }
  }
  .phone{
      display: flex;
      margin: 0.2rem 0rem 0rem 0.5rem;
      img{
          width: 0.45rem;
          height: 0.45rem;
      }
      p{
          color: #313131;
          font-size: 0.4rem;
          margin-left: 0.1rem;

      }
  }
  .center{
      img{
          width: 6rem;
          margin: 0.8rem 0rem 0rem 2rem;
      }
      p{
          font-size: 0.45rem;
          margin-top: 0.3rem;
          text-align: center;
      }
      p:nth-last-of-type(1) {
        color: #D04443;
        font-size: 14px;
      }
      button{
          background-color: #ffffff;
          border: none;
          border:1px solid rgba(197,197,197,1);
          width: 2.5rem;
          height: 1.2rem;
          color: #383838;
          margin-top: 0.5rem;
          margin-left: 50%;
          transform: translate(-50%);
          border-radius: 0.1rem;
      }
  }
  .date{
      color:#383838 ;
      border-bottom: 1px solid #E1E1E1;
      border-top:1px solid #E1E1E1;
      margin-top: 0.5rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      p{
          text-align: center;
      }
  }
}
</style>