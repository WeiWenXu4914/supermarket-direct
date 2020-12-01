<template>
  <!--实名认证-->
  <div class="realName" :height="this.ScreenHeight" :width="this.ScreenWidth">
    <div class="realName_title">
      <van-icon name="arrow-left" @click="fanhui" />
      <div class="realName_title_text">领取任务需实名认证</div>
    </div>
    <div class="FormLabel">
      <van-field
        v-model="formData.name"
        label="姓名："
        clearable
        placeholder="请填写姓名"
        @blur="testName"
      />
      <div class="warnTips" v-show="rulesResult.name">请输入正确的姓名</div>
      <div class="phoneNumber">
        <van-field
          v-model="formData.mobile"
          label="手机号："
          placeholder="请填写手机号"
          @blur="testPhone"
        />
        <div class="warnTips" v-show="rulesResult.phoneNumber">
          请输入正确的手机号
        </div>
        <div class="getNum">
          <span @click="getCode" v-show="sortMsgShow">获取验证码</span>
          <van-count-down
            :time="time"
            ref="countDown"
            style="color: #ccc"
            format="ss 秒"
            @finish="finish"
            v-show="!sortMsgShow"
          />
        </div>
      </div>
      <van-field
        v-model="formData.code"
        label="验证码："
        placeholder="请填写验证码"
        @blur="testCode"
      />
      <div class="warnTips" v-show="rulesResult.code">请输入正确的验证码</div>
      <van-field
        v-model="formData.idcard"
        label="身份证号："
        placeholder="请填写身份证号"
        @blur="testID"
      />
      <div class="warnTips" v-show="rulesResult.idcard">
        请输入正确的身份证号码
      </div>
      <!--员工类型-->
      <div class="staffType">
        <span>请选择员工类型：</span>
        <van-dropdown-menu
          active-color="#1989fa"
          :overlay="true"
          class="selectId"
        >
          <van-dropdown-item
            :title="text"
            v-model="value1"
            :options="option1"
          />
        </van-dropdown-menu>
      </div>
      <div class="warnTips" v-show="rulesResult.staffType">请选择员工类型</div>
      <div class="FormLabel_agreement">
        <!-- <van-radio-group v-model="radios" direction="horizontal">
                    <van-radio name="1" shape="square" icon-size="16px" checked-color="#D04443">同意并认真阅读</van-radio>
                </van-radio-group> -->
        <van-checkbox
          name="1"
          v-model="radios"
          shape="square"
          icon-size="16px"
          checked-color="#D04443"
          >同意并认真阅读</van-checkbox
        >
        <p @click="privacyFun">《员工入驻规则协议》</p>
      </div>
    </div>
    <van-popup
      v-model="privacyShow"
      closeable
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="privacy">
        <div class="top">
          <p class="p1">《员工入驻规则协议》</p>
        </div>
        <div class="content">
          <p>
            京东于2004年正式涉足电商领域，2019年，京东集团市场交易额超过2万亿元。2019年7月，京东集团第四次入榜《财富》全球500强，位列第139位，是中国线上线下最大的零售集团。
          </p>
        </div>
        <div class="privacy_btn">
          <div class="privacy_btn_left" @click="privacyYn(0)">
            <van-button type="danger">拒绝</van-button>
          </div>
          <div class="privacy_btn_right" @click="privacyYn(1)">
            <van-button type="primary">同意</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <div class="submitted" @click="submit">提交</div>
  </div>
</template>

<script>
import { applyForEmployee, EmployeeType, AliSms } from "./actions";
import { Notify, Toast, Dialog } from "vant";
import { mapState, mapMutations } from "vuex";
Vue.use(Toast);
Vue.use(Notify);
export default {
  data() {
    return {
      ScreenWidth: "",
      ScreenHeight: "",
      radio: "1",
      radios: "1",
      //提交信息
      formData: {
        code: null,
        mobile: null,
        name: null,
        type: null,
        idcard: null,
      },
      //员工类型
      value1: null,
      option1: [],
      //校验数据
      rules: {
        phoneNumber: /^1[3456789]\d{9}$/,
        code: /^\d{6}$/,
        idcard: /^([\d]{17}[xX\d]|[\d]{15})$/,
      },
      //验证结果
      rulesResult: {
        name: false,
        phoneNumber: false,
        code: false,
        idcard: false,
        staffType: false,
      },
      //短信倒计时
      time: 60 * 1000,
      sortMsgShow: true,
      tijiaoid: 1,
      privacyShow: false,
    };
  },
  methods: {
    ...mapMutations(["upUser"]),
    fanhui() {
      this.$router.go(-1);
    },
    privacyFun() {
      this.privacyShow = true;
    },
    privacyYn(type) {
      if (type == 1) {
        this.radios = true;
        this.privacyShow = false;
      } else {
        Dialog.confirm({
          title: "拒绝协议",
          message: "拒绝则返回上一页,填写的数据将丢失!",
        })
          .then(() => {
            this.privacyShow = false;
            this.radios = false;
            this.$router.go(-1);
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    submit() {
      if (!this.radios) {
        Notify("请同意注册协议");
        return false;
      }

      this.testPhone();
      this.testCode();
      this.testID();
      this.testType();
      this.testName();

      if (
        //校验通过
        !this.rulesResult.name &&
        !this.rulesResult.phoneNumber &&
        !this.rulesResult.code &&
        !this.rulesResult.idcard &&
        !this.rulesResult.staffType
      ) {
        this.formData.type = this.value1;
        applyForEmployee(this.formData).then((res) => {
          console.log(res);
          if (res.code == "100") {
            let obj1 = {
              key: "mmtid", //mmtid
              val: res.userSession.mmt_id, // 1 值
            };
            let obj2 = {
              key: "token", //mmtid
              val: res.token, // 1 值
            };
            this.upUser(obj1);
            this.upUser(obj2);
            Toast.success("注册成功");
            this.$router.push({
              path: "/SubmittedSuccessfully",
              query: { tijiaoid: this.tijiaoid },
            });
          } else {
            Toast.fail(res.msg);
          }
        });
      } else {
      }
    },
    finish() {
      this.sortMsgShow = true;
    },
    //获取验证码
    getCode() {
      this.testPhone();
      if (this.formData.mobile !== null && !this.rulesResult.phoneNumber) {
        AliSms(this.formData.mobile)
          .then((res) => {
            this.sortMsgShow = false;
            this.$refs.countDown.reset();
            Notify({ type: "success", message: "发送成功,请注意查收" });
          })
          .catch(() => {
            Notify({ type: "warning", message: "发送失败,请重试" });
          });
      } else {
        Notify({ type: "danger", message: "请输入正确的手机号" });
      }
    },
    //校验数据
    testName() {
      //名字
      if (this.formData.name !== null) {
        this.rulesResult.name = false;
      } else {
        this.rulesResult.name = true;
      }
    },
    testPhone() {
      //电话号
      if (this.rules.phoneNumber.test(this.formData.mobile)) {
        this.rulesResult.phoneNumber = false;
      } else {
        this.rulesResult.phoneNumber = true;
      }
    },
    testCode() {
      //验证码
      if (this.rules.code.test(this.formData.code)) {
        this.rulesResult.code = false;
      } else {
        this.rulesResult.code = true;
      }
    },
    testID() {
      //身份证号
      if (this.rules.idcard.test(this.formData.idcard)) {
        this.rulesResult.idcard = false;
      } else {
        this.rulesResult.idcard = true;
      }
    },
    testType() {
      //员工身份

      if (this.value1 !== null) {
        this.rulesResult.staffType = false;
      } else {
        this.rulesResult.staffType = true;
      }
    },
  },
  mounted() {
    this.ScreenWidth = document.body.clientWidth;
    this.ScreenHeight = document.body.clientHeight;
    // applyForEmployee(this.formData)
    // .then((res) => {
    //     console.log(res)
    // })

    //获取员工身份
    EmployeeType().then((res) => {
      let data = res.data;
      let obj = {
        text: null,
        value: null,
      };
      for (let i = 0; i < data.length; i++) {
        obj.text = data[i].met_type_name;
        obj.value = data[i].metid;
        this.option1.push(obj);
        obj = {
          text: null,
          value: null,
        };
      }
    });
  },
};
</script>

<style lang="less">
.realName {
  // position: absolute;
  .realName_title {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    font-size: 18px;
    text-align: center;
    .realName_title_text {
      width: 50vh;
      font-weight: 600;
    }
  }
  .phoneNumber {
    position: relative;
    .getNum {
      position: absolute;
      z-index: 1;
      right: 10px;
      top: 10px;
      color: #d04443;
    }
  }
  .FormLabel {
    width: 94%;
    height: auto;
    margin: auto;
    text-align: left;
    padding-top: 10px;
    .warnTips {
      text-indent: 30%;
      color: red;
    }
    /deep/ .van-cell {
      margin-top: 15px;
    }

    .FormLabel_radio {
      display: flex;
      justify-content: space-between;
      margin-top: 35px;
      margin-left: 15px;
    }
    .FormLabel_agreement {
      display: flex;
      margin-top: 40px;
      margin-left: 15px;
      p {
        color: #d04443;
      }
      .van-radio--horizontal {
        margin-right: 0;
      }
    }
    .staffType {
      // border: 1px solid red;
      margin-top: 20px;
      margin-left: 15px;
      span {
        color: #323233;
        margin: 10px 0;
      }
      .selectId {
        margin-top: 10px;
      }
    }
  }
  .submitted {
    width: 94%;
    height: 40px;
    margin: auto;
    background: #d04443;
    color: #fff;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
    position: fixed;
    bottom: 10px;
    left: 3%;
  }

  .privacy {
    .top {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.5rem 0rem 0.2rem 0.3rem;
      border-bottom: 1px solid #d9d9d9;
      padding-bottom: 0.4rem;

      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.15rem;
      }
      .p1 {
        margin-left: 0.9rem;
        color: #2f2f2f;
        font-size: 0.5rem;
        font-weight: 600;
        font-family: Source Han Sans CN;
      }
    }
    .content {
      width: 92%;
      margin: 0.5rem 0rem 0rem 0.3rem;
      p {
        color: #525252;
        text-indent: 0.65rem;
      }
    }
    .privacy_btn {
      width: 90%;
      left: 5%;
      position: fixed;
      bottom: 10px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      div {
        flex: 1;
      }
      .van-button {
        width: 90%;
      }
      .privacy_btn_right {
        text-align: right;
      }
    }
  }
}
</style>