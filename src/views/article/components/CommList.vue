<template>
  <div class="comm-list">
    <div class="title">评论 {{ commList.length }}条</div>
    <div class="list">
      <template v-if="commList.length">
        <comm-item v-for="(item,index) in commList" :key="index" :commItem="item" @replay="replay"></comm-item>
      </template>
      <template v-else>
        <div class="no-comm">暂无评论~</div>
      </template>
    </div>
  </div>
  <!-- <van-collapse v-model="activeNames">
    <van-collapse-item title="评论" value="更多" name="2" :border="false">
      <div class="list">
        <template v-if="commList.length">
          <comm-item v-for="(item,index) in commList" :key="index" :commItem="item" @replay="replay"></comm-item>
        </template>
        <template v-else>
          <div class="no-comm">暂无评论~</div>
        </template>
      </div>
    </van-collapse-item>
  </van-collapse> -->
  <!-- </div> -->
</template>

<script>
import CommItem from './CommItem'
import { Collapse, CollapseItem } from 'vant';
export default {
  name: 'comm-list',
  components: {
    CommItem
  },
  props: {
    commList: Array
  },
  data () {
    return {
      activeNames: ['1'],
    }
  },
  created () {
  },
  methods: {
    replay (query) {
      this.$emit('replay',query)
    }
  }
}
</script>

<style scoped lang='less'>
.comm-list{
 .title{
    color: #3A3A3A;
    font-size: 18px;
    font-weight: 500;
    margin: 15px 0;
 }
}
.no-comm{
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #646464;
}
</style>
