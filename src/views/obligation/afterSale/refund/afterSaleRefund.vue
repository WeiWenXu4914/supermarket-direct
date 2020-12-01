<template>
    <div class="after-sale-refund">
        <title-view title="申请退款" :border="false"></title-view>
        <wait-result v-if="titleState" :state="$route.query.state"></wait-result>
        <result-title v-else :type="$route.query.type" :state="$route.query.state" :title="type" :money="dataList.return_amount"></result-title>

        <div class="response" v-if="$route.query.state === 3 ? true : false">
            <p>商家回复：{{ response }}</p>
            <p>售后类型：仅退款</p>
            <hr style="height:0;border: none;margin:17px 0 0 24%;border-top:1px solid #E5E5E5;">
        </div>
        <div class="response-success" v-else>
            <p>售后类型：仅退款</p>
            <p>退款金额：{{ dataList.return_amount }}</p>
            <span class="toWechat">回到微信</span>
            <hr style="height:0;border: none;margin:15px 0 0 24%;border-top:1px solid #E5E5E5;">
        </div>
        <!--订单编号等信息组件-->
        <result-content :data="dataList"></result-content>

        <div class="communication-history" @click="toHistory">
            <span class="text">协商历史</span>
            <van-icon name="arrow" class="icon"/>
        </div>

        <commodity-detail :commodity="dataList"></commodity-detail>
    </div>
</template>

<script>
//state, //申请状态：0->待处理；1->退换中；进入售后服务详情接口 2->已完成；进入成功页面 3->已拒绝 进入拒绝页面
import titleView from '../../../../components/public_views/titleView';
import resultTitle from '../../components/resultTitle';
import resultContent from '../../components/resultContent';
import waitResult from '../../components/waitResult';
import commodityDetail from '../../components/commodityDetail';
import { myAfterSalesServiceDetail } from '../../actions/index';
import { Toast,Button } from 'vant';
export default {
    components: {
        resultTitle,
        titleView,
        resultContent,
        waitResult,
        commodityDetail
    },
    data() {
        return {
            response: '东西没有问题。',//商家回复拒绝信息
            type: '退款',
            titleState: false,
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
        //判断售后状态 state== 1 
        this.titleState = this.$route.query.state == 1 ? true : false;

        //获取详情数据
        myAfterSalesServiceDetail(this.$route.query.ora_id,this.$route.query.type)
        .then((res) => {
            this.dataList = res.data;

            Toast.loading({
                duration: 1
            });
        })

    },
    methods: {
        toHistory() {//协商历史
            this.$router.push({
                path: '/conmunicationHistory',
                query: {
                    o_id: this.dataList.o_id
                }
            })
        },
        toWechat() {

        }
    }
}
</script>

<style lang="less">
.after-sale-refund {
    background: #F7F7F7;
    .response {
        height: 100px;
        margin-top: 10px;
        background-color: #fff;
        p {
            margin-left: 5%;  
        }
        p:nth-of-type(1) {
            font-size: 16px;
            color: #D04443;
            padding: 18px 0;
        }
        p:nth-of-type(2) {
            font-size: 14px;
            font-weight: 400;
            color: #212121;
            span {
                display: inline-block;
                padding-bottom: 15px;
            }
        }
    }
    .response-success {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        height: 80px;
        margin-top: 10px;
        background-color: #fff;
        p {
            font-family: Source Han Sans CN;
            margin-left: 5%;
            font-size: 14px;
            font-weight: 400;
            color: #212121;
            padding: 3px 0;
        }
        .toWechat {
            position: absolute;
            right: 5%;
            top: 50%;
            transform: translateY(-30%);
            font-size: 14px;  
            font-family: Source Han Sans CN;
            color: #D04443;
        }
    }
    .communication-history {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        height: 60px;
        margin-top: 10px;
        width: 100%;
        .text {
            margin-left: 5%;
            color: #212121;
            font-size: 14px;
        }
        .icon {
            margin-right: 5%;
            color: #717171;
            font-size: 16px;
        }
    }
    
}
</style>