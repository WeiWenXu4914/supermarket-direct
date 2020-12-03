<template>
  <div class='publish-page'>
    <page-title title="选择发布类别" :titleSize="19" titleFontWeight="500" titleColor="#2F2F2F"></page-title>
    <van-tree-select 
      v-if="selectList.length > 0"
      height="90vh" 
      :items="selectList" 
      :main-active-index.sync="activeId" 
      style="margin-top: 60px">
      <template #content>
        <div class="select-items">
          <div 
            class="item" 
            v-for="(item,index) in selectList[activeId].pid" 
            :key="index" 
            @click="onSelect(item)">
            <!-- <van-icon :name="item.nav_icon" /> -->
            {{item.nav_name}}
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { publishList } from '@/api'
import { Toast } from 'vant';
export default {
  name: 'user-profile',
  components: {
    PageTitle
  },
  beforeCreate() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      overlay: true,
      duration:0
    });
  },
  data () {
    return {
      selectList: [],
      activeId: 1,
      activeIndex: 1
    }
  },
  created () {
    this.getPublishList();
    var sel = localStorage.getItem('selective');
    if(sel){
      this.$router.push('/');
    }
  },
  methods: {
    onSelect (item) {
      if (item.nav_link == 'nav/default') {
        this.$toast('内部调试中,请等候开放!')
        return false;
      }
      if (item.nav_link) {
        
        console.log(item)
        var sel = localStorage.getItem('selective');
        if(item.nav_class == 4 && !sel){
          this.$dialog.confirm({
            title: '区域选择?',
            message: '请您确认您选择的是否为您的位置!',
          })
          .then(() => {
            localStorage.setItem('selective', JSON.stringify(item))
            this.$router.push({
              path: item.nav_link,
              query: {
                id:item.nid
              }
            })
          })
          .catch(() => {
            localStorage.removeItem('selective')
            return false;
          });
        }
      }
    },
    getPublishList () {
      var id = this.$route.query.id;
      publishList(id).then(res=>{
        this.selectList = res.data;
      })
    }
  },
  mounted:function(){
    // 页面渲染完延时关闭
    setTimeout(function(){
      Toast.clear();
    },100)
  }
}
</script>
<!-- { id: 0, name: '为您提供以下选择'},
{ id: 1, name: '保姆/月嫂', path: '/zz_baby_sitter' },
{ id: 2, name: '家电维修', path: '/zz_maintain' },
{ id: 3, name: '保洁清洗', path: '/zz_clean' },
{ id: 4, name: '开锁/换锁/修锁', path: '/zz_unlocking' },
{ id: 5, name: '租房/买房/卖房', path: './publish/house' },
{ id: 6, name: '新车/二手车', path: '/zz_newcar' } -->
<style scoped lang='less'>
.publish-page {
  .title{
    width: 100%;
    padding: 20px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #2F2F2F;
  }
  .select-items{
    box-sizing: border-box;
    padding-left: 18px;
    .item:last-child {
      border-bottom: none;
    }
    .item:first-child {
      color: #D04443;
    }
    .item{
      padding: 17px 0;
      font-size: 16px;
      color: #2F2F2F;
      border-bottom: 1px solid #D8D8D8;
      font-weight: 400;
    }
  }
}

</style>
