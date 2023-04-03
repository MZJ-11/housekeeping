<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input
        v-model="account"
        placeholder="请输入账号"
        suffix-icon="el-icon-search"
        style="width: 200px"
        @keyup.enter.native="getAllList"
      ></el-input>
      <el-input
        v-model="realName"
        placeholder="请输入姓名"
        suffix-icon="el-icon-search"
        style="width: 200px"
        @keyup.enter.native="getAllList"
      ></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="getAllList"
        >查询</el-button
      >
      <el-button type="success" @click="resetParam">重置</el-button>

      <el-button type="primary" style="margin-left: 30px" @click="add"
        >新增</el-button
      >
    </div>

    <el-table
      :data="userList"
      :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
      border
    >
      <el-table-column prop="userId" label="ID" align="center" width="60"> </el-table-column>
      <el-table-column prop="account" label="账号" align="center" width="150">
      </el-table-column>
      <el-table-column prop="realName" label="姓名" align="center" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="150">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.sex == 1 ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.sex == 1 ? "男" : "女" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" align="center" width="180"> </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="确定删除吗？"
            @confirm="doDel(scope.row.userId)"
            style="margin-left: 5px"
          >
            <el-button slot="reference" size="small" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2,3,5,10]"
      :page-size="recPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-col :span="20">
            <el-input v-model="form.account"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="名字" prop="realName">
          <el-col :span="20">
            <el-input v-model="form.realName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="20">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model.number="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-col :span="20">
            <el-input v-model="form.phone"></el-input>
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
export default {
  name: "UserManage",
  data() {
    return {
        // userList: [
        //   {
        //     userId: 1,
        //     account: "user1",
        //     realName: "刘德华",
        //     sex: 1,
        //     phone: "17767639938",
        //   },
        //   {
        //     userId: 2,
        //     account: "user2",
        //     realName: "郭富城",
        //     sex: 0,
        //     phone: "17767639938",
        //   },
        //   {
        //     userId: 3,
        //     account: "user3",
        //     realName: "黎明",
        //     sex: 1,
        //     phone: "17767639938",
        //   },
        //   {
        //     userId: 4,
        //     account: "user4",
        //     realName: "张学友",
        //     sex: 0,
        //     phone: "17767639938",
        //   },
        // ],
      userList: [],
      account: "",
      realName: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      sex: "",
      sexs: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "0",
          label: "女",
        },
      ],
      centerDialogVisible: false,
      form: {
        account: "",
        realName: "",
        password: "",
        phone: "",
        sex: 1,
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        realName: [{ required: true, message: "请输入名字", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        phone: [
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
    },
    async doDel(userId) {
      console.log(userId);
      let result = await this.$API.adminAPI.deleteuser(userId);
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
      console.log(row);
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        //赋值到表单
        this.form.userId = row.userId;
        this.form.account = row.account;
        this.form.realName = row.realName;
        this.form.password = row.password;
        this.form.stationId = row.stationId;
        this.form.sex = row.sex;
        this.form.phone = row.phone;
      });
    },
    add() {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.resetForm();
      });
    },
    async doSave() {
      let result = await this.$API.adminAPI.adduser(this.form);
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
      let result = await this.$API.adminAPI.updateuser(this.form);
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
          if (this.form.userId) {
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
      this.account = "";
      this.realName = "";
      this.getAllList();
    },
    async getAllList() {
      let result = await this.$API.adminAPI.users({
        account: this.account,
        realName: this.realName,
        recPerPage: this.recPerPage,
        page: this.page,
      });
      if (result.data.code == "200") {
        console.log(result)
        this.userList = result.data.data;
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
  },
  beforeMount() {
    this.getAllList();
  },
};
</script>

<style scoped>
</style>