<template>
  <div class="obligation">
    <div class="head">
      <div class="top">
        <img src="../../components/img1/返回.png" alt  @click="back()"/>
        <p class="p1">订单详情</p>
      </div>
      <div class="model">
        <img src="../../components/img1/时间 (1).png" alt />
        <p class="p1">待付款</p>
        <p class="p2">剩余：{{ Hours }}小时{{ Minutes }}分钟</p>
      </div>
      <div class="adress" @click="adress">
        <img src="../../components/img1/dingwei.png" alt />
        <p class="name">{{ address.contact_name }}</p>
        <p class="phone">{{ address.contact_number }}</p>
        <p class="adr">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailed_site }}</p>
        <p class="left">></p>
      </div>
      <div class="message">
        <div class="brand">
          <div>
            <img :src="dataMsg.ent_logo" alt />
            <p class="p1"> {{dataMsg.ent_name}} </p>
          </div>
          <p class="p2">></p>
        </div>
        <div class="productDetail">
          <div class="wrapper">
            <img :src="dataMsg.pro_thumbnail" alt />
            <div class="center">
              <p class="p1"> {{ dataMsg.pro_name }} </p>
              <p class="p3"> ￥{{ price }}</p>
            </div>
          </div>
          <div class="right">
            <button>物流配送</button>
            <p class="p2">x{{ data.pro_num }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="time">
      <p class="p1">订单编号：{{ data.order_number }}</p>
      <p>下单时间：{{ data.order_addtime }}</p>
      <p class="line"></p>
      <p class="p3">收货方式：{{ way }}</p>
    </div>
    <div class="price">
      <div class="list">
        <p class="p1">商品总额</p>
        <p class="p2">￥</p>
        <p class="p3">{{ totalPrice }}</p>
      </div>
      <div class="list">
        <p class="p1">运费</p>
        <p class="p4">+</p>
        <p class="p3">0.00</p>
      </div>
      <div class="list">
        <p class="p1">优惠</p>
        <p class="p5">-</p>
        <p class="p3">0.00</p>
      </div>
    </div>
    <div class="word">
      <p class="p1">留言：</p>
      <p class="p2"> {{ data.order_remark }} </p>
    </div>
    <div class="btn">
      <p class="p1">共{{ data.pro_num }}件 实付款：</p>
      <p class="p2">￥</p>
      <p class="p3"> {{ totalPrice }} </p>
      <van-button type="primary" class="b1">取消订单</van-button>
      <van-button type="primary" class="b2" @click="payMoney">立即支付</van-button>
    </div>
  </div>
</template>

<script>
import { messageDetail,pay,shippingAddress,wxpay } from './actions/index'

export default {
    data() {
      return {
        data: [],
        dataMsg: [],
        price: 0,
        totalPrice: 0,
        way: '',
        address: {},
        //wx支付接口数据
        wxMsg: {}
      }
    },
   created() {
     let id = this.$route.query.pro_id;
     messageDetail(id)
     .then((res) => {
       this.dataMsg = res.data[0]
     })
     .then(() => {
        //获取商品信息数据
        this.paySubmit()
     })
     //获取地址
    shippingAddress()
    .then((res) => { 
        if (this.address == {} && res.data.length !== 0) {
              this.address = res.data[0]
            } else {
              this.address  = {
                  country: "中国",
                  province: null,
                  city: null,
                  district: null,
                  detailed_site: null,
                  contact_number: null,
                  contact_name: '无默认收货地址，请添加',
                  by_default: null,
                  id: null
                }
            }
        res.data.forEach(element => {

            if (element.checkbox === true) {
                this.address = element;
              return;
            }

        });
     });

   },

   methods:{
    payMoney() {
      
      let obj = {
        order_no: this.data.order_number,
        money: parseInt(this.totalPrice),
        url: 'http://apis.lejiagx.cn/api/wxpay',
        type: 1
      }
      wxpay(obj).then((res) => {
        
        this.wxMsg = res.data;
        this.callpay();

      })
    },

  //调用微信JS api 支付
    jsApiCall()
    {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        this.wxMsg,
        function(res){
          WeixinJSBridge.log(res.err_msg);
          console.log(res.err_code+res.err_desc+res.err_msg);
        }
      );
    },
    callpay(val) {

      if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(), false);
          }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.jsApiCall()); 
              document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall());
          }
      }else{
          this.jsApiCall();
      }

    },
    back(){
      this.$router.go(-1)
    },

    adress() {

      let dataVal = JSON.stringify(this.address)

      this.$router.push({
        path:'/add',
        query: { add: 0,data: dataVal } 
      })
    },

    //获取数据
    paySubmit() {

      let obj = {//接口数据都是写死的
        pay_type: 1, //支付方式 1微信 2支付宝 3现金 4其他
        order_type: 1,  //订单类型 1商品 2其他
        id: this.$route.query.pro_id,
        price: parseInt(this.dataMsg.pro_price),
        num: 1,   //购买数量
        remark: "111", //备注
        way: 1,    //配送方式
      }


      pay(obj)
      .then((res) => {
        this.data = res.data;
        this.price = this.data.pro_pice.toFixed(2)
        // 初步处理精度问题
        this.totalPrice = (((this.data.pro_num * 100) * (this.data.pro_pice * 100))/10000).toFixed(2)


        //取货方式
        if(this.data.order_type == 1) {
          this.way = '自取'
        } else if (this.data.order_type == 2) {
          this.way = '到付'
        } else if (this.data.order_type == 3) {
          this.way = '物流配送' 
        } else {
          this.way = '员工配送'
        }

        //剩余时间
        let d = new Date()
        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours()-24) + ':' + (d.getMinutes()+1) + ':' + d.getSeconds()+1;
        this.timeLeft = this.compareTime(d,this.data.order_addtime)

        this.Hours = this.timeLeft.Hours;
        this.Minutes = this.timeLeft.Minutes;
      })
    },
    
    //处理剩余时间
    compareTime (start,end) {
            let startTime = start;
            let endTime = end;
            startTime = this.stringToDate(startTime)
            endTime = this.stringToDate(endTime)
            var retValue = {}
            
            var compareTime = endTime - startTime  // 时间差的毫秒数
            // 计算出相差天数
            var days = Math.floor(compareTime / (24 * 3600 * 1000))
            retValue.Days = days
        
            // 计算出相差年数
            var years = Math.floor(days / 365)
            retValue.Years = years
        
            // 计算出相差月数
            var months = Math.floor(days / 30)
            retValue.Months = months
        
            // 计算出小时数
            var leaveHours = compareTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
            var hours = Math.floor(leaveHours / (3600 * 1000))
            retValue.Hours = hours
        
            // 计算相差分钟数
            var leaveMinutes = leaveHours % (3600 * 1000) // 计算小时数后剩余的毫秒数
            var minutes = Math.floor(leaveMinutes / (60 * 1000))
            retValue.Minutes = minutes
        
            // 计算相差秒数
            var leaveSeconds = leaveMinutes % (60 * 1000) // 计算分钟数后剩余的毫秒数
            var seconds = Math.round(leaveSeconds / 1000)
            retValue.Seconds = seconds
        
            var resultSeconds = 0
                if (years >= 1) {
                    resultSeconds = resultSeconds + years * 365 * 24 * 60 * 60
                }
                if (months >= 1) {
                    resultSeconds = resultSeconds + months * 30 * 24 * 60 * 60
                }
                if (days >= 1) {
                    resultSeconds = resultSeconds + days * 24 * 60 * 60
                }
                if (hours >= 1) {
                    resultSeconds = resultSeconds + hours * 60 * 60
                }
                if (minutes >= 1) {
                    resultSeconds = resultSeconds + minutes * 60
                }
                if (seconds >= 1) {
                    resultSeconds = resultSeconds + seconds
                }
                retValue.resultSeconds = resultSeconds
                return retValue
            },
            stringToDate(str){

            var tempStrs = str.split(" ");

            var dateStrs = tempStrs[0].split("-");

            var year = parseInt(dateStrs[0], 10);

            var month = parseInt(dateStrs[1], 10) - 1;

            var day = parseInt(dateStrs[2], 10);

            var timeStrs = tempStrs[1].split(":");

            var hour = parseInt(timeStrs [0], 10);

            var minute = parseInt(timeStrs[1], 10);

            var second = parseInt(timeStrs[2], 10);

            var date = new Date(year, month, day, hour, minute, second);

            return date;
        }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.obligation {
  background-color: #f7f7f7;
  .head {
    background-color: #fff;
    padding-bottom: 0.3rem;
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
        font-weight: 500;
        font-family: Source Han Sans CN;
      }
    }
    .model {
      width: 90%;
      height: 2.5rem;
      background-color: #d04443;
      display: flex;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 1rem 0rem 0rem 0.5rem;
      }
      .p1 {
        color: #ffffff;
        font-size: 0.45rem;
        font-weight: 500;
        margin: 0.9rem 0rem 0rem 0.3rem;
      }
      .p2 {
        color: #ffffff;
        font-size: 0.45rem;
        font-weight: 500;
        margin: 0.9rem 0rem 0rem 1.2rem;
      }
    }
    .adress {
      display: flex;
      position: relative;
      flex-wrap: wrap;
      border-bottom: 1px solid #e5e5e5;
      width: 90%;
      margin-left: 0.5rem;
      padding-bottom: 0.5rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.6rem 0rem 0rem 0rem;
      }
      .name {
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .phone {
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .adr {
        margin: 0rem 0rem 0rem 0.8rem;
        color: #676767;
      }
      .left {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #717171;
        font-size: 0.6rem;
        float: right;
      }
    }
    .message {
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
          }
          .p1 {
            margin: 0 5px;
            display: inline-block;
            font-size: 16px;
          }
        }
        .p2 {
          display: inline-block;
          font-size: 0.6rem;
          color: #717171;
        }
      }

      .productDetail {
        display: flex;
        margin: 0.5rem 0rem 0rem 0.5rem;
        width: 90%;
        justify-content: space-between;
        .wrapper {
          position: relative;
          width: 70%;
          img {
            width: 75px;
            height: 75px;
          }
          .center {
            width: calc(100% - 75px);
            top: 0;
            display: inline-block;
            .p1 {
              position: absolute;
              top: 0;
              left: 75px;
              margin: 3px;
              font-size: 16px;
              color: #282828;
              font-weight:600;
            }
            .p3 {
              position: absolute;
              bottom: 8px;
              left: 77px;
              font-size: 18px;
              color: #DB1043;
            }
          }
        }
        .right {
          position: relative;
          width: 20%;
          text-align: end;
          button {
            outline: none;
            border: none;
            border-radius: 1px;
            background-color: #D04443;
            color: #fff;
            padding: 0 5px;
            font-size: 12px;
          }
          p {
            position: absolute;
            bottom: 10px;
            right: 0;
          }
        }
      }
        
    }
  }
  .time {
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    p {
      margin: 0rem 0rem 0rem 0.5rem;
      color: #212121;
      font-family: Source Han Sans CN;
      font-weight: 400;
      font-size: 0.4rem;
    }
    .p1 {
      padding-top: 0.5rem;
    }
    .line {
      width: 75%;
      height: 1px;
      background-color: #e5e5e5;
      margin: 0.5rem 0rem 0rem 2.5rem;
    }
    .p3 {
      margin: 0.5rem 0rem 0rem 0.5rem;
    }
  }
  .price {
    margin-top: 0.2rem;
    background-color: #ffffff;
    padding-top: 0.5rem;
    padding-bottom: 0.3rem;
    .list {
      display: flex;
      .p1 {
        color: #212121;
        margin-left: 0.5rem;
        font-size: 0.45rem;
      }
      .p2 {
        color: #1c1c1c;
        font-size: 0.3rem;
        margin-left: 6rem;
        margin-top: 0.08rem;
      }
      .p3 {
        color: #1c1c1c;
        font-size: 0.4rem;
        font-weight: bold;
      }
      .p4 {
        margin-left: 7.2rem;
      }
      .p5 {
        margin-left: 7.3rem;
      }
    }
  }
  .word {
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    .p1 {
      display: inline-block;
      color: #212121;
      font-size: 0.45rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      margin-left: 0.5rem;
    }
    .p2 {
      display: inline-block;
      color: #5e5e5e;
      font-size: 0.4rem;
    }
  }
  .btn {
    position: relative;
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 1rem;
    .p1 {
      margin: 1.5rem 0rem 0rem 5.5rem;
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    .p2 {
      display: inline-block;
      color: #db1043;
      font-size: 0.4rem;
    }
    .p3 {
      display: inline-block;
      color: #db1043;
      font-size: 0.5rem;
      font-weight: bold;
    }
    .b1 {
      outline: none;
      border: none;
      color: #2a2a2a;
      background-color: #ffffff;
      width: 2rem;
      height: 1rem;
      border: 1px solid #b0b0b0;
      border-radius: 0.1rem;
      position: absolute;
      right: 2.5rem;
      bottom: 0.2rem;
    }
    .b2 {
      outline: none;
      border: none;
      background-color: #d04443;
      width: 2rem;
      height: 1rem;
      border-radius: 0.1rem;
      color: #ffffff;
      position: absolute;
      right: 0.3rem;
      bottom: 0.2rem;
    }
  }
}
</style>