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
        :data="workerList"
        :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
        border
    >
      <el-table-column prop="workerId" label="ID" align="center" width="60">
      </el-table-column>
      <el-table-column prop="workerNickName" label="用户昵称" align="center" width="150">
      </el-table-column>
      <el-table-column prop="workerPassword" label="密码" align="center" width="150">
      </el-table-column>
      <el-table-column prop="workerName" label="姓名" align="center" width="150">
      </el-table-column>
      <el-table-column prop="workerPhone" label="电话" align="center" width="180">
      </el-table-column>
      <el-table-column prop="workerStatus" label="状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag
              :type="
                 scope.row.workerStatus == 0
                ? 'primary'
                : scope.row.workerStatus == 1
                ? 'info'
                : 'success'
            "
              disable-transitions
          >{{
              scope.row.workerStatus == 0
                  ? "正常"
                  : scope.row.workerStatus == 1
                      ? "已离职"
                          : "已送达"
            }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="operate" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)"
          >修改</el-button
          >
          <el-popconfirm
              title="确定删除吗？"
              @confirm="doDel(scope.row.workerId)"
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
            <el-form-item label="公司" size="middle" prop="stationSendId" v-show="info.roleId!=2">
              <el-select v-model="companyList.companyId" placeholder="公司列表">
                <el-option
                    v-for="(item, index) in companyList"
                    :key="index"
                    :label="item.companyName"
                    :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
        <el-form-item label="昵称" prop="workerNickName">
          <el-col :span="20">
            <el-input v-model="form.workerNickName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="workerPassword">
          <el-col :span="20">
            <el-input v-model="form.workerPassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="真实姓名" prop="workerName">
          <el-col :span="20">
            <el-input v-model="form.workerName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话" prop="workerPhone">
          <el-col :span="20">
            <el-input v-model="form.workerPhone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="状态" prop="workerStatus" v-if="showStatus">
          <el-col :span="20">
            <el-select v-model="this.form.workerStatus" placeholder="员工状态">
              <el-option
                  v-for="(item, index) in status"
                  :key="index"
                  :label="item.workerStatus"
                  :value="index"
              ></el-option>
            </el-select>
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
  name: "WorkerManage",
  data() {
    return {
      stationDisabled: true,
      showStatus:false,
      workerList: [
        {
          workerId: 1,
          workerNickName: "No1",
          workerPassword: "2112",
          workerName: "王师傅",
          workerPhone: "17767639938",
          workerStatus: 0
        },
        {
          workerId: 2,
          workerNickName: "No2",
          workerPassword: "2112",
          workerName: "李师傅",
          workerPhone: "17767639938",
          workerStatus: 1
        },
        {
          workerId: 3,
          workerNickName: "No3",
          workerPassword: "2112",
          workerName: "徐师傅",
          workerPhone: "13223238",
          workerStatus: 1
        },
      ],
      companyList:[
        {
        companyId:"1",
        companyNickName:"No1",
        companyPassword:"123456",
        companyPhone:"1212133",
        companyName:"澳门娱乐",
        companyStatus:"0",
        companyCity:"福州",
        companyCounty:"中国",
        companyStreet:"上街",
        companyDetail:"福州大学",
        companyPrice:"21"
        },
        {
          companyId:"2",
          companyNickName:"No2",
          companyPassword:"123456",
          companyPhone:"1212133",
          companyName:"香港娱乐",
          companyStatus:"0",
          companyCity:"福州",
          companyCounty:"中国",
          companyStreet:"上街",
          companyDetail:"福州大学",
          companyPrice:"21"
        },
        {
          companyId:"3",
          companyNickName:"No3",
          companyPassword:"123456",
          companyPhone:"1212133",
          companyName:"香蕉娱乐",
          companyStatus:"2",
          companyCity:"福州",
          companyCounty:"中国",
          companyStreet:"上街",
          companyDetail:"福州大学",
          companyPrice:"21"
        },
      ],
      // workerList: [],
      // companyList:[],
      userNickname: '',
      userName: '',
      userPhone: '',
      userPassword: '',
      account: "",
      realName: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      info: {},
      status:[
        {workerStatus:"正常"},
        {workerStatus:"已离职"}
      ],
      centerDialogVisible: false,
      form: {
        workerId: "",
        workerNickName: "",
        workerName: "",
        workerPhone: "",
        workerPassword: "",
        workerStatus:""
      },
      rules: {
        workerNickName: [
          {required: true, message: "请输入昵称", trigger: "blur"},
          //   { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        workerName: [{required: true, message: "请输入姓名", trigger: "blur"}],
        workerPassword: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur"},
        ],
        workerPhone: [
          {required: true, message: "手机号不能为空", trigger: "blur"},
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
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    //删除工人
    async doDel(workerId) {
      //console.log(workerId)
      let result = await this.$API.systemAPI.deleteworker(workerId)
      if (result.data.code == "200") {
        this.getAllList();
      } else {
        alert("delete fail")
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
    },
    //将修改的行信息填入弹出框
    mod(row) {
      this.showStatus=true
      //console.log(row);
      this.centerDialogVisible = true;
      //this.stationDisabled = true;
      this.$nextTick(() => {
        //赋值到表单
        this.form.workerId = row.workerId
        this.form.workerName = row.workerName
        this.form.workerNickName = row.workerNickName
        this.form.workerPhone = row.workerPhone
        this.form.workerPassword = row.workerPassword
        this.form.workerStatus=row.workerStatus
      });
    },
    //点击新增按钮，显示弹框
    async add() {
      this.showStatus=false
      this.form.workerId="";
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.resetForm();
      });
    },
    async doMod() {
      console.log("update")
      //console.log(this.form.workerId)

      let result = await this.$API.systemAPI.updateworkerwithstatus(this.form)
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
      console.log(this.form.workerId)
      if(this.info.roleId==2){
        let result=await this.$API.systemAPI.addworker({
          companyId: this.info.companyId,
          workerNickname: this.form.workerNickName,
          workerName: this.form.workerName,
          workerPhone: this.form.workerPhone,
          workerPassword: this.form.workerPassword,
        })
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
      }
      else{
        let result=await this.$API.systemAPI.companyswithoutpage({
          workerNickname:this.form.workerNickName,
          workerName: this.form.workerName,
          workerPhone: this.form.workerPhone,
          workerPassword: this.form.workerPassword,
        })
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
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.workerId) {
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
      // let js=JSON.parse(sessionStorage.getItem("info")).roleId;
      // console.log(js)
      //roleID==2代表公司
      if(this.info.roleId==2){
        let result={
          others:"其他信息",
          data:{
            code: '200',
            message: "查询成功",
            data: [
              {
                workerId: 1,
                workerNickName: "No1",
                workerPassword: "2112",
                workerName: "王师傅",
                workerPhone: "17767639938",
                workerStatus: 0
              },
              {
                workerId: 2,
                workerNickName: "No2",
                workerPassword: "2112",
                workerName: "李师傅",
                workerPhone: "17767639938",
                workerStatus: 1
              },
              {
                workerId: 3,
                workerNickName: "No3",
                workerPassword: "2112",
                workerName: "徐师傅",
                workerPhone: "13223238",
                workerStatus: 1
              },
            ]
          }
        }
        // let result=await this.$API.systemAPI.companyworkers({
        //   companyId: this.info.roleId,
        //   page: this.page,
        //   recPerPage: this.recPerPage,
        // })
        if (result.data.code == "200") {
          this.workerList= result.data.data;
          this.total = result.data.pager.recTotal;
        }
        else{
          alert("找不到该公司的任何员工")
        }
      }
      else{
        //管理员需要选择公司
        this.getAllCompanyList()
        let result=await this.$API.systemAPI.workers({
          page: this.page,
          recPerPage: this.recPerPage,
        })
        if (result.data.code == "200") {
          this.workerList = result.data.data;
          this.total = result.data.pager.recTotal;
        }
        else{
          alert("not found")
        }
      }
    },
    async getAllCompanyList(){
      let js=JSON.parse(sessionStorage.getItem("info")).roleId;
      console.log(js)
      let result=await this.$API.systemAPI.companys({
        page: this.page,
        recPerpage: this.recPerpage,
      })
      if (result.data.code == "200") {
        console.log(result)
        this.companyList = result.data.data;
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
    //取消按钮
    quite() {
      this.centerDialogVisible = false;
      this.stationDisabled = false;
      this.form.workerId="";
    },
  },
  async beforeMount() {
    this.info = JSON.parse(sessionStorage.getItem("info"));
    this.getAllList();
  },
};
</script>

<style scoped>
</style>