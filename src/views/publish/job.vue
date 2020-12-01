<!-- 发布视频页 -->
<template>
  <div>
    <div class="wrapper">
      <page-title title="发布职位" :titleSize="19" titleFontWeight="500" titleColor="#2F2F2F"></page-title>
      <div class="submit" @click="submit">
        发布
      </div>
      <div class="info-wrapper">

        <van-field 
          v-model="jobForm.company_name" 
          placeholder="请输入公司名称" 
          left-icon="http://api.lejiagx.cn/static/icon/bitian.png" 
          type="text" 
        />

        <van-field 
          v-model="jobForm.position" 
          placeholder="请输入职位" 
          left-icon="http://api.lejiagx.cn/static/icon/bitian.png" 
          type="text" 
        />

        <div class="info info-money oninput" >
          <div class="money-box" v-if="!show">
            <div style="float: left;width: 75%;">
              <div>
                <van-field class="ipt1" v-model="money.l" type="number" placeholder="最低薪资" />
              </div>
              <div class="ic">—</div>
              <div>
                <van-field class="ipt2" v-model="money.h" type="number" placeholder="最高薪资" />
              </div>
            </div>
            <div style="float: right;">元/月</div>
            <div style="margin-left: 15px;" @click="delInput">
              <van-icon name="delete" />
            </div>
          </div>
          <van-field 
            v-model="jobForm.pay_num" 
            placeholder="请输入薪资范围" 
            left-icon="http://api.lejiagx.cn/static/icon/bitian.png" 
            type="text" 
            v-if="show"
            @click="show = !show"
          />
        </div>

        <van-field 
          v-model="jobForm.phone" 
          left-icon="http://api.lejiagx.cn/static/icon/bitian.png" 
          type="tel" 
          placeholder="请输入联系方式" 
        />

        <van-field
          rows="1"
          autosize
          type="textarea"
          v-model="jobForm.introductory" placeholder="经验要求、最低学历、薪资范围、职位描述、工作地点等等..."
        />

      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import { publishJob } from './actions'
export default {
  components: {
    PageTitle
  },
  data () {
    return {
      show: true,
      jobForm: {
        pay_num: '面议 / 电议', // 价格
        phone: '', // 联系方式
        introductory: '', // 简介
        site: '五原', //地址
        //company_name: '', // 公司地址
        position: '', // 职位
        edit:false
      },
      money:{
        l: '',
        h: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    initUserPhone () {
      this.jobForm.phone = this.user.phone || ''
    },
    delInput () {
      this.show = true;
      this.money.l = '';
      this.money.h = '';
      this.jobForm.pay_num = '面议 / 电议';
    },
    async submit() {

      if (this.money.l.length > 0 && this.money.h.length > 0) {
        this.jobForm.pay_num = this.money.l + '-' + this.money.h;
      }

      for ( let i in this.jobForm) {
        if (!this.jobForm[i] && i != 'edit') {
          this.isDisable = false; 
          return this.$toast('请将信息填写完整')
        }
      }

      this.isDisable = true;
      const res = await publishJob(this.jobForm)
      if (res.code === 100) {
        
        this.$toast.success('发布成功')
        
        if (!this.jobForm.gid != undefined || !this.jobForm.gid != '') {
          sessionStorage.removeItem(this.jobForm.gid+'_edit');
        }
        this.$router.go(-1)
      } else {
        this.$toast.fail(res.msg)
        this.isDisable = false;
      }
    }
  },
  created () {
    this.initUserPhone()

    var edit_id = this.$route.query.editId

    if (edit_id != undefined) {

      var res = JSON.parse(this.$Utils.demoResponse(sessionStorage.getItem(edit_id+'_edit')));

      this.jobForm.nav_id = res.graphic_nav_id;
      this.jobForm.pay_num = res.ge_pay_num;
      this.jobForm.phone = res.ge_phone;
      this.jobForm.introductory = res.ge_introductory;
      this.jobForm.site = res.ge_site;
      this.jobForm.company_name = res.ge_company_name;
      this.jobForm.position = res.ge_position;
      
      this.jobForm.gid = res.gid;
      this.jobForm.edit = true;
      
    }else{

      var data = this.$route.query.id;
      if(data){
        this.jobForm.nid = data
      }
    }
  }
}
</script>
<style lang='less' scoped>
.wrapper {
  //padding: 50px 20px 0 20px;
  .info-wrapper{
    margin-top:50px;
    div > input {
      width: 100%;
      background: none;
      border: none;
      height: 30px;
      padding:24px 0;
      font-size: 16px;
      color:rgba(44,44,44,0.8);
      font-weight:400;
      border-bottom: 1px solid #EBEBEB;
      border-radius: 0;
      &::-webkit-input-placeholder{
        color: #2C2C2C;
      }
      &::-moz-placeholder{
        color: #2C2C2C;
      }
      &::-ms-input-placeholder{
        color: #2C2C2C;
      }
      &::-moz-placeholder{
        color: #2C2C2C;
      }
    }
    div > textarea {
        width: 100%;
        border: none;
        background: none;
        min-height: 150px;
        font-size: 15px;
        color: #969696;
        margin-top: 20px;
        &::-webkit-input-placeholder{
          color: #969696;
        }
        &::-moz-placeholder{
          color: #969696;
        }
        &::-ms-input-placeholder{
          color: #969696;
        }
        &::-moz-placeholder{
          color: #969696;
        }
    }
    .info-money{
      position: relative;
      .money-box{
        position: absolute;
        left: 10px;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        div{
          display: flex;
          align-items: center;
        }
        .ipt1{
          width: 100%;
          border: none;
          input{
            padding:0px;
          }
        }
        .ipt2{
          width: 100%;
          border: none;
          input{
            padding:0px;
          }
        }
        .ic{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 100%;
          padding: 0 0px;
        }
      }
      .tit{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .submit {
    position: fixed;
    width: 50px;
    height: 28px;
    font-size: 15px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgba(208,68,67,1);
    opacity:1;
    border-radius:6px;
    top: 10px;
    right: 20px;
    z-index:100000;
  }
}
.oninput {
  display: flex;
  align-items: center;
  height: 30px;
  padding:24px 0;
  font-size: 16px;
  position: relative;
}
</style>
