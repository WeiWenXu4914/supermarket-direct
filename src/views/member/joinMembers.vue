<template>
  <div class="container">
    <page-title iconColor="#fff" background="none"></page-title>
    <div class="head">
      <div class="shop">
        <div class="title">
          <img src="./images/928cedf0031246aeb20eae5d7b6eaa95(1).png" alt />
          百草味旗舰店
        </div>
        <div class="msg">邀请您加入会员</div>
      </div>
    </div>
    <div class="nav">
      <div class="item" v-for="(val,inx) in navData" :key="inx">{{val}}</div>
    </div>
    <div class="foot">确定授权开通会员</div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
export default {
  name: 'user-chat',
  components: {
    PageTitle
  },
  data () {
    return {
      title: '会员卡',
      value: '',
      navData: ['专享礼卷', '购物积分', '抽奖']
    }
  },
  computed: {},
  created () {},
  methods: {}
}
</script>

<style scoped lang="less">
.container {
  background: rgba(245, 246, 248, 1);
  height: 100%;
}
.head {
  width: 375px;
  height: 160px;
  background: rgba(208, 68, 67, 1);
  padding-top: 30px;
  box-sizing: border-box;
  opacity: 1;

  .shop {
    .title {
      font-size: 17px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 29px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
    }
  }
  .msg {
    font-size: 25px;
    margin-top: 10px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 43px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: center;
  }
}
.nav {
  box-sizing: border-box;
  position: relative;
  top: -27px;
  left: 15px;
  padding: 0 42px;
  width: 345px;
  height: 53px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(113, 58, 49, 1);
  opacity: 1;
}
.foot {
  width: 345px;
  height: 48px;
  background: rgba(208, 68, 67, 1);
  opacity: 1;
  border-radius: 24px;
  position: fixed;
  bottom: 28px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 17px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 48px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
</style>
