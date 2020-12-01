<template>
  <div class="job-item" v-if="jobItems">
    <div class="item-info" v-if="isUser">
      <van-icon name="ellipsis" class="buttonss" @click="visible = !visible" />
      <div :class="[visible ? 'more-handle' : 'more-handle-no']">
        <!-- <span v-if="visible" @click="operation(1,jobItems)">编辑</span> -->
        <span v-if="visible" @click="operation(0,jobItems)">删除</span>
      </div>
    </div>
    <div class="job-info" @click="jobDeatil(jobItems)">
      <div class="info-title">
        {{jobItems.ge_position}}
      </div>
      <!-- <div class="info-money">
        {{jobItems.ge_pay_num}}
      </div> -->
    </div>
    <div class="job-handle" @click="jobDeatil(jobItems)">
      <p>{{jobItems.ge_company_name | emoji_decode}}</p>
      <div class="job-buttons">
        <div class="tags">
          <span v-for="(item,index) in jobItems.ge_tag" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="job-user">
      <div class="user-img" @click.stop="userHandle">
        <van-image :src="jobItems.mem_head_portrait" round>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="user-name">
        {{jobItems.mem_name}} 
        <span class="time">{{jobItems.graphic_addtime | relTime}}</span>
      </div>
      <div class="user-button">
        <a class="buttons" :href="'tel:'+ jobItems.ge_phone">立即联系</a>
      </div>
    </div>
  </div>
</template>

<script>
import { articleDel } from '../actions'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'article-job',
  props: {
    jobItem: Object,
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      jobItems: undefined,
      isUser:false,
      visible: false
    }
  },
  watch: {},
  created () {
    this.change()
    if (this.user.id == this.jobItems.mem_id) {
      this.isUser = true;
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setMerchant']),
    userHandle () {
      if (this.jobItem.mmt_id === 3) {

        if(this.$route.path == "/merchants/produce"){
          Toast('您已经在店铺内了');
          return;
        }

        var obj = {
          entid: this.jobItem.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {

        if(this.$route.path == `/user/page/${this.jobItem.mem_id}`){
          Toast('您已经在自己的主页了');
          return;
        }

        this.$router.push(`/user/page/${this.jobItem.mem_id}`)
      }
    },
    change() {
      if (Array.isArray(this.jobItem.ge_tag)) return  this.jobItems = this.jobItem
      if (this.jobItem.ge_tag) {
        const str = this.jobItem.ge_tag
        if (str.indexOf(',') != -1) {
          this.jobItem.ge_tag = str.split(',')
        } else {
          this.jobItem.ge_tag = str.split('，')
        }
      } else {
        this.jobItem.ge_tag = []
      }
      this.jobItems = this.jobItem
    },
    jobDeatil(obj) {

      var res = this.$Utils.demoRequest(JSON.stringify(obj.gid));

      this.$router.push({
        path: '/zz_job',
        query: {res: res}
      })
    },
    operation(type,res) {
      if (type == 0) {
        articleDel(res.gid).then(data => {
          if(data.code == 100){
            this.$emit('deleteIndex', this.index)
          }
        })
      }else{
        // 编辑
      }
    }
  }
}
</script>

<style scoped lang='less'>
.job-item {
  box-sizing: border-box;
  background: #fff;
  padding-top:10px;
  padding-bottom:5px;
  margin-top:5px;
  border-bottom: 1px solid #eee;
  .item-info{
    height:35px;
    .buttonss {
      height:35px;
      line-height:35px;
      overflow: auto;
      font-size: 25px;
      font-weight: 700;
      color: #bfbfbf;
      float:right;
    }
    .more-handle{
      float:right;
      margin-right:5px;
      background: #fff;
      border-left: 1px solid #BFBFBF;
      color: #3A3A3A;
      transition: all .3s;
      overflow: auto;
      span{
        float:left;
        height: 34px;
        line-height:34px;
        width:60px;
        text-align:center;
        color:#fff;
        // background: #E8E8E8;
        background:red;
      }
      span:nth-child(2){
        background:red;
        margin-left:2px;
      }
    }
    .more-handle-no{
      transition: all .3s;
      overflow: hidden;
      width: 0;
    }
  }
  .job-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-title {
      font-weight: 500;
      font-size: 16px;
      color: #2f2f2f;
    }
    .info-money {
      font-weight: 500;
      font-size: 19px;
      color: #d04443;
    }
  }
  .job-handle {
    p {
      font-size: 14px;
      color: #2f2f2f;
      padding: 2px 0;
    }
    .job-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tags {
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          text-align: center;
          border-radius: 2px;
          margin-right: 5px;
          padding:0 4px;
          height: 21px;
          background: #ececec;
          font-size: 12px;
          color: #2f2f2f;
        }
      }
    }
  }
  .job-user {
    height: 35px;
    margin: 10px 0;
    //display: flex;
    //align-items: center;
    //border:1px red solid;
    overflow:auto;
    line-height:35px;
    .user-img {
      width: 35px;
      height: 35px;
      // border-radius: 100%;
      // overflow: hidden;
      margin-right: 10px;
      float:left;
      img {
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
      /deep/ .van-image{
        width: 35px;
        height: 35px;
        background:#fff;
      }
    }
    .user-name {
      font-weight: 500;
      font-size: 13px;
      float:left;
      .time {
        font-size: 11px;
        font-weight: normal;
        color: #737373;
      }
    }
    .user-button {
      float:right;
      .buttons {
        //display: flex;
        //align-items: center;
        //justify-content: center;
        padding:7px 10px 7px 10px;
        border-radius: 2px;
        width: 64px;
        height: 26px;
        background: #d04443;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>
