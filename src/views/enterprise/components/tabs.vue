<template>
    <div class="privite-tabs-com-enterprise">
        <div class="tabs-wrapper-card" v-if="type == 'card'" ref="tabs-wrapper-card" v-show="navData">
            <div 
             v-for="(item,index) in navData"
             :key="item"
             ref="tabs-wrapper-card-item"
             @click="changeTab(index,'card', item)"
             :class="[active == index ? 'active-style' : '', navData.length < 2 ? 'item-less' : '']"
             class="item-nav">
                {{ item.province || item}}
            </div>
        </div>
        <div class="tabs-wrapper-text" v-else ref="tabs-wrapper-text">
            <div 
             v-for="(item,index) in navData" 
             :key="item"
             ref="tabs-wrapper-text-item"
             @click="changeTab(index,'text', item)"
             :class="[active == index ? 'active-style' : '']"
             class="item-nav">
                {{ item.province || item}}
            </div>
        </div>
        
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['navData','type'],
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        changeTab(index, type, item) {
            this.active = index;
            this.$emit('activeIndex', this.active);
            this.caculateScrollPosition(index,type);
        },
        caculateScrollPosition(index, type) {
            const dom = this.$refs[`tabs-wrapper-${type}-item`][index];
            const domWrapper = this.$refs[`tabs-wrapper-${type}`];
            // domWrapper.scrollLeft = dom.offsetLeft - dom.offsetWidth;
            let marginLeft = dom.offsetLeft - dom.offsetWidth * 1.5;
            domWrapper.scrollLeft = marginLeft;
        }
    }
}
</script>

<style lang="less">
.privite-tabs-com-enterprise {
    width: 100%;
    height: calc(100vh - 44px);
    .tabs-wrapper-text {
        display: flex;
        width: 100%;
        height: 45px;
        align-items: center;
        overflow: scroll;
        border-bottom: 1px solid #E3E3E3;
        .item-nav {
            white-space: nowrap;
            font-size: 15px;
            padding: 0 20px;
        }
        .active-style {
            font-size: 18px;
            color: #07c160;
        }
    }
    .tabs-wrapper-card {
        width: 100%;
        overflow: scroll;
        display: flex;
        padding: 7px 0;
        // border-top: 1px solid #E3E3E3;
        border-bottom: 1px solid #E3E3E3;
        background-color: #F0EFF4;
        .item-nav {
            white-space: nowrap;
            font-size: 15px;
            padding: 3px 10px;
            margin: 0 10px;
            border-radius: 20px;
            color: #666666;
        }
        .active-style {
            background-color: #07c160;
            white-space: nowrap;
            color: #fff;
        }
    }
}
</style>