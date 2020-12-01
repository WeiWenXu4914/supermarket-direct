<template>
  <div class="rentting">
    <div 
      class="top" 
      v-if="entD != '' && entD.inter_img_path.length == 0">

      <svg @click.stop="back" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      <!-- <img src="../../components/img1/fanhui.png" alt="" > -->
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

    <div v-else>

      <div class="tops">
        <!-- <van-icon name="arrow-left" size="24px" @click.stop="back" /> -->
        <svg @click.stop="back" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>

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
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in entD.inter_img_path">
          <img v-lazy="item.graphic_thumbnail_path" @click="getpreview(item.graphic_thumbnail_path)" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="up">
      <p class="p1">{{entD.pay_num}}</p>
      <!-- <p class="p2">元/月</p> -->
    </div>
    <div class="biao" v-if="entD != ''">
      <p :class="'p'+(index+1)" v-for="(item,index) in entD.inter_tag">{{item}}</p>
      <!-- <p class="p2">配套齐全</p>
      <p class="p3">采光好</p> -->
      <img src="../../components/img1/电话.png" alt="" @click="getPhone(entD.inter_phone)">
    </div>
    <div class="bottom">
      <div class="b1" v-if="entD != ''">
        <p class="p1">{{ entD.graphic_name | emoji_decode }}</p>
        <p class="p2">{{ entD.inter_introductory | emoji_decode }}</p>
      </div>
      <!-- <div class="b2">
        <img src="../../components/img1/dingwei_black.png" alt="">
        <p class="p1">{{entD.inter_site}}</p>
        <p class="p2">></p>
      </div> -->
    </div>

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
import { ImagePreview, Toast } from 'vant'
import { articleDetail, forwardArticles, memForward } from './actions'
import { wxJSSDK } from '@/utils/wxshare.js'
export default {
  data() {
    return {
      entD:'',
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
    entD:function() {
      this.$nextTick(function(){
        // 页面渲染完延时关闭
        setTimeout(function(){
          Toast.clear();
        },200)
      })
    }
  },
  created () {

    this.getEntDetail();

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
    getpreview(res) {
      ImagePreview([res]);
    },
    async getEntDetail() {

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

        this.entD = res.data
        this.autoForward(res.data);
        this.getMemForward();
      }
    },
    // 获取分享
    async getMemForward() {
      const res = await memForward(this.entD.gid)
      this.MemForward = res.data;
    },
    autoForward(data) {

      // 注册微信分享
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        var imgUrl = 'http://api.lejiagx.cn/static/logo/logo.png';

        if (data.inter_img_path.length > 0) {
          imgUrl = data.inter_img_path[0].graphic_thumbnail_path;
        }

        var tel = data.inter_phone;
        tel = "" + tel;
        var reg=/(\d{3})\d{4}(\d{4})/;
        var tel1 = tel.replace(reg, "$1****$2")

        var form = {
          title: data.graphic_name,
          link: window.location.href+'&goindex=true',
          imgUrl: imgUrl,
          desc: '联系方式:'+tel1
        }

        wxJSSDK(form)
      }
    },
    // 显示分享
    showForward () {

      console.log(this.entD.inter_img_path[0].graphic_thumbnail_path)
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        this.forwardMark = true
        forwardArticles(this.entD.gid,1).then(res=>{

          if (res.code == 100) {

            var imgUrl = 'http://api.lejiagx.cn/static/logo/logo.png';

            if (this.entD.inter_img_path.length > 0) {
              imgUrl = this.entD.inter_img_path[0].graphic_thumbnail_path;
            }

            var tel = this.entD.inter_phone;
            tel = "" + tel;
            var reg=/(\d{3})\d{4}(\d{4})/;
            var tel1 = tel.replace(reg, "$1****$2")

            var form = {
              title: this.entD.graphic_name,
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
*{
    margin:0;
    padding: 0;
}
.rentting{
  .top {
    background-image: url('../../components/img1/016d6d5caac31fa801214168289e0d.jpg@1280w_1l_2o_100sh.png');
    background-size: 400px;
    height: 6rem;
    img{
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.5rem 0rem 0rem 0.3rem;
    }
    line-height:64px;
    padding-left:15px;
    z-index:10;
    .goindex{
      width: 15%;
      height: 50px;
      position: fixed;
      top: 0px;
      z-index: 5000;
      right: 10%;
      text-align: center;
      line-height: 60px;
    }
    .forwardBtn {
      width: 15%;
      height: 50px;
      position: fixed;
      top: 0px;
      z-index: 5000;
      right: 0px;
      text-align: center;
      line-height: 60px;
    }
  }
  .tops {
    position: fixed;
    top:0px;
    left:0px;
    height: 50px;
    line-height:64px;
    padding-left:15px;
    z-index:10;
    .goindex{
      width: 15%;
      height: 50px;
      position: fixed;
      top: 0px;
      z-index: 5000;
      right: 10%;
      text-align: center;
      line-height: 60px;
    }
    .forwardBtn {
      width: 15%;
      height: 50px;
      position: fixed;
      top: 0px;
      z-index: 5000;
      right: 0px;
      text-align: center;
      line-height: 60px;
    }
  }
  .up{
    display: flex;
    margin: 0.5rem 0rem 0rem 0.3rem;
    .p1{
      color:#D04443;
      font-size: 0.6rem;
      font-weight: bold;
    }
    .p2{
      color:#D04443 ;
      font-size:0.4rem ;
      margin: 0.2rem 0rem 0rem 0.1rem;
    }
  }
  .biao{
    //display: flex;
    width:100%;
    height:auto;
    overflow: auto;
    img{
      width: 0.8rem;
      height: 0.8rem;
      float:right;
      margin-right: 15px;
      //margin-top: -0.5rem;
    }
    p{
      font-size: 0.5rem;
      line-height: 0.5rem;
      padding-right: 0.2rem;
      color: #2F2F2F;
      margin: 0.2rem 0rem 0rem 0.3rem;
      border-right: 1px solid #A7A7A7;
      font-weight: bold;
    }
  }
  .bottom{
    .b1{
      .p1{
        font-size: 0.5rem;
        margin: 0.2rem 0rem 0rem 0.3rem;
      }
      .p2{
        width: 94%;
        font-size: 0.4rem;
        margin: 0.5rem 0rem 0rem 0.3rem;
        color: #5D5D5D;
      }
    }
    .b2{
      display: flex;
      margin: 0.5rem 0rem 0rem 0.3rem;
      img{
        width: 0.5rem;
        height: 0.5rem;
      }
      .p1{
        color: #2F2F2F;
        font-size: 0.4rem;
        font-weight: bold;
      }
      .p2{
        color: #7C7C7C;
        margin-left: 3.5rem;

      }
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  img{
    width:100%;
    height:auto;
    object-fit:cover;
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