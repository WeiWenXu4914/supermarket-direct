<template>
    <div class="getAddress">
      <!--快递-->
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
        <!--自取-->
        <div class="adress2" v-show="way">
            <div class="store-address">
              <img :src="pickResult.pickup_photos" alt="" v-if="pickResult.pickup_photos">
              <div class="store-site">
                <h3>{{ pickResult.contact_name }}</h3>
                <p>{{ pickResult.city + pickResult.district + pickResult.detailed_site }}</p>
              </div>
              <span @click="showPicker = true">切换</span>
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
                 ref="name"
                >
                <img src="../img/edit.svg" @click="nameFocus">
              </div>
              <div class="number">
                <p>手机号码</p>
                <input 
                 type="text" 
                 maxlength="11" 
                 placeholder="请输入手机号码" 
                 onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
                 v-model="addressStore.phone"
                 ref="phone"
                >
                <img src="../img/edit.svg" @click="phoneFocus">
              </div>
            </div>
        </div>

        
        <!-- <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup> -->
        <van-popup v-model="showPicker" position="right">
          <div class="choose-content">
            <div class="header">
              <van-icon 
               name="arrow-left" 
               size=".5rem"
               class="icon"
               @click="showPicker = false"
              />
              <van-search
               class="search" 
               v-model="value" 
               placeholder="请输入搜索关键词" 
              />
            </div>
            <div class="store-address" v-for="item in addressStoreList" :key="item.msid">
              <img :src="item.pickup_photos" alt="" v-if="item.pickup_photos">
              <div class="store-site">
                <h3>{{ item.contact_name }}</h3>
                <p>{{ item.text }}</p>
              </div>
              <button class="choose" @click="choose(item.text)">选择</button>
            </div>
          </div>
        </van-popup>
    </div>
</template>

<script>
import { shippingAddress,entAddress, entSelfPickupSite, SuperMarketList } from '../actions/index';
import { mapState, mapMutations } from 'vuex'
import { Toast, DropdownMenu, DropdownItem, Icon, Picker, Popup, Search } from 'vant';
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
            pickResult: {
              city: '',
              district: '',
              detailed_site: ''
            },
            showPicker: false,
            columns: [],
            value: ''
        }
    },
    computed: {
        way() {
          return this.showMsg === 0 ? true : false;
        }
    },
    watch: {
      //获得商家地址列表
      proid(val) {
        if(val) {
          this.getEntSiteReal()
        }
      },
      //搜索商家地址
      value(val) {
        this.getEntSiteReal(val);
      }
    },
    methods: {
      ...mapState(['user']),
      nameFocus() {
        this.$refs.name.focus();
      },
      phoneFocus() {
        this.$refs.phone.focus();
      },
      //选择地址
      choose(text) {
        // showPicker = true;
        for(let i = 0; i < this.addressStoreList.length; i++) {
          if(this.addressStoreList[i].text == text) {
            this.pickResult = this.addressStoreList[i];
            break;
          }
        }
        this.showPicker = false;
      },
      //编辑地址
      toEditAddress() {

        if(this.setBydefault == true){
          this.$router.push({path:'/myaddress',query: { add: 1 } })
        }else{
          this.$router.push({path:'/add',query: { add: 1 } })
        }
      },
      getEntSiteReal(value) {
        SuperMarketList(value)
        .then((res) => {
 
          if(res.code == 100 && res.data.length > 0) {
            console.log(res)
            this.addressStoreList = res.data;
            this.addressStoreList.map((item,index) => {
                item.text = item.city + item.district + item.detailed_site + item.contact_name;
            })
            //默认选择第一项地址
            this.pickResult = this.addressStoreList[0];
          } else {
            Toast(res.msg)
          }
          
        })
      },
      getUserSite() {
        //获取收货地址
        shippingAddress()
        .then((res) => { 
          if (res.code == 100 && res.data.length > 0) {

              let name = res.data[0].contact_name;
              let phone = res.data[0].contact_number;
              this.addressStore.name = name;
              this.addressStore.phone = phone;
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

        })
      },
    },
    mounted() {
      this.getUserSite();
    }
}
</script>

<style lang="less" scoped>
.getAddress {
  .choose-content {
    width: 100vw;
    height: 100vh;
    .header {
      display: flex;
      align-items: center;
      .icon {
        padding: 0 7px 0 10px;
      }
      .search {
        flex: 1;
      }
    }
    .store-address {
        display: flex;
        align-items: center;
        width: 94vw;
        margin: 7px auto;
        padding: 10px 0;
        box-shadow: 0px 1px 1px -1px #adadad;
        img {
          width: 50px;
          height: 50px;
          border-radius: 1px;
        }
        button {
          font-size: 16px;
          color: #ccc;
          padding: 3px 7px;
          border-radius: 13px;
          background-color: #d04443;
          border: none;
          color: #fff;
        }
        .store-site {
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          padding-left: 10px;
          h3 {
            // display: block;
            color: #232426;
            font-size: 16px;
            
          }
          p {
            color: #ccc;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
        
    }
  }
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
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 1px;
        }
        span {
          font-size: 12px;
          color: #ccc;
          line-height: 50px;
          padding-left: 7px;
          
        }
        .store-site {
          flex: 1;
          padding-left: 10px;
          h3 {
            display: inline-block;
            color: #232426;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        
        
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