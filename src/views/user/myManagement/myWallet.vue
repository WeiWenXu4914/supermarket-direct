<template>
    <div class="my-wallet">
        <title-view :border="false" title="钱包"></title-view>
        <div class="title-message">
            <h6>当前余额</h6>
            <div class="money-function">
                <div class="money">
                    <span>￥</span>
                    <span  v-if="dataList.wd_balance">{{ changeMoney(dataList.wd_balance) }}</span>
                    <span v-else>0.00</span>
                </div>
                <button class="recharge">充值</button>
            </div>
        </div>
        <h5>账单明细</h5>
        <!--充值-->
        <div class="history" v-for="(item,index) in dataList.recharge" :key="index">
            <div class="item-top">
                <span>充值</span>
                <span>+{{ changeMoney(item.wd_recharge_amount) }}</span>
            </div>
            <div class="item-bottom">
                <span>{{ item.wwr_addtime }}</span>
                <span>{{ item.wt_name }}</span>
            </div>
        </div>
        <!--提现-->
        <div class="history" v-for="(item,index) in dataList.withdraw_deposit" :key="index">
            <div class="item-top">
                <span>提现</span>
                <span>-{{ changeMoney(item.wwdr_amount) }}</span>
            </div>
            <div class="item-bottom">
                <span>{{ item.wwdr_addtime }}</span>
                <span>{{ item.wt_name }}</span>
            </div>
        </div>

        <van-empty description="您暂无提现记录" v-if="dataList.withdraw_deposit && dataList.withdraw_deposit.length === 0 && dataList.recharge.length === 0"/>
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import { myWallet } from './actions/index';
import { Toast, Empty } from 'vant';
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
            duration: 0,
        });
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            myWallet()
            .then((res) => {
                this.dataList = res.data;
                Toast.clear();
            })
            .catch((e) => {
                console.log(e);
                Toast("请求出错");
            })

        },
        //金额保留两位小数
        changeMoney(val) {
            return parseFloat(val).toFixed(2);
        },
    }
}
</script>

<style lang="less" scoped>
.my-wallet {
    font-family: Source Han Sans CN;
    .title-message {
        width: 92%;
        margin: 0 auto;
        h6 {
            padding-top: 20px;
            font-size: 15px;
            font-weight: 400;
            color: #D04443;
        }
        .money-function {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin-top: 15px;
            align-items: center;
            padding-bottom: 20px;
            .money {
                span {
                    font-family: DIN;
                    color: #D04443;
                }
                span:nth-of-type(1) {
                    font-size: 18px;
                }
                span:nth-of-type(2) {
                    font-size: 31px;
                }
            }
            .recharge {
                // border: 1px solid #D04443;
                border: none;
                background-color: #fff;
                font-size: 13px;
                font-weight: 400;
                color: #D04443;
                padding: 7px 24px;
                border-radius: 2px;
                box-shadow: 0px 0px 1px #D04443;
            }

        }
    }
    h5 {
        padding: 10px 0;
        text-indent: 5%;
        color: #4B4B4B;
        font-size: 15px;
        background-color: #F4F4F4;
        font-weight: normal;
    }
    .history {
        width: 92%;
        margin: 0 auto;
        border-bottom: 1px solid #E1E1E1;
        .item-top {
            display: flex;
            padding: 15px 0 6px 0;
            justify-content: space-between;
            align-items: center;
            span:nth-last-of-type(1) {
                color: #4B4B4B;
                font-size: 15px;
                font-weight: 600;
                font-family: DIN;
            }
            span:nth-of-type(2) {
                color: #D04443;
                font-size: 15px;
                font-weight: 500;
                font-family: DIN;
            }
        }
        .item-bottom {
            display: flex;
            justify-content: space-between;
            padding-bottom: 15px;
            span {
                font-size: 15px;
                font-family: Arial;
                font-weight: 400;
                color: #989898;
            }
            span:nth-of-type(2) {
                font-size: 14px;
            }
        }
    }
}
</style>