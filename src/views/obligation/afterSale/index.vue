<template>
    <div class="return-type">
        <title-view :title='functionType'></title-view>
        <div class="title-type">
            <span>申请类型</span>
            <span>我要{{ functionType }}</span>
            <!-- <van-icon name="arrow" class="right-icon"/> -->
        </div>

        <div class="reason" @click="chooseType">
            <span>申请原因</span>
            <span :style="reason == '' ? '' : 'color: black;'">
                {{ reason == '' ? '点击选择申请原因' : reason }}
            </span>
            <van-icon name="arrow" class="right-icon"/>
        </div>

        <!-- <div class="title-type" v-if="functionType == '退款' ? true : false">
            <span>收货状态</span>
            <span>已收到货</span>
        </div> -->

        <div class="money" v-if="functionType == '换货' ? false : true">
            <span>退款金额</span>
            <p>￥<span>{{ money }}</span></p>
        </div>
        <!--图文并茂区域-->
        <div class="pic-describe">
            <span>申请说明</span>
            <van-field
				v-model="description"
				rows="2"
                :maxlength="100"
				autosize
				type="textarea"
				placeholder="在此填写退款原因"
                class="input-item"
			/>
            <van-uploader 
            v-model="fileList" 
            multiple
            :after-read="afterRead"
            :max-count="4"
            class="upload" />
        </div>
        <!--选择售后原因-->
        <van-popup v-model="chooseShow" position="bottom">
            <van-picker
            title="原因"
            show-toolbar
            v-model="reason"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            />
        </van-popup>
        
        <div class="submit" @click="submit">
            提交申请
        </div>
    </div>
</template>

<script>
import titleView from '../../../components/public_views/titleView';
import { Popup,Icon,Picker,Uploader, Toast } from 'vant';
import { afterSalesService, orderRefund } from '../actions/index';
import { uploadImg } from '../../../api/index';
export default {
    components: {
        titleView
    },
    data() {
        return {
            functionType:'',
            chooseShow: false,  //选择组件
            reason: '',
            columns: ['收到商品有问题', '和预期不符', '质量问题', '材质与商品描述不符', '卖家发错货', '收到商品有问题', '其他'],
            description: '',
            fileList: [],
            imgList:[],
            orderData: {},
            money: ''
        }
    },
    created() {
        //用于判断售后类型
        this.functionType = this.$route.query.type;
        //订单信息
        this.orderData = JSON.parse(this.$route.query.orderInfo);
        this.money = parseFloat(this.orderData.buy_pice).toFixed(2);

    },
    methods: {
        chooseType() {
            this.chooseShow = true;
        },
        onConfirm(val) {
            this.reason = val;
            this.chooseShow = false;
        },
        onCancel() {
            this.chooseShow = false;
        },
        afterRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';
            
            let content = file.file;
            let data = new FormData();
            data.append('file',content);
                uploadImg(data)
                .then((res) => {
                    if(res.code == 100) {
                        file.status = 'done';
                        file.message = '上传成功';

                        this.fileList[this.fileList.length - 1].url = res.data.src;
                    } else {
                        file.status == 'failed'
                        file.message = '上传失败';
                    }
                })

        },
        submit() {

            const reg = /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\s]/;
            if (reg.test(this.description) && this.description.length === 1) {
                Toast("申请说明不得单独提交特殊字符")
            }

            if(this.reason == '') {
                Toast.fail("请选择申请原因");
                return;
            }

            //处理图片
            this.fileList.forEach((element) => {
                this.imgList.push(element.url);
            });
            this.imgList = [...new Set(this.imgList)];
            
            const obj = {
                reason: this.reason + "&&&" + this.description,
                proof_pics:  this.imgList
            }

            if (this.functionType === "退货退款") {
                obj.oid = this.orderData.oid;
                afterSalesService(obj)
                .then((res) => {
                    Toast(res.msg);
                    setTimeout(() => {
                        this.$router.go(-1);
                    },1500)
                })
                .catch((err) => {
                    Toast("请求出错");
                })
            } else {
                obj.order_number = this.orderData.order_number;
                orderRefund(obj)
                .then((res) => {
                    Toast(res.msg);
                    setTimeout(() => {
                        this.$router.go(-1);
                    },1500)
                })
                .catch((err) => {
                    Toast("请求出错");
                })
            }


        }

    }
}
</script>

<style lang="less">
.return-type {
    font-size: 16px;
    font-family: Source Han Sans CN;
    .title-type {
        display: flex;
        position: relative;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #E1E1E1;
        span:nth-of-type(1) {
            margin-left: 5%;
            color: #3B3B3B;
        }
        span:nth-of-type(2) {
            margin-left: 10%;
            color:#191919;
        }
        .right-icon {
            position: absolute;
            right: 4%;
            color: #B9B9B9;
        }
    }
    .reason {
        display: flex;
        position: relative;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #E1E1E1;
        span:nth-of-type(1) {
            margin-left: 5%;
            color: #3B3B3B;
        }
        span:nth-of-type(2) {
            margin-left: 10%;
            color:#868686;
        }
        .right-icon {
            position: absolute;
            right: 4%;
            color: #B9B9B9;
        }
    }
    .money {
        border-bottom: 1px solid #E1E1E1;
        span {
            display: inline-block;
            padding: 15px 0 8px 5%;
            color: #3B3B3B;
        }
        p {
            font-size: 16px;
            font-family: DIN;
            margin-left: 5%;
            color: #242424;
            span {
                font-size: 24px;
                margin-bottom: 15px;
                padding: 0;
            }
        }
    }
    .pic-describe {
        width: 100%;
        padding-bottom: 15px;
        border-bottom: 100px solid #fff;
        span {
            display: block;
            padding: 15px 0 8px 5%;
            color: #3B3B3B;
        }
        .input-item {
            margin-left: 5%;
            width: 90%;
            border: none !important;
            textarea {
                width: 100%;
                height: 100%;
                border: none !important;
            }
            /deep/.van-cell {
                border: none !important;
            }
        }
        .upload {
            margin: 15px 0 0 5%;
        }
    }
    .submit {
        // position: fixed;
        bottom: 15px;
        width: 90%;
        height: 50px;
        margin-left:5%;
        line-height: 50px;
        color: #FFFFFF;
        font-size: 18px;
        font-family: Source Han Sans CN;
        text-align: center;
        background: #D04443;
        border-radius: 3px;
    }
}
</style>