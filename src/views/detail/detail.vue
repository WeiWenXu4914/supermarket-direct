<template>
  <div class="detail" @scroll="scroll($event)">
    <van-nav-bar
      :title="proDetail.pro_name"
      left-arrow
      fixed
      :border="false"
      @click-left="back"
      :class="[!barClass ? '' : 'navClassTrue']"
    />
    <div class="lunbo">
      <van-swipe @change="onChange" autoplay="3000">
        <van-swipe-item v-for = "(item,index) in proDetail.pro_carousel" :key="index">
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
          <div class="custom-indicator">{{ current + 1 }}/{{ proDetailL }}</div>
        </template>
      </van-swipe>
    </div>
    <div class="center">
      <div class="price">
        <p class="s1">￥</p>
        <p class="s2">{{proDetail.pro_price}}</p>
        <!-- <button>收藏</button> -->
      </div>
      <!-- <div class="active">
        <button class="btn1">满20减5</button>
        <p>领劵 ></p>
      </div> -->
      <p class="product_desc">{{proDetail.pro_name}}</p>
    </div>
    <!-- <div class="content">
      <div class="c1" @click="buyPro">
        <p class="p1">数量</p>
        <p class="p2">1</p>
      </div>
      <div class="c2" @click="buyPro">
        <p class="p1">地址</p>
        <p class="p2">内蒙古 包头市 东河区 维多利大厦1023</p>
      </div>
      <div class="c3">
        <p>运费：100</p>
      </div>
    </div> -->
    <div class="shop">
      <p class="p1">商品详情</p>
      <p class="pro_desc" v-if="proDetail.pro_desc != null">
        <img v-lazy="item.pro_des_path" v-for="(item, index) in proDetail.pro_desc" :key="index" />
      </p>
      <van-empty
        style="margin-top: 10px;"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="商家很懒，没添加商品详情"
        v-else />
    </div>
    <div class="kong"></div>
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="店铺" color="#111" @click="userHandle" />
      <div v-show="!collctionState">
        <van-goods-action-icon icon="star" text="收藏" color="#ccc" @click="collction"/>
      </div>
      <div v-show="collctionState">
        <van-goods-action-icon icon="star" text="已收藏" color="#f50" @click="collction"/>
      </div>
      <van-goods-action-button type="danger" text="预约下单" @click="buyPro()" />
    </van-goods-action>
    <van-sku
      v-model="skuShow"
      :sku="sku"
      :goods="goods"
      :goods-id="goods.goodsId"
      :quota="userBuy.quota"
      :quota-used="userBuy.quotaUsed"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      :show-add-cart-btn="false"
      buy-text="立即预约"
      @buy-clicked="onBuyClicked"
    />
  </div>
</template>

<script>
import { entProductDetail, memberCollect } from './actions/index.js';
import { Lazyload, Sku, Swipe, SwipeItem, Toast } from 'vant';
export default {
  name: "detail",
  data() {
    return {
      skuShow:false,
      userBuy:{
        quota:0, // 限购数,0代表不限
        quotaUsed:0, //已经购买的数量
      },
      goods: {
        goodsId:0,
        picture: ''
      },
      sku: {
        tree: [],
        price: '0.00', // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        none_sku: true, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '0', // 是否必填 '1' 表示必填
            placeholder: '给商家留言' // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      current: 0,
      value:0,
      proDetail:[],
      proDetailL:0,
      barClass:false,
      collctionState: false
    };
  },
  beforeCreate() {
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
			overlay: true,
			duration:0
		});
  },
  watch: {
    proDetail:function() {
      this.$nextTick(function(){
        // 页面渲染完延时关闭
        setTimeout(function(){
          Toast.clear();
        },200)
      })
    }
  },
  created() {
    this.getEntProductDetail();
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    onChange(index) {
      this.current = index;
    },
    getEntProductDetail(){
      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
      entProductDetail(data).then(res => {
        this.proDetail = res.data[0];
        this.goods.picture = res.data[0].pro_thumbnail;
        this.goods.goodsId = res.data[0].proid;
        this.proDetailL = res.data[0].pro_carousel.length;
        this.sku.price  = res.data[0].pro_price;
        this.sku.stock_num = res.data[0].pro_inventory;
        if(res.data[0].is_collect == 1){
          this.collctionState = true;
        }
      })
    },
    // 去企业首页
    userHandle () {
      var obj = {
        entid: this.proDetail.entid,
        entfid: 0
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: '/merchants/produce',
        query: {res: res}
      })
    },
    buyPro() {
      this.skuShow = true;
    },
    onBuyClicked(skuData) {
      var obj = {
        entid: this.proDetail.entid,
        goodsId:skuData.goodsId,
        buyNum:skuData.selectedNum,
        goodsPrice:(skuData.selectedNum * (this.proDetail.pro_price * 100)) / 100,
        messages:skuData.cartMessages['留言'],
        goodsName:this.proDetail.pro_name,
        discountsPrice:0,
        couponId:0
      }

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: '/reservate',
        query: {
          res: res
        }
      })
    },
    collction() { 
      let state = !this.collctionState ? 1 : 0;
      //state   1 收藏   0 取消
      memberCollect(this.proDetail.proid,2,state)
      .then((res) => {
        if(res.code == 100){
          if(res.code == 100 && state == 1){
            this.collctionState = true;
          }else if(res.code == 100 && state == 0){
            this.collctionState = false;
          }
        }
        Toast(res.msg)
      })
      .catch((res) => {
        Toast(res);
      })
    },
    scroll(e) {
      if(e.path[1].scrollY >= 50){
        this.barClass = true;
      }else if (e.path[1].scrollY <= 50) {
        this.barClass = false;
      }
    }
  },
  mounted() {
    document.addEventListener('scroll',this.scroll)
  }
};
</script>

<style scoped lang="less">
.detail {
  width: 100%;
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
        font-weight: bold;
      }
      button {
        border: 1px solid #d04443;
        color: #d04443;
        background-color: #ffffff;
        outline: none;
        width: 1.5rem;
        line-height: 0.8rem;
        position: absolute;
        right: 0.5rem;
        top: 0.4rem;
      }
    }
    .active {
      width: 90%;
      height: auto;
      overflow: auto;
      zoom:1;
      margin: 0.4rem 0rem 0rem 0.4rem;
      background: rgba(208, 68, 67, 0.08);
      .btn1 {
        width: 1.9rem;
        line-height: 0.8rem;
        background-color: rgba(208, 68, 67, 0.08);
        border: 1px solid #d04443;
        outline: none;
        margin: 0.3rem 0rem 0rem 0.5rem;
        color: #d04443;
        padding: 0px 0.2rem 0px 0.2rem;
      }
      p {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        color: #d04443;
        float: right;
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
    margin-top: 0.5rem;
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
    margin-top: 0.5rem;
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
    height: 2rem;
  }
  .xia {
    display: flex;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    img {
      width: 0.7rem;
      padding-top: 0.15rem;
    }
    .x1 {
      margin-left: 0.5rem;
    }
    .x2 {
      margin-left: 1rem;
    }
    .b1 {
      background-color: #d35251;
      color: #ffffff;
      outline: none;
      border: none;
      height: 1.5rem;
      width: 2.55rem;
      margin-left: 1.53rem;
    }
    .b2 {
      background-color: #d04443;
      color: #ffffff;
      outline: none;
      border: none;
      height: 1.5rem;
      width: 2.55rem;
    }
  }
  .pro_desc{
    width:100%;
    height:auto;
    img{
      width:100%;
      height:auto;
    }
  }
  .van-sku-container {
    height: auto;
    min-height: 10%;
  }
  .van-goods-action-button--last {
    border-radius: 50px;
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
