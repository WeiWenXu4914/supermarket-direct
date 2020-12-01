<template>
  <div class="chatInterface" style=" height: 95%;">
    <div class="header">
      <div class="titel" style=" padding: 18px 10px;
                display: flex;
                align-items: center;
                font-size: 18px;">
        <van-icon name="arrow-left" @click="navigateBack"/>
        <div class="title_text" style="width: 50vh;">{{ friend.name }}</div>
      </div>
    </div>
    <div class="chat-scroll-container">
      <div ref="myScroll" class="scroll-view">
        <div :class="[allHistoryLoaded ?'top gray': 'top']" @click="loadMoreHistoryMessage">
          <span>{{ allHistoryLoaded ? '已经没有更多的历史消息' : '点击加载更多历史消息' }}</span>
        </div>
        <div v-for="(message, key) in messages || []"
             :key="key+'message'"
             :class="[message.senderId == currentUser.uuid ? 'self message-item' : 'message-item']">
          <div :class="friend.online ? 'avatar' : 'avatar offline-gray'"
               v-if="message.senderId != currentUser.uuid">
            <img :src="friend.avatar">
          </div>
          <div class="avatar" v-else>
            <img :src="currentUser.avatar">
          </div>
          <div class="content">
            <span class="text-content" v-if="message.type =='text'">{{ message.payload.text }}</span>
            <img v-if="message.type == 'image'" :src="message.payload.url" @click="showImageFullScreen(message)"
                 @load="scrollToBottom">
            <GoEasyVideoPlayer v-if="message.type == 'video'" :video="message.payload.video"
                               :thumbnail="message.payload.thumbnail" @onLoadEnd="scrollToBottom"/>
            <GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url"
                               :duration="message.payload.duration"/>
          </div>
        </div>
        <div v-for="(message, key) in pendingMessages || []"
             :key="key+'pending'"
             :class="[message.senderId == currentUser.uuid ? 'self message-item' : 'message-item']">
          <div :class="friend.online ? 'avatar' : 'avatar offline-gray'"
               v-if="message.senderId != currentUser.uuid">
            <img :src="friend.avatar">
          </div>
          <div class="avatar" v-else>
            <img :src="currentUser.avatar">
          </div>
          <div class="content">
            <b class="pending"></b>
            <span v-if="message.type =='text'">{{ message.payload.text }}</span>
            <img v-if="message.type == 'image'" :src="message.payload.url" @load="scrollToBottom">
            <div v-if="message.type == 'video'" class="video-snapshot">
              <!--                            <img :src="message.payload.thumbnail.url" @load="onLoadEnd">-->
              <video :src="message.payload.video.url"></video>
              <div class="icon"></div>
            </div>
            <GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url"
                               :duration="message.payload.duration"/>
          </div>
        </div>
      </div>
    </div>
    <div class="action-box">
      <div class="action-top">
        <div :class="[audioVisible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard" ></div>
        <GoEasyRecorder @onComplete="onRecordComplete" v-if="audioVisible"
            style=" padding: 9px 0px;
              height: 17px;
              line-height: 25px;
              border-radius: 6px;
              font-size: 15px;
              background: #cccccc;
              color: #ffffff;
              text-align: center;"
        />
        <div class="message-input"  v-else>
          <input type="text" placeholder="发送消息" v-model="content">
        </div>
        <div class="file-icon img-video">
          <input type="file" @change="sendImageAndVideo" ref="mediaInput">
        </div>
        <span class="send-message-btn" @click="sendMessage">发送</span>
      </div>
      <div class="action-bottom" v-if="false"></div>
    </div>
    <div class="img-layer" @click="image.show = false" v-show="image.show">
      <img :src="image.url">
    </div>
  </div>
</template>

<script>
import GoEasyVideoPlayer from "../components/GoEasyVideoPlayer/GoEasyVideoPlayer";
import GoEasyRecorder from "../components/GoEasyRecorder/GoEasyRecorder";
import GoEasyAudioPlayer from "../components/GoEasyAudioPlayer/GoEasyAudioPlayer";

export default {
  name: "private",
  components: {
    GoEasyVideoPlayer,
    GoEasyRecorder,
    GoEasyAudioPlayer
  },
  data() {
    return {
      content: '',
      friend: null,
      currentUser: null,
      messages: [],
      pendingMessages: [],
      allHistoryLoaded: false,

      audioVisible: false,
      image: {
        show: false,
        url: ''
      }
    }
  },
  watch: {
    pendingMessages(val,newval) {
      console.log('val',val)
      console.log('newva',newval)
      this.scrollToBottom()
    }
  },
  beforeMount() {
    //对话数据
    this.friend = this.$route.query;
    this.currentUser = this.imService.currentUser;
    let privateMessages = this.imService.getPrivateMessages(this.friend.uuid);
    this.messages = privateMessages.sentMessages;
    this.pendingMessages = privateMessages.pendingMessages;

    //传入监听器，收到一条私聊消息总是滚到到页面底部
    this.imService.onNewPrivateMessageReceive = (friendId, message) => {
      if (friendId == this.friend.uuid) {
        //收到新消息，是滚动到最底部
        this.$nextTick(() => {
          this.$refs.myScroll.scrollTo(0, this.$refs.myScroll.scrollHeight)
        })
      }
    };

    //传入监听器，完成一次私聊历史加载时，如果加载结果为空，显示没有更多消息
    this.imService.onPrivateHistoryLoad = (friendId, messages) => {
      if (messages.length == 0) {
        //灰色，就不能点击了
        this.allHistoryLoaded = true
      }
    };

  },
  mounted() {
    //每次进入聊天页面，总是滚动到底部
    this.scrollToBottom()
  },
  beforeDestroy() {
    //退出聊天页面之前，清空页面传入的监听器
    this.imService.onNewPrivateMessageReceive = (friendId, message) => {
    };
    this.imService.onPrivateHistoryLoad = (friendId, messages) => {
    };
  },
  methods: {
    sendMessage() {//发送消息
      console.log('发送消息')
      if (this.content.trim() != '') {
        this.imService.sendPrivateTextMessage(this.friend.uuid, this.content);
      }
      this.content = "";
    },
    loadMoreHistoryMessage() {//历史消息
      let lastMessageTimeStamp = Date.now();
      let lastMessage = this.messages[0];
      if (lastMessage) {
        lastMessageTimeStamp = lastMessage.timestamp;
      }
      this.imService.loadPrivateHistoryMessage(this.friend.uuid, lastMessageTimeStamp);
    },
    navigateBack() {//返回
      //将未读消息数清零
      this.imService.resetFriendUnReadMessage(this.friend);
      this.imService.im.markPrivateMessageAsRead(this.friend.uuid);
      this.$router.push({name: 'contacts'})
    },
    sendImageAndVideo(event) {//发送文件
      let file = event.target.files[0];
      if (file.type.split('/')[0] == 'image') {
        this.imService.sendPrivateImageMessage(this.friend.uuid, file);
      } else {
        this.imService.sendPrivateVideoMessage(this.friend.uuid, file)
      }
      this.$refs.mediaInput.value = ""
    },
    switchAudioKeyboard() {
      this.audioVisible = !this.audioVisible;
    },
    onRecordComplete(file) {
      this.imService.sendPrivateAudioMessage(this.friend.uuid, file)
    },
    showImageFullScreen(message) {
      this.image.url = message.payload.url;
      this.image.show = true;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.myScroll.scrollTo(0, this.$refs.myScroll.scrollHeight)
      })
    },
    goBack() {
      // this.$router.go(-1)
    }
  }
}
</script>
<style scoped src="../assets/style/chatInterface.css"></style>
<style scoped src="../assets/style/common.css"></style>