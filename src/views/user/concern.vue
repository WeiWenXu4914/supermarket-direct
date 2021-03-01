<template>
  <div class="container">
    <page-title :iconSize="19" :rightHandleWidth="319" title="我的关注" :rightHandleHeight="39" titleFontWeight="500">
      <div slot="search">
        <!-- <van-search v-model="value" placeholder="搜索用户名" /> -->
      </div>
    </page-title>
    <div class="content" v-if="list.length > 0">
      <div class="item" v-for="(val, inx) in list" :key="inx">
        <div class="left" @click="userHandle(val)">
          <template v-if="val.mem_attention_item.mem_head_portrait">
            <van-image :src="val.mem_attention_item.mem_head_portrait" round>
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </template>
          <!-- <img :src="val.mem_attention_item.mem_head_portrait"/> -->
          <span>{{val.mem_attention_item.mem_name}}</span>
        </div>
        <div class="right" @click="onFocus(val,inx)" >{{val.mem_attention}}</div>
      </div>
    </div>
    <div v-else>
      <van-empty description="关注为空" />
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { myAttention, memberAttention } from './actions/index.js'
import { start } from 'repl'
export default {
  name: 'user-chat',
  components: {
    PageTitle
  },
  data () {
    return {
      value: '',
      list: [],
    }
  },
  computed: {},
  created () {
    this.getMyAttention()
  },
  methods: {
    // 我的关注
    async getMyAttention () {
     const res = await myAttention()
     this.list = res.data.list
    },
    // 关注/取消关注
    async onFocus (i,inx) {
      this.$dialog.confirm({
        title: '提示',
        message: '是否取消关注',
      }).then(async () => {
       const form = {
            id: i.mem_attention_id,
            state: 1
          }
          const res = await memberAttention(form)
          if (res.code === 100) {
            this.$toast.success('取消关注')
            this.list.splice(inx,1)
          } else {
            this.$toast.fail('操作失败')
          }
      }).catch(() => {})
    },
    userHandle(val) {
      if (val.mem_attention_item.mmt_id === 3) {

        var obj = {
          entid: val.mem_attention_item.rel_id,
          entfid: 0
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: '/merchants',
          query: {res: res}
        })

      } else {
        this.$router.push({
          path: `/user/page/${val.mem_attention_item.memid}`,
          query: { type: 'u' }
        })
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding-top: 70px;
  .van-search__content {
    background-color: #f1f1f1;
    .van-cell /deep/ .van-field__left-icon {
    font-size: 20px;
    color: rgb(208, 68, 67)
}
  }
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
        /deep/ img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          opacity: 1;
        }
        /deep/ .van-image{
          width: 42px;
          height: 42px;
          background:#fff;
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
