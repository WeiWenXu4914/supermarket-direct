<template>
  <div class="sellers">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()" />
      <p class="p1">租房/卖房</p>
       <van-button type="primary">发布</van-button>
    </div>
    <div class="center">
      <input type="text" placeholder="请输入标题（8-20个字）" maxlength="20" />
    </div>
    <div class="content">
      <van-field
        v-model="message"
        rows="2"
        autosize21
        type="textarea"
        placeholder="经验要求、最低学历、薪资范围、职位描述、工作地点等等..."
      />
    </div>
    <div class="list">
      <div class="left">
        <p>￥</p>
        <input type="text" placeholder="请输入价格" />
      </div>
      <div class="right">
        <van-checkbox v-model="checked" checked-color="#D04443">月</van-checkbox>
      </div>
    </div>
    <div class="btn">
      <p>x</p>
      <button>采光好</button>
      <button>配套齐全</button>
      <button>新房</button>
      <button>二手房</button>
    </div>
    <div class="photo">
      <van-uploader v-model="fileList" :after-read="afterRead">
        <van-button icon="plus" type="primary" class="up">
        </van-button>
      </van-uploader>
      <div class="right">
        <p>3张 ></p>
      </div>
    </div>
    <div class="bot">
      <div class="left">
        <img src="../../components/img1/dingwei_black.png" alt />
      </div>
      <div class="middle">
        <p>所在位置</p>
      </div>
      <div class="right">
        <p>></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      fileList:[]
    };
  },
  methods:{
      afterRead(file){
       file.status="uploading";
       file.message='上传中';
     
     setTimeout(()=>{
       file.status="done";

     },1000)
      
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
.sellers {
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
    button {
      color: #ffffff;
      border-radius: 0.1rem;
      outline: none;
      border: none;
      background-color: #d04443;
      width: 1.5rem;
      height: 0.8rem;
      margin-left: 2rem;
    }
  }
  .center {
    width: 90%;
    border-bottom: 1px solid rgb(247,247,247);
    margin-left: 0.5rem;
    padding-bottom: 0.3rem;
    input {
      width: 90%;
      height: 1rem;
      margin: 1rem 0rem 0rem 0rem;
      font-size: 0.45rem;
      color: #7c7c7c;
      border: none;
    }
  }
  .content {
    width: 90%;
    color: #969696;
    font-size: 0.45rem;
    margin: 0.5rem 0rem 0rem 0.5rem;
    p {
      margin-top: 0.2rem;
    }
  }
  .list {
    display: flex;
    margin: 0.8rem 0rem 0rem 0.5rem;
    .left {
      width: 85%;
      border-bottom: 1px solid rgb(247,247,247);
      display: flex;
      padding-bottom: 0.3rem;
      input {
        width: 100%;
        height: 1rem;
        border: none;
        font-size: 0.45rem;
      }
      input::-webkit-input-placeholder {
        color: #404040;
      }
      p {
        font-size: 0.5rem;
        margin-top: 0.1rem;
      }
    }
    .right {
      display: flex;
      margin-top: 0.2rem;
      .p1 {
        width: 0.5rem;
        height: 0.5rem;
        border: 1px solid #707070;
        border-radius: 50%;
        margin-top: 0.1rem;
      }
      .p2 {
        font-size: 0.45rem;
        margin-left: 0.1rem;
      }
    }
  }
  .btn {
    width: 90%;
    display: flex;
    justify-content: space-around;
    margin: 1rem 0rem 0rem 0.3rem;
    position: relative;
    p {
      color: #fff;
      width: 0.5rem;
      height: 0.5rem;
      text-align: center;
      background-color: #d2d2d2;
      border-radius: 50%;
      position: absolute;
      left: 4.1rem;
      top: -0.2rem;
    }
    button {
      color: #1c1c1c;
      border: none;
      background-color: #f4f4f4;
      width: 2rem;
      height: 1rem;
    }
  }
  .photo {
    display: flex;
    margin-left: 0.3rem;
    padding-top: 1rem;
    .up {
      background-color: #f5f5f5;
      color: #4f4f4f;
      width: 2.2rem;
      height: 2.2rem;
      font-size: 0.45rem;
      border: none;
    }
    .right {
      p {
        color: #808080;
        margin: 1rem 0rem 0rem 0.5rem;
      }
    }
  }
  .bot {
    margin: 1rem 0rem 0rem 0.5rem;
    display: flex;
    width: 90%;
     border-bottom: 1px solid rgb(247,247,247);
    padding-bottom: 0.3rem;
    .left {
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.1rem;
      }
    }
    .middle {
      p {
        color: #282828;
        font-size: 0.45rem;
        margin-left: 0.3rem;
      }
    }
    .right {
      p {
        font-size: 0.4rem;
        margin-left: 6rem;
        color: #7c7c7c;
      }
    }
  }
}
</style>