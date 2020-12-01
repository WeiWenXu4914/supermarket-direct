<template>
    <div class="after-sale-result-wait">
        <div class="reject">
            <van-icon name="underway" size="18" color="#07c160"/>
            <span class="text">
                {{ text }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['state'],
    data() {
        return {
            text: ''
        }
    },
    created() {
        // 0 未处理  1 处理中
        this.text = this.state == 0 ? '商家还未处理，请耐心等待' : '商家正火速处理中，请耐心等待';
    }
}
</script>


<style lang="less">
.after-sale-result-wait {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: #fff;
    .reject {
        display: flex;
        margin-left: 5%;
        align-items: center;
        span {
            padding-left: 10px;
            font-size: 18px;
            color: #161616;
            font-family: Source Han Sans CN;
        }
    }
}
</style>