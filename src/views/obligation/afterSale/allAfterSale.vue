<template>
    <div class="all-after-sale">
        <title-view title="退款/售后"></title-view>
        <div v-if="dataList.length">
            <div class="content" v-for="(item,index) in dataList" :key="index">
                <div class="list">
                    <div class="icon">
                        <img :src="item.ent_logo" alt />
                    </div>
                    <p class="p1">{{ item.ent_name }}<van-icon class="arrow-icon" name="arrow" /></p>
                    <p class="p2">{{ item.state_name }}</p>
                </div>
                <div class="wrapper">
                    <div class="goods">
                        <img
                            :src="item.pro_thumbnail"
                            alt
                        />
                        <div class="center">
                            <p class="p1">{{ item.pro_name }}</p>
                            <!-- <p class="p2" v-if="item.dw_name == '自提' ? false : true">包邮</p> -->
                            <p class="p2" v-if="item.state === 4 ? false : true">{{ item.type_name }}</p>
                            <p class="p2" v-else>已取消售后申请</p>
                        </div>
                        <div class="right">
                            <p class="p1">￥</p>
                            <p class="p2">{{ item.pro_price }}</p>
                            <p class="p3">x{{ item.product_count }}</p>
                        </div>
                    </div>
                    <van-button 
                    plain 
                    hairline 
                    type="primary" 
                    size="small" 
                    color="#D04443"
                    @click="toDetail(item)" 
                    class="button"
                    v-if="item.state === 4 ? false : true"
                    >
                        查看详情
                    </van-button>
                </div>
                
            </div>
            
        </div>
        <van-empty description="无售后信息" v-else/>
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import { myAfterSalesService } from '../actions/index';
import { Empty,Toast,Button } from 'vant';
export default {
    components: {
        titleView
    },
    data() {
        return {
            dataList: []
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
        myAfterSalesService()
        .then((res) => {
            if(res) {
                this.dataList = res.data;     
                Toast.loading({
                    duration: 1
                });
            }
        })
        .catch((err) => {
            Toast.fail("获取信息失败，请重试");
        })
    },
    methods: {
        toDetail(val) {
            if(val.type == 2) {//换货
                this.$router.push({
                    path: '/exchangeReject',
                    query: {
                        ora_id: val.ora_id,
                        state: val.state, //申请状态：0->待处理；1->退换中；进入售后服务详情接口 2->已完成；进入成功页面 3->已拒绝 进入拒绝页面
                        type: val.type // type 0退款  1 退款退货  2.换货
                    }
                });
            }else if(val.type == 1) {//退货退款
                this.$router.push({
                    path: '/afterSaleRefund',
                    query: {
                        ora_id: val.ora_id,
                        state: val.state, 
                        type: val.type    
                    }
                })
            } else {//退款

                if(val.state == 0) {// 0 -> 待处理  此页面为设计图单独页面
                    this.$router.push({
                        path: '/afterSaleRefundOnly',
                        query: {
                            ora_id: val.ora_id,
                            type: val.type    // type 0退款 1 退款退货  2.换货
                        }
                    });
                }else {//其他状态处理

                    this.$router.push({
                        path: '/afterSaleRefund',
                        query: {
                            ora_id: val.ora_id,
                            state: val.state, 
                            type: val.type    
                        }
                    });
                }
                
            }
        }
    }
}
</script>

<style lang="less">
.all-after-sale {
    .content {
        .list {
            display: flex;
            width: 94%;
            margin: 0 auto ;
            padding-top: 0.5rem;
            .icon {
                display: flex;
                    border-radius: 0.1rem;
                    align-items: center;
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 0.1rem;
                        }
                }
                .p1 {
                    position: relative;
                    color: #212121;
                    font-size: 13px;
                    padding-left: 7px;
                    line-height: 40px;
                    font-weight: bold;
                    /deep/.arrow-icon {
                        position: absolute;
                        color: #6D6D6D;
                        top: 50%;
                        right: -17px;
                        transform: translateY(-59%);
                    }
                }
                .p2 {
                    flex: 1;
                    text-align: right;
                    color: rgba(208, 68, 67, 1);
                    font-size: 14px;
                    line-height: 40px;
                    // margin: 0.15rem 0rem 0rem 3.5rem;
                }
            }
            .wrapper {
                border-bottom: 1px solid #eeecec;
                .goods {
                    display: flex;
                    width: 94%;
                    margin: 10px auto 20px;
                    img {
                        width: 78px;
                        height: 78px;
                        border-radius: 1px;
                    }
                }
                .center {
                    .p1 {
                        font-size: 0.44rem;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                        margin: 7px 0 0 7px;
                    }
                    .p2 {
                        display: inline-block;
                        // width: 1rem;
                        padding: 0 0.1rem;
                        color: rgba(208, 68, 67, 1);
                        border: 1px solid rgba(208, 68, 67, 1);
                        text-align: center;
                        border-radius: 0.1rem;
                        margin: 0.6rem 0rem 0rem 0.2rem;
                    }
                }
                .right {
                    flex: 1;
                    text-align: right;
                    .p1 {
                        margin-top: 5px;
                        display: inline-block;
                    }
                    .p2 {
                        margin-top: 5px;
                        display: inline-block;
                        font-size: 17px;
                        color: #242424;
                    }
                    .p3 {
                        color: #878787;
                        font-size: 15px;
                    }
                }
                .button {
                    margin-left: 80%;
                    margin-bottom: 10px;
                }
            }
        }
}
</style>