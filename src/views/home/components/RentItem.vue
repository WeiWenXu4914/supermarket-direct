<template>
  <div class="rent-item" v-if="rentItems">
    <div 
      class="item-info" 
      v-if="isUser" >

      <van-icon 
        name="ellipsis" 
        class="buttonss" 
        @click.stop="visible = !visible" />

      <div 
        :class="[visible ? 'more-handle' : 'more-handle-no']">
        <!-- <span v-if="visible" @click.stop="operation(1,rentItems)">编辑</span> -->
        <span v-if="visible" @click.stop="operation(0,rentItems)">删除</span>
      </div>
    </div>

    <div class="adv-img" v-if="rentItems.inter_img_path.length > 0" @click.stop="entDeatil(rentItems)">
      <van-image :src="rentItems.inter_img_path[0].graphic_thumbnail_path" lazy-load height="100">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>

    <div class="adv-info" 
      @click.stop="entDeatil(rentItems)" 
      :style="[{width:(rentItems.inter_img_path.length <= 0?'100%':'')}]">
      <div class="title">
        {{rentItems.graphic_name | emoji_decode}}
      </div>
      <div class="desc">
        {{rentItems.inter_introductory | strSub(50)}}
      </div>
      <div class="tags">
        <span v-for="(item,index) in rentItems.inter_tag" :key="index">{{item}}</span>
      </div>
    </div>

    <div class="job-user">
      <div class="user-img" @click="userHandle">
        <van-image :src="rentItems.mem_head_portrait" round>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="user-name" @click="userHandle">
        {{rentItems.mem_name | strSub(10)}} 
        <span class="time">{{rentItems.graphic_addtime | relTime}}</span>
      </div>
      <div class="user-button">
        <a class="buttons" :href="'tel:'+ rentItems.inter_phone">立即联系</a>
      </div>
    </div>
  </div>
</template>

<script>
import { articleDel } from '../actions'
import { mapState } from 'vuex'
export default {
  name: 'article-rent',
  props: {
    rentItem: Object,
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      rentItems: undefined,
      isUser:false,
      visible: false
    }
  },
  watch: {},
  created () {
    this.change()
    if (this.user.id == this.rentItems.mem_id) {
      this.isUser = true;
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    userHandle () {
      if (this.rentItems.mmt_id === 3) {
        if(this.$route.path == "/merchants/produce"){
          Toast('您已经在店铺内了');
          return;
        }

        var obj = {
          entid: this.rentItems.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {

        if(this.$route.path == `/user/page/${this.rentItems.mem_id}`){
          Toast('您已经在自己的主页了');
          return;
        }

        this.$router.push(`/user/page/${this.rentItems.mem_id}`)
      }
    },
    change () {
      if (Array.isArray(this.rentItem.inter_tag)) return this.rentItems = this.rentItem
      if (this.rentItem.inter_tag) {
        this.rentItem.inter_tag = this.rentItem.inter_tag.split(',')
      } else {
        this.rentItem.inter_tag = []
      }
      this.rentItems = this.rentItem
    },
    entDeatil(res) {
      
      var res = this.$Utils.demoRequest(JSON.stringify(res.gid));
      this.$router.push({
        path: '/zz_rentting',
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
.rent-item {
  box-sizing: border-box;
  padding:15px 0 15px 0;
  overflow: auto;
  border-bottom: 1px solid #eee;
  .item-info{
    width:100%;
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
  .adv-img {
    width: 30%;
    height: 104px;
    margin-right: 10px;
    float:left;
    /deep/ .van-image {
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        object-fit:cover;
      }
    }
  }
  .adv-info {
    width: 64%;
    float:right;
    overflow: auto;
    .title {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 16px;
      color: #2f2f2f;
      font-weight: 500;
    }
    .desc {
      font-size: 14px;
      color: #808080;
      padding: 3px 0;
    }
    .tags {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 18px;
        padding: 0 3px;
        border-radius: 2px;
        font-size: 13px;
        border: 1px solid #386ff2;
        color: #386ff2;
        margin-right: 6px;
      }
    }
    .money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .money-item {
        font-size: 19px;
        color: #d04443;
        font-weight: 500;
      }
      .time {
        font-size: 11px;
        color: #888888;
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
  .job-user {
    width: 100%;
    overflow: auto;
    line-height:35px;
    padding-top: 10px;
    .user-img {
      width: 35px;
      height: 35px;
      // border-radius: 100%;
      // overflow: auto;
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
        padding-left: 5px;
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
