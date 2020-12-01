<template>
    <div class="login">
        <div class="title">GoEasy IM</div>
        <input type="text" class="input-box" v-model="username" placeholder="请输入账号">
        <input type="password" class="input-box" v-model="password" placeholder="请输入密码">
        <div class="alert-box" v-show="showError">
            <span>请输入正确的用户名和密码</span>
        </div>
        <button class="login-btn" @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                username : '',
                password : '',
                showError : false
            }
        },
        methods : {
            login () {//登录
                if (this.username.trim() != "" && this.password.trim() != "") {
                    let loginResult = this.imService.login(this.username, this.password);
                    if (loginResult) {
                        //连接IM
                        this.imService.connectIM();
                        this.$router.push({name: 'contacts'});
                    } else {
                        this.showError = true;
                        console.log('登录失败')
                    }
                    return;
                }
                this.showError = true;
            }
        }
    }
</script>

<style scoped>

    @media screen and (max-width:1000px) {
        .login{
            padding: 1.06rem 0.18rem 0 0.18rem;
        }
        .title {
            height: 10rem;
            font-size:2rem;
            margin-bottom: 0.5rem;
        }
        .input-box {
            width:150px;
            height: 20px;
            margin-bottom: 0.2rem;
            padding: 0.13rem;
            font-size: 10px;
        }
        .alert-box{
            width:3.4rem;
            height: 0.6rem;
            margin-bottom: 0.2rem;
            padding: 0.18rem 0.1rem;
            font-size: 0.16rem;
            line-height: 0.24rem;
        }
        .login-btn{
            width: 150px;
            height: 30px;
            line-height: 0.5rem;
            font-size:0.18rem ;
        }
    }
</style>
<style scoped src="../assets/style/common.css"></style>