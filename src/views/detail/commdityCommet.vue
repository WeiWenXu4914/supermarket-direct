<template>
    <div>
        <title-view title="商品评价" :border="false" class="title"></title-view>
        <div class="eva">
            <div v-for="(item,index) in dataList" :key="index">
                 <div class="e2">
                    <div>
                      <img :src="item.mem_head_portrait" alt class="i1" />
                      <span>{{ item.mem_name }}</span>
                    </div>
                    <van-rate 
                        v-model="item.num" 
                        :size="15" 
                        color="#ffd21e" 
                        void-icon="star" 
                        void-color="#eee" 
                        class="i2"
                        readonly
                    />
                </div>
                <div class="e3">
                    <p>{{ item.mem_comment_text }}</p>
                </div>
                <div class="e4">
                    <div v-for="img in item.mem_comment_imgs" :key="img">
                      <van-image
                        :src="img"
                        width="2.5rem"
                        height="2.5rem"
                        lazy-load
                        fit="cover"
                        @click="showImg($event)"
                      />
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import titleView from '../../components/public_views/titleView';
import { ImagePreview } from 'vant';
export default {
    components: {
        titleView
    },
    data() {
        return {
            dataList: [],
            rareValue: 5
        }
    },
    created() {
        this.dataList = JSON.parse(this.$route.query.dataList);
    },
    methods: {
      showImg(e) {
        if (e.target.tagName == "IMG") {
          ImagePreview({
            images: [e.target.src],
            showIndex: 9999,
            closeOnPopstate: true, //页面回退关闭预览
            closeable: true
          });
        }
      },
    }
}
</script>

<style lang="less" scoped>
.title {
    position: fixed;
    top: 0;
    z-index: 999;
}
.eva {
    background-color: #ffffff;
    margin-top: 1rem;
    padding-top: 30px;
    .e1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .p1 {
        color: #212121;
        font-weight: bold;
        font-family: "siyuan";
        font-size: 0.4rem;
        display: inline-block;
        margin-left: 0.5rem;
      }
      .p2 {
        color: #606060;
        display: inline-block;
        margin-right: 0.4rem;
        .icon {
          transform: translateY(1px);
        }
      }
    }
    .e2 {
      position: relative;
      width: 100vw;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .i1 {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        
      }
      div {
          display: flex;
          align-items: center;
          margin-left: 15px;
      }
      span {
          color: #606060;
          font-size: 0.4rem;
          // line-height: 0.8rem;
          padding-left: 10px;
      }
      .i2 {
        // position: absolute;
        margin-right: 0.3rem;
        right: 0.2rem;
        top: 0.9rem;
      }
    }
    .e3 {
      p {
        color: #2e2e2e;
        width: 90%;
        padding: 15px 0 0 0;
        margin-left: 0.5rem;
      }
    }
    .e4 {
      margin-left: 0.5rem;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      img {
        width: 2.5rem;
        height: 2.5rem;
        margin-top: 0.5rem;
        margin-left: 0.3rem;
      }
    }
  }
</style>