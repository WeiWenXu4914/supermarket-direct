<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text" :style="{color: color}"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editoritem',
  defaultText:{
    type: String,
  },
  data () {
    return {
      // uploadPath,
      editor: null,
      info_: '',
      img_path: [],
      startEditor:true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#CFCFCF'
    }
  },

  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
  },
  mounted () {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor (){
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.showLinkImg = false
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = 'http://apis.lejiagx.cn/api/ImgUpload'// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = { }// 自定义 header
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 50 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

      //提供默认值功能
      this.editor.customConfig.onfocus = () => {
        //如果为默认值点击后清空文本
        if (this.editor.txt.html()=='<p style="color:#909FA6;">请点击输入正文</p>'){
          this.editor.txt.html(``)
        }
      };

      // 配置菜单
      this.editor.customConfig.menus = [
        'image', // 插入图片
        'bold', // 粗体
        'underline', // 下划线
        'link' // 插入链接
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
         
          let url = result.data.src
          if (this.img_path.length <= 3) {
            this.img_path.push(url)
            this.$emit('imgPush', this.img_path) // 将内容同步到父组件中
          }
          insertImg(url)
        }
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()

    }
  }
}
</script>

<style lang="less">
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    z-index: 0;
    padding-bottom: 45px;
  }
  .toolbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height:40px;
    background-color: rgb(246, 246, 246);
    padding: 0 15px;
    display: flex;
    align-items: center;
    z-index: 99990;
    .w-e-menu {
      padding: 0;
      margin: 0;
      width: 80px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      font-size: 24px !important;
    }
  }
  .text {
    height: calc(100vh - 150px);
    overflow: scroll;
    padding : 10px;
    font-size:15px;
    font-weight:400;
    line-height:26px;
  }
</style>
