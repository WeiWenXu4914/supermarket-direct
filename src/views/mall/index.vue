<template>
  <div class='home-page'>
    <page-header></page-header>
    <div class="homepage">
      <van-search v-model="value" placeholder="服务 行业信息 装修" :disabled="true" @click="$router.push('/search')" />
    </div>
    <van-tabs :lazy-render="false"
      animated swipeable
      :ellipsis="false"
      @click="clickTabs"
      @change="clickTabs"
      v-model="activeIndex" >
      <van-tab 
        :key="item.id" 
        v-for="item in channelsList">

        <template #title>
          {{item.name}}
          <div class="slot-title">
            <span v-if="item.isHot" >
              <img src="./icons/hoticon.png" alt="">
            </span>
          </div>
        </template>

        <div ref="scroll-wrapper" class="scroll-wrapper"
         @scroll="remember($event)">
          <van-cell-group>
            <van-pull-refresh v-model="activeChannel.downLoading"
            :success-text="downLoadText"
             @refresh="onRefresh">
              <van-list v-model="activeChannel.upLoading" :finished="activeChannel.finished"
                finished-text="没有更多了"
                @load="onLoad">
                <van-cell
                :key="index"
                v-for="(items,index) in 1" >
                 <merchant-item></merchant-item>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </van-cell-group>
        </div>
       </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import MerchantItem from './components/MerchantItem'
export default {
  name: 'mall-index',
  components: {
    PageHeader,
    MerchantItem
  },
  data () {
    return {
      channelsList: [
        { id: 0, name: '服务', list: [], isHot: false, downLoading: false, upLoading: false, finished: false },
        { id: 1, name: '制造', list: [], isHot: false, downLoading: false, upLoading: false, finished: false },
        { id: 2, name: '咨询', list: [], isHot: true, downLoading: false, upLoading: false, finished: false },
        { id: 3, name: '农业', list: [], isHot: false, downLoading: false, upLoading: false, finished: false },
        { id: 4, name: '食品', list: [], isHot: false, downLoading: false, upLoading: false, finished: false },
        { id: 5, name: '畜牧', list: [], isHot: false, downLoading: false, upLoading: false, finished: false },
        { id: 6, name: '矿产', list: [], isHot: false, downLoading: false, upLoading: false, finished: false }
      ],
      downLoadText: '', // 刷新提示
      activeIndex: 2, // 当前分页索引
      value: ''
    }
  },
  watch: {},
  computed: {
    activeChannel () {
      return this.channelsList[this.activeIndex]
    },
    isFocus () {
      return this.activeIndex === 0
    }
  },
  // 组件开启缓存生效，激活组件(初始化和激活都执行)
  activated () {
    // 驼峰获取dom无效问题
    if (this.$refs['scroll-wrapper']) {
      const dom = this.$refs['scroll-wrapper'][this.activeIndex]
      dom.scrollTop = this.activeChannel.scrollTop
    }
  },
  created () {},
  methods: {
    clickTabs (name, title) {
      if (title === '关注') {

      }
    },
    updateChannel (i) {
      this.activeIndex = i
    },
    // 打开频道管理列表
    showChannel () {
      this.showEditChannel = true
    },
    // 删除文章
    removeArticle () {
      const articles = this.activeChannel.articles
      // item.art_id.toString()为数值类型，需要类型转换才能删除
      const index = articles.findIndex(item => item.art_id.toString() === this.articleId)
      articles.splice(index, 1)
    },
    // 切换频道
    changeChannel () {
      // （当前频道下无文章数据）主动加载一次数据
      if (!this.activeChannel.articles.length) {
        // 开启加载中效果
        this.activeChannel.upLoading = true
        // 清除之前没有数据的提示
        this.activeChannel.finished = false
        this.onLoad()
      } else {
        // 下一帧：延时一会执行，定位到以往阅读位置
        this.$nextTick(() => {
          const dom = this.$refs['scroll-wrapper'][this.activeIndex]
          dom.scrollTop = this.activeChannel.scrollTop
        })
      }
    },
    // 监听滚动事件
    remember (e) {
      this.activeChannel.scrollTop = e.target.scrollTop
    },
    // 触底加载数据
    async onLoad () {
      console.log('下拉触底')
      this.activeChannel.upLoading = false
    },
    // 下拉刷新
    async onRefresh () {
      setTimeout(() => {
        this.activeChannel.downLoading = false
      }, 1000)
      // 判断是否有数据
      // 加载有数据的文案
      this.downLoadText = '更新成功'
      // 防止看到 没有更多了 信息 （重新刷新列表，下一页应该是有数据的）
      this.activeChannel.finished = false
    }
  }
}
</script>

<style scoped lang='less'>
.home-page{
  height: 100% ;
  padding: 0 5px;
  margin-top:58px;
}
.homepage{
  padding: 10px 0 0 0;
  border-radius: 5px 5px 0 0 ;
  position: relative;
  z-index: 999;
  background: #fff;
  /deep/ .van-search__content{
    border-radius: 20px;
    border:1px solid #D04443;
    height: 39px;
    display: flex;
    align-items: center;
  }
}
.slot-title{
  display: flex;
  align-items: center;
  span{
    margin-left: 2px;
    padding-top: 3px;
    img{
      width: 17px;
      height: 17px;
    }
  }
}
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #202020;
  /deep/ .van-tab__text {
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  /deep/ .van-tabs__wrap{
     height: 40px;
     color: #202020;
  }
  /deep/ .van-tab__pane-wrapper{
    padding-bottom: 70px;
  }
   /deep/ .van-tab--complete{
    color: #202020;
  }
  /deep/  .van-tab--active{
    font-size: 16px;
    font-weight:500;
    color:#D04442;
  }
  /deep/ .van-tabs__line{
    display: none;
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
