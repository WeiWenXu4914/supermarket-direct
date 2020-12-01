<template>
  <div class="filtrate">
    <div class="title">
      <van-row>
        <van-col span="8" class="icon"><van-icon name="arrow-left" /></van-col>
        <van-col span="8" class="text">筛选</van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>
    <p class="p1">类别</p>
    <div class="body1"></div>
    <div class="body2">
      <div class="circle" v-for="(word,index) in words" v-bind:key="word.id">
        <!-- 循环内容 -->
          <button class="btn"  :class="{ red:changeRed == index}" @click="checked(index)">{{word.value}}</button>
      </div>
    </div>
    <div class="body3">
      <button class="btn1">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      changeRed:-1,
      words:[
        {id: 1 , value: '海鲜'},
        {id: 2 , value: '零食'},
        {id: 3 , value: '肉类'},
        {id: 4 , value: '名酒'},
        {id: 5 , value: '蛋类'},
        {id: 6 , value: '速食'},
        {id: 7 , value: '超市'},
        {id: 8 , value: '粮油'},
        {id: 9 , value: '其它'},
      ]
    }
  },
  methods:{
    checked(index){
      this.changeRed = index;
    }
  }
}
</script>

<style lang="less">
.filtrate{
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
.p1{
  margin-top: 30px;
  font-size: 17px;
}
.body1{
  margin-top: 10px;
  height: 1px;
  width: 100%;
  background-color: #E1E1E1;
}
.body2{
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  .circle{
    width: 30%;
    margin-left: 8px;
  }
  .btn{
    margin-top: 10px;
    background-color: white;
    border: 1px solid #C1C1C1;
    height: 40px;
    width: 100%;
    color: #202020;
    border-radius: 3px;
  }
  .red{
    margin-top: 10px;
    background-color: #FDF0EF;
    border: 1px solid #D04442;
    height: 40px;
    width: 100%;
    color: #D04442;
    border-radius: 3px;
  }
}
.body3{
  button{
    width: 90%;
    margin: 0 auto;
    background-color: #D04443;
    color: white;
    border: 0;
    border-radius: 2px;
    height: 45px;
    font-size: 15px;
    position: absolute;
    bottom: 10px;
    left: 18px;
  }
}
</style>
