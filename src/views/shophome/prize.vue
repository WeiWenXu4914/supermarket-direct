<template>
  <div class="prize">
    <div class="top">
      <img src="../../components/img1/返回.png" alt  @click="back()"/>
      <p class="p1">我的奖品</p>
      <p class="p2">已领取</p>
    </div>
    <!--积分-->
    <div class="integral-item">

    </div>

    <!--优惠券-->
    <!-- <div class="preferential-item" v-for="(item,index) in preferentialList" :key="index">
        <span>
          {{ item.apr_name }}
        </span>
        <span>
          立减 <h4>{{ item.prize_grade }}</h4> 元 ！
        </span>
        <p>{{ item.start_time }} - {{ item.end_time }}</p>
    </div> -->

            <div class="kly" v-for="(ite,inde) in preferentialList" :key="inde">
                <div class="coupon">
                    <div class="sawtooth">
                    <div class="left">
                        <div class="fs11">
                        <p style="color: #d04443; margin: 0">
                            <span style="font-size: 20px">{{ ite.prizeVal.apr_name }}</span>
                            {{ ite.prizeVal.couponItem.coupon_name }}
                        </p>
                        </div>
                        <div class="fs12">
                        <p>{{ite.start_time}} - {{ite.end_time}}</p>
                        </div>
                    </div>
                    <div class="line" />
                    <div class="right" @click="golife(ite)">
                        <div class="ri1">
                        <div class="ri11">
                            <p>领取</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
             </div>

    <!--奖品列表-->
    <div class="prize-item" v-for="(item,index) in prizeList" :key="index">
        <div class="left">
            <img :src="item.photo_url" alt="">
            <div class="text">
                <h4>{{ item.apr_name }}</h4>
                <!-- <p>兑奖时间: {{ item.start_time }} - {{ item.end_time }}</p> -->
                <p>兑奖时间: {{ time(item.start_time) }} - {{ time(item.end_time) }}</p>
            </div>
        </div>
        <div class="right" @click="toDetail(item.prize_grade)">
            <p>兑奖码</p>
        </div>
    </div>
    <van-empty description="您未获得任何奖品" v-show="dataList.length === 0"/>
  </div>
</template>

<script>
import { Toast, Empty } from 'vant';
import { myActivity, discountCouponOperate } from './actions/index'

export default {
  data() {
      return {
          dataList: [],
          //积分
          integralList: [],
          //优惠劵
          preferentialList: [],
          //奖品
          prizeList: []
      }
  },
beforeCreate() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 0,
    });
  },
  created() {
        let entid = this.$route.query.entid;
        myActivity(entid)
        .then((res) => {
            console.log(res)
            Toast.loading({
                duration: 1,
            });
            if(res.code == 100) {
               
                let dataListAll = res.data;

                dataListAll.forEach(element => {
                    if(element.amr_status === 1) {
                        this.dataList.push(element)
                    }
                });

            }

            this.dataList.forEach((element) => {
                if(element.apt_id === 2) {
                    this.prizeList.push(element)
                }
            })
           
            this.dataList.forEach((element) => {
                if(element.apt_id === 3) {
                    this.preferentialList.push(element)
                }
            })
            this.dataList.forEach((element) => {
                if(element.apt_id === 1) {
                    this.integralList.push(element)
                }
            })
            console.log(this.preferentialList,'优惠券')

        })
        .catch((err) => {
            Toast("请求出错");
        })
        

        
  },
  methods:{
      back(){
          this.$router.go(-1);
      },
      toDetail(id) {
  
        this.$router.push({
          path: '/award',
          query: { aprid: id}
        })
      },
      time(val) {
          return val.split(' ')[0]
      },
      golife(val) {
        console.log(val)
        discountCouponOperate(val.prizeVal.cou_id)
        .then((res) => {
          if(res.code == 100) {
            Toast("领取成功");
          } else {
            Toast(res.msg);
          }
        })
        .catch((err) => {
          Toast("请求出错");
          console.log(err);
        });
      }
  }
};
</script>

<style scoped lang="less">
.prize {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 600;
      font-family: Source Han Sans CN;
    }
    .p2 {
      margin-left: 2.5rem;
      font-size: 0.4rem;
      margin-top: 0.1rem;
      color: #d04443;
    }
  }

  .preferential-item {
      position: relative;
      display: flex;
      width: 90%;
      height: 60px;
      margin: 20px auto;  
      box-shadow: 0 0 0.05rem #E0E0E0;
      background-color: #FAECEC;
      span:nth-of-type(1) {
          height: 30%;
          margin-left: 5%;
          margin-top: 4%;
          font-size: 16px;
          color: #D04443;
      }
      span:nth-of-type(2) {
          margin-left: 3%;
          margin-top: 3%;
          height: 30%;
          h4 {
              display: inline;
              font-size: 22px;
              color: #D04443;
          }
      }
      span:nth-of-type(3) {
          margin-left: 5%;
          line-height: 100%;
          margin-top: 5%;
          height: 30%;
          color: #D04443;
      }
      p {
          position: absolute;
          height: 30%;
          bottom: 10%;
          left: 5%;
          font-size: 12px;
          color: #ccc;          
      }
  }

  .prize-item {
      display: flex;
      width: 90%;
      height: 87px;
      margin: 20px auto;  
      box-shadow: 0 0 0.16333rem #E0E0E0;
      flex-wrap: nowrap;
      align-items: center;
      .left {
          display: flex;
          flex-wrap: nowrap;
          width: 78%;
          img {
              width: 60px;
              height: 60px;
              margin-left: 10px;
          }
          .text {
              display: flex;
              flex-direction: column;
              margin-left: 5px;
              justify-content: space-around;
              flex-wrap: nowrap;
              h4 {
                  font-family: Source Han Sans CN;
                  font-weight: 550;
                  font-size: 15px;
              }
              p { 
                  text-align: left;
                  transform: scale(0.9);
                  transform-origin: 0 0;
                  // transform: translateX(-0.1%);
                  color: #525252;
                  font-size: 12px;
              }
          }
      }
      
      .right {
          display: flex;
          width: 22%;
          border-left: 1px dashed #d04443;
          font-weight: bold;
          height: 70%;
          align-items: center;
          justify-content: center;
          p {
              color: #D04443;
          }
      }
  }
    .kly {
    display: flex;
    align-items: center;
    .coupon {
      width: 90%;
      height: 80px;
      margin: 0 auto;
      margin-top: 15px;
      border-radius: 10px;
      background: radial-gradient(
            circle at right top,
            transparent 7px,
            #FAECEC 0
          )
          top left / 68% 51% no-repeat,
        radial-gradient(circle at right bottom, transparent 7px, #FAECEC 0)
          bottom left / 68% 51% no-repeat,
        radial-gradient(circle at left top, transparent 7px, #FAECEC 0) top
          right / 32% 51% no-repeat,
        radial-gradient(circle at left bottom, transparent 7px, #FAECEC 0)
          bottom right / 32% 51% no-repeat;

      .sawtooth {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        .left {
          width: 60%;
          margin-left: 10px;
          .fs11 {
            font-size: 13px;
          }
          .fs12 {
            color: #877c7c;
            font-size: 10px;
            margin-top: 5px;
          }
        }
        /* 竖线 */
        .line {
          float: left;
          width: 0.1em;
          height: 64px;
          margin-right: 0em;
          margin-left: 4px; 
          border-left:0.1em dashed #D04443;
        }
        .right {
          width: 25%;
          margin-right: 10px;
          .ri1 {
            color: #d04443;
            display: flex;
            justify-content: center;
            .ri11 {
              font-size: 17px;
            }
          }
          .ri2 {
            color: #d04443;
            margin-top: 5px;
          }
        }
      }
    }
    .fx {
      margin-top: 15px;
      font-size: 13px;
      width: 15%;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>