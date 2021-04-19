<template>
    <div class="my-likes-count">
        <title-view title="我的点赞"></title-view>
        <!--内容-->
        <div v-if="dataList.length !== 0">
            <div v-for="item in dataList" :key="item.g_rel_id" class="data">
                <div class="wrapper"  @click="toDetail(item)">
                    <div class="left">
                        <h5>{{ item.name }}</h5>
                        <span>点赞类型：{{ type(item) }}</span>
                    </div>
                    <div class="right" v-if="item.img">
                        <img :src="item.img">
                    </div>
                </div>
                <div class="function">
                    <div class="left">
                        <span>点赞日期：{{ item.mem_like_addtime }}</span>
                    </div>
                    <div class="right">
                        <img src="./img/delete.png" alt="" @click="deleteItem(item)">
                    </div>
                </div>
            </div>
        </div>
        <van-empty description="无点赞信息" v-else/>
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import { myMemberLike, myMemberLikeDel } from '../actions/index';
import { Toast, Empty, Dialog } from 'vant';

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
            duration: 0
        });
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            myMemberLike()
            .then((res) => {
                
                if(res.code == 100) {
                    this.dataList = res.data.filter(item => item.mem_like_del != 1);
                }
                
                Toast.loading({
                    duration: 1
                });
            })
            .catch((err) => {
                Toast.fail("请求出错");
            })
        },
        type(item) {
            if(item.mem_like_class == 1) {
                return '文章';
            } else if(item.mem_like_class == 1) {
                return '商品';
            } else {
                return '商户';
            }
        },
        //删除数据
        deleteItem(item) {
            Dialog.confirm({
                title: '确定要删除吗',
                // message: '确定要删除吗',
            })
            .then(() => {
                myMemberLikeDel(item.mlid)
                .then((res) => {
                    if(res.code == 100) {
                        Toast("删除成功");
                        this.getData();
                    } else {
                        Toast("删除失败");
                    }
                })
                .catch(() => {
                    Toast.fail("请求出错");
                })
            })
            .catch(()=> {

            })
            
        },
        //跳转详情
        toDetail(item) {
            if (item.gc_id == 4) {

                var data = this.$Utils.demoRequest(JSON.stringify(item.mem_like_id));

                this.$router.push({
                path: '/zz_job',
                query: {res: data}
                })
            }else if(item.gc_id == 3){

                var data = this.$Utils.demoRequest(JSON.stringify(item.mem_like_id));

                this.$router.push({
                path: '/zz_rentting',
                query: {res: data}
                })

            } else{

                this.$router.push(`/article/detail/${item.mem_like_id}`);

            }
        }
    }
}
</script>

<style lang="less" scoped>
.my-likes-count {
    .data {
        margin: 15px auto;
        background-color: #fafafa;
        width: 92%;
        border-radius: 4px;
    }
    .wrapper {
            display: flex;
            width: 92%;
            margin: 0 auto;
            padding-top: 25px;
            justify-content: space-between;
            .left {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                h5 {   
                    font-size: 17px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #252525;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                span {    
                    padding-top: 5px;
                    font-size: 12px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #D04443;
                    // margin: 0 0 8px 5px;
                }
            }
            .right {
                padding-left: 8px;
                img:nth-of-type(1) {
                    width: 105px;
                    height: 70px;
                }
            }
        }
        .function {
            display: flex;
            justify-content: space-between;
            width: 92%;
            margin: 0 auto;
            padding: 12px 0;
            .left {
                span {
                    color: #5E5E5E;
                    font-family: Source Han Sans CN;
                    font-size: 12px;
                }
                span:nth-of-type(2) {
                    margin-left: 10px;
                }
            }
            .right {
                img {
                    width: 18px;
                    height: 18px;
                }
                margin-right: 8px;
            }
        }
}
</style>