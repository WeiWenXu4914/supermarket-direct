<template>
  <div>
    <div class="wrapper">
      <div class="header">
        <span class="cancel" @click="onBrowserBack">取消</span>
        <span class="write">写文章</span>
        <div class="submit" @click="submit">发布</div>
      </div>
      <div class="tittle">
        <input
          type="text"
          placeholder="请输入标题（3-150个字）"
          v-model="articleForm.graphic_name"
          v-bind="descNum"
        />
      </div>
    </div>
    <div class="select-pro" @click="selectProShowFun" v-if="productListed == ''">选择商品</div>
    <div class="select-proed" @click="selectProShowFun" v-else>
      <van-card
          :num="productListed.pro_inventory"
          :price="priceTransform(productListed.pro_price)"
          :desc="productListed.pro_introduction"
          :title="productListed.pro_name"
          :thumb="productListed.pro_thumbnail"
        >
          <template #footer>
            <van-button size="mini" color="#D04443" @click.stop="productListed = ''">重新选择</van-button>
          </template>
        </van-card>
    </div>

    <!-- <editor-bar v-model="articleForm.graphic_details" :color="color" @click="onFocus"  :isClear="isClear" @change="change" @imgPush="imgPush"></editor-bar> -->
    <!-- bidirectional data binding（双向数据绑定） -->
    <!-- @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)" -->
    <quill-editor
      v-model="articleForm.graphic_details"
      ref="myQuillEditor"
      :options="editorOption"
      @change="onEditorChange($event)"
    />

    <van-overlay :show="uploadShow">
      <div class="UploadWrapper">
        <van-circle
          v-model="currentRate"
          :rate="uploadSchedule"
          :text="uploadSchedule + '%'"
          :color="gradientColor"
          layer-color="#eee"
        />
      </div>
    </van-overlay>

    <van-popup
      v-model="selectProShow"
      closeable
      round
      position="bottom"
      :style="{ height: 'auto' }">

      <div class="pro-list" v-if="productList.length > 0">
        <van-card
          v-for="(items, index) in productList"
          :key="index"
          :num="items.pro_inventory"
          :price="priceTransform(items.pro_price)"
          :desc="items.pro_introduction"
          :title="items.pro_name"
          :thumb="items.pro_thumbnail"
          @click="selectProductSet(items)"
        >
          <template #footer>
            <van-button size="mini" color="#D04443">选择该商品</van-button>
          </template>
        </van-card>
      </div>
      <div v-else>
        <van-empty description="数据为空,请先上传产品" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// Quill.register('modules/ImageExtend', ImageExtend)

import { articleCreate, getProductSet } from "./actions";
import { uploadVideo } from "@/api/index";

import { wxJssdkChooseImage } from "@/utils/wxshare.js";
import wx from "weixin-js-sdk"; //微信sdk依赖
import { Toast, Notify } from "vant";

const uploadConfig = {
  // action:  'https://www.lumingtec.cn/Business/serviceInterface/fileUpload.json',  // 必填参数 图片上传地址
  methods: "POST", // 必填参数 图片上传方式
  token: "", // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: "file", // 必填参数 文件的参数名
  size: 700, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选 可上传的图片格式
  type: "audio/mp4,video/mp4",
};
const BlockEmbed = Quill.import("blots/block/embed");
class VideoBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute("src", value.url);
    node.setAttribute("controls", value.controls);
    node.setAttribute("width", value.width);
    node.setAttribute("height", value.height);
    node.setAttribute("poster", value.poster);
    node.setAttribute("webkit-playsinline", true);
    node.setAttribute("playsinline", true);
    node.setAttribute("x5-playsinline", true);
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute("src"),
      controls: node.getAttribute("controls"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
    };
  }
}
VideoBlot.blotName = "simpleVideo";
VideoBlot.tagName = "video";
Quill.register(VideoBlot);

export default {
  components: {
    quillEditor,
  },
  data() {
    let dataThis = this;
    return {
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: [
              [
                "bold",
                "italic",
                "strike",
                "underline",
                "code-block",
                "blockquote",
                "image",
                "video",
                { list: "ordered" },
                { list: "bullet" },
                { header: 1 },
                { header: 2 },
              ],
            ],
            handlers: {
              image: function () {
                var that = dataThis;

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
              video: function () {

                dataThis.articleForm.video_path = [];
                var self = this;
                var fileInput = this.container.querySelector(
                  "input.ql-video[type=file]"
                );
                if (fileInput === null) {
                  fileInput = document.createElement("input");
                  fileInput.setAttribute("type", "file");
                  if (uploadConfig.name) {
                    fileInput.setAttribute("name", uploadConfig.name);
                  }
                  fileInput.setAttribute("accept", "video/*");
                  fileInput.style.cssText =
                    "border:none; display:none;height:0px;";

                  fileInput.addEventListener("change", function () {
                    var formData = new FormData();
                    formData.append(uploadConfig.name, fileInput.files[0]);
                    if (uploadConfig.token) {
                      formData.append("token", uploadConfig.token);
                    }
                    dataThis.uploadShow = true;
                    return axios
                    .post("http://apis.lejiagx.cn/api/VideoUpload", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      onUploadProgress: (progressEvent) => {
                        
                        var progr = progressEvent.loaded / progressEvent.total;
                        dataThis.uploadSchedule = parseInt(progr * 100);
                      },
                    })
                    .then((response) => {
                      dataThis.uploadShow = false;
                      if (response.data.status === 100) {

                        dataThis.articleForm.video_path = response.data.data;

                        let url = response.data.data.file;
                        let length = self.quill.getSelection().index; //获取当前鼠标焦点位置
                        self.quill.insertEmbed(length-1, "simpleVideo", {
                          url,
                          controls: "controls",
                          poster: response.data.data.video_surface_plot_base,
                          width: "100%",
                          height: "400px",
                        });
                      }
                    });
                    // uploadVideo(formData).then((response) => {
                    //   let url = response.data.file;
                    //   let length = self.quill.getSelection().index; //获取当前鼠标焦点位置
                    //   self.quill.insertEmbed(length, "simpleVideo", {
                    //     url,
                    //     controls: "controls",
                    //     poster: response.data.video_surface_plot_base,
                    //     width: "100%",
                    //     height: "400px",
                    //   });
                    // });
                  });

                  this.container.appendChild(fileInput);
                }
                fileInput.click();
              },
            },
          },
          // ,
          // ImageExtend: {
          //   loading: true,
          //   name: 'file',
          //   action: 'http://apis.lejiagx.cn/api/ImgUpload',
          //   response: (res) => {
          //     return res.data.src;
          //   }
          // }
        },
      },
      fileList: [],
      isClear: false,
      color: "black",
      articleForm: {
        graphic_name: "",
        graphic_details: "",
        img_path: [],
        edit: false,
      },
      articleCont: "",
      imgVal: [],
      uploadShow: false,
      uploadSchedule: 0,
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      selectProShow: false,
      productList: [],
      productListed: ''
    };
  },
  computed: {
    descNum() {
      if (this.articleForm.graphic_name.length > 150) {
        this.articleForm.graphic_name = this.articleForm.graphic_name.substr(
          0,
          150
        );
        return 20;
      }
      return this.articleForm.graphic_name.length == 0
        ? 0
        : this.articleForm.graphic_name.length;
    },
  },
  watch: {
    detail(val, oldVal) {
      if (val !== oldVal) {
        this.color = "#292929 ";
      }
    },
  },
  // created () {

  //   wxJssdkChooseImage();
  // },
  methods: {
    selectProShowFun() {
      this.selectProShow = true;
      getProductSet().then(res=>{
        this.productList = res.data;
      })
    },
    priceTransform(val) {
      return parseFloat(val).toFixed(2);
    },
    selectProductSet(val) {
      this.articleForm.proid = val.proid;
      this.productListed = val;
      this.selectProShow = false;
      Toast('选择成功');
    },
    onEditorChange(editor) {
      // 删除数组中的图片
      for (var i = 0; i < this.articleForm.img_path.length; i++) {
        if (
          this.articleForm.img_path[i] ==
          editor.quill.editor.delta.ops[0].insert.image
        ) {
          this.articleForm.img_path.splice(i, 1);
        }
      }
    },
    change(val) {
      this.articleCont = val;
    },
    syncShow(wx, localIds) {
      var that = this;
      var localId = localIds.pop();

      wx.getLocalImgData({
        localId: localId, // 图片的localID
        success: function (data) {
          var localData = data.localData;
          var le = that.imgVal.length;
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
            };

            that.uploadShow = true;
            axios
              .post("http://apis.lejiagx.cn/api/BaseImgUpload", obj, {
                onUploadProgress: (progressEvent) => {
                  var progr = progressEvent.loaded / progressEvent.total;
                  that.uploadSchedule = parseInt(progr * 100);
                },
              })
              .then((res) => {
                res = res.data;

                that.uploadShow = false;
                if (res.code === 100) {
                  that.imgVal = [];
                  for (var i = 0; i < res.data.length; i++) {
                    let length = that.$refs.myQuillEditor.quill.getSelection()
                      .index;
                    that.$refs.myQuillEditor.quill.insertEmbed(
                      length,
                      "image",
                      res.data[i]
                    );
                    that.$refs.myQuillEditor.quill.setSelection(length + 1);
                  }

                  that.articleForm.img_path = res.data;
                } else {
                  that.uploadShow = false;
                  this.$toast.error("图片上传失败");
                }
              })
              .catch(() => {
                that.uploadShow = false;
                this.$toast.error("请求出错");
              });
          }
        },
      });
    },
    imgPush(val) {
      this.articleForm.img_path = val;
    },
    // 发布文章
    async submit() {
      if (this.articleForm.graphic_name == "") {
        Toast("请填写标题");
        return false;
      }

      if (this.articleForm.graphic_name.length < 3) {
        Notify("标题长度最少三个字符");
        return false;
      }

      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        overlay: true,
        duration: 0,
      });
      
      if(this.$route.query.id){
        this.articleForm.nav_id = this.$route.query.id;
      }
      
      const res = await articleCreate(this.articleForm);
      if (res.code === 100) {
        localStorage.removeItem("create");
        localStorage.removeItem("article");

        if (!this.articleForm.gid != undefined || !this.articleForm.gid != "") {
          sessionStorage.removeItem(this.articleForm.gid + "_edit");
        }
        this.$toast.clear();
        this.$toast.success(res.msg);
        setTimeout(() => {
          this.$router.go(-1);
        }, 900);
      } else {
        this.$toast.clear();
        this.$toast.fail(res.msg);
      }
    },
    onBrowserBack() {
      if (
        this.articleForm.graphic_name == "" &&
        this.articleForm.graphic_details == "" &&
        this.articleForm.img_path.length == 0
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
          //保存到草稿箱

          this.articleForm.graphic_state = 2; //编辑草稿箱操作
          articleCreate(this.articleForm)
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
        })
        .catch(() => {
          this.$router.go(-1);
        });
    },
  },
  created() {
    //来自草稿箱跳转编辑
    if (this.$route.query.draftsEdit) {
      this.articleForm = JSON.parse(this.$route.query.articleData);
      return;
    }

    wxJssdkChooseImage();

    var edit_id = this.$route.query.editId;
    if (edit_id != undefined) {
      var data = JSON.parse(
        this.$Utils.demoResponse(sessionStorage.getItem(edit_id + "_edit"))
      );
      this.articleForm.graphic_name = data.graphic_name;
      this.articleForm.graphic_details = data.graphic_details;
      this.articleForm.gid = data.gid;
      this.articleForm.edit = true;
      data.graphic_thumbnail.forEach((v, k) => {
        Vue.set(this.articleForm.img_path, k, v.graphic_thumbnail_path);
      });
    } else {
      var res = localStorage.getItem("create");
      res = JSON.parse(res);
      if (res) {
        this.articleForm = res;
      }
    }
  },
};
</script>
<style lang='less' scoped>
.wrapper {
  padding: 0 20px;
  height: 100%;
  position: relative;
  .header {
    height: 73px;
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
    input {
      width: 100%;
      border: none;
      border-radius: 0;
      border-bottom: 2px solid #eee;
      height: 30px;
      line-height: 20px;
      padding-bottom: 5px;
    }
  }
  .content {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    margin: 10px 15px 10px 0;
    /deep/ .van-uploader__upload {
      padding: 0;
      margin: 0;
      display: none;
    }
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
.UploadWrapper {
  width: 100%;
  height: 100vh;
  line-height: 100vh;
  text-align: center;
}
/deep/ .ql-container.ql-snow {
  border: none;
}
/deep/ .ql-toolbar.ql-snow {
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  padding: 8px;
  position: fixed;
  bottom: 0px;
  z-index: 2;
  background: #fff;
}
/deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
  /*border-top: 0px;*/
  height: calc(100vh - 220px);
}
/deep/ .ql-toolbar.ql-snow .ql-formats {
  margin-right: 0rem;
}
/deep/ .ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button {
  background: #eee;
  border: 1px #fff solid;
  display: inline-block;
  border-radius: 5px;
  float: left;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 30px;
  margin-left: 10px;
  margin-bottom: 5px;
}
.select-pro {
  width: 92%;
  min-height: 30px;
  margin: 0 auto;
  line-height: 30px;
  color: #707070;
}
.select-proed {
  width: 92%;
  min-height: 50px;
  margin: 0 auto;
}
.pro-list {
  margin-top: 50px;
  padding-bottom: 10px;
}
</style>
