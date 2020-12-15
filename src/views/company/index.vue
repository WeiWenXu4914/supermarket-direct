<template>
  <div class="content">
    <div class="head">
      <img :src="enterpriseMsg.ent_logo" alt />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="substance">
        <div class="return">
          <van-icon color="#204051" name="arrow-left" class="title-icon" @click="$router.go(-1)" />
          <div>
            <!-- <span style="background:#204051" v-for="(val, inx) in 3" :key="inx"></span> -->
          </div>
        </div>
        <div class="introduce">
          <div class="title">
            <div class="item">
              <div class="up">企业名称</div>
              <div class="down">{{enterpriseMsg.ent_name}}</div>
            </div>
            <div class="item" @click="getPhone(enterpriseMsg.service_phone)">
              <div class="up">客服电话</div>
              <div class="down">{{enterpriseMsg.service_phone}}</div>
            </div>
            <div class="item">
              <div class="up">企业种类</div>
              <div class="down">{{enterpriseMsg.ent_class_name}}</div>
            </div>
          </div>
          <div class="center">
            <div class="item" @click="goUrl(enterpriseMsg.ent_URL)">
              <div class="up">官网</div>
              <div class="down">{{enterpriseMsg.ent_URL}}</div>
            </div>
            <div class="item">
              <div class="up">地址</div>
              <div class="down">{{enterpriseMsg.ent_detailed_site}}</div>
            </div>
          </div>
          <div class="msg">
            <template v-if="enterpriseMsg.ent_introduction">
              <div>企业简介:</div>
              <div class="message">{{enterpriseMsg.ent_introduction}}</div>
            </template>
            <template v-if="enterpriseMsg.ent_style" >
              <div class="first" v-html="enterpriseMsg.ent_style" @click="getpreview($event)"></div>
            </template>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { getEnterpriseHomepage } from './actions/index.js'
import { ImagePreview, Toast } from "vant"
export default {
  name: 'company',
  components: {
    PageTitle
  },
  data () {
    return {
      enterpriseMsg: {},
      isLoading: false,
    }
  },
  computed: {},
  created () {
    this.getPageData()
  },
  methods: {
    // 图片预览
    getpreview(e) {
     if (e.target.tagName == "IMG") {
   		 ImagePreview({
          images: [e.target.src],
          showIndex: false,
          closeOnPopstate: true //页面回退关闭预览
        });
     }
    },
    goUrl(url) {
      if(url.indexOf("http://") != -1){
        window.location.href = url;
      }else{
        window.location.href = 'http://' + url;
      }
    },
    getPhone(res){
      window.location.href = 'tel:'+ res
    },
    // 获取企业信息
    getPageData () {
      if (!this.$route.params.id) {
        this.$toast('非法操作~')
        setTimeout(() => {
          this.$router.go(-1)
        },600)
      }
      var id = this.$route.params.id
      getEnterpriseHomepage(id).then(res => {
        if (res.code === 100) {
          this.enterpriseMsg = res.data
        } else {
          this.$toast('企业信息获取失败~')
          setTimeout(() => {
            this.$router.go(-1)
          },600)
        }
        
      })
    },
    onRefresh() {
      this.getPageData()
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    }
  }
}
</script>

<style scoped lang='less'>
.head {
  width: 100%;
  height: 200px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -9;
  overflow: hidden;
  img {
    width: 100%;
    object-fit:cover;
  }
}
.substance {
  padding: 20px 0px 0;
  .return {
    position:fixed;
    width: 94%;
    margin-left: 3%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    color: rgba(255, 255, 255, 1);
    div {
      span {
        display: inline-block;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        opacity: 1;
        margin-left: 5px;
      }
    }
  }
  .introduce {
    // min-height: 90vh;
    img {
      max-height: 100%;
      width: 100%;
    }
    width: 94%;
    margin: 45px auto;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 25px rgba(110, 110, 110, 0.37);
    opacity: 1;
    box-sizing: border-box;
    padding: 22px 18px 20px 23px;
    border-radius: 6px;
    .title {
      display: flex;
      justify-content: space-between;
      padding-bottom: 23px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
    }
    .up {
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 22px;
      color: rgba(116, 116, 116, 1);
      opacity: 1;
    }
    .down {
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 600;
      line-height: 19px;
      color: rgba(72, 72, 72, 1);
      opacity: 1;
    }
    .center {
      margin-top: 19px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 23px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
      .item {
        width: 49%;
        word-wrap: break-word;
        white-space: normal;
        word-break: break-all;
      }
    }
    .msg {
      margin-top: 14px;
      div {
        &:first-child {
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 22px;
          color: rgba(116, 116, 116, 1);
          opacity: 1;
        }
        .message {
          margin-top: 8px;
          font-size: 13px;
          height: 69px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 19px;
          color: rgba(116, 116, 116, 1);
          opacity: 1;
        }
      }
    }
    .first {
      margin-top: 10px;
      width: 100%;
      min-height: 150px;
      /deep/ div{
        height: 100%;
      }
      /deep/ li {
        float: none !important;
        margin-left: 0 !important;
        img {
          width: 100% !important;
          max-height: calc(100vh / 2);
          border-radius:3px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
