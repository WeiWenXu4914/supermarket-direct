<template>
  <div class="maintain">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()"/>
      <p class="p1">家电维修</p>
      <van-button 
        type="primary" 
        @click="submit" 
        :disabled="isDisable" 
        :loading="isDisable">
        发布
      </van-button>
    </div>
    <div class="fromClass">
      <div class="title">
        <input class="title_con font-18" type="text" v-model="mainTainFrom.name" placeholder="请输入标题（8-20个字）" />
      </div>
      <van-field class="inputSet" v-model="mainTainFrom.phone" left-icon="http://api.lejiagx.cn/static/icon/bitian.png" type="tel" label="手机号" placeholder="请输入联系方式" />
      <van-field class="inputSet" left-icon="http://api.lejiagx.cn/static/icon/bitian.png" v-model="mainTainFrom.pay_num" label="价格" placeholder="￥请输入价格" />

      <div class="cover">
        <van-uploader multiple :max-count="9" :after-read="afterRead" v-model="coverList" @delete="imgDel" />
      </div>

      <van-field
        v-model="mainTainFrom.introductory"
        rows="1"
        class="detail"
        autosize
        type="textarea"
        placeholder="详细介绍"
      />
    </div>
  </div>
</template>

<script>
import { mainTain } from './actions'
import { uploadImg } from '@/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      coverList: [],
      imgObj:[],
      mainTainFrom: {
        name: '',
        img_path: [],
        pay_num: '面议 / 电议',
        phone: '',
        introductory: ''
      },
      isDisable:false
    }
  },
  created () {
    this.initUserPhone()
    var data = this.$route.query.id;
    if(data){
      this.mainTainFrom.nid = data
    }
  },
  computed: {
    ...mapState(['user','userMapLoacl'])
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    // 判断用户是否返回手机号码
    initUserPhone () {
      this.mainTainFrom.phone = this.user.phone || ''
    },
    async afterRead (file) {

      this.isDisable = true;

      let content = file.file;
      let data = new FormData();
      data.append('file',content);

      const res = await uploadImg(data)
      if (res.code === 100) {

        this.isDisable = false;

        var imgObj = {
          id:this.imgNum,
          name:file.file.name
        };

        this.imgObj.push(imgObj);
        this.mainTainFrom.img_path.push(res.data.src)
      } else {

        this.$toast.error('图片上传失败')
      }
    },
    imgDel(file){

      for (var i = 0; i < this.imgObj.length; i++) {
        if (this.imgObj[i].name == file.file.name) {
          this.imgObj.splice(i, 1);
          this.mainTainFrom.img_path.splice(i, 1);
        }
      }
    },
    // 发布
    async submit () {
      
      this.isDisable = true;
      for (const key in this.mainTainFrom) {
        if (!this.mainTainFrom[key] && key != 'img_path') return this.$toast('请将信息填写完整')
      }

      const res = await mainTain(this.mainTainFrom)
       if (res.code === 100) {
        this.isDisable = false;
        this.$toast.success('发布成功')
        this.$router.go(-1)
      } else {
        this.$toast.fail(res.msg)
      }
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.maintain {
  .top {
    display: flex;
    margin-top: 0.4rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    button {
      color: #ffffff;
      border-radius: 0.1rem;
      outline: none;
      border: none;
      background-color: #d04443;
      width: 1.5rem;
      height: 0.8rem;
      margin-left: 2rem;
    }
  }
  .fromClass{
    width:90%;
    margin:10px auto;
    .title{
      line-height: 50px;
      border-radius: 0;
      .title_con{
        width: 100%;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid #C4C4C4;
      }
      /deep/ .van-field{
        padding: 0;
        height: 100px;
        margin-top: 15px;
      }
      input {
        width: 100%;
        border: none;
        border-bottom:1px solid #eee;
      }
    }
    .cover {
      width: 100%;
      height: auto;
      margin-top:10px;
    }
    .detail{
      border-top: 1px solid #C4C4C4;
      margin: 15px 0;
      border: none;
      font-size: 15px;
      padding:0px;
    }
    .inputSet{
      height:50px;
      line-height:50px;
    }
  }
}
</style>