<template>
        <div class="luck-turn-table">
            <!--边框小圆点-->
            <div class="circle-wrapper" v-for="item in 18"  :key="item" ref="circle">
                <span class="circle" ></span>
            </div>
            <img src="../img/pointer.png" class="point" @click="start">

            <div class="wrapper" ref="prize" :class="active == true ? 'wrapper-active' : ''">

                <div class="content" :class="'content'+(index+1)" v-for="(item,index) in awards" :key="index">
                    <div>
                        <span :class="item.name == '谢谢惠顾' ? 'not-prize' : '' ">{{ item.name }}</span>
                        <img :src="item.photo_url" v-if="item.name !== '谢谢惠顾'">
                    </div>
                </div>

            </div>
        </div>
</template>

<script>
import { Toast } from 'vant';
import { startActivity } from '../actions/index';
export default {
    props: ['awards','aid','num'],
    data() {
        return {
            ifCanRunning: true,
            active: false,
            result: "谢谢惠顾"
        }
    },
    mounted() {
        // console.log(this.awards)
        console.log(this.awards)
        for(let i = 0; i < this.$refs.circle.length; i++) {
            this.$refs.circle[i].style.transform = `rotateZ(${i*20}deg)`;
        }
        
    },

    methods: {
        async start() {


            if(this.num <= 0) {
                Toast("您已无抽奖次数");
                return;
            }

            if(!this.ifCanRunning) {
                Toast("已开始抽奖")
                return;
            }
            this.active = true;
            //获取服务器抽奖结果
            let res = await startActivity(this.aid);
            if(res.code !== 100) {
                Toast("请求出错");
                return;
            }
            this.num--;
            this.$emit('changeNum',this.num);
            this.result = res.data.yes.apr_name;
            console.log(this.result,'服务器结果')

            let resTimer = setTimeout(() => {
                if(this.result == '谢谢惠顾') {
                    Toast("很遗憾，您距奖品只有一步之遥");
                } else {
                    Toast("恭喜您抽到大奖, 奖品为" + this.result);
                }
                clearTimeout(resTimer)
            },10000)

            //改变转盘状态
            this.ifCanRunning = false;

            let timer = setTimeout(() => {
                this.active = false;
                this.ifCanRunning = true;
                this.$refs.prize.style.transform = "rotateZ(0deg)";
 
            },12000)

            for(let i = 0; i < this.awards.length; i++) {

                if(this.result == this.awards[i].name) {

                    if(i === 0) {
                        this.$refs.prize.style.transform = `rotate(7500deg)`;
                    } else {
                        this.$refs.prize.style.transform = `rotate(${7200 + ( 6 - ( i - 1 ) ) * 60}deg)`;
                        console.log(i,'下标')
                        console.log(`rotate(${7200 + ( 6 - ( i - 1 ) ) * 60}deg)`,'度数')
                        
                    }

                }
            }
        },
        
    }
}
</script>

<style lang="less">

.luck-turn-table {
    position: relative;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    margin: 0 auto;
    box-sizing: content-box;
    background-color:#FF511E;
    .circle-wrapper {
        position: absolute;
        left: 50%;
        top: 0;
        height: 50%;
        // width: 2px;
        transform: translateX(-50%);
        // background-color: #000;
        z-index: 999;
        transform-origin: center 100%;
    }
    .circle {
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        width: 9px;
        height: 9px;
        background-color: #fff;
        border-radius: 50%;
        z-index: 99;
    }
    .wrapper {
        position: relative;
        top: 20px;
        left: 20px;
        box-sizing: border-box;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        overflow: hidden;
        // border: 20px solid #FF511E;
    }
    .wrapper-active {
        transition: all 10s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
    .content {
        position: absolute;
        width: 100%;
        height: 100%;
        left: -50%;
        top: -50%;
        transform-origin: 100% 100%;
    }
    .point {
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%) scale(0.4);
    }
    .content div {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        align-items: center;
        transform-origin: 100% 50%;
        transform: translateY(50%) rotateZ(30deg);
            span {
                position: absolute;
                right: 85px;
                transform-origin: center;
                width: 80px;
                text-align: center;
                transform: rotateZ(-90deg);
                font-size: 16px;
                color: #FFFFFD;
            }
            .not-prize {
                color: #A0130C;
                transform: translateX(20px) rotateZ(-90deg);
                font-size: 18px;
            }
            img {
                width: 50px;
                height: 55px;
                position: absolute;
                border-radius: 4px;
                right: 50px;
                transform-origin: center;
                transform: rotateZ(-90deg);
            }
    }

    .content1 {
        background: radial-gradient(circle at 100% 100%,#FACE85 0%,#FEFEE4 20%,#fff 30%);
    }
    .content2 {
        background: radial-gradient(circle at 100% 100%,#FF7611 0%,#FFAE39 15%,#FF7611 36%);
        transform: rotateZ(60deg);
    }
    .content3 {
        background: radial-gradient(circle at 100% 100%,#FACE85 0%,#FEFEE4 20%,#fff 30%);
        transform: rotateZ(120deg);
    }
    .content4 {
        background: radial-gradient(circle at 100% 100%,#FF7611 0%,#FFAE39 15%,#FF7611 36%);
        transform: rotateZ(180deg);
    }
    .content5 {
        background: radial-gradient(circle at 100% 100%,#FACE85 0%,#FEFEE4 20%,#fff 30%);
        transform: rotateZ(240deg);
    }
    .content6 {
        background: radial-gradient(circle at 100% 100%,#FF7611 0%,#FFAE39 15%,#FF7611 36%);
        transform: rotateZ(300deg) skew(30deg);
    }
    .content6 div{
        transform: skew(-30deg) rotateZ(30deg);
        background: radial-gradient(circle at 100% 100%,#FF7611 0%,#FFAE39 15%,#FF7611 36%);
    }
}
.luck-turn-table::after {
    
}

/* @keyframes move {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotate(3360deg);
        }
} */
</style>