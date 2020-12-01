<template>
  <div class="container">
    <page-header bgcolor="#DB1043" :noradius="true"  :type="true"></page-header>
    <van-row class="zindex-top">
      <van-col>
        <div class="mall-head-card" @click="$router.push('/search')">
          <!-- <div class="search-row">
            <img :src="require('../../assets/icons/search.png')" />
            <van-field placeholder="请输入用户名" :disabled="true" />
          </div> -->
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
              <img :src="require('./icons/card-background.png')"/>
            </van-swipe-item>
            <van-swipe-item>
              <img :src="require('./icons/card-background.png')"/>
            </van-swipe-item>
            <van-swipe-item>
              <img :src="require('./icons/card-background.png')"/>
            </van-swipe-item>
            <van-swipe-item>
              <img :src="require('./icons/card-background.png')"/>
            </van-swipe-item>
          </van-swipe>
        </div>
      </van-col>

      <van-col :span="24">
        <van-tabs animated swipeable>
          <van-tab v-for="(item, index) in tabs" :key="index" :title="item.title">
            <template #title>
              <div class="mail-tabs-nav">
                 <img :src="item.icon"> {{ item.title }}
              </div>
            </template>
            <van-row v-for="index in 10" :key="index">
              <van-col :span="24" class="mail-title-header">
                <div class="shop_name">
                  BE＆CHEERY / 百草味
                </div>
                <van-button round size="mini" class="mail-red">进店</van-button>
              </van-col>
              <van-col :span="24" style="padding:0;">
                <van-grid :column-num="3" :gutter="5.5" class="mail-good-card">
                  <van-grid-item  v-for="j in 6" :key="j">
                    <img :src="require('./icons/goods (' + j + ').png')" class="mail-good-img" />
                    <div class="mail-good-info">盛耳 银耳500g盛耳 银耳500g</div>
                    <div class="mail-good-tag">
                      <div class="price-gray">￥199.00</div>
                    </div>
                    <div class="mail-good-tag">
                      <van-tag type="danger">活动价</van-tag>
                      <!-- <div class="van-tags">活动价</div> -->
                      <div class="price-red">￥50.00</div>
                    </div>
                    <van-button class="mail-good-buy" size="small">立即购买</van-button>
                  </van-grid-item>
                </van-grid>
                <van-button round plain hairline block class="mail-more"><p>查看更多</p> <van-icon name="arrow" /></van-button>
              </van-col>
            </van-row>
          </van-tab>
        </van-tabs>
      </van-col>
      
    </van-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import { getClassificationList } from './actions/index.js'
export default {
  name: 'activity-index',
  components: {
    PageHeader
  },
  data () {
    return {
      tabs: [
        {
          icon: require('../../assets/icons/ggsc.png'),
          title: '瓜果蔬菜'
        },
        {
          icon: require('../../assets/icons/lygh.png'),
          title: '粮油干货'
        },
        {
          icon: require('../../assets/icons/qcdn.png'),
          title: '禽畜蛋奶'
        },
        {
          icon: require('../../assets/icons/ggsc.png'),
          title: '瓜果蔬菜'
        },
        {
          icon: require('../../assets/icons/ggsc.png'),
          title: '瓜果蔬菜'
        },
        {
          icon: require('../../assets/icons/lygh.png'),
          title: '粮油干货'
        },
        {
          icon: require('../../assets/icons/qcdn.png'),
          title: '禽畜蛋奶'
        },
        {
          icon: require('../../assets/icons/ggsc.png'),
          title: '瓜果蔬菜'
        }
      ]
    }
  },
  watch: {},
  created () {
    //this.getClassificationData()
  },
  methods: {
    getClassificationData () {
      getClassificationList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang='less'>
.van-col{
  padding: 0px 11px;
}
.van-tabs{
  height: 50px!important;
  /deep/ .van-tabs__wrap{
    height: 50px!important;
  }
  /deep/ .van-tabs__nav{
    background: rgba(0, 0, 0, 0);
  }
  /deep/ [class*=van-hairline]::after{
    border: none;
  }
  /deep/ .van-tab--active{
    color: #fff!important;
  }
  /deep/ .van-tab{
    color: rgba(255, 255, 255, 0.5);
    flex-basis: 30% !important;
  }
  /deep/ .van-tabs__line{
    border-radius: 999px;
    width:100px!important;
    height:30px!important;
    background: none;
    opacity:1;
    background: url('../../assets/icons/line.png') no-repeat;
    background-size: 45px;
    background-position:38px bottom;
  }
}
.container {
  height: calc(100vh - 115px);
  margin-top:50px;
  background: #db1043;
  box-sizing: border-box;
  overflow-y:auto;
}
.mall-head-card {
  width: 353px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 7px 7px 3px 3px;
  box-sizing: border-box;
  position: relative;
  .search-row {
    margin: 0 10.5px;
    width: 332px;
    height: 39px;
    background: rgba(248, 248, 248, 1);
    border: 1px solid rgba(208, 68, 67, 1);
    opacity: 1;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 10.5px;
    box-sizing: border-box;
    img {
      width: 28px;
      height: 28px;
    }
    /deep/ .van-field {
      background: rgba(0, 0, 0, 0);
      padding-left: 0;
      padding-right: 0;
      /deep/ .van-field__control {
        color: #3f3f3f;
        font-size: 14px;
      }
      /deep/ .van-field__control::-webkit-input-placeholder {
        color: #3f3f3f;
        font-size: 14px;
      }
      /deep/ .van-field__control:-moz-placeholder {
        color: #3f3f3f;
        font-size: 14px;
      }
      /deep/ .van-field__control::-moz-placeholder {
        color: #3f3f3f;
        font-size: 14px;
      }
      /deep/ .van-field__control:-ms-input-placeholder {
        color: #3f3f3f;
        font-size: 14px;
      }
    }
  }
  /deep/ .van-swipe {
    margin-top: 10px;
    /deep/ .van-swipe-item>img{
      width: 100%;
    }
    /deep/ .van-swipe__indicators{
      left: 10%;
    }
  }
}
.mail-tabs-nav{
  font-size: 18px;
  display: flex;
  font-weight: 500;
  flex-direction: row;
  align-items: center;
  width: 100px;
  flex-basis: auto !important;
  img{
    width: 16px;
    height: 18px;
    margin-right: 7px;
  }
}
.zindex-top {
  z-index: 999;
}
.mail-title-header{
  font-size: 17px;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .shop_name{
    box-sizing: border-box;
    border-left: 3px solid #fff;
    padding-left: 10px;
    color: #fff;
    font-weight: bold;
  }
}
.mail-red{
  background: #FB2B5F;
  color: #fff;
  border: none;
  font-size: 13px;
}
.mail-good-card{
  border-radius:3px;
  margin: 0;
  padding: 0;
  /deep/ .van-grid-item{
    width:114px;
    height:187px;
    opacity:1;
    /deep/ .van-grid-item__content--center{
      border-radius:3px;
      padding:3px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
  .mail-good-img{
    height: 78.5px;
    width: 78.5px;
  }
  .mail-good-info{
    width: 88px;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .mail-good-tag{
    width: 90%;
    display: flex;
    align-items: center;
    text-align: left;
    margin: 3px 0;
    .van-tags{
      display: flex;
      align-items: center;
      justify-content: center;
      // width: 35px;
      height: 14px;
      background: #DB1043;
      color: #fff;
      letter-spacing:0px;
      font-size: 9px;
      border-radius: 2px;
      float: left;
    }
    .price-red{
      color: #DB1043;
      font-weight: bold;
      font-size: 8px;
      float: left;
    }
    .price-gray{
      color: #ADADAD;
      font-size: 7px;
      text-decoration-color: #00ff00;
      text-decoration:line-through;
    }
  }
  .mail-good-buy{
      color: #fff;
      background: #DB1043;
      font-size: 13px;
      border: none;
      width: 100%;
    }
}
.my-swipe{
  height: 104px;
  img{
    height: 104px;
    width: 100%;
  }
}

.mail-more{
  margin: 11px 0;
  font-size: 15px;
  background: none;
  color: #fff;
  border:1px solid #fff;
  /deep/ .van-button__text{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /deep/ i::before {
      height: 18px;
    }
  }
}
</style>
