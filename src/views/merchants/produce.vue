<template>
  <div id="fans-root">
    <div class="custom-html" v-if="proList.code == 100">
      <Cardr
        v-for="(item,index) in proList.data"
        :key="index"
        :commodities="item"
        class="card"
        @proDetail="proDetail(item)"/>
    </div>
    <div v-else>
      <van-empty description="数据为空" />
    </div>
  </div>
</template>

<script>
import Cardr from './components/card.vue'
import { entProduct } from './actions/index.js'
export default {
  name: 'produce',
  components: {
    Cardr
  },
  beforeCreate() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 0,
    });
  },
  data () {
    return {
      proList:{},
      shows:0
    }
  },
  created () {
    this.getEntProduct();
  },
  methods: {
    getEntProduct(searchVal=''){

      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
      if(searchVal != ''){
        data.val = searchVal;
      }

      entProduct(data).then(res => {
        this.proList = res
        setTimeout(()=> {
          this.$toast.clear();
        }, 200);
      })
    },
    productSearch(res) {
      this.getEntProduct(res);
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
  }
}
</script>

<style lang="less" scoped>
#fans-root {
  overflow: auto;
  .costom-header {
    /deep/ .title-search {
      width: 641px;
    }
    /deep/ .title-right {
      display: none;
    }
    background: #fff;
    overflow: hidden;
    z-index: 99999;
  }
  .head-card {
    background: #fff;
  }
  .custom-html {
    overflow-x: hidden;
    overflow-y: auto;
    height:100%;
    background: rgba(245, 246, 248, 1);
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    padding: 0 15px;
    .card {
      width: 168px;
      height: 242px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;
      border-radius: 3px;
      // margin: 0px 15px 15px 15px;
      margin-bottom: 15px;
    }
  }
}
</style>
