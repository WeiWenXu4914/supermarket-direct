<template>
    <div class="agreement">
        <div class="top">
            <van-icon name="arrow-left" size="24" @click="back()" class="img"/>
            <p class="p1">《城事乐家》{{ title }}</p>
        </div>
        <div class="content">
            <p>{{ dataMsg }}</p>
        </div>
        <div class="tel" v-if="phone.length">
            联系我们: <span v-for="(item,index) in phone" :key="index"><a :href="'tel:'+item">{{ item }}</a></span>
        </div>

    </div>
</template>


<script>
import { LoginRegister } from './actions/index';
import { Icon } from 'vant';
Vue.use(Icon);
export default {
    data() {
        return {
            dataMsg: [],
            title: '',
            phone: []
        }
    },
    created() {

        this.title = this.$route.query.title;
        if(this.title == '注册协议') {
            LoginRegister(1)
            .then((res) => {
                this.dataMsg = res.data;
            })
        } else if(this.title == '隐私协议') {
            LoginRegister(2)
            .then((res) => {
                this.dataMsg = res.data;
            })
        } else if(this.title == '关于我们') {
            LoginRegister(3)
            .then((res) => {
                this.dataMsg = res.data.AboutUs;
                this.phone = res.data.phone;
            })
        } else {
            LoginRegister(4)
            .then((res) => {
                this.dataMsg = res.data;
            })
        }

    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>


<style lang="less">
.agreement {
    .top {
        width: 90%;
        display: flex;
        margin: 0.5rem 0rem 0.2rem 0.3rem;
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 0.4rem;
        .img {
            width: 0.5rem;
            height: 0.5rem;
            margin-top: 0.12rem;
            color: rgb(128, 127, 127);
        }
        .p1 {
            margin-left: 0.3rem;
            color: #2f2f2f;
            font-size: 0.5rem;
            font-weight: 600;
            font-family: Source Han Sans CN;
        }
    }
    .content {
        width: 92%;
        margin: 0.5rem auto;
        p {
            color: #525252;
            text-indent: 2em;
        }
    }
    .tel {
        position: fixed;
        bottom: 5%;
        right: 5%;
        color: #525252;
        span {
            margin: 0 10px;
            color: rgb(66, 66, 243);
        }
    }
}
</style>