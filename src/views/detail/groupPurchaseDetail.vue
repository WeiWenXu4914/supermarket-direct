<template>
  <div class="detail" @scroll="scroll($event)">
        <van-nav-bar
            title="团购详情"
            left-arrow
            fixed
            :border="false"
            @click-left="back"
            :class="[!barClass ? '' : 'navClassTrue']"
        />
        <div class="lunbo">
            <img :src="data.pro_thumbnail" alt="">
        </div>
        <div class="center">
            <p class="product_desc">{{ data.pro_name }}</p>
            <div class="product_list">
                <div class="pro_name">{{ data.name }}</div>
                <div class="right">
                    <div class="pro_num">已参加团购人数:{{data.group_num}}人</div>
                </div>
                <p>剩余{{ data.num - data.group_num }}人即可团购成功！</p>
            </div>
            <div class="price_all">
                <div class="title">原价</div>
                <div class="monery">
                    {{ data.pro_price * countChoose }}元
                </div>
            </div>
            <div class="price_group">
                <div class="title">团购价</div>
                <div class="monery">
                    {{ data.group_price * countChoose }}元
                </div>
            </div>
        </div>
        <!--已选数量-->
        <div class="chosed" @click="numShow = true">
            <span>已选</span>
            <span>{{ data.name }} {{ countChoose }} 件</span>
            <van-icon class="icon" name="weapp-nav" />
        </div>
        <!--地址-->
        <div class="address" @click="toEditAddress">
            <span>送至</span>
            <span v-if="address.length != 0">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailed_site }}</span>
            <span v-else>您还没有添加默认地址</span>
            <van-icon class="icon" name="arrow" />
        </div>
        <div class="eva">
            <div class="e1">
                <p class="p1">评价100</p>
                <p class="p2">查看全部 <van-icon name="arrow" /></p>
            </div>
            <div class="e2">
                <img src="./img/01987a5d837c0fa8012060bef252eb@2x.png" alt class="i1" />
                <p>希金斯</p>
                <van-rate 
                    v-model="value" 
                    :size="15" 
                    color="#ffd21e" 
                    void-icon="star" 
                    void-color="#eee" 
                    class="i2"
                />
            </div>
            <div class="e3">
                <p>日期新鲜、发货快、新包装、味道变得更好；快递员态度很 好</p>
            </div>
            <div class="e4">
                <img src="./img/1593611640(1)@2x(1).png" alt />
                <img src="./img/1593611640(1)@2x(1).png" alt />
                <img src="./img/1593611640(1)@2x(1).png" alt />
            </div>
        </div>
        <div class="kong"></div>
        <div class="xia">
            <div class="left">
                <div class="x1">
                    <van-icon name="shop-o" size="26" color="#646464" />
                    <p>店铺</p>
                </div>
                <!-- <div class="x2" @click="collect">
                    <van-icon name="like-o" size="26" color="#646464" v-show="!isCollection"/>
                    <van-icon name="like" size="26" color="#f50" v-show="isCollection"/>
                    <p>收藏</p>
                </div> -->
            </div>
            <div class="right">
                <button class="b2">
                    <div class="icon">￥</div>
                    <div class="monery_text">70</div>
                    <div class="text" @click="confirmPay">立即抢购</div>
                </button>
            </div>
        </div>
        <van-action-sheet
        v-model="numShow"
        :round="true"
        duration="0.2"
        @closed="closeChoose"
        title="请选择数量"
        >
        <div class="contentNum">
            <van-card :thumb="data.pro_thumbnail">
            <template #title>
                <h4 style="font-size: 20px">
                <!-- {{ proDetail.pro_name | strSub(10) }} -->
                {{ data.name }}
                </h4>
            </template>
            <template #desc>
                <span style="color: #d04445; font-size: 18px">￥{{ data.group_price }}</span>
            </template>
            <template #price>
                <span style="color: #686868; font-size: 17px"
                >剩余团购名额：{{ data.num - data.group_num }}</span
                >
            </template>
            <template #footer>
                <div style="padding: 15px 0; font-size: 14px">
                <span style="position: absolute; left: 10%; line-height: 30px"
                    >数量</span
                >
                <button @click="decreaseNum">-</button>
                <!-- <span class="count">{{ countChoose }}</span> -->
                <input
                    type="text"
                    v-model="countChoose"
                    class="count"
                    @blur="countNum"
                    oninput="value=value.replace(/[^\d]/g,'')"
                />
                <button @click="addNum">+</button>
                </div>
            </template>
            </van-card>
            <button class="confirmNum" @click="confirmNum">确定</button>
        </div>
        </van-action-sheet>
  </div>
</template>

<script>
import {
  shippingAddress,
  pay,
  wxpay,
  orderDel,
  orderState,
} from "./actions/index.js";
import { Lazyload, Sku, Swipe, SwipeItem, Toast, Icon, ImagePreview } from "vant";
export default {
  name: "group-gurchase-detail",
  data() {
    return {
      current: 0,
      value:4,
      barClass:false,
      end_time:30 * 60 * 60 * 1000,
      isCollection: false,
      address: [],
      numShow: false,
      countChoose: 1,
      data: {},
      wxMsg: {},
    };
  },
  methods: {
    //支付
    async confirmPay() {
      // 判断支付环境
      // let ua = window.navigator.userAgent.toLowerCase();
      // if (!(ua.match(/MicroMessenger/i) == 'micromessenger')) { 
      //   Toast("请在微信中支付");
      //   return;
      // }
      if(this.address.length == 0) {
        Toast("请先设置收货地址");
        return;
      }

      let order = {
          pay_type: 1,
          order_type: 3,
          id: this.data.id,
          price: 0.01,
          num: this.countChoose,
          remark: '',
          way: 3,
      }
      let order_number = "";
     await pay(order)
      .then((res) => {
          console.log(res)
          if(res.code == 100) {
            order_number = res.data.order_number;
            let obj = {
                pay_class: 3,
                order_no: order_number
            }  
            wxpay(obj).then((res) => {
                    this.wxMsg = res.data;
                    this.callpay(1, obj, this);
            });
          } else {
              Toast(res.msg);
          }
      })
      .catch((err) => {
          console.log(err);
          Toast("请求错误");
      })
      
    },
    //调用微信JS api 支付
    jsApiCall(type, obj, This) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: This.wxMsg.appId,
          nonceStr: This.wxMsg.nonceStr,
          package: This.wxMsg.package,
          paySign: This.wxMsg.paySign,
          signType: This.wxMsg.signType,
          timeStamp: This.wxMsg.timeStamp,
        },
        function (res) {
          WeixinJSBridge.log(res.err_msg);
          //支付成功回调
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //修改支付状态接口  订单号
            orderState(obj.order_no).then((res) => {
              if (res.code == 100) {
                This.$route.go(-1);
              }
            });
          } else {
            //删除支付失败订单  订单号
            orderDel(obj.order_no);
            Toast.fail("支付失败");
            This.isPaying = false;
          }
        }
      );
    },
    callpay(type, obj, This) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.jsApiCall(type, obj, This),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent(
            "WeixinJSBridgeReady",
            this.jsApiCall(type, obj, This)
          );
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.jsApiCall(type, obj, This)
          );
        }
      } else {
        this.jsApiCall(type, obj, This);
      }
    },
    //获取详情数据
    getData() {
        this.data = JSON.parse(this.$route.query.data);
        console.log(this.data)
    },
    //限制输入数量
    countNum() {
      if (this.countChoose == 0) {
        this.countChoose = 1;
      }
    },
    // 立即下单
    confirmNum() {
      //判断是否有库存
      if (this.canNotPay) {
        Toast("该商品已无库存，请您挑选其他商品");
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
        return;
      }

      // 普通下单
      var queryVal = {
        pro_id: this.proDetail.proid,
        pay_num: parseInt(this.countChoose),
      };

      this.$router.push({
        path: "/pay",
        query: queryVal,
      });
    },
    // 下单商品数量增加
    addNum() {
      if (this.proDetail.pro_inventory <= 0) {
        Toast("没有库存了");
        return;
      }
      this.countChoose++;
      this.proDetail.pro_inventory--;
    },
    // 下单商品数量减少
    decreaseNum() {
      if (this.countChoose > 1) {
        this.countChoose--;
        this.countChoose = parseInt(this.countChoose);
        this.proDetail.pro_inventory++;
        // this.price = total < 0 ? 0 : total.toFixed(2);
      }
    },
    // 关闭面板
    closeChoose() {
      this.numShow = false;
      this.couponApply = false;
      this.countChoose = 1;
    },
    getAddress() {
      shippingAddress()
      .then((res) => {
        let addressList = res.data;
        for(let i = 0; i < addressList.length; i++) {
          if(addressList[i].by_default == 1) {
            this.address = addressList[i];
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    toEditAddress() {
        if(this.setBydefault == true){
          this.$router.push({path:'/myaddress',query: { add: 1 } })
        }else{
          this.$router.push({path:'/add',query: { add: 1 } })
        }
    },
    onChange(index) {
      this.current = index;
    },
    back() {
      this.$router.go(-1)
    },
    scroll(e) {
      if(e.path[1].scrollY >= 50){
        this.barClass = true;
      }else if (e.path[1].scrollY <= 50) {
        this.barClass = false;
      }
    },
    collect() {
        this.isCollection = !this.isCollection;
    }
  },
  mounted() {
    document.addEventListener('scroll',this.scroll);
    this.getAddress();
    this.getData();
  }
};
</script>

<style scoped lang="less">
.detail {
    width: 100%;
    background-color: rgb(247, 247, 247);
    .contentNum {
        background: #fafafa;
        padding: 10px 0px;
        button {
            width: 30px;
            outline: none;
            border: none;
            width: 30px;
            height: 30px;
            background: #fff;
        }
        .count {
            width: 40px;
            height: 30px;
            margin: 0 15px;
            border: none;
            text-align: center;
        }
        .confirmNum {
            outline: none;
            background-color: #d04443;
            color: #fff;
            width: 90%;
            height: 40px;
            border: none;
            border-radius: 3px;
            margin: 0px 5%;
            margin-top: 10px;
        }
    }
    .address {
        display: flex;
        position: relative;
        width: 100%;
        margin-top: 0.2rem;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #E1E6E0;
        border-top: 1px solid #E1E6E0;
        span {
            margin: 0 10px;
            color: #656565;
            font-size: 13px;
            padding: 10px 0;
        }
        .icon {
            position: absolute;
            right: 10px;
            margin: 0;
        }
    }
    .chosed {
        display: flex;
        position: relative;
        width: 100%;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #E1E6E0;
        border-top: 1px solid #E1E6E0;
        margin-top: 10px;
        span {
            margin: 0 10px;
            color: #656565;
            font-size: 13px;
            padding: 10px 0;
        }
        .icon {
            position: absolute;
            right: 14px;
            margin: 0;
        }
    }
    .lunbo {
        width: 100%;
        img {
            width: 100vw;
        }
    }
    .end_time {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: #ffffff;
        text-align: center;
        background: #D04443;
        opacity: 1;
        font-size: 15px;
        font-weight: 500;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .van-count-down {
            color: #fff;
        }
    }
    .center {
        background-color: #ffffff;
        padding-bottom: 15px;
        .price_all {
            width: 90%;
            margin: 0 auto;
            padding-top: 5px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .title {
                font-size: 17px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #232323;
                opacity: 1;
            }
            .monery {
                margin-left: 10px;
                margin-right: 5px;
                color: #ADADAD;
                font-size: 0.5rem;
                display: inline-block;
                text-decoration:line-through;
            }
        }
        .price_group {
            width: 90%;
            margin: 0 auto;
            padding-top: 2px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .title {
                font-size: 17px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #232323;
                opacity: 1;
            }
            .monery {
                margin-left: 10px;
                margin-right: 5px;
                color: #D04443;
                font-size: 0.5rem;
                display: inline-block;
            }
        }
        .product_desc {
            width: 90%;
            color: #282828;
            font-size: 0.45rem;
            font-weight: bold;
            margin-left: 0.5rem;
            margin-top: 0.2rem;
            padding-top: 0.3rem;
            padding-bottom: 0.2rem;
        }
        .product_list {
            width: 90%;
            margin: 0.2rem auto;
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            .pro_name {
                font-size: 17px;
                color: #232323;
                font-weight: 500;
            }
            .right {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #474747;
                font-size: 12px;
                .pro_num {
                    // width: 60%;
                }
                
            }
        }
    }
    .eva {
        background-color: #ffffff;
        margin-top: 0.2rem;
        margin-bottom: 57px;
        .e1 {
        .p1 {
            color: #212121;
            font-weight: bold;
            font-family: "siyuan";
            font-size: 0.4rem;
            display: inline-block;
            margin-left: 0.5rem;
        }
        .p2 {
            color: #606060;
            display: inline-block;
            margin: 0.5rem 0rem 0rem 5.8rem;
        }
        }
        .e2 {
        position: relative;
        .i1 {
            width: 1.1rem;
            margin: 0.5rem 0rem 0rem 0.5rem;
        }
        p {
            color: #606060;
            position: absolute;
            font-size: 0.5rem;
            left: 2rem;
            top: 0.8rem;
            display: inline-block;
        }
        .i2 {
            position: absolute;
            right: 0.2rem;
            top: 0.9rem;
        }
        }
        .e3 {
        p {
            color: #2e2e2e;
            width: 90%;
            margin-left: 0.5rem;
        }
        }
        .e4 {
        margin-left: 0.5rem;
        img {
            width: 2.5rem;
            height: 2.5rem;
            margin-top: 1rem;
            margin-left: 0.3rem;
        }
        }
    }
    .kong {
        height: 2px;
    }
    .xia {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        .left {
            width: 20%;
            display: flex;
            flex-direction: row;
            text-align: center;
            padding-left: 10px;
            .x1 {
                width: 100%;
                color: #646464;
            }
            .x2 {
                width: 100%;
                color: #646464;
            }
        }
        .right {
            width: 80%;
            display: flex;
            flex-direction: row;
            .b1 {
                background-color: #EEBBBB;
                color: #ffffff;
                outline: none;
                border: none;
                height: 1.5rem;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                .text {
                    font-size: 17px;
                    font-weight: 500;
                    margin-left: 5px;
                }
                .monery_text {
                    font-size: 17px;
                    font-weight: 500;
                }
                .icon {
                    font-size: 15px;
                    margin-left: 1px;
                }
            }
            .b2 {
                background-color: #d04443;
                color: #ffffff;
                outline: none;
                border: none;
                height: 1.5rem;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                .text {
                    font-size: 17px;
                    font-weight: 500;
                    margin-left: 5px;
                }
                .monery_text {
                    font-size: 17px;
                    font-weight: 500;
                }
                .icon {
                    font-size: 15px;
                    margin-left: 1px;
                }
            }
        }
    }
    /deep/ .van-nav-bar {
        background: #fff;
        .van-nav-bar__left {
        .van-nav-bar__text {
            color: #111;
        }
        .van-icon-arrow-left {
            color: #111;
        }
        }
        .van-nav-bar__title {
        color: #111;
        }
    }
    .navClassTrue {
        background:rgba(255,255,255,0);
    }
}
</style>