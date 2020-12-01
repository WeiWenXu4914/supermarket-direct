<template>
  <div>
    <div class="tabbar">
      <div class="bar-item" :class="{'bar-item-active':item.entfid === isActive }"  v-for="item in tabbarList" :key="item.entfid" @click="tabbarHandle(item)">
        {{item.class_name}}
      </div>
    </div>
    <div class="tabbarHide" @click="hideShow" v-show="!SkShow">
      <van-icon name="close" color="red" size="30px"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabbarList: Array,
    isActive: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      SkShow:true
    }
  },
  methods: {
    tabbarHandle (item) {
      this.$emit('tabbarHandle', item)
    },
    hideShow () {
      this.SkShow = true
      this.$emit('hideShow')
    },
    btnShow () {
      this.SkShow = !this.SkShow
    }
  }
}
</script>

<style lang='less' scoped>
.tabbar{
  height: 56.5px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 90%;
  float:left;
  white-space:nowrap;
  background: #F5F6F8;
  display: flex;
  align-items: center;
  .bar-item{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    height: 29.5px;
    color: #2A2A2A;
    font-size: 15px;
    font-weight: 500;
    border-radius: 18px;
    margin: 0 10px;
  }
  .bar-item-active{
    background: #D04443;
    color: #FFFFFF;
    font-family:Source Han Sans CN;
    color:rgba(255,255,255,1);
    opacity:1;
  }
}
.tabbarHide {
  float: right;
  width:10%;
  height:56.5px;
  line-height: 80px;
}
</style>
