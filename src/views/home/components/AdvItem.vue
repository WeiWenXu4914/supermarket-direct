<template>
  <div class="adv-item">
    <div @click="userHandle">
      <div class="plu-title">
        <!-- <span class="title-icon">
          <img src="../../../assets/icons/hjzw.png" alt="" />
        </span> -->
        <span>{{advItemVal.gadv_title}}</span>
      </div>
      <div class="plu-img">
        <div class="img">
          <img :src="advItemVal.gadv_img_path[0]" alt="" />
        </div>
        <div class="txt">
          <span>{{advItemVal.mem_name}}</span>
          <span class="now">立即进入</span>
        </div>
      </div>
      <div class="plu-buttons">
        <div class="tags">
          <span class="tag">广告</span>
          <span class="time">{{advItemVal.gadv_addtime}} | 北京</span>
        </div>
        <div class="more">更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-adv',
  props: {
    advItem: Object
  },
  data () {
    return {
      advItemVal:[]
    }
  },
  watch: {},
  created () {
    this.initAdv()
  },
  methods: {
    initAdv () {
      this.advItemVal = this.advItem;
    },
    userHandle () {
      if (this.advItem.mmt_id === 3) {

        this.$router.push({
          path: '/merchants',
          query: {entid: this.advItem.rel_id}
        })
        
      } else {
        this.$router.push({
          path: `/user/page/${this.advItem.mem_id}`,
          query: { type: 'u' }
        })
      }
    },
  }
}
</script>

<style scoped lang='less'>
.adv-item {
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  .plu-title {
    padding: 10px 0;
    font-size: 16px;
    color: #232323;
    .title-icon {
      width: 66px;
      height: 22px;
      float: left;
      padding-right: 5px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 83%;
      }
    }
  }
  .plu-img {
    background: #f0f0f0;
    .img {
      height: 195px;
      img {
        width: 100%;
        height: 100%;
        object-fit:cover;
        border-radius: 3px 3px 0px 0px;
      }
    }
    .txt {
      display: flex;
      font-size: 13px;
      justify-content: space-between;
      padding: 8px 10px;
      .now {
        font-size: 15px;
        color: #d04443;
        font-weight: 400;
      }
    }
  }
  .plu-buttons {
    display: flex;
    justify-content: space-between;
    padding: 10px 3px;
    .tags {
      display: flex;
      align-items: center;
      .tag {
        display: flex;
        align-items: center;
        padding: 1px 3px;
        border-radius: 2px;
        border: 1px solid #e93c3b;
        color: #e93c3b;
        font-size: 12px;
        height: 15px;
        margin-right: 10px;
      }
      .time {
        font-size: 11px;
        color: #737373;
      }
    }
    .more {
      font-size: 12px;
      color: #5c5c5c;
    }
  }
}
</style>
