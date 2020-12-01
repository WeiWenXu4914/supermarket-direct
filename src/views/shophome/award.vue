<template>
  <div class="award">
    <div class="top">
      <img src="../../components/img1/返回.png"   @click="back()"/>
      <p class="p1">兑奖详情</p>
    </div>
    
    <div class="zong">
      <div class="center">
        <div class="title">
          <p class="p1">{{ dataMsg.apr_name }}</p>
          <!-- <img src="../../components/img1/1575341561.png" alt /> -->
          <vue-qr :margin='0' :text="dataMsg.number" :size='200'></vue-qr>
          <p class="p2">兑奖码：{{ dataMsg.number }}</p>
        </div>
        <div class="time">
          <div class="all">
            <p class="p1">兑奖期限</p>
            <p class="p2">{{ dataMsg.start_time }} 至 {{ dataMsg.end_time }}</p>
          </div>
          <div class="all">
            <p class="p1">兑奖地址</p>
            <p class="p2">
              {{ dataMsg.site }}
            </p>
          </div>
          <div class="technology">
            <p class="p1">客服电话</p>
            <p class="p2"><a :href="'tel:'+dataMsg.service_phone">{{ dataMsg.service_phone }}</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myActivityDetail } from './actions/index';
import VueQr from 'vue-qr';
export default {
  name: "award",
  components: {
 	  VueQr
  },
  data() {
     return {
        dataMsg: [],
     }
  },
   mounted() {
      console.log(this.$route.query.aprid)
      let id = this.$route.query.aprid;
      myActivityDetail(id)
      .then((res) => {
          this.dataMsg = res.data;
          console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
};
</script>
<style scoped lang="less">
*{
  margin: 0;
  padding: 0;
}

.award {
  height: 100%;
  // background-color: #D04443;
  .top {
    display: flex;
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;
    background-color: #ffffff;
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
    }
  }
  .zong {
    height:110%;
    width: 90%;
    box-sizing: content-box;
    border: 5vw solid #D04443;
    .center {
      height: 100%;
      background-color: #ffffff;
      .title {
        padding-top: 0.1rem;
        width: 90%;
        margin-left: 0.4rem;
        .p1 {
          font-size: 0.7rem;
          text-align: center;
          color: #212121;
          margin-top: 1rem;
        }
        img {
          width: 4.5rem;
          margin: 0.5rem 0;
          margin-left: 50%;
          transform: translateX(-50%);
        }
        .p2 {
          margin-top: 5px;
          text-align: center;
          color: #d04443;
          font-size: 13px;
          font-weight: 400;
        }
      }
      .time {
        margin-top: 0.5rem;
        .all {
          margin: 0.5rem 0rem 0rem 0.5rem;
          border-bottom: 1px solid #dedede;
          width: 90%;
          .p1 {
            color: #232323;
            font-weight: 500;
            font-size: 0.45rem;
          }
          .p2 {
            color: #232323;
            font-size: 0.35rem;
            font-weight: 400;
            margin-top: 0.1rem;
          }
        }
        .technology {
          margin: 0.5rem 0rem 0rem 0.5rem;
          width: 90%;
          // padding-bottom: 0.5rem;
          .p1 {
            color: #232323;
            font-size: 0.45rem;
          }
          .p2 {
            color: #232323;
            font-size: 0.4rem;
            color: rgb(50, 50, 228);
          }
        }
      }
    }
  }
}
</style>