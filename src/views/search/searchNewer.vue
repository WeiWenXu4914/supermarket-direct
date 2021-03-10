<template>
    <div class="search-new-first-page">
        <div class="top-area">
            <van-icon 
             name="arrow-left" 
             class="arrow-left-icon"
             size=".5rem"
             @click="back"
            />
            <van-search
             class="search"
             v-model="value"
             placeholder="请输入搜索关键词"
             @search="onSearch"
            />
            <button class="search-button" @click="onSearch">搜索</button>
        </div>
        <div class="search-history" v-if="searchHistory.length">
            <div class="search-top">
                <h3>搜索历史</h3>
                <img src="./img/trach.svg" alt="" @click="removeAllHistory">
            </div>
            <div class="history-item-wrapper">
                <div 
                class="history-item"
                v-for="(item, index) in searchHistoryView"
                :key="item"
                @touchstart="historyTouchStart(index)"
                @touchend="historyTouchEnd()"
                @click="hisClick(item)"
                > 
                    {{ item }}
                </div>
                <div class="history-item" v-if="isShowAllHis" @click="showAllHistory">
                    <van-icon name="arrow-down" size=".4rem" />
                </div>
            </div>
        </div>
        <div class="rank-list-wrapper">
            <rankList
             title="热销商品"
             message="精选商品"
             :dataList="dataListGoods"
            />
            <rankList
             title="热点资讯"
             message="好物甄选"
             :dataList="dataListVideos"
            />
            <div class="last-rank-list">
                <rankList
                title="新入商企"
                message="强势入驻"
                :dataList="dataListEnterprise"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { Search, Icon, Dialog } from 'vant';
import { orderRanking, graphicRanking, enterpriseRanking } from './actions/index';
import rankList from './components/rankList';
export default {
    data() {
        return {
            value: "",
            dataListGoods: [],
            dataListVideos: [],
            dataListEnterprise: [],
            searchHistory: [],
            searchHistoryView: [],
            timer: null,
            isShowAllHis: false,
        }
    },
    created() {
        this.getSearchHistory();
        this.getData();
    },
    activated() {
        this.getSearchHistory();
    },
    components: {
        rankList,
    },
    methods: {
        back() {
            this.value = "";
            this.$router.go(-1);
        },
        onSearch() {
            
            this.$router.replace({
                path: "/searchNew",
                name: 'searchNew',
                params: {
                    value: this.value
                }
            })
            this.value = "";
        },
        hisClick(item) {
            clearInterval(this.timer)
            this.$router.replace({
                path: "/searchNew",
                name: 'searchNew',
                params: {
                    value: item
                }
            })
            this.value = "";
        },
        async getData() {
            const res1 = await orderRanking()
            this.dataListGoods = res1.data;
            this.dataListGoods.map((item) => {
                item.name = item.pro_name;
            })
            
            const res2 = await graphicRanking();
            this.dataListVideos = res2.data;
            this.dataListVideos.map((item) => {
                item.name = item.graphic_name;
            })

            const res3 = await enterpriseRanking();
            this.dataListEnterprise = res3.data;
            this.dataListEnterprise.map((item) => {
                item.name = item.ent_name;
            })
        },
        getSearchHistory() {
            if(window.localStorage.searchHistory !== undefined) {
                this.searchHistory = JSON.parse(window.localStorage.searchHistory).reverse();
                if (this.searchHistory.length > 10) {
                    this.searchHistoryView = this.searchHistory.slice(0, 9);
                    this.isShowAllHis = true;
                } else {
                    this.searchHistoryView = this.searchHistory;
                }
            }
        },
        historyTouchStart(index) {
            this.timer = setInterval(() => {
                clearInterval(this.timer)
                this.removeHistory(index)
            },1000)
        },
        historyTouchEnd() {
            clearInterval(this.timer)
        },
        removeHistory(index) {
            Dialog.confirm({
                message: '确认删除该历史记录？',
            }).then(() => {
                this.searchHistory.splice(index,1);
                if(this.searchHistory.length !== 0) {
                    window.localStorage.searchHistory = JSON.stringify(this.searchHistory.reverse());
                }
                this.getSearchHistory()
            }).catch(() => {

            })
        },
        removeAllHistory() {
            Dialog.confirm({
                message: '确认删除全部历史记录？',
            }).then(() => {
                this.searchHistory = []
                window.localStorage.removeItem('searchHistory');
            }).catch(() => {

            })
        },
        showAllHistory() {
            this.searchHistoryView = this.searchHistory;
            this.isShowAllHis = false;
        }
    }
}
</script>

<style lang="less">
.search-new-first-page {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #fff,#F2F2F2);
    user-select: none;
    .top-area {
        display: flex;
        align-items: center;
        width: 100vw;
        .arrow-left-icon {
            padding: 0 0px 0 10px;
        }
        .search {
            flex-grow: 1;
        }
        .search-button {
            margin-right: 10px;
            width: 60px;
            height: 27px;
            border-radius: 18px;
            color: #fff;
            border: none;
            background: linear-gradient(to top right, #e93c3b, #FF9002);
        }
        .search-button:active {
            background-color: #FF9002;
        }
    }
    .search-history {
        width: 94vw;
        margin: 0 auto;
        margin-top: 10px;
        .history-item-wrapper {
            margin-top: 10px;
        }
        .search-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #111;
            img {
                width: 20px;
                height: 23px;
                margin-right: 10px;
            }
        }
        .history-item {
            display: inline-block;
            color: #666666;
            font-size: 13px;
            padding: 6px 10px;
            margin: 3px 8px;
            background-color: #F8F8F8;
            border-radius: 20px;
        }
        .history-item:active {
            background-color: #ccc;
        }
    }
    .rank-list-wrapper {
        display: flex;
        width: 100vw;
        overflow: scroll;
        margin-top: 15px;
        .search-rank-list {
            display: inline-block;
        }
        .last-rank-list {
            box-sizing: content-box;
            padding-right: 50px;
        }
    }
}
</style>