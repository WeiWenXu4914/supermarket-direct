<template>
    <div class="obligation-commdity-appraise">
        <title-view title="发表评价" :border="false"></title-view>
        <div class="info">
            <img :src="data.pro_thumbnail" alt="">
            <h6>{{ data.pro_name }}</h6>
            <span>物流配送</span>
        </div>
        <div class="appraise">
            <div class="item">
                <h6>商品描述</h6>
                <van-rate
                 class="rate"
                 v-model="value1"
                 :size="18"
                 color="#ffd21e"
                 void-icon="star"
                 void-color="#eee"
                /> 
            </div>
            <div class="item">
                <h6>物流服务</h6>
                <van-rate
                 class="rate"
                 v-model="value2"
                 :size="18"
                 color="#ffd21e"
                 void-icon="star"
                 void-color="#eee"
                /> 
            </div>
        </div>
        <div class="pic-describe">
            <van-field
				v-model="description"
				rows="2"
                :maxlength="30"
				autosize
				type="textarea"
				placeholder="说说你的使用心得哦~"
                class="input-item"
			/>
            <span>{{ textNum }}/30</span>
            <van-uploader 
            v-model="fileList" 
            multiple
            :after-read="afterRead"
            @delete="deleteImg"
            :max-count="4"
            class="upload" />
        </div>
        <button class="submit" @click="submit">提交评价</button>
    </div>
</template>

<script>
import titleView from '../../components/public_views/titleView';
import { Picker,Uploader, Toast } from 'vant';
import { uploadImg } from '../../api/index';
import { GoodsComments,overMarkadd } from './actions/index';
export default {
    components: {
        titleView
    },
    data() {
        return {
            data: {},
            value1: 5,
            value2: 5,
            value3: 5,
            description: '',
            textNum: 0,
            fileList: [],
            imgList: []
        }
    },
    watch: {
        'description': function() {
            this.textNum = this.description.length;
        }
    },
    created() {
        this.data = JSON.parse(this.$route.query.data);
        console.log(this.data)
    },
    methods: {
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
                        // this.imgList.push(res.data.src);
                        
                        this.fileList[this.fileList.length - 1].url = res.data.src;
                        console.log(this.fileList)
                    } else {
                        file.status == 'failed'
                        file.message = '上传失败';
                    }
                })

        },
        deleteImg(file) {
            console.log(this.fileList)
        },
        submit() {
            if(this.description == '') {
                Toast("请输入评论内容");
                return;
            }
 
            this.fileList.forEach((element) => {
                this.imgList.push(element.url);
            });
            this.imgList = [...new Set(this.imgList)];

            console.log(this.imgList)

            // let obj = {
            //     id: this.data.proid,
            //     text: this.description,
            //     state: 1
            // }
            //内容
            // GoodsComments(obj)
            // .then((res) => {
            //     Toast.success("评论成功");
            //     this.$router.go(-1);
            // })
            // .catch((err) => {
            //     console.log(err);
            // })
            //评分
            let result = {
                order_number: this.data.order_number,
                order_mark: this.value1,
                logistics_num: this.value2,
                text: this.description,
                imgs: this.imgList
            }
            overMarkadd(result)
            .then((res) => {
                console.log(res);
                Toast.success("评论成功");
                setTimeout(() => {
                    this.$router.go(-1);
                },1000)
            })
            .catch((err) => {
                console.log(err)
                Toast("请求出错");
            })
        }
    }
}
</script>

<style lang="less">
.obligation-commdity-appraise {
    .info {
        display: flex;
        position: relative;
        width: 100%;
        height: 80px;
        align-items: center;
        font-family: Source Han Sans CN;
        border-bottom: 1px solid #E1E1E1;
        img {
            width: 50px;
            height: 50px;
            margin-left: 5%;
        }
        h6 {
            padding-left: 8px;       
            font-size: 16px;
            font-weight: normal;
            color: #282828;
            transform: translateY(-40%);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        span {
            position: absolute;
            right: 5%;
            top: 20px;
            background-color: #D04443;
            font-weight: 400;
            font-size: 12px;
            color: #fff;
            padding: 0 3px;
        }
    }
    .appraise {
        // display: flex;
        width: 100%;
        // align-items: center;
        border-bottom: 10px solid #F6F6F6;
        h6 {
            display: inline;    
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #2C2C2C;
        }
        .item {
            display: block;
            width: 300px;
            margin-left: 5%;
            padding-bottom: 15px;
        }
        .item:nth-of-type(1) {
            padding-top: 15px;
        }
        .rate {
            margin-left: 10px;
            transform: translateY(10%);
        }
    }
    .pic-describe {
        position: relative;
        width: 100%;
        padding-bottom: 15px;
        border-bottom: 30px solid #fff;
        span {
            display: block;
            position: absolute;
            padding: 15px 0 8px 5%;
            color: #3B3B3B;
            right: 8%;
            top: 25%;
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
        }
        .van-cell {
            margin-top: 10px;
            border: none !important;
            padding: 0;
            border-bottom: none;
            height: 100px;
        }
        .upload {
            margin: 15px 0 0 5%;
        }
    }
    .submit {
        height: 50px;
        width: 90%;
        margin-left: 5%;
        outline: none;
        border: none;
        background: #D04443;
        font-size: 18px;
        color: #fff;
        font-weight: 300;
        border-radius: 3px;
    }
}
</style>