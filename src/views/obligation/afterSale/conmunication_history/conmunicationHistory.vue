<template>
    <div class="conmunication-history">
        <title-view title="协商历史" :border="false"></title-view>
        <div class="wrapper" v-if="dataList.length === 0 ? false : true">
            <div class="content" v-for="(item,index) in dataList" :key="index">
                <img :src="item.ent_logo" class="pic">
                <div class="message">
                    <span>{{ item.ent_name }}</span>
                    <p>{{ item.create_time }}</p>
                </div>
                <p class="info">{{ dataList.handle_note }}</p>
                <div class="imgWrapper">
                    <img :src="dataList.proof_pics" :key="index" class="img">
                </div>
            </div>
        </div>
        <van-empty description="无协商历史" v-else/>
    </div>
</template>

<script>
import titleView from '../../../../components/public_views/titleView';
import { negotiationHistory } from '../../actions/index';
import { Toast,Empty } from 'vant';
export default {
    components: {
        titleView,
    },
    data() {
        return {
            dataList: []
        }
    },
    beforeCreate() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            overlay: true,
            duration: 0,

        });
    },
    created() {
        let o_id = this.$route.query.o_id;
        negotiationHistory(o_id)
        .then((res) => {
            this.dataList = res.data;
            console.log(res)
            Toast.loading({
                duration: 1
            });
        })
    } 
}
</script>

<style lang="less">
.conmunication-history {
    .content {
        width: 100%;
        margin-top: 20px;
        border-bottom: 1px solid #E5E5E5;
        .pic {
            width: 40px;
            height: 40px;
            margin-left: 5%;
        }
        .message {
            display: inline-block;
            margin-left: 10px;
            transform: translateY(-5px);
            span {
                font-size: 16px;
                color: #2F2F2F;
                font-family: Source Han Sans CN;
            }
            p {
                font-size: 14px;
                font-family: Arial;
                font-weight: 400;
                color: #7B7B7B;
                transform: translateY(3px);
            } 
        }
        .info {
            width: 90%;
            margin:10px 0 15px 5%; 
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #212121;
        }
        .imgWrapper {
            margin-left: 4% !important;
            padding: 5px 0 20px 0;
        }
        .img {
            margin-left: 5px;
            width: 80px;
            height: 80px;
            border: 1px dotted #ccc;
        }
        
    }
}
</style>