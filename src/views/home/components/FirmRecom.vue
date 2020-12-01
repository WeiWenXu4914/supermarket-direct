<template>
  <div class="firm-recom"  v-if="firmList.length">
    <div class="firm-list">
        <div class="list-item" v-for="(item,index) in firmList" :key="index" @click="userHandle(item.entid)">
            <div class="item-img">
                <img :src="item.ent_logo" alt="">
            </div>
            <div class="item-info">
              <div class="info-title">{{item.ent_name}}</div>
                <div class="info-txt">
                  <span class="txt">物流供应链</span>
                  <span class="xx" v-for="(i,index) in 5" :key="index"><img :src="item.ent_grade < (index+1) ? xx_n : xx" alt=""></span>
                  <span style="color:#FABF50;font-size:13px;padding-left:3px">{{item.ent_grade +'.0'}}</span>
                </div>
              </div>
            <div class="item-button" @click.stop="focus(item)">关注</div>
        </div>
    </div>
    <div class="firm-handle">
       <div class="buttons" @click="$router.push('/life')">查看更多 ></div>
       <div class="notice-bar">
           <div class="bar-titile">
             <img src="../../../assets/icons/qyrz.png" alt="">
           </div>
           <div class="nitice" v-if="firmTitle">
               <van-notice-bar color="#646464" background="#fff" left-icon="volume-o" mode="link">
                  欢迎<strong style="margin:0 3px;font-size:18px;color:#000" @click="$router.push(`/merchants/home/${firmTitle[0].memid}`)">“{{firmTitle[0].ent_name}}”</strong>入驻乐家平台。
                </van-notice-bar>
           </div>
       </div>
    </div>
  </div>
</template>

<script>
import { changeFouce as focus } from '../actions'
import { mapMutations } from 'vuex'
export default {
  name: 'mall-index',
  props: {
    firmList:  {
      type: Array,
      default: () => []
    },
    firmTitle: Array
  },
  data () {
    return {
      xx: require('../img/xx.png'),
      xx_n: require('../img//xx_n.png'),
    }
  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations(['setMerchant']),
    userHandle (id) {
      this.setMerchant(this.$route.path)
      this.$router.push({
        path: '/merchants/home/',
        query: {id: id}
      })
    },
    async focus (item) {
      const query = {
        id: item.memid,
        state: 0 
      }
      const res = await focus(query)
      if (res.code === 100) {
        this.$toast.success('关注成功')
        this.firmList.splice(this.firmList.findIndex(item => item.entid === query.id),1)
      } else {
        this.$toast.fail('关注失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.firm-recom {
  background: #fff;
  border-bottom: 1px solid #eee;
  .list-item {
    height: 43px;
    display: flex;
    align-items: center;
    margin: 15px 0;
    box-sizing: border-box;
    padding: 0 10px;
    .item-img {
      width: 43px;
      height: 43px;
      border-radius: 3px;
      overflow: hidden;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }
    .item-info {
      flex:1;
      .info-title {
        font-size: 14px;
        font-weight: 500;
        padding-bottom: 2px;
      }
      .info-txt {
        display: flex;
        align-items: center;
        .txt{
          font-size: 12px;
          font-weight: 400;
          color:rgba(61,61,61,1);
        }
        .xx {
          width: 15px;
          height: 15px;
          margin:0 3px 1px 3px;
          img{
            width: 100%;
            height: 100%;
            object-fit:cover;
          }
        }
      }
    }
    .item-button {
        width: 50px;
        height: 31px;
        font-size: 12px;
        background: #D04443;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
  }
  .firm-handle {
    display: flex;
    flex-direction: column;
    align-items: center;
    .buttons {
      width: 93%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 37px;
      background: #EAEAEA;
      border-radius: 24px;
      font-size: 15px;
      color: #3B3B3B;
    }
    .notice-bar {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .bar-titile {
        width: 76px;
        height: 29px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 100%;
          object-fit:cover;
        }
      }
      .nitice {
        width: 270px;
      }
    }
  }
}
</style>
