<template>
  <div class="issue">
<!--    <Title/>-->
    <div class="title">
      <div class="top">
        <img src="../../components/img1/返回.png" class="i1"  @click="back"/>
        <p class="p1">我的发布</p>
        <img src="../../components/img1/搜索.png" alt class="i2" @click="sousuo" />
      </div>
      <div class="serach1">
        <form action="/" v-show="show1">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </div>
    </div>
      <div class="biao">
        <p
          :style="[{color:(actives == 0?'#D04443':'#111')}]"
          @click="switchTo(0)"
          class="p1">
          全部
        </p>
        <p
          v-for="(gt,gi) in graphicClass"
          :key="gi"
          :style="[{color:(actives == gt.gcid?'#D04443':'#111111')}]"
          @click="switchTo(gt)"
          class="p1">
          {{ gt.gc_name }}
        </p>
      </div>
      <div v-if="graphicList.length > 0 && graphicList != ''">
        <van-tabs
          v-model="active"
          swipeable
          animated
          sticky
          title-active-color="#D04443"
          line-width="0"
          class="float1"
          @change="changeChannel">

          <van-tab title="全部">
            <div class="model"
              v-for="(item,index) in graphicList"
              :key="index">
              <div class="list" @click="goDetail(item)">
                <div class="left">
                  <p class="p1">{{ item.graphic_name | emoji_decode }}</p>
                  <p class="p3">{{ item.gc_name | emoji_decode }}</p>
                  <p class="p2">{{ graphicState(item.graphic_state) }} </p>
                </div>
                <div class="right">
                  <img :src="item.graphic_surface_plot" v-if="item.gc_id == 2 "/>
                  <img :src="item.graphic_thumbnail[0].graphic_thumbnail_path" v-if="item.gc_id == 1 && item.graphic_thumbnail.length > 0" />
                </div>
              </div>
              <div class="bot">
                <p class="p1">{{ item.graphic_comment }} 评论</p>
                <p class="p2">{{ item.graphic_like }} 点赞</p>
                <p class="p3">{{ item.graphic_addtime | relTime }}</p>
                <img src="../../components/img1/修改.png" alt class="p4"
                  @click="operation(1,item)" />
                <img src="../../components/img1/删除.png" alt class="p5"
                  @click="operation(0,item)" />
              </div>
            </div>
          </van-tab>

          <van-tab :title="ct.title" v-for="(ct,ci) in stateSlass" :key="ci">
            <div v-if="ct.val.length > 0">
              <div class="model"
                v-for="(item,index) in ct.val"
                :key="index">
                <div class="list" @click="goDetail(item)">
                  <div class="left">
                    <p class="p1">{{ item.graphic_name | emoji_decode }}</p>
                    <p class="p3">{{ item.gc_name | emoji_decode }}</p>
                    <p class="p2">{{ graphicState(item.graphic_state) }} </p>
                  </div>
                  <div class="right">
                    <img :src="item.graphic_surface_plot" v-if="item.gc_id == 2"/>
                    <img :src="item.graphic_thumbnail[0].graphic_thumbnail_path" v-if="item.gc_id == 1 && item.graphic_thumbnail.length > 0" />
                  </div>
                </div>
                <div class="bot">
                  <p class="p1">{{ item.graphic_comment }} 评论</p>
                  <p class="p2">{{ item.graphic_like }} 点赞</p>
                  <p class="p3">{{ item.graphic_addtime | relTime }}</p>
                  <img src="../../components/img1/修改.png" alt class="p4"
                    @click="operation(1,item)" />
                  <img src="../../components/img1/删除.png" alt class="p5"
                    @click="operation(0,item)" />
                </div>
              </div>
            </div>
            <van-empty :description="ct.title+'没有内容'" v-else />
          </van-tab>
        </van-tabs>
      </div>
    <van-empty description="未发布任何内容" v-else />
  </div>
</template>

<script>
import Title from "../../components/title"
import { getMyIssue, articleDel } from './actions'
import { Dialog, Toast } from 'vant';

export default {
   // components:{
   //   Title
   // },
  data() {
    return {
      show1 : false,
      value:'',
      active: 0,
      actives: 0,
      graphicList:'',
      stateSlass:'',
      graphicClass:''
    };
  },
  created () {

    this.getMyIssueFun()
  },
  methods:{
    sousuo(){
      this.show1 = !this.show1;
    },
    onSearch() {
      if(this.value===''){   //如果搜索栏为空就执行getList方法获取最初始的列表);
        Toast('请填写要搜索的标题关键字');
      }else{
        //搜索
        let list=this.graphicList.filter(item=>item.graphic_abbreviation.toString().indexOf(this.value)>=0);
        this.graphicList=list;
      }
    },
    onCancel() {
      this.show1 = false;
    },
    back(){
      this.$router.go(-1)
    },
    async getMyIssueFun() {
      const res = await getMyIssue();
      this.graphicList = res.data.graphic
      this.stateSlass = res.data.class
      this.graphicClass = res.data.graphic_class
      sessionStorage.setItem("myGraphicList", JSON.stringify(res.data.graphic));
    },
    graphicState(val) {
      switch (val) {
        case '1':
            return '通过'
            break;

        case '2':
            return '草稿箱'
            break;

        case '3':
            return '审核中'
            break;

        default:
            return '未通过'
            break;
      }
    },
    back(){
      this.$router.go(-1)
    },
    switchTo(val){

      if (val == 0) {
        this.actives = 0;
        this.getMyIssueFun();
        return false;
      }

      this.actives = val.gcid;
      var newMyGraphicList = [];
      var newMyStateSlass = [];
      var myGraphicList = JSON.parse(sessionStorage.getItem("myGraphicList"));

      myGraphicList.forEach((item,index)=>{
        if (val.gcid == item.gc_id) {
          newMyGraphicList.push(item);
        }
      });

      this.stateSlass.forEach((item,index)=>{

        newMyStateSlass.push({
          key:item.key,
          title:item.title,
          val:[]
        });

        item.val.forEach((v,k)=>{
          if (val.gcid == v.gc_id) {
            newMyStateSlass[index].val.push(v);
          }
        });
      });

      this.graphicList = newMyGraphicList;
      this.stateSlass = newMyStateSlass;
    },
    operation(type, res) {
      if (type == 0) {
        Dialog.confirm({
          title: '删除',
          message: '是否删除《'+res.graphic_name+'》?',
          confirmButtonColor:'red'
        })
        .then(() => {
          articleDel(res.gid).then(data => {
            if(data.code == 100){
              this.getMyIssueFun();
            }
          })
        })
        .catch(() => {});
      }else{

        var data = this.$Utils.demoRequest(JSON.stringify(res));
        sessionStorage.setItem(res.gid+'_edit',data);

        if (res.gc_id == 1) {

          if (res.graphic_nav_id != 2) {

            this.$router.push({
              path: res.nav_link,
              query: {editId: res.gid}
            })
          }else{

            this.$router.push({
              path: '/article/create',
              query: {editId: res.gid}
            })
          }

        }else if (res.gc_id == 2) {

          this.$router.push({
            path: '/article/createVideo',
            query: {editId: res.gid}
          })

        }else if (res.gc_id == 3) {

          this.$router.push({
            path: '/publish/house',
            query: {editId: res.gid}
          })
        }else if (res.gc_id == 4) {

          this.$router.push({
            path: '/publish/job',
            query: {editId: res.gid}
          })
        }
      }
    },
    goDetail(res) {

      if (res.gc_id == 4) {

        var data = this.$Utils.demoRequest(JSON.stringify(res.gid));

        this.$router.push({
          path: '/zz_job',
          query: {res: data}
        })
      }else if(res.gc_id == 3){

        var data = this.$Utils.demoRequest(JSON.stringify(res.gid));

        this.$router.push({
          path: '/zz_rentting',
          query: {res: data}
        })

      }else{

        this.$router.push(`/article/detail/${res.gid}`);
      }
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.issue {
  .title {
    .top {
      display: flex;
      margin-top: 0.5rem;
      .i1 {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.1rem 0rem 0rem 0.3rem;
      }
      .i2 {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0.05rem 0rem 0rem 3.1rem;
      }
      .p1 {
        margin-left: 3rem;
        color: #2f2f2f;
        font-size: 0.5rem;
        font-weight: 500;
        font-family: Source Han Sans CN;
      }
    }
    .title {
      display: flex;
      border-bottom: 1px solid rgb(242, 242, 242);
      color: #2f2f2f;
      margin-top: 0.5rem;
      padding-bottom: 0.2rem;
      p {
        font-size: 0.5rem;
        margin-left: 0.4rem;
      }
    }
  }
  /deep/ .van-tabs__content {
    min-height: 100vh;
  }
  .top {
    display: flex;
    margin-top: 0.5rem;
    .i1 {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0.1rem 0rem 0rem 0.3rem;
    }
    .i2 {
      width: 0.7rem;
      height: 0.7rem;
      margin: 0.05rem 0rem 0rem 3.1rem;
    }
    .p1 {
      margin-left: 3rem;
      color: #2f2f2f;
      font-size: 0.5rem;
      font-weight: 500;
      font-family: Source Han Sans CN;
    }
  }
  .biao {
    display: flex;
    border-bottom: 1px solid rgb(242, 242, 242);
    color: #2f2f2f;
    margin-top: 0.5rem;
    padding-bottom: 0.2rem;
    p {
      font-size: 0.45rem;
      margin-left: 0.3rem;
    }
    .p1{
      font-size: 0.45rem;
    }
    .p2{
      margin-left: 0.9rem;
    }
    .p3{
      margin-left: 1.1rem;

    }
    .p4{
      margin-left: 0.9rem;

    }
  }
  .float {
    width: 80%;
  }
  .float1 {
    width: 100%;
  }
  .model {
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 0.5rem;
    .list {
      display: flex;
      .left {
        width: 60%;
        margin: 0.5rem 0rem 0rem 0.3rem;
        .p1 {
          font-size: 0.47rem;
          color: #252525;
        }
        .p2 {
          color: #d04443;
          font-size: 0.4rem;
          margin-top: 0.2rem;
        }
        .p3 {
          color: #646566;
          font-size: 0.4rem;
          margin-top: 0.1rem;
        }
      }
      .right {
        img {
          width: 3rem;
          height: 2rem;
          margin: 0.5rem 0rem 0rem 0.1rem;
        }
        p {
          color: #d04443;
          font-size: 0.45rem;
          margin: 0.8rem 0rem 0rem 1.5rem;
        }
      }
    }
    .bot {
      display: flex;
      .p1 {
        font-size: 0.35rem;
        color: #5e5e5e;
        margin: 0.3rem 0rem 0rem 0.3rem;
      }
      .p2 {
        font-size: 0.35rem;
        color: #5e5e5e;
        margin: 0.3rem 0rem 0rem 0.3rem;
      }
      .p3 {
        font-size: 0.35rem;
        color: #5e5e5e;
        margin: 0.3rem 0rem 0rem 0.3rem;
      }
      .p4 {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0.1rem 0rem 0rem 3rem;
      }
      .p5 {
        width: 0.65rem;
        height: 0.65rem;
        margin: 0.1rem 0rem 0rem 0.8rem;
      }
      .p6 {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0.1rem 0rem 0rem 6rem;
      }
      .p7 {
        width: 0.65rem;
        height: 0.65rem;
        margin: 0.1rem 0rem 0rem 0.8rem;
      }
    }
  }
  .serach1 {
    width: 95%;
    margin: 10px auto;
    /deep/ .van-search__action {
      margin-left: 10px;
    }
    /deep/ .van-field__left-icon {
      margin-left: 10px;
    }
  }
}
</style>
