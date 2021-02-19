<template>
	<div class="content">

		<div class='title-wrapper'>
	    <van-icon name="arrow-left"  class="title-icon" @click="back" />
	    <div class="title-text">反馈</div>
	  </div>

		<van-button 
			class="from_button" 
			type="primary" 
			size="small" 
			color="#D04443"
			:disabled="btnDis"
			:loading="btnDis"
			@click="feedbackSubmit" >
			反馈
		</van-button>
		<div class="from_class">
			<van-cell-group>
			  <van-field v-model="fromVal.phone" label="联系方式" placeholder="建议输入联系方式" />
			</van-cell-group>
			<van-cell-group>
				<van-field
				  v-model="fromVal.message"
				  rows="1"
				  autosize
				  label="问题描述"
				  left-icon="http://api.lejiagx.cn/static/icon/bitian.png" 
				  type="textarea"
				  placeholder="描述越详细程序猿解决越快，建议上传问题图片"
				/>
			</van-cell-group>
			<van-cell-group>
				<van-uploader 
					v-model="fromVal.fileList" 
					multiple 
					max-count="6"
					:after-read="afterRead"
					@delete="imgDel" />
			</van-cell-group>
		</div>
	</div>
</template>

<script>
import { problemFeedback } from './actions'
import { uploadImg } from '@/api'
export default {
	name: 'feedback',
	components: {},
	data() {
		return{
			fileList:[],
			fromVal:{
				phone:'',
				message:'',
				img_path:[]
			},
			imgObj:[],
			btnDis:false
		}
	},
	methods: {
		back() {

			if (this.fromVal.phone == '' && this.fromVal.message == '' && this.fromVal.img_path.length <= 0) {
        this.$router.go(-1); 
        return;
      }

			this.$dialog.confirm({
        title: '草稿箱',
        message: '是否保存到草稿箱？',
        confirmButtonText : '保留',
        cancelButtonText: '不保留',
        cancelButtonColor : 'red'
      })
      .then(() => {

        localStorage.setItem("feedback",JSON.stringify(this.fromVal));
         this.$router.go(-1);
      })
      .catch(() => {

        localStorage.removeItem("feedback");
        this.$router.go(-1);
      });
		},
		feedbackSubmit() {
			
			if (this.fromVal.message == '') {
				this.$notify('问题描述不能为空');
				return false;
			}

			this.btnDis = true;
			problemFeedback(this.fromVal)
			.then(res => {
				this.btnDis = false;
				if (res.code == 100) {
					localStorage.removeItem("feedback");
					this.$toast.success(res.msg);
				}else{
					this.$toast.fail(res.msg);
				}
				setTimeout(() => {
					this.$router.go(-1)
				}, 500)
			})
			.catch(err => {
				this.btnDis = true;
				console.log(err)
			})
		},
		imgDel(file){

      for (var i = 0; i < this.imgObj.length; i++) {
        if (this.imgObj[i].name == file.file.name) {
          this.imgObj.splice(i, 1);
          this.fromVal.img_path.splice(i, 1);
        }
      }
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
        this.fromVal.img_path.push(res.data.src)
      } else {

        this.$toast.error('图片上传失败')
      }
    }
	},
  created () {
    var res = localStorage.getItem("feedback");
    res = JSON.parse(res);
    if (res) {
    	this.fromVal = res;
    }
  }
}
</script>

<style scoped lang='less'>
	.content {
		width: 100%;
		height:calc(100vh - 50px);
		margin-top: 50px;
		.from_class {
			width: 97%;
			margin: 0px auto;
			padding-top: 15px;
			background: rgba(0,0,0,0);
		}
		.from_button {
			margin-top: -40px;
			float: right;
			z-index:2000;
			margin-right: 10px;
		}
		.van-cell-group {
			padding-top:5px;
			.van-uploader {
				margin-top: 5px;
			}
		}
	}
	.title-wrapper{
	  width: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  height: 50px;
	  display: flex;
	  align-items: center;
	  box-sizing: border-box;
	  padding: 0 14px;
	  z-index: 999;
	  overflow: hidden;
	  .title-text {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    font-size: 19px;
	    color: #484848;
	    max-width: 200px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	  }
	  .title-search{
	    width: 319px;
	  }
	  .title-right{
	    position: absolute;
	    right: 10px;
	    display: flex;
	    align-items: center;
	    justify-content: flex-end;
	  }
	}
</style>