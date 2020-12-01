<template>
  <div class="history">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()" />
      <p class="p1">优惠劵历史</p>
    </div>
    <van-tabs v-model="active" swipeable animated line-width="0" title-active-color="#D04442">
      <van-tab title="已使用">
        <div class="center">
          <div v-if="usedList.length > 0">
            <div class="model" v-for="(item,index) in usedList" :key="index">
              <div class="title" @click="userHandle(item.entid)">
                <img :src="item.ent_logo" alt />
                <p>{{ item.ent_name }}</p>
              </div>

              <!-- <div class="photo" v-for="(itm,inx) in item.DiscountCoupon">
                <div class="left">
                  <div class="top" >
                    <p class="top_p1" >{{itm.cou_money}}</p>
                    <p class="top_p2">{{ itm.cou_unit }}</p>
                    <p class="top_p3">{{ itm.cou_num==0?itm.coupon_name:itm.cou_lond }}</p>
                    <p class="top_p4">{{ itm.product_name }}</p>
                  </div>
                  <div class="down">
                    <p>{{ itm.begin_time }} - {{ itm.end_time}}</p>
                  </div>
                </div>
                <div class="right">
                  <p>{{ itm.is_use_name }}</p>
                </div>
              </div> -->


            <div class="kly" v-for="(ite,inde) in item.DiscountCoupon" :key="inde">
              <div class="coupon">
                <div class="sawtooth">
                  <div class="left">
                    <div class="fs11">
                      <p style="color: #d04443; margin: 0">
                        <span style="font-size: 30px" v-if="ite.cou_money >= 1">{{ite.cou_money}}</span>
                        <span style="font-size: 30px" v-else>{{ite.cou_money * 10}}</span>
                        {{ite.cou_unit}}
                        <span style="color: #2a2a2a">
                          满{{ite.cou_num}}元可用
                        </span>
                        {{ite.product_name}}
                      </p>
                    </div>
                    <div class="fs12">
                      <p>{{ite.begin_time}} - {{ite.end_time}}</p>
                    </div>
                  </div>
                  <div class="line" />
                  <div class="right">
                    <div class="ri1">
                      <div class="ri11">
                        <p>已使用</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            </div>
          </div>
          <van-empty v-else description="没有已使用的优惠券" />
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="center">
          <div v-if="timeoutList.length > 0">
            <div class="model" v-for="(item,index) in timeoutList" :key="index">
              <div class="title" @click="userHandle(item.entid)">
                <img :src="item.ent_logo" alt />
                <p>{{ item.ent_name }}</p>
              </div>

              <!-- <div class="photo" v-for="(itm,inx) in item.DiscountCoupon">
                <div class="left">
                  <div class="top" >
                    <p class="top_p1" >{{itm.cou_money}}</p>
                    <p class="top_p2">{{ itm.cou_unit }}</p>
                    <p class="top_p3">{{ itm.cou_num==0?itm.coupon_name:itm.cou_lond }}</p>
                    <p class="top_p4">{{ itm.product_name }}</p>
                  </div>
                  <div class="down">
                    <p>{{ itm.begin_time }} - {{ itm.end_time}}</p>
                  </div>
                </div>
                <div class="right">
                  <p>{{ itm.is_expired_name }}</p>
                </div>
              </div> -->

            <div class="kly" v-for="(ite,inde) in item.DiscountCoupon" :key="inde">
              <div class="coupon">
                <div class="sawtooth">
                  <div class="left">
                    <div class="fs11">
                      <p style="color: #d04443; margin: 0">
                        <span style="font-size: 30px" v-if="ite.cou_money >= 1">{{ite.cou_money}}</span>
                        <span style="font-size: 30px" v-else>{{ite.cou_money * 10}}</span>
                        {{ite.cou_unit}}
                        <span style="color: #2a2a2a">
                          满{{ite.cou_num}}元可用
                        </span>
                        {{ite.product_name}}
                      </p>
                    </div>
                    <div class="fs12">
                      <p>{{ite.begin_time}} - {{ite.end_time}}</p>
                    </div>
                  </div>
                  <div class="line" />
                  <div class="right" @click="golife(item.entid, ite.pro_id, ite.cou_id)">
                    <div class="ri1">
                      <div class="ri11">
                        <p>使用</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
          <van-empty v-else description="没有过期的优惠券" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { myDiscountCoupon } from './actions'
export default {
  data() {
    return {
      couponList:[],
      usedList:[],
      timeoutList: [],
      active:0,
      activeTitle:[
        {
          title:'已使用',
          id:1
        },
        {
          title:'已过期',
          id:2
        }
      ]
    };
  },
  created() {
    this.getmyDiscountCoupon()
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    userHandle (id, couid='') {
      
      var obj = {
        entid: id,
        entfid: 0
      };

      if(couid != ''){
        obj.couid = couid
      }

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: '/merchants/produce',
        query: {res: res}
      })
    },
    getmyDiscountCoupon(){
      myDiscountCoupon(2).then((res) => {

        this.couponList = res.data;

        //分类数据
        this.couponList.forEach((element) => {

          element.DiscountCoupon.forEach((val) => {

            if(val.is_use != 1) {
              this.usedList.push(element);
            }

            if(val.is_expired != 1) {
              this.timeoutList.push(element);
            }

          })

        })
        //数据去重
        this.usedList = Array.from(new Set(this.usedList));
        this.timeoutList = Array.from(new Set(this.timeoutList));
      // console.log(this.usedList,'已使用')
      // console.log(this.timeoutList,'超时')

      })
    },
  },
};
</script>

<style scoped lang="less">
.history {
  /deep/.van-tabs__nav{
    width: 40%;
  }
  /deep/.van-tab__text--ellipsis{
      font-size: 0.45rem;
  }
  /deep/[class*=van-hairline]::after{
      border: none;
      border-bottom: 1px solid rgb(242,242,242);
  }
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
    }
  }
  .biao {
    display: flex;
    margin: 0.2rem 0rem 0rem 0.1rem;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.2rem;
    p {
      font-size: 0.4rem;
      font-weight: 400;
      margin-left: 0.3rem;
    }
    .biao_p1 {
      color: #d04443;
    }
    .biao_p2 {
      color: #292929;
      margin-left: 0.8rem;
    }
  }
  .center {
    .model {
      .title {
        margin: 1rem 0rem 0rem 0.3rem;
        display: flex;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 3px;
        }
        p {
          font-size: 0.4rem;
          color: #212121;
          font-weight: 600;
          margin: 0.1rem 0rem 0rem 0.2rem;
        }
      }
      .photo {
        display: flex;
        margin-top: 0.3rem;
        .left {
          border-radius: 0.15rem;
          width: 60%;
          background-color: #faecec;
          border-top-right-radius: 0.2rem;
          border-bottom-right-radius: 0.2rem;
          margin-left: 0.3rem;
          padding-bottom: 0.5rem;
          .top {
            margin-left: 0.3rem;
            .top_p1 {
              color: #d04443;
              font-size: 0.7rem;
            }
            .top_p2 {
              color: #d04443;
              margin: 0.3rem 0rem 0rem 0.05rem;
            }
            .top_p3 {
              color: #2a2a2a;
              margin-top: 0.3rem;
              margin-left: 0.1rem;
            }
            .top_p4 {
              color: #d04443;
              margin: 0.3rem 0rem 0rem 0.05rem;
            }
          }
          .down {
            margin-left: 0.3rem;
            color: #565656;
            font-size: 0.2rem;
            margin-top: 0.1rem;
          }
        }
        .right {
          border-radius: 0.15rem;
          width: 30%;
          background-color: #faecec;
          border-top-left-radius: 0.2rem;
          border-bottom-left-radius: 0.2rem;
          border-left: 1px dashed #d04443;
          font-weight: 600;
          font-size: 17px;
          p {
            text-align: center;
            color: #d04443;
            padding: 0.9rem 0.5rem 0rem 0.5rem;
          }
        }
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
