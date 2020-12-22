<template>
  <div class="life-home-page">
    <div class="item" @click="userHandle(merItem.entid)">
      <div class="img">
        <van-image
          :src="merItem.ent_logo"
          v-if="merItem.ent_name"
          width="55"
          height="55"
          lazy-load
          fit="contain"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="center">
        <div class="title">
          <div class="name">
            {{ merItem.ent_name }}
          </div>
          <div class="msg">
            {{ merItem.ent_detailed_site }}
            <span>|</span>
            {{ merItem.ent_introduction }}
          </div>
          <div class="star">
            <div class="star-rate">
              <van-rate
                v-model="merItem.ent_grade"
                :size="20"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </div>
            <div class="score">{{ merItem.ent_grade }}.0</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>进店</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lift-index",
  components: {},
  props: {
    merItem: Object
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    // 去企业首页
    userHandle(id) {
      var obj = {
        entid: id,
        entfid: 0,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/merchants/produce",
        query: { res: res },
      });
    }
  }
};
</script>

<style scoped lang='less'>
.life-home-page {
  padding: 0 5px;
  margin-top: 5px;
  .item {
    display: flex;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    margin-bottom: 5px;
    padding-bottom: 5px;
    .img {
      height: 55px;
      width: 55px;
      margin-right: 10px;
      /deep/ .van-image {
        img {
          border-radius: 2px;
        }
      }
    }
    .center {
      .title {
        display: flex;
        flex-direction: column;
        min-height: 55px;
        justify-content: space-between;
      }
      .name {
        font-size: 15px;
        min-height: 15px;
        line-height: 100%;
        font-family: Source Han Sans CN;
        font-weight: 700;
        color: rgba(33, 33, 33, 1);
        span {
          display: inline-block;
          width: 38px;
          height: 15px;
          padding: 0;
          text-align: center;
          img {
            height: 100%;
            width: 100%;
            vertical-align: -2px;
          }
        }
      }
      .msg {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 21px;
        color: rgba(61, 61, 61, 1);
        opacity: 1;
        margin-top: 5px;
        span {
          margin: 0 5px;
        }
      }
      .star {
        display: flex;
        div {
          width: 15px;
          height: 25px;
          border-radius: 1px;
          margin-right: 5px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .star-rate {
          width: 110px;
        }
        .score {
          width: 20px;
          height: 25px;
          font-size: 13px;
          font-family: Avenir;
          font-weight: 500;
          line-height: 26px;
          color: rgba(250, 191, 80, 1);
          opacity: 1;
          margin-left: 10px;
        }
        .huang {
          background: rgba(250, 191, 80, 1);
        }
        .hui {
          background: rgba(229, 229, 229, 1);
        }
      }
      .act {
        margin-top: 20px;
        .tuan {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 21px;
          color: rgba(90, 90, 90, 1);
          opacity: 1;
          span {
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background: linear-gradient(
              90deg,
              rgba(255, 108, 80, 1) 0%,
              rgba(245, 23, 36, 1) 100%
            );
            opacity: 1;
            border-radius: 2px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 15px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      div {
        width: 45px;
        height: 36px;
        border: 1px solid rgb(51, 160, 233);
        opacity: 1;
        border-radius: 2px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
        color: rgb(51, 160, 233);
      }
    }
  }
}
</style>
