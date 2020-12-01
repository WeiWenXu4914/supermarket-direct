<template>
  <div class="successful">
    <div v-if="this.newlistInfo.length >= 1">
      <div class="cir" v-for="(item,index) in newlistInfo" :key="index">
        <p class="title1">{{item.pro_name}}</p>
        <div class="body1">
          <div class="body1_1" @click="toDetail(item)">
            <van-icon name="passed" size="30" color="#93DA9C" />
            <div class="right">
              <p class="p1">预约成功</p>
              <p class="p2">请按时到店接收服务，行程有变请及时取消</p>
            </div>
          </div>
          <div class="body1_2"></div>
          <div class="body1_3" @click="getPhone(item.service_phone)">
            <p class="phone">手机号：<span>{{item.service_phone}}</span></p>
            <van-icon name="phone-circle-o" size="30" color="#93DA9C" />
          </div>
          <button class="qx" @click="qxyy">取消预约</button>
        </div>
      </div>
    </div>
    <van-empty description="暂无预约商品~" v-else />
  </div>

</template>

<script>
import {cancel, myReservation} from "@/views/detail/actions";
import {Toast} from "vant";

export default {
name: "successful",
  data(){
  return{
      pro_id: '',
      type: 1,
      listInfo:[],
    newlistInfo:[],
    oa_state:''
  }
  },
  created() {
    this.getmyReservation();
  },
  methods:{
    getPhone(res){
      window.location.href = 'tel:'+ res
    },
    //预约信息
    getmyReservation(){
      myReservation().then((res) => {
        this.listInfo = res.data;
        for(let i=0;i<this.listInfo.length;i++){
          if(this.listInfo[i].oa_state==1){
            this.newlistInfo.push(this.listInfo[i])
          }
        }
      }).catch(() => {
      })
    },
    qxyy(i){
      //取消预约
      let ent = {
        id : this.newlistInfo[0].oaid,
        type: this.type
      }
      console.log(ent,'ent')
      cancel(ent).then((res) => {
        Toast('取消成功');
        this.getmyReservation();
      }).catch(() => {

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
.successful{
  .tishi{
    display: flex;
    justify-content: center;
    margin-top: 260px;
  }
}
</style>
