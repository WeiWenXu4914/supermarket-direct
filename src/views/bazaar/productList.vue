<template>
    <div class="goods-product-list" @scroll="scrollListener" ref="goods-product-list">
        <page-header ref="pageHeader" :isAddShow="false" />

        <pro-tabs 
         :navData="navData" 
         type="card"
         @activeTab="changeTab"
        >
            <div class="content-wrapper">
                <Goods-item
                v-for="item in dataList" 
                :key="item.proid" 
                class="goods-item"
                :data="item"
                />
            </div>
        </pro-tabs>

        <touch-bottom
         :loading="loading"
         :finished="finished"
        />

        <transition name="van-fade">
            <div class="go-top" v-show="btnShow" @click="goTop">
                <van-icon name="arrow-up" />
            </div>
        </transition>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import GoodsItem from './component/GoodsItem';
import { productList, AppProductClass } from "./actions/index";
import touchBottom from "@/components/touchBottom";
import proTabs from "./component/proTabs";
export default {
    components: {
        GoodsItem,
        PageHeader,
        touchBottom,
        proTabs,
    },
    data() {
        return {
            dataList: [],
            query: {
                offset: 1,
                length: 20,
            },
            loading: false,
            finished: false,
            getDataStatus: false,
            btnShow: false,
            scrollTop: "",
            navData: ['全部商品'],
        }
    },
    async created() {
        await this.getNavData();
        this.getData();
    },
    activated() {
        const dom = this.$refs["goods-product-list"];
        dom.scrollTop = this.scrollTop;
    },
    methods: {
        getData() {
            this.getDataStatus = true;
            productList(this.query)
            .then((res) => {
                this.dataList = this.dataList.concat(res.data);
                this.loading = false;
                if (res.data.length < this.query.length) {
                    this.finished = true;
                }
                this.getDataStatus = false;
            })
        },
        async getNavData() {
            const res = await AppProductClass();
            this.navData.push(...res.data);
        },
        changeTab(item) {
            this.query.classid = item.classid;
            this.query.offset = 1;
            this.dataList = [];
            this.loading = true;
            this.finished = false;
            this.getData();
        },
        scrollListener(e) {
            if (e.target.scrollTop <= 150) {
                this.btnShow = false;
            }
            if (e.target.scrollTop >= 400) {
                this.btnShow = true;
            }


            let contentHeight = e.target.scrollHeight;
            let clientHeight = e.target.clientHeight;
            let scorllTop = e.target.scrollTop;
            this.scrollTop = scorllTop;
            if (scorllTop + clientHeight == contentHeight && !this.getDataStatus && !this.finished) {
                this.loading = true;
                this.query.offset++;
                this.getData();
            }
            
        },
        goTop() {
            const dom = this.$refs["goods-product-list"];
            let i = 0;
            const timeTop = setInterval(() => {
            dom.scrollTop = this.easeInOutQuad(
                10 * i,
                dom.scrollTop,
                -dom.scrollTop,
                500
            );
            // dom.scrollTop -= 50
            if (dom.scrollTop <= 0) {
                clearInterval(timeTop);
            }
              i++;
            }, 30);
            
        },
        easeInOutQuad(t, b, c, d) {
            // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
            if ((t /= d / 2) < 1) {
                return (c / 2) * t * t + b;
            } else {
                // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
                return (-c / 2) * (--t * (t - 2) - 1) + b;
            }
        },
    }
}
</script>

<style lang="less">
.goods-product-list {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    background-color: #EEE;
    .content-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100vw;
        .goods-item {
            margin-top: 5px;
            box-shadow: 1px 1px 3px #ccc;
        }
        .goods-item:nth-of-type(odd) {
            margin-left: 5px;
        }
        .goods-item:nth-of-type(even) {
            margin-right: 5px;
        }
    }
    .go-top {
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: #fff;
        box-shadow: 0 0 2px #eee;
        right: 17px;
        bottom: 70px;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 23px;
        -moz-box-shadow: 0px 0px 3px #333333;
        -webkit-box-shadow: 0px 0px 3px #333333;
        box-shadow: 0px 0px 3px #333333;
    }
    
}
</style>