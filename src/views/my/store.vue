<template>
  <div class="store">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1"  @click="back()"/>
      <p class="p1">关注的店铺</p>
    </div>
    <div v-show="dataList.length === 0 ? false : true">
      <div class="list" v-for="(item,index) in dataList" :key="index">
      <!--头像-->
      <div class="left" @click="userHandle(item.mem_attention_item.entid)">
        <!-- <img :src="item.mem_attention_item.ent_logo" alt /> -->
        <van-image :src="item.mem_attention_item.ent_logo">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <!-- 公司信息 -->
      <div class="right">
        <p class="p1" @click="userHandle(item.mem_attention_item.entid)">{{ item.mem_attention_item.ent_name }}</p>
        <p class="p2" @click="userHandle(item.mem_attention_item.entid)">{{ item.mem_attention_item.ent_introduction }}</p>
        <!--评分-->
        <van-rate
        v-model="item.mem_attention_item.ent_grade" 
        :size="15" 
        color="#ffd21e" 
        void-icon="star" 
        void-color="#eee" 
        class="rate"
        />
        <p class="grade">{{ item.mem_attention_item.ent_grade }}</p>
      </div>
      <!-- 取消关注 -->
      <van-icon name="ellipsis" size="30" color="#BFBFBF" class="more" @click="isShow(index)" />
      <div class="cancel">
        <div class="content">
          <div class="triangle" v-show="show === index ? true : false"></div>
          <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" 
          @click="cancel(item.mem_attention_item.ent_name,item.mem_attention_id)" 
          v-show="show === index ? true : false"
          >
            取消关注
          </van-button>
        </div>
      </div>
    </div>
    </div>
    <div v-show="dataList.length === 0 ? true : false">
      <van-empty description="无关注店铺" />
    </div>
  </div>
</template>

<script>
import { getMyStore, cancelStore } from './actions/index.js'
import { Toast,Dialog,Empty,Icon,Loading } from 'vant';

Vue.use(Icon);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Loading);
export default {
  computed: {
    // isNull: function() {
    //   return this.dataList == {} ? false : true;
    // }
  },
  mounted() {
    this.getMsg()
  },
  data() {
    return {
      dataList: {},
      //是否显示取消按钮
      show: null,
      isNull: false,
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
  methods:{
    userHandle (id) {

      var obj = {
        entid: id,
        entfid: 0
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: '/merchants',
        query: {res: res}
      })
    },
    back() {
      this.$router.go(-1)
    },
    getMsg() {
        getMyStore()
        .then((res) => {
            this.dataList = res.data;
            if(this.dataList.length > 0) {
              this.isNull = true
            }
            Toast.loading({
              duration: 1
            });
        })
        .catch((res) => {
            console.log(res);
            Toast.fail('获取数据失败，请重试');
        })
    },
    cancel(name,id) {
      let uid = id
      this.show = null;
      Dialog.confirm({
        title: '取消关注',
        message: `确定要取消关注${name}吗?`,
        confirmButtonColor: '#ee0a24'
      })
        .then(() => {
          cancelStore(uid)
            .then(() => {
              Toast.success('取消成功');
              this.getMsg();
            })
        })
        .catch(() => {
              Toast.fail('请求出错，请重试');
        });
    },
    //是否显示取消关注按钮
    isShow(index) {
      if(this.show === index) {
        this.show = null
        return;
      }
      this.show = index
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.store {
  .top {
    display: flex;
    margin-top: 0.5rem;
    .i1 {
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
  }
    .list{
      position: relative;
      width: 95%;
      display: flex;
      margin:1rem 0rem 0rem 0.3rem;
      padding-bottom: 0.5rem;
      .cancel {
        position: absolute;
        width: 1.8rem;
        height: 1rem;
        bottom: 0rem;
        right: 0.2rem;
        .van-button {
          height: 1rem;
          width: 1.8rem;
        }
        //小尖角
        .content {
          position: relative;
          .triangle {
            position: absolute;
            width:0;
            height:0;
            border-width:0 7px 7px;
            border-style:solid;
            border-color:transparent transparent#e73b4f;
            top: -6px;
            left: 70%;
          }
        }
      }
      .left{
          /deep/ img{
            width: 2rem;
          }
          /deep/ .van-image{
            width: 2rem;
            background:#fff;
          }
      }
      .right{
          margin: 0rem 0rem 0rem 0.5rem;
          position: relative;
          .p1{
              font-size: 0.45rem;
              font-weight: bold;
              color: #212121;
          }
          .p2{
              color:#3D3D3D;
              font-size: 0.35rem;
          }
          .rate{
            margin-top: 0.05rem;
          }

          .grade{
              color: #FABF50;
              font-size: 0.4rem;
              display: inline-block;
              vertical-align: top;
              margin-left: 0.1rem;
          }
      }
      .more{
          position: absolute;
          right: 1px;
          width: 0.9rem;
          height: 0.8rem;
          margin: 0.5rem 0;
      }
  }
}

</style>