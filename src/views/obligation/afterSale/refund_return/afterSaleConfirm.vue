<template>
    <div class="after-sale-confirm">
        <title-view title="退货详情"></title-view>
        <h3 class="title-message">商家同意换货，请处理退款流程</h3>
        <div class="return-tips">
            <h5>换货步骤</h5>
            <p>1.寄出需要退款的商品</p>
            <p>2.及时填写换货信息</p>
        </div>
        <h3 class="title-message">请在物流邮寄单上填写以下信息</h3>
        <div class="return-message">
            <div class="return-message-item">
                <span>退货地址：</span>
                <span>发送到发空间按付款交话费卡卡鸡发送到发送到发送到发送到发送到发生法撒旦法撒旦</span>
            </div>
            <div class="return-message-item">
                <span>收件人：</span>
                <span>王鑫</span>
            </div>
            <div class="return-message-item">
                <span>联系电话：</span>
                <span><a href="tel:17647463584">17647463584</a></span>
            </div>
        </div>
        <h3 class="write-title">请在此填写您邮寄的物流单号：</h3>
        <input type="text" class="input" placeholder="请输入正确的物流单号">
        <button class="refund-confirm">提交信息</button>
    </div>
</template>

<script>
import titleView from "@/components/public_views/titleView";
export default {
    components: {
        titleView
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="less">
.after-sale-confirm {
    width: 100vw;
    font-family: Source Han Sans CN;
    .title-message {
        margin: 10px 0 0 4vw;
        font-size: 16px;
        color: #2F2F2F;
        font-weight: normal;
    }
    .return-tips {
        width: 92vw;
        margin: 10px auto;
        background-color: rgba(208, 68, 67, 0.05);
        border-radius: 1px;
        height: 100px;
        h5 {
            color: #474747;
            font-size: 15px;
            padding: 10px 0 0 10px;
        }
        p {
            padding: 7px 0 0 10px;
            color: #2F2F2F;
            font-size: 15px;
            font-weight: 400;
        }
    }
    .return-message {
        background-color: rgba(208, 68, 67, 0.05);
        width: 92vw;
        border-radius: 1px;
        margin: 0 auto;
        font-size: 14px;
        color: #474747;
        .return-message-item {
            width: 95%;
            margin: 4px auto;
            padding: 5px 0;
            span:nth-of-type(1) {
                font-size: 15px;
            }
        }
        .return-message-item:nth-of-type(1) {
            padding-top: 20px;
        }
        .return-message-item:nth-of-type(3) {
            padding-bottom: 20px;
            a {
                color: royalblue;
            }
        }
    }
    .write-title {
        padding: 10px 0 20px 4vw;
    }
    .input {
        font-family: "Microsoft soft";
        width: 92vw;
        margin-left: 4vw;
        height: 30px;
        border: 1px solid rgba(208, 68, 67, 1);
        text-indent: 1em;
    }
    .input:focus {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
    }
    .refund-confirm {
        width: 90%;
        margin: 100px 0 0 4vw;
        padding: 13px;
        font-size: 15px;
        color: #FCFCFC;
        border-radius: 2px;
        background-color: #D04443;
        outline: none;
        border: none;
    }
    .refund-confirm:active {
        background-color: #ccc;
    }
}
</style>