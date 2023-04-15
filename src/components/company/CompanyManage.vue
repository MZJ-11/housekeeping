<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input v-model="companyNickname" placeholder="请输入账号" suffix-icon="el-icon-search" style="width: 200px"
        @keyup.enter.native="getAllList"></el-input>
      <el-input v-model="companyName" placeholder="请输入家政公司名" suffix-icon="el-icon-search" style="width: 200px"
        @keyup.enter.native="getAllList"></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="getAllList">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>

      <el-button type="primary" style="margin-left: 30px" @click="add">新增</el-button>
    </div>

    <el-table :data="companyList" :header-cell-style="{ background: '#f2f5fc', color: '#555555' }" border>
      <el-table-column prop="companyId" label="ID" align="center" width="60">
      </el-table-column>
      <el-table-column prop="companyNickname" label="账号" align="center" width="100">
      </el-table-column>
      <el-table-column prop="companyName" label="家政公司名" align="center" width="180" fixed>
      </el-table-column>
      <el-table-column prop="companyPrice" label="服务费用" align="center" width="180">
      </el-table-column>
      <el-table-column prop="companyStatus" label="公司状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag :type="
            scope.row.companyStatus == 0
              ? 'primary'
              : scope.row.companyStatus == 1
                ? 'info'
                : scope.row.companyStatus == 2
                  ? 'warning'
                  : 'success'
          " disable-transitions>{{
  scope.row.companyStatus == 0
  ? "正常状态"
  : scope.row.companyStatus == 1
    ? "已下线"
    : scope.row.companyStatus == 2
      ? "已评价"
      : "已送达"
}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="companyCity" label="市" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions effect="plain">{{
            scope.row.companyCity
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="companyCounty" label="县" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="info" disable-transitions effect="plain">{{
            scope.row.companyCounty
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="companyCity" label="街道" align="center" width="80">
        <template slot-scope="scope">
          <el-tag type="" disable-transitions effect="plain">{{
            scope.row.companyStreet
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="companyDetail" label="详细地址" align="center" width="180">
      </el-table-column>
      <el-table-column prop="companyPhone" label="电话" align="center" width="100">
      </el-table-column>
      <el-table-column prop="operate" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">修改</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="doDel(scope.row.companyId)" style="margin-left: 5px">
            <el-button slot="reference" size="small" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[2, 3, 5, 10]" :page-size="recPerPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="账号" prop="companyNickname">
          <el-col :span="20">
            <el-input v-model="form.companyNickname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="家政公司名" prop="companyName">
          <el-col :span="20">
            <el-input v-model="form.companyName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="companyPassword">
          <el-col :span="20">
            <el-input v-model="form.companyPassword"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="公司状态" prop="companyStatus">
          <template>
            <el-radio v-model="form.companyStatus" label=0>正常状态</el-radio>
            <el-radio v-model="form.companyStatus" label=1>已经下线</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="服务费用" prop="companyPrice">
          <el-col :span="20">
            <el-input v-model="form.companyPrice"></el-input>
          </el-col>
        </el-form-item>
<!-- 这里会出现修改过后的默认值没有重置，新增会显示默认值 -->
        <el-form-item label="市县街" >
          <div class="demo-input-suffix">
            <el-input placeholder="市"  v-model="form.companyCity" style="width: 33.3%">
            </el-input>
            <el-input placeholder="县"  v-model="form.companyCounty" style="width: 33.3%">
            </el-input>
            <el-input placeholder="街"  v-model="form.companyStreet" style="width: 33.3%">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" prop="companyDetail">
          <el-col :span="20">
            <el-input v-model="form.companyDetail"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话" prop="companyPhone">
          <el-col :span="20">
            <el-input v-model="form.companyPhone"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import VDistpicker from "v-distpicker";
export default {
  name: "CompanyManage",
  // components: { VDistpicker },
  data() {
    return {
      // companyList: [
      //   {
      //     companyId: 1,
      //     companyNickname: "P2022001",
      //     companyName: "福州大学服务站",
      //     companyDetail: "福州大学生活区",
      //     companyPhone: "17767639938",
      //     companyStreet: "福建省",
      //     companyCity: "福州市",
      //     companyCounty: "闽侯县",
      //   },
      //   {
      //     companyId: 2,
      //     companyNickname: "P2022002",
      //     companyName: "厦门大学服务站",
      //     companyDetail: "福州大学生活区",
      //     companyPhone: "17767639938",
      //     companyStreet: "福建省",
      //     companyCity: "厦门市",
      //     companyCounty: "集美区",
      //   },
      //   {
      //     companyId: 3,
      //     companyNickname: "P2022003",
      //     companyName: "北京大学服务站",
      //     companyDetail: "福州大学生活区",
      //     companyPhone: "17767639938",
      //     companyStreet: "福建省",
      //     companyCity: "福州市",
      //     companyCounty: "鼓楼区",
      //   },
      //   {
      //     companyId: 4,
      //     companyNickname: "P2022004",
      //     companyName: "清华大学服务站",
      //     companyDetail: "福州大学生活区",
      //     companyPhone: "17767639938",
      //     companyStreet: "福建省",
      //     companyCity: "福州市",
      //     companyCounty: "金山区",
      //   },
      // ],
      companyList: [],
      companyNickname: "",
      companyName: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      centerDialogVisible: false,
      form: {
        companyId:"",
        companyNickname: "",
        companyName: "",
        companyPassword: "",
        companyPhone: "",
        companyStreet: "",
        companyCity: "",
        companyCounty: "",
        companyDetail: "",
        companyStatus: "",
        companyPrice:""
      },
      rules: {
        companyNickname: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        companyName: [
          { required: true, message: "请输入站点名字", trigger: "blur" },
        ],
        companyPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        companyPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields();
      this.$refs.form.companyCity="";
      this.$refs.form.companyCounty="";
      this.$refs.form.companyStreet="";
    },
    async doDel(companyId) {
      console.log(companyId);
      // let result = await this.$API.systemAPI.deletecompany(companyId);
      let result = {
        data: {
          code: '200',
          message: '查询成功',
          data: [
            {
              companyId: 1,
              companyNickname: "P2022001",
              companyName: "喜乐平安家政公司",
              companyDetail: "福州大学生活区",
              companyPhone: "17767639938",
              companyCity: "福州市",
              companyCounty: "闽侯县",
              companyStreet: "甘蔗街",
              companyStatus: 0,
              companyPrice: 100.00
            },
            {
              companyId: 2,
              companyNickname: "P2022002",
              companyName: "阳光月子家政",
              companyDetail: "福州大学生活区",
              companyPhone: "17767639938",
              companyCity: "厦门市",
              companyCounty: "集美区",
              companyStreet: "甘蔗街",
              companyStatus: 1,
              companyPrice: 120.00
            },
            {
              companyId: 3,
              companyNickname: "P2022003",
              companyName: "挚爱绿萝家政",
              companyDetail: "福州大学生活区",
              companyPhone: "17767639938",
              companyCity: "福州市",
              companyCounty: "鼓楼区",
              companyStreet: "甘蔗街",
              companyStatus: 1,
              companyPrice: 130.00
            },
            {
              companyId: 4,
              companyNickname: "P2022004",
              companyName: "福康诚信家政",
              companyDetail: "福州大学生活区",
              companyPhone: "17767639938",
              companyCity: "福州市",
              companyCounty: "金山区",
              companyStreet: "甘蔗街",
              companyStatus: 0,
              companyPrice: 140.00
            },

          ]
        }

      }

      if (result.data.code == "200") {
        this.getAllList();
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    mod(row) {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        //赋值到表单
        this.form.companyId = row.companyId;
        this.form.companyNickname = row.companyNickname;
        this.form.companyName = row.companyName;
        this.form.companyPassword = row.companyPassword;
        this.form.companyDetail = row.companyDetail;
        this.form.companyStreet = row.companyStreet;
        this.form.companyCity = row.companyCity;
        this.form.companyCounty = row.companyCounty;
        this.form.companyPhone = row.companyPhone;
        this.form.companyStatus = row.companyStatus;
        this.form.companyPrice = row.companyPrice;
      });
    },
    add() {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.resetForm();
      });
    },
    async doSave() {
      let result = await this.$API.systemAPI.addcompany(this.form);
      if (result.data.code == "200") {
        this.$message({
          type: "success",
          message: result.data.message,
        });
        this.centerDialogVisible = false;
        this.getAllList();
        this.resetForm();
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    async doMod() {
      let result = await this.$API.systemAPI.updatecompanywithstatus(this.form);
      if (result.data.code == "200") {
        this.$message({
          type: "success",
          message: result.data.message,
        });
        this.centerDialogVisible = false;
        this.getAllList();
        this.resetForm();
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.companyId) {
            this.doMod();
          } else {
            this.doSave();
          }
        } else {
          this.$message({
            type: "warning",
            message: "请检查数据是否填写规范",
          });
          return false;
        }
      });
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
      this.companyNickname = "";
      this.companyName = "";
      this.getAllList();
    },
    async getAllList() {
      let result = await this.$API.systemAPI.companys({
        // companyNickname: this.companyNickname,
        // companyName: this.companyName,
        recPerPage: this.recPerPage,
        page: this.page,
      });
      // let result = {
      //   data: {
      //     code: '200',
      //     message: '查询成功',
      //     data: [
      //       {
      //         companyId: 1,
      //         companyNickname: "P2022001",
      //         companyName: "喜乐平安家政公司",
      //         companyDetail: "福州大学生活区",
      //         companyPhone: "17767639938",
      //         companyCity: "福州市",
      //         companyCounty: "闽侯县",
      //         companyStreet: "甘蔗街",
      //         companyStatus: 0,
      //         companyPrice: 100.00
      //       },
      //       {
      //         companyId: 2,
      //         companyNickname: "P2022002",
      //         companyName: "阳光月子家政",
      //         companyDetail: "福州大学生活区",
      //         companyPhone: "17767639938",
      //         companyCity: "厦门市",
      //         companyCounty: "集美区",
      //         companyStreet: "甘蔗街",
      //         companyStatus: 1,
      //         companyPrice: 120.00
      //       },
      //       {
      //         companyId: 3,
      //         companyNickname: "P2022003",
      //         companyName: "挚爱绿萝家政",
      //         companyDetail: "福州大学生活区",
      //         companyPhone: "17767639938",
      //         companyCity: "福州市",
      //         companyCounty: "鼓楼区",
      //         companyStreet: "甘蔗街",
      //         companyStatus: 1,
      //         companyPrice: 130.00
      //       },
      //       {
      //         companyId: 4,
      //         companyNickname: "P2022004",
      //         companyName: "福康诚信家政",
      //         companyDetail: "福州大学生活区",
      //         companyPhone: "17767639938",
      //         companyCity: "福州市",
      //         companyCounty: "金山区",
      //         companyStreet: "甘蔗街",
      //         companyStatus: 0,
      //         companyPrice: 140.00
      //       },

      //     ]
      //   }

      // }
      if (result.data.code == "200") {
        console.log(result);
        this.companyList = result.data.data;
        // 这里不知道返回的页码在那一层
        // this.page = result.data.pager.page;
        // this.recPerPage = result.data.pager.recPerPage;
        this.total = result.data.pager.recTotal;
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    // onChangecompanyStreet(companyStreet) {
    //   this.form.companyStreet = companyStreet.value;
    //   this.form.companyCity = "";
    //   this.form.companyCounty = "";
    // },
    // onChangecompanyCity(companyCity) {
    //   this.form.companyCity = companyCity.value;
    //   this.form.companyCounty = "";
    // },
    // onChangeCounty(companyCounty) {
    //   this.form.companyCounty = companyCounty.value;
    // },
  },
  beforeMount() {
    this.getAllList();
  },
};
</script>

<style ></style>