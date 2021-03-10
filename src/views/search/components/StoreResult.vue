<template>
    <div>
        <div
            class="item"
            v-for="(val, inx) in resultList"
            :key="inx"
            @click="userHandle(val.entid)"
        >
            <div class="img">
                <img :src="val.ent_logo" alt v-if="val.ent_name" />
            </div>
            <div class="center">
                <div class="title">
                    <div class="name">
                        {{ val.ent_name }}
                    </div>
                    <div class="msg">
                        {{ val.ent_detailed_site }}
                    <span>|</span>
                        {{ val.ent_remark }}
                    </div>
                    <div class="star">
                        <div class="star-rate">
                            <van-rate
                            v-model="val.ent_grade"
                            :size="20"
                            color="#ffd21e"
                            void-icon="star"
                            void-color="#eee"
                            readonly
                            />
                        </div>
                        <div class="score">{{ val.ent_grade }}.0</div>
                    </div>
                </div>
            
            </div>
            <div class="right">
                <div>进店</div>
            </div>
        </div>
        <van-empty image="search" description="无相关内容，请切换搜索关键词试试" v-if="resultList.length == 0 && !loading"/>

        <van-loading color="#1989fa" vertical style="position:absolute;top:5rem;left:50%;transform:translateX(-50%);" v-show="loading"/>
    </div>
</template>

<script>
import { phoneSearch } from '../actions';
import { Toast, Empty } from 'vant';
export default {
    props: ['searchValue','active3'],
    data() {
        return {
            resultList: [],
            prvUrl: '',
            loading: false,
        }
    },
    watch: {
        'searchValue': function () {
            if(this.active3 == 2) {
                this.getData();
            }
        },
        'active3': function () {
            if(this.active3 == 2) {
                this.getData();
            }
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {

            if(this.searchValue != "") {
                this.loading = true;
                phoneSearch(this.searchValue)
                .then((res) => {
                    if(res.code == 100) {
                        this.resultList = res.data.list;
                        this.prvUrl = res.data.prvUrl;
                    } else {
                        // Toast(res.msg);
                        this.resultList = res.data.list;
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                })
            } else {
                
            }
            
        },
        // 去企业首页
        userHandle(id) {
            var obj = {
                entid: id,
                entfid: this.prvUrl.entfid,
            };

            var res = this.$Utils.demoRequest(JSON.stringify(obj));

            this.$router.push({
                path: this.prvUrl.href,
                query: { res: res },
            });
        },
    },
}
</script>

<style lang="less" scoped>
.item {
  padding: 20px 0;
  margin: 0 10px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  .img {
    height: 55px;
    width: 55px;
    margin-right: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .center {
    .title {
      display: flex;
      flex-direction: column;
      height: 55px;
      justify-content: space-between;
    }
    .name {
      font-size: 15px;
      height: 15px;
      line-height: 15px;
      font-family: Source Han Sans CN;
      font-weight: 700;
      color: rgba(33, 33, 33, 1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        display: inline-block;
        width: 38px;
        height: 15px;
        padding: 0;
        text-align: center;
        img {
          height: 100%;
          width: 100%;
          vertical-align: -2px;
        }
      }
    }

    .msg {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 21px;
      color: rgba(61, 61, 61, 1);
      opacity: 1;
      span {
        margin: 0 5px;
      }
    }
    .star {
      display: flex;
      div {
        width: 15px;
        height: 25px;
        border-radius: 1px;
        margin-right: 5px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .star-rate {
        width: 110px;
      }
      .score {
        width: 20px;
        height: 25px;
        font-size: 13px;
        font-family: Avenir;
        font-weight: 500;
        line-height: 26px;
        color: rgba(250, 191, 80, 1);
        opacity: 1;
        margin-left: 10px;
      }
      .huang {
        background: rgba(250, 191, 80, 1);
      }
      .hui {
        background: rgba(229, 229, 229, 1);
      }
    }
    .act {
      margin-top: 20px;
      .tuan {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 21px;
        color: rgba(90, 90, 90, 1);
        opacity: 1;
        span {
          display: inline-block;
          width: 15px;
          height: 15px;
          margin-right: 6px;
          background: linear-gradient(
            90deg,
            rgba(255, 108, 80, 1) 0%,
            rgba(245, 23, 36, 1) 100%
          );
          opacity: 1;
          border-radius: 2px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 15px;
          text-align: center;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    div {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(233, 60, 59, 1);
      opacity: 1;
      border-radius: 2px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      line-height: 36px;
      text-align: center;
      color: rgba(233, 60, 59, 1);
    }
  }
}
</style>