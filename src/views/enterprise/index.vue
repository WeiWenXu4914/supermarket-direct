<template>
    <div class="enterprise-list" @scroll="scrollListener" ref="goods-product-list">
        <page-header :isAddShow="false"></page-header>

        <div class="content">
            <van-tabs 
             type="line"
             v-model="active"
             title-active-color="#07c160"
             @change="changeTab"
            >
                <van-tab :title="item.province" v-for="(item,index) in category" :key="index">
                    <van-tabs 
                    type="card" 
                    v-model="cityActive" 
                    @change="changeTab"
                    background="#fff"
                    >
                        <van-tab :title="city" v-for="(city,index) in item.city" :key="index">
                            <enterprise
                             v-for="data in dataList"
                             :key="data.entid"
                             :data="data"
                            />

                            <touch-bottom
                             class="touch-bottom"
                             :loading="loading"
                             :finished="finished"
                            />
                        </van-tab>
                    </van-tabs>
                </van-tab>
            </van-tabs>
        </div>

        

        <transition name="van-fade">
            <div class="go-top" v-show="btnShow" @click="goTop">
                <van-icon name="arrow-up" />
            </div>
        </transition>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { enterpriseDisClass, enterpriseClass } from "./api/request";
import enterprise from "./components/enterprise";
import touchBottom from "@/components/touchBottom";
export default {
    components: {
        PageHeader,
        enterprise,
        touchBottom
    },
    
    data() {
        return {
            active: 0,
            cityActive: 0,
            category: [],
            query: {
                num: 0,
                size: 10,
                ent_province: "",
                ent_city: ""
            },
            dataList: [],
            scrollTop: "",
            loading: false,
            finished: false,
            btnShow: false,
            getDataStatus: false,
        }
    },
    async created() {
        await this.getClassData();
        this.getData();
    },
    activated() {
        const dom = this.$refs["goods-product-list"];
        dom.scrollTop = this.scrollTop;
    },
    methods: {
        async getClassData() {
            const res = await enterpriseDisClass()
            this.category = res.data;
        },
        async getData() {
            this.getDataStatus = true;
            this.query.ent_province = this.category[this.active].province;
            this.query.ent_city = this.category[this.active].city[this.cityActive];
            const res = await enterpriseClass(this.query)
            this.dataList = this.dataList.concat(res.data);
            this.loading = false;
            if (res.data.length < this.query.size) {
                this.finished = true;
            }
            this.getDataStatus = false;
        },
        changeTab() {
            this.loading = true;
            this.finished = false;
            this.dataList = [];
            this.getData();
        },
        scrollListener(e) {
            let contentHeight = e.target.scrollHeight;
            let clientHeight = e.target.clientHeight;
            let scorllTop = e.target.scrollTop;
            this.scrollTop = scorllTop;
            if (scorllTop + clientHeight == contentHeight && !this.getDataStatus && !this.finished) {
                this.loading = true;
                this.query.num++;
                this.getData();
            }
            if (e.target.scrollTop <= 150) {
                this.btnShow = false;
            }
            if (e.target.scrollTop >= 400) {
                this.btnShow = true;
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
.enterprise-list {
    overflow: scroll;
    .content {
        margin-top: 44px;
        height: calc(100vh - 44px);
        .van-tab--active {
            font-size: 17px;
        }
        .van-tabs__line {
            display: none;
        }
        .van-tabs__nav--card {
            margin: 0;
            border-left: none;
            border-right: 0;
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
    .touch-bottom {
        padding-bottom: 200px;
    }
}
</style>