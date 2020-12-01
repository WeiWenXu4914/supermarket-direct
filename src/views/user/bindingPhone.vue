<template>
  <div class="login">
    <div class="title1">
      您好，
    </div>
    <div class="title2">
      欢迎使用城事乐家
    </div>
    <br />
    <br />
    <div class="title3">
      绑定手机号
    </div>
    <div class="tel">
      <van-cell-group>
        <van-field v-model="form.mobile" type="tel" @blur="PhoneVerif" placeholder="请输入手机号"/>
      </van-cell-group>
      <van-field
        v-model="form.code"
        center
        clearable
        placeholder="请输入验证码">
        <template #button>
          <van-button 
            class="add" 
            @click="settime"
            :disabled="isDis"
            :loading="isDis"
            :loading-text="settimeText">
            <span class="btn-font">
              {{settimeText}}
            </span>
          </van-button>
        </template>
      </van-field>
    </div>
    <div class="log">
      <div class="wx" @click="back">
        <img src="http://api.lejiagx.cn/static/icon/取消.png" alt="">
      </div>
      <div class="but">
        <button @click="submit" :disabled="loginLoading">绑定</button>
      </div>
    </div>
    <van-loading v-show = "loginLoading" color="#1989fa" size="36px" vertical>绑定中...</van-loading>
  </div>
</template>

<script>
import { getCode, bindingPhone, bindingPhoneVerif} from '@/api/login'
import { isvalidPhone, isvalidCode } from '@/utils/validate'
import { Notify } from 'vant'
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'bindingPhone',
  data() {
    return {
      form: {
        mobile: '',
        code: ''
      },
      loginLoading:false,
      settimeCode:60,
      settimeText:'获取验证码',
      isDis:false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {},
  methods:{
  	PhoneVerif(){
  		if (isvalidPhone(this.form.mobile)) {
        bindingPhoneVerif(this.form);
      }else{
      	Notify({type: 'danger', message: '手机号码或验证码有误'});
      }
  	},
  	back(){
      
      var back = this.$route.query.back;
      
      if(!back){
        this.$router.go(-1);
      }else if(back == 'no'){
        Notify({type: 'danger', message: '根据国家监管局规定,必须绑定手机号!'});
        return false;
      }
  	},
    //获取验证码
    getCodeHandler(cd){
      //校验
      if (isvalidPhone(this.form.mobile)){
        getCode(this.form).then(res => {
          if (res.code == 100) {
            cd({ code:1, msg: res.msg });
          }else{
            cd({ code:0, msg: res.msg });
          }
        })
      }else {
        cd({code:0,msg:'请输入正确的手机号码'});
      }
    },
    ...mapMutations(["upUser"]),
    // 绑定
    submit(){
      //开启加载
      this.loginLoading = true;
      // 校验
      if (isvalidPhone(this.form.mobile) && isvalidCode(this.form.code)) {
        this.form.id = this.user.id;
        bindingPhone(this.form).then((res) => {

          if (res.code == 100) {

            var obj = {
              key: "phone",
              val: this.form.mobile,
            };
            this.upUser(obj);
            
            //关闭加载
            this.loginLoading = false;

            var back = this.$route.query.back;
      
            if(!back){
              this.$router.go(-1);
            }else if(back == 'no'){
              this.$router.push('/');
            }

            Notify({ type: 'success', message: res.msg,duration: 1000 });

          }else{
            this.loginLoading = false;
          }

        }).catch(() => {
          //关闭加载
          this.loginLoading = false;
        })
      } else {
        //关闭加载
        this.loginLoading = false;
        Notify({type: 'danger', message: '手机号码或验证码有误'});
      }
    },
    settime() {

      if (this.settimeCode == 60) {
        this.getCodeHandler((res)=>{
          if (res.code == 1) {
            Notify({ type: 'success', message: res.msg });
          }else{
            Notify({ type: 'danger', message: res.msg });
            return;
          }
        });
      }

      if (this.settimeCode == 0) {
        this.settimeText = '获取验证码';
        this.settimeCode = 60;
        this.isDis = false;
        return;
      } else {
        this.isDis = true;
        this.settimeText = ("重新发送(" + this.settimeCode + ")");
        this.settimeCode--;
      }

      setTimeout(() => {
        this.settime() 
      }, 1000);
    }
  }
}
</script>

<style lang="less">
.login{
  width: 90%;
  margin: 0 auto;
  text-align:left;
  .title1{
    margin-top: 50px;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .title2{
    display: inline;
  }
  .title3{
    color: 	#D04443;
    display: inline;
  }
  .tel{
    margin-top: 30px;
    .van-cell.van-cell--center.van-field{
      padding: 10px 0px;
    }
    .van-hairline--top-bottom {
      position: inherit;
      .van-cell {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0px;
        overflow: hidden;
        color: #323233;
        line-height: 24px;
        background-color: #fff;
      }
    }

    .van-field{
      border-bottom: 1px solid #fcfcfc;
      .van-cell{
        padding: 10px 0px;
      }
      .add {
        position: relative;
        border: none;
        color: #D04443;
        background: white;
      }
      .btn-font {
        color: #D04443;
        font-size: 16px;
        position: relative;
        top: -2px;
      }
    }
  }
  .log{
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wx{
      display: flex;
      align-items: center;
      img{
        width: 35px;
        margin-right:10px;
      }
      span{
        margin-left: 7px;
        font-size: 14px;
      }
    }
    .but{
      button{
        width: 100px;
        height: 35px;
        background-color: #D04443;
        color: #fff;
        border: none;
        border-radius: 35px;
      }
    }
  }
}
</style>