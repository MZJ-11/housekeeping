<template>
  <div>
    <el-form
      ref="sendForm"
      :model="sendForm"
      label-width="180px"
      class="sendForm"
    >
      <el-form-item label="寄件人信息:" size="middle">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-input
              v-model="sendForm.nameSend"
              placeholder="请输入寄件人的名字"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="sendForm.phoneSend"
              placeholder="请输入寄件人的电话号码"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <v-distpicker
              @province="onChangeProvinceSend"
              @city="onChangeCitySend"
              @area="onChangeAreaSend"
            ></v-distpicker>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input
              v-model="sendForm.detailSend"
              placeholder="请输入收件人的详细地址"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="收件人信息:" size="middle">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-input
              v-model="sendForm.nameReceive"
              placeholder="请输入收件人的名字"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="sendForm.phoneReceive"
              placeholder="请输入收件人的电话号码"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <v-distpicker
              @province="onChangeProvinceReceive"
              @city="onChangeCityReceive"
              @area="onChangeAreaReceive"
            ></v-distpicker>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input
              v-model="sendForm.detailReceive"
              placeholder="请输入收件人的详细地址"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="快递站点：" size="middle" prop="stationSendId">
            <el-select v-model="sendForm.stationSendId" placeholder="寄件站点">
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.realName"
                :value="item.stationId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物品类型：" size="middle" prop="type">
            <el-select v-model="sendForm.type" placeholder="物品类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="物品重量：" size="middle" prop="weight">
        <el-input-number
          v-model.number="sendForm.weight"
          :precision="1"
          :step="0.1"
          :max="100"
          @change="computePrice"
        ></el-input-number>
        <span>&nbsp;&nbsp;单位：（KG）</span>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input
              type="textarea"
              v-model="sendForm.remark"
              placeholder="补充..."
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <span
          >预估金额<b style="color: red">{{ sendForm.price }}</b
          >元&nbsp;&nbsp;</span
        >
        <el-button type="primary" @click="onSubmit('sendForm')" size="middle"
          >立即下单</el-button
        >
        <el-button type="info" size="middle" @click="reset('sendForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "Send",
  components: { VDistpicker },
  data() {
    return {
      sendForm: {
        nameSend: "",
        phoneSend: "",
        provinceSend: "",
        citySend: "",
        countySend: "",
        detailSend: "",
        nameReceive: "",
        phoneReceive: "",
        provinceReceive: "",
        cityReceive: "",
        countyReceive: "",
        detailReceive: "",
        stationSendId: "",
        stationReceiveId: "",
        type: "",
        weight: 1.0,
        price: 12,
        remark: "",
        state: 0,
        userId: JSON.parse(sessionStorage.getItem("info")).object.userId,
      },
      // stationList: [
      //   {
      //     stationId: 1,
      //     account: "",
      //     password: "",
      //     realName: "福州大学服务站",
      //     phone: "",
      //     detail: "",
      //     province: "",
      //     city: "",
      //     county: "",
      //   },
      //   {
      //     stationId: 2,
      //     account: "",
      //     password: "",
      //     realName: "厦门大学服务站",
      //     phone: "",
      //     detail: "",
      //     province: "",
      //     city: "",
      //     county: "",
      //   },
      // ],
      stationList: [],
      typeList: ["日用品", "食品", "文件", "衣物", "数码产品", "其他"],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.sendForm);
      this.$confirm("信息全部填写完成了嘛^-^?", "提示", {
        confirmButtonText: "确定", //确认按钮的文字显示
        type: "warning",
        center: true, //文字居中显示
      })
        .then(async () => {
          let result = await this.$API.userAPI.addpackage(this.sendForm);
          if (result.data.code == "200") {
            console.log(result.data.data);
            this.$message({
              type: "success",
              message: "下单成功，请耐心等待您的包裹送达",
            });
            this.$router.push("/index/package");
          }
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "请确认好下单信息哦",
          });
        });
    },
    onChangeProvinceSend(province) {
      this.sendForm.provinceSend = province.value;
      this.sendForm.citySend = "";
      this.sendForm.countySend = "";
      this.sendForm.stationSendId = "";
    },
    onChangeCitySend(city) {
      this.sendForm.citySend = city.value;
      this.sendForm.countySend = "";
      this.sendForm.stationSendId = "";
      this.getStationList();
    },
    async onChangeAreaSend(county) {
      this.sendForm.countySend = county.value;
      let result = await this.$API.stationAPI.stationsincertainarea({
        province: this.sendForm.provinceSend,
        city: this.sendForm.citySend,
        county: this.sendForm.countySend,
        page: 1,
        recPerPage: 100,
      });
      if (result.data.code == "200") {
        this.stationList = result.data.data;
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    onChangeProvinceReceive(province) {
      this.sendForm.provinceReceive = province.value;
      this.sendForm.cityReceive = "";
      this.sendForm.countyReceive = "";
    },
    onChangeCityReceive(city) {
      this.sendForm.cityReceive = city.value;
      this.sendForm.countyReceive = "";
    },
    async onChangeAreaReceive(county) {
      this.sendForm.countyReceive = county.value;
      this.sendForm.stationSendId = "";
    },
    computePrice() {
      this.sendForm.price =
        this.sendForm.weight <= 3 ? 12 : (this.sendForm.weight - 3) * 2 + 12;
    },
    reset(formName) {
      // this.$refs[formName].resetFields();
      console.log(formName);
      this.sendForm = {
        nameSend: "",
        phoneSend: "",
        provinceSend: "",
        citySend: "",
        countySend: "",
        detailSend: "",
        nameReceive: "",
        phoneReceive: "",
        provinceReceive: "",
        cityReceive: "",
        countyReceive: "",
        detailReceive: "",
        stationSendId: "",
        stationReceiveId: "",
        type: "",
        weight: 1.0,
        price: 12,
        remark: "",
        state: 0,
        userId: JSON.parse(sessionStorage.getItem("info")).object.userId,
      };
    },
    async getStationList() {
      let result = await this.$API.stationAPI.stationsincertainarea({
        province: this.sendForm.provinceReceive,
        city: this.sendForm.cityReceive,
        county: this.sendForm.countyReceive,
        page: 1,
        recPerPage: 100,
      });
      if (result.data.code == "200") {
        this.stationList = result.data.data;
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
  },
};
</script>

<style>
.divwrap {
  height: 400px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.divwrap >>> .distpicker-address-wrapper {
  color: #999;
}
.divwrap >>> .address-header {
  position: fixed;
  bottom: 400px;
  width: 100%;
  background: #000;
  color: #fff;
}
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: #666 solid 8px;
}
.divwrap >>> .address-container .active {
  color: #000;
}
.el-row {
  margin-bottom: 10px;
}
</style>