<template>
  <div class="comm-item">
    <div class="img">
        <img :src="commItem.mem_head_portrait" alt="">
    </div>
    <div class="cont">
        <div class="name">
          <div class="n">{{commItem.mem_name}}</div>
          <div class="replay-btn" @click.stop="replay">回复</div>
        </div>
        <div class="inner">
          {{commItem.mem_comment_text}} 
        </div>
        <div class="replay" v-show="commItem.reply" v-for="(items,index) in commItem.reply" :key="index">
          <span class="sp">{{items.mem_name}}</span>
          <span class="replay-ss" >回复</span>
          <span class="sp">{{commItem.mem_name}}</span>:
          {{items.mem_comment_text}}
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'comm-item',
  props: {
    commItem: Object
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    // 回复评论
    replay () {
      const query = {
        name: this.commItem.mem_name,
        mcid: this.commItem.mcid,
        state: 2
      }
      this.$emit('replay',query)
    }
  }
}
</script>

<style scoped lang='less'>
.comm-item{
  display: flex;
  margin-bottom: 10px;
  .img{
    width: 35px;
    height: 35px;
    border-radius: 100%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .cont{
    padding: 0 7px;
    flex: 1;
    overflow: hidden;
    .name{
      display: flex;
      justify-content: space-between;
      .n{
        font-size: 14px;
        color: #3A3A3A;
        font-weight: 500;
        padding: 5px 0;
      }
      .replay-btn{
        padding: 5px 0;
        text-align: right;
        width: 30px;
        font-size: 13px;
        color: #646464;
        font-weight: 400;
      }
    }
    .inner{
      min-height: 35px;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      color: #2C2C2C;
      padding-bottom: 3px;
    }
    .replay {
      box-sizing: border-box;
      padding: 15px;
      font-size: 15px;
      line-height: 24px;
      background: #EDEDED;
      border-bottom: 1px solid #fff;
      .sp {
        font-size: 15px;
        color: #3A3A3A;
        font-weight: 500;
        
      }
      .replay-ss {
        font-size: 14px;
        color: #929292;
        margin: 0 5px;
      }
    }
  }
}

</style>
