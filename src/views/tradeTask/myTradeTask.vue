<template>
  <div class="cpprelease">
    <div class="cpprelease_title">
      <van-icon name="arrow-left" @click="fanhui" />
      <div class="cpprelease_title_text">我的任务</div>
    </div>
    <!-- <div> -->
    <van-tabs
      v-model="active"
      swipeable
      @click="gaibian(active)"
      @change="gaibian(active)"
    >
      <van-tab
        v-for="(item, index) in orelease"
        :key="index"
        :title="item.title"
      >
        <div v-if="task.length > 0">
        <div
          class="cpprelease_cont"
          v-for="item in task"
          :key="item.tmrid"
          @click="entering(item.tlid)"
        >
          <div class="UnderReview">
            <van-icon
              name="clock-o"
              size="16"
              style="padding-top: 2px"
              color="#D04443"
            />
            <div class="UnderReview_word">{{ item.tmr_state_name }}</div>
          </div>
          <div class="cpprelease_titleCont">
            <div class="cont">
              <div class="cont_title">{{ item.tl_content }}</div>
              <div class="cont_remarks">{{ item.tl_name }}</div>
            </div>
            <!-- <van-icon style="margin-top: 3px;" name="arrow" size="19"/> -->
          </div>
          <div class="information">
            <div class="commission">
              <span>佣金：</span>
              <div class="commission_Price">￥{{ item.tl_condition }}</div>
            </div>
            <!-- <div class="information_img"><img src="../../assets/webp.webp (11).png" alt=""></div> -->
          </div>
        </div>
        </div>
        <div v-else>
          <van-empty description="数据为空" />
        </div>
      </van-tab>
    </van-tabs>
    <!-- </div> -->
  </div>
</template>

<script>
import { psostask } from "./actions/index";
export default {
  data() {
    return {
      yrtid: 2,
      task: "",
      active: 0,
      orelease: [
        { title: "全部" },
        { title: "进行中" },
        { title: "已完成" },
        { title: "已结束" },
      ],
      zhuangtai: "已完成",
    };
  },
  created() {
    this.getpsostask();
  },
  methods: {
    fanhui() {
      this.$router.go(-1);
    },
    entering(tl_id) {
      this.$router.push({
        path: "/taskrequest",
        query: {
          tl_id: tl_id,
          yrtid: this.yrtid,
        },
      });
    },
    gaibian(i) {
      this.getpsostask(i)
    },
    //我的任务
    getpsostask(i=0) {
      psostask(i)
        .then((res) => {
          this.task = res.data;
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less">
.cpprelease {
  width: 100%;
  height: auto;
  text-align: center;
  .cpprelease_title {
    padding: 18px 10px;
    display: flex;
    align-items: center;
    font-size: 18px;
    .cpprelease_title_text {
      width: 50vh;
      text-align: center;
    }
  }
  .cpprelease_cont {
    width: 94%;
    height: auto;
    margin: 0 auto;
    padding-top: 20px;
    border-bottom: 1px solid #E1E1E1;
    padding-bottom: 15px;
    .UnderReview {
      width: 100%;
      display: flex;
      .UnderReview_word {
        font-size: 14px;
        color: #D04443;
        margin-left: 5px;
      }
    }
    .cpprelease_titleCont {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .cont_title {
        font-size: 17px;
        font-weight: 600;
        text-align: left;
      }
      .cont_remarks {
        font-size: 14px;
        text-align: left;
        margin-top: 5px;
      }
    }
    .information {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      .commission {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 15px;
          line-height: 25px;
        }
        .commission_Price {
          // margin-left: 3px;
          color: #D04443;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .information_img {
        width: 35px;
        height: 35px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
