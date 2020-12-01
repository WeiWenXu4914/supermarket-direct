<template>
  <div class="container">
    <page-title :title="title" :titleSize="19" titleFontWeight="500"></page-title>
    <van-search
      v-model="value"
      show-action
      placeholder="商家名"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-empty description="未领取任何会员卡" v-if="cardList.length === 0"/>
    <div class="card-content">
      <div class="item" v-for="(val, inx) in cardList" :key="inx"
       :style="styleObject">
        <div class="head">
          <div class="left">
            <img :src="val.ent_logo" alt />
          </div>
          <div class="center">{{val.ent_name}}</div>
          <div class="right">{{val.msc_grade === '0' ? '普通会员' : '高级会员'}}</div>
        </div>
        <div class="foot">进店</div>
        <div class="vip">VIP</div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { Empty, Toast } from 'vant';
import { myCard, myCoupon } from './actions'
export default {
  name: 'user-chat',
  components: {
    PageTitle
  },
  data () {
    return {
      title: '会员卡',
      value: '',
      cardList: [],
      styleObject: {}
    }
  },
  computed: {},
  created () {
    this.myCard()
  },
  methods: {
    onSearch (val) {},
    onCancel () {
      this.value = ''
    },
    async myCard () {
      const res = await myCard()
      this.cardList = res.data
      this.styleObject = {
        background: res.data.mscs_background,
        color: res.data.mscs_color,
        fontSize: res.data.mscs_color,
        border: res.data.mscs_border,
        borderRadius: res.data.mscs_border_radius
      }
    },
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 60px 12px 0;
  .van-search {
    padding: 0;
    margin: 0;
    width: 351px;
    height: 45px;
    background: rgba(241, 241, 241, 1);
    opacity: 1;
    border-radius: 3px;
    .van-search__content {
      padding: 0;
    }
    .van-cell {
      background: rgba(241, 241, 241, 1);
      padding-left: 11px;
      .van-cell /deep/ .van-icon::before {
        font-size: 20px;
      }
    }
    .van-search__action {
      height: 13px;
      line-height: 13px;
      border-left: 1px solid #707070;
    }
  }
  .card-content {
    margin-top: 20px;
    .item {
      &:nth-child(odd) {
        width: 351px;
        height: 158px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 15px;
        padding: 15px 15px 15px 13px;
        background: linear-gradient(
          90deg,
          rgba(68, 68, 68, 1) 0%,
          rgba(31, 31, 31, 1) 100%
        );
        opacity: 1;
        border-radius: 5px;
        .vip {
          position: absolute;
          bottom: -20px;
          left: 0;
          font-size: 100px;
          color: rgba(255, 255, 255, 1);
          opacity: 0.05;
        }
        .head {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          .left {
            width: 46px;
            height: 46px;
            border-radius: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .center {
            font-size: 17px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 29px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
            margin: 0 10px;
          }
          .right {
            width: 51px;
            height: 17px;
            background: rgba(255, 255, 255, 1);
            border-radius: 9px;
            font-size: 10px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 17px;
            color: rgba(29, 29, 29, 1);
          }
        }
        .foot {
          width: 72px;
          height: 29px;
          background: rgba(24, 24, 24, 1);
          opacity: 1;
          border-radius: 15px;
          position: absolute;
          right: 15px;
          bottom: 15px;
          text-align: center;
          line-height: 29px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
      }
      &:nth-child(even) {
        width: 351px;
        height: 158px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 15px;
        padding: 15px 15px 15px 13px;
        background:linear-gradient(90deg,rgba(229,213,202,1) 0%,rgba(217,176,158,1) 100%);
        opacity: 1;
        border-radius: 5px;
        .vip {
          position: absolute;
          bottom: -20px;
          left: 0;
          font-size: 100px;
          color: rgba(255, 255, 255, 1);
          opacity: 0.1  ;
        }
        .head {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          .left {
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .center {
            font-size: 17px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 29px;
            color:rgba(113,58,49,1);
            opacity: 1;
            margin: 0 10px;
          }
          .right {
            width: 51px;
            height: 17px;
            background: rgba(255, 255, 255, 1);
            border-radius: 9px;
            font-size: 10px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(29, 29, 29, 1);
          }
        }
        .foot {
          width: 72px;
          height: 29px;
          background:rgba(203,160,142,1);
          opacity: 1;
          border-radius: 15px;
          position: absolute;
          right: 15px;
          bottom: 15px;
          text-align: center;
          line-height: 29px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
      }
    }
  }
}
</style>
