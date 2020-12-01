<template>
  <div id="bottom-bar">
    <!-- <div class="left flex-b">
      <img :src="require('../icons/图层 1.png')" width="16px" height="20px" @click="callPhone"/>
      电话
    </div> -->
    <div class="right flex-b">
      <img :src="require('../icons/会员.png')" width="16px" height="20px"/>
      店铺会员
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    // callPhone (phoneNumber) {
    //   window.location.href = 'tel://' + phoneNumber
    // }
  }
}
</script>

<style lang="less" scoped>
#bottom-bar{
  height: 55px;
  color: #fff;
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  // .left{
  //   float: left;
  //   height: 100%;
  //   width: 50%;
  //   border-radius: 10px 0px 0px 0px;
  //   background: #8ED997;
  //   font-size:15px;
  //   font-family:Source Han Sans CN;
  //   font-weight:400;
  //   color:rgba(255,255,255,1);
  //   opacity:1;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  .right{
    height: 100%;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    background: #FABF50;
    font-size:15px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    opacity:1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
