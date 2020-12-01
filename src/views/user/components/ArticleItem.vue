<template>
  <div class="article-list">
    <!-- 文章 -->
    <div class="article-item" >
      <div class="item-info">
        <div class="avator">
          <img :src="article.mem_head_portrait" alt="" />
        </div>
        <div class="name">
          <p>
            {{article.mem_name}}
          </p>
          <span>
            {{article.graphic_addtime | relTime}}
          </span>
        </div>
        <van-icon v-if="isUser" name="ellipsis" class="buttons" @click="visible = !visible" />
          <div   :class="[visible ? 'more-handle' : 'more-handle-no']">
            <span v-if="visible">置顶</span>
            <span v-if="visible">删除</span>
          </div>
      </div>
      <div class="item-title" @click="$router.push(`/article/detail/${article.gid}`)">
        <span>{{article.graphic_name}}</span>
      </div>
      <div class="item-img" >
        <!-- <div v-if="article.graphic_thumbnail !== undefined && article.graphic_thumbnail.length >0"  :class="'w' + article.graphic_thumbnail.length">
          <img @click="show = true" :src="items.graphic_thumbnail_path" alt="" v-for="items in article.graphic_thumbnail" :key="items.gtid">
        </div> -->
        <div class="imgs">
          <div :class="'w' + imgClass">
            <img @click="getpreview($event)" v-if="index < 3" :src="item.graphic_thumbnail_path" alt="" v-for="(item,index) in article.graphic_thumbnail" :key="item.gtid">
          </div>
          <div v-if="this.article.graphic_thumbnail.length > 3" class="wsPlus">
            +{{this.article.graphic_thumbnail.length - 3}}
          </div>
        </div>
        <van-image-preview v-model="show" :images="article.imgList" @change="onChange">
          <template v-slot:index>第{{ index + 1}}页</template>
        </van-image-preview>
      </div>
      <div class="item-handle">
        <div class="handle-item">
          <span class="icon">
            <img src="../img/fx.png" alt="" />
          </span>
          <span class="num">{{article.graphic_forward}}</span>
        </div>
        <div class="handle-item" @click="onComm">
          <span class="icon">
            <img src="../img/pl.png" alt="" />
          </span>
          <span class="num">{{article.graphic_comment}}</span>
        </div>
        <div class="handle-item" @click="like"  v-if="user.id !== article.memid"  >
          <span class="icon">
            <img src="../img/zan.png" alt="" />
          </span>
          <span class="num">{{article.graphic_like}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant"
import {memberLike} from '../actions';
import {mapState } from 'vuex'
export default {
  name: 'article-item',
  props: {
    article: Object,
    isUser: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false,
      index: 0,
      show: false,
      imgClass:0
    }
  },
  watch: {},
  created () {
    this.initImgArr()
    if(this.article.graphic_thumbnail.length > 3){
      this.imgClass = 's';
    }else{
      this.imgClass = this.article.graphic_thumbnail.length;
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    like () {
      // 点赞， 如果点赞失败则请求取消点赞
      memberLike(this.article.gid, 1, 1)
        .then(res => {
          if (res.code <= 100) {
            this.$toast.success(res.msg);
            this.article.graphic_like = parseInt(this.article.graphic_like) + 1
          } else {
            memberLike(this.article.gid, 1, 0)
              .then(res => {
                if (res.code <= 100) {
                  this.$toast.success(res.msg);
                  this.article.graphic_like = parseInt(this.article.graphic_like) - 1
                } else {
                  this.$toast.fail(res.msg);
                }
              })
              .catch (() => {
                this.$toast.fail('点赞操作失败');
              })
          }
        })
    },
    onComm () {
      this.$router.push({
        path: `/article/detail/${this.article.gid}`,
        query: { type: 'pl' }
      })
    },
    onChange(index) {
      this.index = index;
    },
    initImgArr () {
      this.article['imgList'] = []
      this.article.graphic_thumbnail.map(item => {
        this.article.imgList.push(item.graphic_thumbnail_path)
      })
    }
  }
}
</script>

<style scoped lang='less'>
.article-item {
  box-sizing: border-box;
  padding: 20px 0 0 0;
  border-bottom: 1px solid #eee;
  .item-info {
    display: flex;
    align-items: center;
    height: 34px;
    .avator {
      width: 45.5px;
      height: 45.5px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }
    .name {
      flex: 1;
      p {
        font-size: 14px;
        color: #3A3A3A;
        height: 14px;
        font-weight: 500;
        margin-bottom:5px
      }
      .icon {
        padding: 1px 2px;
        height: 15px;
        border-radius: 2px;
        background: #f3a683;
        font-size: 11px;
        color: #e93c3b;
      }
      span {
        margin-top: -3px;
        font-size: 11px;
        color: #737373;
      }
    }
    .buttons {
      font-size: 25px;
      font-weight: 700;
      color: #bfbfbf;
    }
    .more-handle{
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 150%;
      background: #E8E8E8;
      border-left: 1px solid #BFBFBF;
      color: #3A3A3A;
      transition: all .3s;
      overflow: hidden;
      span{
        padding: 2px 0;
      }
    }
    .more-handle-no{
      transition: all .3s;
      overflow: hidden;
      width: 0;
    }
  }
  .item-title {
    padding: 10px 0;
    font-size: 16px;
    color: #232323;
    .title-icon {
      width: 66px;
      height: 22px;
      float: left;
      padding-right: 5px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 83%;
      }
    }
  }
  .item-img {
    .w1{
      height: 195px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        object-fit:cover;
      }
    }
    .w2 {
      height: 150px;
      display: flex;
      justify-content: space-between;
      img{
        width: 49%;
        height: 100%;
        border-radius: 3px;
        object-fit:cover;
      }
    }
    .w3 {
        height: 110px;
        display: flex;
        justify-content: space-between;
        img{
          width: 32%;
          height: 100%;
          border-radius: 3px;
          object-fit:cover;
        }
    }
    .ws{
      display: flex;
      justify-content: space-between;
      img{
        border-radius: 3px;
        width: 32%;
        height: 83px;
        object-fit:cover;
      }
    }
    .wsPlus{
      width:32%;
      height:83px;
      background:rgba(0,0,0,0.3);
      line-height:83px;
      font-size:26px;
      text-align:right;
      position: relative;
      bottom:84px;
      z-index:10000;
      float:right;
      color:#fff;
      border-radius: 3px;
      padding-right:10px;
    }
    .img-wrapper {
      display: flex;
      justify-content: space-between;
      img {
        width: 32%;
        height: 83px;
      }
    }
  }
  .item-handle {
    display: flex;
    justify-content: space-around;
    padding-top: 5px;
    background: #fff;
    border-radius: 0 0 3px 3px;
    .handle-item {
      width: 90px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 3px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .num {
        font-size: 15px;
        color: #3a3a3a;
      }
    }
  }
}
</style>
