<template>
    <div class="enterprise-list-item">
        <div class="content-item" @click="userHandle">
            <van-image
             :src="data.ent_logo"
             class="image"
             width="55"
             height="55"
             lazy-load
             fit="cover"
            >
            <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
            </template>
            </van-image>
            <div class="message-right">
                <div class="enterprise-message">
                    <h5>{{ data.ent_name }}</h5>
                    <p>{{ data.ent_introduction }}</p>
                    <van-rate
                        v-model="data.ent_grade"
                        :size="18"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                        readonly
                    />
                </div>
                <button>
                    进店
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        userHandle() {
            var obj = {
                entid: this.data.entid,
                entfid: 0,
            };

            var res = this.$Utils.demoRequest(JSON.stringify(obj));
            this.$router.push({
                path: "/merchants/produce",
                query: { res: res },
            });
        },
    }
}
</script>

<style lang="less">
.enterprise-list {
    width: 100vw;
    height: min-content;
    
    .content-item {
        display: flex;
        width: 100vw;
        overflow: hidden;
        height: min-content;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .image {
            min-width: 55px;
            height: 55px;
            margin-left: 10px;
        }
        .message-right {
            flex: 1;
            display: flex;
            align-items: center;
            width: 248px;
            justify-content: space-between;
            .enterprise-message {
                width: 80%;
                padding: 15px 7px 5px 7px;
                h5 {
                    width: 97%;
                    padding-bottom: 3px;
                    font-size: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p {
                    width: 97%;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            button {
                margin-right: 15px;
                background-color: #fff;
                border: none;
                color: rgba(245, 23, 36, 1);
                padding: 3px 8px;
                box-shadow: 0 0 2px red;
            }
        }
    }
    
}
</style>