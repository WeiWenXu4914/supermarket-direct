<template>
    <div>
        <title-view title="我的转发" :border="false"></title-view>
        <van-tabs v-model="active" animated>
            <van-tab title="全部">
                <forward-Item :index="active" :dataListMsg="dataList" v-if="statusComponent"></forward-Item>
            </van-tab>
            <van-tab title="文章">
                <forward-Item :index="active" :dataListMsg="dataList" v-if="statusComponent"></forward-Item>
            </van-tab>
            <!-- <van-tab title="商品">
                <forward-Item :index="active" :dataListMsg="dataList" v-if="statusComponent"></forward-Item>
            </van-tab> -->
            <van-tab title="商户">
                <forward-Item :index="active" :dataListMsg="dataList" v-if="statusComponent"></forward-Item>
            </van-tab>
            <van-tab title="用户">
                <forward-Item :index="active" :dataListMsg="dataList" v-if="statusComponent"></forward-Item>
            </van-tab>
            
        </van-tabs>
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import { myforward } from '../actions/index';
import { Tab, Tabs, Toast } from 'vant';
import  forwardItem  from './components/forwardItem';
export default {
    props: ['index','dataListMsg'],
    components: {
        titleView,
        forwardItem
    },
    data() {
        return {
             active: 0,
             dataList: [],
             statusComponent: false
        }
    },
    beforeCreate() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            overlay: true,
            duration: 0
        });
    },
    created() {
        myforward()
        .then((res) => {
            this.dataList = res.data;
            this.statusComponent = true;
            Toast.loading({
                duration: 1
            });
        })
        .catch((err) => {
            Toast.fail("请求出错");
            Toast.loading({
                duration: 1
            });
        })
    }
}
</script>

<style>

</style>