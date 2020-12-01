<template>
    <div class="groupPurchaseClass">
        <div class="card" @click="goGroupBookingDetail">
            <div class="thumbnail">
                <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="100%" height="100" lazy-load fit="cover">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="detail">
                <div class="title">{{ '标题女顾客的就是你肯定女款就是v看v你的杀人噶人噶发噶地方v但是v真实的尬舞' | strSub(30) }}</div>
                
                <div class="monery_num">
                    <div class="monery">
                        <div class="icon">￥</div>
                        <div class="text">60</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GroupBuyList } from './actions/index';
export default {
    props: ['groupPurchase'],
    name: 'group-purchase',
    data() {
        return {
            dataList: []
        }
    },
    mounted() {
        console.log("aaa")
        let id = this.groupPurchase.entid;
        GroupBuyList(id)
        .then((res) => {
            console.log(res)
        })

    },
    methods: {
        goGroupBookingDetail() {
            this.$router.push('/groupPurchaseDetail')
        }
    }
}
</script>
<style scoped lang='less'>
    .groupPurchaseClass {
        width: 95%;
        margin: 0px auto;
        min-height: 500px;
        border-radius: 5px;
        background: #ffffff;
        .card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
        }
        .thumbnail {
            width: 30%;
            height: 100px;
            /deep/ .van-image {
                img {
                    border-radius: 3px;
                }
            }
        }
        .detail {
            min-height: 90px;
            position: relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            padding-left: 10px;
            .title {
                min-height:30px;
                font-size: 17px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #282828;
                opacity: 1;
            }
            .inventory {
                display: flex;
                align-items: center;
                flex-direction: row;
                height: 20px;
                margin-top: 5px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #6F6F6F;
                opacity: 1;
                .text {
                    margin-left: 5px;
                }
            }
            .monery_num {
                width: 100%;
                min-height: 20px;
                margin-top: 5px;
                display: flex;
                align-items: center;
                flex-direction: row;
                .monery {
                    height: 20px;
                    color: #D04443;
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    .icon {
                        font-size: 15px;
                    }
                    .text {
                        font-size: 20px;
                        font-weight: 600;
                    }
                }
                .num {
                    height: 20px;
                    margin-left: 5px;
                    background: #D04443;
                    color: #ffffff;
                    border-radius: 3px;
                }
            }
        }
    }
</style>