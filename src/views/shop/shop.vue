<template>
  <div class="shop-page">
    <div class="top">
      <van-icon name="arrow-left" size="20px" @click="$router.go(-1)" />
      <p>商家入驻</p>
    </div>
    <div class="center">
      <van-field
        v-model="text"
        label="商铺名称"
        placeholder="请输入商铺名称"
        label-align="center"
        class="inp"
      />
      <van-field
        v-model="formData.mobile"
        type="tel"
        label="联系方式"
        placeholder="请输入真实手机号码"
        label-align="center"
        class="inp"
        @blur="PhoneVerif"
      />
      <van-field
        v-model="formData.code"
        center
        clearable
        label="验证码"
        label-align="center"
        placeholder="请输入验证码"
        class="inp"
      >
        <template #button>
          <van-button
            size="small"
            type="default"
            color="#D04443"
            @click="getCodeHandler"
            :disabled="!show"
          >
            <!--          获取验证码-->
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">重新发送({{ count }})</span>
          </van-button>
        </template>
      </van-field>
      <!--      <van-dropdown-menu>-->
      <!--        <van-dropdown-item v-model="typeList.ecid" :options="typeList" />-->
      <!--      </van-dropdown-menu>-->
      <van-field
        readonly
        clickable
        name="picker"
        :value="qyvalue"
        label="所属类型"
        placeholder="请选择企业类型"
        @click="showPicker = true"
        style="
          width: 95%;
          color: #292929;
          text-align: center;
          padding-bottom: 0.3rem;
          margin: 0.3rem 0rem 0rem 0rem;
        "
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="oneList"
          @confirm="qyConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <img src="../../components/img1/select.png" alt="" class="select2" />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areavalue"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="area"
        :value="areaValue1"
        label="所属地区"
        placeholder="请选择省市区"
        @click="showArea = true"
        label-align="center"
        class="inp"
      />
      <img src="../../components/img1/select.png" alt="" class="select2" />
      <input
        type="text "
        v-model="address"
        placeholder="详情地址（如街道、小区、乡镇、村）"
        class="inp1"
      />
    </div>
    <div class="read">
      <van-checkbox v-model="checked" shape="square" checked-color="#D04443">
        <p class="agree">同意并认真阅读</p>
        <p class="rule" @click="$router.push('/rule')">《商家入驻规则协议》</p>
      </van-checkbox>
    </div>
    <div class="btn">
      <van-button type="primary" @click="apply">报名入驻</van-button>
    </div>
  </div>
</template>

<script>
import { checkinPost, getentClass } from "./actions";
import area from "./actions/area";
import { isvalidPhone } from "@/utils/validate";
import { getCode, bindingPhoneVerif } from "@/api/login";
import { Notify, Toast } from "vant";
export default {
  name: "shop",
  data() {
    return {
      areavalue: area,
      TIME_COUNT: 60, //验证码倒计时60s
      formData: {
        mobile: "",
        code: "",
      },
      count: "",
      show: true,
      qyvalue: "",
      showPicker: false,
      address: "",
      checked: false,
      // code: "",
      // tel: "",
      digit: "",
      // number: "",
      // password: "",
      areaValue1: "",
      text: "",
      // sms:"",
      itemType: false,
      showArea: false,
      typeList: [],
      oneList: [],
      province_list: "",
      city_list: "",
      county_list: "",
      onething: "",
    };
  },
  created() {
    this.getentClass();
  },
  methods: {
    PhoneVerif(){
  		if (isvalidPhone(this.formData.mobile)) {
        bindingPhoneVerif(this.formData);
      }else{
      	Notify({type: 'danger', message: '手机号码或验证码有误'});
      }
  	},
    qyConfirm(value) {
      console.log(value)
      this.qyvalue = value;
      this.showPicker = false;
    },
    onConfirm(values) {
      this.areaValue1 = values.map((item) => item.name).join("/");
      this.showArea = false;
      for (let i = 0; i < values.length; i++) {
        if (i == 0) {
          this.province_list = values[i].name;
        } else if (i == 1) {
          this.city_list = values[i].name;
        } else {
          this.county_list = values[i].name;
        }
      }
    },
    getentClass() {
      getentClass().then((res) => {
        this.typeList = res.data;
        for (let i = 0; i < this.typeList.length; i++) {
          this.oneList.push(this.typeList[i].ent_class_name);
        }
      });
    },
    //获取验证码
    getCodeHandler(formData) {
      //校验
      if (isvalidPhone(this.formData.mobile)) {
        
        getCode(this.formData).then((res) => {
          console.log(res)
          if (res.code == 100) {
            Notify({ code: 1, message: res.msg });
          } else {
            Notify({ code: 0, message: res.msg });
          }
        });
      } else {
        Notify({ code: 0, message: "请输入正确的手机号码" });
        return;
      }
      // 验证码倒计时60s
      if (!this.timer) {
        this.count = this.TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= this.TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    apply() {
      if (this.text == "") {
        this.$toast.fail("店铺名称不能为空!");
        return;
      }
      if (this.formData.mobile == "") {
        this.$toast.fail("手机号不能为空!");
        return;
      }
      if (this.formData.code == "") {
        this.$toast.fail("验证码不能为空!");
        return;
      }
      if (this.qyvalue == "") {
        this.$toast.fail("企业类型不能为空!");
        return;
      }
      if (this.province_list == "") {
        this.$toast.fail("所属地区不能为空!");
        return;
      }
      if (this.address == "") {
        this.$toast.fail("详情地址不能为空!");
        return;
      }
      if (this.checked === false) {
        this.$toast.fail("未同意商家入驻规则协议不能入驻!");
        return;
      }
      let ent = {
        phone_name: this.text,
        phone_number: this.formData.mobile,
        code: this.formData.code,
        class: this.qyvalue,
        province: this.province_list,
        city: this.city_list,
        district: this.county_list,
        site: this.address,
      };
      console.log(ent)

      checkinPost(ent).then((res) => {
        if (res.code == 100) {
          Notify({ type: "success", message: "入驻成功" });
          this.$route.go(-1)
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.shop-page {
  background-color: #ffffff;
  .top {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    .van-icon-arrow-left {
      width: 0.3rem;
      margin-left: 0.4rem;
      z-index: 1;
    }
    p {
      position: absolute;
      display: block;
      width: 100%;
      text-align: center;
      font-family: Source Han Sans CN;
      font-size: 0.45rem;
      z-index: 0;
    }
  }
  .center {
    position: relative;
    .inp {
      width: 95%;
      color: #292929;
      padding-bottom: 0.3rem;
      margin: 0.3rem 0rem 0rem 0rem;
    }
    .inp1 {
      border: none;
      width: 90%;
      height: 1rem;
      outline: none;
      margin: 0.3rem 0rem 0rem 0.3rem;
      border-bottom: 0.04px solid rgb(242, 243, 245);
    }
    .select {
      width: 0.35rem;
      height: 0.35rem;
      position: absolute;
      right: 1rem;
      top: 4.1rem;
    }
    .select2 {
      width: 0.35rem;
      height: 0.35rem;
      position: absolute;
      right: 1rem;
      top: 5.3rem;
    }
  }
  .read {
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    .agree {
      display: inline-block;
      margin-left: 0rem;
      font-size: 0.4rem;
    }
    .rule {
      color: #d04443;
      display: inline-block;
      font-size: 0.4rem;
    }
  }
  .btn {
    button {
      width: 90%;
      height: 1.3rem;
      color: #ffffff;
      background-color: #d04443;
      border: none;
      outline: none;
      border-radius: 0.05rem;
      margin: 1rem 0rem 0rem 0.4rem;
    }
  }
}
</style>
