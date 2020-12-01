<template>
    <div class="successfully">
        <div class="realName_title">
            <van-icon name="arrow-left" @click="fanhui"/>
        </div>
        <div class="successfully_biankuang" v-if="this.tijiaoid == 1">
            <div class="successfully_wordOne">提交成功</div>
            <div class="successfully_wordTwo">预计将在 1—2 日内完成审核</div>
            <div class="getReturns">
                <div class="getReturns_button" @click="noreturn">返回首页</div>
            </div>
        </div>
        <div class="SuccessfulClaim" v-if="this.wanchengid == 2">
            <div class="SuccessfulClaim_wordOne">领取成功</div>
            <div class="SuccessfulClaim_wordTwo">快去分享赚取佣金哦！</div>
            <div class="SuccessfulClaim_return">
                <div class="SuccessfulClaim_button" @click="noreturn">分享</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            wanchengid: this.$route.query.wanchengid,
            tijiaoid: this.$route.query.tijiaoid
        }
    },
    methods: {
        fanhui() {
            this.$router.push('tradeTask')
        },
        noreturn() {
           this.$router.go('-1') 
        }
    }
}
</script>

<style lang="less">
.successfully{
    width: 100%;
    height: auto;
    .realName_title{
        padding: 10px 10px;
        display: flex;
        align-items: center;
        font-size: 18px;
    }
    .successfully_biankuang{
        padding-top: 180px;
        .successfully_wordOne{
            font-size: 20px;
            color: #D04443;
            font-weight: 600;
        }
        .successfully_wordTwo{
            font-size: 15px;
            color: #494949;
            margin-top: 25px;
        }
        .getReturns{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            margin-top: 60px;
            .getReturns_button{
                width: 140px;
                height: 40px;
                border: 1px solid #D04443;
                color: #D04443;
                border-radius: 3px;
                line-height: 40px;
            }
        }
    }
    .SuccessfulClaim{
        padding-top: 180px;
        .SuccessfulClaim_wordOne{
            font-size: 20px;
            color: #D04443;
            font-weight: 600;
        }
        .SuccessfulClaim_wordTwo{
            font-size: 15px;
            color: #494949;
            margin-top: 25px;
        }
        .SuccessfulClaim_return{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            margin-top: 60px;
            .SuccessfulClaim_button{
                width: 140px;
                height: 40px;
                background: #D04443;
                color: #fff;
                border-radius: 3px;
                line-height: 40px;
            }
        }
    }
    
    
}
</style>