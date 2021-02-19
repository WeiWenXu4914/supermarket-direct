<template>
    <div>
        <title-view title="我的评论" :border="false"></title-view>
        <van-tabs v-model="active" animated>
            <van-tab title="全部">
                <comments-item :index="active" :dataListMsg="dataList" v-if="statusComponent"></comments-item>
            </van-tab>
            <van-tab title="文章">
                <comments-item :index="active" :dataListMsg="dataList" v-if="statusComponent"></comments-item>
            </van-tab>
            <van-tab title="商品">
                <comments-item :index="active" :dataListMsg="dataList" v-if="statusComponent"></comments-item>
            </van-tab>
            <van-tab title="商户">
                <comments-item :index="active" :dataListMsg="dataList" v-if="statusComponent"></comments-item>
            </van-tab>
            <van-tab title="用户">
                <comments-item :index="active" :dataListMsg="dataList" v-if="statusComponent"></comments-item>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import commentsItem from './components/commentsItem';
import { myComment } from '../actions/index';
import { Toast } from 'vant';
export default {
    components: {
        titleView,
        commentsItem
    },
    data() {
        return {
            active: 0,
            dataList: {},
            statusComponent: false
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
        myComment()
        .then((res) => {
            this.dataList = res.data;
            this.statusComponent = true;
            Toast.clear();
        })
        .catch((err) => {
            Toast.fail("请求出错");
            Toast.loading({
                duration: 1
            });
        })
    },
    methods: {
        changeStatu(item) {
            this.choosed = item;
        },
    }
}
</script>

<style lang="less">

</style>