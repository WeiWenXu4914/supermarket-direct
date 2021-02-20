<template>
    <div class="see-logistices">
        <title-view title="物流信息" :border="false"></title-view>
		<div class="header">
			<img :src="data.pro_thumbnail" mode="aspectFill">
			<div class="info">
				<div class="">物流状态: <span class="status">{{ status(loData.deliverystatus) }}</span></div>
				<div class="">物流公司: {{ loData.expName }}</div>
				<div class="">物流单号: {{ loData.number }}</div>
				<div class="">物流电话: {{ loData.expPhone }}</div>
			</div>
		</div>
        <van-steps direction="vertical" :active="0">
            <van-step v-for="item in loData.list" :key="item.time">
                <h3> {{ item.status }} </h3>
                <p style="marginTop:.1rem"> {{ item.time }} </p>
            </van-step>
        </van-steps>
	</div>
</template>

<script>
import { parcel } from './actions';
import { Step, Steps, Toast } from 'vant';
import titleView from '@/components/public_views/titleView';
export default {
    components: {
        titleView
    },
    data() {
        return {
            data: {},
            loData: {}
        }
    },
    created() {
        this.data = JSON.parse(this.$route.query.data)

        parcel(this.data.logistics)
        .then((res) => {
            console.log(res)
            this.loData = res.data;
            if (this.loData.list.length === 0) {
                Toast("暂无该订单物流信息");
                setTimeout(() => {
                    this.$router.back()
                }, 1000)
            }
        })
    },
    methods: {
        status(val) {
			let state = "";
			switch(parseInt(val)) {
				case 0: state = "快递收件（揽件"; break;
				case 1: state = "在途中"; break;
				case 2: state = "正在派件"; break;
				case 3: state = "已签收"; break;
				case 4: state = "派送失败"; break;
				case 5: state = "疑难件"; break;
				case 6: state = "退件签收"; break;
			}
			return state;
		}
    }
}
</script>

<style lang="less">
.see-logistices {
	width: 100vw;
	.header {
		display: flex;
		width: 92vw;
		margin: 0 auto;
		padding: 20px 0;
		img {
			width: 100px;
			height: 100px;
		}
		.status {
			padding: 0 3px;
			color: #d04443;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 15px;
			font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		}
	}
}
</style>