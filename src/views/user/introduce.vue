<template>
  <div class='introduce-page' >
    <page-title title="个人简介" :titleSize="20" titleFontWeight="500"></page-title>
    <div class="title" >个人简介</div>
    <div class="inputed">
      <input type="text" v-model="val" placeholder="更好的了解您本人(15个字)">
    </div>
    <div class="buttons">
      <van-button color="#D04443" block  @click="pushIntors">完成</van-button>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { userIntor } from './actions'
export default {
  name: 'user-introduce',
  components: {
    PageTitle
  },
  data () {
    return {
      val: ''
    }
  },
  created() {
    this.val = this.$route.query.data;
  },
  methods: {
    // 修改个人介绍
    async pushIntors () {
      const res = await userIntor(this.val)
      if (res.code === 100) {
        this.$toast.success('修改成功')
        setTimeout(()=> {
          this.$router.go(-1)
        })
      } else  {
        this.$toast.error('修改失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.introduce-page{
  padding: 50px 20px 20px 20px;
  .title{
    margin-top: 30px;
    font-size: 15px;
    color: #2F2F2F;
    font-weight: 400;
  }
  .inputed{
    margin-top: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #A3A3A3;
    font-size: 15px;
    color: #939393;
    input{
      width: 100%;
      height: 50px;
      background: none;
      border: none;
      font-size: 15px;
    }
  }
  .buttons{
    margin-top: 30px;
    /deep/ .van-button{
      border-radius: 5px;
      height: 51px;
      font-size: 18px;
    }
  }
}
</style>