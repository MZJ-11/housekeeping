<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input
        v-model="nameReceive"
        placeholder="请输入收件人"
        suffix-icon="el-icon-search"
        style="width: 200px"
        @keyup.enter.native="getAllList"
      ></el-input>
      <el-select v-model.number="state" placeholder="请选择状态" @change="getAllList" v-if="info.roleId == 3">
        <el-option label="已取消" :value="-1"> </el-option>
        <el-option label="已下单" :value="0"> </el-option>
        <el-option label="运输中" :value="1"> </el-option>
        <el-option label="派送中" :value="2"> </el-option>
        <el-option label="已送达" :value="3"> </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 5px" @click="getAllList"
        >查询</el-button
      >
      <el-button type="success" @click="resetParam">重置</el-button>
      <el-switch
        v-if="info.roleId == 1"
        style="margin-left: 40%"
        v-model="chose"
        active-text="查看待派送"
        inactive-text="查看已下单"
        @change="getAllList"
      >
      </el-switch>
    </div>

    <el-table
      :data="packageList"
      :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号">
              <span>{{ props.row.packageId }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}元</span>
            </el-form-item>
            <el-form-item label="寄件人">
              <span>{{ props.row.nameSend }}</span>
            </el-form-item>
            <el-form-item label="寄件地址">
              <span
                >{{ props.row.provinceSend }}{{ props.row.citySend
                }}{{ props.row.countySend }}{{ props.row.detailSend }}</span
              >
            </el-form-item>
            <el-form-item label="收件人">
              <span>{{ props.row.nameReceive }}</span>
            </el-form-item>
            <el-form-item label="收件地址">
              <span
                >{{ props.row.provinceReceive }}{{ props.row.cityReceive
                }}{{ props.row.countyReceive
                }}{{ props.row.detailReceive }}</span
              >
            </el-form-item>
            <el-form-item label="下单时间">
              <span>{{ props.row.timeSend }}</span>
            </el-form-item>
            <el-form-item label="快递类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="重量">
              <span>{{ props.row.weight }}kg</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag
                :type="
                  props.row.state == -1
                    ? 'danger'
                    : props.row.state == 0
                    ? 'info'
                    : props.row.state == 1
                    ? 'primary'
                    : props.row.state == 2
                    ? 'warning'
                    : 'success'
                "
                disable-transitions
                >{{
                  props.row.state == -1
                    ? "已取消"
                    : props.row.state == 0
                    ? "已下单"
                    : props.row.state == 1
                    ? "运输中"
                    : props.row.state == 2
                    ? "派送中"
                    : "已送达"
                }}
              </el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="packageId"
        label="订单号"
        align="center"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="nameSend"
        label="寄件人"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="citySend"
        label="寄出城市"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions effect="plain">{{
            scope.row.citySend
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="nameReceive"
        label="收件人"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="cityReceive"
        label="寄往城市"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions effect="plain">{{
            scope.row.cityReceive
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeSend"
        label="下单时间"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="state" label="订单状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.state == -1
                ? 'danger'
                : scope.row.state == 0
                ? 'info'
                : scope.row.state == 1
                ? 'primary'
                : scope.row.state == 2
                ? 'warning'
                : 'success'
            "
            disable-transitions
            >{{
              scope.row.state == -1
                ? "已取消"
                : scope.row.state == 0
                ? "已下单"
                : scope.row.state == 1
                ? "运输中"
                : scope.row.state == 2
                ? "派送中"
                : "已送达"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="watchMore(scope.row)"
            >详情</el-button
          >
          <el-button
            v-if="info.roleId == 3"
            :disabled="!scope.row.state == 0"
            size="small"
            type="danger"
            @click="cancel(scope.row.packageId)"
            >取消订单</el-button
          >
          <el-button
            v-if="info.roleId != 3"
            size="small"
            type="warning"
            @click="change(scope.row)"
            >更改状态</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="recPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="更新快递信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="收件站点:" v-if="oldState == 0">
          <el-col :span="20">
            <el-select v-model="form.stationReceiveId" placeholder="收件站点">
              <el-option
                v-for="(item, index) in stationList"
                :key="index"
                :label="item.realName"
                :value="item.stationId"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="派件员:" v-if="oldState == 1">
          <el-col :span="20">
            <el-select v-model="form.postmanId" placeholder="选择快递员">
              <el-option
                v-for="(item, index) in postmanList"
                :key="index"
                :label="item.realName"
                :value="item.postmanId"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="快递状态:" v-show="oldState == 0">
          <el-col :span="20">
            <el-switch
              v-model="flag"
              active-text="运输中"
              inactive-text="已下单"
              @change="changeState"
            >
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="快递状态:" v-show="oldState == 1">
          <el-col :span="20">
            <el-switch
              v-model="flag"
              active-text="派送中"
              inactive-text="运输中"
              @change="changeState"
            >
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="快递状态:" v-show="oldState == 2">
          <el-col :span="20">
            <el-switch
              v-model="flag"
              active-text="已送达"
              inactive-text="派送中"
              @change="changeState"
            >
            </el-switch>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doChange">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="订单详情" :visible.sync="centerDialogVisible2">
      <el-steps
        :active="form2.state"
        finish-status="success"
        process-status="finish"
      >
        <el-step title="已下单"></el-step>
        <el-step title="运输中"></el-step>
        <el-step title="派送中"></el-step>
        <el-step title="已送达"></el-step>
      </el-steps>
      <br /><br />
      <el-descriptions direction="vertical" :column="4" border size="big">
        <el-descriptions-item label="订单号">{{
          form2.packageId
        }}</el-descriptions-item>
        <el-descriptions-item label="价格"
          >{{ form2.price }}元</el-descriptions-item
        >
        <el-descriptions-item label="重量"
          >{{ form2.weight }}kg</el-descriptions-item
        >
        <el-descriptions-item label="快递类型">{{
          form2.type
        }}</el-descriptions-item>
        <el-descriptions-item label="寄件人">{{
          form2.nameSend
        }}</el-descriptions-item>
        <el-descriptions-item label="寄件地址"
          >{{ form2.provinceSend }}{{ form2.citySend }}{{ form2.countySend
          }}{{ form2.detailSend }}</el-descriptions-item
        >
        <el-descriptions-item label="收件人">{{
          form2.nameReceive
        }}</el-descriptions-item>
        <el-descriptions-item label="收件地址"
          >{{ form2.provinceReceive }}{{ form2.cityReceive
          }}{{ form2.countyReceive
          }}{{ form2.detailReceive }}</el-descriptions-item
        >
        <el-descriptions-item label="下单时间">{{
          form2.timeSend
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{
          form2.remark
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PackageManage",
  data() {
    return {
      chose: false,
      centerDialogVisible2: false,
      flag: false,
      oldState: "",
      info: {},
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
      // postmanList: [
      //   {
      //     postmanId: 1,
      //     account: "",
      //     password: "",
      //     realName: "张三",
      //   },
      //   {
      //     postmanId: 2,
      //     account: "",
      //     password: "",
      //     realName: "李四",
      //   },
      // ],
      // packageList: [
      //   {
      //     packageId: 1,
      //     nameSend: "user1",
      //     provinceSend: "上海市",
      //     citySend: "上海市",
      //     countySend: "松江区",
      //     nameReceive: "user2",
      //     provinceReceive: "福建省",
      //     cityReceive: "福州市",
      //     countyReceive: "闽侯县",
      //     timeSend: "2022/11/7",
      //     state: -1,
      //   },
      //   {
      //     packageId: 2,
      //     nameSend: "user1",
      //     provinceSend: "上海市",
      //     citySend: "上海市",
      //     countySend: "松江区",
      //     nameReceive: "user2",
      //     provinceReceive: "福建省",
      //     cityReceive: "福州市",
      //     countyReceive: "闽侯县",
      //     timeSend: "2022/11/7",
      //     state: 0,
      //   },
      //   {
      //     packageId: 3,
      //     nameSend: "user1",
      //     provinceSend: "上海市",
      //     citySend: "上海市",
      //     countySend: "松江区",
      //     nameReceive: "user2",
      //     provinceReceive: "福建省",
      //     cityReceive: "福州市",
      //     countyReceive: "闽侯县",
      //     timeSend: "2022/11/7",
      //     state: 1,
      //   },
      //   {
      //     packageId: 4,
      //     nameSend: "user1",
      //     provinceSend: "上海市",
      //     citySend: "上海市",
      //     countySend: "松江区",
      //     nameReceive: "user2",
      //     provinceReceive: "福建省",
      //     cityReceive: "福州市",
      //     countyReceive: "闽侯县",
      //     timeSend: "2022/11/7",
      //     state: 2,
      //   },
      //   {
      //     packageId: 5,
      //     nameSend: "user1",
      //     citySend: "上海市",
      //     nameReceive: "user2",
      //     cityReceive: "福州市",
      //     timeSend: "2022/11/7",
      //     state: 3,
      //   },
      // ],
      postmanList: [],
      stationList: [],
      packageList: [],
      nameReceive: "",
      state: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      centerDialogVisible: false,
      form: {
        packageId: "",
        state: "",
        stationReceiveId: "",
        postmanId: "",
      },
      form2: {
        packageId: "",
        nameSend: "",
        provinceSend: "",
        citySend: "",
        countySend: "",
        detailSend: "",
        nameReceive: "",
        provinceReceive: "",
        cityReceive: "",
        countyReceive: "",
        detailReceive: "",
        timeSend: "",
        state: 0,
        type: "",
        weight: "",
        price: "",
        remark: "",
      },
      //   rules: {
      //     account: [
      //       { required: true, message: "请输入账号", trigger: "blur" },
      //       { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
      //     ],
      //     realName: [{ required: true, message: "请输入名字", trigger: "blur" }],
      //     password: [
      //       { required: true, message: "请输入密码", trigger: "blur" },
      //       { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
      //     ],
      //     phone: [
      //       { required: true, message: "手机号不能为空", trigger: "blur" },
      //       {
      //         pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      //         message: "请输入正确的手机号码",
      //         trigger: "blur",
      //       },
      //     ],
      //   },
    };
  },
  methods: {
    cancel(packageId) {
      this.$confirm("你正在执行取消订单操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let result = await this.$API.userAPI.deletepackage(packageId);
        if (result.data.code == "200") {
          this.getAllList();
          this.$message({
            type: "success",
            message: "取消订单成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: result.data.message,
          });
        }
      });
    },
    watchMore(row) {
      console.log(row);
      this.centerDialogVisible2 = true;
      this.$nextTick(() => {
        //赋值到表单
        this.form2.packageId = row.packageId;
        this.form2.nameSend = row.nameSend;
        this.form2.provinceSend = row.provinceSend;
        this.form2.citySend = row.citySend;
        this.form2.countySend = row.countySend;
        this.form2.detailSend = row.detailSend;
        this.form2.nameReceive = row.nameReceive;
        this.form2.provinceReceive = row.provinceReceive;
        this.form2.cityReceive = row.cityReceive;
        this.form2.countyReceive = row.countyReceive;
        this.form2.detailReceive = row.detailReceive;
        this.form2.timeSend = row.timeSend;
        this.form2.state = row.state;
        this.form2.type = row.type;
        this.form2.weight = row.weight;
        this.form2.price = row.price;
        this.form2.remark = row.remark;
      });
    },
    change(row) {
      console.log(row);
      this.centerDialogVisible = true;
      this.flag = false;
      this.getStationList(row);
      this.getPostmanList(row);
      this.$nextTick(() => {
        //赋值到表单
        this.form.packageId = row.packageId;
        this.oldState = row.state;
      });
    },
    changeState() {
      if (this.flag) {
        this.form.state = this.oldState + 1;
      } else {
        this.form.state = this.oldState;
      }
    },
    async doChange() {
      let result = "";
      if (this.oldState == 0) {
        result = await this.$API.stationAPI.sendpackage({
          packageId: this.form.packageId,
          stationReceiveId: this.form.stationReceiveId,
        });
      } else if (this.oldState == 1) {
        result = await this.$API.stationAPI.choosepostman({
          packageId: this.form.packageId,
          postmanId: this.form.postmanId,
        });
      } else if (this.oldState == 2) {
        result = await this.$API.postmanAPI.receivepackage(this.form.packageId);
      }
      if (result.data.code == "200") {
        this.$message({
          type: "success",
          message: result.data.message,
        });
        this.centerDialogVisible = false;
        this.getAllList();
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.recPerPage = val;
      this.getAllList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getAllList();
    },

    resetParam() {
      this.nameReceive = "";
      this.state = "";
      this.getAllList();
    },
    async getAllList() {
      // let result = {};
      // let result1 = {};
      if (this.info.roleId == 3) {
        let result = await this.$API.userAPI.packages({
          userId: this.info.object.userId,
          nameReceive: this.nameReceive,
          state: String(this.state),
          recPerPage: this.recPerPage,
          page: this.page,
        });
        if (result.data.code == "200") {
          this.packageList = result.data.data;
          this.total = result.data.pager.recTotal;
        }
      } else if (this.info.roleId == 1 && this.chose == false) {
        let result = await this.$API.stationAPI.packagestosend({
          stationId: this.info.object.stationId,
          nameReceive: this.nameReceive,
          state: String(this.state),
          recPerPage: this.recPerPage,
          page: this.page,
        });

        if (result.data.code == "200") {
          this.packageList = result.data.data;
          this.total = result.data.pager.recTotal;
        }
      } else if (this.info.roleId == 1 && this.chose == true) {
        let result = await this.$API.stationAPI.packagestoreceive({
          stationId: this.info.object.stationId,
          nameReceive: this.nameReceive,
          state: String(this.state),
          recPerPage: this.recPerPage,
          page: this.page,
        });
        if (result.data.code == "200") {
          this.packageList = result.data.data;
          this.total = result.data.pager.recTotal;
        }
      } else if (this.info.roleId == 2) {
        let result = await this.$API.postmanAPI.packagestoreceive({
          postmanId: this.info.object.postmanId,
          nameReceive: this.nameReceive,
          state: String(this.state),
          recPerPage: this.recPerPage,
          page: this.page,
        });
        if (result.data.code == "200") {
          this.packageList = result.data.data;
          this.total = result.data.pager.recTotal;
        }
      }
      // if (result.data.code == "200") {
      //   this.packageList = result.data.data;
      //   this.total = result.data.pager.recTotal;
      // }
      // if (result1.data.code == "200") {
      //   console.log(result1);
      //   this.packageList.push.apply(this.packageList, result1.data.data);
      //   this.total = this.total + result.data.pager.recTotal;
      // }
    },
    async getStationList(row) {
      let result = await this.$API.stationAPI.stationsincertainarea({
        province: row.provinceReceive,
        city: row.cityReceive,
        county: row.countyReceive,
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
    async getPostmanList(row) {
      let result = await this.$API.stationAPI.postmans({
        stationId: row.stationReceiveId,
        page: 1,
        recPerPage: 100,
      });
      if (result.data.code == "200") {
        this.postmanList = result.data.data;
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
  },
  beforeMount() {
    this.info = JSON.parse(sessionStorage.getItem("info"));
    this.getAllList();
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>