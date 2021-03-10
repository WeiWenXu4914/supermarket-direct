<template>
  <div class="all-search" @scroll="scrollListener" ref="goods-product-list">
    <div class="search-header">
      <van-icon 
       name="arrow-left" 
       class="arrow-left-icon"
       size=".5rem"
       @click="onCancel"
      />
      <van-search
        class="search"
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
      <button class="search-button" @click="onSearch">搜索</button>
    </div>
      
    <!-- <div class="tags" v-show="searchHistory.length !== 0">
        <div class="content">
            <span v-for="(item,index) in searchHistory" :key="index" class="item" @click.stop="toSearch(item)">
                {{ item }} <van-icon class="close-icon" name="cross" size="0.2rem" @click.stop="deleteHistory(index)"/>
            </span>
        </div>
    </div> -->
    <van-tabs v-model="active" @click="onSearch" @change="onSearch" type="card" color="#f50">
      <van-tab title="商品">
        <GoodsResult :searchValue="resultValue" :active2="active" />
      </van-tab>
      <van-tab title="文章">
        <ArticleResult :searchValue="resultValue" :active1="active" />
      </van-tab>
      <van-tab title="商企">
        <StoreResult :searchValue="resultValue" :active3="active" />
      </van-tab>

    </van-tabs>

    <transition name="van-fade">
        <div class="go-top" v-show="btnShow" @click="goTop">
            <van-icon name="arrow-up" />
        </div>
    </transition>
  </div>
</template>

<script>
import { Toast, Icon } from "vant";
import ArticleResult from "./components/ArticleResult";
import GoodsResult from "./components/GoodsResult";
import StoreResult from "./components/StoreResult";
export default {
  components: {
    ArticleResult,
    GoodsResult,
    StoreResult,
  },
  data() {
    return {
      value: "",
      resultValue: "",
      active: 0,
      searchHistory: [],
      btnShow: false,
      scrollTop: "",
    };
  },
  created() {
    this.getSearchHistory();
  },
  activated() {
    if (this.$route.params.value) {
      this.value = this.$route.params.value;
    }
    this.onSearch();

    
    const dom = this.$refs["goods-product-list"];
    dom.scrollTop = this.scrollTop;
  },
  methods: {
    onSearch() {
      this.resultValue = this.value;
      this.savaLocal(this.resultValue);
      this.getSearchHistory();
    },
    onCancel() {
      this.$router.go(-1);
      this.value = "";
    },
    //将搜索结果存到本地
    savaLocal(value) {
      let searchHistory = []
      if (window.localStorage.searchHistory === undefined && this.resultValue) {
        let searchHistoryResNull = []

        searchHistory[0] = value;
        searchHistoryResNull = JSON.stringify(searchHistory);
        window.localStorage.searchHistory = searchHistoryResNull;
        
      } else if (this.searchHistory.indexOf(this.resultValue) !== -1) {
        const index = this.searchHistory.indexOf(this.resultValue);
        const value = this.searchHistory[index]
        this.searchHistory.splice(index,1);
        this.searchHistory.push(value);
        window.localStorage.searchHistory = JSON.stringify(this.searchHistory);
        this.getSearchHistory();
      } else if (this.resultValue) {

        let localHistory = JSON.parse(window.localStorage.searchHistory);
        let finalyValue = []

        localHistory.push(value);
        finalyValue = new Set(localHistory);
        finalyValue = Array.from(finalyValue);
        window.localStorage.searchHistory = JSON.stringify(finalyValue);

      }
    },
    getSearchHistory() {
      if(window.localStorage.searchHistory !== undefined) {
        this.searchHistory = JSON.parse(window.localStorage.searchHistory).reverse();
      }
 
    },
    //删除搜索历史
    deleteHistory(index) {
      this.searchHistory.splice(index,1);

      if(this.searchHistory.length !== 0) {
        window.localStorage.searchHistory = JSON.stringify(this.searchHistory.reverse());
      } else {
        window.localStorage.removeItem('searchHistory');
      }

    },
    //搜索标签项
    toSearch(val) {
      this.value = val;
      this.onSearch();
    },
    scrollListener(e) {

        if (e.target.scrollTop <= 150) {
            this.btnShow = false;
        }
        if (e.target.scrollTop >= 400) {
            this.btnShow = true;
        }

        this.scrollTop = e.target.scrollTop;     
    },
    goTop() {
            const dom = this.$refs["goods-product-list"];
            let i = 0;
            const timeTop = setInterval(() => {
            dom.scrollTop = this.easeInOutQuad(
                10 * i,
                dom.scrollTop,
                -dom.scrollTop,
                500
            );
            // dom.scrollTop -= 50
            if (dom.scrollTop <= 0) {
                clearInterval(timeTop);
            }
              i++;
            }, 30);
            
      },
      easeInOutQuad(t, b, c, d) {
            // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
            if ((t /= d / 2) < 1) {
                return (c / 2) * t * t + b;
            } else {
                // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
                return (-c / 2) * (--t * (t - 2) - 1) + b;
            }
      },
  },
};
</script>

<style lang="less">
.all-search {
  overflow: scroll;
  height: 100vh;
  .tags {
    position: relative;
    width: 100%;
    height: 44px;
    // overflow: hidden;
    overflow-x:scroll;
    .content {
      display: flex;
      position: absolute;
      white-space: nowrap;
      // border-bottom: 1px solid #F7F7F7;
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 7px 5px 10px;
        margin: 8px 10px;
        border-radius: 15px;
        background-color: #F7F7F7;
        font-size: 12px;
        .close-icon {
          color: #8c8c8c;
          // padding: 0 2px 0 6px;
          margin: 0 2px 0 6px;
        }
      }
    }
  }
  .van-tabs__content {
      margin-top: 15px;
  }
  .van-tabs__line {
    width: 0.4rem !important;
    background-color: #0d80E4 !important;
    border-radius: 5px !important;
  }
  .van-tab--active {
    font-size: 15px;
    font-weight: bolder;
    color: #131313;
  }
  .search-header {
        display: flex;
        align-items: center;
        width: 100vw;
        .arrow-left-icon {
            padding: 0 0px 0 10px;
        }
        .search {
            flex-grow: 1;
            // width: 70%;
        }
        .search-button {
            margin-right: 10px;
            width: 60px;
            height: 27px;
            border-radius: 18px;
            color: #fff;
            border: none;
            background: linear-gradient(to top right, #e93c3b, #FF9002);
        }
        .search-button:active {
          background: #FF9002;
        }
    }
    .go-top {
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: #fff;
        box-shadow: 0 0 2px #eee;
        right: 17px;
        bottom: 70px;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 23px;
        -moz-box-shadow: 0px 0px 3px #333333;
        -webkit-box-shadow: 0px 0px 3px #333333;
        box-shadow: 0px 0px 3px #333333;
    }
}
</style>