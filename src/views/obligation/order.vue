<template>
  <div class="order">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1" @click="back()" />
      <div class="inp">
          <img src="../../components/img1/搜索.png" alt="">
          <input type="text " v-model="value" placeholder="搜索商品名称/订单编号">
      </div>
      <p class="p2" @click="search">搜索</p>
    </div>
    <div class="content" v-for="(item,index) in dataList" :key="index" @click="toDetail(item)">
      <van-card
        class="item"
        :num="item.buy_num"
        :price="item.pro_price"
        :title="item.pro_name"
        :thumb="item.pro_thumbnail"
      >
        <template #tags>
          <van-tag plain type="danger">{{ titleInfo(item.status) }}</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { orderSearch } from './actions';
import { Toast,Card } from 'vant'
export default {
  name: "order",
  data() {
    return {
      value: '',
      dataList: []
    }
  },
  watch: {
    'value': function() {
      if(this.value == '') {
        return;
      }
      orderSearch(this.value)
        .then((res) => {
              this.dataList = res.data.filter( item => item.is_del != 1 );
              console.log(res)
        })
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    search() {
        orderSearch(this.value)
            .then((res) => {
                  this.dataList = res.data.filter( item => item.is_del != 1 );
                  
            })
            .catch((err) => {
                Toast.fail('搜索失败，请重试')
            })
    },
    toDetail(val) {
      let data = JSON.stringify(val);
      this.$router.push({
                path: '/orderDetail',
                query: {
                    data
                }
            })
    },
    //状态
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
            return "交易关闭";
        } else if(val == 5) {
            return "无效订单";
        } else if(val == 6) {
            return "过期";
        }
    },
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.order{
    .content {
      width: 90%;
      margin: 8px auto;
      /deep/.van-card__title {
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
        font-size: 18px;
        font-weight: 600;
      }
      /deep/.van-card__price {
        color: red;
        text-indent: 10px;
      }
      .van-card__num {
        margin-right: 10px;
        font-size: 15px;
      }
      .van-tag--danger {
        font-size: 14px;
        margin-left: 10px;
        padding: 1 3px;
        ::after {
          border: none;
        }
      }
      .van-hairline--surround::after {
          border-width: 0rem !important;
      }
    }
    .top {
    display: flex;
    margin-top: 0.5rem;
    padding-bottom: 0.3rem;
    background-color: #ffffff;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.25rem 0rem 0rem 0.3rem;
    }
    .inp{
        width: 70%;
        height: 1rem;
        background-color: #F1F1F1;
        position: relative;
        margin: 0rem 0rem 0rem 0.5rem;
        border-radius: 0.1rem;
        img{
            width: 0.7rem;
            margin: 0.15rem 0rem 0rem 0.3rem;
        }
        input{
            height: 0.8rem;
            position: absolute;
            left: 1rem;
            top: 0.1rem;
            border: none;
            outline: none;
            background-color: #F1F1F1;
        }
    }
    .p2{
        color: #D04443;
        font-size: 0.4rem;
        margin: 0.2rem 0rem 0rem 0.3rem;
    }
    
  }
}

</style>