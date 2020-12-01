<template>
  <div class="inform">
      <div class="top">
        <img src="../../components/img1/返回.png" @click="back()" />
        <p class="p1">系统通知</p>
      </div>
      <div class="up">
        <img src="../../components/img1/系统通知.png" alt />
        <p>系统通知</p>
      </div>
      <div v-for="(item, index) in msData" :key="index">
      <div style="margin-top: 20px">
        <div class="content">
          <p>{{ item.mc_title }}</p>
        </div>
        <div class="list">
          <!-- <img
            src="../../components/img1/991880d1919e2b77d6493eed235d4ce838c696652158b3-0BekcG_fw658.webp.png"
            alt
          /> -->
          <p>{{ item.mc_content }}</p>
        </div>
        <div class="time">
          <p>{{ item.mc_sendtime | relTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { systemMessage } from "./actions/index";
export default {
  data() {
    return {
      msData: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 获取消息
    get() {
      var res = JSON.parse(this.$Utils.demoResponse(this.$route.query.res));

      systemMessage(res).then((data) => {
        this.msData = data.data;
      });
    },
  },
  created() {
    this.get();
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.inform {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .up {
    display: flex;
    margin: 0.5rem 0rem 0rem 0.3rem;
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
    p {
      font-size: 0.45rem;
      color: #1d1d1d;
      font-weight: 500;
      margin: 0.05rem 0rem 0rem 0.2rem;
    }
  }
  .content {
    margin: 0.3rem 0rem 0rem 1.2rem;
    color: #282828;
    font-size: 0.4rem;
  }
  .list {
    width: 83%;
    height: auto;
    background-color: #f7f7f7;
    display: flex;
    margin: 0.3rem 0rem 0rem 1.2rem;
    img {
      width: 2rem;
      height: 2rem;
      margin: 0.3rem 0rem 0.3rem 0.3rem;
    }
    p {
      color: #232323;
      margin: 0.3rem 0rem 0.3rem 0.3rem;
      font-size: 0.4rem;
    }
  }
  .time {
    p {
      color: #4e4e4e;
      margin: 0.3rem 0rem 0rem 1.2rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px #eee solid;
    }
  }
}
</style>