<template>
  <div class="common">
    <div class="header">
      <div class="head">
        <img src="./img1/定位.png" alt class="i1" />
        <p class="name">五原 ></p>
        <p class="title">城事乐家助力地方实体 ></p>
        <img src="./img1/01987a5d837c0fa8012060bef252eb.png" alt class="i2" />
        <p class="number">5</p>
      </div>
      <div class="content">
        <div class="inp">
          <img src="./img1/搜索.png" />
          <input type="text" placeholder="服务 行业信息 装修" />
        </div>
        <div class="tiao">
          <p style="color:#D04442">关注</p>
          <p>推荐</p>
          <p>短视频</p>
          <p>视频</p>
          <p>中介</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.common {
  .header {
    width: 100%;
    height: 4rem;
    background-color: #d04443;
    position: relative;
    .head {
      p {
        color: #ffffff;
      }
      .i1 {
        width: 0.4rem;
        margin: 0.5rem 0rem 0rem 0.5rem;
      }
      .name {
        display: inline-block;
        font-size: 0.4rem;
        font-weight: 500;
        margin-left: 0.1rem;
      }
      .title {
        display: inline-block;
        font-size: 0.5rem;
        font-family: FZCuHeiSongS-B-GB;
        font-weight: 400;
        margin-left: 0.3rem;
      }
      .i2 {
        width: 1rem;
        position: absolute;
        right: 0.4rem;
        top: 0.2rem;
      }
      .number{
          width: 0.5rem;
          border-radius: 50%;
          color: #D04443;
          background-color: #ffffff;
          text-align: center;
          position: absolute;
          right:0.2rem;
          top:0.1rem;
      }
    }
    .content {
      width: 90%;
      background-color: #ffffff;
      margin: 0.4rem 0rem 0rem 0.45rem;
      border-radius: 0.1rem;
      .inp {
        width: 90%;
        height: 1rem;
        border: 1px solid #d04443;
        position: relative;
        border-radius: 1rem;
        display: inline-block;
        margin: 0.5rem 0rem 0rem 0.5rem;
        img {
          width: 0.7rem;
          margin: 0.1rem 0rem 0rem 0.3rem;
        }
        input {
          width: 80%;
          height: 0.7rem;
          position: absolute;
          top: 0.1rem;
          border: none;
          outline: none;
        }
      }
      .tiao {
        display: flex;
        justify-content: space-around;
        margin-left: 0.5rem;
        margin-top: 0.3rem;
        width: 90%;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 0.1rem;
        p {
          font-size: 0.4rem;
          color: #202020;
          font-weight: 500;
        }
        img {
          width: 1rem;
          height: 0.5rem;
        }
      }
    }
  }
}
</style>