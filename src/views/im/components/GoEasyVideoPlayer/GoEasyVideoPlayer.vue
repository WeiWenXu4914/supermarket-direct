<template>
    <div class="goeays-video-player">
        <div class="video-snapshot" v-if="showSnapshot" @click="callFullScreen">
            <img :src="thumbnail.url" @load="onLoadEnd">
            <div class="icon"></div>
        </div>
        <video ref="goEasyVideoPlayer"
               class="video-player"
               controls = ""
               v-show="show"
               :src="video.url">
        </video>
    </div>

</template>

<script>
    export default {
        name: "GoEasyVideoPlayer",
        props : {
            video : {
                type : Object
            },
            showSnapshot : {
                type : Boolean,
                default: true
            },
            thumbnail : {
                type : Object
            }
        },
        data () {
            return {
                show : false
            }
        },
        methods : {
            callFullScreen () {
                this.show = true;
                let self = this,
                    goEasyVideoPlayer = this.$refs.goEasyVideoPlayer,
                    requestMethod = goEasyVideoPlayer.requestFullscreen || goEasyVideoPlayer.webkitRequestFullScreen || goEasyVideoPlayer.mozRequestFullScreen || goEasyVideoPlayer.msRequestFullscreen;
                goEasyVideoPlayer.play();
                if(requestMethod) {
                    requestMethod.call(goEasyVideoPlayer)
                }
                function pauseWhenQuitFullScreen () {
                    if(goEasyVideoPlayer.played && !document.webkitIsFullScreen){
                        goEasyVideoPlayer.pause();
                        self.show = false;
                        goEasyVideoPlayer.pxoveEventListener('fullscreenchange', pauseWhenQuitFullScreen)
                    }
                }
                goEasyVideoPlayer.addEventListener('fullscreenchange', pauseWhenQuitFullScreen);
            },
            onLoadEnd () {
                this.$emit('onLoadEnd')
            }
        }
    }
</script>

<style scoped>
    .goeays-video-player{

    }
    .video-snapshot{
        position: relative;
        max-height: 150px;
    }
    .video-snapshot img{
        height: 150px;
    }
    .video-snapshot .icon{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background:url("./images/play.png") no-repeat center;
        background-size: 100%;
        top:50%;
        left: 50%;
        margin:-10px;
    }
    .video-player{
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }
</style>