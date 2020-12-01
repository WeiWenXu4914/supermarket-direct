<template>
  <div class="cancel">
    <div v-if="this.newClistInfo.length >= 1">
      <div class="cir" v-for="(item,index) in newClistInfo" :key="index">
        <p class="title1">{{item.pro_name}}</p>
        <div class="body1">
          <div class="body1_1">
            <van-icon name="passed" size="30" color="#D04443" />
            <div class="right">
              <p class="p1">取消成功</p>
            </div>
          </div>
          <div class="body1_2"></div>
          <div class="body1_3" style="padding-bottom: 10px;">
            <p class="phone">手机号：<span>{{item.service_phone}}</span></p>
            <van-icon name="phone-circle-o" size="30" color="#93DA9C" />
          </div>
         <!-- <button class="qx" @click="reyy">重新预约</button> -->
        </div>
      </div>
    </div>
    <van-empty description="暂无取消订单~" v-else />
  </div>

</template>

<script>
import { myReservation } from "@/views/detail/actions";

export default {
  name: "cancel",
  data(){
    return{
      pro_id: '',
      type: 1,
      ClistInfo:[],
      newClistInfo:[],
    }
  },
  created() {
    this.getmyReservation();
  },
  methods:{
    reyy(){
    },
    //取消预约信息
    getmyReservation(){
      myReservation().then((res) => {
        this.ClistInfo = res.data;
        for(let i=0;i<this.ClistInfo.length;i++){
          if(this.ClistInfo[i].oa_state==4){
            this.newClistInfo.push(this.ClistInfo[i])
          }
        }
      })
    },
  }
}
</script>

<style lang="less">
.cancel{
  .tishi{
    display: flex;
    justify-content: center;
    margin-top: 260px;
  }
}
</style>
