<template>
  <div id="userhead-line">
    <div class="message">{{ message }}</div>
    <div class="user">
      <div class="head">
        <img :src="head" class="head-image" />
        <div class="head-bg">
          <img :src="require('../icons/0198b7568a133b6ac7251bb6129310.png')" class="head-flag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    head: String,
    message: String
  }
}
</script>

<style lang="less" scoped>
#userhead-line {
  margin-bottom: 29px;
  display: flex;
  .user {
    display: flex;
    align-items: center;
    .head {
      width: 39px;
      height: 39px;
      margin-left: 10px;
      .head-image {
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      .head-bg {
        margin-top: -15px;
        margin-left: 24px;
        top: 0px;
        bottom: 0px;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .head-flag {
          width: 15px;
          height: 15px;
          background: #fff;
          border-radius: 50%;
          box-sizing: border-box;
          padding: 2.5px;
        }
      }
    }
  }
  .message {
    padding: 12px 32px 12px 15px;
    background: rgba(245, 245, 245, 1);
    opacity: 1;
    border-radius: 2px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 18px;
    color: rgba(39, 39, 39, 1);
  }
}
</style>
