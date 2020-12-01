<template>
  <div class="apply">
    <div class="top">
      <img src="../../components/img1/返回.png" alt @click="back()" />
      <p class="p1">申请退款</p>
    </div>
    <div class="list">
      <div class="model">
        <p class="p1">申请类型</p>
        <p class="p2">我要退款</p>
        <p class="p3">></p>
      </div>
      <div class="model">
        <p class="p1">申请原因</p>
        <p class="p2" style="color:#868686">点击选择申请原因</p>
        <p class="p4">></p>
      </div>
      <div class="model">
        <p class="p1">收货状态</p>
        <p class="p2" style="color:#2f2f2f">已收到货</p>
        <p class="p3">></p>
      </div>
    </div>
    <div class="tem">
      <div class="tem1">
        <p class="p1">退款金额</p>
        <p class="p2">￥</p>
        <p class="p3">50.00</p>
      </div>
      <div class="tem2">
        <p class="p1">申请说明</p>
        <p class="p2">必填，请您详细填写申请说明</p>
        <van-uploader v-model="fileList" :after-read="afterRead">
          <van-button icon="plus" type="primary" class="up"></van-button>
        </van-uploader>
      </div>
    </div>
    <div class="btn">
      <van-button type="primary">提交申请</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "apply",
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中";
      setTimeout(() => {
        file.status = "done";
      }, 1000);
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.apply {
  .van-uploader{
    margin-left: 0.3rem;
    padding-top: 1rem;
    padding-bottom: 0.3rem;
  }
  .top {
    display: flex;
    margin-top: 0.5rem;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.3rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .list {
    .model {
      display: flex;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 0.4rem;
      .p1 {
        color: #3b3b3b;
        font-size: 0.4rem;
        font-weight: 500;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
      .p2 {
        color: #191919;
        font-size: 0.4rem;
        font-weight: 500;
        margin: 0.5rem 0rem 0rem 0.7rem;
      }
      .p3 {
        color: #b9b9b9;
        font-size: 0.4rem;
        font-weight: 500;
        margin: 0.5rem 0rem 0rem 5rem;
      }
      .p4 {
        color: #b9b9b9;
        font-size: 0.4rem;
        font-weight: 500;
        margin: 0.5rem 0rem 0rem 3.5rem;
      }
    }
  }
  .tem {
    .tem1 {
      border-bottom: 1px solid #e1e1e1;
      .p1 {
        font-size: 0.45rem;
        color: #3b3b3b;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
      .p2 {
        display: inline-block;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
      .p3 {
        display: inline-block;
        color: #242424;
        font-size: 0.6rem;
      }
    }
    .tem2 {
      border-bottom: 1px solid #e1e1e1;
      .up {
        background-color: #f5f5f5;
        color: #4f4f4f;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 0.45rem;
        border: none;
      }
      .p1 {
        font-size: 0.45rem;
        color: #3b3b3b;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
      .p2 {
        color: #868686;
        font-size: 0.45rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
    }
  }
  .btn {
    button {
      width: 90%;
      height: 1.2rem;
      border: none;
      outline: none;
      background-color: #d04443;
      border-radius: 0.1rem;
      color: #ffffff;
      font-size: 0.5rem;
      position: absolute;
      bottom: 0.5rem;
      left: 0.5rem;
    }
  }
}
</style>