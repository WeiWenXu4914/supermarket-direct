<template>
    <div class="AbstractGoods" :height="this.ScreenHeight" :width="this.ScreenWidth">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <div class="RotationChart">
                    <img :src="image" />
                </div>
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">
                {{ current + 1 }}/4
                </div>
            </template>
        </van-swipe>
        <div class="pricedb">
            <div class="pricedb_cont">
                <span>￥</span>
                <div class="pricedb_jiage">50.00</div>
                <div class="pricedb_xiadan">下单即得5元</div>
            </div>
            <div class="pricedb_shoucang">收藏</div>
        </div>
        <div class="CollectCoupons">
            <div class="CollectCoupons_cont">
                <div class="CollectCoupons_cont_cont">满20减5</div>
                <div class="CollectCoupons_cont_cont">满20减5</div>
            </div>
            <div class="CollectCoupons_lingquan">
                <span>领券</span>
                <div>
                    <van-icon name="arrow"  color="#D04443" style="margin-top: 10px;"/>
                </div>
            </div>
        </div>
        <div class="evernote">一麦番山药薄片营养整箱网红蛋糕720g面包点心 小吃零食早餐礼盒</div>
        <div class="divider"></div>
        <div class="numberDisplay">
            <div class="numberDisplay_cont">
                <span>选择</span>
                <div class="selection">数量</div>
            </div>
            <van-icon name="arrow" size="18" style="margin-top:17px;"/>
        </div>
        <div class="numberDisplay">
            <div class="numberDisplay_cont">
                <span>送至</span>
                <div class="selection">内蒙古 包头市 东河区 维多利大厦1023</div>
            </div>
            <van-icon name="arrow" size="18" style="margin-top:17px;"/>
        </div>
        <div class="resthomepage">
            <span>剩余：</span>
            <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
            ],
            current: 0,
            time: 30 * 60 * 60 * 1000,
            screenWidth: '', 
            screenHeight: '',
        }
    },
    methods: {
        onChange(index) {
            this.current = index;
        },
    },
    mounted() {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
    },
    watch: {
        
    }
}
</script>

<style lang="less">
.AbstractGoods{
    width: 100%;
    height: auto;
    position: absolute;
    .RotationChart{
        width: 100%;
        height: 320px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .pricedb{
        width: 94%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        .pricedb_cont{
            display: flex;
            span{
                font-size: 16px;
                color: #D04443;
                line-height: 37px;
                height: 35px;
            }
            .pricedb_jiage{
                font-size: 24px;
                font-weight: 600;
                color: #D04443;
            }
            .pricedb_xiadan{
                width: 120px;
                height: 25px;
                line-height: 25px;
                color: #fff;
                background: #D04443;
                border-radius: 50px;
                font-size: 13px;
                margin-top: 5px;
                margin-left: 15px;
            }
        }
        .pricedb_shoucang{
            font-size: 14px;
            width: 50px;
            height: 25px;
            border: 1px solid #D04443;
            line-height: 25px;
            color: #D04443;
            border-radius: 3px;
            margin-top: 5px;
        }
    }
    .CollectCoupons{
        width: 94%;
        height: 35px;
        margin: 10px 3% 0 3%;
        background:#feefef;
        display: flex;
        justify-content: space-between;
        .CollectCoupons_cont{
            display: flex;
            align-items: center;
            height: 35px;
            margin-left: 5px;
            .CollectCoupons_cont_cont{
                height: 15px;
                line-height: 15px;
                width: 55px;
                border: 1px solid #D04443;
                color: #D04443;
                font-size: 10px;
                margin-left: 5px;
            }
        }
        .CollectCoupons_lingquan{
            display: flex;
            margin-right: 5px;
            span{
                font-size: 14px;
                color: #D04443;
                margin-top: 8px;
            }
            
        }
    }
    .evernote{
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        width: 94%;
        margin: 10px 3% 0 3%;
    }
    .divider{
        width: 100%;
        height: 8px;
        background: #F7F7F7;
        margin-top: 20px;
    }
    .numberDisplay{
        width: 94%;
        height: 50px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E5E5E5;
        .numberDisplay_cont{
            display: flex;
            line-height: 50px;
            span{
                font-size: 15px;
                font-weight: 600;
            }
            .selection{
                margin-left: 15px;
                font-size: 14px;
            }
        }
    }
    .resthomepage{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #D04443;
        position: fixed;
        bottom: 0;
        span{
            color: #fff;
            font-size: 14px;
        }
        .van-count-down{
            line-height: 21px;
            color: #fff;
        }
    }


    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .custom-indicator {
        width: 35px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
        color: #fff;
        border-radius: 50px;
    }
}
</style>