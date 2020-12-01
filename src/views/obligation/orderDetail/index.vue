<template>
    <div class="obligation-not-payment">
        <title-view :title="title" :border="false"></title-view>

        <!-- 头部状态信息 -->
        <div class="title-info" v-if="data.status == 0">
            <span>
                <van-icon name="clock-o"/>
                待付款
            </span>
            <!-- <span>剩余：{{ expirationtime.Days }} 天 {{ expirationtime.Hours }} 小时 {{ expirationtime.Minutes }} 分钟</span> -->
            <span>剩余：<van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" /></span>
            
        </div>

        <div class="title-info" v-else-if="data.status == 1">
            <span>
                <van-icon name="send-gift-o" />
                待收货
            </span>
            <span>剩余：<van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" /></span>
        </div>
        <div class="title-info" v-else-if="data.status == 2">
            <span>
                <van-icon name="send-gift-o" />
                待发货
            </span>
            <span>买家已付款，等待商家发货</span>
        </div>
        <div class="title-info" v-else-if="data.status == 3">
            <span>
                交易成功
            </span>
        </div>
        <div class="title-info" v-else>
            <span>
                交易失败
            </span>
        </div>

        <!--地址-->
        <my-address :entid="data.entid" :showMsg="data.dw_id" :storeAddress="storeAddress"></my-address>
        <!--商品信息-->
        <div class="message" v-if="data != ''">
            <div class="brand" @click="intoStore">
                <div>
                    <img :src="data.ent_logo" alt />
                    <p class="p1"> {{data.ent_name}} </p>
                </div>
                <p class="p2"><van-icon name="arrow" /></p>
            </div>
            
            <div class="productDetail">
                <div class="wrapper">
                    <img :src="data.pro_thumbnail" alt />
                    <div class="center">
                        <p class="p1"> {{ data.pro_name }} </p>
                        <p class="p3"> ￥{{ data.pro_price }}</p>
                    </div>
                </div>
                <div class="right">
                    <!-- <div>{{ active === 0 ? '到店自取' : '物流配送' }}</div> -->
                    <div>{{ getLogisticsWay() }}</div>
                    <p class="p2">x{{ data.buy_num }}</p>
                </div>
            </div>
        </div>
        <!--订单编号/时间-->
        <div class="order-info">
            <p>订单编号： {{ data.order_number }}</p>
            <p v-if="data.order_paytime !== null">下单时间： {{ data.order_paytime }}</p>
            <p>到期时间： {{ data.order_expirationtime }}</p>
        </div>
        <div class="order-info" v-if="data.status == 1 || data.status == 2 || data.status == 3">
            <p>支付方式： 微信支付</p>
            <p>支付时间： {{ data.order_paytime }}</p>
        </div>
        <div class="receiving-way">
            <span>收货方式： {{ getLogisticsWay() }}</span>
        </div>
        <!--商品总额-->
        <div class="total-money">
            <p><span>商品总额：</span><span><span class="symbol">￥</span>{{ data.pro_price * parseInt(data.buy_num) }}</span></p>
            <p><span>运费：</span><span>+ 0.00</span></p>
            <p><span>优惠：</span><span>-{{ data.order_discount == "0" ? '0.00' : data.order_discount }}</span></p>
        </div>
        <!--留言-->
        <div class="word">
            <span>留言：</span>
            <input 
            type="text"
            v-model="textValue"
            placeholder="给卖家留言">
        </div>
        <div class="confirm-area">
            <div class="info">
                <span>共{{ data.buy_num }}件</span>
                <span>实付款：</span>
                <span>￥{{ data.buy_pice }}</span>
            </div>
            <!--待付款-->
            <div class="button" v-if="data.status == 0">
                <button @click="cancelOrders(data)">取消订单</button>
                <button @click="payMoney">立即支付</button>
            </div>
            <!--待发货-->
            <div class="button" v-else-if="data.status == 1">
                <button @click="refund(data)">申请退款</button>
                <button @click="urgeSent">提醒发货</button>
            </div>
            <!--待收货-->
            <div class="button" v-else-if="data.status == 2">
                <button @click="refund(data)">申请退款</button>
                <button @click="seeLogistics(data)">查看物流</button>
                <button @click="confirmReceive">确认收货</button>
            </div>
            <!--交易成功-->
            <div class="button" v-else-if="data.status == 3">
                <button @click="toChooseType(data)">申请售后</button>
                <button @click="toBuy">再次购买</button>
                <button @click="appraise" v-if="data.is_mark == 0">评价商品</button>
            </div>
            <!--交易失败-->
            <div class="button" v-else>
                <button @click="dellOrder(data)">删除订单</button>
                <button @click="toBuy">进店购买</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import myAddress from './components/address';
import { Icon, Toast, CountDown, Dialog } from 'vant';
import { orderList, delOrder, cancelOrder, wxpay, confirmOrder, orderState, getLogistic } from '../actions/index';
export default {
    components: {
        titleView,
        myAddress
    },
    data() {
        return {
            data: {},
            title: '订单详情',
            textValue: "",
            expirationtime: {},//截止时间
            wxMsg: {}, //微信支付信息
            storeAddress: {},
            time: 30 * 60 * 60 * 1000,
        }
    },
    watch: {

    },
    created() {
        this.data = JSON.parse(this.$route.query.data);
        this.storeAddress = this.data.product_invite;
        console.log(this.data)
        //剩余时间
        this.computeTime(this.data.order_expirationtime);
        //配送方式
        this.getLogisticsWay();
        if(this.data.pay === 1) {
            this.data.status = 0;
        }
        //留言
        this.textValue = this.data.order_remark;
    },
    methods: {
        //进店购买
        toBuy() {

            let obj = {
                 //商品id  
                proid: this.data.proid
            };
            let shopKey = this.$Utils.demoRequest(JSON.stringify(obj));
            this.$router.push({
                path: '/commdityPay',
                query: {
                    res: shopKey
                }
            })
        },
        //删除订单
        dellOrder(order) {
            delOrder(order.order_number)
            .then((res) => {
                if(res.code === 100) {
                    Toast("删除订单成功");
                        setTimeout(() => {
                        this.$router.go(-1);
                    },300)
                }
            })
            this.getDate();
        },
        //申请售后
        toChooseType() {
            Toast("请到线下与店家协商");
            return;
            let orderInfo = JSON.stringify(this.data)
            this.$router.push({
                path: '/chooseType',
                query: {
                    orderInfo
                }
            })
        },
        //确认收货
        confirmReceive() {
            confirmOrder(this.data.order_number)
            .then((res) => {
                Toast("确认成功");
                setTimeout(() => {
                    this.$router.go(-1);
                },300)
            })
            .catch((err) => {
                Toast("请求出错");
            })
        },
        //查看物流
        async seeLogistics(item) {

            let number = null;
            
            await getLogistic(item.olog_id)
            .then((res) => {
                console.log(res)
                if(res.code == 100) {
                    number = res.data.logistics;

                    var textareaEl = document.createElement('textarea');
                    textareaEl.setAttribute('readonly', 'readonly');
                    textareaEl.value = number;
                    document.body.appendChild(textareaEl);
                    textareaEl.select();
                    document.execCommand('Copy');
                    document.body.removeChild(textareaEl);
                    console.log("复制成功");
                } else {
                    Toast(res.msg);
                    return;
                }
            })
            .catch(() => {
                Toast("请求出错");
                return;
            })

            Dialog.alert({
                title: `您的订单号为:${number}`,
                message: `\n您可以到对应快递公司进行查询\n已自动复制到您的粘贴板`,
                theme: 'round-button',
            }).then(() => {
            // on close
            });
        },
        //提醒发货
        urgeSent() {

        },
        //申请退款
        refund(val) {
            Toast("请到线下与店家协商");
            return;
            let orderInfo = JSON.stringify(val)
            this.$router.push({
                path: '/afterSale',
                query: {
                    orderInfo,
                    type: '退款'
                }
            })
        },
        //取消订单
        cancelOrders(order) {
            cancelOrder(order.order_number)
            .then((res) => {
                if(res.code === 200) {
                    Toast("取消订单成功");

                    let timer = setTimeout(() => {
                        this.$router.go(-1);
                        clearTimeout(timer);
                    },400)

                }
            })
            .catch((res) => {
                Toast("取消失败");
            })
            this.getDate();
        },
        //头部状态
        titleInfo(val) {
            if(val == 0) {
                return "待付款";
            } else if(val == 1) {
                return "待发货";
            } else if(val == 2) {
                return "已发货";
            } else if(val == 3) {
                return "已完成";
            } else if(val == 4) {
                return "已关闭";
            } else if(val == 5) {
                return "无效订单";
            } else if(val == 6) {
                return "过期";
            }
        },
        //获取配送方式
        getLogisticsWay() {
            if(this.data.dw_id == 1) {
                return '自取';
            } else if(this.data.dw_id == 2) {
                return '同城快递';
            } else {
                return '物流配送';
            }
        },
        //进店
        intoStore() {
            let obj = {
                entid: this.data.entid,
                entfid: 0
            };
            let res = this.$Utils.demoRequest(JSON.stringify(obj));
            this.$router.push({
                path: "/merchants/produce",
                query: {res: res}
            })
        },
        //评价
        appraise(val) {
            let data = JSON.stringify(val);
            this.$router.push({
                path: '/appraise',
                query: {
                    data
                }
            })
        },
        //计算剩余时间
        computeTime(time) {
            let dateNow =  this.getDate();
            this.expirationtime = this.compareTime(dateNow,time);
            this.time = this.expirationtime.resultSeconds * 1000;
        },
        compareTime (start,end) {
            let startTime = start;
            let endTime = end;
            startTime = this.stringToDate(startTime);
            endTime = this.stringToDate(endTime);
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
            //转日期格式
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
        },
        //获取当前时间
        getDate() {
            let date = new Date();
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds(); 
            return Y + M + D + h + m + s;
        },
        //支付
        payMoney() {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //支付订单
                let obj = {
                    order_no: this.data.order_number,
                    money: parseFloat(this.data.buy_pice),
                    url: 'http://apis.lejiagx.cn/api/wxpay',
                    type: 1
                }

                wxpay(obj)
                .then((res) => {
                    this.wxMsg = res.data;
                    this.callpay(1,obj,this);
                })
            } else {
                Toast('请在微信中支付');
            }
           
        },
        //调用微信JS api 支付
        jsApiCall(type,obj,This)
        {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
			    'appId':This.wxMsg.appId,
                'nonceStr': This.wxMsg.nonceStr,
                'package': This.wxMsg.package,
                'paySign': This.wxMsg.paySign,
                'signType': This.wxMsg.signType,
                'timeStamp': This.wxMsg.timeStamp,
                },
                function(res){
                    WeixinJSBridge.log(res.err_msg);
                    //支付成功回调
                    if(res.err_msg=='get_brand_wcpay_request:ok') {
                        //修改支付状态接口  订单号
                        orderState(obj.order_no)
                        .then((res) => {
                            if(res.code == 100) {
                                
                                if(This.active === 1) {
                                    This.$router.push({
                                    path:'/zz_bank',
                                    query: {
                                        resNumber : obj.order_no,
                                        resTime : res.data.time   
                                    }
                                })
                                } else {
                                    This.$router.push({
                                        path:'/zz_payment',
                                        query: {
                                            resNumber : obj.order_no,
                                            resTime : res.data.time 
                                        }
                                    })
                                }
                                
                            }
                        })
                        
                    } else {

                        Toast.fail("支付失败");
                        
                    }
            });
        },
        callpay(type,obj,This) {

            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(type,obj,This), false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.jsApiCall(type,obj,This)); 
                    document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall(type,obj,This));
                }
            }else{
                this.jsApiCall(type,obj,This);
            }

        },
    }
}
</script>

<style lang="less">
.obligation-not-payment {
    width: 100%;
    .van-count-down {
        color: #fff;
        display: inline;
    }
    .title-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        background-color: #D04443;
        margin: 0 auto;
        border-radius: 2px;
        height: 75px;
        span {
            font-size: 18px;
            color: #fff;
        }
        span:nth-of-type(1) {
            padding-left: 10px;
            .van-icon {
                transform: translateY(2px);
            }
        }
        span:nth-of-type(2) {
            padding-right: 10px;
            font-size: 15px;
        }
    }
    
    //商品信息
        .message {
            padding-bottom: 5px;
            border-bottom: 7px solid #F7F7F7;
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
            //商品信息
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
                        font-weight:600;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .p3 {
                        position: absolute;
                        bottom: 8px;
                        left: 80px;
                        font-weight: 600;
                        font-size: 18px;
                        color: #DB1043;
                    }
                }
                }
                .right {
                position: relative;
                width: 20%;
                text-align: end;
                
                div {
                    position: absolute;
                    top: 0;
                    right: 0;
                    border-radius: 1px;
                    padding: 1px 4px;
                    line-height: 18px;
                    text-align: center;
                    background: #DB1043;
                    font-weight: 400;
                    font-size: 12px;
                    color: #fff;
                    border-radius: 1px;
                }
                p {
                    position: absolute;
                    bottom: 10px;
                    right: 0;
                }
            }
        }
    }    
    .order-info {
        position: relative;   
        font-size: 14px;
        font-family: Arial;
        font-weight: 400;
        color: #212121;
        p {
            margin-left: 5%;
            padding: 7px 0;
        }
        p:nth-of-type(1) {
            padding-top: 15px;
            padding-bottom: 5px;
        }
        p:nth-last-of-type(1) {
            padding-top: 5;
            padding-bottom: 15px;
        }
        ::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #E5E5E5;
            margin-left: 24%;
            transform: scaleY(.5);
            transform-origin: left top;
        }
    }
    .receiving-way {
        padding: 15px 0;
        span {
            margin-left: 5%;
            
        }
    }
    // .order-info {
    //     position: relative;   
    //     font-size: 14px;
    //     font-family: Arial;
    //     font-weight: 400;
    //     color: #212121;
    //     p {
    //         margin-left: 5%;
    //     }
    //     p:nth-of-type(1) {
    //         padding-top: 15px;
    //         padding-bottom: 7px;
    //     }
    //     p:nth-of-type(2) {
    //         padding-bottom: 15px;
    //     }
    //     ::after {
    //         content: "";
    //         position: absolute;
    //         bottom: 0;
    //         left: 0;
    //         right: 0;
    //         border-top: 1px solid #E5E5E5;
    //         margin-left: 24%;
    //         transform: scaleY(.5);
    //         transform-origin: left top;
    //     }
    // }
    //总价
    .total-money {
        width: 100%;  
        font-size: 14px;
        font-family: Arial;
        font-weight: 400;
        color: #212121;
        border-top: 7px solid #F7F7F7;
        border-bottom: 7px solid #F7F7F7;
        p {
            display: flex;
            justify-content: space-between;
            margin: 0 5% 0 5%;
        }
        p:nth-of-type(1) {
            padding-top: 10px;
            padding-bottom: 7px;
            span {
                .symbol {
                    font-size: 12px;
                }
            }
        }
        p:nth-of-type(2) {
            padding-bottom: 7px;
        }
        p:nth-of-type(3) {
            padding-bottom: 10px;
        }
    }
    .word {
        padding: 10px 0;
        border-bottom: 7px solid #F7F7F7;
        span {
            font-size: 14px;
            margin-left: 5%;
        }
        input {
            width: 70%;
            outline: none;
            border: none;
        }
    }
    .confirm-area {
        position: relative;
        height: 100px;
        width: 100%;
        .info {
            top: 20px;
            right: 5%;
            position: absolute;
            span {   
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #212121;
            }
            span:nth-of-type(2) {
                margin-left: 10px;
            }
            span:nth-of-type(3) {     
                font-size: 18px;
                font-family: DIN;
                font-weight: bold;
                color: #DB1043;
            }
        }
        .button {
            position: absolute;
            right: 5%;
            bottom: 10px;
            button {
                box-sizing: border-box;
                margin-left: 10px;     
                font-size: 15px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
                outline: none;
                border: none;
                padding: 6px 8px;
                color: #2A2A2A;
                border-radius: 2px;
                background-color: #fff;
                border: 1px solid #B0B0B0;
            }
            button:last-of-type {
                color: #fff;
                border: none;
                background-color:#D04443;
            } 
        }
    }
}
</style>