<!-- 发布视频页 -->
<template>
  <div>
    <div class="wrapper">
      <div class="header">
        <span class="cancel" @click="onBrowserBack">取消</span>
        <span class="write">发布</span>
        <van-button
          :disabled="isDisable"
          :loading="isDisable"
          @click="submit"
          type="primary"
          size="small"
          class="submit"
        >
          发布
        </van-button>
      </div>
      <div class="tittle">
        <van-field
          v-model="defForm.graphic_name"
          v-bind="descNum"
          left-icon="http://api.lejiagx.cn/static/icon/bitian.png"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入标题（3-150个字）"
        />

        <van-cell-group>
          <van-field
            v-model="defForm.details"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入正文"
          />
        </van-cell-group>
      </div>
      <div class="wechatUpload">
        <div
          class="wechatUploadButton"
          @click="jssdkUpload"
          v-show="imgValShow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a19999"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(2 3)">
              <path
                d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z"
              />
              <circle cx="10" cy="10" r="4" />
            </g>
          </svg>
        </div>
        <div
          class="wechatUploadImgItem"
          v-for="(itm, index) in imgVal"
          :key="index"
        >
          <img class="wechatUploadImg" :src="itm" width="100%" height="70px" />
          <div class="wechatUploadClose" @click.stop="delImg(index)">
            <van-icon name="close" size="25px" color="red" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Notify, Field, Toast } from "vant";
import { uploadBaseImg } from "@/api";
import { articleDefCreate } from "./actions";
import { wxJssdkChooseImage } from "@/utils/wxshare.js";
import wx from "weixin-js-sdk"; //微信sdk依赖

export default {
  components: {},
  data() {
    return {
      value: "",
      defForm: {
        nav_id: 8,
        graphic_name: "",
        details: "",
        edit: false,
      },
      isDisable: false,
      imgValShow: true,
      imgVal: [],
      imgVals: [],
    };
  },
  computed: {
    descNum() {
      if (this.defForm.graphic_name.length > 150) {
        this.defForm.graphic_name = this.defForm.graphic_name.substr(0, 150);

        Notify("无法在输入了");

        return 150;
      }
      return this.defForm.graphic_name.length == 0
        ? 0
        : this.defForm.graphic_name.length;
    },
  },
  watch: {
    imgVal: function () {
      if (this.imgVal.length > 9) {
        this.imgValShow = false;
        this.uploadShow = false;
      } else if (this.imgVal.length < 9) {
        this.imgValShow = true;
        this.uploadShow = true;
      }
    },
  },
  methods: {
    jssdkUpload() {

      var le = this.imgVal.length;
      if (le >= 9 || 9-le <= 0) {
        that.$toast("最多上传9张图片");
        
        for (let index = 9; index < le; index++) {
          this.imgVal.splice(index, 1);
          this.imgVals.splice(index, 1);
        }

        this.imgValShow = false;
        this.uploadShow = false;
        return false;
      }

      var that = this;

      const jsApiList = [
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ",
        "onMenuShareQZone",
        "openLocation",
        "getLocation",
        "chooseImage",
        "getLocalImgData",
      ];

      var res = JSON.parse(sessionStorage.getItem("wechatConfig"));
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: jsApiList,
      });
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds;
          that.isDisable = true;
          that.syncShow(wx, localIds);
        },
      });
    },
    syncShow(wx, localIds) {
      var that = this;
      var localId = localIds.pop();

      wx.getLocalImgData({
        localId: localId, // 图片的localID
        success: function (data) {
          
          var localData = data.localData;
          var le = that.imgVal.length;

          if (le >= 9 || 9-le <= 0) {
            that.$toast("最多上传9张图片");
            
            for (let index = 9; index < le; index++) {
              that.imgVal.splice(index, 1);
              that.imgVals.splice(index, 1);
            }

            that.imgValShow = false;
            that.uploadShow = false;
            return false;
          }

          var xt = navigator.userAgent;
          if (xt.indexOf("OS") > -1) {
            Vue.set(that.imgVal, le, localData);
          } else {
            localData = "data:image/jpeg;base64," + localData;
            Vue.set(that.imgVal, le, localData);
          }
          
          if (localIds.length > 0) {
            that.syncShow(wx, localIds);
          } else {
            var obj = {
              imgVal: that.imgVal,
              nav_id: that.defForm.nav_id,
            };
            uploadBaseImg(obj).then((res) => {
              if (res.code === 100) {
                for (var i = 0; i < res.data.length; i++) {
                  Vue.set(that.imgVals, i, res.data[i]);
                }
              } else {
                this.$toast.error("图片上传失败");
              }
            });
          }
        },
      });

      if (this.imgVals.length == this.imgVal.length) {
        this.isDisable = false;
      }
    },
    delImg(index) {
      this.imgVal.splice(index, 1);
      this.imgVals.splice(index, 1);
    },
    onBrowserBack() {
      if (
        this.defForm.graphic_name == "" &&
        this.defForm.details == "" &&
        this.imgVal.length <= 0
      ) {
        this.$router.go(-1);
        return false;
      }

      this.$dialog
        .confirm({
          title: "草稿箱",
          message: "是否保存到草稿箱？",
          confirmButtonText: "保留",
          cancelButtonText: "不保留",
          cancelButtonColor: "red",
        })
        .then(() => {
          // localStorage.setItem("eventBus", this.defForm.graphic_name);
          // localStorage.setItem("defCreate",JSON.stringify(this.defForm));

          this.defForm.graphic_state = 2; //编辑草稿箱操作
          articleDefCreate(this.defForm)
            .then((res) => {
              if (res.code == 100) {
                Toast("成功保存到草稿箱");
                this.$router.go(-1);
              } else {
                Toast(res.msg);
              }
            })
            .catch((err) => {
              Toast("请求出错");
            });
          this.$router.go(-1);
        })
        .catch(() => {
          localStorage.removeItem("defCreate");
          localStorage.removeItem("eventBus");
          if (!this.defForm.gid != undefined || !this.defForm.gid != "") {
            sessionStorage.removeItem(this.defForm.gid + "_edit");
          }

          this.$router.go(-1);
        });
    },
    // 发布
    async submit() {
      if (this.imgVals.length < this.imgVal.length) {
        return Notify("稍等一会,图片正在上传!");
      }

      this.defForm.img_path = this.imgVals;

      if (!this.defForm["graphic_name"]) return Notify("请将信息填写完整");

      if(this.defForm["graphic_name"].length < 3){
        Notify("标题长度最少三个字符");
        return false;
      }

      this.$dialog
        .confirm({
          title: "发布",
          message: "确定要发布吗?",
        })
        .then(() => {
          this.$toast.loading({
            message: "发布中...",
            forbidClick: true,
            overlay: true,
            duration: 0,
          });

          articleDefCreate(this.defForm)
            .then((res) => {
              if (res.code === 100) {
                localStorage.removeItem("defCreate");
                localStorage.removeItem("eventBus");

                if (!this.defForm.gid != undefined || !this.defForm.gid != "") {
                  sessionStorage.removeItem(this.defForm.gid + "_edit");
                }
                this.$toast.success(res.msg);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 200);
              } else {
                this.$toast.clear();
                this.$toast.error(res.msg);
              }
            })
            .catch((error) => {});
        })
        .catch(() => {});
    },
  },
  created() {
    if (this.$route.query.title) {
      this.defForm.graphic_name = this.$route.query.title;
    }
    wxJssdkChooseImage();

    var edit_id = this.$route.query.editId;

    if (edit_id != undefined) {
      var res = JSON.parse(
        this.$Utils.demoResponse(sessionStorage.getItem(edit_id + "_edit"))
      );

      this.defForm.nav_id = res.graphic_nav_id;
      this.defForm.graphic_name = res.graphic_name;
      this.defForm.details = res.graphic_details;

      if (res.graphic_thumbnail.length > 0) {
        res.graphic_thumbnail.forEach((v, k) => {
          this.imgVal.push(v.graphic_thumbnail_path);
        });
      }

      this.defForm.gid = res.gid;
      this.defForm.edit = true;
    } else {
      var data = this.$route.query.id;
      this.defForm.nav_id = data;
      var res = localStorage.getItem("defCreate");
      res = JSON.parse(res);
      if (res) {
        this.defForm = res;
      }
    }
  },
};
</script>
<style lang='less' scoped>
.van-cell {
  width: 100%;
  padding: 10px 0;
  border: none;
  &::after {
    border: none;
  }
}
.van-button {
  border: none;
}
.van-uploader {
  width: 100%;
  /deep/ .van-uploader__wrapper {
    width: 100%;
    .van-uploader__preview {
      width: 100%;
      .van-image {
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }

  /deep/ .van-uploader__input-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
.wrapper {
  padding: 0 17px;
  height: 100%;
  position: relative;
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cancel {
      float: left;
      font-size: 14px;
      color: #707070;
    }
    .write {
      font-size: 18px;
      font-weight: 700;
      color: #3c3c3c;
    }
  }
  .tittle {
    min-height: 100px;
  }
  .content {
    .video-box {
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      margin-top: 4px;
      .up-img {
        position: absolute;
        width: 70px;
        padding: 3px;
        background: rgba(255, 255, 255, 0.3);
        bottom: 1px;
        color: #fff;
        left: 2px;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
      }
    }
    /deep/ .van-uploader__preview {
      width: 100%;
      height: 200px;
      .van-image {
        width: 100%;
        height: 100%;
      }
      .van-uploader__file {
        width: 100%;
        height: 100%;
      }
      .van-uploader__upload {
        margin: 0;
      }
    }
    /deep/ .van-uploader {
      margin-top: 6px;
      width: 100%;
      height: 100%;
      .van-uploader__upload {
        width: 100%;
        height: 204px;
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
    width: 50px;
    height: 28px;
    background: #d04443;
    font-size: 15px;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
// .footer {
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   line-height: 40px;
//   background: #f6f6f6;
//   padding-left: 20px;
//   .foot_con {
//     width: 50%;
//     height: 40px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     i::after {
//       width: 50px;
//       height: 50px;
//     }
//   }
// }
.video-js {
  width: 100%;
  height: auto;
  max-height: 400px;
  margin-bottom: 10px;
}
.wechatUpload {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  align-items: stretch;
  .wechatUploadButton {
    width: 30%;
    height: 70px;
    float: left;
    text-align: center;
    line-height: 100px;
    border-radius: 5px;
    background: #eee;
  }
  .wechatUploadImgItem {
    width: 30%;
    height: 70px;
    float: left;
    margin-left: 2%;
    border-radius: 5px;
    margin-top: 2%;
  }
  .wechatUploadImg {
    border-radius: 5px;
    object-fit: cover;
  }
  .wechatUploadClose {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-top: -70px;
    line-height: 40px;
    text-align: center;
    float: right;
  }
}
</style>
