<template>
<div class="team">
    <div class="top">
        <p class="p1">x</p>
        <p class="p2">乐家本地服务团队</p>
    </div>
    <!-- 市场 -->
    <div class="modle">
        <p class="market">市场</p>
        <div class="photo">
            <div class="left">
                <img src="./img/0165925c8325bda80120af9a97eb93.jpg@3000w_1l_0o_100sh.png" alt="">
                 <p class="name">韩志彬</p>
                 <p class="int">三大平面设计师之一</p>
            </div>
            <div class="right">
                <img src="./img/图层 2.png" alt="">
                <p class="name">韩越</p>
                 <p class="int">三大平面设计师一</p>
            </div>
        </div>
    </div>
    <!-- 技术 -->
    <div class="modle">
        <p class="market">技术</p>
        <div class="photo">
            <div class="left">
                <img src="./img/0165925c8325bda80120af9a97eb93.jpg@3000w_1l_0o_100sh.png" alt="">
                 <p class="name">韩志彬</p>
                 <p class="int">三大平面设计师之一</p>
            </div>
            <div class="right">
                <img src="./img/图层 2.png" alt="">
                <p class="name">韩越</p>
                 <p class="int">三大平面设计师一</p>
            </div>
             <div class="left">
                <img src="./img/0165925c8325bda80120af9a97eb93.jpg@3000w_1l_0o_100sh.png" alt="">
                 <p class="name">韩志彬</p>
                 <p class="int">三大平面设计师之一</p>
            </div>
            <div class="right">
                <img src="./img/图层 2.png" alt="">
                <p class="name">韩越</p>
                 <p class="int">三大平面设计师一</p>
            </div>
            <div class="left">
                <img src="./img/0165925c8325bda80120af9a97eb93.jpg@3000w_1l_0o_100sh.png" alt="">
                 <p class="name">韩志彬</p>
                 <p class="int">三大平面设计师之一</p>
            </div>
        </div>
    </div>
    <!-- 策划/设计 -->
    <div class="modle">
        <p class="market">策划/设计</p>
        <div class="photo">
            <div class="left">
                <img src="./img/0165925c8325bda80120af9a97eb93.jpg@3000w_1l_0o_100sh.png" alt="">
                 <p class="name">韩志彬</p>
                 <p class="int">三大平面设计师之一</p>
            </div>
            <div class="right">
                <img src="./img/图层 2.png" alt="">
                <p class="name">韩越</p>
                 <p class="int">三大平面设计师一</p>
            </div>
        </div>
    </div>
    <!-- 项目 -->
    <div class="modle">
        <p class="market">项目</p>
        <div class="photo">
            <div class="left">
                <img src="./img/0165925c8325bda80120af9a97eb93.jpg@3000w_1l_0o_100sh.png" alt="">
                 <p class="name">王英博</p>
                 <p class="int">三大平面设计师之一</p>
            </div>
        </div>
    </div>
    <!-- --------------------- -->
</div>
  
</template>

<script>

export default {
    name:"team"

}
</script>


<style scoped lang="less">
*{
    margin: 0;
    padding: 0;
}
.team{
    .top{
        p{
            color: #242424;
        }
        .p1{
            display: inline-block;
            margin-left: 0.5rem;
            font-size: 0.45rem;
        }
        .p2{
            display: inline-block;
            font-size: 0.45rem;
            font-weight: bold;
            margin: 0.5rem 0rem 0rem 2.3rem;
        }
    }
    .modle{
        .market{
            color: #2F2F2F;
            font-weight: bold;
            font-size: 0.5rem;
            margin: 0.4rem 0rem 0.2rem 0.3rem;
        }
        .photo{
            display: flex;
            // justify-content: space-around;
            margin-left: 0.3rem;
            flex-wrap: wrap;
            .right{
                margin-left: 0.2rem;
            }
            .name{
                color:#2F2F2F;
                font-weight: bold;
                margin-top: 0.1rem;
                font-size: 0.4rem;
            }
            .int{
                color: #6B6B6B;
                font-size: 0.1rem;
                padding-bottom: 0.5rem;

            }
            img{
                width: 4.6rem;
            }

        }
    }

}


</style>