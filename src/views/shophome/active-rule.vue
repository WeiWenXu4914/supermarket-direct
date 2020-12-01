<template>
  <div class="active-rule">
    <div class="top">
      <img src="../../components/img1/返回.png" alt  @click="back()"/>
      <p class="p1">活动规则</p>
    </div>
      <div v-if="dataList != ''">
        <div class="content">
        <div class="title">
          <p>活动奖品</p>
        </div>
        <div class="list" v-for="(item,index) in dataList.prize" :key="index">
          <div class="left">
            <img src="../../components/img1/礼物.png" alt />
            <p>{{  chnNumChar[index] }}等奖</p>
          </div>
          <div class="right">
            <p>{{ item.apr_name }}</p>
          </div>
        </div>
        
      </div>
      <div class="time">
        <div class="all">
          <p class="p1">活动时间</p>
          <p class="p2">{{ dataList.time.start_time }}至{{ dataList.time.end_time }}</p>
        </div>
        <div class="all">
          <p class="p1">活动说明</p>
          <p class="p2">
            {{ dataList.explainInfo }}
          </p>
        </div>
        <div class="technology">
          <p class="p1">技术支持</p>
          <p class="p2">
            {{ dataList.supporter }}
          </p>
        </div>
      </div>
      </div>
      <div v-else>
        <van-empty description="商家未设置活动" />
      </div>
    
  </div>
</template>

<script>
import { DrawRegulation } from './actions/index';
import { Toast,Empty  } from 'vant'
export default {
  name: "active-rule",
  data() {
      return {
          dataList: '',
          chnNumChar: {
              aprid1: '一',
              aprid2: '二',
              aprid3: '三',
              aprid4: '四',
              aprid5: '五',
              aprid6: '六',
              aprid7: '七',
              aprid8: '八',
              aprid9: '九',
          }
      }
  },
  async created() {
      let id = this.$route.query.entid;
      const res = await DrawRegulation(id);
      this.dataList = res.data;
      console.log(this.dataList)
  },
  methods:{
    back(){
        this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
.active-rule {
  .top {
    display: flex;
    margin-top: 0.5rem;
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
  .content {
    .title {
      p {
        color: #232323;
        font-family: Source Han Sans CN;
        font-weight: 500;
        font-size: 0.45rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
    }
    .list {
      display: flex;
      margin-left: 0.1rem;
      justify-content: space-between;
      align-items: flex-end;
      .left {
        display: flex;
        margin: 0.5rem 0rem 0rem 0.5rem;
        img {
          width: 0.7rem;
          height: 0.7rem;
        }
        p {
          display: inline-block;
          margin: 0.1rem 0rem 0rem 0.3rem;
          color: #232323;
          font-family: "\5FAE\8F6F\96C5\9ED1";
          font-weight: 400;
        }
      }
      .right {
        margin-right: 5%;
        p {
          color: #232323;
          font-weight: 500;
          font-size: 15px;
          font-family: "\5FAE\8F6F\96C5\9ED1";
        }
      }
    }
  }
  .time {
    margin-top: 1rem;
    .all {
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-bottom: 1px solid #dedede;
      width: 90%;
      padding-bottom: 0.5rem;
      .p1 {
        color: #232323;
        font-family: Arial;
        font-weight: 400;
        font-size: 0.45rem;
      }
      .p2 {
        color: #232323;
        font-size: 0.4rem;
        font-family: Arial;
        font-weight: 400;
      }
    }
    .technology {
      margin: 0.5rem 0rem 0rem 0.5rem;
      width: 90%;
      padding-bottom: 0.5rem;
      .p1 {
        color: #232323;
        font-family: Arial;
        font-weight: 400;
        font-size: 0.45rem;
      }
      .p2 {
        color: #232323;
        font-size: 0.4rem;
        font-family: Arial;
        font-weight: 400;
      }
    }
  }
}
</style>