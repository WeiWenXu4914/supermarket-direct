<template>
  <div class="job">
    <div class="top">
      <!-- 返回 -->
      <svg @click="back()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      <!-- <img src="../../components/img1/返回.png" class="i1"  /> -->
      <p class="p1">详情</p>
      <!-- 回到主页 -->
      <div class="goindex" 
        v-if="goindex == true"
        @click="goHome">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </div>
      <!-- 分享按钮 -->
      <div class="forwardBtn" @click="showForward">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </div>
    </div>
    <div class="up">
      <div class="left" v-if="jobD != ''">
        <p class="p1">{{jobD.ge_position | emoji_decode}}</p>
        <p class="p2">{{jobD.pay_num}}</p>
      </div>
      <div class="right">
        <img src="../../components/img1/电话.png" alt @click="getPhone(jobD.ge_phone)"/>
      </div>
    </div>
    <div class="content">
      <div class="c1">
        <p class="p1">描述</p>
      </div>
      <div class="c2" v-if="jobD != ''">
        <p class="p2">{{jobD.ge_introductory | emoji_decode}}</p>
      </div>
    </div>
    <div class="name" v-if="jobD != ''">
      <p class="p1">公司名称</p>
      <p class="p2">{{jobD.ge_company_name | emoji_decode}}</p>
    </div>
    <!-- <div class="b2">
      <img src="../../components/img1/dingwei_black.png" alt />
      <p class="p1">{{jobD.ge_site}}</p>
      <p class="p2">></p>
    </div> -->

    <van-collapse v-model="activeNames" :border=false v-if="MemForward.length > 0">
      <van-collapse-item title="帮忙分享的用户" name="1">
        <div v-for="(item,index) in MemForward" class="mem_forward van-hairline--bottom">
          <div class="user-info" @click="userHandle(item)">
            <div class="img">
              <van-image
                round
                width="40px"
                height="40px"
                :src="item.mem_head_portrait"
              />
            </div>
            <div class="name">{{item.mem_name | ellipsis}}</div>
          </div>
          <div class="user_right">
            <div class="user_rightText">
              分享于： {{item.mem_forward_addtime | relTime}} <br /> 浏览量： {{ item.mem_forward_click_num }} 次
            </div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>

    <!-- 分享 -->
    <transition on name="van-fade">
      <div v-if="forwardMark" class="forward" @click="forwardMark = false">
        <div class="box">
          <div class="icon">
            <img src="../../assets/icons/forward.png" alt="">
          </div>
          <div class="text">
            点击右上角发送给指定朋友或者分享到朋友圈。
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { Toast  } from 'vant'
import { articleDetail, forwardArticles, memForward } from './actions'
import { wxJSSDK } from '@/utils/wxshare.js'
export default {
  data() {
    return {
      jobD:'',
      goindex:false,
      forwardMark:false,
      activeNames: ['1'],
      MemForward:'',
      key:''
    }
  },
  beforeCreate() {
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
			overlay: true,
			duration:0
		});
  },
  watch: {
    jobD:function() {
      this.$nextTick(function(){
        // 页面渲染完延时关闭
        setTimeout(function(){
          Toast.clear();
        },200)
      })
    }
  },
  created () {

    this.getJobDetail();

    if(this.$route.query.goindex == 'true'){
      this.goindex = true;
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/');
    },
    getPhone(res){
      window.location.href = 'tel:'+ res
    },
    async getJobDetail() {

      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))

      if(this.$route.query.key){
        this.key = this.$route.query.key;
      }

      var obj = {
        id:data,
        key:this.key
      }

      const res = await articleDetail(obj)
      if (res.code === 100) {
        this.jobD = res.data;
        this.autoForward(res.data);
        this.getMemForward();
      }
    },
    // 获取分享
    async getMemForward() {
      const res = await memForward(this.jobD.gid)
      this.MemForward = res.data;
    },
    autoForward(data) {

      // 注册微信分享
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        var imgUrl = 'http://api.lejiagx.cn/static/logo/logo.png';

        if (data.ge_img_path != '' && data.ge_img_path != null) {
          imgUrl = data.ge_img_path;
        }

        var tel = data.ge_phone;
        tel = "" + tel;
        var reg=/(\d{3})\d{4}(\d{4})/;
        var tel1 = tel.replace(reg, "$1****$2")

        var form = {
          title: data.ge_position,
          link: window.location.href+'&goindex=true',
          imgUrl: imgUrl,
          desc: '联系方式:'+tel1
        }

        wxJSSDK(form)
      }
    },
    // 显示分享
    showForward () {

      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        this.forwardMark = true
        forwardArticles(this.jobD.gid,1).then(res=>{

          if (res.code == 100) {

            var imgUrl = 'http://api.lejiagx.cn/static/logo/logo.png';

            if (this.jobD.ge_img_path != '' && this.jobD.ge_img_path != null) {
              imgUrl = this.jobD.ge_img_path;
            }

            var tel = this.jobD.ge_phone;
            tel = "" + tel;
            var reg=/(\d{3})\d{4}(\d{4})/;
            var tel1 = tel.replace(reg, "$1****$2")

            var form = {
              title: this.jobD.ge_position,
              link: window.location.href +`&goindex=true&key=`+res.data.mem_urlkey,
              imgUrl: imgUrl,
              desc: '联系方式:'+tel1
            }

            wxJSSDK(form)
            
            setTimeout(()=>{
              this.forwardMark = false
              this.$toast('分享成功')
            },5000)
            

          }else{

            this.forwardMark = false
            this.$toast(res.msg)
          }

        })

      } else {

        this.$toast('请在微信中分享')
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
.job {
  width:95%;
  margin:0px auto;
  .top {
    display: flex;
    margin-top: 0.4rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    .goindex {
      width: 15%;
      height: 50px;
      position: fixed;
      top: 6px;
      z-index: 5000;
      right: 10%;
      text-align: center;
      line-height: 60px;
    }
    .forwardBtn {
      width: 15%;
      height: 50px;
      position: fixed;
      top: 6px;
      z-index: 5000;
      right: 0px;
      text-align: center;
      line-height: 60px;
    }
  }
  .up {
    //display: flex;
    width: 100%;
    border-bottom: 1px solid #d7d7d7;
    margin-top:25px;
    padding-bottom: 0.3rem;
    overflow: auto;
    .left {
      float:left;
      .p1 {
        font-size: 0.5rem;
        font-weight: bold;
        color: #2f2f2f;
      }
      .p2 {
        color: #d04443;
        display: inline-block;
        font-size: 0.5rem;
        font-weight: bold;
      }
      .p3 {
        color: #d04443;
        display: inline-block;
        margin: 0.3rem 0rem 0rem 0.1rem;
        font-size: 0.4rem;
      }
    }
    .right {
      float:right;
      img {
        width: 1rem;
        height: 1rem;
        margin: 0.05rem 0rem 0rem 3.5rem;
      }
    }
  }
  .content {
    //margin: 0.2rem 0rem 0rem 0.2rem;
    width: 100%;
    margin-top:10px;
    .c1 {
      .p1 {
        color: #2f2f2f;
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
    .c2 {
      margin-left:10px;
      margin-top: 0.2rem;
    }
    p {
      font-size: 0.4rem;
      color: #5d5d5d;
    }
  }
  .name {
    //margin: 0.3rem 0rem 0rem 0.3rem;
    width: 100%;
    margin-top:15px;
    .p1 {
      font-size: 0.4rem;
      font-weight: bold;
      color: #2f2f2f;
    }
    .p2 {
      color: #2f2f2f;
      font-size: 0.35rem;
      margin-top: 0.3rem;
      margin-left:10px;
    }
  }
  .b2 {
    display: flex;
    margin: 0.5rem 0rem 0rem 0.3rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
    .p1 {
      color: #2f2f2f;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .p2 {
      color: #7c7c7c;
      margin-left: 3.5rem;
    }
  }
}
.forward{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .7);
  z-index: 9999;
  .box{
    position: absolute;
    right: 30px;
    top: 60px;
    box-sizing: border-box;
    padding: 5px;
    background: none;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
    width: 110px;
    font-size: 13px;
    .icon{
      top: -64px;
      height: 70px;
      left: 45px;
      img{
        height: 100%;
        transform: rotate(-9deg);
      }
      position: absolute;
    }
  }
}
.mem_forward{
  width: 100%;
  margin-top: 0px;
  margin-bottom: 20px;
  padding-bottom: 5px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .user-info{
    display: flex;
    align-items: center;
    .img{
      width: 40px;
      height: 40px;
    }
    .name{
      margin-left: 5px;
      height: 40px;
      font-size: 14px;
      color: #3A3A3A;
    }
  }
  .user_right{
    width: 50%;
    height: 40px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
  .user_rightText{
    margin-left: 5px;
  }
}
.van-collapse {
  width: 100%;
  margin-top: 15px;
  /deep/ .van-cell {
    padding: 0.2rem 0.2rem;
  }
}
</style>