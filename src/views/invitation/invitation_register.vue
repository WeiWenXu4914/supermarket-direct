<template>
  <div class="invitation_register">
    <div class="invitation_title">
      <div class="title-text">填写资料</div>
      <div class="submit">
        <van-button color="#D04443" size="small">提交审核</van-button>
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model="register.title"
        label="自提点名称"
        required
        clearable
        placeholder="自提点名称"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="register.site"
        label="自提点地址"
        required
        clearable
        @focus="showArea = true"
        placeholder="自提点地址"
      />
      <van-area
        v-show="showArea"
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="register.detail_site"
        label="详细地址"
        required
        clearable
        placeholder="详细地址"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="register.phone"
        required
        center
        clearable
        label="联系方式"
        placeholder="联系方式"
      >
        <template #button>
          <van-button size="small" color="#D04443" maxlength="11"
            >获取验证码</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
    <div class="upClass">
      <span>自提点照片</span>
      <span class="tips">自提点照片将会展示给用户或司机,请确保照片清晰完整,辨识度高,<a href="" style="color:blue;">查看实例</a></span>
      <van-uploader :after-read="afterRead" max-count="1" />
    </div>
    <div class="upClass">
      <span>营业执照</span>
      <van-uploader :after-read="afterRead" max-count="1" />
    </div>
  </div>
</template>
<script>
import { Area, Toast, Dialog } from "vant";
import province_list from "../shop/actions/area";
export default {
  data() {
    return {
      register: {
        title: "",
        phone: "",
        site: "",
        detail_site: "",
      },
      showArea: false,
      areaList: {},
    };
  },
  created() {
    //配送状态
    this.$store.state.commodityState = true;
    //地区字典
    this.areaList = province_list;
    //是否为编辑页
    if (this.$route.query.data) {
      this.data = JSON.parse(this.$route.query.data);

      this.title = "收货地址";

      if (this.data.by_default == 1) {
        this.checked = true;
      }

      this.text = this.data.contact_name;
      this.tel = this.data.contact_number;
      this.detailArea = this.data.detailed_site;
      this.value = [
        this.data.province,
        this.data.city,
        this.data.district,
      ].join("/");
    }
    this.state = this.$route.query.add;
  },
  methods: {
    onConfirm(values) {
      if (
        values[0].name == "" ||
        values[1].name == "" ||
        values[2].name == ""
      ) {
        Toast("请选择具体的地址");
        return;
      }
      this.register.site = values.map((item) => item.name).join("/");
      this.showArea = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
};
</script>
<style lang="less">
.invitation_register {
  width: 96%;
  margin: 0 auto;
}
.invitation_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title-text {
    flex: 1;
    text-align: center;
    padding-left: 28px;
    font-size: 17px;
  }
}
.submit {
  display: flex;
  align-items: center;
  justify-content: center;
}
.upClass {
  width: 96%;
  margin: 10px auto;
  padding-left: 8px;
  border-bottom: 2px #f8f9fa solid;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  span {
    margin-bottom: 10px;
    color: #323233;
    font-size: 15px;
  }
  .tips {
    font-size: 15px;
    color: #696969;
  }
}
</style>