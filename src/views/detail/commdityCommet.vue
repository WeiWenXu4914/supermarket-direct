<template>
    <div>
        <title-view title="商品评价" :border="false" class="title"></title-view>
        <div class="eva">
            <!-- <div class="e1">
                <p class="p1">评价{{ dataList.length }}</p>
                <p class="p2" @click="toAllCommet()">查看全部 <van-icon class="icon" name="arrow" /></p>
            </div> -->
            <div v-for="(item,index) in dataList" :key="index">
                 <div class="e2">
                    <img :src="item.mem_head_portrait" alt class="i1" />
                    <p>{{ item.mem_name }}</p>
                    <van-rate 
                        v-model="rareValue" 
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
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import titleView from '../../components/public_views/titleView';
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
    margin-top: 0.5rem;
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
      .i1 {
        width: 1.1rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
      p {
        color: #606060;
        position: absolute;
        font-size: 0.5rem;
        left: 2rem;
        top: 0.8rem;
        display: inline-block;
      }
      .i2 {
        position: absolute;
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
        margin-top: 1rem;
        margin-left: 0.3rem;
      }
    }
  }
</style>