<template>
  <div class="container">
    <page-title :title="title" :titleSize="19" titleFontWeight="500"></page-title>
    <div class="content">
      <div class="item" v-for="(val,inx) in list" :key="inx" @click="onClick(val.path)">
        <div class="up">
          <img :src="val.icon" alt />
        </div>
        <div class="center">{{val.type}}</div>
        <div class="down">
          {{val.num}}<span>张</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { myCard, myCoupon } from './actions'
export default {
  name: 'group',
  components: {
    PageTitle
  },
  data () {
    return {
      title: '红包卡卷',
      value: '',
      list: [
        { type: '优惠劵', num: 0, icon: require('./images/优惠券.png'), path: '/discount' },
        { type: '会员卡', num: 0, icon: require('./images/hyk.png'), path: '/member/card' }
      ]
    }
  },
  computed: {},
  created () {
    this.myCard()
    this.myCoupon()
  },
  methods: {
    onClick (path) {
      if (path) this.$router.push(path)
    },
    async myCard () {
      const res = await myCard()
      this.list[1].num = res?.data?.length
    },
    async myCoupon () {
      const res = await myCoupon()
      this.list[0].num = res?.data?.length
    }
  }
}
</script>

<style scoped lang='less'>
.content {
  padding: 80px 35px 0;
  display: flex;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;
    .up {
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .center {
      margin: 10px 0 ;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 26px;
      color: rgba(41, 41, 41, 1);
      opacity: 1;
    }
    .down {
      font-size: 20px;
      font-family: DIN;
      font-weight: 500;
      line-height: 24px;
      color: rgba(208, 68, 67, 1);
      opacity: 1;
      span {
        font-size: 11px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 19px;
        color: rgba(208, 68, 67, 1);
        opacity: 1;
      }
    }
  }
}
</style>
