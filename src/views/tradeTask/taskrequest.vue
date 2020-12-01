<template>
  <div class="microsoft">
    <title-view title="我的任务">
      <span @click="cancelto">取消</span>
    </title-view>
    <div class="microsoft_cont">
      <div class="score" @click="userHandle(detailed.entid)">
        <div class="score_cont">
          <div class="score_cont_img">
            <img :src="detailed.ent_logo" />
          </div>
          <div class="score_cont_title">
            <div class="score_cont_name">{{ detailed.ent_name }}</div>
            <div class="number">
              <van-rate
                v-model="ent_grade"
                :size="13"
                readonly
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
              <span>{{ detailed.ent_grade }}.0</span>
            </div>
          </div>
        </div>
        <van-icon name="arrow" size="20" style="margin-top: 10px" />
      </div>
      <div class="microsoft_titleCont">
        <div class="microsoft_cont_title">{{ detailed.tl_name }}</div>
        <div class="microsoft_cont_remarks">{{ detailed.tl_content }}</div>
        <div class="informations">
          <div class="commission">
            <span>佣金：</span>
            <div class="commission_Price">￥{{ detailed.tl_commission }}</div>
          </div>
          <div class="numberic">
            <span>剩余数量：</span>
            <div class="numberic_cont">
              {{ detailed.tl_condition }}/{{ detailed.tl_num }}
            </div>
          </div>
        </div>
      </div>
      <div class="goods" v-if="detailed.tl_rel_type == 1">
        <div class="goods_img">
          <img
            :src="
              lingshishuju.gadv_img_path[0] !== ''
                ? lingshishuju.gadv_img_path[0]
                : ''
            "
          />
        </div>
        <div class="goods_cont">
          <div class="goods_cont_title">{{ lingshishuju.graphic_name }}</div>
          <div class="goods_cont_Price">
            <span>分享赚</span>
            <div class="Price">
              <span>￥</span>
              <div class="Price_cont">{{ detailed.tl_commission }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods" v-else>
        <div class="goods_img">
          <img
            :src="
              lingshishuju.pro_thumbnail !== ''
                ? lingshishuju.pro_thumbnail
                : ''
            "
          />
        </div>
        <div class="goods_cont">
          <div class="goods_cont_title">{{ lingshishuju.pro_name }}</div>
          <div class="goods_cont_Price">
            <span>分享赚</span>
            <div class="Price">
              <span>￥</span>
              <div class="Price_cont">{{ detailed.tl_commission }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="timeSlice">
        <div class="timeSlice_title">任务时间：</div>
        <div class="timeSlice_Task">
          <div class="startTime">{{ detailed.tl_starttime }}</div>
          <span>至</span>
          <div class="EndTime">{{ detailed.tl_endtime }}</div>
        </div>
      </div>
      <div class="NoteCount">
        <div class="NoteCount_title">备注：</div>
        <div class="NoteCount_cont">
          {{ detailed.tl_remark !== "" ? detailed.tl_remark : "暂无数据" }}
        </div>
      </div>
      <div
        v-if="
          this.yrtid == 2 &&
          detailed.tl_rel_type == 2 &&
          detailed.buy_list.length > 0
        "
      >
        <div class="buyErrorKey">
          <div class="buyErrorKey_title">成功购买人：</div>
          <div class="buyErrorKey_img">
            <img
              v-for="(bitem, bi) in detailed.buy_list"
              :key="bi"
              @click="goUser(bitem.mem_id)"
              :src="bitem.mem_head_portrait"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="Springhouse" v-if="this.yrtid == 2">
        <div class="defineKey" @click="purchasing">
          {{ detailed.tmr_state_name }}
        </div>
        <div
          class="modify"
          @click="PacmanModify"
          v-if="detailed.tmr_state == 0"
        >
          分享
        </div>
      </div>
      <div v-if="this.qihuanid == 1">
        <div class="missionState">
          <div class="missionState_title">任务条件：</div>
          <div class="missionState_cont">{{ detailed.tl_content }}</div>
        </div>
        <div class="substeps">
          <div class="substeps_title">任务步骤：</div>
          <div class="substeps_cont" style="margin-top: 8px">
            1. 需一人从分享链接或二维码购买此
          </div>
        </div>
        <div class="FileTask" @click="lingqu">领取任务</div>
      </div>
    </div>

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
  </div>
</template>

<script>
import titleView from "../../components/public_views/titleView";
import { missionType, myMissionType, forwardArticles } from "./actions/index";
import { wxJSSDK } from "@/utils/wxshare.js";
import { Toast } from "vant";
export default {
  components: {
    titleView,
  },
  data() {
    return {
      yrtid: this.$route.query.yrtid,
      qihuanid: this.$route.query.qihuanid,
      value: 3,
      detailed: "",
      ent_grade: "",
      lingshishuju: "",
      forwardMark: false,
    };
  },
  methods: {
    userHandle(id) {
      var obj = {
        entid: id,
        entfid: 0,
      };

      var res = this.$Utils.demoRequest(JSON.stringify(obj));
      this.$router.push({
        path: "/merchants/produce",
        query: { res: res },
      });
    },
    goUser(id) {
      this.$router.push({
        path: `/user/page/${id}`,
        query: { type: "u" },
      });
    },
    lingqu() {
      let aa = this.$route.query.id;
      this.$router.push({ path: "tupdate", query: { tlid: aa } });
    },
    cancelto() {
      this.$router.go(-1);
    },
    purchasing() {},
    PacmanModify() {

      let obj = {
        proid: this.detailed.tl_rel_id, //商品id
      };

      let ua = window.navigator.userAgent.toLowerCase();

      var forObj = {
        mem_forward_id:this.detailed.tl_rel_id
      };
      
      if(this.detailed.tl_rel_type == 1){
        forObj.mem_forward_class = 1; //广告任务
      }else if(this.detailed.tl_rel_type == 2){
        forObj.mem_forward_class = 2; //商品任务
      }

      let shopKey = this.$Utils.demoRequest(JSON.stringify(obj));

      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        forwardArticles(forObj).then((res) => {

          if (res.code == 100) {
            
            if (this.detailed.tl_rel_type == 2) {

              //2为商品  其他状态跳其他页面
              var linkInfo =
                "http://" +
                window.location.host +
                "/#/commdityPay?res=" +
                shopKey +
                "&taskKey=" +
                this.detailed.tmr_link;
            } else {

              var linkInfo =
                "http://" +
                window.location.host +
                "/#/article/detail/" +
                this.detailed.tl_rel_id +
                "&taskKey=" +
                this.detailed.tmr_link;
            }

            if (this.detailed.tast_rel_val.tl_rel_type == 1) {

              var form = {
                title: this.detailed.tast_rel_val.graphic_name,
                link: linkInfo,
                imgUrl: this.detailed.tast_rel_val.gadv_img_path[0],
                desc: this.detailed.tl_name,
              };
            } else {

              var form = {
                title: this.detailed.tast_rel_val.pro_name,
                link: linkInfo,
                imgUrl: this.detailed.tast_rel_val.pro_thumbnail,
                desc: this.detailed.tl_name,
              };
            }

            wxJSSDK(form);
            this.forwardMark = true;
            Toast("分享");
            setTimeout(() => {
              this.forwardMark = false;
            }, 4000);
          } else {
            Toast(res.msg);
          }
        });
      } else {
        Toast("请在微信中分享");
      }
    },
    missionTable() {
      if (this.qihuanid == 1) {
        let id = this.$route.query.id;
        missionType(id).then((val) => {
          this.detailed = val.data;
          this.ent_grade = val.data.ent_grade;
          this.lingshishuju = val.data.tast_rel_val;
        });
      } else if (this.yrtid == 2) {
        let aa = this.$route.query.tl_id;
        myMissionType(aa).then((val) => {
          this.detailed = val.data;
          this.ent_grade = val.data.ent_grade;
          this.lingshishuju = val.data.tast_rel_val;
        });
      }
    },
  },
  mounted() {
    this.missionTable();
  },
};
</script>

<style lang="less">
.microsoft {
  position: relative;
  width: 100%;
  height: auto;
  .microsoft_title {
    padding: 18px 10px;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 18px;
    .microsoft_title_text {
      width: 46vh;
    }
    .cancel {
      position: absolute;
      right: 4%;
      font-size: 13px;
      color: #6F6F6F;
    }
  }
  .microsoft_cont {
    width: 94%;
    height: 100%;
    margin: auto;
    padding-top: 20px;
    .score {
      widows: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #E1E1E1;
      padding-bottom: 20px;
      .score_cont {
        display: flex;
        .score_cont_img {
          width: 40px;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .score_cont_title {
          margin-left: 15px;
          .score_cont_name {
            text-align: left;
            font-size: 14px;
          }
          .van-rate {
            padding-top: 6px;
          }
          .number {
            text-align: left;
            span {
              font-size: 12px;
              color: #FABF50;
              margin-left: 8px;
            }
          }
        }
      }
    }
    .microsoft_titleCont {
      width: 100%;
      height: auto;
      border-bottom: 1px solid #E1E1E1;
      padding-bottom: 20px;
      margin-top: 25px;
      .microsoft_cont_title {
        font-size: 17px;
        font-weight: 600;
        text-align: left;
      }
      .microsoft_cont_remarks {
        font-size: 14px;
        text-align: left;
        margin-top: 5px;
      }
      .informations {
        width: 100%;
        height: auto;
        display: flex;
        margin-top: 15px;
        .commission {
          display: flex;
          span {
            font-size: 15px;
            line-height: 25px;
          }
          .commission_Price {
            // margin-left: 3px;
            color: #D04443;
            font-size: 20px;
            font-weight: 600;
          }
        }
        .numberic {
          display: flex;
          margin-left: 40px;
          span {
            font-size: 15px;
            line-height: 25px;
          }
          .numberic_cont {
            font-size: 15px;
            line-height: 25px;
          }
        }
      }
    }
    .goods {
      margin-top: 30px;
      display: flex;
      border-bottom: 1px solid #E1E1E1;
      padding-bottom: 25px;
      .goods_img {
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods_cont {
        height: 70px;
        margin-left: 20px;
        .goods_cont_title {
          font-size: 15px;
          font-weight: 600;
          height: 52px;
          text-align: left;
        }
        .goods_cont_Price {
          display: flex;
          span {
            font-size: 14px;
          }
          .Price {
            display: flex;
            margin-left: 5px;
            span {
              font-size: 12px;
              color: #DB1043;
              line-height: 23px;
            }
            .Price_cont {
              font-size: 17px;
              color: #DB1043;
            }
          }
        }
      }
    }
    .timeSlice {
      margin-top: 30px;
      .timeSlice_title {
        font-size: 17px;
        text-align: left;
        font-weight: 600;
      }
      .timeSlice_Task {
        display: flex;
        margin-top: 12px;
        .startTime {
          font-size: 14px;
          line-height: 21px;
        }
        span {
          font-size: 14px;
          margin-left: 15px;
        }
        .EndTime {
          font-size: 14px;
          line-height: 21px;
          margin-left: 15px;
        }
      }
    }
    .NoteCount {
      margin-top: 30px;
      .NoteCount_title {
        font-size: 17px;
        text-align: left;
        font-weight: 600;
      }
      .NoteCount_cont {
        font-size: 14px;
        text-align: left;
        margin-top: 10px;
      }
    }
    .buyErrorKey {
      margin-top: 30px;
      .buyErrorKey_title {
        font-size: 17px;
        text-align: left;
        font-weight: 600;
      }
      .buyErrorKey_img {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        img {
          width: 40px;
          height: 40px;
          padding: 2px;
          border-radius: 100%;
        }
      }
    }
    .Springhouse {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      text-align: center;
      .defineKey {
        width: 52%;
        height: 40px;
        border: 1px solid #D04443;
        color: #D04443;
        line-height: 40px;
        border-radius: 3px;
      }
      .modify {
        width: 44%;
        height: 40px;
        color: #fff;
        background: #D04443;
        line-height: 40px;
        border: 1px solid #D04443;
        border-radius: 3px;
      }
    }
    .missionState {
      margin-top: 20px;
      .missionState_title {
        font-size: 17px;
        text-align: left;
        font-weight: 600;
      }
      .missionState_cont {
        margin-top: 6px;
      }
    }
    .substeps {
      margin-top: 20px;
      .substeps_title {
        font-size: 17px;
        text-align: left;
        font-weight: 600;
      }
    }
    .FileTask {
      width: 100%;
      height: 40px;
      color: #fff;
      background: #D04443;
      text-align: center;
      line-height: 40px;
      margin-top: 35px;
      margin-bottom: 5px;
      font-size: 16px;
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
}
</style>
