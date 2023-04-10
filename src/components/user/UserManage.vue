<template>
  <div>
    <div style="margin-bottom: 5px" >
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
      <el-table-column prop="userId" label="ID" align="center" width="60">
      </el-table-column>
      <el-table-column prop="userNickName" label="用户昵称" align="center" width="150">
      </el-table-column>
      <el-table-column prop="userPassword" label="密码" align="center" width="150">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" align="center" width="150">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话" align="center" width="180">
      </el-table-column>
      <el-table-column prop="userStatus" label="状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag
              :type="
                 scope.row.userStatus == 0
                ? 'success'
                : scope.row.userStatus == 1
                ? 'danger'
                : 'success'
            "
              disable-transitions
          >{{
              scope.row.userStatus == 0
                  ? "正常"
                  : scope.row.userStatus == 1
                      ? "已注销"
                          : "已送达"
            }}
          </el-tag>
        </template>
      </el-table-column>
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
      :page-sizes="[2, 3, 5, 10]"
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
        <el-form-item label="昵称" prop="userNickName">
          <el-col :span="20">
            <el-input v-model="form.userNickName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-col :span="20">
            <el-input v-model="form.userPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="真实姓名" prop="userName">
          <el-col :span="20">
            <el-input v-model="form.userName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话" prop="userPhone">
          <el-col :span="20">
            <el-input v-model="form.userPhone"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quite">取 消</el-button>
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
      stationDisabled: true,
      stationInfo: "",
        userList: [
          {
            userId: 1,
            userNickName: "刘先生",
            userPassword:"2112",
            userName: "刘德华",
            userPhone: "17767639938",
            userStatus: 0
          },
          {
            userId: 2,
            userNickName: "严女生",
            userPassword:"2112",
            userName: "小严老师",
            userPhone: "1244639938",
            userStatus: 1
          },
          {
            userId: 3,
            userNickName: "K先生",
            userPassword:"2112",
            userName: "后羿",
            userPhone: "123239938",
            userStatus: 1
          },
          {
            userId: 4,
            userNickName: "边路之虎",
            userPassword:"2112",
            userName: "吕布",
            userPhone: "1244639938",
            userStatus: 1
          },
        ],
      //userList: [],
      userNickname:'',
      userName:'',
      userPhone:'',
      userPassword:'',
      account: "",
      info:{},
      realName: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      flag:false,
      centerDialogVisible: false,
      userId:"",
      form: {
        userId:"",
        userNickName: "",
        userName: "",
        userPhone: "",
        userPassword:"",
      },
      rules: {
        userId: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        //   { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        userPhone: [
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
    //删除操作
    async doDel(userId) {
      let result = await this.$API.systemAPI.deleteuser(userId)
      if (result.data.code == "200") {
        this.getAllList();
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    //将修改的行信息填入弹出框
    mod(row) {
      //console.log(row);
      this.centerDialogVisible = true;
      //this.stationDisabled = true;
      this.$nextTick(() => {
        //赋值到表单
        this.form.userId=row.userId
        this.form.userName=row.userName
        this.form.userNickName=row.userNickName
        this.form.userPhone=row.userPhone
        this.form.userPassword=row.userPassword
      });
    },
    //点击新增按钮，显示弹框
    async add() {
      this.form.userId="";
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.resetForm();
      });
    },
    async doMod() {
      console.log("Mod")
      let result = await this.$API.systemAPI.updateuser(this.form);
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
    async doAdd() {
      console.log("add")
      let result = await this.$API.systemAPI.adduser(this.form);
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
            this.doAdd();
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
      let result=await this.$API.systemAPI.users({
        page:this.page,
        recPerPage:this.recPerPage,
      })
      if (result.data.code == "200") {
        console.log(result)
        this.userList = result.data.data;
        // this.page = result.data.pager.page;
        // this.recPerPage = result.data.pager.recPerPage;
        this.total = result.data.pager.recTotal;
      } else {
        alert("查询失败")
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    quite() {
      this.centerDialogVisible = false;
      this.stationDisabled = false;
    },
  },
  async beforeMount() {
    this.info = JSON.parse(sessionStorage.getItem("info"));
    this.getAllList()

  },
};
</script>

<style scoped>
</style>