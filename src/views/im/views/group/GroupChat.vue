<template>
    <div class="chatInterface" style=" height: 95%;" >
        <div class="header">
            <span class="back-btn"  @click="navigateBack">
                <van-icon name="arrow-left" size="20" />
            </span>
            {{group.name}}
            <img class="group-icon" src="../../assets/images/group-icon.png" @click="showMembers" />
        </div>
        <div class="chat-scroll-container">
            <div ref="myScroll" class="scroll-view">
                <div :class="[allHistoryLoaded ? 'top gray' : 'top']" @click="loadMoreHistoryMessage">
                    <span>{{allHistoryLoaded ? '已经没有更多的历史消息' : '点击加载更多历史消息'}}</span>
                </div>
                <div v-for="(message, key) in messages || []"
                     :key="key+'message'"
                     :class="[message.senderId == currentUser.uuid ? 'self message-item' : 'message-item']">
                    <div class="avatar">
                        <img :src="currentUser.avatar" v-if="message.senderId == currentUser.uuid">
                        <img :src="groupMembersMap[message.senderId].avatar" v-else>
                    </div>
                    <div class="content">
                        <span class="text-content" v-if="message.type =='text'">{{message.payload.text}}</span>
                        <img v-if="message.type == 'image'" :src="message.payload.url" @click="showImageFullScreen(message)" @load="scrollToBottom">
                        <GoEasyVideoPlayer v-if="message.type == 'video'" :video="message.payload.video" :thumbnail="message.payload.thumbnail" @onLoadEnd="scrollToBottom" />
                        <GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
                    </div>
                </div>
                <div v-for="(message, key) in pendingMessages || []"
                     :key="key + 'pending'"
                     :class="[message.senderId == currentUser.uuid ? 'self message-item' : 'message-item']">
                    <div class="avatar">
                        <img :src="currentUser.avatar" v-if="message.senderId == currentUser.uuid">
                        <img :src="groupMembersMap[message.senderId].avatar" v-else>
                    </div>
                    <div class="content">
                        <b class="pending"></b>
                        <span v-if="message.type =='text'">{{message.payload.text}}</span>
                        <img v-if="message.type == 'image'" :src="message.payload.url" @load="scrollToBottom">
                        <div v-if="message.type == 'video'" class="video-snapshot">
                            <video :src="message.payload.video.url"></video>
<!--                            <img :src="message.payload.thumbnail.url" @load="onLoadEnd">-->
                            <div class="icon"></div>
                        </div>
                        <GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
                    </div>
                </div>
            </div>
        </div>
        <div class="action-box">
            <div class="action-top">
                <!-- <div :class="[audioVisible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard"></div> -->
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
                <div class="message-input" v-else>
                    <input type="text" placeholder="发送消息" v-model="content">
                </div>
                <div class="file-icon img-video">
                    <input type="file" @change="sendImageAndVideo" ref="mediaInput">
                </div>
                <span class="send-message-btn" @click="sendMessage">发送</span>
            </div>
            <div class="action-bottom" v-if="false"></div>
        </div>
        <Members ref="member" :members="groupMembersMap" />
        <div class="img-layer" @click="image.show = false" v-show="image.show">
            <img :src="image.url">
        </div>
    </div>
</template>

<script>
    import { Notify } from 'vant';
    import Members from "./Members";
    import GoEasyRecorder from "../../components/GoEasyRecorder/GoEasyRecorder";
    import GoEasyAudioPlayer from "../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
    import GoEasyVideoPlayer from "../../components/GoEasyVideoPlayer/GoEasyVideoPlayer";
    export default {
        name: "group",
        components : {
            Members,
            GoEasyRecorder,
            GoEasyAudioPlayer,
            GoEasyVideoPlayer
        },
        data () {
            return {
                content : '',
                group : null,
                currentUser : null,
                groupMembersMap : {},
                messages : [],
                pendingMessages : [],
                allHistoryLoaded : false,

                audioVisible: false,
                image : {
                    show : false,
                    url : ''
                }
            }
        },
        watch : {
            pendingMessages(){
                this.scrollToBottom()
            }
        },
        beforeMount() {
            //聊天信息
            var data = JSON.parse(this.$Utils.demoResponse(this.$route.query.res))
            this.group = data.group;

            this.currentUser = this.imService.currentUser;
            let groupMessages = this.imService.getGroupMessages(data.group.uuid);

            this.messages = groupMessages.sentMessages;
            this.pendingMessages = groupMessages.pendingMessages;

            this.groupMembersMap = this.imService.getGroupMembers(data.group.uuid);

            //传入监听器，收到一条私聊消息总是滚到到页面底部
            this.imService.onNewGroupMessageReceive =  (groupId, message)=> {
                console.log("message:",message);
                if (groupId == this.group.uuid) {
                    //收到新消息，是滚动到最底部
                    // this.scrollToBottom()
                    this.$nextTick(() => {
                        this.$refs.myScroll.scrollTo(0, this.$refs.myScroll.scrollHeight)
                    })
                }
            };

            //传入监听器，完成一次私聊历史加载时，如果加载结果为空，显示没有更多消息
            this.imService.onGroupHistoryLoad = (groupId, messages) =>{
                console.log("messages:",messages);
                if (messages.length == 0) {
                    //todo:灰色，就不能点击了
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
            this.imService.onNewGroupMessageReceive =  (groupId, message)=> {};
            this.imService.onGroupHistoryLoad = (groupId, messages) =>{ };
        },
        created() {
            window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
        },
        methods : {
            beforeunloadFn(e) {
                alert('书信')
            },
            sendMessage () {//发送消息
                if(this.content.trim() != "") {
                    this.imService.sendTextGroupMessage(this.group.uuid, this.content);
                }else{
                    Notify({ type: 'warning', message: '请输入发送的内容' });
                }
                this.content = "";
            },
            loadMoreHistoryMessage () {//历史消息
                let lastMessageTimeStamp = Date.now();
                let lastMessage = this.messages[0];
                if (lastMessage) {
                    lastMessageTimeStamp = lastMessage.timestamp;
                }
                this.imService.loadGroupHistoryMessage(this.group.uuid, lastMessageTimeStamp);
            },
            showMembers () {//显示群成员
                this.$refs.member.showMemberLayer()

            },
            navigateBack () {//返回
                this.imService.resetGroupUnReadMessage(this.group);//清空未读消息
                this.imService.im.markGroupMessageAsRead(this.group.uuid)
                this.$router.go(-1)
            },
            sendImageAndVideo (event) {//发送文件
                let file = event.target.files[0];
                if(file.type.split('/')[0] == 'image') {
                    this.imService.sendGroupImageMessage(this.group.uuid,file);
                }else{
                    this.imService.sendGroupVideoMessage(this.group.uuid, file)
                }
                this.$refs.mediaInput.value = ""
            },
            switchAudioKeyboard () {
                this.audioVisible = !this.audioVisible;
            },
            onRecordComplete (file) {
                this.imService.sendGroupAudioMessage(this.group.uuid, file)
            },
            showImageFullScreen (message) {
                this.image.url = message.payload.url;
                this.image.show = true;
            },
            scrollToBottom () {
                this.$nextTick(() => {
                    this.$refs.myScroll.scrollTo(0, this.$refs.myScroll.scrollHeight)
                })
            }
        },
        destroyed() {
            window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
        }
    }
</script>

<style scoped src="../../assets/style/chatInterface.css"></style>
<style scoped src="../../assets/style/common.css"></style>