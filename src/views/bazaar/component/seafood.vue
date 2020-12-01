<template>
  <div class="container">
    <div class="shoptitle" v-for="(item,index) in items" :key="index">
      <div class="title1">
        <div class="right">
          <span class="scrip">乐家</span>
          <span class="shopname">五粮液中酿专卖店</span>
        </div>
        <span class="into">进店</span>
      </div>
      <div class="prod">
        <div class="circle" v-for="(word,index) in words" v-bind:key="word.id">
          <!-- 循环内容 -->
          <div class="product">
            <img :src='word.url' alt="" class="pic">
            <p class="test">盛耳 银耳500g...</p>
            <p class="price">￥50.00</p>
          </div>
          <button class="btn"  @click="checked">预约下单</button>
        </div>
      </div>
    </div>
    <div class="more">
      <button class="learn">查看更多</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "meat",
  data(){
    return {
      items:[
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
      ],
      words:[
        {id: 1,url: require("./../img/pic5.png")},
        {id: 2,url: require("./../img/pic6.png")},
        {id: 3,url: require("./../img/pic2.png")},
      ]
    }
  }
}
</script>

<style lang="less">
.shoptitle{
  .title1{
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px 0;
    font-size: 16px;
    .right{
      .scrip{
        background-color: #FE674D;
        color: white;
      }
      .shopname{
        margin-left: 8px;
        background-color: white;
      }
    }
    .into{
      color: #D04443;
    }
  }
  .prod{
    display: flex;
    .circle{
      width: 30%;
      text-align: center;
      margin: 8px 0px 0px 8px;
      border: 1px solid #E0E0E0;
      .product{
        .pic{
          margin-top: 10px;
          width: 60px;
          //text-align: center;
        }
        .price{
          margin-top: 15px;
          color: #DB1043;
          font-size: 16px;
          display: flex;
        }
      }
      .btn{
        width: 96%;
        height: 25px;
        margin: 0 auto;
        background-color: #DB1043;
        color: white;
        border: 0;
        margin-bottom: 5px;
      }
    }
  }
}
.more{
  .learn{
    margin-top: 20px;
    margin-bottom: 60px;
    width: 100%;
    height: 45px;
    border: 0;
    border-radius: 3px;
    background-color: #EEEEEE;
    color: #484848;
    font-size: 16px;
  }
}
</style>
