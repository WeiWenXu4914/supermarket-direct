<template>
  <div class="all">
    <div class="header">
      <div class="top">
        <img src="../../components/img1/返回.png" class="i1" @click="back()" />
        <p class="p11">全部订单</p>
        <img
          src="../../components/img1/搜索.png"
          alt
          class="i2"
          @click="search"
        />
      </div>
      <van-tabs
        type="none"
        title-active-color="#D04443"
        v-model="active"
        @click="onClick"
      >
        <van-tab title="全部">
          <order-item :state="active"></order-item>
        </van-tab>
        <van-tab title="待付款">
          <order-item :state="active"></order-item>
        </van-tab>
        <van-tab title="待发货">
          <order-item :state="active"></order-item>
        </van-tab>
        <van-tab title="待收货">
          <order-item :state="active"></order-item>
        </van-tab>
        <van-tab title="待评价">
          <order-item :state="active"></order-item>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import orderItem from "./components/orderItem";
export default {
  name: "all",
  components: {
    orderItem,
  },
  created() {
    this.active = this.$route.query.state;
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    back() {
      console.log(this.$route.query.route);
      if (this.$route.query.route) {
        this.$router.replace("/");
      } else {
        this.$router.go(-1);
      }
    },
    search() {
      this.$router.push("/order");
    },
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.all {
  background-color: #f6f6f6;
  .header {
    .top {
      display: flex;
      margin-top: 0.3rem;
      padding-bottom: 0.3rem;
      background-color: #ffffff;
      .i1 {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.1rem 0rem 0rem 0.3rem;
      }
      .p11 {
        margin-left: 3rem;
        color: #2f2f2f;
        font-size: 0.5rem;
        font-weight: 500;
        font-family: Source Han Sans CN;
      }
      .i2 {
        width: 0.6rem;
        height: 0.6rem;
        margin: 0.1rem 0rem 0rem 3rem;
      }
    }
  }
  /deep/.van-tabs__wrap {
    padding: 10px 0;
    background-color: #fff;
    border-top: 1px solid rgb(233, 232, 232);
    border-bottom: 1px solid rgb(233, 232, 232);
  }
  .zong1 {
    background-color: #ffffff;
    padding-bottom: 0.5rem;
    margin-top: 0.3rem;
    .content {
      .list {
        display: flex;
        padding-top: 0.5rem;
        margin-left: 0.5rem;
        .icon {
          width: 1rem;
          height: 1rem;
          background-color: #0066ff;
          border-radius: 0.1rem;
          img {
            width: 0.8rem;
            margin-left: 50%;
            margin-top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .p1 {
          color: #212121;
          font-size: 0.4rem;
          font-weight: bold;
          margin: 0.15rem 0rem 0rem 0.2rem;
        }
        .p2 {
          color: #d04443;
          font-size: 0.45rem;
          margin: 0.15rem 0rem 0rem 3.5rem;
        }
      }
    }
    .goods {
      display: flex;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 0.5rem;
      .left {
        margin: 0.5rem 0rem 0rem 0.2rem;
        .photo {
          width: 2rem;
          height: 2rem;
          background-color: #f5f5f5;
          img {
            width: 2rem;
            margin-left: 50%;
            margin-top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .center {
        .p1 {
          font-size: 0.44rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          margin: 0.6rem 0rem 0rem 0.2rem;
        }
        .p2 {
          width: 1rem;
          color: #d04443;
          border: 1px solid #d04443;
          text-align: center;
          border-radius: 0.1rem;
          margin: 0.6rem 0rem 0rem 0.2rem;
        }
      }
      .right {
        .p1 {
          display: inline-block;
          margin: 0.7rem 0rem 0rem 1.5rem;
        }
        .p2 {
          display: inline-block;
          font-size: 0.5rem;
          color: #242424;
        }
        .p3 {
          color: #878787;
          font-size: 0.45rem;
          margin: 0rem 0rem 0rem 2.5rem;
        }
      }
    }
    .last {
      display: flex;
      margin: 0.5rem 0rem 0rem 0.5rem;
      .p1 {
        color: #767676;
        font-size: 0.4rem;
      }
      .p2 {
        color: #232323;
        margin-left: 3.5rem;
      }
      .p3 {
        font-size: 0.3rem;
        margin-top: 0.1rem;
        color: #db1043;
      }
      .p4 {
        font-size: 0.45rem;
        margin-top: -0.05rem;
        color: #db1043;
      }
      .p5 {
        margin-left: 0.1rem;
        margin-top: -0.05rem;
      }
    }
    .btn {
      button {
        outline: none;
        background-color: #ffffff;
        border: none;
        width: 2rem;
        border: 1px solid #b0b0b0;
        height: 1rem;
        color: #2a2a2a;
        font-family: Source Han Sans CN;
        font-weight: 400;
        border-radius: 0.1rem;
        font-weight: bold;
      }
      .b1 {
        margin: 0.5rem 0rem 0rem 2.8rem;
      }
      .b2 {
        margin-left: 0.4rem;
      }
      .b3 {
        color: #ffffff;
        background-color: #d04443;
        border: none;
        outline: none;
        margin-left: 0.4rem;
      }
    }
  }
}
</style>