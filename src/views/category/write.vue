<template>
  <div class="write">
    <div class="top">
      <p class="p2">取消</p>
      <p class="p1">写文章</p>
      <van-button type="primary">发布</van-button>
    </div>
    <div class="center">
      <input type="text" placeholder="请输入标题（8-20个字）"  maxlength="20"/>
    </div>
    <div class="content">
        <van-field
        v-model="message"
        rows="2"
        autosize21
        type="textarea"
        placeholder="请输入正文"
        class="inp_title"
      />
        <img src="../../components/img1/wen_xiao-FJFww_5dp64-unsplash.png" alt="" class="i1">
        <img src="../../components/img1/微信图片_20191031172049.png" alt="" class="i2">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:""
    }
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.write {
  .top {
    display: flex;
    margin-top: 0.5rem;
    .p1 {
      margin-left: 2.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    .p2{
        color: #565656;
        margin: 0.2rem 0rem 0rem 0.5rem;
        font-size: 0.4rem;
    }
    button {
      color: #ffffff;
      border-radius: 0.1rem;
      outline: none;
      border: none;
      background-color: #d04443;
      width: 1.5rem;
      height: 0.8rem;
      margin-left: 2.5rem;
    }
  }
  .center {
    width: 90%;
    border-bottom: 1px solid #c4c4c4;
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
  .content{
    .inp_title{
      margin: 0.3rem 0rem 0rem 0.4rem;
    }
    .van-cell::after{
      border: none;
    }
      .p1{
          color: #969696;
          margin: 0.5rem 0rem 0rem 0.5rem;
          font-size: 0.4rem;
      }
      .i1{
          width: 90%;
          height: 6rem;
          margin: 0.5rem 0rem 0rem 0.5rem;
      }
      .i2{
          width: 100%;
          margin-top: 0.5rem;
      }
      .i3{
          width: 100%;
      }
  }
}
</style>