<!--首页分类标签编辑-->
<template>
  <van-action-sheet
    ref="action"
    :value="value"
    round
    @input="$emit('input', $event)"
    @closed="closeHandeler"
  >
    <div class="channel">
      <div class="div" @click="$refs.action.close()">
        <van-icon name="cross" class="close" />
      </div>
      <div class="tit">
        <span>我的频道：</span>
        <van-button v-if="!editing" @click="editing = true" size="small" plain
          >编辑</van-button
        >
        <van-button
          v-else
          @click="editingOK"
          size="small"
          type="danger"
          plain
          >完成</van-button
        >
      </div>
      <draggable
        v-model="checked"
        group="people"
        :disabled="!editing"
        @start="drag = true"
        @end="drag = false"
        class="nav-draggable"
      >
        <div class="nav-draggable-item" v-for="item in checked" :key="item.nav_id">
          <span class="icon" v-if="editing" @click="delChannel(item.nid)">
            <van-icon name="cross" size="11px" />
          </span>
          <div class="nav-draggable-btn">
            <span v-if="!editing"> {{ item.nav_name }}</span>
            <input type="text" v-model="item.nav_name" v-else />
          </div>
        </div>
      </draggable>

      <!-- <div class="nav-box">
        <div class="nav-item_m" v-for="item in checked" :key="item.nav_id">
          <span class="icon" v-if="editing" @click="delChannel(item.nid)">
            <van-icon name="cross" />
          </span>
          <span>{{ item.nav_name }}</span>
        </div>
      </div> -->
    </div>
    <div class="channel">
      <div class="tit">频道推荐：</div>
      <div class="nav-box">
        <div
          class="nav-item"
          v-for="item in unchecked"
          :key="item.id"
          @click="addChannel(item.nid)"
        >
          <van-icon name="plus" />
          <span style="margin-left: 3px">{{ item.nav_name }}</span>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>

<script>
import { myNav, myNavDel, myNavAdd, myNavSort } from "../api/channel";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  props: {
    // 控制显示隐藏
    value: {
      type: Boolean,
      default: false,
    },
    // 频道激活的索引
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 默认是未编辑状态
      editing: false,
      // 全部频道
      unchecked: [],
      checked: [],
    };
  },
  computed: {},
  created() {
    // 获取全部频道
    this.getMyNav();
  },
  methods: {
    async editingOK() {
      const data = await myNavSort(this.checked);
      this.closeHandeler();
    },
    async getMyNav() {
      const data = await myNav();
      this.checked = data.data.checked;
      this.unchecked = data.data.unchecked;
    },
    async delChannel(nid) {
      try {
        const data = await myNavDel({ nid: nid });
        if (data.code === 100) {
          this.$toast.success("删除成功");
          this.getMyNav();
        } else {
          this.$toast.fail("删除失败，请稍后再试");
        }
      } catch (error) {
        throw error;
      }
    },
    async addChannel(nid) {
      try {
        const data = await myNavAdd({ nid: nid });
        if (data.code === 100) {
          this.$toast.success("添加成功");
          this.getMyNav();
        } else {
          this.$toast.fail("添加失败，请稍后再试");
        }
      } catch (error) {
        throw error;
      }
    },
    //关闭编辑界面的回调
    closeHandeler() {
      this.editing = false;
      this.$emit("closeEditHandeler");
    },
  },
};
</script>

<style scoped lang='less'>
.div {
  width: 100%;
  height: 60px;
  position: relative;
  .close {
    position: absolute;
    top: 7px;
    font-size: 26px;
  }
}
.van-action-sheet {
  min-height: 90vh;
  height: auto;
  .van-action-sheet__header {
    background: #D04443;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
.channel {
  padding: 10px;
  .nav-box {
    margin-top: 15px;
    display: flex;
    padding: 0 15px;
    flex-wrap: wrap;
    .nav-item {
      height: 28px;
      padding: 0 12px;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      font-size: 12px;
      color: #1C1C1C;
      margin: 0 10px 10px 0;
    }
    .nav-item_m {
      position: relative;
      height: 29px;
      display: flex;
      padding: 0 9px;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      background: rgba(244, 244, 244, 1);
      font-size: 14px;
      margin: 0 15px 15px 0;
      color: #1C1C1C;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -6px;
        right: -6px;
        font-size: 11px;
        padding: 1px;
        border-radius: 100%;
        background: #eee;
      }
    }
  }
  .backgroundGrid {
    /deep/ .van-grid-item__content {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      background: rgba(244, 244, 244, 1);
      font-size: 14px;
      margin: 4px 0;
      color: #1C1C1C;
    }
  }
  .tit {
    font-size: 19px;
    font-weight: 500;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button {
      border-radius: 20px;
      font-size: 13px;
    }
    .tip {
      font-size: 13px;
      color: #999;
    }
  }
  .van-button {
    float: right;
    margin-top: 7px;
  }
  .btn {
    position: absolute;
    top: -4px;
    right: 6px;
    background: #ddd;
    font-size: 12px;
    color: #fff;
    border-radius: 10px;
  }
  .f12 {
    font-size: 12px;
    color: #555;
  }
  .nav-draggable {
    width: 100%;
    display: flex;
    align-content: stretch;
    flex-wrap:wrap;
    margin-top: 10px;
    .nav-draggable-item {
      margin: 5px 5px 15px 5px;
      position: relative;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: -10px;
        right: -5px;
        padding: 2px;
        color: #111;
        background: #F4F4F4;
        border-radius: 100%;
        z-index: 1;
      }
      span {
        font-size: 14px;
        color: #1C1C1C;
      }
      .nav-draggable-btn {
        background: #F4F4F4;
        width: 75px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        input {
          text-align: center;
          width: 100%;
          border: none;
          background: #F4F4F4;
        }
      }
    }
  }
}
</style>
