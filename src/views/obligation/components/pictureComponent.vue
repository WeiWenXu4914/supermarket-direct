<template>
    <div class="after-sale-pic-component">
        <p>图片凭证：</p>
        <img :src="item" v-for="(item,index) in imgList" :key="index">
    </div>
</template>

<script>
export default {
    props: ['imgList'],
    mounted() {
        console.log(this.imgList,'图片')
    }
}
</script>

<style lang="less">
.after-sale-pic-component {
    background-color: #fff;
    padding-bottom: 8px;
    width: 100%;
    p {
        margin-left: 5%;
        font-size: 14px;
        color: #383838;
        padding: 8px 0;
        font-family: Source Han Sans CN;
    }
    img {
        margin-left: 5px;
        width: 80px;
        height: 80px;
        border: 1px dotted #ccc;
    }
    img:nth-of-type(1) {
        margin-left: 5%;
    }

}
</style>