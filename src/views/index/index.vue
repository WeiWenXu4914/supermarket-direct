<template>
  <div class="index">
    <page-header></page-header>
    <div class="content">
      <div class="head">
          <img src="./img/search@2x.png" alt="">
          <input type="text" >
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  name: "index",
  components: {
    PageHeader
  }
};
</script>


<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.index {
  .content {
    position: relative;
    z-index: 999;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 0.33rem;
    margin: 2.25rem 0rem 0rem 0rem;
    img{
        width: 1.4rem;
    }
  }
}

</style>