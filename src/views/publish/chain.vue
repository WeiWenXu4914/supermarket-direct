<!-- 发布视频页 -->
<template>
  <div>
    <div class="wrapper">
      <div class="header">
        <span class="cancel" @click="onBrowserBack">取消</span>
        <span class="write">发布</span>
        <div class="submit" @click="submit">发布</div>
      </div>
      <div class="tittle">
        <van-field
          v-model="chainFrom.name"
          v-bind="descNum"
          left-icon="http://api.lejiagx.cn/static/icon/bitian.png"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入标题（3-150个字）"
        />

        <van-cell-group>
          <van-field
            v-model="chainFrom.details"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入正文"
          />
        </van-cell-group>
      </div>

      <div class="wechatUpload" v-show="uploadShow">
        <div class="wechatUploadButton" @click="showShare = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6a6464"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          >
            <path
              d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"
            />
          </svg>
        </div>
      </div>

      <div class="wechatUpload" v-show="upType == 1">
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

      <div
        class="previewVideo"
        v-show="previewVideo && fileList.file == '' && videoSrc != ''"
      >
        <div class="previewVideo-icon">
          <div @click="startUploadVideo">
            上传
            <van-icon name="success" size="30" color="#07C160" />
          </div>
          <div @click="delUploadVideo">
            删除
            <van-icon name="delete" size="30" color="red" />
          </div>
        </div>

        <video
          :src="videoSrc"
          controls="controls"
          width="100%"
          height="400"
        ></video>
      </div>

      <div class="previewVideo" v-show="upType == 2">
        <div class="previewVideo-icon-right">
          <div @click="delUploadVideo">
            删除
            <van-icon name="delete" size="30" color="red" />
          </div>
        </div>
        <template v-if="fileList.file != 1 && fileList.file">
          <video
            class="video-js"
            preload="auto"
            controls=""
            x5-video-player-type="h5-page"
            :poster="fileList.video_surface_plot"
            data-setup="{}"
          >
            <source :src="fileList.file" type="video/mp4" />
          </video>
        </template>
        <template v-else-if="fileList.file == 1">
          <div style="text-align: center; width: 100%">
            <van-circle
              v-model="currentRate"
              :rate="uploadSchedule"
              :text="uploadSchedule + '%'"
              :color="gradientColor"
              layer-color="#eee"
            />
          </div>
        </template>
      </div>

      <van-action-sheet v-model="showShare" title="上传类型">
        <div class="selectUploadType">
          <div class="content" @click="jssdkUpload">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M20.4 14.5L16 10 4 20" />
            </svg>
          </div>
          <div class="content">
            <div class="content-input">
              <input
                type="file"
                accept="video/*"
                multiple
                @change="getBigectURL($event)"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"
                />
              </svg>
            </div>
          </div>
          <div class="content" @click="uploadAutio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 2c-1.7 0-3 1.2-3 2.6v6.8c0 1.4 1.3 2.6 3 2.6s3-1.2 3-2.6V4.6C15 3.2 13.7 2 12 2z"
              />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18.4v3.3M8 22h8" />
            </svg>
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import { Notify, Field, Toast, Dialog } from "vant";
import { uploadVideo, uploadImg, uploadBaseImg, uploadChainPublish } from "@/api";
import { wxJssdkChooseImage } from "@/utils/wxshare.js";
import wx from "weixin-js-sdk"; //微信sdk依赖
export default {
  components: {},
  data() {
    return {
      videoSrc: "",
      previewVideo: false,
      showShare: false,
      uploadShow: true,
      chainFrom: {
        id: "",
        name: "",
        details: ""
      },
      upType: 0,
      fileList: {
        data: "",
        file: "",
        video_surface_plot: "",
      },
      imgVal: [],
      uploadSchedule: 0,
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      isDisable: false,
    };
  },
  watch: {
    imgVal: function () {
      var le = this.imgVal.length;
      if (le == 9) {
        this.uploadShow = false;
        return false;
      }
    },
  },
  computed: {
    descNum() {
      if (this.chainFrom.name.length > 150) {
        this.chainFrom.name = this.chainFrom.name.substr(0, 150);

        Notify("无法在输入了");

        return 150;
      }
      return this.chainFrom.name.length == 0 ? 0 : this.chainFrom.name.length;
    },
  },
  created() {
    wxJssdkChooseImage();
    this.chainFrom.id = this.$route.query.nid;
    this.chainFrom.chainId = this.$route.query.chainId;
  },
  methods: {
    // 选择视频
    getBigectURL(event) {
      var current = event.target.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(current);
      var that = this;
      fileReader.onload = function (e) {
        that.previewVideo = true;
        that.showShare = false;
        that.uploadShow = false;
        that.videoSrc = e.currentTarget.result;
      };
      this.chainFrom.data = current;
    },
    // 删除选择的视频
    delUploadVideo() {
      this.chainFrom.data == "";
      this.fileList.video_surface_plot = "";
      this.fileList.file = "";
      this.videoSrc = "";
      this.upType = 0;
      this.previewVideo = false;
      this.uploadShow = true;
    },
    // 开始上传
    startUploadVideo() {
      if (this.imgVal.length > 0) {
        Dialog.confirm({
          title: "只能发布图片或者视频！",
          message: "是否清除已选择的图片？取消则清空选择的视频。",
        })
          .then(() => {
            this.imgVal = [];
            this.upType = 2;
          })
          .catch(() => {
            this.fileList.file = "";
            this.fileList.video_surface_plot = "";
          });
        return false;
      }

      if (this.chainFrom.data == "" || this.chainFrom.data == undefined) {
        Toast("请选择上传的视频!");
        return;
      }

      this.upType = 2;
      let data = new FormData();
      data.append("file", this.chainFrom.data);
      this.fileList.file = 1;

      axios
        .post("http://apis.lejiagx.cn/api/VideoUpload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            var progr = progressEvent.loaded / progressEvent.total;
            this.uploadSchedule = parseInt(progr * 100);
          },
        })
        .then((res) => {
          if (res.data.status === 100) {
            console.log(res)
            this.uploadShow = false;
            this.fileList.video_surface_plot = res.data.data.video_surface_plot_base;
            this.fileList.file = res.data.data.file;
          } else {
            Toast(res.msg);
            this.delUploadVideo();
          }
        });
    },
    uploadAutio() {
      Toast("功能开发中,尽情期待!");
    },
    jssdkUpload() {
      if (this.fileList.file != "") {
        this.showShare = false;
        Dialog.confirm({
          title: "只能发布图片或者视频！",
          message: "是否清除已选择的视频？取消则清空选择的图片。",
        })
          .then(() => {
            this.fileList.file = "";
            this.fileList.video_surface_plot = "";
          })
          .catch(() => {
            this.imgVal = [];
            this.upType = 2;
          });
        return false;
      }

      var le = this.imgVal.length;
      if (le >= 9 || 9-le <= 0) {
        Toast("最多上传9张图片");
        
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
              nav_id: that.chainFrom.id,
            };

            uploadBaseImg(obj).then((res) => {
              that.upType = 1;
              that.showShare = false;

              if (res.code === 100) {
                for (var i = 0; i < res.data.length; i++) {
                  Vue.set(that.imgVal, i, res.data[i]);
                }
              } else {
                that.$toast.error("图片上传失败");
              }
            });
          }
        },
      });
    },
    delImg(index) {
      this.imgVal.splice(index, 1);
    },
    onBrowserBack() {
      if (
        this.chainFrom.name == "" &&
        this.chainFrom.details == "" &&
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
          localStorage.setItem("eventBus", this.chainFrom.name);
          localStorage.setItem("defCreate", JSON.stringify(this.chainFrom));
          this.$router.go(-1);
        })
        .catch(() => {
          localStorage.removeItem("defCreate");
          localStorage.removeItem("eventBus");
          if (!this.chainFrom.gid != undefined || !this.chainFrom.gid != "") {
            sessionStorage.removeItem(this.chainFrom.gid + "_edit");
          }

          this.$router.go(-1);
        });
    },
    // 发布
    async submit() {
      
      if(this.imgVal.length > 0){

        if(this.fileList.file != ''){
          Toast('图片或者视频只能上传一种!');
          return;
        }else{
          this.chainFrom.path = this.imgVal;
        }

      }else{
        if(this.fileList.file == ''){
          Toast('请上传图片或者视频其中的一种!');
          return;
        }else{
          this.chainFrom.filePath = {
            path:this.fileList.file,
            surface_plot:this.fileList.video_surface_plot
          }
        }
      }

      if (!this.chainFrom["name"]) return Notify("请将信息填写完整");

      if(this.chainFrom["name"].length < 3){
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

          uploadChainPublish(this.chainFrom)
            .then((res) => {
              this.$toast.success(res.msg)
              console.log(res)
            })
            .catch((error) => {});
        })
        .catch(() => {});
    },
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
.video-js {
  width: 100%;
  height: auto;
  max-height: 400px;
  margin-bottom: 10px;
}
.previewVideo {
  width: 100%;
  border-radius: 2px;
  margin-top: 4px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
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
  .previewVideo-icon {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 15px;
    }
  }
  .previewVideo-icon-right {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    div {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 15px;
    }
  }
}
.wechatUpload {
  width: 100%;
  overflow: auto;
  zoom: 1;
  .wechatUploadButton {
    width: 24%;
    height: 70px;
    float: left;
    text-align: center;
    line-height: 100px;
    border-radius: 5px;
    background: #f7f8fa;
  }
  .wechatUploadImgItem {
    width: 24%;
    height: 70px;
    float: left;
    margin-left: 1%;
    border-radius: 5px;
    margin-top: 1%;
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
.selectUploadType {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  .content {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span {
      margin-top: 5px;
    }
    .content-input {
      width: 100%;
      height: 100px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      svg {
        display: block;
        position: absolute;
        z-index: -1;
      }
    }
  }
}
</style>
