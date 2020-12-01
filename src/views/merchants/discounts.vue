<template>
  <div class="conponall">
    <div v-if="Coupons.length > 0">
    <div class="kly" v-for="(item,index) in Coupons" :key="index">
      <div class="coupon">
        <div class="sawtooth">
          <div class="left">
            <div class="fs11" v-if="item.cou_money < 1">
              <p style="color: #d04443; margin: 0">
                <span style="font-size: 30px">{{item.cou_money * 10}}</span>
                {{item.cou_unit}}
                <span style="color: #2a2a2a">
                  满{{item.cou_num}}元可用
                </span>
                {{item.product_name}}
              </p>
            </div>
            <div class="fs11" v-else>
              <p style="color: #d04443; margin: 0">
                <span style="font-size: 30px">{{item.cou_money}}</span>
                元减免
                <span style="color: #2a2a2a">
                  满{{ item.cou_num }}元可用
                </span>
                {{item.product_name}}
              </p>
            </div>
            <div class="fs12">
              <p>{{item.begin_time}} - {{item.end_time}}</p>
            </div>
          </div>
          <div class="line" />
          <div class="right">
            <div class="ri1">
              <div class="ri11">
                <p @click="getDrawCoupon(item.cou_id, index)">{{item.userState}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { CouponList , DrawCoupon } from './actions/index.js';
import { Toast } from 'vant';
export default {
  name: 'discounts',
  props: {
    Discounts: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      Coupons: {}
    };
  },
  created() {
    
    this.getCouponList();
  },
  methods: {
    // 优惠券列表接口方法
    getCouponList() {
      CouponList(this.Discounts.entid).then((res) => {
        this.Coupons = res.data;
        // console.log(this.Coupons)
      })
    },
    // 领取优惠券接口
    getDrawCoupon(id, index) {
      DrawCoupon(id).then((res) => {
          if(res.code == 100){
            Toast(res.msg);
            this.Coupons.splice(index, 1);
          }else{
            Toast(res.msg);
          }
      })
    }
  }
};
</script>

<style lang="less">
.conponall {
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