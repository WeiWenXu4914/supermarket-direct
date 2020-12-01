<template>
  <div class="member-layer" v-if="show">
    <div class="header">
      <span class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" />
      </span>
      群成员({{ Object.keys(members).length }})
    </div>
    <div class="member" >
      <div class="nav" v-for="(member, key) in members" :key="key">
        <img :src="member.avatar"
             class="group-member__item"

             ref="member"
        >
        <span>{{member.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Members",
  props: ['members'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    showMemberLayer() {
      this.show = true;
    },
    goBack() {
      this.show = false;
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  .header {
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    z-index: 1000;
  }

  .back-btn {
    left: 10px;
  }

  .member {
    margin-top: 50px;
    padding: 10px;
    height: auto;
  }

  .nav{
    display: inline-block;
    height: auto;
    width: 48px;
    margin: 10px;
  }

  .group-member__item {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
<style scoped src="../../assets/style/common.css"></style>