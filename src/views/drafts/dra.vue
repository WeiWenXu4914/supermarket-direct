<template>
  <div class="dra">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()" />

      <p class="p1">草稿箱</p>
      <p class="p2">取消</p>
    </div>
    <van-radio-group v-model="radio" class="list">
      <div class="model">
        <div class="left">
          <van-radio name="1" checked-color="#D04443" class="icon"></van-radio>
        </div>
        <div class="right">
        <p class="p1">外媒关注王毅记者会</p>
        <p class="p2">文章</p>
        </div>
      </div>
      <div class="model">
        <div class="left">
          <van-radio name="2" checked-color="#D04443" class="icon"></van-radio>
        </div>
        <div class="right">
        <p class="p1">华春莹回击窃取疫苗论</p>
        <p class="p2">文章</p>
        </div>
      </div>
    </van-radio-group>
    <div class="btn">
      <van-button plain type="primary" class="all">全选</van-button>
      <van-button type="primary" class="dec">删除</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1"
    };
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
.dra {
  .top {
    display: flex;
    border-bottom: 1px solid #d9d9d9;
    margin: 0.3rem 0rem 0rem 0.5rem;
    padding-bottom: 0.5rem;
    width: 90%;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    .p2 {
      margin-left: 3rem;
      font-size: 0.45rem;
      margin-top: 0.1rem;
      color: #232323;
    }
  }
  .list {
    .model {
      width: 90%;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      padding-bottom: 0.5rem;
      .left{
      .icon{
        margin-top: 0.5rem;
      }
      }
      .right{
        margin: 0rem 0rem 0rem 0.3rem;
      .p1 {
          color: #292929;
          font-size: 0.5rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
        }
        .p2{
          color: #7A7A7A;
          margin-top: 0.2rem;
        }
      } 
    }
  }
  .btn {
    .all {
      border: 1px solid #cacaca;
      width: 40%;
      height: 1rem;
      background-color: #ffffff;
      font-family: Source Han Sans CN;
      font-weight: 400;
      position: absolute;
      bottom: 0.5rem;
      left: 0.5rem;
      border-radius: 0.1rem;
      color:#252525;
    }
    .dec {
      background-color: #d04443;
      width: 40%;
      height: 1rem;
      color: #ffffff;
      outline: none;
      border: none;
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      border-radius: 0.1rem;
    }
  }
}
</style>