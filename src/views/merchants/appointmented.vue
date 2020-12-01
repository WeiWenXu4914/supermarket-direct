<template>
  <div id="fans-root">
    <page-title title="预约成功" />
    <div class="custom-html">
        <div id="book-success">
    <div class="curtain">
        <div class="top">
          <img :src="require('./icons/空心对勾.png')" class="top-success" />
          <div class="top-subscribeinfo">{{ subscribeinfo.topinfo }}</div>
        </div>
        <div class="content">
          {{ subscribeinfo.content }}
        </div>
    </div>
    <div class="lists">
      <div class="list-1">
        <div class="list-name">{{ subscribeinfo.store }}</div>
        <div class="list-subscribeinfo">{{ subscribeinfo.address }}</div>
      </div>
      <div class="list-2">
        <div class="list-name">{{ subscribeinfo.datetime }}</div>
      </div>
      <div class="list-1">
        <div class="list-name">{{ subscribeinfo.type }}</div>
        <div class="list-subscribeinfo">{{ subscribeinfo.typeinfo }}</div>
      </div>
    </div>
  </div>
    </div>
    <div class="bottom-btn">
      <van-button class="look-order-btn" block>查看我的订单</van-button>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
export default {
  components: {
    PageTitle
  },
  data () {
    return {
      value: '',
      shops: {
        head: require('./icons/928cedf0031246aeb20eae5d7b6eaa95.png'),
        name: 'Adids 阿迪达斯',
        star: 4.0,
        starText: '实力雄厚',
        concerns: '3W',
        staff: 3254,
        fans: 999,
        images: [
          require('./icons/01bf105cd8e4e6a801214168328397.jpg@1280w_1l_2o_100sh (1).png'),
          require('./icons/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh.png'),
          require('./icons/011f9b5cd8e584a801208f8b68c42d.jpg@1280w_1l_2o_100sh.png'),
          require('./icons/016d6d5caac31fa801214168289e0d.jpg@1280w_1l_2o_100sh.png')
        ],
        bigimgs: require('./icons/phone7.png')
      },
      btns: ['投票选举', '线上产品', '团购', '预约'],
      subscribeinfo: {
        topinfo: '预约成功',
        content: '商户会为您预留30分钟，过时订单作废，请按时到店。出示订单即可享受优质服务与优惠。',
        store: '美发工作室【需要预约】',
        address: '北京市海淀区上地十街10号百度大厦',
        datetime: '周二（05-12） 18：00',
        type: '项目',
        typeinfo: '洗吹'
      }
    }
  }
}
</script>

<style lang='less' scoped>
#fans-root {
  overflow: auto;
  width: 100%;
  margin-top: 50px;
  .costom-header {
    /deep/ .title-search {
      width: 641px;
    }
    /deep/ .title-right {
      display: none;
    }
    background: #fff;
    overflow: hidden;
    z-index: 99999;
  }
  .head-card {
    background: #fff;
  }
  .custom-html {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
  .bottom-btn{
    width: 100%;
    padding: 15px;
    position: fixed;
    bottom: 0px;
    .look-order-btn{
      background:rgba(255,105,78,1);
      opacity:1;
      border-radius:3px;
      font-size:17px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(255,255,255,1);
      border: none;
    }
  }
}
#book-success{
  .curtain{
    padding: 15px;
    height:133px;
    background:rgba(245,246,248,1);
    opacity:1;
    .top{
      display: flex;
      align-items: center;
      justify-content: center;
      .top-success{
        width: 38px;
        height: 38px;
        margin-right: 5px;
      }
      .top-subscribeinfo{
        font-size:19px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(37,37,37,1);
        opacity:1;
      }
    }
    .content{
        margin-top:15px;
        font-size:13px;
        font-family:Source Han Sans CN;
        font-weight:400;
        line-height:18px;
        color:rgba(116,116,116,1);
        opacity:1;
    }
  }
  .lists{
    padding: 15px;
    .list-1{
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .list-name{
        font-size:15px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(37,37,37,1);
        opacity:1;
        margin-bottom: 10px;
      }
      .list-subscribeinfo{
        font-size:13px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(116,116,116,1);
        opacity:1;
      }
    }
    .list-2{
      height: 60px;
      .list-name{
        font-size:15px;
        font-family:Source Han Sans CN;
        font-weight:400;
        line-height:60px;
        color:rgba(37,37,37,1);
        opacity:1;
      }
    }
  }
}
.van-nav-bar {
  background:#fff;
}
</style>
