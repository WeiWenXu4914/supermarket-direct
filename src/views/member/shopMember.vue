<template>
  <div class="container">
    <page-title>
      <div slot="search">
        <van-search v-model="value" input-align="center" placeholder="在店铺内搜索" />
      </div>
    </page-title>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
export default {
  name: 'shop-member',
  components: {
    PageTitle
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  created () {},
  methods: {}
}
</script>

<style scoped lang='less'>
.container {
  padding-top: 70px;
  .van-search__content {
    background-color: #f1f1f1;
    .van-cell /deep/.van-icon::before {
    font-size: 20px;
    position: absolute;
    margin-left: 85px;
}
  }
}
</style>
