<template>
  <div class="join">
    <div class="title">
      <van-row>
        <van-col span="8" class="icon"><van-icon name="arrow-left" /></van-col>
        <van-col span="8" class="text">推广</van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>
    <div class="body">
      <div class="body1">
        <p class="t1">加入乐家市场的优势</p>
        <p class="t2">图片</p>
      </div>
      //以下代码实现输入图片和文字描述功能
<!--      <div class="body3">-->
<!--        <div class="disimg">-->
<!--          <van-uploader-->
<!--            v-model="fileList"-->
<!--            multiple-->
<!--            max-count="4"-->
<!--            show-upload="true"-->
<!--            preview-size="100"-->
<!--            upload-text="上传图片"/>-->
<!--        </div>-->
<!--        <div class="text">-->
<!--          <van-field-->
<!--            v-model="message"-->
<!--            rows="2"-->
<!--            autosize-->
<!--            label="描述"-->
<!--            type="textarea"-->
<!--            maxlength="100"-->
<!--            placeholder="加入乐家市场的优势"-->
<!--            show-word-limit-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
      <div class="body2">
        <button>申请加入乐家市场</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:'',
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
      ],
    };
  },
methods:{
}
}
</script>

<style lang="less">
.join{
  width: 95%;
  margin: 0 auto;
  margin-top: 5px;
}
.title{
.icon{
  height: 25px;
  display: flex;
  align-items: center;
}
.text{
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}
}
.body{
  .body1{
    text-align: center;
    padding-top: 120px;
    .t1{
      font-size: 20px;
      font-weight: 600;
    }
    .t2{
      font-size: 20px;
      font-weight: 600;
    }
  }
  .body3{
    .text{
      margin-top: 30px;
      .van-field__label {
        -webkit-box-flex: 0;
        -webkit-flex: none;
        flex: none;
        box-sizing: border-box;
        width: 1.4rem;
      }
    }
    .disimg{
      margin-top: 20px;
    }
  }
  .body2{
    button{
      width: 90%;
      margin: 0 auto;
      background-color: #D04443;
      color: white;
      border: 0;
      border-radius: 2px;
      height: 45px;
      font-size: 15px;
      position: absolute;
      bottom: 10px;
      left: 18px;
    }
  }
}
</style>
