<template>
    <div>
        <div
            class="item"
            v-for="(val, inx) in resultList"
            :key="inx"
            @click="userHandle(val.entid)"
        >
            <div class="img">
                <img :src="val.ent_logo" alt v-if="val.ent_name" />
            </div>
            <div class="center">
                <div class="title">
                    <div class="name">
                        {{ val.ent_name }}
                    </div>
                    <div class="msg">
                        {{ val.ent_detailed_site }}
                    <span>|</span>
                        {{ val.ent_remark }}
                    </div>
                    <div class="star">
                        <div class="star-rate">
                            <van-rate
                            v-model="val.ent_grade"
                            :size="20"
                            color="#ffd21e"
                            void-icon="star"
                            void-color="#eee"
                            readonly
                            />
                        </div>
                        <div class="score">{{ val.ent_grade }}.0</div>
                    </div>
                </div>
            
            </div>
            <div class="right">
                <div>进店</div>
            </div>
        </div>
        <van-empty image="search" description="无相关内容，请切换搜索关键词试试" v-if="resultList.length == 0 && !loading"/>

        <van-loading color="#1989fa" vertical style="position:absolute;top:5rem;left:50%;transform:translateX(-50%);" v-show="loading"/>
    </div>
</template>

<script>
import { phoneSearch } from '../actions';
import { Toast, Empty } from 'vant';
export default {
    props: ['searchValue','active3'],
    data() {
        return {
            resultList: [],
            prvUrl: '',
            loading: false,
        }
    },
    watch: {
        'searchValue': function () {
            if(this.active3 == 2) {
                this.getData();
            }
        },
        'active3': function () {
            if(this.active3 == 2) {
                this.getData();
            }
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {

            if(this.searchValue != "") {
                this.loading = true;
                phoneSearch(this.searchValue)
                .then((res) => {
                    if(res.code == 100) {
                        this.resultList = res.data.list;
                        this.prvUrl = res.data.prvUrl;
                    } else {
                        // Toast(res.msg);
                        this.resultList = res.data.list;
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                })
            } else {
                
            }
            
        },
        // 去企业首页
        userHandle(id) {
            var obj = {
                entid: id,
                entfid: this.prvUrl.entfid,
            };

            var res = this.$Utils.demoRequest(JSON.stringify(obj));

            this.$router.push({
                path: this.prvUrl.href,
                query: { res: res },
            });
        },
    },
}
</script>

<style>

</style>