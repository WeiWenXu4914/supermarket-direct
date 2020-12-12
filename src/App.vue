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
export default {
  created() {
    (function() {
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            handleFontSize();
        } else {
            if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
            } else if (document.attachEvent) {
            //IE浏览器，非W3C规范
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
            }
        }
        function handleFontSize() {
            // 设置网页字体为默认大小
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
            // 重写设置网页字体大小的事件
            WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
            });
        }
        })();
  }
}
</script>