<template>
  <div class="rule">
    <div class="top">
      <img src="../../components/img1/返回.png" alt  @click="back()"/>
      <p class="p1">《商家入驻规则协议》</p>
    </div>
    <div class="content">
      <p>城事乐家，助力实体企业线上发展。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "rule",
  data() {
    return {
      
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
.rule {
  .top {
    width: 90%;
    display: flex;
    margin: 0.5rem 0rem 0.2rem 0.3rem;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 0.4rem;

    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-top: 0.15rem;
    }
    .p1 {
      margin-left: 0.3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 600;
      font-family: Source Han Sans CN;
    }
  }
  .content{
      width: 92%;
      margin: 0.5rem 0rem 0rem 0.3rem;
      p{
          color: #525252;
          text-indent: 0.65rem;
      }
  }
}
</style>