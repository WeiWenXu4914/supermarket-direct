<template>
    <div class="exchange-reject">
        <title-view title="申请换货" :border="false"></title-view>
        <!--处理结果标题头组件-->
        <!-- 申请状态：0->待处理；1->退换中；进入售后服务详情接口 2->已完成；进入成功页面 3->已拒绝 进入拒绝页面 -->
        <wait-result v-if="titleState" :state="$route.query.state"></wait-result>
        <result-title v-else :state="$route.query.state" :type="$route.query.type" :title="type" :money="dataList.return_amount"></result-title>
        
        <div class="address" v-if="$route.query.state == 2 ? true : false">
            <div class="label">
                物流信息
            </div>
            <div class="info">
                <span>已签收</span>
                <span>签收人：{{ dataList.receive_man }}</span>
                <p>{{ dataList.receive_time }}</p>
            </div>
        </div>
        <div class="response" v-if="$route.query.state == 3 ? true : false">
            <p>商家回复：{{ response }}</p>
            <p>售后类型：{{ type }}</p>
            <hr style="height:0;border: none;margin:17px 0 0 24%;border-top:1px solid #E5E5E5;">
        </div>
        <!--订单编号等信息组件-->
        <result-content :data="dataList"></result-content>

        <div class="communication-history" @click="toHistory">
            <span class="text">协商历史</span>
            <van-icon name="arrow" class="icon"/>
        </div>
        
        <picture-component :imgList="dataList.proof_pics" v-if="imgShow"></picture-component>

        <commodity-detail :commodity="dataList"></commodity-detail>

        <div class="size"></div>

        <div class="button" v-if="$route.query.state == 2 ? true : false">
            <van-button @click="toEditAddress" type="primary" size="small" color="#D04443">完成物流信息</van-button>
        </div>
        <div class="button" v-else>
            <van-button plain hairline type="primary" size="small" color="#D04443">申请客服介入</van-button>
            <van-button type="primary" size="small" color="#D04443">修改申请</van-button>
        </div>
    </div>
</template>

<script>
import titleView from '../../../../components/public_views/titleView';
import resultTitle from '../../components/resultTitle';
import resultContent from '../../components/resultContent';
import waitResult from '../../components/waitResult';
import pictureComponent from '../../components/pictureComponent';
import commodityDetail from '../../components/commodityDetail';
import { myAfterSalesServiceDetail } from '../../actions/index';
import { Toast,Button } from 'vant';
export default {
    components: {
        resultTitle,
        titleView,
        resultContent,
        waitResult,
        pictureComponent,
        commodityDetail
    },
    data() {
        return {
            response: '东西没有问题。',
            type: '换货',
            titleState: false,
            dataList: [],
            imgShow: false
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
        //判断售后状态
        this.titleState = this.$route.query.state == 0 || this.$route.query.state == 1 ? true : false;

        //获取详情数据
        myAfterSalesServiceDetail(this.$route.query.ora_id,this.$route.query.type)
        .then((res) => {
            this.dataList = res.data;
            this.imgShow = true;
            console.log(this.dataList)
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
        toEditAddress() {
            this.$router.push({
                path: '/exchangeSuccess',
                query: {
                    ora_id: this.$route.query.ora_id,
                    type: this.$route.query.type   
                }
            })
        }
    }
}
</script>

<style lang="less">
.exchange-reject {
    background: #F7F7F7;
    font-family: Source Han Sans CN;
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
    .communication-history {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        height: 60px;
        border-bottom: 10px solid  #F7F7F7;
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
    .button {
        position: fixed;
        right: 5%;
        bottom: 15px;
        background-color: #fff;
        button {
            margin-left: 10px;
        }
    }
    .address {
        display: flex;
        background-color: #fff;
        margin-top: 10px;
        align-items: center;
        height: 60px;
        .label {
            margin-left: 5%;
        }
        .info {
            margin-left: 12px;
            span {
                margin-right: 4px;
            }
            p { 
                font-size: 13px;
                color: #848484;
            }
        }
    }
    .size {
        border-bottom: 100px solid #fff;
    }
}   
</style>