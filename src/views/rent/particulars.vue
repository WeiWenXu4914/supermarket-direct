<template>
  <div class="particulars">
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
          <button>关注</button>
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
      </div>
      <div class="comment">
        <p>评论</p>
        <div class="tem">
          <div class="left">
            <img
              src="../../components/img1/5427ca6d70a9ad82000e4a98e92a4b348067919b2d53f-nBGPTF_fw658.webp(1).png"
              alt
            />
          </div>
          <div class="center">
            <p class="p1">商家情报组</p>
            <p class="p2">本文以百度即将推出...</p>
          </div>
          <div class="right">
            <p>回复</p>
          </div>
        </div>
        <div class="tem">
          <div class="left">
            <img
              src="../../components/img1/5427ca6d70a9ad82000e4a98e92a4b348067919b2d53f-nBGPTF_fw658.webp(1).png"
              alt
            />
          </div>
          <div class="center">
            <p class="p1">商家情报组</p>
            <p class="p2">本文以百度即将推出...</p>
          </div>
          <div class="right">
            <p>回复</p>
          </div>
        </div>
        <div class="tem" >
          <div class="left">
            <img
              src="../../components/img1/5427ca6d70a9ad82000e4a98e92a4b348067919b2d53f-nBGPTF_fw658.webp(1).png"
              alt
            />
          </div>
          <div class="center" style="border:none">
            <p class="p1">商家情报组</p>
            <p class="p2">本文以百度即将推出...</p>
          </div>
          <div class="right">
            <p>回复</p>
          </div>
        </div>
        <div class="down">
            <div class="up">
            <p class="p1">商家情报组</p>
            <p class="p2">回复</p>
            <p class="p1">商家情报组</p>
            </div>
            <p class="p3">本文以百度即将推出...</p>
        </div>
      </div>
      <div style="height:1rem"></div>
      <div class="bottom">
        <button>留下您的高见...</button>
        <div class="b1">
          <img src="../../components/img1/评论.png" alt />
          <img src="../../components/img1/赞(1).png" alt />
          <img src="../../components/img1/收藏.png" alt />
          <img src="../../components/img1/分 享(1).png" alt />
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
.particulars {
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
  .comment {
    p {
      color: #3a3a3a;
      font-size: 0.45rem;
      font-weight: bold;
      margin: 0.3rem 0rem 0rem 0.3rem;
    }
    .tem {
      margin: 0.3rem 0rem 0rem 0.2rem;
      display: flex;
      .left {
        img {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .center {
        width: 80%;
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 0.3rem;
        .p1 {
          font-size: 0.4rem;
          font-weight: bold;
        }
        .p2 {
          font-size: 0.45rem;
        }
      }
      .right {
        p {
          margin: 0.3rem 0rem 0rem -1rem;
          color: #646464;
        }
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
  }
  .down{
      background-color: #F4F4F4;
      width: 80%;
      margin: 0.2rem 0rem 0rem 1.5rem;
      padding-bottom: 0.3rem;
      .up{
          display: flex;
          .p1{
              color: #3A3A3A;
              font-size: 0.45rem;
          }
          .p2{
              color: #929292;
          }
      }
      .p3{
        font-size: 0.42rem;
        margin-left: 0.8rem;
      }
  }
  .bottom {
    border-top: 1px solid #e1e1e1;
    padding: 0.2rem 0rem 0.2rem 0rem;
    width: 100%;
    display: flex;
    button {
      background-color: #f4f4f4;
      color: #838383;
      border: none;
      width: 4rem;
      height: 1.2rem;
      border-radius: 0.5rem;
      margin-left: 0.2rem;
    }
    .b1 {
      img {
        width: 0.8rem;
        height: 0.8rem;
        margin-left: 0.6rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>