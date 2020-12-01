<template>
    <div class="forward-item">
        <div class="tags">
            <!--导航标签-->
            <div v-if="datas.length !== 0">
                <button 
                v-for="(item,index) in buttonList" 
                :key="index"
                @click="changeStatu(item)"
                :class="item == choosed ? 'active' : ''">
                    {{ item }}
                </button>
            </div>
            <!--内容-->
            <div v-for="(item,index) in data" :key="index" @click="goDetail(item)">
                <div class="wrapper">
                    <div class="left">
                        <h6>转发自{{ type(item) }}</h6>
                        <h5>{{ item.name }}</h5>
                        <!-- <p>{{ item.mem_forward_del == 0 ? "未取消" : "取消" }}</p> -->
                    </div>
                    <div class="right" v-if="item.img">
                        <img :src="item.img">
                    </div>
                </div>
                <div class="function">
                    <div class="left">
                        <span>转发日期：{{ time(item.mem_forward_addtime) }}</span>
                        <span>点击次数：{{ item.mem_forward_click_num }}</span>
                    </div>
                    <div class="right">
                        <img src="../img/delete.png" alt="" @click="deleteItem(item)">
                    </div>
                </div>
            </div>
            <van-empty description="无转发信息" v-show="data.length === 0"/>
        </div>
    </div>
</template>

<script>
import { Toast, Empty, Dialog } from 'vant';
import { myforwarddel } from '../../actions/index';
export default {
    props: ['index','dataListMsg'],
    data() {
        return {
            buttonList: ['全部','进行中'],
            choosed: '全部',
            data: [],
            datas: [] //过渡元素
        }
    },
    watch: {
        'index':function() {
            this.filterData();
        }
    },
    mounted() {
        this.filterData();
    },
    methods: {
         goDetail(val) {
            this.$router.push(`/myForwardDetail/${val.mfid}`);
        },
        //过滤数据
        filterData() {
            if(this.index === 0) {
                this.data = this.dataListMsg;
                this.datas = this.data;
            } else if(this.index == 1) {
                this.data = this.dataListMsg.filter( item => item.mem_forward_class == 1 );
                this.datas = this.data;
            } else if(this.index == 2) {
                this.data = this.dataListMsg.filter( item => item.mem_forward_class == 2 );
                this.datas = this.data;
            } else if(this.index == 3) {
                this.data = this.dataListMsg.filter( item => item.mem_forward_class == 3 );
                this.datas = this.data;
            } else {
                this.data = this.dataListMsg.filter( item => item.mem_forward_class == 4 );
                this.datas = this.data;
            }
        },
        //导航小标签
        changeStatu(item) {
            this.choosed = item;
            if(this.datas.length === 0) {
                this.datas = this.data;
            }

            if(item == '全部') {
                this.data = this.datas;
            } else if(item == '进行中') {
                this.data = this.datas.filter( item => item.mem_forward_state == 0 );
            } else if(item == '已完成') {
                this.data = this.datas.filter( item => item.mem_forward_state == 1 );
            } else if(item == '失败') {
                this.data = this.datas.filter( item => item.mem_forward_state == 2 );
            }

        },
        //类型（内容中）
        type(item) {
            if(item.mem_forward_class == 1) {
                return "文章";
            } else if(item.mem_forward_class == 2) {
                return "商户";
            } else if(item.mem_forward_class == 3) {
                return "用户 ";
            }
        },
        //删除数据
        deleteItem(item) {
            Dialog.confirm({
                title: '确定要删除吗',
                // message: '确定要删除吗',
            })
            .then(() => {
                myforwarddel(item.mfid)
                .then((res) => {
                    if(res.code == 100) {
                        Toast("删除成功");
                        //分别从全部数据和组件内单独数据删除对应项
                        for(let i = 0; i < this.dataListMsg.length; i++){
                            if(this.dataListMsg[i].mfid === item.mfid){
                                this.dataListMsg.splice(i,1);
                            }
                        }
                        for(let i = 0; i < this.data.length; i++){
                            if(this.data[i].mfid === item.mfid){
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
        //裁剪时间
        time(item) {
            return item.split(' ')[0];
        } 
    }
}
</script>

<style lang="less" scoped>
.forward-item {
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
        .wrapper {
            display: flex;
            width: 92%;
            margin: 0 auto;
            padding-top: 25px;
            justify-content: space-between;
            .left {
                display: flex;
                flex-direction: column;
                // justify-content: space-between;
                h6 {
                    font-size: 12px;
                    color:#D04443;
                }
                h5 {
                    margin-top: 10px;   
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
                p {    
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
            border-bottom: 1px solid #e9e7e7;
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
}
</style>