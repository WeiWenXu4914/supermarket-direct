<template>
  <div class="detailPay" @scroll="scroll($event)">
    
    <div class="lunbo">
      <div class="navigator-detail-pay">
        <div class="back" @click="back"><img src="./img/back.svg" alt=""></div>
        <div class="function" @click="PacmanModify"><img src="./img/forward.svg" alt=""></div>
      </div>
      <van-swipe @change="onChange" autoplay="3000">
        <van-swipe-item
          v-for="(item, index) in proDetail.pro_carousel"
          :key="index"
        >
          <van-image
            :src="item.pro_pcl_path"
            alt
            width="100%"
            height="9rem"
            lazy-load
            fit="cover"
            @click="showImg($event)"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </van-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ proDetailL }}</div>
        </template>
      </van-swipe>
    </div>
    <!--价格-->
    <div class="center">
      <div class="price">
        <p class="s1">￥</p>
        <p class="s2">{{ proDetail.pro_price }}</p>
        <span class="original-price" v-if="linePrice">￥{{ linePrice }}</span>
        <div class="init-count" v-if="leastCount > 1">
           <span>{{ leastCount }}</span> 件起售
        </div>
      </div>
      <div class="product-desc">
        <h3>{{ proDetail.pro_name }}</h3>
        <p>{{ proDetail.pro_introduction }}</p>
      </div>
    </div>
    <!--优惠券展示-->
    <div class="discount-items" @click="getCouponShow = true" v-if="couponList.length > 0">
      <span>领券</span>
      <div class="items-wrapper">
        <span class="tags" v-for="(item, index) in couponList.slice(2)" :key="index">{{ couType(item) }}</span>
      </div>
      <van-icon class="icon" name="arrow" />
    </div>
    <!--已选数量-->
    <div class="chosed" @click="numShow = true">
      <span>已选</span>
      <span>{{ proDetail.pro_name }} {{ countChoose }} 件</span>
      <van-icon class="icon" name="weapp-nav" />
    </div>
    <!--地址-->
    <div @click="toEditAddress" :class="isSiteNull ? 'tipWarn' : 'address'">
      <span>送至</span>
      <span v-if="address.city">{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailed_site }}</span>
      <span v-else>请添加默认地址</span>
      <van-icon class="icon" name="arrow" :color="isSiteNull ? 'red' : ''"/>
    </div>
    <!--地址-->
    <div @click="parametersStatus = true" :class="isSiteNull ? 'tipWarn' : 'address'" v-if="parmaeterData.attr_param">
      <span>参数</span>
      <span>规格参数 保质期 质地 ...</span>
      <van-icon class="icon" name="arrow" :color="isSiteNull ? 'red' : ''"/>
    </div>
    <!--商品详情图片-->
    <div class="shop">
      <p class="p1">商品详情</p>
      <div class="pro_desc" v-if="proDetail.pro_desc != null">
        <!-- <img v-lazy="item.pro_des_path" v-for="(item, index) in proDetail.pro_desc" :key="index" /> -->
        <div v-html="proDetail.pro_desc" class="html-class" @click="showImg($event)"></div>
      </div>
      <van-empty
        style="margin-top: 10px"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="商家很懒，没添加商品详情"
        v-else
      />
    </div>

    <van-action-sheet
      v-model="numShow"
      :round="true"
      duration="0.2"
      @closed="closeChoose"
      title="请选择数量"
    >
      <div class="contentNum" v-if="proDetail != ''">
        <van-card :thumb="proDetail.pro_thumbnail">
          <template #title>
            <h4 style="font-size: 20px">
              {{ proDetail.pro_name | strSub(10) }}
            </h4>
          </template>
          <template #desc>
            <span style="color: #d04445; font-size: 18px">￥{{ total }}</span>
          </template>
          <template #price>
            <span style="color: #686868; font-size: 17px"
              >库存 {{ proDetail.pro_inventory }}</span
            >
          </template>
          <template #footer>
            <div style="padding: 15px 0; font-size: 14px">
              <span style="position: absolute; left: 10%; line-height: 30px"
                >数量</span
              >
              <button @click="decreaseNum">-</button>
              <!-- <span class="count">{{ countChoose }}</span> -->
              <input
                type="text"
                v-model="countChoose"
                class="count"
                @blur="countNum"
                oninput="value=value.replace(/[^\d]/g,'')"
              />
              <button @click="addNum">+</button>
            </div>
            <div class="center" v-if="myCouponList.length > 0">
              <div
                class="active"
                style="margin-bottom: 5px; width: 100%"
                v-for="(item, index) in myCouponList"
                :key="index"
              >
                <div class="tages">
                  <van-tag plain type="primary" size="medium" color="#D04443">
                    {{ couType(item) }}
                  </van-tag>
                </div>
                <div class="get">
                  <div class="text">
                    <van-field name="radio">
                      <template #input>
                        <van-radio-group
                          v-model="couponApply"
                          direction="horizontal"
                        >
                          <van-radio :name="item.cou_id">使用</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                  </div>
                  <div class="icon">
                    <van-icon name="arrow" size="15" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </van-card>
        <button class="confirmNum" @click="confirmNum">确定</button>
      </div>
    </van-action-sheet>

    <!-- 领取优惠券 -->
    <van-action-sheet
      v-model="getCouponShow"
      :actions="CouponActions"
      cancel-text="取消"
      description="商家已发布的优惠券"
      close-on-click-action
    >
      <div class="center" v-if="couponList.length > 0">
        <div
          class="active"
          style="margin-bottom: 5px"
          v-for="(item, index) in couponList"
          :key="index"
        >
          <div class="tages">
            <van-tag plain type="primary" size="medium" color="#D04443">
              {{ couType(item) }}
            </van-tag>
          </div>
          <div class="get" @click="getDrawCoupon(item.cou_id, index)">
            <div class="text">领取</div>
            <div class="icon">
              <van-icon name="arrow" size="15" />
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!--商品评价-->
    <div class="eva">
      <div class="e1">
        <p class="p1">评价{{ memberCommentList.length }}</p>
        <p class="p2" @click="toAllCommet()">
          查看全部 <van-icon class="icon" name="arrow" />
        </p>
      </div>
      <div v-for="(item, index) in memberCommentList" :key="index">
        <div class="e2">
          <div>
            <img :src="item.mem_head_portrait" alt class="i1" @click="goHandle(item)" />
            <span>{{ item.mem_name }}</span>
          </div>
          <van-rate
            v-model="item.num"
            :size="15"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            class="i2"
            readonly
          />
        </div>
        <div class="e3">
          <p>{{ item.mem_comment_text }}</p>
        </div>
        <div class="e4">
          <div v-for="img in item.mem_comment_imgs" :key="img" class="img-wrapper">
            <van-image
              :src="img"
              width="2.5rem"
              height="2.5rem"
              lazy-load
              fit="cover"
              @click="showImg($event)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="kong"></div>

    <van-goods-action>
      <van-goods-action-icon
        icon="shop-o"
        text="店铺"
        color="#07c160"
        @click="userHandle"
      />
      <div class="product_desc">
        <div>
          <div v-show="!collctionState">
            <van-goods-action-icon
              icon="star"
              text="收藏"
              color="#ccc"
              @click="collction"
            />
          </div>
          <div v-show="collctionState">
            <van-goods-action-icon
              icon="star"
              text="已收藏"
              color="#f50"
              @click="collction"
            />
          </div>
        </div>
      </div>
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buyPro(proDetail.proid)"
      />
    </van-goods-action>
    <transition on name="van-fade">
      <div class="share-tip" v-show="forwardMark">
        <div class="box">
          <div class="icon">
            <img src="../../assets/icons/forward.png" alt="" />
          </div>
          <div class="text">点击右上角发送给指定朋友或者分享到朋友圈。</div>
        </div>
      </div>
    </transition>

    <van-popup
     position="bottom" 
     round 
     v-model="parametersStatus"
    >
      <div class="parameter-title">
        产品参数
      </div>
      <div class="parameter-content" v-if="parmaeterData.attr_param">
        <template v-for="item in parmaeterData.attr_param">
          <div class="parameter-item" :key="item.canName" v-if="item.canCont">
            <span class="label">{{ item.canName }}：</span>
            <span class="content">{{ item.canCont }}</span>
          </div>
        </template>
      </div>
      <div class="parameter-bottom">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" class="button" @click="parametersStatus = false">
          返回
        </van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import {
  entProductDetail,
  productCoupon,
  DrawCoupon,
  productCouponMem,
  memberCollect,
  memberCommentList,
  shippingAddress,
  productAttr,
} from "./actions/index.js";
import { Lazyload, Sku, Swipe, SwipeItem, Toast, Icon, ImagePreview } from "vant";
import { wxJSSDK } from "@/utils/wxshare.js";
export default {
  name: "detail",
  data() {
    return {
      current: 0,
      value: 0,
      proDetail: "",
      proDetailL: 0,
      barClass: false,
      numShow: false, //显示选择数量
      getCouponShow: false,
      CouponActions: "",
      countChoose: 1,
      couponApply: false,
      couponList: [], //优惠券列表
      myCouponList: [], // 我的优惠券
      collctionState: false,
      memberCommentList: [], //商品评价数据
      canNotPay: false,
      countAll: 0, //全部库存数量 -1
      address: {},
      forwardMark: false,
      isSiteNull: false,
      leastCount: 1,
      linePrice: null,
      parametersStatus: false,
      parmaeterData: {},
    };
  },
  created() {
    if (!window.localStorage["LeHome-user-auth"]) return;

    this.getEntProductDetail();
    this.$store.state.commodityNum = 1;

    //配送状态初始化
    this.$store.state.commodityState = false;

    //员工任务判断
    if (this.$route.query.taskKey) {
      let commdityTaskInfo = {
        taskKey: this.$route.query.taskKey,
        res: this.$route.query.res,
      };
      window.localStorage.commdityTaskInfo = JSON.stringify(commdityTaskInfo);
    } else if(this.$route.query.forward) {
      let commdityForwardInfo = {
        forward: this.$route.query.forward,
        res: this.$route.query.res,
      };
      window.localStorage.commdityForwardInfo = JSON.stringify(commdityForwardInfo);
    } else {
      this.getproductCoupon();
      this.getproductCouponMem();
    }
    
  },
  // beforeCreate() {
	// 	Toast.loading({
	// 		message: '加载中...',
	// 		forbidClick: true,
	// 		loadingType: 'spinner',
	// 		overlay: true,
	// 		duration:0
	// 	});
  // },
  watch: {
    countChoose: function (newVal, oldVal) {
      this.proDetail.pro_inventory = this.countAll - this.countChoose;

      if (parseInt(this.countAll) - parseInt(this.countChoose) < parseInt(this.leastCount)) {
        this.proDetail.pro_inventory = 0;
        this.countChoose = this.leastCount;
      } else if (this.countChoose == "" && parseInt(this.countChoose) === 0) {
        this.countChoose = this.leastCount;
      }
    },
  },
  computed: {
    total() {
      if (this.countChoose == "") {
        return 0;
      }
      return (
        (parseInt(this.countChoose) * (this.proDetail.pro_price * 100)) / 100
      );
    },
  },
  methods: {
    //产品参数
    getParmeters() {
      productAttr(this.proDetail.proid)
      .then((res) => {
        this.parmaeterData = res.data;
        console.log(this.parmaeterData)
        // this.parmaeterData.attr_param.forEach((item,index) => {
        //   if (!item.canCont) {
        //     this.parmaeterData.attr_param.splice(index, 1)
        //   }
        // })
        console.log(this.parmaeterData)
      })
    },
    //限制输入数量
    countNum() {
      if (this.countChoose <= this.leastCount) {
        this.countChoose = this.leastCount;
      }
    },
    showImg(e) {
      if (e.target.tagName == "IMG") {
        ImagePreview({
          images: [e.target.src],
          showIndex: 9999,
          closeOnPopstate: true, //页面回退关闭预览
          closeable: true,
        });
      }
    },
    toAllCommet() {
      if(this.memberCommentList.length <= 0){
        Toast('商品评论为空,快去下单评论吧。');
        return false;
      }
      this.$router.push({
        path: "/commdityCommet",
        query: {
          dataList: JSON.stringify(this.memberCommentList),
        },
      });
    },
    //获取评论列表
    getMemberCommentList() {
      memberCommentList(2, this.proDetail.proid).then((res) => {
        if (res.code == 100) {
          this.memberCommentList = res.data;
        }
      });
    },
    back() {
      if (this.$route.query.taskKey || this.$route.query.forward) {
        this.$router.replace("/");
      } else {
        this.$router.go(-1);
      }
    },
    onChange(index) {
      this.current = index;
    },
    couType(item) {
      if (item.cou_money >= 1) {
        if (item.cou_num == 0 && item.pro_id == null) {
          return "无门槛通用券 优惠 " + item.cou_money + "元";
        } else if (item.cou_num != 0 && item.pro_id == null) {
          return "满" + item.cou_num + "元 优惠 " + item.cou_money + "元";
        } else if (item.cou_num == 0 && item.pro_id != null) {
          return "无门槛商品券 优惠 " + item.cou_money + "元";
        } else if (item.cou_num != 0 && item.pro_id != null) {
          return "满" + item.cou_num + "元 优惠 " + item.cou_money + "元";
        }
      } else {
        if (item.cou_num == 0 && item.pro_id == null) {
          return "无门槛通用券 折扣 " + item.cou_money * 100 + "折";
        } else if (item.cou_num != 0 && item.pro_id == null) {
          return "满" + item.cou_num + "元 折扣 " + item.cou_money * 10 + "折";
        } else if (item.cou_num == 0 && item.pro_id != null) {
          return "无门槛商品券 折扣 " + item.cou_money + "折";
        } else if (item.cou_num != 0 && item.pro_id != null) {
          return "满" + item.cou_num + "元 折扣 " + item.cou_money * 100 + "折";
        }
      }
    },
    // 领取优惠券接口
    getDrawCoupon(id) {
      DrawCoupon(id).then((res) => {
        if (res.code == 100) {
          Toast(res.msg);
        } else {
          Toast(res.msg);
        }
        this.getproductCouponMem();
        this.getCouponShow = false;
      });
    },
    // 商品详情
    async getEntProductDetail() {
      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res));
      await entProductDetail(data).then((res) => {
        if (res.data[0].length <= 0) {
          Toast("商品未上架或已删除");
          this.$router.go(-1);
        }

        this.proDetail = res.data[0];
        this.getParmeters();
        //初始化起售数量
        this.leastCount = this.proDetail.leastCount;
        this.linePrice = this.proDetail.linePrice;

        if (this.proDetail.pro_inventory < this.leastCount) {
          Toast("该商品已无库存，请挑选其他商品");
          this.canNotPay = true;
        }
        if (this.proDetail.pro_inventory > 0) {
          // this.proDetail.pro_inventory--;
          this.countAll = this.proDetail.pro_inventory;
        }

        this.proDetailL = res.data[0].pro_carousel.length;
        this.price = parseFloat(res.data[0].pro_price).toFixed(2);
        if (res.data[0].is_collect == 1) {
          this.collctionState = true;
        }

        //初始化购买数量
        this.countChoose = this.leastCount;
        setTimeout(function () {
          Toast.clear();
        }, 200);
      });

      //获取评论列表
      this.getMemberCommentList();
    },
    // 商家优惠券
    getproductCoupon() {
      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res));
      productCoupon(data.proid).then((res) => {
        this.couponList = res.data;
      });
    },
    // 我的优惠券
    getproductCouponMem() {
      var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res));
      productCouponMem(data.proid).then((res) => {
        this.myCouponList = res.data;
      });
    },
    // 去企业首页
    userHandle() {
      var obj = {
        entid: this.proDetail.entid,
        entfid: 0,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));

      this.$router.push({
        path: "/merchants",
        query: { res: res },
      });
    },
    goHandle(item) {
      
      if (item.mmt_id === 3) {

        if(this.$route.path == "/merchants/produce"){
          Toast('您已经在店铺内了');
          return;
        }

        this.setMerchant(this.$route.path);

        var obj = {
          entid: item.rel_id,
          entfid: 0,
        };

        var res = this.$Utils.demoRequest(JSON.stringify(obj));

        this.$router.push({
          path: "/merchants",
          query: { res: res },
        });
      } else {

        if(this.$route.path == `/user/page/${item.mem_id}`){
          Toast('您已经在自己的主页了');
          return;
        }

        this.$router.push({
          path: `/user/page/${item.mem_id}`,
          query: { type: "u" },
        });
      }
    },
    // 显示下单操作
    buyPro(pro_id) {
      if(!this.address.city) {
        Toast("请点击红色区域添加地址")
        this.isSiteNull = true;
        return;
      }
      this.numShow = true;
    },
    // 滚动事件
    scroll(e) {
      if (e.path[1].scrollY >= 50) {
        this.barClass = false;
      } else if (e.path[1].scrollY <= 50) {
        this.barClass = false;
      }
    },
    // 下单商品数量增加
    addNum() {
      if (this.proDetail.pro_inventory <= 0) {
        Toast("没有库存了");
        return;
      }

      this.countChoose++;
      this.proDetail.pro_inventory--;
    },
    // 下单商品数量减少
    decreaseNum() {
      if (this.countChoose > this.leastCount) {
        this.countChoose--;
        this.countChoose = parseInt(this.countChoose);
        this.proDetail.pro_inventory++;
      } else {
        Toast(`此商品${this.leastCount}件起售`)
      }
    },
    // 关闭面板
    closeChoose() {
      this.numShow = false;
      this.couponApply = false;
      this.countChoose = this.leastCount;
    },
    // 立即下单
    confirmNum() {
      //判断是否有库存
      if (this.canNotPay) {
        Toast("该商品已无库存，请您挑选其他商品");
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
        return;
      }

      // 普通下单
      var queryVal = {
        pro_id: this.proDetail.proid,
        pay_num: parseInt(this.countChoose),
      };

      // 员工任务
      let taskKeyInfo = null;
      if (this.$route.query.taskKey) {
        queryVal.taskKey = this.$route.query.taskKey;
      }

      // 使用优惠券
      if (this.couponApply) {
        this.myCouponList.forEach((item, index) => {
          if (item.cou_id == this.couponApply) {
            if (item.is_universal != 1 && this.price < item.cou_num) {
              Toast("未达到优惠券使用条件");
              this.couponApply = false;
              return false;
            }

            queryVal.couMoney = item.cou_money;
          }
        });
        queryVal.cou_id = this.couponApply;
      }
      //起售数量
      queryVal.leastCount = this.leastCount;

      this.$router.push({
        path: "/pay",
        query: queryVal,
      });
    },
    collction() {
      let state = !this.collctionState ? 1 : 0;
      //state   1 收藏   0 取消
      memberCollect(this.proDetail.proid, 2, state)
        .then((res) => {
          
          if (res.code == 100 && state == 1) {
            this.collctionState = true;
          } else if (res.code == 100 && state == 0) {
            this.collctionState = false;
          }
          Toast(res.msg);
          
        })
        .catch((res) => {
          Toast("请求出错");
          console.log(res);
        });
    },
    getAddress() {
      shippingAddress()
      .then((res) => {
        let addressList = res.data;
        for(let i = 0; i < addressList.length; i++) {
          if(addressList[i].by_default == 1) {
            this.address = addressList[i];
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    toEditAddress() {
      this.$router.push({path:'/myaddress',query: { add: 1 } })
    },
    PacmanModify() {
      
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {

              let linkInfo =
                "http://" +
                window.location.host +
                "/#/commdityPay?res=" +
                this.$route.query.res +
                "&forward=1";

              let form = {
                title: this.proDetail.pro_name,
                link: linkInfo,
                imgUrl: this.proDetail.pro_thumbnail,
                desc: this.proDetail.pro_introduction,
              };

            wxJSSDK(form);
            this.forwardMark = true;
            Toast("分享");
            setTimeout(() => {
              this.forwardMark = false;
            }, 4000);
          
       
      } else {
        Toast("请在微信中分享");
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
    this.getAddress();
  },
};
</script>

<style scoped lang="less">
.detailPay {
  width: 100%;
  background-color: rgb(247, 247, 247);
  .parameter-title {
    font-size: 18px;
    width: 100%;
    color: #393A3C;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    text-align: center;
  }
  .parameter-content {
    height: 60vh;
    width: 100%;
    overflow: scroll;
    .parameter-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      min-height: 60px;
      .label {
        color: #000;
        padding: 0 20px;
        white-space: nowrap;
      }
      .content {
        margin-top: 0;
        flex-grow: 1;
        color: #757575;
      }
    }
  }
  .parameter-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    .button {
      width: 80%;
      border-radius: 50px;
    }
  }
  .navigator-detail-pay {
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
    z-index: 1 !important;
    div {
      position: relative;
      width: 24px;
      height: 24px;
      margin: 0 15px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 15px;
        height: 15px;
        transform: translate(-50%,-50%);
      }
    }
    .function {
      img {
        width: 20px;
        height: 20px;
      }
    }
    .back {
      img {
        transform: translate(-55%,-50%);
      }
    }
  }
  .contentNum {
    background: #fafafa;
    padding: 10px 0px;
    button {
      width: 30px;
      outline: none;
      border: none;
      width: 30px;
      height: 30px;
      background: #fff;
    }
    .count {
      width: 40px;
      height: 30px;
      margin: 0 15px;
      border: none;
      text-align: center;
    }
    .confirmNum {
      outline: none;
      background-color: #d04443;
      color: #fff;
      width: 90%;
      height: 40px;
      border: none;
      border-radius: 3px;
      margin: 0px 5%;
      margin-top: 10px;
    }
  }
  .lunbo {
    position: relative;
    width: 100%;
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
    .van-image__img {
      width: 100%;
    }
  }
  .center {
    background-color: #ffffff;
    .product-desc {
      h3 {
        text-indent: 0.5rem;
      }
      p {
        text-indent: 0.5rem;
        font-size: 13px;
        color: #ccc;
        padding: 5px 0;
      }
    }
    .price {
      position: relative;
      .s1 {
        color: #d04443;
        font-size: 0.5rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
        display: inline-block;
      }
      .s2 {
        display: inline-block;
        color: #d04443;
        font-size: 0.7rem;
        font-weight: bold;
      }
      .original-price {
        margin-left: 5px;
        color: gray;
        font-size: 16px;
        text-decoration: line-through;
      }
      .init-count {
        position: absolute;
        right: 20px;
        top: 20px;
        transform: translateY(-10%);
        display: inline-block;
        margin-left: 20px;
        font-size: 14px;
        color: #d04443;
        padding: 2px 5px;
        border: 1px solid #d04443;
        span {
          color: red;
          font-size: 16px;
        }
      }
      button {
        border: 1px solid #d04443;
        color: #d04443;
        background-color: #ffffff;
        outline: none;
        width: 1.5rem;
        line-height: 0.8rem;
        position: absolute;
        right: 0.5rem;
        top: 0.4rem;
      }
    }
    .active {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: 10px;
      background: rgba(208, 68, 67, 0.08);
      .tages {
        width: 82%;
        display: flex;
        align-items: center;
        /deep/ .van-tag {
          margin-right: 8px;
        }
      }
      .get {
        width: 20%;
        height: 25px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
        color: #d04443;
        .text {
          width: 100%;
          height: 25px;
          line-height: 25px;
          text-align: right;
          /deep/ .van-cell {
            background-color: #fbf0f0;
            padding: 0 0;
          }
          /deep/ .van-radio__label {
            width: 50px;
            color: #d04443;
          }
        }
        .icon {
          height: 25px;
          line-height: 30px;
        }
      }
    }
    .product_desc {
      width: 90%;
      color: #282828;
      font-size: 0.45rem;
      font-weight: bold;
      margin-left: 0.5rem;
      margin-top: 0.3rem;
      padding-bottom: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .content {
    margin-top: 0.5rem;
    background-color: #ffffff;
    .c1 {
      width: 90%;
      height: 1.5rem;
      border-bottom: 1px solid #e5e5e5;
      margin-left: 0.5rem;
      .p1 {
        font-weight: bold;
        font-size: 0.5rem;
        display: inline-block;
        margin-top: 0.45rem;
      }
      .p2 {
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
    .c2 {
      .p1 {
        font-weight: bold;
        font-size: 0.5rem;
        display: inline-block;
        margin-top: 0.45rem;
        margin-left: 0.5rem;
      }
      .p2 {
        width: 75%;
        display: inline-block;
        margin-left: 0.5rem;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.3rem;
      }
    }
    .c3 {
      p {
        display: inline-block;
        margin-left: 2rem;
        margin-top: 0.5rem;
        padding-bottom: 0.3rem;
      }
    }
  }
  .shop {
    background-color: #ffffff;
    margin-top: 0.2rem;
    border-top: 1px solid #E1E6E0;
    .p1 {
      color: #282828;
      font-size: 15px;
      font-weight: bold;
      margin: 0.2rem 0;
      display: inline-block;
      margin-left: 50%;
      transform: translate(-50%);
    }
    .p2 {
      margin-left: 40%;
      margin-top: 0.2rem;
      padding-bottom: 0.2rem;
    }
  }
  .eva {
    background-color: #ffffff;
    margin-top: 0.5rem;
    .e1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .p1 {
        margin-top: 0 !important;
        color: #212121;
        font-weight: bold;
        font-family: "siyuan";
        font-size: 0.4rem;
        display: inline-block;
        margin-left: 0.5rem;
      }
      .p2 {
        color: #606060;
        display: inline-block;
        margin-right: 0.4rem;
        .icon {
          transform: translateY(1px);
        }
      }
    }
    .e2 {
      position: relative;
      width: 100vw;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .i1 {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        
      }
      div {
          display: flex;
          align-items: center;
          margin-left: 15px;
      }
      span {
          color: #606060;
          font-size: 0.4rem;
          line-height: 0.8rem;
          padding-left: 10px;
      }
      .i2 {
        // position: absolute;
        margin-right: 0.3rem;
        right: 0.2rem;
        top: 0.9rem;
      }
    }
    .e3 {
      p {
        color: #2e2e2e;
        width: 90%;
        padding: 15px 0;
        margin-left: 0.5rem;
      }
    }
    .e4 {
      margin-left: 0.5rem;
      border-bottom: 1px solid #eee;
      img {
        width: 2.5rem;
        height: 2.5rem;
        // margin-top: 0.5rem;
        margin-left: 0.3rem;
      }
      .img-wrapper {
        display: inline-block;
        margin-left: 15px;
        padding-bottom: 10px;
      }
    }
  }
  .kong {
    height: 1.5rem;
  }
  .xia {
    display: flex;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    img {
      width: 0.7rem;
      padding-top: 0.15rem;
    }
    .x1 {
      margin-left: 0.5rem;
    }
    .x2 {
      margin-left: 1rem;
    }
    .b1 {
      background-color: #d35251;
      color: #ffffff;
      outline: none;
      border: none;
      height: 1.5rem;
      width: 2.55rem;
      margin-left: 1.53rem;
    }
    .b2 {
      background-color: #d04443;
      color: #ffffff;
      outline: none;
      border: none;
      height: 1.5rem;
      width: 2.55rem;
    }
  }
  .pro_desc {
    width: 100%;
    height: auto;
    img {
      width: 100%;
      height: auto;
    }
  }
  .van-sku-container {
    height: auto;
    min-height: 10%;
  }
  .van-goods-action-button--last {
    border-radius: 50px;
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
  .tipWarn {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 0.2rem;
    align-items: center;
    background-color: #fff;
    border: 1px solid red;
    span {
      margin: 0 10px;
      color: red;
      font-size: 13px;
      padding: 10px 0;
    }
    .icon {
      position: absolute;
      right: 10px;
      margin: 0;
    }
  }
  .address {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 0.2rem;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #E1E6E0;
    border-top: 1px solid #E1E6E0;
    span {
      margin: 0 10px;
      color: #656565;
      font-size: 13px;
      padding: 10px 0;
    }
    .icon {
      position: absolute;
      right: 10px;
      margin: 0;
    }
  }
  .chosed {
    display: flex;
    position: relative;
    width: 100%;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #E1E6E0;
    border-top: 1px solid #E1E6E0;
    span {
      margin: 0 10px;
      color: #656565;
      font-size: 13px;
      padding: 10px 0;
    }
    .icon {
      position: absolute;
      right: 14px;
      margin: 0;
    }
  }
  .discount-items {
    display: flex;
    position: relative;
    width: 100%;
    margin-bottom: 0.2rem;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #E1E6E0;
    border-bottom: 1px solid #E1E6E0;
    span {
      margin: 0 10px;
      color: #656565;
      font-size: 13px;
      padding: 10px 0;
    }
    .items-wrapper {
      display: inline-block;
      flex: 1;
      .tags {
        background-color: #E53240;
        padding: 2px 4px;
        margin: 0 5px;
        font-size: 12px;
        color: #fff;
      }
    }
    .icon {
      position: absolute;
      right: 10px;
      margin: 0;
    }
  }
   .share-tip {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    .box {
      position: absolute;
      right: 20px;
      top: 60px;
      box-sizing: border-box;
      padding: 5px;
      background: none;
      border: 1px solid #fff;
      border-radius: 3px;
      color: #fff;
      width: 115px;
      font-size: 13px;
      text-align: center;
      .icon {
        top: -64px;
        height: 70px;
        left: 45px;
        img {
          height: 100%;
          transform: rotate(-9deg);
        }
        position: absolute;
      }
    }
  }
  .html-class {
    width: 100vw;
    /deep/ h2{
      img {
        width: 100%;
      }
    }
    /deep/ p {
      margin: 0 auto;
      font-size: 17px;
      font {
        text-indent: 2em;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
