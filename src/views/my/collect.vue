<template>
  <div class="collect">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1" @click="back()" />
      <p class="p1">收藏</p>
      <!-- <img src="../../components/img1/搜索.png" alt class="i2" /> -->
      <p class="p2" @click="guanli">管理</p>
    </div>
    <van-tabs v-model="active" line-width="0" title-active-color="#D04442" class="vant_top" >
      <van-tab :title=this.a class="tab_name">
        <div v-if="ShrineList.length !== 0">
            <div class="list" v-for="(item,index) in ShrineList" :key="index"  >
              <div class="model" @click="proDetail(item)">
                <div class="left">
                  <img :src="item.myCollect_item[0].pro_desc" alt />
                </div>
                <div class="right">
                  <p class="p1">{{item.myCollect_item[0].pro_name}}</p>
<!--                  <button class="b1">自提</button>-->
<!--                  <button class="b2">物流配送</button>-->
<!--                  <br />-->
                  <p class="p2">￥</p>
                  <p class="p3">{{item.myCollect_item[0].pro_price}}</p>
                </div>
              </div>
              <div class="b" v-show="show1">
                 <button class="btn3" @click="deleteItem(item)">删除</button>
              </div>
            </div>
        </div>
        <span class="tishi" style="width: 100%;height: 200px;margin: 0px 120px;;line-height: 200px;" v-else>亲，暂无收藏商品哦~</span>
      </van-tab>
      <van-tab :title=this.b >
        <div v-if="articleList.length !== 0">
            <div class="list" v-for="(item,index) in articleList" :key="index">
              <div class="model">
                <div class="left">
                  <img :src="item.myCollect_item[0].graphic_thumbnail[0].graphic_thumbnail_path" alt />
                </div>
                <div class="right">
                  <p class="p1">{{item.myCollect_item[0].graphic_name}}</p>
    <!--              <button class="b1">自提</button>-->
    <!--              <button class="b2">物流配送</button>-->
    <!--              <br />-->
    <!--              <p class="p2">￥</p>-->
    <!--              <p class="p3">{{item.myCollect_item[0].pro_price}}</p>-->
                </div>
              </div>
              <div class="b" v-show="show1">
                <button class="btn3">删除</button>
              </div>
            </div>
        </div>
        <span class="tishi" style="width: 100%;height: 200px;margin: 0px 120px;;line-height: 200px;" v-else>亲，暂无收藏文章哦~</span>
      </van-tab>
      <van-tab :title=this.c>
        <div v-if="lifecycle.length !== 0">
            <div class="list" v-for="(item,index) in lifecycle" :key="index">
              <div class="model">
                <div class="left">
                  <img :src="item.myCollect_item[0].mem_head_portrait" alt />
                </div>
                <div class="right">
                  <p class="p1">{{item.myCollect_item[0].mem_name}}</p>
                  <!--              <button class="b1">自提</button>-->
                  <!--              <button class="b2">物流配送</button>-->
                  <!--              <br />-->
                  <!--              <p class="p2">￥</p>-->
                  <!--              <p class="p3">{{item.myCollect_item[0].pro_price}}</p>-->
                </div>
              </div>
              <div class="b" v-show="show1">
                <button class="btn3">删除</button>
              </div>
            </div>
        </div>
        <span class="tishi" style="width: 100%;height: 200px;margin: 0px 120px;;line-height: 200px;" v-else>亲，暂无收藏服务哦~</span>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { EnShrine, memberCollect } from './actions/index';
import { Toast } from 'vant';
export default {
  data() {
    return {
      a: '',
      b: '',
      c: '',
      show1: false,
      ShrineList: [],
      articleList: [],
      lifecycle: [],
      active: 0 // 当前分页索引
    };
  },
  created() {
    this.getEnShrine();
  },
  methods: {
    proDetail(res){
      var obj = {
        proid: res.mem_collect_id
      };
      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path:'/detail',
        query:{
          res:res
        }
      });
    },
    // 收藏夹接口
    getEnShrine() {
      EnShrine().then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].mem_collect_class == 2) {
            this.ShrineList.push(res.data.list[i]);
          } else if (res.data.list[i].mem_collect_class == 1) {
            this.articleList.push(res.data.list[i]);
          } else if (res.data.list[i].mem_collect_class == 3) {
            this.lifecycle.push(res.data.list[i]);
          }
        }
        // for (let i = 0; i < res.data.list[0].graphic_thumbnail[0]; i++) {
        //
        // }
        // this.ShrineList = res.data.list;
        this.a = res.data.class[2];
        this.b = res.data.class[1];
        this.c = res.data.class[3];
      }).catch(() => {

      });
    },

    guanli() {
      this.show1 = !this.show1;
    },
    back() {
      this.$router.go(-1);
    },
    deleteItem(item) {
      console.log(item)
      memberCollect(item.myCollect_item[0].proid,item.mem_collect_class)
      .then((res) => {
        console.log(res)
        if(res.code == 100) {
          Toast("取消成功");
           this.getEnShrine();
           this.ShrineList = [];
           this.articleList = [];
           this.lifecycle = [];
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.collect {
  .van-tabs__nav{
    width: 100%;

}
.van-tab__text--ellipsis{
    font-size: 0.5rem;
    // margin-top: 0.5rem;
}
// .van-tab:nth-child(1){
//     margin-left: 0rem;

// }
// .van-tab:nth-child(2){
//     margin-left: -0.3rem;
// }
// .van-tab:nth-child(3){
//     margin-left: -0.5rem;
// }
[class*=van-hairline]::after{
    border: none;
}
  .top {
    display: flex;
    position: relative;
    margin-top: 0.5rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .i2 {
      width: 0.7rem;
      height: 0.7rem;
      margin: 0.05rem 0rem 0rem 2.5rem;
    }
    .p1 {
      margin-left: 3.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
    }
    .p2 {
      position: absolute;
      right: 20px;
      font-size: 0.45rem;
      color: #232323;
      margin: 0.05rem 0rem 0rem 0.1rem;
    }
  }
  .float {
    display: flex;
    margin-top: 0.5rem;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.3rem;
    p {
      color: #2f2f2f;
      font-size: 0.45rem;
      margin-left: 0.5rem;
    }
  }
  .list {
    display: flex;
     .b{
       display: flex;
        .btn3 {
          width: 50px;
          height: 30px;
          border-radius: 3px;
          border:1px solid #DCDCDC;
          background-color: #f5f5f5;
          margin-right: 5px;
          margin: 56px 10px 0 0;
        }
      }
    .model {
      display: flex;
      margin: 0.3rem 0rem 0rem 0.3rem;
      .left {
        img {
          width: 3rem;
          height: 3rem;
        }
      }
      .right {
        width: 175px;
        margin-left: 0.2rem;
        .p1 {
          font-size: 0.45rem;
          font-weight: bold;
          color: #282828;
        }
        .b1 {
          width: 1rem;
          color: #d04443;
          border: none;
          outline: none;
          border: 1px solid #d04443;
          background-color: #ffffff;
          border-radius: 0.1rem;
        }
        .b2 {
          width: 1.8rem;
          color: #d04443;
          border: none;
          outline: none;
          border: 1px solid #d04443;
          background-color: #ffffff;
          border-radius: 0.1rem;
          margin-left: 0.1rem;
        }
        .p2 {
          display: inline-block;
          color: #db1043;
          font-size: 0.3rem;
          margin-top: 0.4rem;
        }
        .p3 {
          display: inline-block;
          color: #db1043;
          font-size: 0.5rem;
          font-weight: bold;
          margin-top: 0.4rem;
        }
      }
    }
  }
  .van-tabs__wrap .van-hairline--top-bottom{
    border: none;

  }

}
</style>
