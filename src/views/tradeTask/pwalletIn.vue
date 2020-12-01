<template>
    <div class="newWallet">
        <div class="newWallet_title">
            <van-icon name="arrow-left" @click="fanhui"/>
            <div class="newWallet_title_text">钱包</div>
        </div>
        <div class="resultBalance">
            <p>当前余额</p>
            <div class="resultBalance_cont">
                <div class="resultBalance_Price">
                    <span>￥</span>
                    <div class="amount">{{ money }}</div>
                </div>
                <div class="Recharge">提现</div>
            </div>
        </div>
        <div class="BilDetails">
            <div class="BilDetails_cont">账单明细</div>
        </div>
        <div class="detailed" v-for="(item,index) in dataList" :key="index">
            <div class="detailed_Recharge">
                <span>提现</span>
                <div class="detailed_amount">+{{ item.wd_recharge_amount }}</div>
            </div>
            <div class="detailed_time">
                <div class="detailed_date">{{ item.wwr_addtime }}</div>
                <span>{{ item.wt_name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { myWallet } from './actions/index'
export default {
    data() {
        return{
            dataList:[],
            money: null
        }
    },
    methods: {
        fanhui() {
            this.$router.go(-1)
        },
        //保留两位小数（不改变类型）
        toDecimal2(x) { 
            var f = parseFloat(x); 
            if (isNaN(f)) { 
                return false; 
            } 
            var f = Math.round(x*100)/100; 
            var s = f.toString(); 
            var rs = s.indexOf('.'); 
            if (rs < 0) { 
                rs = s.length; 
                s += '.'; 
            } 
            while (s.length <= rs + 2) { 
                s += '0'; 
            } 
            return s; 
        }
    },
    created() {
        myWallet(this.$store.state.user.token).then((res) => {
            if (res.code == 100) {
                this.dataList = res.data.recharge;
                this.money = this.toDecimal2(res.data.wd_balance);
                //提现金额保留两位小数
                for(let i = 0; i < this.dataList.length; i++) {
                    this.dataList[i].wd_recharge_amount = this.toDecimal2(this.dataList[i].wd_recharge_amount)
                }
            }
        })
    }
}
</script>

<style lang="less">
// * {
//     text-align: center;
// }
.newWallet{
    width: 100%;
    height: auto;
    .newWallet_title{
        padding: 18px 10px;
        display: flex;
        align-items: center;
        font-size: 18px;
        .newWallet_title_text{
            width: 50vh;
            text-align: center;
        }
    }
    .resultBalance{
        width: 94%;
        margin: auto;
        p{
            width: 100%;
            font-size: 14px;
            color: #D04443;
            text-align: left;
        }
        .resultBalance_cont{
            display: flex;
            justify-content: space-between;
            .resultBalance_Price{
                display: flex;
                span{
                    font-size: 14px;
                    color: #D04443;
                    line-height: 33px;
                }
                .amount{
                    font-size: 24px;
                    color: #D04443;
                    font-weight: 600;
                    margin-left: 3px;
                }
            }
            .Recharge{
                border: 1px solid #D04443;
                color: #D04443;
                width: 75px;
                height: 28px;
                line-height: 28px;
                font-size: 13px;
                margin-top: 2px;
                border-radius: 3px;
                text-align: center;
            }
        }
    }
    .BilDetails{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #f2f2f2;
        margin-top: 30px;
        .BilDetails_cont{
            width: 94%;
            height: 100%;
            margin: auto;
            text-align: left;
        }
    }
    .detailed{
        width: 94%;
        height: auto;
        margin: auto;
        margin-top: 20px;
        border-bottom: 1px solid #E1E1E1;
        padding-bottom: 20px;
        .detailed_Recharge{
            display: flex;
            justify-content: space-between;
            span{
                font-size: 14px;
            }
            .detailed_amount{
                color: #D04443;
                font-size: 17px;
                font-weight: 600;
            }
        }
        .detailed_time{
            display: flex;
            justify-content: space-between;
            span{
                font-size: 14px;
                color: #989898;
            }
            .detailed_date{
                font-size: 14px;
                color: #989898;
            }
        }
    }
}
</style>