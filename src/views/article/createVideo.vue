<!-- 发布视频页 -->
<template>
  <div>
    <div class="wrapper">

      <div class="header">
        <span class="cancel" @click="onBrowserBack">取消</span>
        <span class="write">视频</span>
        <van-button 
          :disabled="isDisable" 
          :loading="isDisable" 
          @click="submit" 
          type="primary" 
          size="small" 
          class="submit">
          发布
        </van-button>
      </div>

      <div class="tittle">
        <!-- <span class="tittle-num">
          <van-icon name="warn-o" color="#FF0000"/> 您已输入{{descNum}}个字了
        </span> -->
        <van-field v-model="videoForm.graphic_name" v-bind="descNum" left-icon="http://api.lejiagx.cn/static/icon/bitian.png" placeholder="请输入标题（3-150个字）"/>
        <!-- <van-cell-group> -->
          <van-field
            v-model="videoForm.details"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入正文"
          />
        <!-- </van-cell-group> -->
      </div>

      <!-- 截取图片 -->
      <van-row type="flex" justify="end" style="margin-top: 5px;padding-right: 5px;margin-bottom: 5px;" v-show="!surface_plot_show" v-if="coverList.length > 0">
        <van-button
          type="primary"
          size="small"
          @click="surface_plot_show = !surface_plot_show">
          截取
        </van-button>
      </van-row>
      <van-popup
        v-model="surface_plot_show"
        round
        position="bottom"
        closeable
        style="height: 'auto';min-height: 50%;">
        <van-cell-group style="margin-top: 50px;padding: 0px 10px 0px 10px;">
          <van-cell title="截取封面图操作" label="上下滑动图片选取展示区域,点击完成按钮完成操作" />
        </van-cell-group>
        <div ref="imageToFile">
          <div class="outer-container">
            <div class="inner-containe">
              <img :src="imgdef" width="100%">
            </div>
          </div>
        </div>

        <van-row type="flex" justify="end" style="margin-top: 5px;padding-right: 5px;margin-bottom: 5px;">
          <van-button
            type="primary"
            @click="screenShot">
            完成截取
          </van-button>
        </van-row>

        <img :src="imgsd" v-if="imgsd" width="100%" />
      </van-popup>

      <van-uploader v-model="coverList" :after-read="afterReadImg" multiple :max-count="1">
        <van-panel title="选择封面" desc="可选项" ></van-panel>
      </van-uploader>
      <div class="content">

        <van-cell center title="上传视频">
          <van-button :icon="img" @click="deletevideo" ></van-button>
        </van-cell>

        <div class="video-box">
          <template v-if="videoForm.video_path != 1 && videoForm.video_path">
            <!-- <video-player class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions">
            </video-player>  -->
            <video
              class="video-js"
              preload="auto"
              controls=""
              x5-video-player-type="h5-page"
              :poster="playerOptions.poster"
              data-setup='{}'>
              <source :src="playerOptions.sources[0].src" type="video/mp4"></source>
            </video>
          </template>
          <template v-else-if="videoForm.video_path == 1">
            <div style="text-align: center;width: 100%;">
              <van-circle v-model="currentRate" :rate="uploadSchedule" :text="uploadSchedule+'%'" :color="gradientColor" layer-color="#eee"/>
            </div>
          </template>
          <template v-else>
            <van-uploader v-model="videoList" accept="video/*" :after-read="afterRead" multiple :max-count="1"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Notify, Field } from "vant";
import { uploadVideo, uploadImg, uploadBaseImg } from "@/api";
import { publishVideo } from "./actions";
import html2canvas from "html2canvas";

let img = require("./img/delete.png");
export default {
  components: {
    html2canvas,
  },
  data() {
    return {
      value: "",
      videoList: [],
      coverList: [],
      videoForm: {
        nav_id: 71,
        graphic_name: "",
        video_path: "",
        surface_plot: "",
        details: "",
        edit: false,
      },
      img,
      surface_plot: "",
      videoSrc: "",
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "1:1",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src: "",
          },
        ],
        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true,
        },
      },
      uploadShow: true,
      uploadSchedule: 0,
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      surface_plot_show: false,
      imgdef: "",
      imgsd: "",
      isDisable: false,
    };
  },
  computed: {
    descNum() {
      if (this.videoForm.graphic_name.length > 20) {
        this.videoForm.graphic_name = this.videoForm.graphic_name.substr(0, 20);

        Notify("无法在输入了");

        return 20;
      }
      return this.videoForm.graphic_name.length == 0
        ? 0
        : this.videoForm.graphic_name.length;
    },
  },
  watch: {},
  methods: {
    screenShot() {
      html2canvas(this.$refs.imageToFile, {
        useCORS: true,
      }).then((canvas) => {
        this.imgsd = canvas.toDataURL("image/png");

        uploadBaseImg({
          imgVal: canvas.toDataURL("image/png"),
        }).then((res) => {
          if (res.code === 100) {
            this.coverList[0] = {
              url: res.data,
            };
            this.surface_plot_show = false;
          } else {
            this.$toast.error("图片上传失败");
          }
        });
      });
    },
    onBrowserBack() {
      if (
        this.videoForm.nav_id == 8 &&
        this.videoForm.graphic_name == "" &&
        this.videoForm.video_path == "" &&
        this.videoForm.details == ""
      ) {
        this.$router.go(-1);
        return;
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
          // localStorage.setItem("eventBusName", this.videoForm.graphic_name);
          // localStorage.setItem("drafts", JSON.stringify(this.videoForm));
          // this.$router.go(-1);
          this.videoForm.graphic_state = 2;
          publishVideo(this.videoForm)
            .then((res) => {
              if (res.code === 100) {
                this.isDisable = false;
                localStorage.removeItem("drafts");
                localStorage.removeItem("eventBusName");

                if (
                  !this.videoForm.gid != undefined ||
                  !this.videoForm.gid != ""
                ) {
                  sessionStorage.removeItem(this.videoForm.gid + "_edit");
                }

                this.$toast.success(res.msg);

                setTimeout(() => {
                  this.$router.go(-1);
                }, 200);
              } else {
                this.$toast.error(res.msg);
              }
            })
            .catch((error) => {});
        })
        .catch(() => {
          localStorage.removeItem("drafts");
          localStorage.removeItem("eventBusName");

          if (!this.videoForm.gid != undefined || !this.videoForm.gid != "") {
            sessionStorage.removeItem(this.videoForm.gid + "_edit");
          }

          this.$router.go(-1);
        });
    },
    // 上传视频
    async afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      this.videoForm.video_path = 1;
      return axios
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
          this.uploadShow = false;
          if (res.data.status === 100) {
            file.status = "success";
            file.message = "上传成功";
            
            this.videoForm.height = res.data.data.height;
            this.videoForm.width = res.data.data.width;
            this.surface_plot_show = true;
            this.playerOptions.sources[0].src = res.data.data.file;
            this.videoForm.video_path = res.data.data.file;
            this.imgdef = res.data.data.video_surface_plot;
            if (this.coverList.length <= 0) {
              this.coverList[0] = {
                url: res.data.data.video_surface_plot_base,
              };
            }
          } else {
            file.status = "failed";
            file.message = "上传失败";
          }
        });
    },
    //删除未发布上传视频
    async deletevideo() {
      for (const video_path in this.videoForm) {
        if (!this.videoForm.video_path) return this.$toast("请先上传视频");
      }

      this.$dialog
        .confirm({
          title: "删除视频",
          message: "确定要删除此视频吗",
        })
        .then(() => {
          (this.videoForm.video_path = ""), (this.videoList = []);
        })
        .catch(() => {});
    },
    // 发布视频
    async submit() {
      for (const key in this.videoForm) {
        if (
          !this.videoForm[key] &&
          key != "details" &&
          key != "surface_plot" &&
          key != "edit"
        )
          return Notify("请将信息填写完整");
      }

      if (this.coverList.length > 0 && this.coverList != undefined && this.videoForm.surface_plot == '') {
        this.videoForm.surface_plot = this.coverList[0].url;
      }

      if (this.videoForm["graphic_name"].length < 3) {
        Notify("标题长度最少三个字符");
        return false;
      }
      
      this.$dialog
        .confirm({
          title: "发布视频",
          message: "确定要发布此视频吗",
        })
        .then(() => {
          this.isDisable = true;
          publishVideo(this.videoForm)
            .then((res) => {
              if (res.code === 100) {
                this.isDisable = false;
                localStorage.removeItem("drafts");
                localStorage.removeItem("eventBusName");

                if (
                  !this.videoForm.gid != undefined ||
                  !this.videoForm.gid != ""
                ) {
                  sessionStorage.removeItem(this.videoForm.gid + "_edit");
                }

                this.$toast.success(res.msg);

                setTimeout(() => {
                  this.$router.go(-1);
                }, 200);
              } else {
                this.$toast.error(res.msg);
              }
            })
            .catch((error) => {});
        })
        .catch(() => {});
    },
    // 上传图片
    async afterReadImg(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      const res = await uploadImg(data);
      if (res.code === 100) {
        console.log(res.data.src)
        this.videoForm.surface_plot = res.data.src;
        this.imgdef = res.data.src_base;
        this.playerOptions.poster = res.data.src;
      } else {
        this.$toast.error("图片上传失败");
      }
    },
  },
  created() {
    //草稿箱跳转编辑
    if (this.$route.query.draftsEdit) {
      console.log(this.$route.query.videoData);
      this.videoForm = JSON.parse(this.$route.query.videoData);
      this.playerOptions.sources[0].src = this.videoForm.video_path;
      console.log(this.videoForm);
      return;
    }

    var edit_id = this.$route.query.editId;
    if (edit_id != undefined) {
      var data = JSON.parse(
        this.$Utils.demoResponse(sessionStorage.getItem(edit_id + "_edit"))
      );

      this.videoForm.graphic_name = data.graphic_name; // 标题
      this.videoForm.video_path = data.graphic_video_path; //视频地址
      this.videoForm.details = data.details; // 正文
      this.videoForm.surface_plot = data.graphic_surface_plot; // 封面

      this.playerOptions.sources[0].src = data.graphic_video_path; // 播放器视频配置
      this.playerOptions.poster = data.graphic_surface_plot;
      this.videoForm.gid = data.gid;

      this.videoList[0] = {
        url: data.graphic_video_path,
      };
      this.coverList[0] = {
        url: data.graphic_surface_plot,
      };
      this.videoForm.edit = true;
    } else {
      var res = localStorage.getItem("drafts");
      res = JSON.parse(res);
      if (res) {
        this.videoForm.graphic_name = res.graphic_name;
        this.videoForm.video_path = res.video_path;
        this.videoForm.details = res.details;
        this.playerOptions.sources[0].src = res.video_path;
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
  //border-top:1px solid #eee;
  //border-bottom:1px solid #eee;
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
.outer-container {
  width: 100%;
  height: 200px;
  margin-top: 5px;
  position: relative;
  overflow: hidden;
}
.inner-containe {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
