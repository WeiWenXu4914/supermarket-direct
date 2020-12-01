<template>
    <div class="superSet">
        <div class="superSet_title">
            <van-icon name="arrow-left" @click="fanhui"/>
            <div class="superSet_title_text">设置</div>
        </div>
        <div class="commission">
            <div class="commission_word">
                <span>*</span>
                <div class="word">顾客佣金</div>
            </div>
            <div class="commission_input">
                <van-field v-model="value" placeholder="0元起" />
                <span>元</span>
            </div>
        </div>
        <div class="Tips">
            <div class="Tips_title">温馨提示：</div>
            <p>员工完成任务所得佣金需和顾客分享，顾客佣金设置的少 会影响下单哦！</p>
        </div>
        <div class="uncompletely" @click="wancheng">完成</div>
    </div>
</template>

<script>
import { ClaimSettings } from './actions/index'
export default {
    data() {
        return{
            value: '',
            wanchengid:2
        }
    },
    methods: {
        fanhui() {
            this.$router.go(-1)
        },
        wancheng() {
            let data ={
                id: this.$route.query.tlid,
                buy_commission: this.value
            }
            ClaimSettings(data).then((val) => {
                console.log(val,3333)
                this.$router.push({path: 'SubmittedSuccessfully',query: {wanchengid: this.wanchengid}})
            })
        }
    }
}
</script>

<style lang="less">
.superSet{
    height: auto;
    width: 100%;
    .superSet_title{
        padding: 18px 10px;
        display: flex;
        align-items: center;
        font-size: 18px;
        .superSet_title_text{
            width: 50vh;
        }
    }
    .commission{
        width: 94%;
        height: auto;
        margin: auto;
        .commission_word{
            display: flex;
            span{
                color: red;
                margin-top: 2px;
            }
            .word{
                font-size: 15px;
                font-weight: 600;
                margin-left: 5px;
            }
        }
        .commission_input{
            display: flex;
            margin-top: 15px;
            .van-cell{
                border: 1px solid #BDBDBD;
                padding: 8px 10px;
                width: 120px;
            }
            span{
                line-height: 42px;
                margin-left: 10px;
            }
        }
    }
    .Tips{
        width: 94%;
        margin: auto;
        margin-top: 25px;
        .Tips_title{
            font-size: 14px;
            color: #8D8D8D;
            text-align: left;
        }
        p{
            font-size: 14px;
            color: #737373;
            margin: 0;
            padding-top: 10px;
            text-align: left;
        }
    }
    .uncompletely{
        width: 94%;
        height: 45px;
        background: #D04443;
        margin: 25px 3% 0 3%;
        color: #fff;
        line-height: 45px;
        border-radius: 3px;
        text-align: center;
    }
}

</style>