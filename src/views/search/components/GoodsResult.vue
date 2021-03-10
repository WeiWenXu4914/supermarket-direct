<template>
    <div class="goods-search-item">
  
    <div class="search-content-wrapper" v-if="resultList.length != 0">
        <Goods-item
        v-for="item in resultList" 
        :key="item.proid" 
        class="goods-item"
        :data="item"
        />
    </div>        
    <van-empty image="search" description="无相关内容，请切换搜索关键词试试" v-if="resultList.length == 0 && !loading"/>

    <van-loading color="#1989fa" vertical style="position:absolute;top:5rem;left:50%;transform:translateX(-50%);" v-show="loading"/>
  </div>
</template>

<script>
import { searchInput } from "../actions";
import GoodsItem from "@/views/bazaar/component/GoodsItem"
export default {
  props: ["searchValue", "active2"],
  data() {
    return {
      resultList: [],
      loading: false,
    };
  },
  components: {
    GoodsItem,
  },
  watch: {
    searchValue() {
        if(this.active2 == 0) {
            this.getData();
        }
    },
    active2() {
        if(this.active2 == 0) {
            this.getData();
        }
    }
  },
  methods: {
    getData() {
      if (this.searchValue != "") {
        this.loading = true;
        searchInput(this.searchValue)
          .then((res) => {
            if (res.code == 100) {
              this.resultList = res.data;
            } else {
              // Toast(res.msg);
              this.resultList = res.data;
            }
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    proDetail(res){
      var obj = {
        proid: res.proid
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path:'/commdityPay',
        query:{
          res:res
        }
      });
    }
  },
};
</script>

<style lang="less">
.goods-search-item {

  .search-content-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100vw;
    // background-color: #ccc;
    
    .goods-item {
        margin-top: 5px;
        box-shadow: 1px 1px 3px #ccc;
    }
    .goods-item:nth-of-type(odd) {
        margin-left: 5px;
    }
    .goods-item:nth-of-type(even) {
        margin-right: 5px;
    }

  }
  
}
</style>