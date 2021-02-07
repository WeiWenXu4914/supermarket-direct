<template>
    <div class="getAddress">
        <div class="adress" @click="toEditAddress" v-show="!way">
            <van-icon name="location" />
            <div v-show="isNull">
                <span class="name">{{ address.contact_name }}</span>
                <p class="phone">{{ address.contact_number }}</p>
                <p class="adr">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailed_site }}</p>
                <p class="left"><van-icon name="arrow" size="15"/></p>
            </div>
            <div v-show="!isNull">
                <span class="addressNull">请添加默认收货地址</span>
                <p class="left"><van-icon name="arrow" /></p>
            </div>
        </div>

        <div class="adress2" v-show="way">

            <div class="a1">
                <p class="p1">商店名称</p>
                <p class="p2" v-if="storeAddress.pinv_name">
                  {{ storeAddress.pinv_name }}
                </p>
            </div>
            <div class="a1">
                <p class="p1">商家电话</p>
                <p class="p2">
                  {{ storeAddress.pinv_phone }}
                </p>
            </div>
            <div class="a1">
                <p class="p1">提货地址</p>
                <p class="p3">
                    {{ storeAddress.pinv_addres }}
                    {{ storeAddress.pinv_district }} 
                    {{ storeAddress.pinv_address }} 
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { shippingAddress,entAddress } from '../../../detail/actions/index';
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'vant';
export default {
    props:['showMsg','entid','storeAddress'],
    data() {
        return {
            address: {},
            addressStore: {},
            isNull: false,
            setBydefault:false,

        }
    },
    computed: {
        way() {
          if(this.showMsg == 1) {
            return true;
          } else {
            return false;
          }
        }
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
      getEntSite() {
        entAddress(this.entid)
        .then((res) => {
          this.addressStore = res.data;
          this.addressStore.mem_name = this.user().name;
          this.addressStore.service_phone = this.user().phone;
        })
        .catch(() => {
          Toast.fail("获取商家地址失败")
        })
      },
      getUserSite() {
        //获取收货地址
        shippingAddress()
        .then((res) => { 
          if (res.code == 100 && res.data.length > 0) {

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

              if(res.data.length <= addressIsorNo){
                
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
      }
    },
    mounted() {
      this.getUserSite();
      this.getEntSite();
    }
}
</script>

<style lang="less" scoped>
.getAddress {
    .adress {
      display: flex;
      position: relative;
      flex-wrap: wrap;
      border-bottom: 0.5px solid rgba(229, 229, 229, 0.5);
      width: 90%;
      margin-left: 0.5rem;
      margin-top: 10px;
      padding-bottom: 0.5rem;
      .van-icon {
        display: flex;
        align-items: center;
        font-size: 30px;
      }
      .name {
        margin: 0.3rem 0rem 0rem 0.1rem;
        color: #212121;
        font-size: 0.45rem;
        
      }
      .phone {
        display: inline-block;
        margin: 0.3rem 0rem 0rem 0.3rem;
        color: #212121;
        font-size: 0.45rem;
      }
      .adr {
        margin: 0rem 0rem 0rem 0.1rem;
        color: #676767;
      }
      .left {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #717171;
        font-size: 0.40rem;
        .van-icon {
          font-size: 15px;
        }
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
      margin-top: 0.5rem;
      .InputClass {
        border: 0px solid #fff;
      }
      .a2 {
        display: flex;
        border-bottom: 1px solid rgba(229, 229, 229, 0.5);
        width: 90%;
        margin: 0.5rem 0rem 0rem 0.5rem;
        padding-bottom: 0.3rem;
        .p1 {
          font-size: 0.45rem;
          color: #212121;
          font-weight: 500;
        }
        .p2,.p4{
          font-size: 0.4rem;
          color: #212121;
          margin-left: 0.5rem;
        }
        .p3 {
          font-size: 0.4rem;
          padding: 0.1rem;
          color: #d04443;
          border: 1px solid #d04443;
          border-radius: 0.1rem;
           margin: -0.1rem 0rem 0rem 0.5rem;
        }
      }
      .a1 {
        display: flex;
        border-bottom: 1px solid rgba(229, 229, 229, 0.5);
        width: 90%;
        margin-left: 0.5rem;
        padding-bottom: 0.5rem;
        margin-top: 0.5rem;
        .p1 {
          font-size: 0.45rem;
          color: #212121;
          font-weight: 600;
        }
        .p2 {
          width: 65%;
          font-size: 0.43rem;
          color: #212121;
          font-weight: 500;
          margin-left: 0.6rem;
        }
        .p3 {
          width: 73%;
          font-size: 0.4rem;
          color: #212121;
          font-weight: 500;
          margin-left: 0.6rem;
        }
      }
    }
}
    
</style>