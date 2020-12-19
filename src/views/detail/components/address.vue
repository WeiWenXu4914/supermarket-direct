<template>
    <div class="getAddress">
        <div class="adress" @click="toEditAddress" v-show="!way">
            <img src="../../../components/img1/dingwei.png" alt />
            <div v-show="isNull">
                <span class="name">{{ address.contact_name }}</span>
                <p class="phone">{{ address.contact_number }}</p>
                <p class="adr">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailed_site }}</p>
                <p class="left"><van-icon name="arrow" /></p>
            </div>
            <div v-show="!isNull">
                <span class="addressNull">请添加默认收货地址</span>
                <p class="left"><van-icon name="arrow" size=".4rem" color="#ccc"/></p>
            </div>
        </div>

        <div class="adress2" v-show="way">
            <div class="store-address" @click="showPicker = true">
              <h3>{{ value }}</h3>
              <van-icon class="icon" name="arrow" color="#ccc" size=".4rem"/>
            </div>
            <div class="recieve-msg">
              <div class="name">
                <p>取货人</p>
                <input 
                 type="text" 
                 placeholder="请输入姓名" 
                 maxlength="7" 
                 v-model="addressStore.name"
                >
                <img src="../img/edit.svg" alt="">
              </div>
              <div class="number">
                <p>手机号码</p>
                <input 
                 type="text" 
                 maxlength="11" 
                 placeholder="请输入手机号码" 
                 onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
                 v-model="addressStore.phone"
                >
                <img src="../img/edit.svg" alt="">
              </div>
            </div>
        </div>

        
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
    </div>
</template>

<script>
import { shippingAddress,entAddress, entSelfPickupSite } from '../actions/index';
import { mapState, mapMutations } from 'vuex'
import { Toast, DropdownMenu, DropdownItem, Icon, Picker, Popup } from 'vant';
export default {
    props:['showMsg','entid','proid'],
    data() {
        return {
            address: {},
            addressStore: {},
            addressStoreList: [], 
            addressListResult: 0,
            isNull: false,
            setBydefault:false,
            value: '',
            showPicker: false,
            columns: [],
        }
    },
    computed: {
        way() {
          return this.showMsg === 0 ? true : false;
        }
    },
    watch: {
      //获得提货人信息
      // entid(newVal,old) {
      //   if(newVal) {
      //     this.getEntSite();
      //   }
      // },
      //获得商家地址列表
      proid(val) {
        if(val) {
          this.getEntSiteReal()
        }
      },

    },
    methods: {
      ...mapState(['user']),

      //编辑地址
      toEditAddress() {

        if(this.setBydefault == true){
          this.$router.push({path:'/myaddress',query: { add: 1 } })
        }else{
          this.$router.push({path:'/add',query: { add: 1 } })
        }
      },
      getEntSiteReal() {
        entSelfPickupSite(this.proid)
        .then((res) => {
          if(res.code == 100) {
            console.log(res)
            this.addressStoreList = res.data;
            //拼接地址
            this.addressStoreList.map((item,index) => {

              item.text = item.pinv_district + item.pinv_addres;

            })
            //存入选择器列表
            this.addressStoreList.forEach(item => {
              this.columns.push(item.text)
            })
            if(this.columns.length == 0) {
              this.value = "商家未设置自取地址，请切换收货方式";
            } else {
              this.value = this.columns[0];
            }

          } else {
            Toast(res.msg);
          }
        })
        .catch((err) => {
          Toast("请求出错");
        });
      },
      //获取提货人信息
      // getEntSite(name,phone) {
      //   this.addressStore.mem_name = name;
      //   this.addressStore.service_phone = phone;
      //   console.log(this.addressStore)
      // },
      getUserSite() {
        //获取收货地址
        shippingAddress()
        .then((res) => { 
          if (res.code == 100 && res.data.length > 0) {

              let name = res.data[0].contact_name;
              let phone = res.data[0].contact_number;
              this.addressStore.name = name;
              this.addressStore.phone = phone;
              console.log(this.addressStore)
              this.setBydefault = true;
              var addressIsorNo = 0;
              var addressIsorNoIndex = '';
              res.data.forEach((item,index)=>{
                if(item.by_default == 0){
                  ++addressIsorNo
                }else{
                  addressIsorNoIndex = index;
                }
              })

              if(res.data.length <= addressIsorNo) {
                
                this.address = {
                  country: 0,
                  province: 0,
                  city: 0,
                  district: 0,
                  detailed_site: 0,
                  contact_number: 0,
                  contact_name: '无默认收货地址，请添加',
                  by_default: 0,
                  id: 0
                }
                
              }else{

                this.address = res.data[addressIsorNoIndex]
                this.isNull = true;
              }

          } else {

            this.address  = {
              country: 0,
              province: 0,
              city: 0,
              district: 0,
              detailed_site: 0,
              contact_number: 0,
              contact_name: '无默认收货地址，请添加',
              by_default: 0,
              id: 0
            }
          }

          // this.address.forEach(element => {
          //   if (element.checkbox === true) {
          //     this.address = element;
          //     return;
          //   }
          // });
        })
      },
      //选择商家地址
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
    },
    mounted() {
      this.getUserSite();
    }
}
</script>

<style lang="less" scoped>
.getAddress {
    .adress {
      display: flex;
      position: relative;
      flex-wrap: nowrap;
      align-items: center;
      // border-bottom: 0.5px solid rgba(229, 229, 229, 0.5);
      // border-top: 0.5px solid rgba(229, 229, 229, 0.5);
      width: 90%;
      margin-left: 0.5rem;
      padding: 0.5rem 0;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.0rem 0rem 0rem 0rem;
      }
      .name {
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .phone {
        display: inline-block;
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      div {
        flex: 1;
      }
      .adr {
        margin: 0rem 0rem 0rem 0.3rem;
        width: 80%;
        color: #676767;
      }
      .left {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #717171;
        font-size: 0.45rem;
      }
      .addressNull {
          position: absolute;
          font-size: 20px;
          color: red;
          font-weight: bold;
          top: 50%;
          transform: translateY(-50%);
          left: 10%;
      }
    }
    .adress2 {
      width: 90%;
      margin: 0 auto;
      padding: 20px 0;
      .store-address {
        display: flex;
      }
      h3 {
        color: #232426;
        font-size: 18px;
        flex: 1;
      }
      .icon {
        display: flex;
        align-items: center;
        margin-left: 15px;
      }
      .recieve-msg {
        display: flex;
        margin-top: 25px;
        div {
          display: inline-block;
        }
        input {
          border: none;
          width: 80px;
          font-weight: bold;
          color: #232426;
        }
        p:nth-of-type(1) {
            font-size: 14px;
            color: #868688;
            margin-bottom: 10px;
        }
        .name {
          padding-right: 20px;
          // margin-left: 20px;
          position: relative;
          img {
            position: absolute;
            right: 7px;
            bottom: 0px;
          }
        }
        .number {
          position: relative;
          border-left: 1px solid #E4E4E4;
          padding-left: 20px;
          input {
            width: 100px;
          }
          img {
            position: absolute;
            bottom: 0;
            right: -21px;
          }
        }
      }
    }
}
    
</style>