<template>
    <div>
        <div
            class="article-result-item"
            v-for="(items, index) in resultList"
            :key="index"
        >
            <template v-if="items.gc_id === 1">
                <article-item
                    v-if="items.gc_id === 1"
                    :article="items"
                ></article-item>
            </template>
            <template v-else-if="items.gc_id === 2">
                <video-item :videoItem="items"></video-item>
            </template>
            <template v-else-if="items.gc_id === 3">
                <rent-item v-if="items.gc_id === 3" :rentItem="items"></rent-item>
            </template>
            <template v-else-if="items.gc_id === 4">
                <job-item v-if="items.gc_id === 4" :jobItem="items"></job-item>
            </template>
            <template v-else-if="items.gc_id === 6">
                <adv-item v-if="items.gc_id === 6" :advItem="items"></adv-item>
            </template>
        </div>

        <van-empty image="search" description="无相关内容，请切换搜索关键词试试" v-if="resultList.length == 0 && !loading"/>

        <van-loading color="#1989fa" vertical style="position:absolute;top:5rem;left:50%;transform:translateX(-50%);" v-show="loading"/>


    </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import ArticleItem from "@/views/home/components/ArticleItem";
import RentItem from "@/views/home/components/RentItem";
import AdvItem from "@/views/home/components/AdvItem";
import JobItem from "@/views/home/components/JobItem";
import VideoItem from "@/views/home/components/VideoItem";
import { searchArticle } from "../actions";
import { Toast, Empty, Loading } from 'vant';

export default {
    props: ['searchValue','active1'],
    components: {
        PageTitle,
        ArticleItem,
        RentItem,
        AdvItem,
        JobItem,
        VideoItem,
    },
    data() {
        return {
            resultList: [],
            loading: true,
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        'searchValue': function () {
            if(this.active1 == 0) {
                this.getData();
            }
        },
        'active1': function () {
            if(this.active1 == 0) {
                this.getData();
            }
        }
    },
    methods: {
        getData() {
            this.loading = true;
            if(this.searchValue != "") {
                searchArticle(this.searchValue)
                .then((res) => {
                    if(res.code == 100) {
                        this.resultList = res.data;
                    } else {
                        // Toast(res.msg);
                        this.resultList = res.data;
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err)
                })
            } else {
                searchArticle()
                .then((res) => {
                    this.resultList = res.data;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err)
                })
            }
            
        },
    },
}
</script>

<style lang="less" scoped>
.article-result-item {
    width: 92%;
    margin: 0 auto;
}
</style>