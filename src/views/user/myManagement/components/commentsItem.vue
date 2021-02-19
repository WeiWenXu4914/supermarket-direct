<template>
    <div>
        <!--导航标签-->
        <!-- <div class="tags" v-if="datas.length !== 0">
            <button 
            v-for="(item,index) in buttonList" 
            :key="index"
            @click="changeStatu(item)"
            :class="item == choosed ? 'active' : ''">
                {{ item }}
            </button>  
        </div> -->
        <!--内容项-->
        <div class="wrapper" v-for="(item,index) in data" :key="index">
            <div class="title">
                <span>
                    评论于<span>{{ item.name }}</span>
                </span>
                <span><van-icon name="good-job" class="good-icon"/>点赞数：{{ item.mem_comment_like_num }}</span>
            </div>
            <div class="content">
                <!--评论内容-->
                <div class="mine">
                    <h4>评论消息：</h4>
                    <p>{{ item.mem_comment_text }}</p>
                    <div class="imgs" v-if="item.mem_comment_imgs">
                        <img 
                        v-for="item in item.mem_comment_imgs" 
                        :key="item" 
                        :src="item"
                        >
                    </div>
                </div>
                <!--回复内容-->
                <!-- <div class="reply" v-if="item.mem_comment_text">
                    <p class="relation">某人<span>回复</span>我</p>
                    <p class="reply-content">{{ item.mem_comment_text }}</p>
                </div> -->
                <div class="bottom">
                    <span>评论时间：{{ item.mem_comment_addtime }}</span>
                    <img src="../img/delete.png" @click="deleteItem(item)">
                </div>
            </div>
        </div> 
        <van-empty description="无评论信息" v-show="data.length == 0"/>
    </div>
</template>

<script>
import { Icon,Empty,Dialog,Toast } from 'vant';
import { myCommentdel } from '../../actions/index';
export default {
    props: ['index','dataListMsg'],
    data() {
        return {
            data: [],
        }
    },
    mounted() {
        this.filterData();
    },
    methods: {
        //过滤数据
        filterData() {
            if(this.index === 0) {
                this.data = this.dataListMsg;

                
            } else if(this.index == 1) {

                this.data = this.dataListMsg.filter( item => item.mem_comment_class == 1 );

            } else if(this.index == 2) {

                this.data = this.dataListMsg.filter( item => item.mem_comment_class == 2 );

            } else if(this.index == 3) {

                this.data = this.dataListMsg.filter( item => item.mem_comment_class == 3 );

            } else {

                this.data = this.dataListMsg.filter( item => item.mem_comment_class == 4 );

            }
        },
        //导航小标签
        // changeStatu(item) {
        //     this.choosed = item;
        //     if(this.datas.length === 0) {
        //         this.datas = this.data;
        //     }

        //     if(item == '全部') {
        //         this.data = this.datas;
        //     } else if(item == '未删除') {
        //         this.data = this.datas.filter( item => item.mem_comment_del == 0 );
        //     } else if(item == '已删除') {
        //         this.data = this.datas.filter( item => item.mem_comment_del == 1 );
        //     }

        // },
        //删除数据
        deleteItem(item) {
            Dialog.confirm({
                title: '确定要删除吗',
                // message: '确定要删除吗',
            })
            .then(() => {
                myCommentdel(item.mcid)
                .then((res) => {
                    if(res.code == 100) {
                        Toast("删除成功");
                        //分别从全部数据和组件内单独数据删除对应项
                        for(let i = 0; i < this.dataListMsg.length; i++){
                            if(this.dataListMsg[i].mcid === item.mcid){
                                this.dataListMsg.splice(i,1);
                            }
                        }
                        for(let i = 0; i < this.data.length; i++){
                            if(this.data[i].mcid === item.mcid){
                                this.data.splice(i,1);
                            }
                        }
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
    }
}
</script>

<style lang="less" scoped>
.tags {
        padding: 10px 0;
        // border-bottom: 1px solid #e9e7e7;
        button {
            border: none;
            background-color: #f2f2f2;
            padding: 6px 10px;
            border-radius: 18px;
            margin-left: 20px;
            color: #262626;
            font-size: 13px;
        }
        .active {
            background-color:#D04443;
            color: #fff;
        }
}
.wrapper {
    display: flex;
    flex-direction: column;
    width: 92%;
    margin: 0 auto;
    padding: 15px 0;
    font-family: Source Han Sans CN;
    // background-color: #dbd9d9;
    border-bottom: 1px solid #ccc;
    //评论头部信息
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;
        span {
            
            .good-icon {
                transform: translateY(1px);
            }
            color: #3A3A3A;
            span {
                color: #D04443;
                font-size: 15px;
                font-weight: bold;
                padding-left: 5px;
            }
        }
        
    }
    //评论内容
    .content {
        display: flex;
        flex-direction: column;
        .mine {
            p {
                text-indent: 2em;
                margin: 10px 0;
                color: #2C2C2C;
                font-size: 13px;
            }
            .imgs {
                display: flex;
                flex-wrap: wrap;
                padding: 10px 0;
                img {
                    margin-top: 8px;
                    margin-left: 25px;
                    width: 80px;
                    height: 80px;
                    border-radius: 2px;
                } 
            }
        }
        .reply {
            // margin-left: 2em;
            background: #F4F4F4;
            margin-top: 10px;
            .relation {
                color: #3A3A3A;
                font-size: 14px;
                font-weight: 600;
                padding: 10px 0;
                margin-left: 7px;
                span {
                    font-size: 12px;
                    padding: 0 4px;
                    color: #929292;
                    font-weight: normal;
                }
            }
            .reply-content {
                margin-left: 7px;
                padding-bottom: 20px;
                font-size: 13px;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            font-size: 12px;
            color:#5E5E5E;
            img {
                width: 20px;
                height: 20px;
                margin-right: 15px;
            }
        }
    }
}
</style>