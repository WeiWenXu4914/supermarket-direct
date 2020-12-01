<!-- 发布视频页 -->
<template>
  <div>
    <div class="wrapper">
      <div class="header">
        <span class="cancel" @click="$router.go(-1)">取消</span>
        <span class="write">视频</span>
      </div>
      <div class="tittle">
        <input type="text" placeholder="请输入标题（8-20个字）" />
        <input type="text" placeholder="请输入正文" />
      </div>
      <div class="content">
        <van-uploader v-model="videoList" :after-read="afterRead" multiple :max-count="1" />
      </div>
      <div class="name">封面</div>
      <div class="cover">
        <van-uploader v-model="coverList" :after-read="afterRead" multiple :max-count="1" />
      </div>
      <div class="submit">
        <van-button type="primary">发布</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadVideo } from '@/api'
import { publishVideo } from './actions'
export default {
  components: {},
  data () {
    return {
      videoList: [],
      coverList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    async afterRead (file) {
      console.log(file)
      let content = file.file;
      let data = new FormData();
      data.append('file',content);
      
      const res = await uploadVideo(data)
      console.log(res)
      // if (res.code === 100) {
      //   this.houseForm.img_path = res.data.src
      // } else {
      //   this.$toast.error('图片上传失败')
      // }
    },
  },
  created () {}
}
</script>
<style lang='less' scoped>
.wrapper {
  padding: 0 20px;
  height: 100%;
  position: relative;
  .header {
    text-align: center;
    height: 73px;
    line-height: 73px;
    .cancel {
      float: left;
      font-size: 14px;
      color: #707070;
    }
    .write {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .tittle {
    input {
      width: 100%;
      border: none;
      height: 28px;
      line-height: 28px;
      &:first-child {
        font-size: 18px;
        padding: 7px 0;
        color: #a2a2a2;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
      }
      &:last-child {
        color: #cfcfcf;
        border-bottom: none;
      }
    }
  }
  .content {
    /deep/ .van-uploader__preview {
      // margin-top: 53px;
      width: 114px;
      height: 114px;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .van-uploader {
      margin-top: 53px;
      width: 100%;
      height: 100%;
      .van-uploader__upload {
        width: 114px;
        height: 114px;
      }
    }
  }
  .cover {
    /deep/ .van-uploader__preview {
      // margin-top: 10px;
      // margin-bottom: 55px;
      width: 199px;
      height: 114px;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .van-uploader {
      margin-top: 10px;
      margin-bottom: 55px;
      width: 100%;
      height: 100%;
      .van-uploader__upload {
        width: 199px;
        height: 114px;
      }
    }
  }
  .name {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-top: 16px;
    line-height: 27px;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  .submit {
    position: fixed;
    width: 96%;
    height: 51px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    .van-button {
      width: 100%;
      height: 51px;
      background: #d04443;
      border-radius: 5px;
    }
    .van-button--primary {
      border: none;
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 40px;
  background: #f6f6f6;
  padding-left: 20px;
  .foot_con {
    width: 50%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i::after {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
