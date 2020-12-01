<template>
  <div class="result-page">
    <page-title
      title="搜索结果"
      :titleSize="19"
      :iconSize="22"
      titleFontWeight="500"
    ></page-title>
    <template v-if="resultList.length > 0 && SeachClass == 0">
      <div
        class="result-item"
        v-for="(items, index) in resultList"
        :key="index"
      >
        <template v-if="items.gc_id === 1">
          <article-item
            v-if="items.gc_id === 1"
            :article="items"
          ></article-item>
        </template>
        <template v-else-if="items.gc_id === 2">
          <video-item :videoItem="items"></video-item>
        </template>
        <template v-else-if="items.gc_id === 3">
          <rent-item v-if="items.gc_id === 3" :rentItem="items"></rent-item>
        </template>
        <template v-else-if="items.gc_id === 4">
          <job-item v-if="items.gc_id === 4" :jobItem="items"></job-item>
        </template>
        <template v-else-if="items.gc_id === 6">
          <adv-item v-if="items.gc_id === 6" :advItem="items"></adv-item>
        </template>
      </div>
    </template>
    <template v-else-if="resultList.length > 0 && SeachClass == 1">
      <div
        class="item"
        v-for="(val, inx) in resultList"
        :key="inx"
        @click="userHandle(val.entid)"
      >
        <div class="img">
          <img :src="val.ent_logo" alt v-if="val.ent_name" />
          <!-- <img :src="phone_name" v-else alt /> -->
        </div>
        <div class="center">
          <div class="title">
            <div class="name">
              {{ val.ent_name }}
            </div>
            <div class="msg">
              {{ val.ent_detailed_site }}
              <span>|</span>
              {{ val.ent_remark }}
            </div>
            <div class="star">
              <div class="star-rate">
                <van-rate
                  v-model="val.ent_grade"
                  :size="20"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                  readonly
                />
              </div>
              <div class="score">{{ val.ent_grade }}.0</div>
            </div>
          </div>
          <!-- <div class="act" v-if="inx%2 == 0">
            <div class="tuan">
              <span>团</span>2人套餐200元
            </div>
            <div class="tuan">
              <span>券</span>满100-20元
            </div>
          </div> -->
        </div>
        <div class="right">
          <div>进店</div>
        </div>
      </div>
    </template>
    <template v-else-if="resultList.length > 0 && SeachClass == 2">
      <div
        class="item"
        v-for="(val, inx) in resultList"
        :key="inx"
        @click="userHandle(val.proid)"
      >
        <div class="img">
          <img :src="val.pro_thumbnail" alt v-if="val.pro_name" />
          <!-- <img :src="phone_name" v-else alt /> -->
        </div>
        <div class="center">
          <div class="title">
            <div class="name">
              {{ val.pro_name }}
            </div>
            <div class="msg">
              {{ val.pro_price }}
              <span>￥</span>
              <span>/</span>
              {{ val.pro_unit }}
            </div>
          </div>
        </div>
        <!-- <div class="act" v-if="inx%2 == 0">
            <div class="tuan">
              <span>团</span>2人套餐200元
            </div>
            <div class="tuan">
              <span>券</span>满100-20元
            </div>
          </div> -->
      </div>
    </template>
    <template v-else>
      <van-empty class="empty" description="什么都没有找到" />
    </template>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import ArticleItem from "@/views/home/components/ArticleItem";
import RentItem from "@/views/home/components/RentItem";
import AdvItem from "@/views/home/components/AdvItem";
import JobItem from "@/views/home/components/JobItem";
import VideoItem from "@/views/home/components/VideoItem";
import {
  searchArticle,
  phoneSearch,
  searchInput,
  SearchResults,
  dobsearch,
} from "./actions";
import { mapMutations } from "vuex";
export default {
  name: "search-result",
  components: {
    PageTitle,
    ArticleItem,
    RentItem,
    AdvItem,
    JobItem,
    VideoItem,
  },
  data() {
    return {
      resultList: [],
      searchData: "",
      SeachClass: 0,
      prvUrl: "",
    };
  },
  computed: {},
  created() {
    this.getParams();
  },
  methods: {
    // 获取搜索结果
    async getParams() {
      this.SeachClass = this.$route.query.res;
      console.log(this.SeachClass, "serach值");
      if (this.$route.query.res == 0) {
        if (this.$route.query.val) {
          const res = await searchArticle(this.$route.query.val);
          this.resultList = res.data;
        }
      } else if (this.$route.query.res == 1) {
        if (this.$route.query.val) {
          const res = await phoneSearch(this.$route.query.val);
          this.resultList = res.data.list;
          this.prvUrl = res.data.prvUrl;
        }
      } else if (this.$route.query.res == 2) {
        if (this.$route.query.val) {
          const res = await searchInput(this.$route.query.val);
          this.resultList = res.data;
        }
      }
    },
    ...mapMutations(["setMerchant"]),
    // 去企业首页
    userHandle(id) {
      var obj = {
        entid: id,
        entfid: this.prvUrl.entfid,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: this.prvUrl.href,
        query: { res: res },
      });
    },
  },
};
</script>

<style scoped lang='less'>
.result-page {
  padding: 60px 14px 20px 14px;
}
.item {
  padding: 20px 0;
  margin: 0 10px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  //border-top: 1px solid rgba(230, 230, 230, 1);
  .img {
    height: 55px;
    width: 55px;
    margin-right: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .center {
    .title {
      display: flex;
      flex-direction: column;
      height: 55px;
      justify-content: space-between;
    }
    .name {
      font-size: 15px;
      height: 15px;
      line-height: 15px;
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
      width: 36px;
      height: 36px;
      border: 1px solid rgba(233, 60, 59, 1);
      opacity: 1;
      border-radius: 2px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 36px;
      text-align: center;
      color: rgba(233, 60, 59, 1);
    }
  }
}
</style>
