<template>
  <div class="recordContainer">
    <PageTitle title="我的预约">
      <div slot="title-right" rightHandlewidth="120">
        <div class="admin">
          <van-icon name="search" size="25" @click="search" />
          <!-- <div class="admin_text">管理</div> -->
        </div>
      </div>
    </PageTitle>
    <div class="serach">
      <div v-if="searchShow">
        <van-search
          v-model="searchValue"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
    </div>
    <div class="yybody">

      <van-tabs 
        v-model="active" 
        title-active-color="#D04443" 
        title-inactive-color="#292929" 
        line-width="0" 
        border="0"
        animated
        @click="changeFun"
        @change="changeFun">

        <van-tab title="预约中">
          <booking  :key="activeKey"></booking>
        </van-tab>
        <van-tab title="预约成功">
          <successful :key="activeKey"></successful>
        </van-tab>
        <van-tab title="已完成">
          <finish :key="activeKey"></finish>
        </van-tab>
        <van-tab title="已取消">
          <cancel :key="activeKey"></cancel>
        </van-tab>
        <van-tab title="已超时">
          <overtime :key="activeKey"></overtime>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import successful from "@/views/reservations/component/successful";
import cancel from "@/views/reservations/component/cancel";
import finish from "@/views/reservations/component/finish";
import overtime from "@/views/reservations/component/overtime";
import booking from "@/views/reservations/component/booking";
import { Toast } from 'vant';
export default {
  data() {
    return {
      active: 0,
      searchValue: '',
      searchShow:false,
      activeKey:0
    };
  },
  components:{
    successful,
    cancel,
    finish,
    overtime,
    booking,
    PageTitle
  },
  methods:{
    changeFun() {
      this.activeKey = Date.parse(new Date());
    },
    backtop(){
      this.$router.go(-1);
    },
    search(){
      this.searchShow = !this.searchShow;
    },
    onSearch() {
      if(this.searchValue == ''){
        Toast('请输入搜索的关键字');
      }
    },
    onCancel() {
      this.searchShow = !this.searchShow;
      this.searchValue = '';
    },
  }
}
</script>

<style lang="less">
.recordContainer {
  /deep/ .van-tabs {
    height: 100%;
  }
  /deep/ .van-tabs__content--animated {
    height: calc(100vh - 100px);
    overflow: auto;
  }
  .admin {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 70px;
    .admin_text {
      font-size: 15px;
      margin-left: 10px;
    }
  }
  .serach {
    width:100%;
    transition: all 0.5s ease;
    margin-top: 50px;
  }
  .yybody{
    width: 95%;
    height: calc(100vh - 50px);
    margin: 0 auto;
    .title1{
      font-weight: 600;
      margin-top: 25px;
    }
    .body1{
      background-color: #F8F8F8;
      height: auto;
      border-radius: 5px;
      text-align: center;
      .body1_1{
        width: 95%;
        margin: 10px auto;
        padding-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /deep/ .van-icon{
          width: 10%;
        }
        .right{
          width: 90%;
          margin-left: 10px;
          text-align: left;
          .p1{
            display: flex;
            font-size: 16px;
            font-weight: 600;
          }
          .p2{
            display: flex;
            color: #747474;
            font-size: 12px;
          }
        }
      }
      .body1_2{
        width: 95%;
        margin: 0 auto;
        height: 1px;
        background-color: #E1E1E1;
        margin-top: 20px;
      }
      .body1_3{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 10px 20px 10px;
      }
      .qx{
        font-size: 17px;
        font-weight: 500;
        background-color: #D04443;
        color: #ffffff;
        border: 0;
        border-radius: 2px;
        height: 45px;
        width: 90%;
        left: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
