<template>
  <div class="merLuck">
    <div class="luck" v-show="awards.length > 0">
      <img src="./img/prize_title2.webp" alt="">
      <!-- <div class="bottom">
        <div class="photo" >
          <LuckDraw
            :awards="awards"
            ref="luckDraw"
            :async="true"
            @start="handleStart"
            @end="handleEnd"
            @before-start="handleBeforeStart"
            class="zhuan"
          />
        </div>
      </div> -->

      <LuckTurntable
      :awards="awardsSon"
      :aid="aidSon"
      :num="allMsg.maxnum"
      @changeNum="updateNum"
      />

      <div class="count">
        <span>剩余可抽奖次数: {{ allMsg.maxnum }} 次</span>
      </div>
      <div class="luck_btn">
        <van-button round type="info" class="my_btn" @click="toMyPrize">我的奖品</van-button>
        <van-button round type="info" class="rule_btn" @click="toRule">活动规则</van-button>
      </div>
      <div class="time">
        <span>活动时间:{{ allMsg.start_time }} 至 {{ allMsg.end_time }} </span>
      </div>
    </div>
    <van-empty v-show="awards.length === 0" description="商家未设置该活动" />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { startActivity } from './actions/index';
import LuckTurntable from './components/LuckTurntable';
export default {
  props:['awardsSon','info','aid','allMsg'],
  name: "luck",
  components: {
    LuckTurntable
  },
  data() {
    return {
      aidSon: null
    };
  },
  created() {
    this.awards = this.awardsSon;
    this.aidSon = this.aid
  },
  methods: {
    
    toMyPrize() {
      this.$router.push({
        path:'/prize',
        query: {
          entid: this.info.entid
        }
      })
    },
    toRule() {
      this.$router.push({
        path:'/active-rule',
        query: {
          entid: this.info.entid
        }
      })
    },
    updateNum(val) {
      this.allMsg.maxnum = val;
    }
  },
};
</script>

<style scoped lang="less">
.merLuck{
  .luck {
    // background:#000;
    min-height:405px;
    background: linear-gradient(to bottom,#FFBC3A 0%,#FFE443 40%#FBB730 60%);
    img {
      width: 90%;
      margin-left: 5%;
    }
    .bottom {
      background-color: #f5f6f8;
      .biao {
        display: flex;
        margin-top: 0.5rem;
        border-bottom: 1px solid #dbdbdb;
        padding-bottom: 0.3rem;
        padding-top: 0.3rem;
        p {
          font-size: 0.45rem;
          margin-left: 0.5rem;
        }
        .p1 {
          color: #ffffff;
          background: #d04443;
          border-radius: 0.5rem;
          width: 3.2rem;
          height: 0.8rem;
          text-align: center;
          padding-top: 0.05rem;
        }
      }
      .photo {
        height:100%;
        .zhuan {
          display: block;
          width: 80%;
          margin: 0 auto;
          margin-top: 1rem;
        }
      }
    }
    .luck_btn {
      width:100%;
      // position:fixed;
      // bottom:60px;
      margin-top:10px;
      margin-bottom:10px;
      height:auto;
      overflow: auto;
      zoom:1;
      button {
        width: 4rem;
        height: 1.2rem;
        outline: none;
        border: none;
        background-color: rgb(255, 136, 44);
        color: #ffffff;
        border-radius: 2rem;
      }
      .my_btn {
        float:left;
        // position: absolute;
        // bottom: 1.5rem;
        margin-left: 8%;
      }
      .rule_btn {
        float:right;
        // position: absolute;
        // bottom: 1.5rem;
        margin-right: 8%;
      }
    }
    .count {
      text-align: center;
      color:#DD561F;
      padding: 20px 0;
      font-size: 18px;
    }
    .time {
      text-align: center;
      padding: 20px 0;
        span {
          color:#DD561F;
        }
    }
  }
}
</style>