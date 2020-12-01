<template>
    <div class="goEasy-recorder">
        <div class="record-input" @click="onStateChange">{{recording ? '点击发送' : '点击录音'}}</div>
        <div class="record-loading" v-if="recording"></div>
    </div>
</template>

<script>
    import Recorder from 'recorder-core';
    import 'recorder-core/src/engine/mp3'
    import 'recorder-core/src/engine/mp3-engine'
    export default {
        name: "GoEasyRecorder",
        data () {
            return {
                recording : false,
                recorder : null,
                file : null
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            this.close();
            this.recorder = null;
        },
        methods : {
            init() {
                this.recorder = Recorder({
                    type : 'mp3',
                    sampleRate:16000,
                    bitRate:16,
                    onProcess : function () {

                    }
                });
            },
            onStateChange () {
                if(this.recording) {
                    this.stop()
                }else{
                    this.start()
                }
            },
            start () {
                this.recorder.open(() => {
                    //授权成功
                    this.recording = true;
                    if(this.recorder && this.recorder.state != 1) {
                        this.recorder.start()
                    }
                }, () => {
                    //授权失败
                    this.close()
                })
            },
            stop () {
                this.recorder.stop((blob, duration) => {
                    this.recording = false;
                    this.open = false;
                    let file = new File([blob], 'audio.mp3', {type: blob.type, lastModified: Date.now()});
                    this.$emit('onComplete', file);
                    this.close()
                }, (msg) => {
                    console.log(msg)
                    this.close()
                })
            },
            close () {
                this.open = true;
                if(this.recorder) {
                    this.recorder.close();
                }
            }
        }
    }
</script>

<style scoped>
    .goEasy-recorder{
        width: 240px;
        display: flex;
    }
    .chatInterface .record-input{
        width: 235px;
        line-height: 15px;
        font-size: 13px;
        background: #cccccc;
        color: #ffffff;
        text-align: center;
    }

    .record-loading{
        position: absolute;
        top:50%;
        left: 50%;
        width: 150px;
        height: 150px;
        margin: -400px -75px;
        background: #262628;
        background: url("./images/loading.gif") no-repeat center;
        background-size: 100%;
        border-radius: 20px;
    }

</style>