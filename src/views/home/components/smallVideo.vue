<template>
  <div class="small-video">
    <div class="small-item" @click="goDetail(smallItem)">
      <div class="small-top">
        <img :src="smallItem.graphic_surface_plot" alt="">
      </div>
      <div class="small-bottom">
        <div class="title">{{ smallItem.graphic_name | strSub(15) }}</div>
        <div class="small-oper">
          <!-- <div class="small-oper-item">
            <van-icon name="browsing-history" size="14px" color="#fff" />
            <span>12</span>
          </div> -->
          <div class="small-oper-item">
            <van-icon name="like" size="14px" color="#fff" />
            <span>{{ smallItem.graphic_like }}</span>
          </div>
          <div class="small-oper-item">
            <van-icon name="star" size="14px" color="#fff" />
            <span>{{ smallItem.graphic_collect }}</span>
          </div>
          <div class="small-oper-item">
            <van-icon name="share" size="14px" color="#fff" />
            <span>{{ smallItem.graphic_forward }}</span>
          </div>
          <div class="small-oper-item">
            <van-icon name="chat" size="14px" color="#fff" />
            <span>{{ smallItem.graphic_comment }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    smallItem: Object
  },
  data() {
    return {};
  },
  methods: {
    goDetail(val) {

      if(val.graphic_height >= 800){

        this.$router.push(`/article/full_screen_play/${val.gid}`);
      }else{
        
        this.$router.push(`/article/detail/${val.gid}`);
      }
    }
  }
};
</script>
<style lang="less">
.small-video {
  width: 100%;
  .small-item {
    z-index: 1;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    position: relative;
    .small-top {
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .small-bottom {
      position: absolute;
      width: 100%;
      padding: 4px;
      z-index: 2;
      bottom: 0;
      left: 0;
      background: rgba(0000, 0000, 0000, 0.2);
      border-radius: 0 0 5px 5px;
      .title {
        width: 100%;
        font-size: 15px;
        font-weight: 400;
        color: #ffffff;
        line-height: 1;
      }
      .small-oper {
        width: 100%;
        margin-top: 2px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .small-oper-item {
          margin-left: 8px;
          color: #ffffff;
          span {
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>