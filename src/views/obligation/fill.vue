<template>
  <div class="fill">

    <title-view title="填写换货物流" :border="false"></title-view>

    <div class="select" @click="isShow">
      <p>选择快递公司</p>
      <img src="../../components/img1/下拉箭头.png" alt />
    </div>
    <div class="number">
      <p>快递单号</p>
      <input type="text" 
      placeholder="请填写准确的快递单号" 
      oninput = "value=value.replace(/[^\d]/g,'')"
      :maxlength="30" 
      v-model="text"/>
    </div>
    <div class="btn">
       <van-button type="primary" @click="confirminfo">确认发货</van-button>
    </div>
    <van-popup v-model="show">
      <van-picker
        title="物流公司"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import titleView from '../../components/public_views/titleView';
import { addAfterSalesServiceNumber } from './actions/index';
import { Toast,Popup,Picker } from 'vant';
export default {
    components: {
        titleView
    },
    data() {
        return {
            text: null,
            show: false,
            columns: ['顺丰', '申通', '圆通', 'EMS', '顺丰', '韵达', '中通'],
            compony: ''
        }
    },
    methods: {
        confirminfo() {
            if(this.text == null) {
              Toast("请填写物流单号");
              return;
            }
            let id = this.$route.query.ora_id
            addAfterSalesServiceNumber(id,this.text)
            .then((res) => {
              if(res) {
                  Toast.success("成功添加物流信息");
                  this.$router.push('/zz_take');
              }
            })
        },
        isShow() {
          this.show = true;
        },
        onConfirm(val) {
          this.compony = val;
          this.show = false;
        },
        onCancel() {
          this.show = false;
        },
        
    }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.fill {
  .top {
    display: flex;
    margin-top: 0.5rem;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.3rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 2.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .select {
    display: flex;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.5rem;
    p {
      font-size: 0.48rem;
      margin: 0.5rem 0rem 0rem 0.5rem;
      color: #3b3b3b;
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin: 0.5rem 0rem 0rem 5.5rem;
    }
  }
  .number{
       border-bottom: 1px solid #e1e1e1;
        padding-bottom: 0.3rem;
      p{
          font-size: 0.4rem;
          color: #3B3B3B;
          margin: 0.5rem 0rem 0rem 0.5rem;
      }
      input{
          width: 90%;
          height: 1rem;
          border: none;
          outline: none;
           margin: 0.2rem 0rem 0rem 0.5rem;

      }
  }
  .btn{
      button{
          width: 90%;
          color: #ffffff;
          height: 1.2rem;
          border: none;
          outline: none;
          background-color: #D04443;
          border-radius: 0.1rem;
          position: absolute;
          bottom: 0.3rem;
          left: 0.5rem;
      }
  }
}
</style>