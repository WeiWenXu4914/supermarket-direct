<template>
  <div class="tradeTask">
    <!-- 导航头部 -->
    <header>
      <van-icon name="arrow-left" class="icon" @click="$router.go(-1)" />
      <van-search
        placeholder="找自己喜欢的任务"
        :disabled="true"
        class="search"
      />
    </header>

    <!-- 页面内容 -->
    <div class="pageContent">
      <van-tabs v-model="active" @click="onClick">
        <van-tab title="平台任务">
          <!--标签-->
          <div class="tags">
            <span
              v-for="(item, index) in tagData"
              :key="index"
              @click="tagRouter(item, index)"
              :style="
                tagsIndex == index ? 'color:#FFF;backgroundColor: #f50;' : ''
              "
            >
              {{ item }}
            </span>
          </div>

          <!--任务项-->
          <div
            class="taskItem"
            v-for="(item, index) in Platform_tasks"
            :key="index"
            @click="toDetail(item)"
          >
            <div class="title">
              <span>
                <van-icon name="clock-o" color="#D04443" class="icon" />
                剩余 {{ item.date.Days }} 天 {{ item.date.Hours }} 小时
                {{ item.date.Minutes }} 分钟
              </span>
              <span>任务数：{{ item.tl_num }}</span>
            </div>

            <div class="contentText">
              <h4>{{ item.tl_name }}</h4>
              <p>{{ item.tl_remark }}</p>
            </div>

            <div class="function">
              <div class="money">
                <span>佣金：</span>
                <span>￥{{ item.tl_commission }}</span>
              </div>
              <div
                class="receiveTask"
                v-show="item.my_get_state === 0 ? true : false"
              >
                领取任务
              </div>
              <div
                class="receiveTaskReady"
                v-show="item.my_get_state === 0 ? false : true"
              >
                已领取
              </div>
            </div>
          </div>

          <van-empty description="无平台任务项" v-if="Platform_tasks.length === 0"/>
        </van-tab>

        <van-tab title="商家任务">
          <!--标签-->
          <div class="tags">
            <span
              v-for="(item, index) in tagData"
              :key="index"
              @click="tagRouter(item, index)"
              :style="
                tagsIndex == index ? 'color:#FFF;backgroundColor: #f50;' : ''
              "
            >
              {{ item }}
            </span>
          </div>

          <!--任务项-->
          <div
            class="taskItem"
            v-for="(item, index) in Trade_taskss"
            :key="index"
            @click="toDetail(item)"
          >
            <div class="title">
              <span>
                <van-icon name="clock-o" color="#D04443" />
                剩余 {{ item.date.Days }} 天 {{ item.date.Hours }} 小时 {{ item.date.Minutes }} 分钟
              </span>
              <span>任务数：{{ item.tl_num }}</span>
            </div>

            <div class="contentText">
              <h4>{{ item.tl_name }}</h4>
              <p>{{ item.tl_remark }}</p>
            </div>

            <div class="function">
              <div class="money">
                <span>佣金：</span>
                <span>￥{{ item.tl_commission }}</span>
              </div>
              <!--任务领取状态-->
              <div
                class="receiveTask"
                v-show="item.my_get_state === 0 ? true : false"
              >
                领取任务
              </div>
              <div
                class="receiveTaskReady"
                v-show="item.my_get_state === 0 ? false : true"
              >
                已领取
              </div>
            </div>
          </div>

          <van-empty description="无平台任务项" v-if="Trade_taskss.length === 0"/>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 底部导航 -->
    <div class="navagatorBottom">
      <span @click="$router.push('/')">首页</span>
      <span @click="$router.push('/myTradeTask')">我的任务</span>
      <span @click="$router.push('/pwallentln')">钱包</span>
    </div>
  </div>
</template>

<script>
import { taskList } from "./actions/index";
import { Icon, Toast, Empty } from "vant";

export default {
  beforeCreate() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 0,
    });
  },
  created() {
    taskList().then((res) => {
      console.log(res)
      res.data.forEach((element) => {
        if (element.ent_type === 1) {
          this.Trade_tasks.push(element);
          //处理时间差
          element.date = this.compareTime(
            element.tl_starttime,
            element.tl_endtime
          );
        } else {
          this.Platform_tasks.push(element);
          element.date = this.compareTime(
            element.tl_starttime,
            element.tl_endtime
          );
        }
      });
      this.Platform_taskss = this.Platform_tasks;
      this.Trade_taskss = this.Trade_tasks;
      if (res) {
        Toast.loading({
          duration: 1,
        });
      }
    });
  },
  data() {
    return {
      active: 1,
      //领取任务状态
      isReceive: false,
      //标签数据
      tagData: ["广告", "商品", "其它"],
      // 平台任务
      Platform_tasks: [],
      Platform_taskss: [], //过渡变量
      //商家任务
      Trade_tasks: [],
      Trade_taskss: [],
      qihuanid: 1,
      tagsIndex: -1,
    };
  },
  methods: {
    //任务详情
    toDetail(item) {
      if (item.my_get_state == 0) {
        //未领取状态
        this.$router.push({
          path: "/taskrequest",
          query: { id: item.tlid, qihuanid: this.qihuanid },
        });
      } else {
        this.$router.push({
          path: "/taskrequest",
          query: {
            tl_id: item.tlid,
            yrtid: 2,
          },
        });
      }
    },
    //切换标签时初始化数据
    onClick(name, title) {
      this.tagsIndex = -1;
      this.Platform_tasks = this.Platform_taskss;
      this.Trade_tasks = this.Trade_taskss;
    },
    tagRouter(item, index) {
      let data1 = [],
        data2 = [];
      this.tagsIndex = index;
      if (item === "广告") {
        this.Platform_taskss.forEach((element) => {
          if (element.tl_rel_type === 1) {
            data1.push(element);
          }
        });
        this.Trade_taskss.forEach((element) => {
          if (element.tl_rel_type === 1) {
            data2.push(element);
          }
        });

        this.Trade_tasks = data2;
        this.Platform_tasks = data1;
        data1 = [];
        data2 = [];
      } else if (item === "商品") {
        this.Platform_taskss.forEach((element) => {
          if (element.tl_rel_type === 2) {
            data1.push(element);
          }
        });
        this.Trade_taskss.forEach((element) => {
          if (element.tl_rel_type === 1) {
            data2.push(element);
          }
        });

        this.Trade_tasks = data2;

        this.Platform_tasks = data1;
        data1 = [];
        data2 = [];
      } else {
        this.Platform_taskss.forEach((element) => {
          if (element.tl_rel_type === 3) {
            data1.push(element);
          }
        });
        this.Trade_taskss.forEach((element) => {
          if (element.tl_rel_type === 1) {
            data2.push(element);
          }
        });

        this.Trade_tasks = data2;
        this.Platform_tasks = data1;
        data1 = [];
        data2 = [];
      }
    },
    //处理剩余时间
    compareTime(start, end) {
      let startTime = start;
      let endTime = end;
      startTime = this.stringToDate(startTime);
      endTime = this.stringToDate(endTime);
      var retValue = {};

      var compareTime = endTime - startTime; // 时间差的毫秒数
      // 计算出相差天数
      var days = Math.floor(compareTime / (24 * 3600 * 1000));
      retValue.Days = days;

      // 计算出相差年数
      var years = Math.floor(days / 365);
      retValue.Years = years;

      // 计算出相差月数
      var months = Math.floor(days / 30);
      retValue.Months = months;

      // 计算出小时数
      var leaveHours = compareTime % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
      var hours = Math.floor(leaveHours / (3600 * 1000));
      retValue.Hours = hours;

      // 计算相差分钟数
      var leaveMinutes = leaveHours % (3600 * 1000); // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leaveMinutes / (60 * 1000));
      retValue.Minutes = minutes;

      // 计算相差秒数
      var leaveSeconds = leaveMinutes % (60 * 1000); // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leaveSeconds / 1000);
      retValue.Seconds = seconds;

      var resultSeconds = 0;
      if (years >= 1) {
        resultSeconds = resultSeconds + years * 365 * 24 * 60 * 60;
      }
      if (months >= 1) {
        resultSeconds = resultSeconds + months * 30 * 24 * 60 * 60;
      }
      if (days >= 1) {
        resultSeconds = resultSeconds + days * 24 * 60 * 60;
      }
      if (hours >= 1) {
        resultSeconds = resultSeconds + hours * 60 * 60;
      }
      if (minutes >= 1) {
        resultSeconds = resultSeconds + minutes * 60;
      }
      if (seconds >= 1) {
        resultSeconds = resultSeconds + seconds;
      }
      retValue.resultSeconds = resultSeconds;
      return retValue;
    },
    //转日期格式
    stringToDate(str) {
      var tempStrs = str.split(" ");

      var dateStrs = tempStrs[0].split("-");

      var year = parseInt(dateStrs[0], 10);

      var month = parseInt(dateStrs[1], 10) - 1;

      var day = parseInt(dateStrs[2], 10);

      var timeStrs = tempStrs[1].split(":");

      var hour = parseInt(timeStrs[0], 10);

      var minute = parseInt(timeStrs[1], 10);

      var second = parseInt(timeStrs[2], 10);

      var date = new Date(year, month, day, hour, minute, second);

      return date;
    },
  },
};
</script>

<style lang="less">
.tradeTask {
  //导航头
  header {
    width: 100%;
    height: 52px;
    background: #D04443;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      color: #fff;
      font-size: 20px;
      padding: 0 10px;
    }
    .search {
      display: inline-block;
      padding: 0 !important;
      width: 80%;
      margin-right: 10px;
    }
  }
  .pageContent {
    text-align: left;
    //标签
    .tags {
      display: flex;
      align-items: center;
      height: 50px;
      width: 94%;
      margin: 0 auto;
      border-bottom: 0.5px solid rgb(233, 231, 231);
      span {
        width: 50px;
        height: 30px;
        margin-right: 15px;
        font-size: 13px;
        background-color: #F2F2F2;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        color: #262626;
      }
    }
    .taskItem {
      width: 94%;
      margin: 25px auto 0 auto;
      border-bottom: 0.5px solid rgb(233, 231, 231);
      .title {
        display: flex;
        width: 100%;
        padding-bottom: 2px;
        color: #D04443;
        font-size: 15px;
        align-items: center;
        justify-content: space-between;
        .icon {
          transform: translateY(10%);
        }
        span:nth-of-type(2) {
          color: #383838;
        }
      }
      .contentText {
        h4 {
          font-size: 18px;
          width: 100%;
          padding: 8px 0;
          text-align: left;
        }
        p {
          font-size: 16px;
          color: #383838;
          width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
      }
      .function {
        display: flex;
        margin: 20px 0;
        justify-content: space-between;
        .money {
          span:nth-of-type(1) {
            font-size: 15px;
          }
          span:nth-of-type(2) {
            font-size: 20px;
            color: #D04443;
          }
        }
        .receiveTask {
          display: inline-block;
          width: 76px;
          height: 30px;
          background-color: #D04443;
          font-size: 13px;
          color: #fff;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
        }
        .receiveTaskReady {
          display: inline-block;
          width: 76px;
          height: 30px;
          background-color: #8E8E8E;
          font-size: 13px;
          color: #fff;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
        }
      }
    }
    .taskItem:nth-last-child(1) {
      padding-bottom: 60px;
    }
  }
  .navagatorBottom {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1;
    background-color: #fff;
    height: 45px;
    border-top: 0.5px solid rgb(233, 231, 231);
    span {
      flex-grow: 1;
      font-size: 16px;
      text-align: center;
      line-height: 45px;
      font-weight: 500;
      color: #888888;
    }
    span:nth-of-type(2) {
      color: #1D1D1D;
    }
  }
}
</style>