<template>
  <div id="app">
    <transition name="van-fade">
      <keep-alive>
        <router-view v-if="$route.meta.iskeepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="van-fade">
      <router-view v-if="!$route.meta.iskeepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
// html,
// body,
// #app,
// .wx-pages {
//   padding: 0;
//   margin: 0;
//   height: 100%;
//   overflow: hidden;
//   -webkit-overflow-scrolling: touch;
// }
</style>

<script>
// document.body.addEventListener(
//   "touchmove",
//   function (e) {
//     e.preventDefault();
//   },
//   {
//     passive: false,
//   }
// );
</script>