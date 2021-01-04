<template>
  <div class="content-container-item">
    <div v-show="items.length === 0 ? false : true">  
      <div class="shoptitle" v-for="(item,index) in items" :key="index">
        <div class="title1" @click="intoStore(item.entid)">
          <div class="right">
            <span class="scrip">
              <img :src="item.ent_logo" alt="">
            </span>
            <span class="shopname">{{ item.ent_name }}</span>
          </div>
          <span class="into">进店</span>
        </div>
        <div class="prod">
          <div 
           class="circle" 
           v-for="word in item.product_list" 
           v-bind:key="word.id" 
           > 
            <div class="product" @click="reserve(word)">
              <img :src='word.pro_thumbnail' alt="" class="pic">
              <p class="price"><span class="icon">￥</span>{{ word.pro_price }}</p>
            </div>
          </div>
        </div>
        <p 
         class="see-more" 
         @click="seeMore(index)"
         v-if="item.length > 3"
         v-show="item.product_list.length == 3"
        >展开查看更多商品 <van-icon name="arrow-down"/>
        </p>
        <p 
         class="see-more-close" 
         @click="closeSeeMore(index)"
         v-if="item.length"
         v-show="item.product_list.length > 3"
        >收起 <van-icon name="arrow-up"/>
        </p>
      </div>

    </div>
    <div v-show="items.length === 0 ? true : false">
      <van-empty description="无商品信息" />
    </div>
  </div>
</template>

<script>
import { getLejiaProductList, phoneList } from '../actions/index';
import { Toast,Empty } from 'vant';
Vue.use(Toast);
Vue.use(Empty);
export default {
  name: "meat",
  props: ["cindex"],
  beforeCreate() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      overlay: true,
      duration: 0
    });
  },
  mounted() {
     let obj = {
      size: 200,
      num: 1
    },
    index = 0;
    getLejiaProductList(this.cindex,obj)
      .then((res) => {
        const all = res.data.list.data;
        //对象转数组
        this.items = Object.values(all);
        //深拷贝数据
        this.itemsAll = JSON.parse(JSON.stringify(all));
        this.itemsAll = Object.values(this.itemsAll);

        //首次截取三个商品
        this.items.map((item) => {
          item.length = item.product_list.length;
          item.product_list.splice(3);
        })
        Toast.clear();
      })
      .catch((res) => {
        Toast.clear();
        console.log(res);
        Toast.fail('获取数据失败，请重试');
      });
    //调转公司详情路由信息
    phoneList(this.query)
      .then((res) => {
        this.prvUrl = res.data.prvUrl;
      })
  },
  data() {
    return {
      items: [],
      itemsAll: [],
      query: {
        num: 1,
        size: 10,
      }
    }
  },
  methods: {
    //进店
    intoStore(id) {
      let obj = {
        entid: id,
        entfid: this.prvUrl.entfid
      };
      let res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: '/merchants/produce',
        query: {res: res}
      })
    },
    //预约下单
    reserve(data) {
      let obj = {
        proid: data.pro_id || data.proid
      };
      let res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path:'/commdityPay',
        query:{
          res: res
        }
      });
    },
    seeMore(index) {
      this.items[index].product_list = JSON.parse(JSON.stringify(this.itemsAll[index].product_list));
    },
    closeSeeMore(index) {
      this.items[index].product_list.splice(3);
    },
  }
}
</script>

<style lang="less">
.content-container-item {
  // margin-bottom: 15px;
  background-color: #F0F0F0;
  .shoptitle{
    width: 94%;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 10px;
    .title1{
      display: flex;
      align-items: center;
      margin: 10px 10px 0px 10px;
      padding-top: 10px;
      font-size: 16px;
      justify-content: space-between;
      .right{
        width: 80%;
        display: flex;
        align-items: center;
        .scrip{
          em {
            background: linear-gradient(90deg, #FE674D 0%, #F82A2E 100%);
            opacity: 1;
            border-radius: 2px;
            color: white;
            font-size: 12px;
            font-weight: 600;
            padding: 5px 8px 5px 5px;
            margin-left: 5px;
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 30px;
          }
        }
        .shopname{
          margin-left: 8px;
          font-weight: bolder !important;
          background-color: white;
          line-height:30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
      }
      .into{
        padding: 4px 8px;
        border-radius: 20px;
        text-align: center;
        color: #F50;
        opacity: 1;
        font-size: 13px;
        font-weight: 500;
        border: 1px solid #F50;
      }
    }
    .see-more {
        padding: 12px 0 0px 0;
        text-align: center;
        font-size: 14px;
        color: #D04443;
        .van-icon {
          transform: translateY(1px);
          font-size: 12px;
        }
    }
    .see-more-close {
        padding: 10px 0 0px 0;
        text-align: center;
        font-size: 14px;
        color: #ccc;
        .van-icon {
          transform: translateY(1px);
          font-size: 12px;
        }
    }
    .prod{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .circle{
        width: 30%;
        // text-align: center;
        margin: 8px 0px 0px 8px;
        //border: 1px solid #E0E0E0;
        -moz-box-shadow:0px 0px 5px #E0E0E0;
        -webkit-box-shadow:0px 0px 5px #E0E0E0;
        box-shadow:0px 0px 5px #E0E0E0;
        border-radius: 5px;
        .product{
          position: relative;
          height: 100px;
          .pic{
            border-radius: 3px;
            width: 100%;
            height: 100%;
            object-fit:cover;
          } 
          .title{
            width: 85%;
            margin: 2px auto;
            padding-left: 2px;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
          .price{
            position: absolute;
            bottom: 0;
            padding: 1px 5px;
            // margin: 8px auto;
            color:#fff;
            font-size: 12px;
            text-align: left;
            background-color: rgba(0, 0, 0, 0.4);
            border-top-right-radius: 5px;
            .icon {
              font-size: 12px;
              transform: scale(0.7);
            }
          }
        }
        .btn{
          width: 85%;
          height: 25px;
          margin: 0 auto;
          color: white;
          border: 0;
          margin-bottom: 7px;
          font-size: 12px;
          font-weight: 500;
          background: #DB1043;
          opacity: 1;
          border-radius: 2px;
        }
      }
    }
  }
  
}
</style>
