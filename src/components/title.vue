<!--<template>-->
<!--  <div class="title">-->
<!--    <div class="top">-->
<!--      <img src="./img1/返回.png" class="i1"  @click="back()"/>-->
<!--      <p class="p1">我的发布</p>-->
<!--      <img src="./img1/搜索.png" alt class="i2" @click="sousuo" />-->
<!--    </div>-->
<!--    <div class="serach1">-->
<!--      <form action="/" v-show="show1">-->
<!--        <van-search-->
<!--          v-model="value"-->
<!--          show-action-->
<!--          placeholder="请输入搜索关键词"-->
<!--          @search="onSearch"-->
<!--          @cancel="onCancel"-->
<!--        />-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { Toast } from 'vant';-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            show1 : false,-->
<!--          value:'',-->
<!--        }-->
<!--    },-->
<!--    methods:{-->
<!--      sousuo(){-->
<!--        this.show1 = !this.show1;-->
<!--      },-->
<!--      onSearch() {-->
<!--          if(this.value===''){   //如果搜索栏为空就执行getList方法获取最初始的列表 -->
<!--            Toast('请输入搜索内容');-->
<!--          }else{-->
<!--            //搜索-->
<!--            let list=this.List.filter(item=>item.title.toString().indexOf(this.value)>=0);-->
<!--            this.List=list;-->
<!--          }-->
<!--      },-->
<!--      onCancel() {-->
<!--        Toast('取消');-->
<!--      },-->
<!--        back(){-->
<!--            this.$router.go(-1)-->
<!--        }-->
<!--    }-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--.title {-->
<!--      .top {-->
<!--    display: flex;-->
<!--    margin-top: 0.5rem;-->
<!--    .i1 {-->
<!--      width: 0.5rem;-->
<!--      height: 0.5rem;-->
<!--      margin: 0.1rem 0rem 0rem 0.3rem;-->
<!--    }-->
<!--    .i2 {-->
<!--      width: 0.7rem;-->
<!--      height: 0.7rem;-->
<!--      margin: 0.05rem 0rem 0rem 3.1rem;-->
<!--    }-->
<!--    .p1 {-->
<!--      margin-left: 3rem;-->
<!--      color: #2f2f2f;-->
<!--      font-size: 0.5rem;-->
<!--      font-weight: 500;-->
<!--      font-family: Source Han Sans CN;-->
<!--    }-->
<!--  }-->
<!--  .title {-->
<!--    display: flex;-->
<!--    border-bottom: 1px solid rgb(242, 242, 242);-->
<!--    color: #2f2f2f;-->
<!--    margin-top: 0.5rem;-->
<!--    padding-bottom: 0.2rem;-->
<!--    p {-->
<!--      font-size: 0.5rem;-->
<!--      margin-left: 0.4rem;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
