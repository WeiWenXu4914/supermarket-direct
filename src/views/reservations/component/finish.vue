<template>
  <div class="finish">
    <div v-if="this.newflishInfo.length >= 1">
      <div class="cir" v-for="(item,index) in newflishInfo" :key="index">
        <p class="title1">{{item.pro_name}}</p>
        <div class="body1">
          <div class="body1_1">
            <van-icon name="passed" size="30" color="#93DA9C" />
            <div class="right">
              <p class="p1">订单已完成</p>
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
    <van-empty description="暂无已完成订单~" v-else />
  </div>

</template>

<script>
import { myReservation } from "@/views/detail/actions";

export default {
  name: "finish",
  data(){
    return{
      pro_id: '',
      type: 1,
      flishInfo:[],
      newflishInfo:[],
    }
  },
  created() {
    this.getmyReservation();
  },
  methods:{
    //预约信息
    getmyReservation(){
      myReservation().then((res) => {
        this.flishInfo = res.data
        for (let i=0;i<this.flishInfo.length;i++){
          if(this.flishInfo[i].oa_state == 3){
            this.newflishInfo.push(this.flishInfo[i])
          }
        }
      })
    },
  }
}
</script>

<style lang="less">
.finish{
  .tishi{
    display: flex;
    justify-content: center;
    margin-top: 260px;
  }
}
</style>
