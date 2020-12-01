<template>
    <div class="after-sale-commodity-detail">
        <p>退款商品</p>
        <van-card
         class="commodity"
         :num="commodity.product_count"
         :price="commodity.pro_price"
         :title="commodity.pro_name"
         :thumb="commodity.product_pic"
        />
        <div class="logistics">物流配送</div>
    </div>
</template>

<script>
import { Card } from 'vant';
export default {
    props: ['commodity'],
    mounted() {
        console.log(this.commodity,'商品信息')
    }
}
</script>

<style lang="less">
.after-sale-commodity-detail {
    position: relative;
    margin-top: 10px;
    height: 120px;
    background-color: #fff;
    p {
        padding: 14px 0 0px 0;
        margin-left: 5%;
    }
    .commodity {
        
        background-color: #fff;
        .van-card__title {
            padding-top: 10px;
            font-size: 18px;
            font-family: Source Han Sans CN;
        }
    }
    .logistics {
        position: absolute;
        display: inline;
        right: 5%;
        top: 50%;
        padding: 1px 5px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        background-color: #D04443;
        color: #FFFFFF;
    }
}
</style>