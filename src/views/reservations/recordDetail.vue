<template>
  <div class="goods-code">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1"  @click="back()"/>
      <p class="p1">预约详情</p>
    </div>
    <div class="content" @click.stop="userHandle">
      <p class="p1">{{ dataInfo.oa_name }}</p>
      <p class="p2">店铺</p>
    </div>
    <div class="goods-card">
      <van-card
        :num="dataInfo.oa_num"
        :price="dataInfo.pro_price"
        :title="dataInfo.pro_name"
        :thumb="dataInfo.pro_thumbnail"
      />
    </div>
    <div class="adress">
        <div class="address-info">
          <img src="../../components/img1/dingwei.png" alt="">
          <p class="p1">{{ dataInfo.ent_province }}  {{ dataInfo.ent_city }} {{ dataInfo.ent_district }} {{ dataInfo.ent_detailed_site }}</p>
        </div>
        <p class="p2"><van-icon name="arrow" /></p>
    </div>
    <div class="phone">
        <img src="../../components/img1/dianhua.png" alt="">
        <p><a :href="'tel:'+dataInfo.service_phone">{{ dataInfo.service_phone }}</a></p>
    </div>
    <h4>预约码</h4>
    <div class="center">
        <vue-qr :text="dataInfo.oa_order_number"></vue-qr>
    </div>
    <div class="date">
        <p>有效期：{{ dataInfo.oa_addtime }} 至 {{ dataInfo.out_time }}</p>
    </div>

  </div>
</template>

<script>
import vueQr from 'vue-qr';
import { Icon, Toast } from 'vant';
import { AppointmentOrderDetail } from './actions/index';
export default {
  data() {
    return {
      dataInfo: {}  
    }
  },
  beforeCreate() {
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
			overlay: true,
			duration:0
		});
  },
  created() {
    if(this.$route.query.data) {
      let data = JSON.parse(this.$route.query.data)
        AppointmentOrderDetail(data.oaid)
        .then((res) => {
            this.dataInfo = res.data;
            Toast.loading({
                duration: 1
            });
        })
        .catch(() => {
            Toast("请求出错");
        })
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    userHandle() {

        var obj = {
          entid: this.dataInfo.mem_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
    },
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
      margin-left: 3.2rem;
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
          color: blue;
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
      margin-top: 1rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      p{
          text-align: center;
      }
  }
  h4 {
      font-size: 18px;
      padding-top: 0.3rem;
      margin-left: 5%;
  }
  .goods-card {
    width: 97%;
    margin: 10px auto;
  }
}
</style>