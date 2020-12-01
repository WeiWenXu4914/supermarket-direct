<template>
  <div class="container">
    <page-title :title="title" :titleSize="19" titleFontWeight="500"></page-title>
    <van-search
      v-model="value"
      show-action
      placeholder="商家名"
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
export default {
  name: 'group',
  components: {
    PageTitle
  },
  data () {
    return {
      title: '我的团购',
      value: ''
    }
  },
  computed: {},
  created () {},
  methods: {
    onSearch (val) {},
    onCancel () {
      this.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 60px 12px 0;
  .van-search {
    padding: 0;
    margin: 0;
    width: 351px;
    height: 45px;
    background: rgba(241, 241, 241, 1);
    opacity: 1;
    border-radius: 3px;
    .van-search__content {
      padding: 0;
    }
    .van-cell {
      background: rgba(241, 241, 241, 1);
      padding-left: 11px;
      .van-cell /deep/ .van-icon::before {
        font-size: 20px;
      }
    }
    .van-search__action {
      height: 13px;
      line-height: 13px;
      border-left: 1px solid #707070;
    }
  }

}
</style>
