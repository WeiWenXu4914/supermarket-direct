<template>
  <div class="all-search">
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
    <van-tabs v-model="active" @click="onSearch" @change="onSearch" type="card">
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
      searchHistory: []
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
    }
  },
};
</script>

<style lang="less">
.all-search {
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
    }
}
</style>