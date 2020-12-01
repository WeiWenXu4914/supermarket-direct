<!-- 卖房页 -->
<template>
  <div class='wrapper'>
    <page-title title="卖房"></page-title>
    <!-- <div class="submit m-t" @click="submit" :disabled="isDisable"> -->
      <!-- 发布 -->
    <!-- </div> -->
    <van-button 
      :disabled="isDisable" 
      :loading="isDisable" 
      @click="submit" 
      type="primary" 
      size="small" 
      class="submit">
      发布
    </van-button>
    <div class="title">
      <input class="title_con font-18" type="text" v-model="houseForm.name" placeholder="请输入标题（8-20个字）" />
    </div>
    <van-field class="inputSet" v-model="houseForm.phone" left-icon="http://api.lejiagx.cn/static/icon/bitian.png" type="tel" label="手机号" placeholder="请输入联系方式" />
    <van-field class="inputSet" left-icon="http://api.lejiagx.cn/static/icon/bitian.png" v-model="houseForm.pay_num" label="价格" placeholder="￥请输入价格" />

    <div class="cover">
      <van-uploader multiple :max-count="9" :after-read="afterRead" v-model="coverList" @delete="imgDel" />
    </div>
    <van-field
      v-model="houseForm.introductory"
      rows="1"
      class="detail"
      autosize
      type="textarea"
      placeholder="房屋介绍、地点等等…"
    />
    <!-- <van-field
      class="detail"
      v-model="houseForm.details"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入房屋详情"
    /> -->
    <!-- <input class="detail" v-model="houseForm.details" type="text" placeholder="请输入房屋详情" /> -->
    <!-- <div class="tag">
      <van-tag
        v-for="(item,index) in show"
        :key="index"
        closeable
        v-show="item.status"
        size="medium"
        @close="close(item.text)"
      >
        {{item.text}}
      </van-tag>  
      <div class="add">添加标签</div>
    </div> -->
    
    <!-- <div class="weizhi m-t">
      <van-cell-group>
        <van-cell title="获取定位信息" icon="location-o" is-link @click="openLocal" />
      </van-cell-group>
    </div> -->
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { uploadImg } from '@/api'
import { publishHouse } from './actions'
import { wxMapGetAddress, wxMapJSSDK } from '@/utils/wxshare.js'
import { mapState, mapMutations } from 'vuex'
import { getLngLatLocation } from '@/utils/map.js'
import { Toast, Notify } from 'vant'

export default {
  components: {
    PageTitle
  },
  data () {
    return {
      coverList: [],
      // show: [
      //   {
      //     text: '采光好',
      //     status: true
      //   },
      //   {
      //     text: '配套齐全',
      //     status: true
      //   },
      //   {
      //     text: '精装修',
      //     status: true
      //   }
      // ],
      houseForm: {
        name: '',
        img_path: [],
        pay_num: '面议 / 电议',
        phone: '',
        introductory: '',
        edit:false
      },
      local: {},
      imgObj:[],
      isDisable:false
    }
  },
  computed: {
    ...mapState(['user','userMapLoacl'])
  },
  watch: {},
  methods: {
    ...mapMutations(['delUser','setUserMap']),
    // 获取定位信息
    async initLocal () {

      if (this.userMapLoacl) this.local = this.userMapLoacl.local
      const res = await wxMapGetAddress()
      if (res.errMsg === 'getLocation:ok') {
        let lnglat = []
        lnglat[0] = res.longitude
        lnglat[1] = res.latitude
        const userMap = await getLngLatLocation(lnglat)
        this.setUserMap(userMap)
        this.local = userMap.local
        this.houseForm.site = this.local.localText || '暂无定位信息'
      } else {
        this.$toast('定位信息获取失败，请检查网络连接')
      }
    },
    // 打开微信地图
    openLocal () {
      wxMapJSSDK()
    },
    // 判断用户是否返回手机号码
    initUserPhone () {
      this.houseForm.phone = this.user.phone || ''
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
        this.houseForm.img_path.push(res.data.src)
      } else {
        this.isDisable = false;
        this.$toast.error('图片上传失败')
      }
    },
    imgDel(file){

      for (var i = 0; i < this.imgObj.length; i++) {
        if (this.imgObj[i].name == file.file.name) {
          this.imgObj.splice(i, 1);
          this.houseForm.img_path.splice(i, 1);
        }
      }
    },
    close (type) {
      const index = this.show.findIndex(item => item.text === type)
      this.show[index].status = false 
    },
    // 发布
    async submit () {
      // const tag = this.show.map(item => item.text)
      // this.houseForm.tag = tag.join(',')

      for (const key in this.houseForm) {
        if (!this.houseForm[key] && key != 'img_path' && key != 'edit') {
          this.isDisable = false;
          return this.$toast('请将信息填写完整')
          return false;
        }
      }

      if(this.houseForm["name"].length < 3){
        Notify("标题长度最少三个字符");
        return false;
      }

      this.isDisable = true;
      const res = await publishHouse(this.houseForm)
       if (res.code === 100) {

        this.$toast.success(res.msg)
        if (!this.houseForm.gid != undefined || !this.houseForm.gid != '') {
          sessionStorage.removeItem(this.houseForm.gid+'_edit');
        }

        this.$router.go(-1)

      } else {

        this.isDisable = false;
        this.$toast.fail(res.msg)
        
      }
    }
  },
  created () {
    this.initLocal()
    this.initUserPhone()

    var edit_id = this.$route.query.editId
    if (edit_id != undefined) {

      var data = JSON.parse(this.$Utils.demoResponse(sessionStorage.getItem(edit_id+'_edit')));

      this.houseForm.name = data.graphic_name;
      this.houseForm.img_path = data.inter_img_path;
      this.houseForm.pay_num = data.inter_pay_num;
      this.houseForm.phone = data.inter_phone;
      this.houseForm.introductory = data.inter_introductory;
      this.houseForm.nid = data.graphic_nav_id;
      this.houseForm.gid = data.gid;
      this.houseForm.edit = true;

    }else{

      var data = this.$route.query.id;
      if(data){
        this.houseForm.nid = data
      }
    }
  }
}
</script>
<style lang='less' scoped>
  .wrapper{
    padding: 12px;
    .title{
      margin-top: 50px;
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
      // /deep/ .van-uploader__preview {
      //   width: 100%;
      //   height: 100%;
      //   .van-image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
      // /deep/ .van-uploader {
      //   padding: 10px 0;
      //   width: 100%;
      //   height: 100%;
      //   .van-uploader__wrapper{
      //     width: 100%;
      //     height: 100%;
      //   }
      //   .van-uploader__upload {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
    }
    .tag {
      display: flex;
      flex-wrap: wrap;
      .add{
        color: #1C1C1C;
        font-size: 14px;
        margin-right: 10px;
        background: #F4F4F4;
        padding: 10px;
        margin: 5px 0;
      }
      .van-tag{
        color: #1C1C1C;
        font-size: 14px;
        margin-right: 10px;
        background: #F4F4F4;
        padding: 10px;
      }
    }
    .submit{
      position: fixed;
      width: 50px;
      height: 28px;
      font-size: 15px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background:rgba(208,68,67,1);
      opacity:1;
      border-radius:6px;
      top: 10px;
      right: 20px;
      z-index:100000;
      border:0px;
    }
  }
  .detail{
    border-top: 1px solid #C4C4C4;
    margin: 15px 0;
    border: none;
    font-size: 15px;
    padding:0px;
  }
  .ipt{
    border-bottom:1px solid #eee ;
  }
.inputSet{
  padding-left:0px;
}
</style>
