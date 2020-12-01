<template>
  <div class="contacts">
    <div class="header">
      <van-nav-bar
          title="消息通知"
          left-arrow
          @click-left="goBack"
      />
    </div>
    <!--        <div class="current-user">-->
    <!--            <img :src="currentUser.avatar" class="current-user__avatar">-->
    <!--            <span>{{currentUser.name}}</span>-->
    <!--        </div>-->
    <!--  无聊天item  -->
    <div v-show="JSON.stringify(this.friends)=='{}'&&JSON.stringify(this.groups)=='{}'" class="noinfo">暂时没有聊天信息哦，快去客户管理创建商家群吧~</div>
    <!--  有聊天item  -->
    <div class="contacts-container">
      <div class="user-list">
        <div class="user-list-item" v-for="(friend, key) in friends || []" :key="key" @click="enterChat(friend)">
          <div class="user-item-avatar">
            <img :src="friend.avatar" :class="friend.online ? '' : 'offline-gray'"/>
            <img src="/images/green-dot.png" class="online-dot" v-if="friend.online">
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ friend.name }}</span>
            <span class="user-item-info__tips" v-show="friend.unReadMessage">{{ friend.unReadMessage }}</span>
          </div>
        </div>
      </div>
      <div class="user-list">
        <div class="user-list-item" v-for="(group, key) in groups || []" :key="key" @click="enterGroup(group)">
          <div class="user-item-avatar">
            <img src="/images/group.png"/>
          </div>
          <div class="user-item-info">
            <span class="user-item-info__name">{{ group.name }}</span>
            <span class="user-item-info__tips" v-show="group.unReadMessage">{{ group.unReadMessage }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserChatInfo ,} from '@/api/im'
import {Toast} from 'vant'

export default {
  name: "contacts",
  data() {
    return {
      friends: null,
      groups: null,
      currentUser: null
    }
  },
  beforeMount() {
    //登陆并获取数据
    this.getChatInfo()
  },
  methods: {
    enterChat(friend) {//进入私聊
      this.$router.push({
        name: 'privateChat',
        query: friend
      })
    },
    enterGroup(group) {//进入群聊
      this.$router.push({
        name: 'groupChat',
        query: group
      })
    },
    //返回
    goBack() {
      this.$router.push("/home");
    },
    //获取当前用户聊天信息并登陆
    getChatInfo() {
      //初始化列表
      this.currentUser = this.imService.currentUser;
      this.friends = this.imService.friends;
      this.groups = this.imService.groups;
      console.log(this.currentUser,'+++111111')
      console.log(this.friends,'+++222222')
      console.log(this.groups,'+++33333')
    }
  }
}
</script>

<style scoped src="../assets/style/contacts.css"></style>
<style scoped src="../assets/style/common.css"></style>