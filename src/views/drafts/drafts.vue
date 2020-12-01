<template>
  <div class="drafts">
    <title-view title="草稿箱">
       <span class="management" @click="changeStatus">{{ isShow === false ? '管理' : '取消'}}</span>
    </title-view>

    <div  v-if="dataList.length !== 0">
        <div class="wrapper" v-for="(item,index) in dataList" :key="index">
            <van-checkbox v-model="item.isChecked" icon-size="24px" checked-color="#D04443" v-show="isShow"></van-checkbox>
            <div class="item" @click="toDetail(item)">
                <h6>{{ item.graphic_name }}</h6>
                <p>{{ type(item.gc_id) }}</p>
            </div>
        </div>
    </div>
    
    <van-empty description="无可编辑草稿" v-if="dataList.length === 0"/>
    <div class="buttons" v-show="isShow">
        <button @click="checkAll">全选</button>
        <button @click="deleteItem">删除</button>
    </div>
  </div>
</template>

<script>
import titleView from '../../components/public_views/titleView';
import { Checkbox, CheckboxGroup, Toast, Dialog } from 'vant';
import { myDraft,myDraftDel } from './actions/index';
export default {
  components: {
      titleView
  },
  data() {
      return {
          dataList: [],
          isShow: false
      }
  },
  created() {
      this.getData();
  },
  methods:{
      getData() {
            myDraft()
            .then((res) => {
                if(res.code == 100) {
                    let data = res.data;
                    console.log(res)
                    data.forEach(element => {
                        element.isChecked = false;
                    });
                    this.dataList = data;
                }
            })
      },
      checkAll() {
          this.dataList.forEach(element => {
              if(element.isChecked == false) {
                   element.isChecked = true;
              }
          })
      },
      //显示删除
      changeStatus() {
          
          if(this.dataList.length == 0) {
              return;
          }

          this.isShow = !this.isShow;
          //初始化选中状态
          this.dataList.forEach(element => {
              element.isChecked = false;
          })
      },
      type(id) {
          if(id == 2) {
              return '视频';
          } else if(id == 3) {
              return '中介';
          } else if(id == 4) {
              return '招聘';
          } else if(id == 6) {
              return '广告';
          } else {
              return '图文';
          }
      },
      //删除选中项
      deleteItem() {
          let ids = [];
          this.dataList.forEach(element => {
              if(element.isChecked === true) {
                  ids.push(element.gid);
              }
          })

        Dialog.confirm({
            title: '删除草稿',
            message: '确定要删除选中项吗',
        })
        .then(() => {

            myDraftDel(ids)
            .then((res) => {
                if(res.code == 100) {
                    Toast("删除成功");
                    this.getData();
                }
            });

        })
        .catch(() => {
            // on cancel
        });


      },
      toDetail(item) {
          
          if(item.gc_id == 2) {//跳转视频编辑

              const videoData = {
                        nav_id: 8,
                        graphic_name: item.graphic_name, //标题
                        video_path: item.rel_data.graphic_video_path,  //视频链接
                        surface_plot: item.rel_data.img[0], //缩略图
                        details: item.rel_data.graphic_details , //正文
                        edit: false, 
                        gid: item.gid
              }

              this.$router.push({
                  path: '/article/createvideo',
                  query: {
                      videoData: JSON.stringify(videoData),
                      draftsEdit: true 
                  }  
              })

          } else if(item.gc_id == 3) {//接口有BUG  返回状态不正确
              Toast("中介");
          } else if(item.gc_id == 4) {
              Toast("招聘");
          } else if(item.gc_id == 6) {
              Toast("广告");
          } else {//跳转到图文编辑

            const articleForm = {
                graphic_name: item.graphic_name, //标题
                graphic_details: item.rel_data.graphic_details , //正文
                img_path: item.rel_data.img, //图片
                edit: false,
                gid: item.gid
            }

            this.$router.push({
                  path: '/article/create',
                  query: {
                      articleData: JSON.stringify(articleForm),
                      draftsEdit: true 
                  }  
              })
          }
      }
  },
};
</script>

<style scoped lang="less">
.management {
    font-size: 15px;
    color: #232323;
    font-family: Source Han Sans CN;
}
.wrapper {
    display: flex;
    flex-direction: row;
    width: 92%;
    margin: 0 auto;
    border-bottom: 1px solid #D9D9D9;
    .item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 80px;
        flex-grow: 1;
        margin-left: 10px;
        h6 {
            font-size: 16px;
            font-family: Source Han Sans CN;
            color: #292929;
            margin-top: 10px;
        }
        p {
            font-size: 13px;
            font-family: Source Han Sans CN;
            color: #7A7A7A;
            margin-bottom: 10px;
        }
    }
}
.buttons {
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    bottom: 10px;
    width: 100%;
    button {
       width: 165px;
       height: 45px;
       border: none;
       border-radius: 2px;
       font-size: 17px;
       font-family: Source Han Sans CN;
    }
    button:nth-of-type(1) {
       background-color: #fff;
       border: 1px solid #CACACA;
    }
    button:nth-of-type(2) {
       background-color:#D04443;
       color: #fff;
    }
}
</style>
