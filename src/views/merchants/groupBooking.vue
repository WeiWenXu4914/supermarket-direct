<template>
  <div class="groupBookingClass">
    <div v-if="dataList.length > 0">
      <div
        class="card"
        @click="goDetail(item.pgbid)"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="thumbnail">
          <van-image
            :src="item.pro_thumbnail"
            width="100%"
            height="100"
            lazy-load
            fit="cover"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="detail">
          <div class="title">{{ item.pro_name | strSub(30) }}</div>
          <div class="inventory">
            <div class="icon">库存</div>
            <div class="text">{{ item.pro_inventory }}</div>
          </div>
          <div class="monery_num">
            <div class="monery">
              <div class="icon">￥</div>
              <div class="text">{{ item.pro_price }}</div>
            </div>
            <div class="num">
              <van-tag type="danger"
                >{{ item.pro_gb_num }}人团 ￥{{
                  item.pro_gb_open_paynum
                }}</van-tag
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="商家未设置拼团活动" />
  </div>
</template>
<script>
import { groupBuyingList } from "./actions/index.js";
export default {
  name: "group-booking",
  props: {
    groupBooking: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: "/groupBookingDetail",
        query: {
          id: id,
        },
      });
    },
    async getDataList() {
      const res = await groupBuyingList(this.groupBooking.entid);
      this.dataList = res.data;
    },
  },
};
</script>
<style scoped lang='less'>
.groupBookingClass {
  width: 95%;
  margin: 0px auto;
  min-height: 500px;
  border-radius: 5px;
  background: #ffffff;
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  .thumbnail {
    width: 30%;
    height: 100px;
    /deep/ .van-image {
      img {
        border-radius: 3px;
      }
    }
  }
  .detail {
    min-height: 90px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    padding-left: 10px;
    .title {
      min-height: 30px;
      font-size: 17px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #282828;
      opacity: 1;
    }
    .inventory {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 20px;
      margin-top: 5px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #6f6f6f;
      opacity: 1;
      .text {
        margin-left: 5px;
      }
    }
    .monery_num {
      width: 100%;
      min-height: 20px;
      margin-top: 5px;
      display: flex;
      align-items: center;
      flex-direction: row;
      .monery {
        height: 20px;
        color: #d04443;
        display: flex;
        align-items: center;
        flex-direction: row;
        .icon {
          font-size: 15px;
        }
        .text {
          font-size: 20px;
          font-weight: 600;
        }
      }
      .num {
        height: 20px;
        margin-left: 5px;
        background: #d04443;
        color: #ffffff;
        border-radius: 3px;
      }
    }
  }
}
</style>