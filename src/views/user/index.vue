<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <page-title title="个人中心" :rightHandleWidth="80">
        <template #title-right>
          <div class="header">
            <!-- <van-icon name="scan" /> -->
            <van-icon
              name="chat-o"
              :badge="message"
              v-if="message > 0"
              @click="$router.push('/user/message')"
            />
            <van-icon
              name="chat-o"
              v-else
              @click="$router.push('/user/message')"
            />
          </div>
        </template>
      </page-title>
      <div
        class="geren p-l-sm flex flex-between"
        @click="$router.push(`/user/page/${userInfos.id}`)"
      >
        <div class="user_img">
          <!-- <img :src="userInfos.avator" alt=""> -->
          <van-image lazy-load :src="userInfos.avator">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="user_info m-l-sm" style="flex: 2">
          <div class="info_con">
            <span class="font-18">{{ userInfos.name }}</span>
            <!-- <span class="m-l-sm vip inlineBlock text-center color-write">VIP</span> -->
            <div class="font-12">
              {{ userInfos.intr ? userInfos.intr : "写一句简介" }}
            </div>
          </div>
        </div>
        <div class="user_home_wra flex flex-center">
          <div class="user_home text-center color-write">
            个人主页 <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="fuwu_wra" v-if="userInfos.usertype != 3">
        <div class="fuwu">
          <div class="fuwu_con flex flex-between">
            <div class="img">
              <img src="./img/VIP.png" alt="" />
            </div>
            <div class="open_ser font-16 color-write">
              <span>已开通</span>
              <span class="color-darkred font-20 m-l-mini">{{
                userHomeData.attention_ent_num || 0
              }}</span>
              <span> 家</span>
              <span class="m-l-mini">店铺服务</span>
              <div class="font-12" style="color: #adacad">
                加会员 攒积分 兑好礼
              </div>
            </div>
            <div
              class="button flex flex-center"
              style="flex-direction: column"
              @click="$router.push('/zz_store')"
            >
              <van-button type="primary" class="font-12">立即查看</van-button>
            </div>
          </div>
        </div>
      </div>
      <div class="fuwu_wra" v-else>
        <div class="fuwu">
          <div class="fuwu_con flex flex-between">
            <div class="img">
              <img src="./img/VIP.png" alt="" />
            </div>
            <div class="open_ser font-16 color-write">
              <span>客流量</span>
              <span class="color-darkred font-20 m-l-mini">{{
                browsingNum()
              }}</span>
              <div class="font-12" style="color: #adacad">
                添加商品 设置活动 ...
              </div>
            </div>
            <div class="merchantsButton">
              <div @click="goEntHome(1)">查看店铺</div>
              <div @click="goEntHome(2)">设置店铺</div>
            </div>
          </div>
        </div>
      </div>
      <div class="kajuan flex flex-around text-center">
        <div class="kajuan_item" @click="userHandle('/member/roll')">
          <span>{{ collectionNumber }}</span>
          <div>红包卡券</div>
        </div>
        <div class="kajuan_item" @click="$router.push('/zz_store')">
          <span>{{ userHomeData.attention_ent_num || 0 }}</span>
          <div>关注店铺</div>
        </div>
        <div class="kajuan_item" @click="$router.push('/zz_collect')">
          <span>{{ userHomeData.collect_num || 0 }}</span>
          <div>收藏夹</div>
        </div>
      </div>
      <div class="order-wra">
        <div class="order">
          <div class="header flex flex-between">
            <span class="font-14" style="font-weight: 700">我的订单</span>
            <span style="color: #909090" @click="toAllOrder">
              查看全部订单<van-icon
                name="arrow"
                size="10"
                style="color: #909090; marginright: 0"
              />
            </span>
          </div>
          <div class="con flex flex-between obligation">
            <div class="item" @click="toOrder1">
              <div class="item-img">
                <img src="./img/待发货.png" alt="" />
              </div>
              <div class="item-con">待发货</div>
            </div>
            <div class="item" @click="toOrder2">
              <div class="item-img">
                <img src="./img/待收货 (1).png" alt="" />
              </div>
              <div class="item-con">待收货</div>
            </div>
            <div class="item" @click="toOrder3">
              <div class="item-img">
                <img src="./img/待付款 (1).png" alt="" />
              </div>
              <div class="item-con">待付款</div>
            </div>
            <div class="item">
              <div class="item-img" @click="toOrder4">
                <img src="./img/评价 (1).png" alt="" />
              </div>
              <div class="item-con">评价</div>
            </div>
            <!-- <div class="item" @click="toAllAfterSale">
            <div class="item-img">
              <img src="./img/售后.png" alt="" />
            </div>
            <div class="item-con">退款/售后</div>
          </div> -->
          </div>
        </div>
      </div>
      <div class="setin" v-if="userInfos.usertype != 3">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" @click="$router.push('/shop')" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="yuyue">
        <div class="yuyue_con flex">
          <div class="con_item" @click="$router.push('/myWallet')">
            <div class="img">
              <img src="./img/wallet.svg" alt="" />
            </div>
            <div class="text">我的钱包</div>
          </div>
          <div class="con_item" @click="myAppointment">
            <div class="img">
              <img src="./img/预约.png" alt="" />
            </div>
            <div class="text">我的预约</div>
          </div>
          <!-- <div class="con_item">
          <div class="img">
            <img src="./img/报名.png" alt="">
          </div>
          <div class="text">
            我的报名
          </div>
        </div> -->
          <div class="con_item" @click="userHandle('/user/myGroupBooking')">
            <div class="img">
              <img src="./img/团购.png" alt="" />
            </div>
            <div class="text">我的拼团</div>
          </div>
          <div class="con_item" @click="userHandle('/user/myGroupPurchase')">
            <div class="img">
              <img src="./img/团购.png" alt="" />
            </div>
            <div class="text">我的团购</div>
          </div>
          <!-- <div class="con_item">
          <div class="img">
            <img src="./img/投资明细.png" alt="">
          </div>
          <div class="text">
            获得明细
          </div>
        </div>
        <div class="con_item">
          <div class="img">
            <img src="./img/支出.png" alt="">
          </div>
          <div class="text">
            支出明细
          </div>
        </div>
        <div class="con_item">
          <div class="img">
            <lottie :options="libaoOptions" :height="30" :width="30" v-on:animCreated="handleAnimation" />
          </div>
          <div class="text">
            我的礼包
          </div>
        </div> -->
          <div class="con_item" @click="$router.push('/zz_issue')">
            <div class="img">
              <van-icon name="records" size="30" />
            </div>
            <div class="text">发布管理</div>
          </div>

          <div class="con_item" @click="$router.push('/myComments')">
            <div class="img">
              <img src="./img/comments.svg" alt="" />
            </div>
            <div class="text">我的评论</div>
          </div>

          <div class="con_item" @click="$router.push('/myForwarding')">
            <div class="img">
              <img src="./img/forward.svg" alt="" />
            </div>
            <div class="text">我的转发</div>
          </div>

          <div class="con_item" @click="$router.push('/myLike')">
            <div class="img">
              <img src="./img/like.svg" alt="" />
            </div>
            <div class="text">我的点赞</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <van-cell title="绑定微信号" v-if="bindingWx" is-link @click="$router.push('/wlogin')" />
        <van-cell
          title="商家注册"
          is-link
          @click="$router.push('/shop')"
          v-if="userInfos.usertype != 3"
        />
        <!-- <van-cell title="员工任务" is-link @click="goTaskPage" /> -->
        <van-cell title="草稿箱" is-link @click="$router.push('/drafts')" />
        <!-- <van-cell title="活动足迹" is-link /> -->
        <!-- <van-cell title="微信公众号" is-link /> -->
        <van-cell
          title="绑定手机号"
          v-if="bindingPhone"
          @click="bindingPhoneFun"
          is-link
        />
        <van-cell title="问题反馈" is-link @click="$router.push('/feedback')" />
        <van-cell
          title="我的收货地址"
          is-link
          @click="$router.push('/myaddress')"
        />
        <van-cell title="修改密码" @click="$router.push('/editPass')" is-link />
        <van-cell title="退出账号" @click="removeToken" is-link />
        <!-- <van-cell title="设置" is-link /> -->
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as libao from "../../assets/lottie/libao.json";
// animationData.assets.forEach((item) => {
//   item.u = '';
//   if (item.w && item.h) {
//       item.p = require(`../../assets/lottie/images/${item.p}`);
//   }
// }); // 获取静态资源
import PageTitle from "@/components/PageTitle";
import zu from "./img/组 1.png";
import { userInfo, userIndex, userHome } from "./actions";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
import util from "../util";
export default {
  name: "user-index",
  components: {
    PageTitle,
  },
  beforeCreate() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      overlay: true,
      duration: 0,
    });
  },
  data() {
    return {
      userInfos: "",
      userList: "",
      userHomeData: {},
      message: [],
      images: [zu, zu],
      bindingPhone: true,
      bindingWx: true,
      libaoOptions: {
        animationData: libao.default,
      },
      collectionNumber: 0,
      isLoading: false,
    };
  },
  created() {
    this.userInfoFun();
    this.userHome();
  },
  methods: {
    ...mapState(["user"]),
    onRefresh() {
      this.userInfoFun();
      this.userHome();
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    //收藏夹数量
    collectionNum() {
      // return parseInt(this.userHomeData.ship_card_num) + parseInt(this.userHomeData.user_coupon_num);
      this.collectionNumber =
        parseInt(this.userHomeData.ship_card_num) +
        parseInt(this.userHomeData.user_coupon_num);
    },
    //任务页
    goTaskPage() {
      if (this.user().mmtid === 6) {
        this.$router.push("/tradeTask");
      } else {
        this.$router.push("/Authentication");
      }
    },
    // 去企业首页
    goEntHome(type) {
      if (type == 1) {
        var obj = {
          entid: this.userList.rel_id,
          entfid: 0,
        };
        var res = this.$Utils.demoRequest(JSON.stringify(obj));
        this.$router.push({
          path: "/merchants/produce",
          query: { res: res },
        });
      } else {
        window.location.href = "http://wechat.lejiagx.cn/merchant/";
      }
    },
    handleAnimation(anim) {
      this.anim = anim;
    },
    ...mapMutations(["delUser", "setUserMap"]),
    // 获取用户信息
    async userInfoFun() {
      const res = await userInfo();

      if (res.code === 100) {
        if (res.data.mem_phone != "" && res.data.mem_phone != null) {
          if (res.data.mem_phone.length > 0) {
            this.bindingPhone = false;
          }
        }

        if (res.data.wx_id != "" && res.data.wx_id != null) {
          if (res.data.wx_id > 0) {
            this.bindingWx = false;
          }
        }

        this.userList = res.data;
        this.userInfos = {
          id: res.data.memid,
          name: res.data.mem_name,
          intr: res.data.mem_intros,
          avator: res.data.mem_head_portrait,
          type: res.data.met_type_name,
          usertype: res.data.mmt_id,
        };

        this.message = res.data.msg_num;
      }
    },
    browsingNum() {
      if (this.userList.browsing_num > 1000) {
        return 999 + "+";
      } else {
        return this.userList.browsing_num;
      }
    },
    // 用户首页信息
    async userHome() {
      const res = await userHome();

      if (res.code === 100) {
        this.userHomeData = res.data;
        this.collectionNum();
      }
    },
    userHandle(path) {
      if (path) {
        this.$router.push(path);
      }
    },
    myAppointment() {
      this.$router.push("/record");
    },
    // 删除token 测试用后期可以删除
    removeToken() {
      localStorage.removeItem("LoginToken");
      localStorage.removeItem("Token");
      this.delUser();
      Toast("成功退出账号，即将跳转首页");
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.$router.push("/");
      }, 400);
    },
    bindingPhoneFun() {
      this.$router.push("/bindingPhone");
    },
    toAllOrder() {
      this.$router.push({
        path: "/all",
        query: { state: 0 },
      });
    },
    toOrder1() {
      this.$router.push({
        path: "/all",
        query: { state: 2 },
      });
    },
    toOrder2() {
      this.$router.push({
        path: "/all",
        query: { state: 3 },
      });
    },
    toOrder3() {
      this.$router.push({
        path: "/all",
        query: { state: 1 },
      });
    },
    toOrder4() {
      this.$router.push({
        path: "/all",
        query: { state: 4 },
      });
    },
    toAllAfterSale() {
      this.$router.push("/allAfterSale");
    },
  },
  mounted: function () {
    util.$on("delMessage", (val) => {
      this.message = 0;
    });
    // 页面渲染完延时关闭
    setTimeout(function () {
      Toast.clear();
    }, 200);
  },
};
</script>

<style scoped lang='less'>
.container {
  background: #f5f6f8;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    /deep/ .van-icon {
      font-size: 23px;
      margin: 0 10px;
    }
  }
  .fuwu_wra {
    position: relative;
    background: #fff;
    height: 56px;
    border-radius: 0px 0px 5px 5px;
  }
  .geren {
    margin-top: 50px;
    padding-top: 10px;
    line-height: 50px;
    background: #fff;
    .user_img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      overflow: hidden;
      text-align: center;
      line-height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user_info {
      .info_con {
        width: 97%;
        line-height: normal;
        .vip {
          width: 29px;
          height: 14px;
          background: rgba(255, 206, 75, 1);
          border-radius: 2px;
        }
        .font-12 {
          margin-top: 5px;
        }
      }
    }
    .user_home_wra {
      flex-direction: column;
    }
    .user_home {
      width: 85px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(208, 68, 67, 1);
      border-radius: 15px 0px 0px 15px;
      padding-left: 4px;
      font-size: 15px;
    }
  }
  .fuwu {
    position: absolute;
    margin-top: 20px;
    background: linear-gradient(
      90deg,
      rgba(55, 52, 56, 1) 0%,
      rgba(47, 44, 47, 1) 100%
    );
    width: 95%;
    left: 2.5%;
    height: 66px;
    border-radius: 10px 10px 0px 0px;
    .fuwu_con {
      margin: 12px;
      .img {
        width: 42px;
        height: 42px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .button {
        /deep/ .van-button {
          height: 30px;
          background: linear-gradient(
            270deg,
            rgba(252, 85, 68, 1) 0%,
            rgba(245, 26, 37, 1) 100%
          );
          border-radius: 15px;
          border: none;
        }
      }
    }
  }
  .kajuan {
    margin-top: 50px;
    margin-bottom: 15px;
    .kajuan_item {
      border-right: 1px solid rgba(225, 225, 225, 1);
      width: 125px;
      &:last-child {
        border-right: none;
      }
      span {
        color: #d04443;
        font-weight: 700;
        font-size: 20px;
      }
      div {
        color: #606060;
        font-size: 14px;
      }
    }
  }
  .order-wra {
    background: #fff;
    width: 350px;
    height: 154px;
    margin: 12px;
  }
  .order {
    padding: 12px;
    .obligation {
      justify-content: space-around;
    }
    .header {
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
    }
    .con {
      margin: 20px 0;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-img {
          width: 30px;
          height: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-con {
          margin-top: 12px;
        }
      }
    }
  }
  .setin {
    width: 95%;
    margin: 15px auto;
    height: 112px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .yuyue {
    width: 95%;
    margin: 10px auto;
    height: auto;
    background: #fff;
    border-radius: 5px;
    .yuyue_con {
      padding: 15px;
      flex-wrap: wrap;
      justify-content: flex-start;
      .con_item {
        width: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          width: 30px;
          height: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          height: 50px;
          line-height: 50px;
          font-style: 14px;
        }
      }
    }
  }
  .footer {
    width: 95%;
    margin: 10px auto;
    border-radius: 5px;
  }
  .merchantsButton {
    width: 50%;
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    div {
      width: 50%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: linear-gradient(270deg, #fc5544 0%, #f51a25 100%);
      opacity: 1;
      color: #ffffff;
      font-size: 15px;
      border-radius: 30px;
      margin-left: 5px;
    }
  }
}
</style>
