<template>
  <div class='introduce-page' >
    <page-title title="用户名" :titleSize="20" titleFontWeight="500"></page-title>
    <div class="title" >当前用户名</div>
    <div class="inputed">
      <input type="text" v-model="val" v-bind="descNum" placeholder="请输入用户名(最多支持30个字符)">
    </div>
    <div class="buttons">
      <van-button color="#D04443" block  @click="pushIntors">完成</van-button>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { Notify, Field, Toast} from 'vant';
import { userEdit } from './actions'
import { mapMutations } from 'vuex'
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
  created () {
    var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
    this.val = data.mem_name
  },
  computed: {
    descNum() {
      if(this.val.length > 30){
        this.val = this.val.substr(0,30);

        Notify('无法在输入了');
        
        return 10;
      }
      return this.val.length == 0?0:this.val.length;
    }
  },
  methods: {
    ...mapMutations(['upUser']),
    // 修改个人昵称
    async pushIntors () {

      var obj = {
        type:1,
        val:this.val
      }

      const res = await userEdit(obj)
      if (res.code === 100) {

        var obj = {
          key: 'name',
          val: this.val
        }
        this.upUser(obj)
        
        Toast.success('修改成功')
        setTimeout(()=> {
          this.$router.go(-1)
        })
      } else  {
        Toast.error('修改失败')
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