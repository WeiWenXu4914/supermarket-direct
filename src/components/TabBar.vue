<template>
  <div class="tabbar-wrapper">
    <div class="page-tabbar">
      <div
        class="tab-item"
        v-for="item in tabbarData"
        :key="item.tab_link"
        @click="getVal(item)"
        :style="[{ display: item.tab_link == 'add' && !addshow ? 'none' : '' }]"
      >
        <!-- :style="[{ display: item.tab_link == 'add' && !addshow ? 'none' : '' }]" -->
        <template v-if="item.tab_link !== 'add'">
          <p class="tab-icon" v-if="activeImged === item.tab_link">
            <img :src="item.tab_iconed" alt="" />
          </p>
          <p class="tab-icon" v-else>
            <img :src="item.tab_icon" alt="" />
          </p>
        </template>
        <template v-else-if="item.tab_link == 'add' && addshow == true">
          <div class="add-class">
            <div class="add-icon" @click="addArticle">
              <img :src="item.tab_icon" alt="" />
            </div>
          </div>
        </template>
        <!-- <template v-else-if="item.tab_link == 'add' && addshow == false">
          <div class="add-class">
            <div class="add-icon" @click="recommend">
              <img :src="item.tab_icon" alt="" />
            </div>
          </div>
        </template> -->
        <span
          v-if="item.tab_name"
          class="tab-text"
          :class="[item.tab_link === activeImged ? 'active-text' : '']"
          >{{ item.tab_name }}</span
        >
      </div>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      class="van-pops"
      :style="{ height: 'auto;' }"
    >
      <div class="operationClass">
        <div class="close" @click="show = false">
          <van-icon name="cross" size="25px" />
        </div>
        <!-- <div class="CutPanelClass" @click="CutPanel">
          <div>
            <span>切换</span>
            <van-icon name="exchange" size="25px" />
          </div>
        </div> -->
      </div>

      <p>城事乐家助力实体企业</p>
      <p>线上发展</p>
      <!-- <div class="tittle">快捷发布</div> -->
      <div class="type_class" v-if="publishData.length > 0">
        <div
          class="type_item"
          v-for="(item, index) in publishData"
          :key="index"
          @click="handle(item)"
        >
          <div class="icon">
            <img :src="item.icon || item.nav_icon" alt="" />
          </div>
          <div class="type_item_text">{{ item.title || item.nav_name }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getTabbat } from "../api/index";
export default {
  name: "mall-index",
  data() {
    return {
      activedPage: "/",
      show: false,
      tabbarData: "",
      publish: 0,
      publishData: [],
      addshow: false,
    };
  },
  props: {
    tabbarItem: {
      type: Number,
      required: true,
    },
  },
  watch: {},
  computed: {
    ...mapState(["user"]),
    activeImged() {
      return this.$route.path;
    },
  },
  created() {
    if (this.user.mmtid == 3) {
      this.addshow = true;
    }
    this.show = false;
    var type = this.tabbarItem;
    this.getTabbat(type);
  },
  methods: {
    recommend() {
      this.getTabbat();
      localStorage.removeItem('selective');
      if (this.user.mmtid == 3) {
        this.show = true;
      } else {
        this.show = false;
        // this.$router.replace("/inviteBusinessmen");
      }
    },
    async getTabbat(type = 2) {
      const res = await getTabbat(type);
      this.tabbarData = res.data.tabbar;
      if (type == 2) {
        var sel = localStorage.getItem("selectives");
        if (sel) {
          res.data.publish = JSON.parse(sel);
          this.publishData[0] = res.data.publish;
        } else {
          this.publishData = res.data.publish;
        }
      } else {
        this.publishData = res.data.publish;
      }
    },
    // tabbar用户点击操作
    handle(val) {
      localStorage.removeItem('selective');
      this.show = false;
      var href = val.href || val.nav_link;
      var id = val.id || val.nid;
      this.$router.push(href + "?id=" + id);
    },
    // 用户操作属性
    getVal(val) {
      if (
        val.tab_link !== "add" &&
        val.tab_link != "/no" &&
        val.tab_link != "/jump_link"
      ) {
        if (val.tab_link == this.$route.path) {
          this.getTabbat();
          this.$router.go(0);
        }
        this.$router.push(val.tab_link).catch(() => {});
      } else if (val.tab_link == "/no") {
        this.$toast("该功能正在火爆内测中,敬请期待");
      } else if (val.tab_link == "/jump_link") {
        window.location.href = val.tab_href;
      }
    },
    // 是否显示添加面板
    addArticle() {
      localStorage.removeItem('selective');
      this.getTabbat();
      if (this.user.mmtid == 3) {
        this.show = true;
      } else {
        this.show = false;
        // this.$router.replace("/inviteBusinessmen");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.tabbar-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 999;
  .page-tabbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 4px 15px 4px 15px;
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .tab-icon {
        width: 23px;
        height: 23px;
        margin-bottom: 2px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tab-text {
        font-size: 10px;
      }
      .active-text {
        color: #07c062;
      }
      .add-class {
        position: relative;
        width: 35px;
        height: 35px;
        .add-icon {
          width: 35px;
          height: 35px;
          border-radius: 100%;
          padding: 0;
          margin: 0;
          position: absolute;
          margin-bottom: 0px;
          background: linear-gradient(
            180deg,
            rgba(7, 193, 96, 1) 0%,
            rgba(7, 193, 96, 1) 100%
          );
          font-size: 40px;
          box-shadow: 0px 0px 5px rgba(67, 208, 98, 0.274);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          align-content: center;
          margin-bottom: 10px;
          img {
            width: 57%;
            height: 57%;
          }
        }
      }
    }
  }
  .van-popup {
    // max-height: 50% !important;
    .operationClass {
      width: 100%;
      overflow: auto;
      .CutPanelClass {
        width: 50%;
        float: right;
        height: 66px;
        line-height: 66px;
        font-size: 16px;
        text-align: right;
        padding-right: 10px;
        span {
          float: right;
          display: block;
          height: 66px;
          line-height: 50px;
          margin-left: 10px;
        }
      }
      .close {
        float: left;
        width: 50%;
        height: 66px;
        line-height: 66px;
        font-size: 16px;
        padding-left: 20px;
      }
    }

    p {
      color: #d04443;
      margin-left: 20px;
      font-size: 24px;
    }
    .tittle {
      height: 78px;
      line-height: 78px;
      font-size: 18px;
      margin-left: 20px;
      font-weight: 500px;
    }
    .type_class {
      margin-top: 10px;
      box-sizing: border-box;
      padding: 10px 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      .type_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        width: 25%;
        .icon {
          width: 38px;
          height: 39px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .type_item_text {
          display: flex;
          justify-content: center;
          padding-top: 10px;
          text-align: center;
        }
        img {
          width: 50px;
          height: 45px;
        }
      }
      .type_item:nth-child(1) {
        .icon {
          width: 49px;
          height: 44.5px;
          margin-top: -7px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .type_item_text {
          width: 100%;
          text-align: center;
          padding-right: 3px;
        }
      }
    }
  }
}
</style>
