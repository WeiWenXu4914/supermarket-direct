<template>
  <div class="container">
    <page-title
      :title="title"
      :titleSize="19"
      :iconSize="22"
      titleFontWeight="500"
    ></page-title>
    <div class="content" v-if="list.length > 0"> 
      <div class="item" v-for="(val, inx) in list" :key="inx">
        <div class="left" @click="userHandle(val)">
          <img :src="val.mem_attention_item.mem_head_portrait" />
          <span>{{ val.mem_attention_item.mem_name }}</span>
        </div>
        <div class="right" @click="onFocus(val)">{{ val.mem_attention }}</div>
      </div>
    </div>
    <div v-else>
      <van-empty description="粉丝为空" />
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import { myFans, memberAttention } from "./actions/index.js";
export default {
  name: "user-chat",
  components: {
    PageTitle,
  },
  data() {
    return {
      title: "粉丝",
      list: [],
    };
  },
  computed: {},
  created() {
    this.getMyFans();
  },
  methods: {
    // 我的粉丝
    async getMyFans() {
      const res = await myFans();
      this.list = res.data.list;
    },
    // 关注/取消关注
    async onFocus(i) {

      if (i.mem_attention_state == 1) {

        this.$dialog
          .confirm({
            title: "提示",
            message: "是否回关?",
          })
          .then(() => {

            const form = {
              id: i.mem_attention_item.memid,
              state: 0,
            };
            console.log(form)
            memberAttention(form).then(res=>{
              if (res.code === 100) {
              this.$toast.success("回关成功");
              this.getMyFans();
            } else {
              this.$toast.error("回关失败");
            }
            })
          })
          .catch(() => {});

      } else if (i.mem_attention_state == 2) {

        this.$dialog
          .confirm({
            title: "提示",
            message: "是否取消关注?",
          })
          .then(() => {

            const form = {
              id: i.mem_attention_item.memid,
              state: 1,
            };
            memberAttention(form).then(res=>{
              if (res.code === 100) {
              this.$toast.success("取消成功");
              this.getMyFans();
            } else {
              this.$toast.error("取消失败");
            }
            })
          })
          .catch(() => {});
      }
    },
    userHandle(val) {
      if (val.mem_attention_item.mmt_id === 3) {
        var obj = {
          entid: val.mem_attention_item.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {
        this.$router.push({
          path: `/user/page/${val.mem_attention_item.memid}`,
          query: { type: "u" },
        });
      }
    },
  },
};
</script>

<style scoped lang='less'>
.container {
  padding-top: 70px;
  .content {
    padding: 0 15px;
    .item {
      height: 62px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;

        align-items: center;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          opacity: 1;
        }
        span {
          margin-left: 10px;
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 26px;
          color: rgba(83, 83, 83, 1);
          opacity: 1;
        }
      }
      .right {
        width: 62px;
        height: 27px;
        border: 1px solid rgba(165, 165, 165, 1);
        opacity: 1;
        border-radius: 3px;
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 27px;
        color: rgba(124, 124, 124, 1);
        opacity: 1;
        text-align: center;
        background: #D04443;
        color: #FFFFFF;
      }
    }
  }
}
</style>
