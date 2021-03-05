<template>
  <div class="pay">
    <header>
      <img src="../../components/img1/返回.png" @click="back()" />
      <p>确认订单</p>
    </header>

    <div class="navigator-address">
      <!-- <div class="navigator">
        <button
         v-for="(item,index) in menuList"
         :key="index"
         :class="active === index ? 'active' : ''"
         @click="changeWay(index)"
        >
          {{ item.dw_name }}
        </button>
      </div> -->
      <div class="content">
        <my-address
          :showMsg="active"
          :entid="dataMsg.entid"
          :proid="dataMsg.proid"
          ref="myAddress"
        />
      </div>
    </div>

    <div class="goods-message">
      <div class="message" v-if="dataMsg != ''">
        <div class="brand" @click="intoStore">
          <div>
            <img :src="dataMsg.ent_logo" alt />
            <p class="p1">{{ dataMsg.ent_name }}</p>
          </div>
          <p class="p2"><van-icon name="arrow" size=".4rem" color="#ccc" /></p>
        </div>

        <div class="productDetail">
          <div class="wrapper">
            <img :src="dataMsg.pro_thumbnail" alt />
            <div class="center">
              <p class="p1">{{ dataMsg.pro_name | strSub(12) }}</p>
              <p class="p3">￥{{ price }}</p>
            </div>
          </div>
          <div class="right">
            <van-stepper v-model="count" />
          </div>
        </div>
      </div>

      <div class="time">
        <span>下单时间</span><span>{{ localDate }}</span>
      </div>

      <div class="price-pay-message">
        <div class="pay-message-list">
          <p class="p1">商品总额</p>
          <p class="p3">￥ {{ setMonery(count * price, 1) }}</p>
        </div>
        <div class="pay-message-list">
          <p class="p1">运费</p>
          <p class="p3">+ 0.00</p>
        </div>
        <div class="pay-message-list">
          <p class="p1">优惠</p>
          <p class="p3" v-if="couMoney != ''">-{{ setMonery(couMoney, 2) }}</p>
          <p class="p3" v-else>- 0.00</p>
        </div>
      </div>

      <div class="word">
        <van-field
          v-model="textValue"
          label="留言："
          placeholder="选填，备注您对商家需求"
          input-align="left"
          size="large"
        />
      </div>

      <div class="product-parameters" @click="parametersStatus = true">
        <span class="label">参数：</span>
        <div>
          <span class="describe">保质期 质地...</span>
          <van-icon name="arrow" class="arrow"/>
        </div>
      </div>
    </div>

    <div style="width: 100%; height: 2.75rem"></div>
    <div class="btn">
      <div class="text">
        <span>共{{ count }}件 实付款：</span>
        <span class="totalPrice">￥{{ totalPrice }}</span>
      </div>
      <button class="payClick" @click="payMoney">提交订单</button>
    </div>

    <van-overlay :show="isPaying">
      <span class="overlay-text">正在为您进入支付环境</span>
    </van-overlay>

    <van-popup
     position="bottom" 
     round 
     v-model="parametersStatus"
    >
      <div class="parameter-title">
        产品参数
      </div>
      <div class="parameter-content">
        <div class="parameter-item" v-for="item in parmaeterData.attr_param" :key="item.canName">
          <span class="label">{{ item.canName }}：</span>
          <span class="content">{{ item.canCont }}</span>
        </div>
      </div>
      <div class="parameter-bottom">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" class="button" @click="parametersStatus = false">
          返回
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import myAddress from "./components/address";
import { Card, Icon, Toast, Dialog, ActionSheet, Overlay, Stepper } from "vant";
import {
  messageDetail,
  pay,
  shippingAddress,
  wxpay,
  orderDel,
  orderState,
  DeliveryWay,
  productAttr
} from "./actions/index";
export default {
  components: {
    myAddress,
  },
  data() {
    return {
      active: 0,
      dataMsg: "",
      price: 0, //单价
      count: 1,
      textValue: "",
      wxMsg: {},
      //下单编号/时间
      resNumber: null,
      resTime: null,
      menuList: {},
      discountList: {}, //全部优惠卷
      entid: null, //商家id
      chooseDiscountShow: false,
      actions: [], //本店优惠券
      actionChoosed: {
        //选择的优惠
        decrese: 0,
      },
      discountNumShow: false,
      couMoney: "",
      cou_id: "",
      isPaying: false, //是否正在支付
      parametersStatus: false,
      parmaeterData: {}
    };
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
  updated() {
    Toast.clear();
  },
  watch: {
    count(val) {
      if (val > this.dataMsg.pro_inventory) {
        this.count = this.dataMsg.pro_inventory;
      }
    }
  },
  async created() {
    //商品数量
    if (this.$route.query.pro_id == undefined)
      return Toast("请返回选择购的商品");
    if (this.$route.query.pay_num == undefined)
      return Toast("请返回选择购买数量");
    this.count = this.$route.query.pay_num;

    //配送状态
    if (this.$store.state.commodityState) {
      this.active = 1;
    }

    // 优惠券
    if (
      this.$route.query.cou_id != undefined &&
      this.$route.query.couMoney != undefined
    ) {
      this.cou_id = this.$route.query.cou_id;
      this.couMoney = parseFloat(this.$route.query.couMoney).toFixed(2);
    }

    //获取商品信息
    let id = this.$route.query.pro_id;
    await messageDetail(id).then((res) => {
      this.dataMsg = res.data[0];
      this.price = parseFloat(this.dataMsg.pro_price).toFixed(2);
      this.entid = this.dataMsg.entid;
    });

    this.numShow = true;

    await DeliveryWay()
      .then((res) => {
        if (res.code == 100) {
          this.menuList = res.data;
        }
      })
      .catch((res) => {
        Toast.fail("获取菜单失败");
      });

    this.getParmeters();
  },
  computed: {
    totalPrice() {
      if (this.cou_id != "" && this.couMoney != "") {
        if (this.couMoney >= 1) {
          var total =
            (this.count * (this.price * 100) - this.couMoney * 100) / 100;
        } else {
          var total =
            (this.count * (this.price * 100) * (this.couMoney * 100)) / 10000;
        }

        return total <= 0 ? 0.01 : total.toFixed(2);
      } else {
        let total = (this.count * (this.price * 100)) / 100;
        return total < 0 ? 0 : total.toFixed(2);
      }
    },
    localDate() {
      let date = new Date();
      let d = new Date();
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return d;
    },
  },
  methods: {
    getParmeters() {
      productAttr(this.entid)
      .then((res) => {
        this.parmaeterData = res.data;
        console.log(this.parmaeterData)
      })
    },
    setMonery(val, type) {
      if (val == "") {
        return "0.00";
      }

      if (type == 1) {
        return parseFloat(val).toFixed(2);
      } else {
        if (val * 10 < 10) {
          return "折扣" + val * 10 + "折";
        } else {
          return parseFloat(val).toFixed(2);
        }
      }
    },
    //获取折扣金额
    getDiscountMoney(cou_money) {
      //cou_money 1 优惠金额  < 1  折扣  cou_num      0 无门槛    其他  满减（此值）
      if (cou_money >= 1) {
        return parseFloat(cou_money); //优惠金额
      } else {
        return parseFloat(
          (((this.count * 100 * (this.price * 100)) / 10000) *
            cou_money *
            100) /
            100
        ); //折扣所减免的金额
      }
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //进店
    intoStore() {
      let obj = {
        entid: this.dataMsg.entid,
        entfid: 0,
      };
      let res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/merchants/produce",
        query: { res: res },
      });
    },
    //支付
    payMoney() {
      // 判断支付环境
      let ua = window.navigator.userAgent.toLowerCase();
      if (!(ua.match(/MicroMessenger/i) == "micromessenger")) {
        Toast("请在微信中支付");
        return;
      }

      // if (
      //   this.$refs.myAddress.addressStoreList.length == 0 &&
      //   this.active == 0
      // ) {
      //   Toast("该商家未设置店铺地址，无法下单");
      //   return;
      // }
      // 更新收货地址
      this.$refs.myAddress.getUserSite();

      if (
        (this.$refs.myAddress.name == undefined &&
          this.active == 0) ||
        this.$refs.myAddress.name == ""
      ) {
        Toast("请输入取货人姓名");
        return;
      }

      if (this.$refs.myAddress.address.id == 0 && this.active == 1) {
        Toast("请添加收货地址");
        return;
      }
      //校验手机号
      let regPhone = /^1[3456789]\d{9}$/;
      let resReg = !regPhone.test(this.$refs.myAddress.phone);

      if (resReg && this.active == 0) {
        Toast("请添写正确的手机号码");
        return;
      }

      let orderAdd = {
        pay_type: 1, //支付方式 1微信 2支付宝 3现金 4其他
        order_type: 6, //订单类型：1：商品 2：拼团3：团购 4：优惠券 5：员工任务 6:乐家市场
        id: this.$route.query.pro_id,
        price: parseFloat(this.totalPrice).toFixed(2),
        num: this.count, //购买数量
        remark: this.textValue, //备注
        way: 3, //配送方式 3物流 1自取
        name: this.$refs.myAddress.name,
        phone: this.$refs.myAddress.phone,
      };
      //服务站点
      if(this.$refs.myAddress.tipChooseSite == "请选择服务站点" && !this.$refs.myAddress.pickResult.msid) {
        Toast("请选择服务站点");
        return;
      }
      
      if (
        this.$refs.myAddress.addressStoreList.length !== 0 &&
        this.active == 0
      ) {
        orderAdd.pinv_id = this.$refs.myAddress.pickResult.msid;
      }
      //使用了优惠券
      if (this.cou_id != "" && this.couMoney != "") {
        orderAdd.cou_id = this.cou_id;
      }

      //员工任务单号添加
      if (window.localStorage.commdityTaskInfo) {
        let commdityTaskInfo = JSON.parse(window.localStorage.commdityTaskInfo);

        if (this.$route.query.taskKey != undefined) {
          if (commdityTaskInfo.taskKey != this.$route.query.taskKey)
            Toast("任务出错");
          return false;
        }

        orderAdd.task_data = commdityTaskInfo.taskKey;
        window.localStorage.removeItem("commdityTaskInfo");
      } else {
        if (this.$route.query.taskKey != undefined) {
          orderAdd.task_data = this.$route.query.taskKey;
          window.localStorage.removeItem("commdityTaskInfo");
        }
      }

      //提交订单
      pay(orderAdd)
        .then((res) => {
          let obj = {
            order_no: res.data.order_number,
            money: parseFloat(res.data.pro_pice),
            url: "http://apis.lejiagx.cn/api/wxpay",
            type: 1,
          };

          if (res.code != 100) {
            Toast(res.msg);
            return false;
          }

          this.isPaying = true;

          wxpay(obj).then((res) => {
            if (res.code != 100) {
              this.isPaying = false;
            }

            this.wxMsg = res.data;
            this.callpay(1, obj, this);
          });
        });
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
                if (This.active === 1) {
                  This.$router.push({
                    path: "/zz_bank",
                    query: {
                      resNumber: obj.order_no,
                      resTime: res.data.time,
                    },
                  });
                } else {
                  This.$router.push({
                    path: "/zz_payment",
                    query: {
                      resNumber: obj.order_no,
                      resTime: res.data.time,
                    },
                  });
                }
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
    changeWay(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="less">
.pay {
  min-height: 100vh;
  // background: linear-gradient(to bottom,#F50 0%,#FF7D01 10%,#FBD870 20%,#F2F2F2 30%);
  background-color: #f2f2f2;
  .parameter-title {
    font-size: 18px;
    width: 100%;
    color: #393A3C;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    text-align: center;
  }
  .parameter-content {
    height: 60vh;
    width: 100%;
    overflow: scroll;
    .parameter-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      min-height: 60px;
      .label {
        color: #000;
        padding: 0 20px;
      }
      .content {
        flex-grow: 1;
        color: #686868;
      }
    }
  }
  .parameter-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    .button {
      
      width: 80%;
      border-radius: 50px;
    }
  }
  > header {
    display: flex;
    position: relative;
    padding-top: 0.2rem;
    align-items: center;
    justify-content: center;
    height: 40px;
    img {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      left: 10px;
    }
    p {
      color: #242424;
      font-size: 0.5rem;
    }
  }
  .address {
    width: 100%;
  }
  .navgator {
    display: flex;
    position: relative;
    margin-left: 5%;
    height: 60px;
    align-items: center;
    .title {
      font-size: 16px;
      font-weight: 600;
      font-family: Source Han Sans CN;
      line-height: 60px;
    }
    span:nth-of-type(2) {
      margin-left: 20px;
    }
    .tagsItem {
      display: inline-block;
      text-align: center;
      margin: 0 5px;
      line-height: 28px;
      font-family: Source Han Sans CN;
      width: 78px;
      height: 28px;
      color: #202020;
      font-size: 15px;
      border: 1px solid transparent;
      border-radius: 3px;
    }
    .tagsItemActive {
      display: inline-block;
      text-align: center;
      margin: 0 5px;
      line-height: 28px;
      font-family: Source Han Sans CN;
      width: 78px;
      height: 28px;
      color: #d04443;
      font-size: 15px;
      border: 1px solid #d04443;
      border-radius: 3px;
    }
    .tags {
      position: absolute;
      top: 50%;
      left: 28%;
      transform: translateY(-45%);

      //活跃时样式
      /deep/.van-tab.van-tab--active {
        background: #fff;
        border: 0.5px solid #d04443;
        border-radius: 3px;
      }
      /deep/.van-tab {
        border: 0.5px solid #fff;
        margin: 0 5px;
      }
      /deep/.van-tabs__nav--card {
        border: none;
      }
      /deep/.van-tabs__wrap {
        display: inline-block;
        padding: 0;
        margin: 0;
      }
      /deep/.van-tabs--card {
        display: inline-block;
        font-size: 15px;
        padding: 0;
        margin: 0;
      }
    }
  }

  //商品信息
  .message {
    padding-bottom: 5px;
    .brand {
      display: flex;
      width: 90%;
      margin: 0.5rem 0rem 0rem 0.5rem;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        img {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 3px;
        }
        .p1 {
          margin: 0 5px;
          display: inline-block;
          font-size: 16px;
        }
      }
      .p2 {
        display: inline-block;
        font-size: 0.4rem;
        color: #717171;
      }
    }

    .productDetail {
      position: relative;
      margin: 0.5rem 0rem 0rem 0.5rem;
      width: 90%;
      // justify-content: space-between;
      .wrapper {
        flex: 1;
        position: relative;
        img {
          width: 75px;
          height: 75px;
          border-radius: 3px;
        }
        .center {
          width: calc(100% - 75px);
          top: 0;
          display: inline-block;
          overflow: auto;
          .p1 {
            position: absolute;
            top: 0;
            left: 80px;
            margin: 3px;
            font-size: 16px;
            color: #282828;
            font-weight: 600;
          }
          .p3 {
            position: absolute;
            bottom: 8px;
            left: 80px;
            font-weight: 600;
            font-size: 18px;
            color: #db1043;
          }
        }
      }
      .right {
        position: absolute;
        right: 0;
        bottom: 0;
        align-items: flex-end;
      }
    }
  }

  //时间
  .time {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.4rem;
    height: 30px;
    line-height: 30px;
    padding-left: 5%;
    color: #212121;
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-size: 0.45rem;
    span {
      font-size: 14px;
      color: #ccc;
    }
    span:nth-of-type(2) {
      margin-right: 5%;
    }
  }
  .word {
    background-color: #ffffff;
    margin-top: 0.1rem;
    // border-bottom: 1px #eeeeee solid;
    // padding-bottom: 0.2rem;
    .van-field__label {
      padding-left: 3px;
      width: 60px;
      margin-right: 0;
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: #ffffff;
    padding-bottom: 15px;
    -moz-box-shadow: 0px 0px 2px #adadad;
    -webkit-box-shadow: 0px 0px 2px #adadad;
    box-shadow: 0px 0px 2px #adadad;
    .text {
      display: flex;
      flex-direction: column;
      margin-left: 5%;
      padding-top: 15px;
      span:nth-of-type(1) {
        padding-left: 4px;
        font-size: 14px;
      }
      span:nth-of-type(2) {
        font-size: 18px;
        color: #db1043;
        font-weight: bold;
      }
    }
    .payClick {
      position: absolute;
      top: 20px;
      right: 0px;
      outline: none;
      border: none;
      width: 80px;
      height: 35px;
      border-radius: 2px;
      background-color: #d04443;
      font-size: 15px;
      color: #fff;
      margin-right: 5%;
    }
    .payCou {
      position: absolute;
      top: 20px;
      right: 85px;
      outline: none;
      border: none;
      width: 80px;
      height: 35px;
      border-radius: 2px;
      background-color: #fff;
      font-size: 15px;
      color: #111;
      margin-right: 5%;
      border: 1px #eee solid;
    }
  }
  .contentNum {
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
  .navigator-address {
    position: relative;
    width: 92%;
    margin: 0 auto;
    margin-top: 16px;
    .navigator {
      display: flex;
      width: 100%;
      align-items: flex-end;
      button {
        border: none;
        background-color: rgba(0, 0, 0, 0.1);
        width: 50%;
        height: 40px;
        color: #242426;
        font-size: 16px;
      }
      button:nth-of-type(1) {
        border-top-left-radius: 10px;
      }
      button:nth-of-type(2) {
        border-top-right-radius: 10px;
      }
      .active {
        font-size: 18px;
        font-weight: bold;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height: 50px;
        background-color: #fff;
      }
    }
    .content {
      background-color: #fff;
      // border-bottom-left-radius: 10px;
      // border-bottom-right-radius: 10px;
      border-radius: 10px;
    }
  }
  .goods-message {
    width: 92%;
    margin: 10px auto;
    padding: 10px 0;
    border-radius: 10px;
    background-color: #fff;
    .product-parameters {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 10px;
      .label {
        color: #646566;
        font-size: 16px;
        margin: 0 11px 0 18px;
      }
      div {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #ccc;
        .arrow {
          margin-right: 15px;
          font-size: 15px;
        }
      }
    }
    .price-pay-message {
      // margin-top: 0.2rem;
      background-color: #ffffff;
      // padding-top: 0.5rem;
      padding-bottom: 0.2rem;
      .pay-message-list {
        display: flex;
        justify-content: space-between;
        color: #212121;
        p {
          padding-right: 5%;
        }
        .p1 {
          margin-top: 0 !important;
          color: #212121;
          margin-left: 0.5rem;
          font-size: 0.45rem;
        }
        .p2 {
          color: #212121;
          font-size: 0.3rem;
          // margin-top: 0.08rem;
        }
        .p3 {
          color: #212121;
          font-size: 0.4rem;
          font-weight: bold;
        }
      }
    }
  }
  .overlay-text {
    position: absolute;
    color: #fff;
    white-space: nowrap;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
}
</style>