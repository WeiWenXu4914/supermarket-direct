<template>
  <div class="myaddress">
    <div class="top">
      <img src="../../components/img1/返回.png" alt @click="back()" />
      <p class="p1">我的收货地址</p>
      <p class="p2" @click="addAddress()">添加新地址</p>
    </div>
    <div v-if="isShow">
    <div class="list">
      

          <div class="model" v-for="(item,index) in dataList" :key="index">
              <van-radio-group v-model="radio" @change="checkDefault">
                  <van-radio :name="index" shape="square">

                      <div class="inform" @click.stop="edit(item)">
                        <p class="name">{{ item.contact_name }}</p>
                        <p class="phone">{{ item.contact_number }}</p>
                        <p class="tiao"><van-icon name="arrow" /></p>
                      </div>
                      <div class="address" @click.stop="edit(item)">
                        <p>{{ item.province }} {{ item.city }} {{ item.district }} {{ item.detailed_site }}</p>
                      </div>

                  </van-radio>
              </van-radio-group>
          </div>

      
    </div>

    </div>
    <div v-else>
      <van-empty description="无收货地址，请添加" />
    </div>
  </div>
</template>

<script>
import { shippingAddress } from './actions/index';
import { Toast, Empty, RadioGroup, Radio } from 'vant';
export default {
  data() {
    return {
      dataList: [],
      result: [],
      isShow: false,
      radio: 0,
      isChecked: false
    }
  },
  beforeCreate() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      overlay: true,
      duration: 0
    });
  },
  async created() {
    await this.getData();
  },
  watch: {
    'radio': function (newVal,oldVal) {
        console.log(this.isChecked)
        if(this.isChecked) {
          let obj = this.dataList[newVal];
          obj.by_default = 1;
          obj.id = obj.msid;
          obj.setchecked = 1;

          shippingAddress(obj)
          .then((res) => {
            if(res.code === 100) {
              Toast('修改默认地址成功');
            } else {
              Toast.fail(res.msg);
            }
          })
          .catch((err) => {
            Toast('请求出错');
          })
        }
    }
  },
  methods:{
    getData() {
      shippingAddress()
      .then((res) => {
        
        this.dataList = res.data;

        if(this.dataList.length > 0) {
          this.isShow = true;
        }


        for(let i = 0; i < this.dataList.length; i++) {
          if(this.dataList[i].by_default == 1) {
            this.radio = i;
            setTimeout(() => {
              this.isChecked = true;
            },200)
            break;
          }
        }

        Toast.loading({
          duration: 1
        })
      })
      .catch((e) => {
        console.log(e)
        Toast("请求出错");
      })
    },
    back() {
      this.$router.go(-1);
    },
    addAddress() {
      this.$router.push({path:'/add',query: { add: 1 } })
    },
    edit(val) {

      let dataVal = JSON.stringify(val)

      this.$router.push({
        path:'/add',
        query: { add: 0,data: dataVal } 
      })

    },
    
    deleteAddress() {
      if(this.result == []) return;
      let obj = {
        id: this.result,
        del: 1
      }
      shippingAddress(obj)
        .then((res) => {

          if(res.msg == '删除成功') {
            Toast.success('删除成功')
            this.getData()
          }

        })

    },

    async checkDefault(index) {
      // let isSend = true;
      // let timer = setTimeout(() => {
      //   isSend = false;
      // },1000)

      // if(!isSend) {

      // }

      

        
    }
    
    

  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.myaddress {
  .top {
    display: flex;
    margin-top: 0.3rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.3rem;
      margin-top: 0.1rem;
    }
    .p1 {
      margin-left: 2.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
    .p2 {
      color: #2f2f2f;
      margin: 0.15rem 0rem 0rem 1.5rem;
      font-size: 0.38rem;
    }
  }
  .list{
    margin: 0.8rem 0rem 0rem 0.5rem;
    position: relative;
    .model{
      margin-top: 0.5rem;
      .inform{
        display: flex;
        width: 100%;
        margin-left: 10px;
        .name{
          color: #252525;
          font-size: 0.45rem;
          font-weight: bold;
        }
        .phone{
          color: #686868;
          font-size: 0.45rem;
          margin-left: 0.3rem;
        }
        .tiao{
          font-size: 0.6rem;
          position: absolute;
          right: 20px;
          color: #7B7B7B;
          line-height: 50px;
        }
      }
      .address {
        margin-left: 10px;
        overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        p {
          width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .b1{
    width: 4rem;
    background-color: #ffff;
    color: #252525;
    border: 1px solid #CACACA;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    border-radius: 0.2rem;
  }
  .b2{
    width: 4rem;
    background-color: #D04443;
    color: #ffff;
    border: none;
    position: absolute;
    bottom: 0.5rem;
    left: 5.3rem;
    border-radius: 0.2rem;
  }
}
</style>