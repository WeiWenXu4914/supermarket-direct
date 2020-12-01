<template>
  <div class="booking">
    <div v-if="this.newblistInfo.length >= 1">
      <div class="cir" v-for="(item,index) in newblistInfo" :key="index">
        <p class="title1">{{item.pro_name}}</p>
        <div class="body1" @click="toDetail(item)">
          <div class="body1_1">
            <van-icon name="passed" size="30" color="#93DA9C" />
            <div class="right">
              <p class="p1">预约中</p>
            </div>
          </div>
          <div class="body1_2"></div>
          <div class="body1_3" style="padding-bottom: 10px;">
            <p class="phone">手机号：<span>{{item.service_phone}}</span></p>
            <van-icon name="phone-circle-o" size="30" color="#93DA9C" />
          </div>
        </div>
      </div>
    </div>
    <van-empty description="暂无预约中订单~" v-else />
  </div>

</template>

<script>
import { myReservation } from "@/views/detail/actions";
import { Toast } from 'vant';
export default {
  name: "booking",
  data(){
    return{
      pro_id: '',
      type: 1,
      blistInfo:[],
      newblistInfo:[],
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
  watch: {
    blistInfo:function() {
      this.$nextTick(function(){
        // 页面渲染完延时关闭
        setTimeout(function(){
          Toast.clear();
        },200)
      })
    }
  },
  created() {
    this.getmyReservation();
  },
  methods:{
    //预约信息
    getmyReservation(){
      myReservation().then((res) => {
        this.blistInfo = res.data;
        for(let i=0;i<this.blistInfo.length;i++){
          if(this.blistInfo[i].oa_state==0){
            this.newblistInfo.push(this.blistInfo[i])
          }
        }
      })
    },
    toDetail(item) {
      let data = JSON.stringify(item);
      this.$router.push({
        path: '/recordDetail',
        query: {
          data
        }
      })
    },
  }
}
</script>

<style lang="less">
.booking{
  .tishi{
    display: flex;
    justify-content: center;
    margin-top: 260px;
  }
}
</style>
