<template>
  <div class="entrance">
    <div class="title">
      <van-row>
        <van-col span="8" class="icon"><van-icon name="arrow-left" /></van-col>
        <van-col span="8" class="text">推广</van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>
    <div class="body">
      <van-row type="flex">
        <van-col span="10">
          <div class="pic1">
            <p class="p1_1">推广商品</p>
            <p class="p1_2">查看<van-icon name="arrow" /></p>
          </div>
        </van-col>
        <van-col span="10">
          <div class="pic1">
            <p class="p1_1">管理商品</p>
            <p class="p1_2">查看<van-icon name="arrow" /></p>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.entrance{
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
.body{
  .pic1{
    height: 80px;
    background-color: #FB6C47;
    color: white;
    border-radius: 4px;
    text-align: center;
    margin-top: 20px;
    margin-right: 10px;
    .p1_1{
      font-size: 18px;
      padding-top: 20px;
    }
    .p1_2{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
