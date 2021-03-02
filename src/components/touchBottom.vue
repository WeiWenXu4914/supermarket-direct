<template>
    <div class="is-to-bottom-status">
        <div v-show="finished || loading">
            <div v-show="!finished && loading">
                <van-loading type="circular" size="0.4rem" color="#969799" class="loading-icon"/>
                <span class="loading-text">加载中...</span>
            </div>
            <template v-if="finished">
                <span class="loading-text">没有更多了</span>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: ['loading','finished']
}
</script>

<style lang="less">
.is-to-bottom-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 80px 0;
    width: 100vw;
    .loading-icon {
        display: inline-block;
        margin: 0 10px;
    }
    .loading-text {
        color: #969799;
        font-size: 14px;
    }
}
</style>