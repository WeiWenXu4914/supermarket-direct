<template>
    <div class="getAddress">
      
      <!--地址（旧）-->
        <!-- <div class="adress" @click="toEditAddress" v-show="!way">
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
        </div> -->
        
        <!--地址新-->
        <div class="adress2">

            <!-- <div class="recive-address">
                <h4>收货地址</h4>
                <van-field
                  v-model="addressSite"
                  rows="1"
                  autosize
                  maxlength="50"
                  type="textarea"
                  placeholder="请输入收货地址"
                />
            </div> -->

            <div class="adress" @click="toEditAddress">
                <img src="../../../components/img1/dingwei.png" alt />
                <div v-show="isNull">
                    <span class="name">{{ address.contact_name }}</span>
                    <p class="phone">{{ address.contact_number }}</p>
                    <p class="adr">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailed_site }}</p>
                    <p class="left"><van-icon name="arrow" color="#ccc" size=".4rem"/></p>
                </div>
                <!-- <div v-show="!isNull">
                    <span class="addressNull">请添加默认收货地址</span>
                    <p class="left"><van-icon name="arrow" size=".4rem" color="#ccc"/></p>
                </div> -->
            </div>

            <!-- <div class="recieve-msg">
              <div class="name">
                <p>取货人</p>
                <input
                 type="text" 
                 placeholder="请输入姓名" 
                 maxlength="7" 
                 v-model="name"
                 ref="name"
                >
                <img src="../img/edit.svg" @click.stop="nameFocus" v-show="!nameClear">
                <img src="../img/clear.svg" @click.stop="clear('name',e)" v-show="nameClear">
              </div>
              <div class="number">
                <p>手机号码</p>
                <input 
                 type="text" 
                 maxlength="11" 
                 placeholder="请输入手机号码" 
                 onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
                 v-model="phone"
                 ref="phone"
                >
                <img src="../img/edit.svg" @click.stop="phoneFocus" v-show="!phoneClear">
                <img src="../img/clear.svg" @click.stop="clear('phone')" v-show="phoneClear">
              </div>
            </div> -->

            <h4 class="service-site">服务站点</h4>
            <div class="store-address" @click="showPicker = true">

              <img :src="pickResult.pickup_photos" alt="" v-if="pickResult.pickup_photos">
              <div class="store-site" v-if="pickResult.city">
                  <h3>{{ pickResult.contact_name }}</h3>
                  <p>{{ pickResult.city + pickResult.district + pickResult.detailed_site }}</p>
              </div>

              <h3 v-else>{{ tipChooseSite }}</h3>

              <span>切换<van-icon class="icon" name="arrow" color="#ccc" size=".4rem"/></span>
              
            </div>

        </div>
        <!--弹出页面-->
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
               @focus="valueAreaFocus"
              />
            </div>


            <van-field
              :class="isTipArea ? 'tip-border' : ''"
              readonly
              clickable
              name="area"
              :value="valueArea"
              label="地区切换"
              placeholder="点击选择省市区"
              @click="showArea = true"
            />
            <van-icon name="arrow"  class="right-icon"/>
            <van-popup v-model="showArea" position="bottom">
              <van-area 
                :area-list="areaList" 
                @confirm="onConfirm" 
                @cancel="showArea = false"
                :columns-placeholder="['请选择', '请选择', '请选择']" />
            </van-popup>

            <div class="store-address" v-for="item in addressStoreList" :key="item.msid">
              <img :src="item.pickup_photos" alt="" v-if="item.pickup_photos">
              <div class="store-site">
                <h3>{{ item.contact_name }}</h3>
                <p>{{ item.text }}</p>
              </div>
              <button class="choose" @click="choose(item.text)">选择</button>
            </div>
            <button class="not-choose-serve-site" @click="notChooseServeSite">不选择服务站点</button>
          </div>
        </van-popup>
    </div>
</template>

<script>
import { shippingAddress,entAddress, entSelfPickupSite, searchSuperMarketList } from '../actions/index';
import { mapState, mapMutations } from 'vuex'
import  province_list  from '../../shop/actions/area';
import { Toast, DropdownMenu, DropdownItem, Icon, Picker, Popup, Search, Area, Dialog } from 'vant';
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
            pickResult: {},
            showPicker: false,
            value: '',
            nameClear: false,
            phoneClear: false,
            name: '',
            phone: '',
            addressSite: '',
            showArea: false,
            areaList: {},
            valueArea: "",
            isTipArea: false,
            tipChooseSite: "请选择服务站点"
        }
    },
    computed: {
        way() {
          return this.showMsg === 0 ? true : false;
        },
        
    },
    watch: {
      //搜索商家地址
      value(val) {
        this.getEntSiteRealSearch(val);
      },
      name(newVal, oldVal) {
        if(newVal == '') {
          this.nameClear = false
        }
      },
      phone(newVal, oldVal) {
        if(newVal == '') {
          this.phoneClear = false
        }
      }
    },
    methods: {
      ...mapState(['user']),
      notChooseServeSite() {
        this.pickResult = {};
        window.localStorage.removeItem('serviceSiteResult')
        this.tipChooseSite = "不选择服务站点"
        this.showPicker = false
      },
      valueAreaFocus() {
        if(this.valueArea == "") {
          Toast("请选择区域地址");
          this.isTipArea = true;
        } else {
          this.isTipArea = false;
        }
      },
      //确认地区区域
      onConfirm(values) {
        if(values[0].name == '' || values[1].name == '' || values[2].name == '') {
          Toast("请选择具体的地址");
          return;
        }
        this.valueArea = values.map(item => item.name).join("/");
        this.showArea = false;
        this.isTipArea = false;
        this.getEntSiteReal();
      },
      clear(val) {
        if(val == 'name') {
          this.name = '';
          this.$refs.name.focus();
          
        } else {
          this.phone = ''
          this.$refs.phone.focus();
        }
      },
      nameFocus() {
        this.$refs.name.focus();
        this.nameClear = true;
      },
      phoneFocus() {
        this.$refs.phone.focus();
        this.phoneClear = true;
      },
      //选择地址
      choose(text) {
        // showPicker = true;
        for(let i = 0; i < this.addressStoreList.length; i++) {
          if(this.addressStoreList[i].text == text) {
            this.pickResult = Object.assign(this.addressStoreList[i]);
            window.localStorage.serviceSiteResult = JSON.stringify(this.pickResult)
            
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
      //获取服务站点
      getEntSiteReal() {
        const obj = {
          where: this.value,
          site: this.valueArea
        }
        searchSuperMarketList(obj)
        .then((res) => {
          
          if(res.code == 100) {
            this.addressStoreList = res.data;
            this.addressStoreList.map((item,index) => {
                item.text = item.city + item.district + item.detailed_site + item.contact_name;
            })
            
          } else {
            Toast(res.msg)
          }

        })


      },
      getEntSiteRealSearch(value) {
        const obj = {
          where: value,
          site: this.valueArea
        }
        searchSuperMarketList(obj)
        .then((res) => {
          
          if(res.code == 100) {
            this.addressStoreList = res.data;
            this.addressStoreList.map((item,index) => {
                item.text = item.city + item.district + item.detailed_site + item.contact_name;
            })
          }

        })
      },
      //本地取出服务点地址
      getServiceSite() {
        let data = window.localStorage.serviceSiteResult;
        if(data) {
          this.pickResult = JSON.parse(data);
        }
      },
      getUserSite() {
        //获取服务点地址
        shippingAddress()
        .then((res) => { 
          if (res.code == 100 && res.data.length > 0) {

              for (let i = 0; i < res.data.length; i++) {
                if(res.data[i].by_default == 1) {
                  this.name = res.data[i].contact_name;
                  this.phone = res.data[i].contact_number;
                  this.addressSite = res.data[i].province + res.data[i].city + res.data[i].district + res.data[i].detailed_site;

                  this.valueArea = res.data[i].province + '/' + res.data[i].city + '/' + res.data[i].district;
                }
              }

              //获取默认地区的服务点
              this.getEntSiteReal();

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
      this.getServiceSite();
      //地区字典
      this.areaList = province_list;
    }
}
</script>

<style lang="less" scoped>
.getAddress {
  .choose-content {
    width: 100vw;
    height: 100vh;
    .not-choose-serve-site {
      width: 90vw;
      border: none;
      outline: none;
      margin-left: 5vw;
      margin-top: 20px;
      font-size: 20px;
      padding: 10px 0;
      color: #fff;
      background-color: #d04443;
    }
    .tip-border {
      border: 1px solid red;
    }
    .right-icon {
      position: absolute;
      right: 10px;
      top: 67px;
    }
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
        margin: 0 auto;
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
      padding: 0.2rem 0;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.0rem 0rem 0rem 0rem;
      }
      .name {
        margin: 0.2rem 0rem 0.1rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .phone {
        display: inline-block;
        margin: 0.1rem 0rem 0.1rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      div {
        flex: 1;
      }
      .adr {
        margin: 0rem 0rem 0rem 0.3rem;
        width: 90%;
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
      .recive-address {
        padding-bottom: 10px;
        h4 {
          color: #868688;
          padding: 5px 0;
          font-weight: normal;
        }
        .van-cell {
          padding: 0;
          font-family:Arial, Helvetica, sans-serif;
          // font-weight: bold;
          color: #232426;
          font-size: 18px;
        }
      }
      .store-address {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        padding-top: 10px;
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
        .icon {
          transform: translateY(3px);
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
      .service-site {
        margin-top: 15px;
        color: #898986;
        font-weight: normal;
      }
      .recieve-msg {
        display: flex;
        align-items: flex-end;
        margin: 10px 0 15px 0;
        padding-bottom: 15px;
        div {
          display: inline-block;
        }
        input {
          border: none;
          height: 20px;
          line-height: 20px;
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
            width: 18px;
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
            width: 18px;
            bottom: 0;
            right: -21px;
          }
        }
      }
    }
}
    
</style>