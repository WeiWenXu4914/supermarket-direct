<template>
    <div class="my-forward-detail">
        <title-view title="访问列表"></title-view>
        <div class="item-list" v-for="(item,index) in dataList" :key="index">
            <div class="user">
                <img :src="item.mem_head_portrait" alt="">
                <span>{{ item.mem_name }}</span>
            </div>
            <span>点击次数： {{ item.click_num }}</span>
        </div>
        <van-empty description="无任何用户浏览" v-if="dataList.length === 0"/>
    </div>
</template>

<script>
import { Toast, Empty } from 'vant';
import titleView from '../../../components/public_views/titleView';
import { forwardClick } from './actions/index';
export default {
    components: {
        titleView
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
            duration: 0
        });
    },
    created() {
        let id = this.$route.params.id;
        forwardClick(id)
        .then((res) => {
            this.dataList = res.data;
            Toast.clear();
        })
        .catch((err) => {
            Toast("请求错误");
        })
    }
}
</script>

<style lang="less">
.my-forward-detail {
    .item-list {
        display: flex;
        padding: 15px;
        box-shadow: 0px 0px 1px #adadad;
        justify-content: space-between;
        align-items: flex-end;
        .user {
            display: flex;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            span {
                padding-left: 10px;
                font-size: 15px;
                color: #000;
            }
        }
        span {
            font-size: 12px;
            color: #ccc;
        }
    }
}
</style>