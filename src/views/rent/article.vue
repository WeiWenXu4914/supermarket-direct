<template>
  <div class="article">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1" @click="back()" />
    </div>
    <div class="up">
      <p>本文以百度即将推出的隐私检测应用为思考点</p>
    </div>
    <div class="model">
      <div class="article">
        <div class="left">
          <img
            src="../../components/img1/b40eb49a58ed9065053fe17e57b1e23f1dc2c44926df4-j0UDCF_fw658.webp.png"
            alt
          />
        </div>
        <div class="right">
          <p class="r1">商家情报组</p>
          <p class="r2">昨天14：22</p>
        </div>
        <p class="guan">
          <van-button round type="info">关注</van-button>
         
        </p>
      </div>
      <div class="bot">
        <img
          src="../../components/img1/991880d1919e2b77d6493eed235d4ce838c696652158b3-0BekcG_fw658.webp.png"
        />
      </div>
      <div class="content">
        <p>本文以百度即将推出的隐私检测应用为思考点</p>
        <p>本文以百度即将推出的隐私检测应用为思考点</p>
        <img
          src="../../components/img1/991880d1919e2b77d6493eed235d4ce838c696652158b3-0BekcG_fw658.webp.png"
          alt
        />
        <div class="t1">
          <div class="left">
            <img
              src="../../components/img1/b40eb49a58ed9065053fe17e57b1e23f1dc2c44926df4-j0UDCF_fw658.webp.png"
              alt
            />
          </div>
          <div class="right">
            <p class="r2">商家情报组</p>
          </div>
          <p class="guan2">
            <van-button round type="info">关注</van-button>
          </p>
        </div>
      </div>
      <div class="bottom">
        <input type="text" placeholder="留下您的高见..." class="inp">
          <div class="b1">
          <img src="../../components/img1/评论.png" alt="">
          <img src="../../components/img1/赞(1).png" alt="">
          <img src="../../components/img1/收藏.png" alt="">
          <img src="../../components/img1/分 享(1).png" alt="">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.article {
  .top {
    display: flex;
    margin-top: 0.5rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
  }
  .up {
    margin: 0.5rem 0rem 0rem 0.5rem;
    width: 90%;
    p {
      color: #252525;
      font-size: 0.55rem;
      font-weight: bold;
    }
  }
  .model {
    background-color: #ffffff;
    .article {
      display: flex;
      .left {
        img {
          margin: 0.5rem 0rem 0rem 0.5rem;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
        }
      }
      .right {
        .r1 {
          color: #3a3a3a;
          font-weight: bold;
          font-size: 0.4rem;
          margin: 0.5rem 0rem 0rem 0.3rem;
        }
        .r2 {
          color: #737373;
          font-family: DIN;
          font-size: 0.3rem;
          margin-left: 0.3rem;
        }
      }
    }
    .guan {
      button {
        color: #ffffff;
        background-color: #d04443;
        border: none;
        outline: none;
        width: 2rem;
        height: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0rem 0rem 3.8rem;
      }
    }
    .bot {
      .fu {
        img {
          width: 2.9rem;
          height: 2rem;
        }
      }
      img {
        width: 94%;
        margin: 0.3rem 0rem 0rem 0.3rem;
      }
    }
  }
  .content {
    background-color: #ffffff;
    padding-bottom: 0.3rem;
    p {
      font-size: 0.47rem;
      margin: 0.05rem 0rem 0rem 0.3rem;
    }
    img {
      width: 94%;
      margin: 0.3rem 0rem 0rem 0.3rem;
    }
    .t1 {
      display: flex;
      .left {
        img {
          margin: 0.5rem 0rem 0rem 0.5rem;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
        }
      }
      .right {
        .r1 {
          color: #3a3a3a;
          font-weight: bold;
          font-size: 0.4rem;
          margin: 0.5rem 0rem 0rem 0.3rem;
        }
        .r2 {
          color: #737373;
          font-family: DIN;
          font-size: 0.4rem;
          margin: 0.6rem 0rem 0rem 0.5rem;
        }
      }
    }
    .guan2 {
      button {
        color: #ffffff;
        background-color: #d04443;
        border: none;
        outline: none;
        width: 2rem;
        height: 1rem;
        border-radius: 0.5rem;
        margin: 0.2rem 0rem 0rem 3.5rem;
      }
    }
  }
  .bottom{
      border-top: 1px solid #E1E1E1;
      padding: 0.2rem 0rem 0.2rem 0rem ;
      width: 100%;
      display: flex;
      .inp{
        width: 40%;
        background-color: #F4F4F4;
        border: none;
        outline: none;
        border-radius: 0.5rem;
        margin-left: 0.3rem;
        padding-left: 0.3rem;
        font-size: 0.4rem;
      }
      .b1{
           img{
          width: 0.8rem;
          height: 0.8rem;
          margin-left: 0.6rem;
          margin-top: 0.2rem;
          
      }

      }
     
  }
}
</style>