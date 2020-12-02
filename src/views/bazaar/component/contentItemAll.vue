<template>
  <div class="content-container-all">
    <!-- <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多订单了"
     @load="onLoad"
     :immediate-check="false"
     > -->
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
          <div class="circle" v-for="word in item.product_list" v-bind:key="word.id">
            <!-- 循环内容 -->
            <div class="product" @click="reserve(word)">
              <img :src='word.pro_thumbnail' alt="" class="pic">
              <p class="title">{{ word.pro_name | strSub(7) }}</p>
              <p class="price"><span>￥</span>{{word.pro_price }}</p>
            </div>
            <button class="btn" @click="reserve(word)">立即购买</button>
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
    <!-- </van-list> -->
  </div>
</template>

<script>
import { getLejiaProductList, phoneList } from '../actions/index'
import { List, Icon, Toast } from 'vant';
export default {
  mounted() {
     let obj = {
      size: 10,
      num: 1
    }
    
    getLejiaProductList(obj)
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
      })
      .catch((res) => {
          console.log(res);
          // Toast.fail('获取数据失败，请重试');
      })
      //调转公司详情路由信息
    phoneList(this.query)
      .then((res) => {
        this.prvUrl = res.data.prvUrl;
      })
      .catch((res) => {
            console.log(res);
            Toast.fail('获取数据失败，请重试');
      })
  },
  data(){
    return {
      items: [],
      itemsAll: [],
      prvUrl: {},
      query: {
        num: 1,
        size: 100,
      },
      looading: false,
      finished: false,
      page: 1,
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
    //下单
    reserve(data) {
      let obj = {
        proid: data.pro_id
      };
      let res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path:'/commdityPay',
        query:{
          res: res
        }
      });
    },
    onLoad() {
      this.page ++;
      if(this.page >= 2) {

        let obj = {
          size: 10,
          num: this.page
        }
        getLejiaProductList(0,obj)
        .then((res) => {
          // this.items = res.data.list.data;
          console.log(obj)
          console.log(res.data.list.data)
          // console.log(this.items)
        })
        .catch((res) => {
              console.log(res);
              Toast.fail('获取数据失败，请重试');
        })

      }

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
.content-container-all {
  margin-bottom: 15px;
  .shoptitle{
    width: 94%;
    margin: 0px auto;
    .title1{
      display: flex;
      align-items: center;
      margin: 15px 0 15px 0;
      font-size: 16px;
      .right{
        width: 88%;
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
          line-height:30px
        }
      }
      .into{
        width: 12%;
        text-align: right;
        color: #D04443;
        opacity: 1;
        font-weight: 500;
      }
    }
    .see-more {
        padding: 10px 0 5px 0;
        text-align: center;
        font-size: 14px;
        color: #D04443;
        .van-icon {
          transform: translateY(1px);
          font-size: 12px;
        }
    }
    .see-more-close {
        padding: 10px 0 5px 0;
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
        text-align: center;
        margin: 8px 0px 0px 8px;
        //border: 1px solid #E0E0E0;
        -moz-box-shadow:0px 0px 5px #E0E0E0;
        -webkit-box-shadow:0px 0px 5px #E0E0E0;
        box-shadow:0px 0px 5px #E0E0E0;
        border-radius: 5px;
        .product{
          .pic{
            border-radius: 5px 5px 0px 0px;
            width: 100%;
            height: 70px;
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
            width: 85%;
            margin: 8px auto;
            color:#DB1043;
            font-size: 16px;
            text-align: left;
            span {
              padding: 2px 0 0 2px;
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
