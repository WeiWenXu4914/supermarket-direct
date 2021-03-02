<template>
    <div class="goods-product-list-item" @click="toDetail(data)">
        <van-image
         width="100%"
         height="4.5rem"
         fit="cover"
         lazy-load
         :src="data.pro_thumbnail"
        />
        <h5>{{ data.pro_name }}</h5>
        <div class="price">
            <span>￥{{ data.pro_price }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        toDetail(data) {
            let obj = {
                proid: data.pro_id || data.proid
            };
            let res = this.$Utils.demoRequest(JSON.stringify(obj));
            this.$router.push({
                path:'/commdityPay',
                query:{
                    res: res
                }
            });
        },
    }
}
</script>

<style lang="less">
.goods-product-list-item {
    width: 48vw;
    height: 240px;
    background-color: #FDFFFE;
    h5 {
        font-family: Arial, Helvetica, sans-serif;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 1px 8px;
        font-weight: normal;
        font-size: 14px;
        height: 40px;
    }
    .price {
        width: 100%;
        height: 30px;
        line-height: 30px;
        span {
            padding-left: 5px;
            font-size: 18px;
            color: #d04443;
            // color: #8F5065;
        }
    }
}
</style>