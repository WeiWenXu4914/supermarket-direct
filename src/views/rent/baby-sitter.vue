<template>
  <div class="baby-sitter">
    <div class="top">
      <img src="../../components/img1/返回.png" class="i1"  @click="back()"/>
      <p class="p1">详情</p>
    </div>
    <div class="up">
      <div class="left">
        <p class="p1">全链路产品设计专家</p>
        <p class="p2">7000</p>
        <p class="p3">元</p>
      </div>
      <div class="right">
        <img src="../../components/img1/电话.png" alt />
      </div>
    </div>
    <div class="content">
      <div class="c1">
        <p class="p1">描述</p>
      </div>
      <div class="c2">
        <p>提供各种保姆、月嫂、育婴嫂、医院陪护，室内保洁、家庭开荒、地毯清洗、办公室托管保洁、外墙清洗、石材翻新结晶、地板打蜡、工程开荒、清洗油烟机、擦玻璃等。各种水暖维修安装，精修各种家电，电脑维护。专业队伍，专业技术，专业服务专业队伍，专业技术，专业服务专业队伍，专业技术，专业服务专业队伍</p>
      </div>
    </div>
    <div class="b2">
      <img src="../../components/img1/dingwei_black.png" alt />
      <p class="p1">北京朝阳区望京SOHOT2 楼</p>
      <p class="p2">></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.baby-sitter {
  .top {
    display: flex;
    margin-top: 0.5rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .p1 {
      margin-left: 3.5rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .up {
    display: flex;
    width: 90%;
    border-bottom: 1px solid #d7d7d7;
    margin: 0.5rem 0rem 0rem 0.3rem;
    padding-bottom: 0.3rem;
    .left {
      .p1 {
        font-size: 0.5rem;
        font-weight: bold;
        color: #2f2f2f;
      }
      .p2 {
        color: #d04443;
        display: inline-block;
        font-size: 0.5rem;
        font-weight: bold;
      }
      .p3 {
        color: #d04443;
        display: inline-block;
        margin: 0.3rem 0rem 0rem 0.1rem;
        font-size: 0.4rem;
      }
    }
    .right {
      img {
        width: 1rem;
        height: 1rem;
        margin: 0.05rem 0rem 0rem 3.5rem;
      }
    }
  }
  .content {
    margin: 0.3rem 0rem 0rem 0.3rem;
    width: 90%;
    .c1 {
      .p1 {
        color: #2f2f2f;
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
    .c2 {
      margin-top: 0.5rem;
    }
    p {
      font-size: 0.4rem;
      color: #5d5d5d;
    }
  }
  .b2 {
    display: flex;
    margin: 0.5rem 0rem 0rem 0.3rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
    .p1 {
      color: #2f2f2f;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .p2 {
      color: #7c7c7c;
      margin-left: 3.5rem;
    }
  }
}
</style>