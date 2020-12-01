<template>
  <div class="MyAppointment">
    <div class="body1">
      <div class="up">
        <van-icon name="passed" color="#93DA9C" size="25" />
        <span>感谢您的预约</span>
      </div>
      <div class="down">
        <p>商户会为您预留12小时，过时订单作废，请按时到店。</p>
      </div>
    </div>
    <div class="body2">
      <p class="tit1">{{this.pro_name}}【需要预约】</p>
      <div class="body2_down">
        <p class="tit2" v-if="site != ''">
            <van-icon name="location" />
            {{ this.site.ent_province }}
            {{ this.site.ent_city }}
            {{ this.site.ent_district }}
            {{ this.site.ent_detailed_site }}
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="body3"></div>
    <div class="btn">
      <button @click="myrecord">我的预约</button>
    </div>
  </div>
</template>

<script>
import { entAddress } from '../detail/actions/index'
export default {
  data(){
    return{
      snacks:'',
      pro_id: '',
      site: ''
    }
  },
  created() {

    this.pro_id = this.$route.query.pro_id
    this.pro_name = this.$route.query.pro_name
    this.getentAddress();
  },
  methods:{
    //获取商家地址
    async getentAddress(){
      const res = await entAddress(this.pro_id);
      this.site = res.data;
    },
    myrecord(){
      this.$router.replace('record');
    }
  }
}
</script>

<style lang="less">
.MyAppointment{
  .body1{
    height: 200px;
    background-color: #F5F6F8;
    text-align: center;
    line-height: 60px;
    .up{
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 50px;
      font-size: 20px;
      font-weight: 600;
      span {
        margin-left: 5px;
      }
    }
    .down{
      margin-top: 3px;
      display: flex;
      justify-content: center;
      color: #747474;
    }
  }
  .body2{
    width: 90%;
    margin: 0 auto;
    .tit1{
      margin-top: 20px;
      font-weight: 600;
      font-size: 15px;
    }
    .body2_down{
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tit2{
        color: #4F4F4F;
        font-size: 15px;
        .tit3{
          width: 13px;
          margin-right: 3px;
        }
      }
    }
  }
  .body3{
    height: 1px;
    width: 90%;
    margin: 0 auto;
    background-color: #DBDBDB;
    margin-top: 10px;
  }
  .btn{
    //text-align: center;
    button{
      width: 90%;
      margin: 0 auto;
      background-color: #D04443;
      color: white;
      border: 0;
      border-radius: 2px;
      height: 45px;
      font-size: 15px;
      position: absolute;
      bottom: 10px;
      left: 18px;
    }
  }
}
</style>
