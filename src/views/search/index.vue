<template>
  <div class="container" @click="change">
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="输入搜索内容"
        @search="onSearch"
        @cancel="onCancel"
        width="100"
      />
<!--      <van-icon name="arrow-left" @click="onCancel" style="margin-left: 10px;"/>-->
<!--      <van-search-->
<!--        v-model="value"-->
<!--        show-action-->
<!--        placeholder="输入搜索内容"-->
<!--        @search="onSearch"-->
<!--        width="100"-->
<!--      >-->
<!--        <template #action>-->
<!--          <div @click="onSearch">搜索</div>-->
<!--        </template>-->
<!--      </van-search>-->
    </div>
    <div class="content">
      <div class="item">
        <div class="up" @click="onSearch(value)">
          <van-icon name="photo-o" size="35" />
        </div>
        <div class="down">图文搜索</div>
      </div>
      <div class="item">
        <div class="up" @click="urlUpdate(1)">
          <van-icon name="shop-o" size="35" />
        </div>
        <div class="down">商企搜索</div>
      </div>
      <div class="item">
        <div class="up" @click="urlUpdate(2)">
          <van-icon name="goods-collect-o" size="35" />
        </div>
        <div class="down">商品搜索</div>
      </div>
    </div>
    <div class="test">

    </div>
    <div class="history">
      <div class="title">
        <div class="left">历史记录</div>
        <div class="right" @click="removeAll">
          <van-icon name="delete" size="18" />
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(val, inx) in searchHistory" :key="inx"
          @touchstart.stop="start(inx)" @touchmove.stop="move" @touchend.stop="end(inx)"
        >
          <van-icon v-if="val.iconShow" class="icons" name="cross" @click.prevent="remove(inx)" />
          {{val.val}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchArticle,searchInput,SearchResults,dobsearch,Graphic } from './actions'
import {myCoupon} from "@/views/member/actions";
export default {
  name: 'search-index',
  data () {
    return {
      value: '',
      searchHistory: JSON.parse(localStorage.getItem('search')) || [],
      longClick: 0,
      timeOutEvent: 0
    }
  },
  watch: {},
  created() {
  },
  methods: {
    // 搜索
    async onSearch (val) {
      if (!this.value.trim()) return this.$toast('请输入搜索内容')
      this.searchHistory.push({type:0,temp:Date.now(), val: this.value, iconShow: false})
      localStorage.setItem('search',JSON.stringify(this.searchHistory))
      this.$router.push({
        name: 'search-result',
        query: {val: this.value,res:0}
      })
    },
    // 企业搜索
    async searchArticle (val,res) {
      if (!val.trim()) return this.$toast('请输入搜索内容')
      this.searchHistory.push({type:1,temp:Date.now(), val: val, iconShow: false})
      localStorage.setItem('search',JSON.stringify(this.searchHistory))
      this.$router.push({
        name: 'search-result',
        query: {val: val,res:res}
      })
    },
    // 商品搜索
    async searchInput (val,res) {
      if (!val.trim()) return this.$toast('请输入搜索内容')
      this.searchHistory.push({type:2,temp:Date.now(), val: val, iconShow: false})
      localStorage.setItem('search',JSON.stringify(this.searchHistory))
      this.$router.push({
        name: 'search-result',
        query: {val: val,res:res}
      })
    },
    urlUpdate (res) {
      if (res == 1) {
        this.searchArticle(this.value,res);
      }
      if (res == 2) {
        this.searchInput(this.value,res);
      }
    },
    onCancel () {
      this.value = ''
      this.$router.go(-1)
    },
    start(inx) {
      this.longClick = 0;
      this.timeOutEvent = setTimeout(() => {
        this.longClick = 1;
        this.searchHistory[inx].iconShow = true
      }, 500);
    },
    move(e) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      e.preventDefault();
    },
    end(inx) {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0 && this.longClick == 0) {
        let val = this.searchHistory[inx].val
        let res = this.searchHistory[inx].type
        if (this.searchHistory[inx].iconShow) return
        this.$router.push({
          name: 'search-result',
          query: {
            val: val,
            res: res
          }
        })
      }
      return false;
    },
    remove (inx) {
      this.searchHistory.splice(inx,1)
      localStorage.setItem('search',JSON.stringify(this.searchHistory))
    },
    removeAll () {
      this.$dialog.confirm({
        title: '确认清除',
        message: '是否清除历史搜索记录?',
      }).then(() => {
        localStorage.removeItem('search')
        this.searchHistory = []
      }).catch(() => {})
    },
    change () {
      this.searchHistory.map(item => item.iconShow = false)
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  height: 100%;
}
.search{
  display: flex;
  align-items: center;
}
.van-search__content--square {
  width: 300px ;
  height: 45px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: #f1f1f1;
  opacity: 1;
  border-radius: 3px;
  .van-cell /deep/ .van-icon-search::before {
    font-size: 20px;
  }
  .van-field {
    height: 45px;
    line-height: 35px;
  }

}
.van-search__action {
    width: 45px;
    text-align: center;
  }
.content {
  // padding: 38px 112px 0 109px;
  width: 100%;
  margin-top:5px;
  display: flex;
  justify-content: center;
  .item {
    margin-left: 10px;
    text-align: center;
    .up {
      width: 45px;
      height: 45px;
      margin-left: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .down {
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 22px;
      color: rgba(85, 85, 85, 1);
      opacity: 1;
    }
  }
}
.history {
  width: 100%;
  box-sizing: border-box;
  margin-top: 50px;
  padding: 0 13px;
  .title {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 22px;
      color: rgba(132, 132, 132, 1);
      opacity: 1;
    }
    .right {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;
    .item {
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 0 7px;
      border-radius: 3px;
      font-size: 13px;
      font-weight: 400;
      line-height: 26px;
      color: rgba(48, 48, 48, 1);
      opacity: 1;
      background: #eee;
      .icons{
        position:absolute;
        right: -4px;
        top: -5px;
        z-index: 999;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
      }
    }
  }
}
</style>
