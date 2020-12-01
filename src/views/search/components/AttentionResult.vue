<template>
    <div class="container-search">
        <div class="content" v-if="resultList.length > 0">
            <div class="item" v-for="(val, inx) in resultList" :key="inx">
                <div class="left" @click="userHandle(val)">
                <van-image :src="val.mem_attention_item.mem_head_portrait" round>
                    <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <!-- <img :src="val.mem_attention_item.mem_head_portrait"/> -->
                <span>{{ val.name }}</span>
                </div>
                <div class="right" @click="onFocus(val,inx)" >{{val.mem_attention}}</div>
            </div>
        </div>

        <van-empty image="search" description="无相关内容，请切换搜索关键词试试" v-if="resultList.length == 0 && !loading"/>

        <van-loading color="#1989fa" vertical style="position:absolute;top:5rem;left:50%;transform:translateX(-50%);" v-show="loading"/>
    </div>
</template>

<script>
import { myAllSearch } from '../actions';
import { Toast, Empty } from 'vant';
export default {
    props: ['searchValue','active4'],
    data() {
        return {
            resultList: [],
            value: '',
            loading: false,
        }
    },
    watch: {
        'searchValue': function () {
            if(this.active4 == 3) {
                this.getData();
            }
        },
        'active4': function () {
            if(this.active4 == 3) {
                this.getData();
            }
        }
    },
    methods: {
        getData() {
            
            if(this.searchValue != "") {
                this.loading = true;
                myAllSearch(this.searchValue,5)
                .then((res) => {
                    console.log(res)
                    if(res.code == 100) {
                        this.resultList = res.data.attention;
                        console.log(res.data.attention,"关注")
                        
                    } else {
                        // Toast(res.msg);
                        this.resultList = res.data.attention;
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err)
                    this.loading = false;
                })
            }
            
        },
    },
}
</script>

<style scoped lang='less'>
.container-search {
  .van-search__content {
    background-color: #f1f1f1;
    .van-cell /deep/ .van-field__left-icon {
    font-size: 20px;
    color: rgb(208, 68, 67)
}
  }
  .content {
    padding: 0 15px;
    .item {
      height: 62px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        /deep/ img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          opacity: 1;
        }
        /deep/ .van-image{
          width: 42px;
          height: 42px;
          background:#fff;
        }
        span {
          margin-left: 10px;
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 26px;
          color: rgba(83, 83, 83, 1);
          opacity: 1;
        }
      }
      .right {
        width: 62px;
        height: 27px;
        border: 1px solid rgba(165, 165, 165, 1);
        opacity: 1;
        border-radius: 3px;
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 27px;
        color: rgba(124, 124, 124, 1);
        opacity: 1;
        text-align: center;
        background: #D04443;
        color: #FFFFFF;
      }
      
    }
  }
}
</style>
