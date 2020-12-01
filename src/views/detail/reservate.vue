<template>
  <div class="reservate">
    <div class="mytitle">
      <van-row>
        <van-col span="8" class="icon">
          <van-icon name="arrow-left" size="20" @click="back"/>
        </van-col>
        <van-col span="8" class="text">{{pro_name}} 预约</van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>
    <div class="body">
      <van-field v-model="name" label="预约人：" maxlength="30" placeholder="请输入姓名" />
      <van-field name="stepper" label="商品个数：" v-if="goodsData != ''">
        <template #input>
          <van-stepper v-model="goodsData.buyNum" />
        </template>
      </van-field>
      <van-field v-model="phone" label="手机号：" maxlength="11" placeholder="请输入电话" />
      <van-field v-model="goodsData.messages" label="留言：" maxlength="200" placeholder="请输入留言" />
      <van-cell >
        <div class="body2_down">
          <p class="tit2" v-if="site != null">
            <van-icon name="location" />
            {{ this.site.ent_province }}
            {{ this.site.ent_city }}
            {{ this.site.ent_district }}
            {{ this.site.ent_detailed_site }}
          </p>
          <van-icon name="arrow" />
        </div>
      </van-cell>
    </div>
    <div class="btn">
      <button @click="yuyue(pro_id,addid)">立即预约</button>
    </div>
  </div>
</template>

<script>
import { bookingOrder, entAddress, entProductDetail } from './actions/index'
import { mapState, mapMutations } from 'vuex'
import { Notify, Toast } from 'vant'
export default {
  data(){
    return {
      goodsData:'',
      site: ''
    }
  },
  computed:{
    ...mapState(['user','userMapLoacl']),
  },
  created() {

    this.name = this.user.name
    this.phone = this.user.phone
    
    if(this.$route.query.res){
      this.goodsData = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
    }

    this.getentAddress();
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    //获取商家地址
    getentAddress(){
      entAddress(this.goodsData.entid)
      .then((res) => {
          this.site = res.data;
          if(res.data == null) {
            Toast("商家地址出错，该商品无法预约");
            setTimeout(() => {
              this.$router.go(-1);
            },2000)
          }
      }).catch((e) => {
        console.log(e)
      })

    },
    //预约
    yuyue(){
      
      if (this.name == ""){
        this.$toast.fail("预约人不能为空!");
        return;
      }

      let reg = /^1[3456789]\d{9}$/;
      if (this.phone == "" && !reg.test(this.phone)){
        this.$toast.fail("请输入正确的手机号!");
        return;
      }

      if (this.num == "" || this.pro_id == ""){
        this.$toast.fail("参数错误!");
        return;
      }

      if(!this.site){
        Toast("商家地址出错，该商品无法预约");
        return false;
      }

      var ent = {
        name: this.name,
        phone: this.phone,
        pro_id: this.goodsData.goodsId,
        num:this.goodsData.buyNum,
        remark:this.goodsData.messages
      }
      
      bookingOrder(ent).then((res) =>{

        if(res.code== 100){
          Notify({ type: 'success', message: '提交成功'});
          this.$router.push({
            path: '/appointment',
            query:{
              pro_id: this.goodsData.goodsId,
              pro_name: this.goodsData.goodsName
            },
          })
        }else {
          Toast(res.msg);
        }
      })
    }
  }
}
</script>

<style lang="less">
.reservate{
  width: 95%;
  margin: 0 auto;
}
.mytitle{
  margin-top: 15px;
  .icon{
    height: 25px;
    display: flex;
    align-items: center;
  }
  .text{
    font-weight: 550;
    font-size: 18px;
    text-align: center;
  }
}
.body{
  margin-top: 20px;
  .van-cell{
    padding: 10px 0px;
  }
  span{
    font-weight: 600;
  }
  input{
    border: 0;
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
.btn{
  text-align: center;
  position: fixed;
  bottom: 10px;
  width: 96%;
  button{
    border: 0;
    border-radius: 3px;
    height: 45px;
    width: 96%;
    background-color: #D04443;
    color: white;
    font-size: 17px;
  }
}
</style>
