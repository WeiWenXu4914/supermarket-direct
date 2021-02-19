<template>
  <div class="add">
    <div class="top">
      <img src="../../components/img1/返回.png" @click="back()" />
      <p class="p1"> {{ title }} </p>
      <span @click="deleteAddress" v-if="state === 0">删除</span>
    </div>
    <div class="inp">
      <van-field 
      v-model="text" 
      label="收货人" 
      placeholder="姓名" 
      label-align="left" 
      class="inp1"
      maxlength="10" 
      />
      <van-field
        v-model="tel"
        type="tel"
        label="手机号码"
        placeholder="请输入真实手机号码"
        label-align="left"
        maxlength="11"
        class="inp1"
      />
      <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      
      <van-icon name="arrow"  class="right"/>
      <van-popup v-model="showArea" position="bottom">
        <van-area 
          :area-list="areaList" 
          @confirm="onConfirm" 
          @cancel="showArea = false"
          :columns-placeholder="['请选择', '请选择', '请选择']" />
      </van-popup>
      <div class="list">
        <input type="text" maxlength="30" v-model="detailArea" placeholder="详情地址(如街道、小区)" style="margin-left:0.1rem" />
      </div>
    </div>
    
    <!-- <div class="def" v-show="$route.query.add === 1 ? false : true"> -->
      <div class="def">
      <p>设为默认地址</p>
      <van-switch
        v-model="checked"
        active-color="#07c160"
        inactive-color="#fff"
        size="0.5rem"
        class="right"
      />
    </div>
    
    <div class="btn">
      <van-button type="primary" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Area, Toast, Dialog  } from 'vant';
import  province_list  from '../shop/actions/area';
import { shippingAddress } from './actions/index'
export default {
  name: "add",
  data() {
    return {
      title: '添加收货地址',
      checked: true,
      tel:null,
      text:"",
      value: "",
      showArea: false,
      areaList: {},
      detailArea: '',
      data: [],    //传入的数据
      state: 1
    };
  },
  created() {
    //配送状态
    this.$store.state.commodityState = true;
    //地区字典
    this.areaList = province_list;
    //是否为编辑页
    if(this.$route.query.data) {

      this.data = JSON.parse(this.$route.query.data);
      
      this.title = '收货地址'

      if(this.data.by_default == 1){
        this.checked = true;
      }

      this.text = this.data.contact_name;
      this.tel = this.data.contact_number;
      this.detailArea = this.data.detailed_site;
      this.value = [ this.data.province, this.data.city, this.data.district].join('/');

    }
    this.state = this.$route.query.add;

  },
  methods: {
    onConfirm(values) {

      if(values[0].name == '' || values[1].name == '' || values[2].name == '') {
        Toast("请选择具体的地址");
        return;
      }
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
    },
    save() {
      
      if(this.text == '') {
        Toast.fail('请输入姓名')
        return;
      }
      let reg = /^1[3456789]\d{9}$/;
      if(!reg.test(this.tel)) {
        Toast.fail('请输入正确的电话号码')
        return;
      }
      if(this.value == '') {
        Toast.fail('请选择地区')
        return;
      }
      if(this.detailArea == '') {
        Toast.fail('请填写详细地址')
        return;
      }

      let areaMsg = this.value.split('/')
      
      const obj = {
        country: "中国",
        province: areaMsg[0],
        city: areaMsg[1],
        district: areaMsg[2],
        detailed_site: this.detailArea,
        contact_number: this.tel,
        contact_name: this.text,
        by_default: this.checked === true ? 1 : 0,
      }

      //判断是否为新增地址
      this.$route.query.add === 1 ? obj.add = 1 : null;
      //判断是否为编辑地址
      if(this.$route.query.data) {
        obj.edit = 1;
        obj.id = this.data.msid;
      }

      shippingAddress(obj)
      .then((res) => {
        if(res.code === 100) {
          Toast.success('操作成功');
          this.$router.go(-1);
        } else {
          Toast.fail('添加失败，请重试');
        }
      })
    },
    back(){
      this.$router.back()
    },
    deleteAddress() {
      
      let obj = {
        id: this.data.msid,
        del: 1
      }

      Dialog.confirm({
        message: '确认要删除该地址吗',
      })
      .then(() => {
        // on confirm
        shippingAddress(obj)
          .then((res) => {

            if(res.msg == '删除成功') {
              Toast.success('删除成功')
              this.$router.go(-1);
            } else {
              Toast(res.msg);
            }

          })
      })
      .catch(() => {
        // on cancel
      });
     

    },
  }
};
</script>

<style scoped lang="less">
.add {
  .top {
    position: relative;
    margin-top: 0.3rem;
    text-align: center;
    img {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
      left: 0;
    }
    .p1 {
      display: inline;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    span {
      position: absolute;
      padding-right: 4%;
      right: 0;
      line-height: 0.8rem;
    }
  }
  .inp {
    margin-top: 0.5rem;
    position: relative;
    .right{
      position: absolute;
      right: 0.6rem;
      top: 2.8rem;
    }
    .inp1 {
      color: #292929;
    }
    .list{
      margin: 0.2rem 0rem 0rem 0.3rem;
      input{
        width: 95%;
        height: 1rem;
        border: none;
        border-bottom: 1px solid rgb(242,243,245);
      }

    }
  }
  .def {
    display: flex;
    margin: 0.3rem 0rem 0rem 0.5rem;
    .right {
      margin-left: 5.5rem;
    }
    p {
      font-size: 0.4rem;
      font-weight: bold;
    }
    img {
      width: 1rem;
      margin-left: 5.5rem;
    }
  }
  .btn {
    button {
      width: 90%;
      height: 1rem;
      outline: none;
      border: none;
      color: #ffffff;
      background-color: #d04443;
      position: absolute;
      bottom: 0.2rem;
      left: 0.5rem;
    }
  }
}
</style>