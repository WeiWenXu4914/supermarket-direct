<template>
  <div id="userheadblock">
    <div class="user">
      <div class="head">
        <img :src="head" class="head-image"/>
      <div class="head-bg">
        <img :src="require('../icons/0198b7568a133b6ac7251bb6129310.png')" class="head-flag" />
      </div>
      </div>
      <div class="username">
        {{ username }}
      </div>
      <div class="manager">
        群主
      </div>
    </div>
    <!--  -->
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    head: String,
    message: String
  }
}
</script>

<style lang="less" scoped>
#userheadblock{
  margin-bottom: 29px;
  .user{
    display: flex;
    align-items: center;
    .head{
      width: 39px;
      height: 39px;
      // overflow: hidden;
      margin-right: 10px;
      .head-image{
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      .head-bg{
        margin-top: -15px;
        margin-left: 24px;
        top:0px;
        bottom: 0px;
        width:15px;
        height:15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .head-flag{
          width: 15px;
          height: 15px;
          background: #fff;
          border-radius:50%;
          box-sizing: border-box;
          padding: 2.5px;
        }
      }
    }
    .username{
      margin-right: 9px;
      font-size:14px;
      font-family:Source Han Sans CN;
      font-weight:500;
      color:rgba(49,49,49,1);
    }
    .manager{
      background:linear-gradient(90deg,rgba(255,108,80,1) 0%,rgba(245,23,36,1) 100%);
      opacity:1;
      border-radius:2px;
      font-size:10px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(255,255,255,1);
      opacity:1;
      padding: 1px 3px;
    }
  }
  .message{
    margin-top:3px;
    margin-left: 48px;
    padding: 12px 32px 12px 15px;
    background:rgba(245,245,245,1);
    opacity:1;
    border-radius:2px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height:18px;
    color:rgba(39,39,39,1);
  }
}
</style>