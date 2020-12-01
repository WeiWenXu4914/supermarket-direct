<template>
  <div class="commodity">
    <div class="title">
      <van-row>
        <van-col span="8" class="icon"><van-icon name="arrow-left" /></van-col>
        <van-col span="8" class="text">乐家市场商品</van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>
    <van-tabs v-model="active" title-active-color="#292929" title-inactive-color="#4E4E4E">
      <van-tab title="已上架">
        <!-- <div v-for="item in items" v-bind:key="item.id"> -->
        <div class="show1" v-show="isShow1">
          <div v-for="(item,index) in items" :key="index">
            <!-- 内容 -->
                <div class="body">
                  <div class="content">
                    <div class="content_one">
                      <img :src="item.url" alt="" class="img1">
                    </div>
                    <div class="content_two">
                      <p>收纳袋子 大号装衣物被子 搬家行李打包</p>
                      <div class="content_two1">
                        <span class="bq">月售：354</span>
                        <span class="bq">库存：35</span>
                        <span class="bq">收藏：35</span>
                      </div>
                      <div class="content_two2">
                        <p>￥50.00</p>
                        <p class="b1">代销价：<span class="dxj">￥00.00</span></p>
                      </div>
                    </div>
                  </div>
                  <div class="soldout">
                    <button class="btn">下架乐家市场</button>
                  </div>
                  <div class="boundary"></div>
                </div>
          </div>
          <div class="body2">
            <button class="allcheck">添加商品</button>
            <button class="next" @click="dispose">批量处理</button>
          </div>
        </div>
        <div class="show2" v-show="isShow2">
          <div v-for="(item,index) in items" :key="index">
            <!-- 批量处理内容 -->
            <van-checkbox-group v-model="itemss" checked-color="#D04443">
              <van-checkbox :name="item.id">
                <div class="body">
                  <div class="content">
                    <div class="content_one">
                      <img :src="item.url" alt="" class="img1">
                    </div>
                    <div class="content_two">
                      <p>收纳袋子 大号装衣物被子 搬家行李打包</p>
                      <div class="content_two1">
                        <span class="bq">月售：354</span>
                        <span class="bq">库存：35</span>
                        <span class="bq">收藏：35</span>
                      </div>
                      <div class="content_two2">
                        <p>￥50.00</p>
                        <p class="b1">代销价：<span class="dxj">￥00.00</span></p>
                      </div>
                    </div>
                  </div>
                  <div class="soldout">
                    <button class="btn">下架乐家市场</button>
                  </div>
                  <div class="boundary"></div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="body2">
            <button class="allcheck">添加商品</button>
            <button class="next">下架乐家市场</button>
          </div>
        </div>
      </van-tab>
      <van-tab title="已下架">
        <div class="show3" v-show="isShow3">
          <div v-for="item in items" v-bind:key="item.id">
            <!-- 内容 -->
            <div class="body">
              <div class="content">
                <div class="content_one">
                  <img :src="item.url" alt="" class="img1">
                </div>
                <div class="content_two">
                  <p>收纳袋子 大号装衣物被子 搬家行李打包</p>
                  <div class="content_two1">
                    <span class="bq">月售：354</span>
                    <span class="bq">库存：35</span>
                    <span class="bq">收藏：35</span>
                  </div>
                  <div class="content_two2">
                    <p>￥50.00</p>
                    <p class="b1">代销价：<span class="dxj">￥00.00</span></p>
                  </div>
                </div>
              </div>
              <div class="soldout">
                <button class="btn1">上架乐家市场</button>
              </div>
              <div class="boundary"></div>
            </div>
          </div>
          <div class="body2">
            <button class="allcheck">添加商品</button>
            <button class="next" @click="xjdispose">批量处理</button>
          </div>
        </div>
        <div class="show4" v-show="isShow4">
          <div v-for="item in items" v-bind:key="item.id">
            <!-- 内容 -->
            <van-checkbox-group v-model="xjitems" checked-color="#D04443">
              <van-checkbox :name="item.id">
                <div class="body">
                  <div class="content">
                <div class="content_one">
                  <img :src="item.url" alt="" class="img1">
                </div>
                <div class="content_two">
                  <p>收纳袋子 大号装衣物被子 搬家行李打包</p>
                  <div class="content_two1">
                    <span class="bq">月售：354</span>
                    <span class="bq">库存：35</span>
                    <span class="bq">收藏：35</span>
                  </div>
                  <div class="content_two2">
                    <p>￥50.00</p>
                    <p class="b1">代销价：<span class="dxj">￥00.00</span></p>
                  </div>
                </div>
              </div>
                  <div class="soldout">
                <button class="btn1">上架乐家市场</button>
              </div>
                  <div class="boundary"></div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="body2">
            <button class="allcheck">添加商品</button>
            <button class="next" >上架乐家市场</button>
          </div>
        </div>
      </van-tab>
      <van-tab title="审核中">暂无内容</van-tab>
      <van-tab title=""></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      itemss:[],
      xjitems:[],
      items: [
        { id:  1 , url:require('./img/web.png')},
        { id:  2 , url:require('./img/web1.png')}
      ],
      checked: true,
      isShow1: true,
      isShow2:false,
      isShow3: true,
      isShow4:false,
    }
  },
  methods:{
    dispose(){
      this.isShow1 = !this.isShow1;
      this.isShow2 = !this.isShow2;
    },
    xjdispose(){
      this.isShow3 = !this.isShow3;
      this.isShow4 = !this.isShow4;
    }
  }
}
</script>

<style lang="less">
.commodity{
  width: 95%;
  margin: 0 auto;
  margin-top: 5px;
}
.title{
  .icon{
    height: 25px;
    display: flex;
    align-items: center;
  }
  .text{
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }
}
.van-tabs__content{
  height: 86vh;
  .body{
    width: 95%;
    margin: 0 auto;
    .content{
      display: flex;
      align-items: center;
      margin-top: 15px;
      .content_one{
        .img1{
          width: 80px;
          height: 80px;
          border-radius: 2px;
        }
      }
      .content_two{
        margin-left: 10px;
        p{
          font-size: 15px;
          font-weight: 600;
          margin: 10px 0 0px;
        }
        .content_two1{
          display: flex;
          align-items: center;
          .bq{
            font-size: 14px;
            color: #5F5F5F;
            margin-right: 10px;
          }

        }
        .content_two2{
          display: flex;
          align-items: center;
          p{
            color: #D04443;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            margin: 10px 0 0px;
          }
          .b1{
            margin-left: 15px;
            font-size: 12px;
            color: #242424;
            font-weight: 500;
            .dxj{
              color: #D04443;
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
      }
    }
    .soldout{
      text-align: right;
      margin: 10px 0px 15px 0px;
      .btn{
        background-color: white;
        color: #272727;
        height: 30px;
        border:1px solid #B9B9B9;
        width: 40%;
        border-radius: 3px;
        margin-right: 0;
      }
      .btn1{
        background-color: #D04443;
        color: white;
        height: 30px;
        border:0;
        width: 40%;
        border-radius: 3px;
        margin-right: 0;
      }
    }
    .boundary{
      margin-top: 10px;
      height: 1px;
      width: 100%;
      background-color: #E1E1E1;
    }
  }
}

.body2{
  display: flex;
  align-items: center;
  .allcheck{
    width: 40%;
    background-color: #F2F2F2;
    color: #222222;
    height: 45px;
    font-size: 15px;
    border: 0;
    border-radius: 2px;
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
  .next{
    width: 50%;
    background-color: #D04443;
    color: white;
    border: 0;
    border-radius: 2px;
    height: 45px;
    font-size: 15px;
    margin-left: 10px;
    position: absolute;
    bottom: 10px;
    left: 45%;
  }
}
</style>
