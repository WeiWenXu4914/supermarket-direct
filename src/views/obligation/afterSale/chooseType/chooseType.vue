<template>
    <div class="choose-type">
        <title-view title="选择售后类型"></title-view>
        <div class="items"  v-for="(item,index) in items" :key="index" @click="toDetail(item.as_name)">
            <div class="left-text">
                <span>{{ item.as_name }}</span>
                <p>{{ item.as_remark }}</p>
            </div>
            <van-icon name="arrow" class="right-icon"/>
        </div>
    </div>
</template>

<script>
import titleView from '../../../../components/public_views/titleView';
import { AfterSaleType } from '../../actions/index';
import { Icon, Toast } from 'vant';

export default {
    components: {
        titleView
    },
    data() {
        return {
            items: [],
            orderInfo: {}
        }
    },
    beforeCreate() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            overlay: true,
            duration: 0
        });
    },
    created() {
        //获取售后选项
        AfterSaleType()
        .then((res) => {
            this.items = res.data;
            Toast.loading({
                duration: 1
            });
        }).catch((err) => {
            Toast.fail("获取信息失败，请重试")
        });

        this.orderInfo = this.$route.query.orderInfo;
    },
    methods: {
        toDetail(val) {

            if(val == '我要退款') {
                this.$router.push({
                    path: '/afterSale',
                    query: {
                        orderInfo: this.orderInfo,
                        type: '退款'
                    }
                })
            } else if(val === '我要退货退款') {
                this.$router.push({
                    path: '/afterSale',
                    query: {
                        orderInfo: this.orderInfo,
                        type: '退货退款'
                    }
                })
            } else {
                this.$router.push({
                    path: '/afterSale',
                    query: {
                        orderInfo: this.orderInfo,
                        type: '换货'
                    }
                })
            }

        }
    }
}
</script>

<style lang="less">
    .choose-type {
        .items {
            display: flex;
            width: 100%;
            height: 80px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E1E1E1;
            .left-text {
                margin-left: 4%;
                span {
                    display: block;
                    padding-bottom: 6px;
                    font-size: 17px;
                    font-family: Source Han Sans CN;
                    font-weight: 550;
                }
                p {
                    color: #8C8C8C;
                    font-size: 14px;
                }
            }
            .right-icon {
                margin-right: 4%;
                color: #B9B9B9;
                font-size: 18px;
            }
        }
    }
</style>