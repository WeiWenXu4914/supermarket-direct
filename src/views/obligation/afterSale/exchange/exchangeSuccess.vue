<template>
  <div class="only">
    <div class="header">
      <title-view title="换货详情" :border="false"></title-view>
      <div class="content">
        <p class="agree">商家同意换货，请处理</p>
        <div class="list">
          <p class="p1">剩</p>
          <p class="p2">{{ timer.Hours }}</p>
          <p class="p1">小时</p>
          <p class="p2">{{ timer.Minutes }}</p>
          <p class="p1">分钟</p>
        </div>
      </div>
      <div class="step">
        <p class="up">换货步骤</p>
        <div class="down">
          <p class="p1">1.寄出</p>
          <p class="p2"></p>
          <p class="p3">2.及时填写换货信息</p>
        </div>
      </div>
      <div class="adress">
        <div class="tem">
          <p class="p1" style="margin-top:0.5rem">退货地址：</p>
          <p class="p2" style="margin-top:0.5rem">
              {{dataList.site.province}} {{dataList.site.city}} {{dataList.site.district}} {{dataList.site.detailed_site}}
          </p>
        </div>
        <div class="tem">
          <p class="p1">收件人：</p>
          <p class="p3">{{ dataList.site.contact_name }}</p>
        </div>
        <div class="tem">
          <p class="p1">联系电话：</p>
          <p class="p2">接口需添加</p>
        </div>
      </div>
      <div class="time">
        <div class="tem">
          <p class="p1">售后类型：换货</p>
          <p class="line"></p>
        </div>
        <div class="tem">
          <p class="p1">申请原因：{{ dataList.reason }}</p>
          <p>申请说明：{{ dataList.description }}</p>
          <p>订单编号：{{ dataList.order_sn }}</p>
          <p>申请时间：{{ dataList.create_time }}</p>
        </div>
      </div>
    </div>
    <div class="history" @click="toHistory">
      <p class="p1">协商历史</p>
      <p class="p2">></p>
    </div>

    <picture-component :imgList="dataList.proof_pics" v-if="imgShow"></picture-component>
    <div class="bottom">
        <p class="biao">退款商品</p>
        <div class="model">
            <div class="left">
                <img :src="dataList.pro_thumbnail" alt />
            </div>
            <div class="center">
                <p class="p1">{{ dataList.pro_name }}</p>
                <p class="p3">￥{{ dataList.pro_price }}</p>
            </div>
                <div class="right">
                <button>物流配送</button>
                <p class="p2">x{{ dataList.product_count }}</p>
            </div>
        </div>
    </div>
    <div class="btn">
      <button class="b2" @click="revoke">撤销申请</button>
      <button class="b3" @click="toFill">填写换货物流</button>
    </div>
  </div>
</template>

<script>
import titleView from '../../../../components/public_views/titleView';
import pictureComponent from '../../components/pictureComponent';
import { myAfterSalesServiceDetail } from '../../actions/index';
import { Toast,Button } from 'vant';
export default {
    components: {
        titleView,
        pictureComponent
    },
    data() {
        return {
            dataList: [],
            timer: {},
            imgShow: false
        }
    },
    beforeCreate() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            overlay: true,
            duration: 0,

        });
    },
    created() {
        //获取详情数据
        myAfterSalesServiceDetail(this.$route.query.ora_id,this.$route.query.type)
        .then((res) => {
            this.dataList = res.data;
            this.imgShow = true;
            //获取剩余时间
            let dateNow =  this.getDate()
            this.timer = this.compareTime(dateNow,this.dataList.end_time);
            console.log(this.dataList)
            Toast.loading({
                duration: 1
            });
        })

    },
    methods: {
        toFill() {
            this.$router.push({
                path: '/zz_fill',
                query: {
                    ora_id: this.dataList.ora_id,
                    tracking: this.dataList.order_sn
                }
            })
        },
        revoke() {
            withdrawApplication(this.dataList.ora_id)
            .then((res) => {
                if(res.code == 100) {
                    Toast.success("撤销成功");
                    this.$router.push('/');
                }
            })
        },
        toHistory() {//协商历史
            this.$router.push({
                path: '/conmunicationHistory',
                query: {
                    o_id: this.dataList.o_id
                }
            })
        },
        compareTime (start,end) {
            let startTime = start;
            let endTime = end;
            startTime = this.stringToDate(startTime)
            endTime = this.stringToDate(endTime)
            var retValue = {}
            
            var compareTime = endTime - startTime  // 时间差的毫秒数
            // 计算出相差天数
            var days = Math.floor(compareTime / (24 * 3600 * 1000))
            retValue.Days = days
        
            // 计算出相差年数
            var years = Math.floor(days / 365)
            retValue.Years = years
        
            // 计算出相差月数
            var months = Math.floor(days / 30)
            retValue.Months = months
        
            // 计算出小时数
            var leaveHours = compareTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
            var hours = Math.floor(leaveHours / (3600 * 1000))
            retValue.Hours = hours
        
            // 计算相差分钟数
            var leaveMinutes = leaveHours % (3600 * 1000) // 计算小时数后剩余的毫秒数
            var minutes = Math.floor(leaveMinutes / (60 * 1000))
            retValue.Minutes = minutes
        
            // 计算相差秒数
            var leaveSeconds = leaveMinutes % (60 * 1000) // 计算分钟数后剩余的毫秒数
            var seconds = Math.round(leaveSeconds / 1000)
            retValue.Seconds = seconds
        
            var resultSeconds = 0
                if (years >= 1) {
                    resultSeconds = resultSeconds + years * 365 * 24 * 60 * 60
                }
                if (months >= 1) {
                    resultSeconds = resultSeconds + months * 30 * 24 * 60 * 60
                }
                if (days >= 1) {
                    resultSeconds = resultSeconds + days * 24 * 60 * 60
                }
                if (hours >= 1) {
                    resultSeconds = resultSeconds + hours * 60 * 60
                }
                if (minutes >= 1) {
                    resultSeconds = resultSeconds + minutes * 60
                }
                if (seconds >= 1) {
                    resultSeconds = resultSeconds + seconds
                }
                retValue.resultSeconds = resultSeconds
                return retValue
            },
            //转日期格式
            stringToDate(str){

            var tempStrs = str.split(" ");

            var dateStrs = tempStrs[0].split("-");

            var year = parseInt(dateStrs[0], 10);

            var month = parseInt(dateStrs[1], 10) - 1;

            var day = parseInt(dateStrs[2], 10);

            var timeStrs = tempStrs[1].split(":");

            var hour = parseInt(timeStrs [0], 10);

            var minute = parseInt(timeStrs[1], 10);

            var second = parseInt(timeStrs[2], 10);

            var date = new Date(year, month, day, hour, minute, second);

            return date;
        },
        //获取当前时间
        getDate() {
            let date = new Date();
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds(); 
            return Y+M+D+h+m+s;
        }
    }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.only {
  background-color: #f7f7f7;
  .header {
    background-color: #ffffff;
    padding-bottom: 0.3rem;
    .top {
      display: flex;
      margin-top: 0.5rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.1rem 0rem 0rem 0.3rem;
      }
      .p1 {
        margin-left: 3rem;
        color: #2f2f2f;
        font-size: 0.5rem;
        font-weight: 500;
        font-family: Source Han Sans CN;
      }
    }
    .content {
      margin: 1rem 0rem 0rem 0.5rem;
      .agree {
        color: #2f2f2f;
        font-size: 0.45rem;
        font-weight: bold;
      }
      .list {
        display: flex;
        .p1 {
          color: #2f2f2f;
          font-size: 0.45rem;
          margin-left: 0.1rem;
          font-weight: 500;
        }
        .p2 {
          color: #d04443;
          font-size: 0.45rem;
          margin-left: 0.2rem;
          font-weight: bold;
        }
      }
    }
    .step {
      background-color: #fdf5f5;
      width: 90%;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      padding-bottom: 0.4rem;
      .up {
        color: #474747;
        font-size: 0.43rem;
        margin: 0rem 0rem 0rem 0.5rem;
        padding: 0.2rem 0rem 0rem 0rem;
      }
      .down {
        display: flex;
        margin: 0.2rem 0rem 0rem 0.5rem;
        .p1 {
          color: #2f2f2f;
          font-size: 0.4rem;
        }
        .p2 {
          width: 2rem;
          height: 1px;
          background-color: #707070;
          margin: 0.3rem 0rem 0rem 0.2rem;
        }
        .p3 {
          color: #2f2f2f;
          font-size: 0.4rem;
          margin-left: 0.2rem;
        }
      }
    }
    .adress {
      background-color: #fdf5f5;
      width: 90%;
      margin: 0.5rem 0rem 0rem 0.5rem;
      border-radius: 0.1rem;
      padding-bottom: 0.5rem;

      .tem {
        display: flex;
        .p1 {
          color: #474747;
          font-size: 0.43rem;
          margin: 0.3rem 0rem 0rem 0.5rem;
        }
        .p2 {
          width: 60%;
          font-size: 0.4rem;
          color: #474747;
          margin: 0.3rem 0rem 0rem 0.1rem;
        }
        .p3 {
          width: 60%;
          font-size: 0.4rem;
          color: #474747;
          margin: 0.3rem 0rem 0rem 0.5rem;
        }
      }
    }
    .time {
      width: 100%;
      background-color: #ffffff;
      margin-top: 0.3rem;
      padding-bottom: 0.5rem;
      .up {
        .u1 {
          display: flex;
          color: #212121;
          .left {
            margin: 0.5rem 0rem 0rem 0.5rem;
            .p1 {
              font-size: 0.4rem;
            }
          }
          .right {
            margin-top: 0.3rem;
            .p1 {
              font-size: 0.4rem;
              color: #212121;
            }
            .p2 {
              color: #848484;
            }
          }
        }
        .line {
          width: 75%;
          height: 1px;
          background-color: #e5e5e5;
          margin: 0.7rem 0rem 0rem 2.5rem;
        }
      }
      .tem {
        position: relative;
        p {
          margin: 0rem 0rem 0rem 0.5rem;
          color: #212121;
          font-family: Source Han Sans CN;
          font-weight: 400;
          font-size: 0.4rem;
        }
        .p1 {
          padding-top: 0.5rem;
        }
        .line {
          width: 75%;
          height: 1px;
          background-color: #e5e5e5;
          margin: 0.7rem 0rem 0rem 2.5rem;
        }
        .p3 {
          margin: 0.3rem 0rem 0rem 0.5rem;
        }
        .wechat {
          position: absolute;
          right: 0.3rem;
          top: 1.2rem;
          color: #d04443;
        }
      }
    }
  }

  .history {
    display: flex;
    background-color: #ffffff;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    padding-bottom: 0.6rem;
    .p1 {
      color: #212121;
      font-size: 0.45rem;
      margin: 0.5rem 0rem 0rem 0.5rem;
    }
    .p2 {
      color: #717171;
      margin: 0.5rem 0rem 0rem 7rem;
      font-size: 0.45rem;
    }
  }
  .history2 {
    background-color: #ffffff;
    margin-top: 0.3rem;
    padding-bottom: 0.6rem;
    .p1 {
      color: #212121;
      font-size: 0.45rem;
      margin: 0.5rem 0rem 0rem 0.5rem;
      padding-top: 0.5rem;
    }
    .photo {
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-around;
      img {
        width: 2.1rem;
        height: 2.1rem;
      }
    }
  }
  .bottom {
    background-color: #ffffff;
    margin: 0.3rem 0rem 0rem 0rem;
    padding-bottom: 0.5rem;
    .biao {
      font-size: 0.38rem;
      color: #212121;
      margin: 0.3rem 0rem 0rem 0.5rem;
      padding-top: 0.5rem;
    }
    .model {
      display: flex;
      margin: 0.5rem 0rem 0rem 0.5rem;
      .left {
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .center {
        position: relative;
        margin-left: 0.3rem;
        .p1 {
          width: 175px; 
          font-size: 0.4rem;
          font-family: Source Han Sans CN;      
          font-weight: 500;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .p3 {
          position: absolute;
          bottom: 0;
          color: #db1043;
          display: inline-block;
          font-size: 0.5rem;
          font-weight: bold;
        }
      }
      .right {
        flex: 1;
        text-align: right;
        padding-right: 5%;
        width: 30%;
        button {
          color: #ffffff;
          border: none;
          outline: none;
          background-color: #d04443;
          border-radius: 0.1rem;
          width: 1.7rem;
        }
        .p2 {
          font-size: 0.5rem;
          margin: 0.8rem 0rem 0rem 1.2rem;
        }
      }
    }
  }
  .btn {
    background-color: #ffffff;
    padding: 0.3rem 0rem 0.3rem 0rem;
    button {
      border: none;
      outline: none;
      height: 1rem;
      border-radius: 0.1rem;
    }
    .b2 {
      color: #d04443;
      border: 1px solid #d04443;
      background-color: #ffffff;
      width: 2rem;
      margin-left: 4.4rem;
    }
    .b3 {
      color: #ffffff;
      background-color: #d04443;
      width: 3rem;
      margin-left: 0.2rem;
    }
  }
}
</style>