<template>
  <div class="zong" @scroll="scroll($event)">
    <van-nav-bar
      title="互动"
      left-arrow
      fixed
      :border="false"
      @click-left="back"
      :class="[!barClass ? '' : 'navClassTrue']"
    />
    <van-tabs v-model="active" animated swipeable sticky @change="changeFun">
      <van-tab :title="item.val" v-for="(item, index) in title" :key="index">
        <template #title v-if="item.nMessageNum > 0">
          {{ item.val }} <span style="color:red;">{{ item.nMessageNum }}</span>
        </template>
        <template v-if="item.val == '点赞'">
          <div class="like" v-if="dataList.length > 0">
            <div class="like_tem" v-for="(zan, zk) in dataList" :key="zk">
              <div class="left" @click="userHandle(zan)">
                <img :src="zan.mem_head_portrait" alt />
              </div>
              <div class="center" @click="userHandle(zan)">
                <P class="p1">{{ zan.mem_name | strSub(7) }}</P>

                <div
                  style="display: flex; align-items: center"
                  v-if="zan.mem_like_del == 0"
                >
                  <van-icon name="thumb-circle-o" size="25px" color="red" />
                  <span>点赞</span>
                  <span style="padding-left:10px;" @click.stop="goDetail(zan)">{{ zan.graphic_name | strSub(10) }}</span>
                </div>
                <div style="display: flex; align-items: center" v-else>
                  <img src="./static/good.png" alt="" />
                  <!-- <span>已取消</span> -->
                  <span style="padding-left:10px;" @click.stop="goDetail(zan)">{{ zan.graphic_name | strSub(10) }}</span>
                </div>

                <p class="p3">{{ zan.mem_like_addtime | relTime }}</p>
              </div>
              <div class="right" @click="goDetail(zan)">
                <img
                  :src="zan.graphic_surface_plot"
                  v-if="zan.gc_id == 2"
                  alt
                />
                <img
                  :src="zan.graphic_thumbnail[0].graphic_thumbnail_path"
                  v-else-if="zan.gc_id == 1 && zan.graphic_thumbnail.length > 0"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <van-empty :description="item.val + '为空'" />
          </div>
        </template>
        <template v-else-if="item.val == '转发'">
          <div class="tem" v-show="dataListFow.length != 0">
            <div class="tem1" v-for="(pl, pk) in dataListFow" :key="pk">
              <div class="left" @click="userHandle(pl)">
                <img :src="pl.mem_head_portrait" alt />
              </div>
              <div class="center" @click="userHandle(pl)">
                <P class="p1">{{ pl.mem_name | strSub(7) }}</P>
                <p class="p2" v-if="pl.mem_forward_class == 1">
                  转发了 {{ pl.forward_item.graphic_name | strSub(7) }}
                </p>
                <p class="p3">{{ pl.mem_forward_addtime | relTime }}</p>
              </div>
              <div
                class="right"
                v-if="pl.mem_forward_class == 1"
                @click="goDetail(pl)"
              >
                <img
                  :src="pl.forward_item.graphic_surface_plot"
                  v-if="pl.forward_item.gc_id == 2"
                  alt
                />
                <img
                  :src="
                    pl.forward_item.graphic_thumbnail[0].graphic_thumbnail_path
                  "
                  v-else-if="pl.forward_item.gc_id == 1 && pl.forward_item.graphic_thumbnail.length > 0"
                />
              </div>
            </div>
          </div>
          <div v-show="dataListFow.length == 0">
            <van-empty :description="item.val + '为空'" />
          </div>
        </template>
        <template v-else>
          <div class="new_fans" v-if="dataListAtt.length > 0">
            <div
              class="tem1"
              v-for="(gz, gk) in dataListAtt"
              :key="gk"
              @click="userHandle(gz)"
            >
              <div class="module">
                <div class="left">
                  <img :src="gz.mem_head_portrait" alt />
                </div>
                <div class="center">
                  <P class="p1">{{ gz.mem_name | strSub(7) }}</P>
                  <P class="p2">{{ gz.mem_attention_addtime | relTime }}</P>
                </div>
                <div class="right">
                  <van-button type="primary">{{ gz.mem_attention_state_name }}</van-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <van-empty :description="item.val + '为空'" />
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getMessages } from "./actions/index";
export default {
  name: "zong",
  components: {},
  data() {
    return {
      barClass: false,
      active: 0,
      title: [
        {
          val: "点赞",
          nMessageNum: 0,
        },
        {
          val: "关注",
          nMessageNum: 0,
        },
        { 
          val: "转发", 
          nMessageNum: 0 
        },
      ],
      dataList: [],
      dataListAtt: [],
      dataListFow: [],
    };
  },
  created() {
    this.getMessagesNavFun();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getMessagesNavFun() {
      getMessages('nav').then((res) => {
        console.log(res)
        this.title = res.data;
        this.getMessagesFun();
      });
    },
    getMessagesFun(val = "") {
      getMessages(val).then((res) => {
        console.log(res,'tab')
        if(val == 0 || val == ''){
          this.dataList = res.data;
        }else if(val == 1){
          this.dataListAtt = res.data;
        }else if(val == 2){
          this.dataListFow = res.data;
          console.log(res)
        }
        this.title[this.active].nMessageNum = res.nMessageNum;
      });
    },
    changeFun() {
      this.getMessagesFun(this.active);
    },
    back() {
      this.$router.go(-1);
    },
    scroll(e) {
      if (e.path[1].scrollY >= 50) {
        this.barClass = true;
      } else if (e.path[1].scrollY <= 50) {
        this.barClass = false;
      }
    },
    goDetail(val) {
      if (val.mem_forward_class) {
        if (val.mem_forward_class == 1) {
          val.gid = val.mem_forward_id;
        }
      }

      this.$router.push(`/article/detail/${val.gid}`);
    },
    userHandle(item) {
      if (item.mmt_id === 3) {
        var obj = {
          entid: this.item.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {
        this.$router.push({
          path: `/user/page/${item.toMemid}`,
          query: { type: "u" },
        });
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
  },
};
</script>

<style scoped lang="less">
.zong {
  width: 100%;
  /deep/ .van-tabs {
    margin-top: 50px;
  }
  /deep/ .van-tabs__content {
    min-height: calc(100vh - 95px);
  }
  /deep/ .van-nav-bar {
    background: #fff;
    .van-nav-bar__left {
      .van-nav-bar__text {
        color: #111;
      }
      .van-icon-arrow-left {
        color: #111;
      }
    }
    .van-nav-bar__title {
      color: #111;
    }
  }
  .navClassTrue {
    background: rgba(255, 255, 255, 0);
  }
  .like {
    margin-top: 10px;
    .like_tem {
      display: flex;
      border-bottom: 1px solid #e1e1e1;
      width: 90%;
      margin: 0.3rem 0rem 0rem 0.3rem;
      padding-bottom: 0.4rem;
      .left {
        margin: 0.1rem 0rem 0rem 0.2rem;
        img {
          margin: 0.1rem 0.1rem 0 0.1rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
      .center {
        margin-left: 0.3rem;
        .p1 {
          color: #1d1d1d;
          font-size: 0.45rem;
        }
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
        .p3 {
          color: #888888;
          margin-top: 0.1rem;
        }
      }
      .right {
        margin-left: 3rem;
        img {
          width: 1.9rem;
          height: 1.9rem;
          border-radius: 0.1rem;
        }
      }
    }
  }
  .tem {
    height: auto;
    .tem1 {
      display: flex;
      border-bottom: 1px solid #e1e1e1;
      width: 98%;
      margin: 10px auto;
      padding-bottom: 0.5rem;
      justify-content: space-between;
      .left {
        width: 20%;
        margin: 0.1rem 0rem 0rem 0.2rem;
        img {
          width: 1.5rem;
          height: 1.5rem;
          object-fit: cover;
          border-radius: 3px;
        }
      }
      .center {
        width: 50%;
        .p1 {
          color: #1d1d1d;
          font-size: 0.45rem;
        }
        .p2 {
          color: #1d1d1d;
          font-size: 0.45rem;
        }
        .p3 {
          color: #888888;
          margin-top: 0.3rem;
        }
      }
      .right {
        width: 30%;
        margin-left: 1.2rem;
        img {
          width: 2rem;
          height: 2rem;
          object-fit: cover;
          border-radius: 3px;
        }
      }
    }
  }
  .new_fans {
    .module {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e1e1e1;
      width: 98%;
      margin: 10px auto;
      padding-bottom: 0.5rem;
      .left {
        width: 20%;
        margin: 0.1rem 0rem 0rem 0.2rem;
        img {
          width: 1.5rem;
          height: 1.5rem;
          object-fit: cover;
          border-radius: 3px;
        }
      }
      .center {
        width: 50%;
        .p1 {
          color: #1d1d1d;
          font-size: 0.45rem;
          margin-top: 0.5rem;
        }
        .p2 {
          color: #888888;
          margin-top: 0.1rem;
        }
      }
      .right {
        width: 30%;
        button {
          height: 1rem;
          color: #fff;
          background-color: #d04443;
          border: none;
          outline: none;
          border-radius: 0.1rem;
          margin-top: 0.3rem;
        }
      }
    }
  }
}
</style>