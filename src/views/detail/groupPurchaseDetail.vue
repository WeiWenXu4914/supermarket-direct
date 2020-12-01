<template>
  <div class="detail" @scroll="scroll($event)">
        <van-nav-bar
            title="团购详情"
            left-arrow
            fixed
            :border="false"
            @click-left="back"
            :class="[!barClass ? '' : 'navClassTrue']"
        />
        <div class="lunbo">
            <van-swipe @change="onChange" autoplay="3000">
                <van-swipe-item>
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                </van-swipe-item>
                <van-swipe-item>
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                </van-swipe-item>
                <van-swipe-item>
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                </van-swipe-item>
                <van-swipe-item>
                    <img src="./img/1593611640(1)@2x(1).png" alt />
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">{{ current + 1 }}/4</div>
                </template>
            </van-swipe>
        </div>
        <div class="end_time">
            <div class="title">活动剩余：</div>
            <div class="time">
                <van-count-down :time="end_time" format="DD 天 HH 时 mm 分 ss 秒" />
            </div>
        </div>
        <div class="center">
            <p class="product_desc">美式咖啡，香甜淳厚，下午小零食</p>
            <div class="product_list">
                <div class="pro_name">美式咖啡</div>
                <div class="right">
                    <div class="pro_num">1个</div>
                    <div class="pro_price">60元</div>
                </div>
            </div>
            <div class="product_list">
                <div class="pro_name">小零食</div>
                <div class="right">
                    <div class="pro_num">1个</div>
                    <div class="pro_price">20元</div>
                </div>
            </div>
            <div class="price_all">
                <div class="title">总价</div>
                <div class="monery">
                    80元
                </div>
            </div>
            <div class="price_group">
                <div class="title">团购价</div>
                <div class="monery">
                    70元
                </div>
            </div>
        </div>
        <div class="eva">
            <div class="e1">
                <p class="p1">评价100</p>
                <p class="p2">查看全部 <van-icon name="arrow" /></p>
            </div>
            <div class="e2">
                <img src="./img/01987a5d837c0fa8012060bef252eb@2x.png" alt class="i1" />
                <p>希金斯</p>
                <van-rate 
                    v-model="value" 
                    :size="15" 
                    color="#ffd21e" 
                    void-icon="star" 
                    void-color="#eee" 
                    class="i2"
                />
            </div>
            <div class="e3">
                <p>日期新鲜、发货快、新包装、味道变得更好；快递员态度很 好</p>
            </div>
            <div class="e4">
                <img src="./img/1593611640(1)@2x(1).png" alt />
                <img src="./img/1593611640(1)@2x(1).png" alt />
                <img src="./img/1593611640(1)@2x(1).png" alt />
            </div>
        </div>
        <div class="kong"></div>
        <div class="xia">
            <div class="left">
                <div class="x1">
                    <van-icon name="shop-o" size="26" color="#646464" />
                    <p>店铺</p>
                </div>
                <div class="x2" @click="collect">
                    <van-icon name="like-o" size="26" color="#646464" v-show="!isCollection"/>
                    <van-icon name="like" size="26" color="#f50" v-show="isCollection"/>
                    <p>收藏</p>
                </div>
            </div>
            <div class="right">
                <button class="b2">
                    <div class="icon">￥</div>
                    <div class="monery_text">70</div>
                    <div class="text">立即抢购</div>
                </button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "group-gurchase-detail",
  data() {
    return {
      current: 0,
      value:4,
      barClass:false,
      end_time:30 * 60 * 60 * 1000,
      isCollection: false
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    back() {
      this.$router.go(-1)
    },
    scroll(e) {
      if(e.path[1].scrollY >= 50){
        this.barClass = true;
      }else if (e.path[1].scrollY <= 50) {
        this.barClass = false;
      }
    },
    collect() {
        this.isCollection = !this.isCollection;
    }
  },
  mounted() {
    document.addEventListener('scroll',this.scroll)
  }
};
</script>

<style scoped lang="less">
.detail {
    width: 100%;
    background-color: rgb(247, 247, 247);
    .lunbo {
        width: 100%;
        .custom-indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
    .end_time {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: #ffffff;
        text-align: center;
        background: #D04443;
        opacity: 1;
        font-size: 15px;
        font-weight: 500;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .van-count-down {
            color: #fff;
        }
    }
    .center {
        background-color: #ffffff;
        padding-bottom: 15px;
        .price_all {
            width: 90%;
            margin: 0 auto;
            padding-top: 5px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .title {
                font-size: 17px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #232323;
                opacity: 1;
            }
            .monery {
                margin-left: 10px;
                margin-right: 5px;
                color: #ADADAD;
                font-size: 0.5rem;
                display: inline-block;
                text-decoration:line-through;
            }
        }
        .price_group {
            width: 90%;
            margin: 0 auto;
            padding-top: 2px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .title {
                font-size: 17px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #232323;
                opacity: 1;
            }
            .monery {
                margin-left: 10px;
                margin-right: 5px;
                color: #D04443;
                font-size: 0.5rem;
                display: inline-block;
            }
        }
        .product_desc {
            width: 90%;
            color: #282828;
            font-size: 0.45rem;
            font-weight: bold;
            margin-left: 0.5rem;
            margin-top: 0.2rem;
            padding-top: 0.3rem;
            padding-bottom: 0.2rem;
        }
        .product_list {
            width: 90%;
            margin: 0.2rem auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pro_name {
                width: 60%;
                font-size: 17px;
                color: #232323;
                font-weight: 500;
            }
            .right {
                width: 30%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #474747;
                font-size: 17px;
                .pro_num {
                    width: 60%;
                }
                .pro_price {
                    width: 40%;
                }
            }
        }
    }
    .eva {
        background-color: #ffffff;
        margin-top: 0.2rem;
        margin-bottom: 57px;
        .e1 {
        .p1 {
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
            margin: 0.5rem 0rem 0rem 5.8rem;
        }
        }
        .e2 {
        position: relative;
        .i1 {
            width: 1.1rem;
            margin: 0.5rem 0rem 0rem 0.5rem;
        }
        p {
            color: #606060;
            position: absolute;
            font-size: 0.5rem;
            left: 2rem;
            top: 0.8rem;
            display: inline-block;
        }
        .i2 {
            position: absolute;
            right: 0.2rem;
            top: 0.9rem;
        }
        }
        .e3 {
        p {
            color: #2e2e2e;
            width: 90%;
            margin-left: 0.5rem;
        }
        }
        .e4 {
        margin-left: 0.5rem;
        img {
            width: 2.5rem;
            height: 2.5rem;
            margin-top: 1rem;
            margin-left: 0.3rem;
        }
        }
    }
    .kong {
        height: 2px;
    }
    .xia {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        .left {
            width: 30%;
            display: flex;
            flex-direction: row;
            padding-left: 10px;
            .x1 {
                width: 100%;
                color: #646464;
            }
            .x2 {
                width: 100%;
                color: #646464;
            }
        }
        .right {
            width: 70%;
            display: flex;
            flex-direction: row;
            .b1 {
                background-color: #EEBBBB;
                color: #ffffff;
                outline: none;
                border: none;
                height: 1.5rem;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                .text {
                    font-size: 17px;
                    font-weight: 500;
                    margin-left: 5px;
                }
                .monery_text {
                    font-size: 17px;
                    font-weight: 500;
                }
                .icon {
                    font-size: 15px;
                    margin-left: 1px;
                }
            }
            .b2 {
                background-color: #d04443;
                color: #ffffff;
                outline: none;
                border: none;
                height: 1.5rem;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                .text {
                    font-size: 17px;
                    font-weight: 500;
                    margin-left: 5px;
                }
                .monery_text {
                    font-size: 17px;
                    font-weight: 500;
                }
                .icon {
                    font-size: 15px;
                    margin-left: 1px;
                }
            }
        }
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
        background:rgba(255,255,255,0);
    }
}
</style>