<template>
  <div class="position">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()"/>
      <p class="p1">发布职位</p>
       <van-button type="primary">发布</van-button>
    </div>
    <div class="center">
      <div class="model">
        <input type="text" placeholder="请输入公司名称" />
      </div>
      <div class="model">
        <input type="text" placeholder="请输入职位" />
      </div>
    </div>
    <div class="list">
      <div class="left">
        <p>￥</p>
        <input type="text" placeholder="请输入薪资" />
      </div>
    </div>
    <div class="content">
      <van-field
        v-model="message"
        rows="2"
        autosize21
        type="textarea"
        maxlength="50"
        placeholder="经验要求、最低学历、薪资范围、职位描述、工作地点等等..."
      />
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
.position {
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
    margin-top: 0.5rem;
    .model {
      width: 90%;
      border-bottom: 1px solid rgb(247, 247, 247);
      margin: 0.3rem 0rem 0rem 0.5rem;
      padding-bottom: 0.3rem;
      input {
        border: none;
        outline: none;
        height: 1rem;
      }
      input::-webkit-input-placeholder {
        color: #2c2c2c;
      }
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