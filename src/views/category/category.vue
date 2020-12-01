<template>
  <div class="category">
    <div class="top">
      <p class="p1">选择发布类别</p>
    </div>
    <div class="content">
        <div class="list">
            <p>保姆/月嫂</p>
        </div>
        <div class="list">
            <p>家电维修</p>
        </div>
        <div class="list">
            <p>保洁清洗</p>
        </div>
        <div class="list">
            <p>开锁/换锁/修锁</p>
        </div>
        <div class="list">
            <p>租房/卖房</p>
        </div>
        <div class="list">
            <p>新车/二手车</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.category {
  .top {
      margin-top: 0.5rem;
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .content{
      .list{
          border-bottom: 1px solid #D8D8D8;
          margin:0.5rem 0rem 0rem 0.3rem;
          padding-bottom: 0.5rem;
      p{
          font-size: 0.45rem;
          color:#2F2F2F;
      }
      }
  }
}
</style>