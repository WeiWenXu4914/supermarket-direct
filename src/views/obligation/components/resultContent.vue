<template>
    <div class="after-sale-result-content">
        <p>申请原因：{{ data.reason }}</p>
        <p>申请说明：{{ data.descriptionReason }}</p>
        <p>订单编号：{{ data.order_number }}</p>
        <p>申请时间：{{ data.create_time }}</p>
    </div>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style lang="less">
.after-sale-result-content {
    background-color: #fff;
    height: 120px;
    width: 100%;
    p {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #212121;
        margin: 5px 5%;
    }
    p:nth-of-type(1) {
        margin-top: 0px;
        padding-top: 10px;
    }
}
</style>