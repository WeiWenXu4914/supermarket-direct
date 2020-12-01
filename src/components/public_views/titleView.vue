<template>
    <!--头部导航视图组件-->
    <div class="title-component" :style="{ border: border === false ? 'none' : '' }">
        <van-icon name="arrow-left" class="icon-left" @click="back"/>
        <h3>{{ titleText }}</h3>
        <div class="right-slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant';
export default {
    props:['title','border'],
    data() {
        return {
            titleText: '标题'
        }
    },
    created() {
        if(this.title) {
            this.titleText = this.title;
        }
    },
    methods: {
        back() {
            this.$router.back();
        }
    }
}
</script>


<style lang="less">
    .title-component {
        position: relative;
        display: flex;
        height: 60px;
        width: 100%;
        align-items: center;
        background-color: #fff;
        justify-content: center;
        border-bottom: 1px solid #E1E1E1;
        .icon-left {
            position: absolute;
            left: 4%;
            font-size: 23px;
            color: #6D6D6D;
        }
        h3 {
            display: inline;
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #2F2F2F;
        }
        .right-slot {
            position: absolute;
            right: 4%;
        }
    }
</style>
