<template>
    <div>
        <img src="./img/inviteBg.png">
        <form>
            <h3>姓名：</h3>
            <input type="text" placeholder="请填写您的姓名">
            <h3>联系电话：</h3>
            <input type="text" placeholder="请填写您的手机号">
            <h3>备注：</h3>
            <input type="text" placeholder="说些其它的">
        </form>
        <button>提交</button>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
img {
    width: 100%;
}
form {
    width: 92%;
    margin: 0 auto;
    margin-top: 10px;
    h3 {
        margin-top: 10px;
    }
    input {
        width: 100%;
        height: 46px;
        margin-top: 10px;
        border: none;
        background-color: #F6F6F6;
        font-size: 16px;
        text-indent: 1em;
    }
}
button {
    width: 92%;
    height: 50px;
    font-size: 17px;
    margin: 30px 4vw 20px 4vw;
    color: #fff;
    border: none;
    background-color: #F55943;
}
</style>