<template>
  <div class="video-item">
    <!-- <div class="item-info">
        <div class="avator" @click.stop="userHandle">
            <img :src="videoItemVal.mem_head_portrait" alt="">
        </div>
        <div class="name">
            <p>
              {{videoItemVal.mem_name}}
              <span class="icon" v-if="videoItemVal.mmt_id == 3">{{videoItemVal.mmt_type_name}}</span>
            </p>
            <span>
              {{videoItemVal.graphic_addtime | relTime}}
            </span>
        </div>
        <div class="buttons" v-if="user.id !== videoItemVal.memid" v-show="videoItemVal.AattName !=='已关注'" @click="changeFocus(videoItemVal.AattState)">{{ videoItemVal.AattName }}</div>
    </div> -->
    <div class="title" @click="$router.push(`/article/detail/${videoItemVal.gid}`)">
      {{videoItemVal.graphic_name}}
    </div>
    <div class="img">
      <van-image width="100%" height="150" fit="cover" radius="3px" :src="videoItem.graphic_surface_plot" @click="playerVideo(videoItem)" />
    </div>
    <!-- <div class="user">
      <div class="user-handle">
        <div class="handle-item" @click="showForward(videoItemVal)">
            <span class="icon">
              <img src="../img/fx.png" alt="">
            </span>
            <span style="margin-left: 2px;margin: 4px;">分享</span>
            <span class="num">{{videoItemVal.graphic_forward}}</span>
          </div>
          <div class="handle-item" @click="onComm" >
            <span class="icon">
              <img src="../img/pl.png" alt="">
            </span>
            <span style="margin-left: 2px;margin: 4px;">评论</span>
            <span class="num">{{videoItemVal.graphic_comment}}</span>
          </div>
          <div class="handle-item" @click="like">
            <span class="icon">
              <img src="../img/zan.png" alt="">
            </span>
            <span style="margin-left: 2px;margin: 4px;">点赞</span>
            <span class="num">{{videoItemVal.graphic_like}}</span>
          </div>
      </div>
    </div> -->
    <div class="imgPlayer" @click="playerVideo(videoItem)">
      <img src="http://apis.lejiagx.cn/static/img/video_player5.png" style="object-fit:cover;width: 70px;">
    </div>
  </div>
</template>

<script>
import { changeFouce as focus, forwardvideoItems, memberLike } from '../actions'
import { mapMutations, mapState } from 'vuex'
import animate from 'animate.css'
export default {

  name: 'video-item',
  props: {
    videoItem: Object
  },
  data () {
    return {
      videoItemVal: '',
    }
  },
  watch: {},
  created () {
    this.initVideo()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    playerVideo(val){
      this.$emit('playerVideo', {...val})
    },
    //视频只允许同时播放一个视频
    ...mapMutations(['setMerchant']),
    showForward (article) {
      this.$emit('showForward', {type:'video',...article})
    },
    onComm () {
      this.$router.push({
        path: `/article/detail/${this.videoItem.gid}`,
        query: { type: 'pl' }
      })
    },
    initVideo () {
      this.videoItemVal = this.videoItem;
    },
    userHandle () {
      if (this.videoItem.mmt_id === 3) {
        this.setMerchant(this.$route.path)
        this.$router.push({
          path: '/merchants/home/',
          query: {id: this.videoItem.rel_id}
        })
      } else {
        this.$router.push({
          path: `/user/page/${this.videoItem.mem_id}`,
          query: { type: 'u' }
        })
      }
    },
    async changeFocus (type) {
      if ( type == 1 ) {
        this.$dialog.confirm({
          title: '提示',
          message: '是否取消关注',
        }).then(async () => {
          const query = {
            id: this.videoItem.mem_id,
            state: 1
          }
          const res = await focus(query)
          if (res.code === 1) {
            this.$toast.success('取消关注')
            this.$emit('changeFocus', {type: type, id: this.videoItem.gid})
          } else {
            this.$toast.fail('操作失败')
          }
        }).catch(() => {})
      } else if (type === 3 || type === 4) {
        const query = {
          id: this.videoItem.mem_id,
          state: 0
        }
        const res = await focus(query)
        if (res.code === 100) {
          this.$toast.success('关注成功')
          this.$emit('changeFocus', {type: type, id: this.videoItem.gid})
        } else {
          this.$toast.fail('关注失败')
        }
      }
    },
    forward () {
      forwardvideoItems(this.videoItem.gid, 1)
        .then(res => {
          if (res.code == 100) {
            this.$toast.success(res.msg);
            this.videoItem.graphic_forward = parseInt(this.videoItem.graphic_forward) + 1
          } else {
            this.$toast.fail(res.msg);
          }

        })
    },
    like () {
      // 点赞， 如果点赞失败则请求取消点赞
      memberLike(this.videoItem.gid, 1, 1)
        .then(res => {
          if (res.code == 100) {
            this.$toast.success(res.msg);
            this.videoItem.graphic_like = parseInt(this.videoItem.graphic_like) + 1
          } else {
            memberLike(this.videoItem.gid, 1, 0)
              .then(res => {
                if (res.code == 100) {
                  this.$toast.success(res.msg);
                  this.videoItem.graphic_like = parseInt(this.videoItem.graphic_like) - 1
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
    onChange(index) {
      this.index = index;
    }
  }
}
</script>

<style scoped lang="less">
.video-item{
  border-bottom: 1px solid #eee;
  margin: 0px 0;
  height:200px;
  overflow:hidden;
  .item-info{
    display: flex;
    align-items: center;
    height: 34px;
    .avator {
      width: 34px;
      height: 34px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 6px;
      img{
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }
    .name{
      flex: 1;
      p{
        font-size: 14px;
        color: #3A3A3A;
        height: 14px;
        padding-bottom: 4px;
      }
      .icon{
        padding: 1px 2px;
        height: 15px;
        border-radius: 2px;
        background: #f3a683;
        font-size: 11px;
        color: #E93C3B;
      }
      span{
        margin-top: -3px;
        font-size: 11px;
        color: #737373;
      }
    }
    .buttons{
      font-size: 14px;
      color:#D04443;
    }
  }
  .img{
    //position: relative;
    border-radius: 5px;
    overflow: hidden;
    .video-play{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 45px;
      height: 45px;
      border-radius: 100%;
      background:rgba(38,38,38,.8);
      display: flex;
      align-items: center;
      justify-content: center;
      .play{
        margin-left: 4px;
        display: block;
        border-top: 7px solid transparent;
        border-left: 13px solid #fff;
        border-bottom: 7px solid transparent;
        z-index: 99999;
      }
    }
  }
  .title{
    width:100%;
    font-size: 0.42667rem;
    margin:0px 0 5px 0;
  }
  .user{
    //display: flex;
    align-items: center;
    //height: 35px;
    margin: 0px 0;
    .user-img{
      width: 100%;
      //border:1px red solid;
      //display: flex;
      //align-items: center;
      overflow:auto;
      .imgs{
        width: 40px;
        height: 51px;
        //overflow: hidden;
        float:left;
        img{
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin-top:5.5px;
          background:back;
        }
      }
      .name{
        font-size: 14px;
        color: #3a3a3a;
        font-weight: 600;
        margin: 0 10px;
        float:left;
        span{
          padding: 2px 5px;
          background: #D04443;
          color: #fff;
          font-size: 12px;
          border-radius: 2px;
        }
      }
      .gz{
        color: #D04443;
        font-size: 14px;
        font-weight: 600;
        float:right;
        line-height:51px;
      }
    }
    .user-handle{
      width: 100%;
      display: flex;
      justify-content: space-around;
      .handle-item{
        width: 90px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      .icon{
        width: 18px;
        height: 18px;
        margin-right: 3px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .num{
        font-size: 15px;
      }
      }
    }
  }
}
.imgPlayer {
  width:100%;
  height:100px;
  text-align:center;
  line-height: 170px;
  position:relative;
  top:-140px;
  //left:20%;
  z-index:20;
}
.van-image {
  background:rgba(0,0,0,1);
}
</style>
