<template>
  <div class="groupDetail" @scroll="scroll($event)">
        <van-nav-bar
            :title="proDataList.pro_name"
            left-arrow
            fixed
            :border="false"
            @click-left="back"
            :class="[!barClass ? '' : 'navClassTrue']"
        />
        <div class="lunbo">
            <van-swipe @change="onChange" autoplay="3000">
            <van-swipe-item v-for = "(item,index) in proDataList.pro_carousel" :key="index">
              <van-image
                :src="item.pro_pcl_path"
                alt
                width="100%"
                height="400px"
                lazy-load
                fit="scale-down">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </van-swipe-item>

            <template #indicator>
              <div class="custom-indicator">{{ current + 1 }}/{{ proDataListL }}</div>
            </template>
          </van-swipe>
        </div>
        <div class="center">
            <div class="price">
                <p class="s1">￥</p>
                <p class="s2">{{ proDataList.pro_price }}</p>
            </div>
            <!-- <div class="active">
                <div class="tages">
                    <van-tag plain type="primary" size="medium" color="#D04443">满20减5元</van-tag>
                    <van-tag plain type="primary" size="medium" color="#D04443">满20减5元</van-tag>
                </div>
                <div class="get">
                    <div class="text">领券</div>
                    <div class="icon">
                        <van-icon name="arrow" size="15" />
                    </div>
                </div>
            </div> -->
            <p class="product_desc">{{ proDataList.pro_name }}</p>
        </div>
        <!-- <div class="content">
            <div class="c1">
                <p class="p1">数量</p>
                <p class="p2">数量</p>
            </div>
            <div class="c2">
                <p class="p1">地址</p>
                <p class="p2">内蒙古 包头市 东河区 维多利大厦1023</p>
            </div>
            <div class="c3">
                <p>运费：100</p>
            </div>
        </div> -->
        <div class="booking" v-if="groupList != ''">
            <div class="title">{{ groupList.GroupBuyingList.length }}人在拼单，可直接参与</div>
            <div class="user" v-for="(item, index) in groupList.GroupBuyingList" v-if="groupList.GroupBuyingList.length > 0">
                <div class="left">
                  <img :src="itm.mem_head_portrait" alt="" v-for="(itm, inx) in item.JoinGroupBuying">
                </div>
                <div class="right">
                    <div class="detail">
                        <div class="detail_title">{{ item.num_title }}</div>
                        <div class="detail_time">剩余 {{ item.pgr_endtime }}</div>
                    </div>
                    <div class="btn" @click="JoinGroupBuying(item.pgrid)">去拼团</div>
                </div>
            </div>
        </div>
        <div class="shop">
            <p class="p1">商品详情</p>
            <p class="pro_desc" v-if="proDataList.pro_desc != null">
              <van-image :src="proDataList.pro_desc" lazy-load width="100%" height="auto">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </p>
        </div>
        <!-- <div class="eva">
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
        </div> -->
        <div class="kong"></div>
        <div class="xia">
            <div class="left">
                <div class="x1" @click="userHandle">
                    <van-icon name="shop-o" size="26" color="#646464" />
                    <p>店铺</p>
                </div>
                <div class="x2" @click="collection">
                  <div v-show="!collectionState">
                    <van-icon name="like-o" size="26" color="#646464" />
                    <p>收藏</p>
                  </div>
                  <div v-show="collectionState">
                    <van-icon name="like" size="26" color="#f50"/>
                    <p>收藏</p>
                  </div>
                </div>
            </div>
            <div class="right">
                <button class="b1">
                    <div class="icon">￥</div>
                    <div class="monery_text">{{ proDataList.pro_price }}</div>
                    <div class="text">单买</div>
                </button>
                <button class="b2" @click="OpenGroupBuying">
                    <div class="icon">￥</div>
                    <div class="monery_text">{{ groupList.pro_gb_open_paynum }}</div>
                    <div class="text">拼单</div>
                </button>
            </div>
        </div>
  </div>
</template>

<script>
import { groupBuyingDetails, OpenJoinGroupBuying, editGroupBuying, wxpay, memberCollect } from './actions/index.js';
import { Toast } from 'vant';
export default {
  name: "group-booking-detail",
  data() {
    return {
      current: 0,
      value:4,
      barClass:false,
      proDataList:'',
      groupList:'',
      proDataListL:0,
      collectionState: false
    };
  },
  created() {
    this.groupBuyingDetailsFun()
  },
  methods: {
    groupBuyingDetailsFun() {
      var id = this.$route.query.id;
      groupBuyingDetails(id).then(res=>{
        this.proDataList = res.data.productList[0];
        this.proDataListL = res.data.productList[0].pro_carousel.length;
        this.groupList = res.data;
      })
    },
    // 开团
    OpenGroupBuying() {
      if(this.isWechat()){
        var obj = {
          pgbid:this.groupList.pgbid,
          pgrtype:1
        }
        OpenJoinGroupBuying(obj).then(res=>{
          if(res.code == 100){
            let obj = {
              order_no: res.data.order_number,
              money: parseFloat(res.data.monery),
              url: 'http://apis.lejiagx.cn/api/wxpay',
              type: 1,
              pay_class:2
            }

            wxpay(obj)
            .then((res) => {
                console.log(res)
                this.wxMsg = res.data;
                this.callpay(1,obj,this);

            })
          }else{
            Toast(res.msg)
          }
        })
      }
    },
    // 参团
    JoinGroupBuying(id) {
      if(this.isWechat()){
        var obj = {
          pgbid:this.groupList.pgbid,
          pgrtype:2,
          pgrpid:id
        }
        OpenJoinGroupBuying(obj).then(res=>{
          if(res.code == 100){

            let obj = {
              order_no: res.data.order_number,
              money: parseFloat(res.data.monery),
              url: 'http://apis.lejiagx.cn/api/wxpay',
              type: 1,
              pay_class:2
            }

            wxpay(obj)
            .then((res) => {
                console.log(res)
                this.wxMsg = res.data;
                this.callpay(1,obj,this);

            })
          }else{
            Toast(res.msg)
          }
        })
      }
    },
    //调用微信JS api 支付
    jsApiCall(type, obj, This){
      // type 1 开团 type 2参团 type 3购买
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

            editGroupBuying(obj).then(res=>{
              if(res.code == 100){
                This.groupBuyingDetailsFun();
              }else{
                Toast(res.msg)
              }
            })
          } else {

            obj.del = 1;
            editGroupBuying(obj).then(res=>{
              if(res.code == 100){
                This.groupBuyingDetailsFun();
              }else{
                Toast(res.msg)
              }
            })
          }
        });
    },
    callpay(type, obj, This) {

      if (typeof WeixinJSBridge == "undefined"){

        if( document.addEventListener ){

          document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(type, obj, This), false);
        }else if (document.attachEvent){

          document.attachEvent('WeixinJSBridgeReady', this.jsApiCall(type, obj, This)); 
          document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall(type, obj, This));
        }
      }else{

        this.jsApiCall(type, obj, This);
      }
    },
    // 去企业首页
    userHandle () {
      var obj = {
        entid: this.proDataList.entid,
        entfid: 0
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: '/merchants/produce',
        query: {res: res}
      })
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
    isWechat() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      }else{
        Toast('请在微信中打开');
        return false;
      }
    },
    collection() { 
      this.collectionState = !this.collectionState;
      let state = this.collectionState ? 1 : 0;
      // //state   1 收藏   0 取消
      memberCollect(this.proDataList.proid,2,state)
      .then((res) => {
        Toast(res.msg);
      })
      .catch((res) => {
        Toast(res);
      })
    },
  },
  mounted() {
    document.addEventListener('scroll',this.scroll)
  }
};
</script>

<style scoped lang="less">
.groupDetail {
    width: 100%;
    margin-bottom: 57px;
    background-color: rgb(247, 247, 247);
    .lunbo {
        width: 100%;
        margin-top: 46px;
        .custom-indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
  .center {
    background-color: #ffffff;
    .price {
      position: relative;
      .s1 {
        color: #d04443;
        font-size: 0.5rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
        display: inline-block;
      }
      .s2 {
        display: inline-block;
        color: #d04443;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
    .active {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: 10px;
      background: rgba(208, 68, 67, 0.08);
        .tages {
            width: 82%;
            display: flex;
            align-items: center;
            /deep/ .van-tag {
                margin-right: 8px;
            }
        }
        .get {
            width: 20%;
            height: 25px;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: flex-end;
            color: #d04443;
            .text {
                width: 100%;
                height: 25px;
                line-height: 25px;
                text-align: right;
            }
            .icon {
                height: 25px;
                line-height: 30px;
            }
        }
    }
    .product_desc {
      width: 90%;
      color: #282828;
      font-size: 0.45rem;
      font-weight: bold;
      margin-left: 0.5rem;
      margin-top: 0.3rem;
      padding-bottom: 0.4rem;
    }
  }
  .content {
    margin-top: 0.2rem;
    background-color: #ffffff;
    .c1 {
      width: 90%;
      height: 1.5rem;
      border-bottom: 1px solid #e5e5e5;
      margin-left: 0.5rem;
      .p1 {
        font-weight: bold;
        font-size: 0.5rem;
        display: inline-block;
        margin-top: 0.45rem;
      }
      .p2 {
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
    .c2 {
      .p1 {
        font-weight: bold;
        font-size: 0.5rem;
        display: inline-block;
        margin-top: 0.45rem;
        margin-left: 0.5rem;
      }
      .p2 {
        width: 75%;
        display: inline-block;
        margin-left: 0.5rem;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.3rem;
      }
    }
    .c3 {
      p {
        display: inline-block;
        margin-left: 2rem;
        margin-top: 0.5rem;
        padding-bottom: 0.3rem;
      }
    }
  }
  .booking {
      width: 100%;
      padding: 10px 20px 10px 20px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      background: #fff;
        .title {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 17px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #1E1E1E;
            opacity: 1;
        }
        .user {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .left {
                width: 40%;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 40px;
                    margin-right: -20px;
                }
            }
            .right {
                width: 60%;
                display: flex;
                justify-content: space-between;
                .detail {
                    width:70%;
                    background: #ffffff;
                    .detail_title {
                        color: #1E1E1E;
                        text-align: center;
                    }
                    .detail_time {
                        color: #989898;
                        text-align: center;
                    }
                }
                .btn {
                    width: 30%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: #D04443;
                    color: #fff;
                    border-radius: 3px;
                    font-size: 15px;
                    font-weight: 500;
                }
            }
        }
  }
  .shop {
    background-color: #ffffff;
    margin-top: 0.2rem;
    .p1 {
      color: #282828;
      font-size: 0.5rem;
      font-weight: bold;
      margin-top: 0.5rem;
      display: inline-block;
      margin-left: 50%;
      transform: translate(-50%);
    }
    .p2 {
      margin-left: 40%;
      margin-top: 0.2rem;
      padding-bottom: 0.2rem;
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
        width: 30%;
        display: flex;
        flex-direction: row;
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
        width: 70%;
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