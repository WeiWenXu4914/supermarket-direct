<template>
  <div class="unlocking">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()"/>
      <p class="p1">开锁/换锁/修锁</p>
       <van-button type="primary">发布</van-button>
    </div>
    <div class="center">
      <input type="text" placeholder="请输入标题（8-20个字）" />
    </div>
    <div class="content">
      <van-field
        v-model="message"
        rows="2"
        autosize21
        type="textarea"
        placeholder="输入需求描述"
      />
      
    </div>
    <div class="list">
      <div class="left">
        <p>￥</p>
        <input type="text" placeholder="请输入价格" />
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
.unlocking {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 2.1rem;
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
      margin-left: 1.5rem;
    }
  }
  .center {
    width: 90%;
    border-bottom: 1px solid rgb(247, 247, 247);
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
    padding-bottom: 0.5rem;
    p {
      margin-top: 0.2rem;
    }
  }
  .list {
    display: flex;
    margin: 0.8rem 0rem 0rem 0.5rem;
    .left {
      width: 95%;
      border-bottom: 1px solid rgb(247, 247, 247);
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
  }
  .bot {
    margin: 1rem 0rem 0rem 0.5rem;
    display: flex;
    width: 90%;
    border-bottom: 1px solid rgb(247, 247, 247);
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
        color: #7c7c7c;
        font-size: 0.4rem;
        margin-left: 6rem;
      }
    }
  }
}
</style>