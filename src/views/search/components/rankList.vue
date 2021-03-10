<template>
    <div class="search-rank-list">
        <div class="title">
            <img src="../img/crown.svg" alt="">
            <h4>{{ title }}</h4>
            <span>{{ message }}</span>
        </div>
        <div 
         class="rank-item" 
         v-for="(item, index) in dataList" 
         :key="index"
         @click="toDetail(item)"
        >
            <div 
             class="order-number"
             :class="[index === 0 ? 'first' : '',index === 1 ? 'second': '', index === 2 ? 'third': '']"
            >
                {{ index + 1 }}
            </div>
            <span class="pro-name">{{ item.name }}</span>
            <img src="../img/arrow-right.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: ['dataList', 'title', 'message'],
    methods: {
        toDetail(item) {
            if (item.pro_id || item.proid) {
                this.toGoodsDeail(item);
            } else if (item.gc_id == 2) {
                this.toVideoDetail(item);
            } else if (item.entid) {
                this.toStoreDetail(item);
            } else if (item.gc_id == 1) {//文章
                this.$router.push({
                    path: `/article/detail/${item.gid}`,
                    // query: { type: "pl" },
                });
            }
        },
        toGoodsDeail(item) {
            let obj = {
                proid: item.pro_id || item.proid
            };
            let res = this.$Utils.demoRequest(JSON.stringify(obj));
            this.$router.push({
                path:'/commdityPay',
                query:{
                    res: res
                }
            });
        },
        toStoreDetail(item) {
            var obj = {
                entid: item.entid,
                entfid: 0,
            };

            var res = this.$Utils.demoRequest(JSON.stringify(obj));

            this.$router.push({
                path: "/merchants",
                query: { res: res },
            });
        },
        toVideoDetail(val) {

            if (val.video.graphic_width / val.video.graphic_height < 1) {
                this.$router.push(`/article/full_screen_play/${val.gid}`);
            } else {
                this.$router.push(`/videoDetail/${val.gid}`);
            }
            
        }
    }
}
</script>

<style lang="less">
.search-rank-list {
    width: 250px;
    margin-left: 3vw;
    border-radius: 10px;
    background-color: #fff;
    .title {
        display: flex;
        align-items: flex-end;
        height: 30px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: linear-gradient(to bottom, #FEF7DA, #FFFAE7, #FFFCF3,#fff);
        img {
            width: 30px;
            height: 30px;
            margin: 0 4px 0 8px;
        }
        h4 {
            font-size: 18px;
            color: #995C2F;
        }
        span {
            font-size: 14px;
            padding: 1px 6px;
            color: #935F38;
        }
    }
    .rank-item:active {
        background: #ccc;
    }
    .rank-item {
        width: 94%;
        margin: 0 auto;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        height: 45px;
        align-items: center;
        font-size: 15px;
        img {
            width: 20px;
            height: 20px;
        }
        .order-number {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 3px;
            color: #F6AA88;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .first {
            background: linear-gradient(to top, #FF0300, #ED380D);
            color: #fff;
        }
        .second {
            background-image: linear-gradient(to top, #FF4900, #F17810);
            color: #fff;
        }
        .third {
            background-image: linear-gradient(to top, #F17712, #FF8B00);
            color: #fff;
        }
        .pro-name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: calc(94% - 15px);
            padding-left: 10px;
        }
    }
}
</style>