<template>
    <div class="after-sale-result-title">
        <div class="reject" v-if="status">
            <van-icon name="fail" class="icon-fail"/>
            <span class="text">{{ title }}被拒绝，建议修改申请</span>
        </div>
        <div class="success" v-else>
            <van-icon name="success" class="icon-success"/>
            <span class="text">申请{{ title }}成功</span>
            <!--状态为换货时不显示金额-->
            <p v-if="$route.query.type == 2 ? false : true">￥{{ money }}</p>
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant';
export default {
    props:['state','type','title','money'],
    data() {
        return {
            status: true,
        }
    },
    created() {
        //是否显示被拒绝申请
        this.status = this.state == 3 ? true : false;
        console.log(this.state,'1退换中，2完成，3拒绝')
    }
}
</script>

<style lang="less">
.after-sale-result-title {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: #fff;
    .reject {
        margin-left: 5%;
        .icon-fail {
            border-radius: 50%;
            background-color: #D04443;
            width: 20px;
            height: 20px;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            color: #fff;
        }
        span {
            padding-left: 10px;
            font-size: 18px;
            color: #161616;
            font-family: Source Han Sans CN;
        }
    }
    .success {
        margin-left: 5%;
        .icon-success {
            border-radius: 50%;
            background-color: #8ED997;
            width: 20px;
            height: 20px;
            font-size: 16px;
            line-height: 21px;
            text-align: center;
            color: #fff;
            margin: 10px 0;
        }
        span {
            padding-left: 10px;
            font-size: 18px;
            color: #161616;
            font-family: Source Han Sans CN;
        }
        p {   
            
            font-family: DIN;
            font-weight: bold;
            font-size: 22px;
            color: #212121;
        }
    }
}
</style>