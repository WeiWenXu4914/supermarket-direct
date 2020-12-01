<template>
  <div class="unlocking">
    <div class="top">
      <img src="../../components/img1/返回.png" alt @click="back()"/>
      <p class="p1">保姆/月嫂</p>
      <!-- <button>发布</button> -->
      <van-button 
        type="primary" 
        @click="submit" 
        :disabled="isDisable" 
        :loading="isDisable">
        发布
      </van-button>
    </div>
    <div class="center">
      <input type="text" placeholder="请输入标题（8-20个字)" v-model="fromVal.name" maxlength="20" />
    </div>
    <div class="phoneIn">
      <van-field v-model="fromVal.phone" type="tel" placeholder="请输入联系方式" />
    </div>
    <div class="list">
      <div class="left">
        <input type="text" v-model="fromVal.pay_num" placeholder="￥收费标准" />
      </div>
      <div class="right">
        <span>元 / </span>
        <van-field
          readonly
          clickable
          name="picker"
          :value="fromVal.time"
          placeholder="点击选择时间"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
    </div>
    <div class="content">
      <van-field
        v-model="fromVal.introductory"
        rows="1"
        autosize
        type="textarea"
        placeholder="输入需求描述"
      />
    </div>
    <!-- <div class="bot">
      <div class="left">
        <img src="../../components/img1/dingwei_black.png" alt />
      </div>
      <div class="middle">
        <p>所在位置</p>
      </div>
      <div class="right">
        <p>></p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { babySitter } from './actions'
export default {
  data() {
    return {
      checked:true,
      fromVal:{
        name:'',
        introductory:'',
        pay_num:'面议 / 电议',
        time:'月'
      },
      columns: ['月', '天', '小时', '年', '季'],
      showPicker: false,
      isDisable:false
    }
  },
  created () {
    var data =this.$route.query.id;
    if(data){
      this.fromVal.nid = data
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    onConfirm(value) {
      this.fromVal.time = value;
      this.showPicker = false;
    },
    // 发布
    async submit () {

      this.isDisable = true;
      for (const key in this.fromVal) {
        if (!this.fromVal[key]) {
          this.isDisable = false;
          return this.$toast('请将信息填写完整')
        }
      }
      this.isDisable = true;
      const res = await babySitter(this.fromVal)
       if (res.code === 100) {
        this.$toast.success('发布成功')
        this.$router.go(-1)
      } else {
        this.$toast.fail(res.msg)
        this.isDisable = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.unlocking {
  .top {
    display: flex;
    margin-top: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    button {
      color: #ffffff;
      border-radius: 0.1rem;
      outline: none;
      border: none;
      background-color: #d04443;
      width: 1.5rem;
      height: 0.8rem;
      margin-left: 2rem;
    }
  }
  .center {
    width: 90%;
    border-bottom: 1px solid rgb(247,247,247);
    margin-left: 0.5rem;
    padding-bottom: 0.3rem;
    input {
      width: 90%;
      height: 1rem;
      margin: 1rem 0rem 0rem 0rem;
      font-size: 0.45rem;
      color: #7c7c7c;
      border: none;
    }
  }
  .phoneIn {
    width: 90%;
    border-bottom: 1px solid rgb(247,247,247);
    margin-left: 0.5rem;
    margin-top:0.3rem;
    padding-bottom: 0.3rem;
    input {
      width: 90%;
      height: 1rem;
      margin: 1rem 0rem 0rem 0rem;
      font-size: 0.45rem;
      color: #7c7c7c;
      border: none;
    }
  }
  .content {
    width: 90%;
    color: #969696;
    font-size: 0.45rem;
    margin: 0.5rem 0rem 0rem 0.5rem;
    padding-bottom: 0.5rem;
    p {
      margin-top: 0.2rem;
    }
  }
  .list {
    display: flex;
    margin: 0.8rem 0rem 0rem 0.5rem;
    .left {
      width: 70%;
      border-bottom: 1px solid rgb(247,247,247);
      display: flex;
      padding-bottom: 0.3rem;
      input {
        width: 100%;
        height: 1rem;
        border: none;
        font-size: 0.45rem;
      }
      input::-webkit-input-placeholder {
        color: #404040;
      }
      p {
        font-size: 0.5rem;
        margin-top: 0.1rem;
      }
    }
    .right {
      display: flex;
      width:29%;
      margin-top: 0.2rem;
      span{
        line-height:43px;
      }
      .van-cell {
        width:60px;
        line-height:45px;
        padding-left:5px;
        text-align:center;
        border:0px;
        input {
          border:none;
        }
      }
      .p1 {
        width: 0.5rem;
        height: 0.5rem;
        border: 1px solid #707070;
        border-radius: 50%;
        margin-top: 0.1rem;
      }
      .p2 {
        font-size: 0.45rem;
        margin-left: 0.1rem;
      }
      .p3{
          width: 0.3rem;
          height: 0.3rem;
          background-color: #D04443;
          border-radius: 50%;
          margin: 0.08rem 0rem 0rem 0.07rem;
      }
    }
  }
  .bot {
    margin: 1rem 0rem 0rem 0.5rem;
    display: flex;
    width: 90%;
   border-bottom: 1px solid rgb(247,247,247);
    padding-bottom: 0.3rem;
    .left {
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.1rem;
      }
    }
    .middle {
      p {
        color: #282828;
        font-size: 0.45rem;
        margin-left: 0.3rem;
      }
    }
    .right {
      p {
        color: #7c7c7c;
        font-size: 0.4rem;
        margin-left: 6rem;
      }
    }
  }
}
</style>