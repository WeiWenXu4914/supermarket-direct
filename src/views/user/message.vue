<!-- 消息页 -->
<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <page-title :rightHandleWidth="80" title="消息" titleFontWeight="500">
        <template slot="title-right">
          <van-icon name="delete" @click="clearMessage" size="20" color="red" />
          <span @click="clearMessage">清空未读</span>
        </template>
      </page-title>

      <div class="wra">
        <van-skeleton round :row="messageData.length" :loading="loading">
          <div
            class="tongzhi flex"
            v-for="(item, index) in messageData"
            :key="index"
            @click="routerJump(item)"
          >
            <div class="img">
              <van-image :src="item.mct_icon" lazy-load fit="cover">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
                <template v-slot:error>加载失败</template>
              </van-image>
            </div>
            <div class="content m-l-sm">
              <div class="title flex flex-between">
                <span class="font-16 font-bold">{{ item.mct_name }}</span>
                <span
                  class="font-12"
                  style="color: #939393"
                  v-if="
                    item.message.length > 0 &&
                    dateTime - item.message[0].mc_sendtime < 1000 * 60
                  "
                  >刚刚</span
                >
              </div>
              <div class="text flex flex-between">
                <span
                  class="text-gray font-12"
                  v-if="item.message.length > 0 && item.mct_id == 1"
                  >{{ item.message[0].mc_content }}</span
                >
                <span
                  class="text-gray font-12"
                  v-else-if="item.message.length > 0"
                  >{{ item.message[0].mc_title }}</span
                >
                <van-icon
                  name="chat-o"
                  v-if="item.NmessageNum > 0 && item.NmessageNum < 100"
                  :badge="item.NmessageNum"
                />
                <van-icon
                  name="chat-o"
                  v-else-if="item.NmessageNum > 100"
                  badge="99+"
                />
                <!-- <i class="hongdian" v-if="item.message.length > 1">{{ item.message.length }}</i> -->
              </div>
            </div>
          </div>
        </van-skeleton>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { messagePost, readAll } from "./actions/index";
import PageTitle from "@/components/PageTitle";
import { Toast } from "vant";
import util from "../util";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      messageData: {},
      dateTime: 0,
      loading: true,
      isLoading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onRefresh() {
      this.get();
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    routerJump(item) {
      if (item.mct_href != null && item.mct_href != "") {
        var obj = {
          mct_id: item.mctid,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: item.mct_href,
          query: { res: res },
        });
      }
    },
    // 获取消息
    async get() {
      this.dateTime = Date.now();
      const res = await messagePost("class");

      this.messageData = res.data;

      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    async clearMessage() {
      util.$emit("delMessage", "delMessage");
      const res = await readAll();
      Toast(res.msg);
      this.get();
    },
  },
  created() {
    this.get();
  },
};
</script>
<style lang='less' scoped>
.wra {
  padding: 12px;
  margin-top: 50px;
  min-height: calc(100vh - 50px);
  .tongzhi {
    margin-top: 18px;
    .img {
      width: 38px;
      height: 38px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      width: 100%;
      height: 54px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
      .text {
        .hongdian {
          width: 8px;
          height: 8px;
          background: rgba(217, 15, 66, 1);
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
