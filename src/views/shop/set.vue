<template>
  <div class="set">
    <div class="top">
      <img src="../../components/img1/返回.png" alt @click="back()" />
      <p class="p1">设置</p>
    </div>
    <div class="content">
      <div class="modle">
        <p class="p1">关于我们</p>
        <p
          class="p2"
        >京东于2004年正式涉足电商领域，2019年，京东集团市场交易额超过2万亿元。2019年7月，京东集团第四次入榜《财富》全球500强，位列第139位，是中国线上线下最大的零售集团。</p>
      </div>
      <div class="modle">
        <p class="p1">联系方式</p>
        <div class="float">
            <img src="../../components/img1/电话.png" alt="">
            <p>18610781752</p>
            <img src="../../components/img1/电话.png" alt="">
            <p>0472-5654665</p>
        </div>
    </div>
  </div>
  <div class="bottom">
      <div class="list">
          <p class="p1">用户协议</p>
          <p class="p2">></p>
      </div>
      <div class="list">
          <p class="p1">隐私政策</p>
          <p class="p2">></p>
      </div>
      <div class="list">
          <p class="p1">清除缓存</p>
          <p class="p3">4.2M</p>
      </div>

  </div>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.set {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 3.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .content {
    .modle{
    .p1 {
      font-size: 0.45rem;
      color: #292929;
      margin: 0.5rem 0rem 0rem 0.5rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
    }
    .p2 {
      color: #525252;
      font-size: 0.4rem;
      width: 90%;
      margin: 0.3rem 0rem 0rem 0.5rem;
    }
    .float{
        display: flex;
        margin: 0.5rem 0rem 0rem 0.5rem;
        border-bottom: 1px solid #D9D9D9;
        width: 90%;
        padding-bottom: 1rem;
        img{
            width: 0.6rem;
            height: 0.6rem;
            margin-left: 0.3rem;
        }
        p{
            color: #D04443;
            font-size: 0.5rem;
            margin-left: 0.2rem;
        }
    }
  }
  }
  .bottom{
      .list{
          width: 90%;
          display: flex;
           border-bottom: 1px solid #D9D9D9;
           margin-left: 0.5rem;
           padding-bottom: 0.5rem;
          .p1{
              margin-top: 0.5rem;
              font-size: 0.5rem;
              color: #292929;
              font-weight: 500;
              font-family:Source Han Sans CN;
          }
          .p2{
              margin-top: 0.5rem;
              font-size: 0.5rem;
              color: #BABABA;
              margin-left: 6.5rem;
          }
          .p3{
            margin-top: 0.5rem;
              font-size: 0.5rem;
              color: #878787;
              margin-left: 5.7rem;

          }
          
      }
  }
}
</style>