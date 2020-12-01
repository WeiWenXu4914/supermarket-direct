<template>
  <div class="comment">
    <div class="header">
      <div class="top">
        <img src="../../components/img1/返回.png" @click="back()" />
        <p class="p1">发表评价</p>
      </div>
      <div class="model">
        <div class="left">
          <img src="../../components/img1/photo1.png" alt />
        </div>
        <div class="center">
          <p class="p1">收纳袋子大号装衣物被子搬家行李打包</p>
        </div>
        <div class="right">
          <button>物流配送</button>
        </div>
      </div>
      <div class="list">
        <div class="tem">
          <p>描述相符</p>
          <van-rate 
          v-model="value" 
          :size="15" 
          color="#ffd21e" 
          void-icon="star" 
          void-color="#eee" 
          class="rate"
          />
        </div>
        <div class="tem">
          <p>物流服务</p>
          <van-rate 
          v-model="value" 
          :size="15" 
          color="#ffd21e" 
          void-icon="star" 
          void-color="#eee" 
          class="rate"
          />
        </div>
        <div class="tem">
          <p>服务态度</p>
          <van-rate 
          v-model="value" 
          :size="15" 
          color="#ffd21e" 
          void-icon="star" 
          void-color="#eee" 
          class="rate"
          />
        </div>
      </div>
    </div>
    <div class="message">
      <van-field
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="说说你的使用心得哦~"
        show-word-limit
        class="liuyan"
      />
      <van-uploader v-model="fileList" :after-read="afterRead">
        <van-button icon="plus" type="primary" class="up">
        </van-button>
      </van-uploader>
      <van-button type="primary">提交评论</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      message: "",
      value:4
    };
  },
  methods:{
      afterRead(file) {
      file.status = "uploading";
      file.message = "上传中";
      setTimeout(() => {
        file.status = "done";
      }, 1000);
    },

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
.comment {
  width: 100%;
  background-color: #f6f6f6;
  .header {
    background-color: #ffffff;
    padding-bottom: 0.3rem;
    .top {
      display: flex;
      margin-top: 0.5rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.1rem 0rem 0rem 0.3rem;
      }
      .p1 {
        margin-left: 3rem;
        color: #2f2f2f;
        font-size: 0.5rem;
        font-weight: 500;
        font-family: Source Han Sans CN;
      }
    }
    .model {
      display: flex;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 0.4rem;
      .left {
        margin: 0.5rem 0rem 0rem 0.5rem;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .center {
        width: 85%;
        margin: 0.8rem 0rem 0rem 0.2rem;
        .p1 {
          font-size: 0.4rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
        }
      }
      .right {
        width: 30%;
        margin: 0.9rem 0rem 0rem 0rem;
        button {
          color: #ffffff;
          border: none;
          outline: none;
          background-color: #d04443;
          border-radius: 0.1rem;
          width: 1.7rem;
        }
      }
    }
    .list {
      .tem {
        display: flex;
        margin: 0.5rem 0rem 0rem 0.5rem;
        p {
          color: #2c2c2c;
          font-size: 0.45rem;
        }
        .rate{
          margin-top: 0.1rem;
          margin-left: 0.1rem;
          
        }
      }
    }
  }
  .message {
    margin: 0.5rem 0rem 0rem 0rem;
    background-color: #ffffff;
    padding-bottom: 3rem;
    .liuyan {
      padding: 0.3rem 0rem 0rem 0.5rem;
      margin-bottom: 0.5rem;
    }
    .up {
      background-color: #f5f5f5;
      color: #4f4f4f;
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.45rem;
      margin-bottom: 0.3rem;
    }
    .photo {
      display: block;
      margin-top: 1.5rem;
      margin-left: -0.7rem;
      font-size: 0.35rem;
    }
    p {
      margin-left: 9rem;
      color: #494949;
    }
    img {
      margin: 0.5rem;
    }
    button {
      width: 90%;
      background-color: #d04443;
      height: 1.2rem;
      color: #ffffff;
      border: none;
      outline: none;
      border-radius: 0.1rem;
      margin-left: 0.5rem;
    }
  }
}
</style>