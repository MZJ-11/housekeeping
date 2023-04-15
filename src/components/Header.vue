<template>
  <div class="header" style="display: flex; line-height: 60px">
    <div style="margin-top: 8px">
      <i
        :class="icon"
        style="font-size: 20px; cursor: pointer"
        @click="collapse"
      ></i>
    </div>
    <div style="flex: 1; text-align: center; font-size: 34px">
      <span>家政服务系统</span>
    </div>
    <el-dropdown>
      <span
        >账号：{{ user.object.nickname }}<i class="el-icon-arrow-down" style="margin-left: 5px"></i
      ></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="toMod">修改个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="昵称" prop="userNickname">
          <el-col :span="20">
            <el-input v-model="form.userNickname"></el-input>
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
        <el-form-item label="省" prop="Street"  v-if="user.roleId==2">
          <el-col :span="20">
            <el-input v-model="form.companyStreet"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="市" prop="city"  v-if="user.roleId==2">
          <el-col :span="20">
            <el-input v-model="form.companyCity"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="县" prop="County"  v-if="user.roleId==2">
          <el-col :span="20">
            <el-input v-model="form.companyCounty"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="具体地址" prop="Detail"  v-if="user.roleId==2">
          <el-col :span="20">
            <el-input v-model="form.companyDetail"></el-input>
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
  name: "Header",
  data() {
    return {
      centerDialogVisible:false,
      user: JSON.parse(sessionStorage.getItem("info")),
      form:{
        userId:'',
        userNickname:'',
        userName:'',
        userPhone:'',
        userPassword:'',
        companyDetail: "",
        companyStreet: "",
        companyCity: "",
        companyCounty: "",
      },
      rules: {
        userNickname: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入站点名字", trigger: "blur" },
        ],
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
  props: {
    icon: String,
  },
  methods: {
    toUser() {
      console.log("to_user");

      this.$router.push("/index/home");
    },
    toMod() {
      this.centerDialogVisible =true;
      //1代表用户
      if(this.user.roleId==1){
        this.form.userId=this.user.object.userId
        this.form.userNickname=this.user.object.userNickname
        this.form.userName=this.user.object.userName
        this.form.userPassword=this.user.object.userPassword
        this.form.userPhone=this.user.object.phone
      }
      else if(this.user.roleId==2){
        this.form.userId=this.user.object.companyId
        this.form.userNickname=this.user.object.companyNickname
        this.form.userName=this.user.object.companyName
        this.form.userPassword=this.user.object.companyPassword
        this.form.companyDetail=this.user.object.companyDetail
        this.form.companyStreet=this.user.object.companyStreet
        this.form.companyCity=this.user.object.companyCity
        this.form.companyCounty=this.user.object.companyCounty
        this.form.userPhone=this.user.object.phone
      }
      else if(this.user.roleId==3){
        this.form.userId=this.user.object.workerId
        this.form.userNickname=this.user.object.workerNickName
        this.form.userName=this.user.object.workerName
        this.form.userPassword=this.user.workerPassword
        this.form.userPhone=this.user.object.phone
      }
      else{
        this.form.userId=this.user.object.id
        this.form.userNickname=this.user.object.nickname
        this.form.userName=this.user.object.name
        this.form.userPassword=this.user.object.password
        this.form.userPhone=this.user.object.phone
      }
    },
    async save() {
      this.$refs.form.validate(async (valid) => {
        if(valid) {
          if (this.user.roleId == 1) {
            let result = await this.$API.systemAPI.updateuser({
              userId: this.form.userId,
              userNickname: this.form.userNickname,
              userName: this.form.userName,
              userPhone: this.form.userPhone,
              userPassword: this.form.userPassword,
            })
            if (result.data.code == "200") {
              alert("修改个人信息成功,请重新登录")
              this.$router.push("/");
              this.quite()
            } else {
              alert("修改个人信息失败")
              this.$message({
                type: "error",
                message: result.data.message,
              });
            }
          } else if (this.user.roleId == 2) {
            let result = await this.$API.systemAPI.updatecompany({
              companyId: this.form.userId,
              companyNickname: this.form.userNickname,
              companyPassword: this.form.userPassword,
              companyPhone: this.form.userPhone,
              companyCity: this.form.companyCity,
              companyName: this.form.userName,
              companyCounty: this.form.companyCounty,
              companyStreet: this.form.companyStreet,
              companyDetail: this.form.companyDetail,
              companyPrice: this.form.companyPrice,
            })
            if (result.data.code == "200") {
              alert("修改公司信息成功,请重新登录")
              this.$router.push("/");
              this.quite()
            } else {
              alert("修改公司信息失败")
              this.$message({
                type: "error",
                message: result.data.message,
              });
            }

          } else if (this.user.roleId == 3) {
            let result = await this.$API.systemAPI.updateworker({
              workerId: this.form.userId,
              workerNickname: this.form.userNickname,
              workerName: this.form.userName,
              workerPhone: this.form.userPhone,
              workerPassword: this.form.userPassword
            })
            if (result.data.code == "200") {
              alert("修改工人信息成功,请重新登录")
              this.$router.push("/");
              this.quite()
            } else {
              alert("修改工人信息失败")
              this.$message({
                type: "error",
                message: result.data.message,
              });
            }
          } else {
            let result = await this.$API.systemAPI.updateadmin({
              adminId: this.form.userId,
              adminNickname: this.form.userNickname,
              adminName: this.form.userName,
              adminPhone: this.form.userPhone,
              adminPassword: this.form.userPassword,
            })
            // let result = {
            //   data: {
            //     code: 400
            //   }
            // }
            if (result.data.code == "200") {
              alert("修改个人信息成功,请重新登录")
              this.$router.push("/");
              this.quite()
            } else {
              alert("修改个人信息失败")
              this.$message({
                type: "error",
                message: result.data.message,
              });
            }
          }
        }
        else{
          this.$message({
            type: "error",
          });
        }
      });
    },
    logout() {
      this.$confirm("您确定要退出登录吗?", "提示", {
        confirmButtonText: "确定", //确认按钮的文字显示
        type: "warning",
        center: true, //文字居中显示
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出登录成功",
          });

          this.$router.push("/");
          sessionStorage.clear();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },
    collapse() {
      this.$emit("doCollapse");
    },
    quite() {
      this.centerDialogVisible = false;
      this.stationDisabled = false;
    },
  },
};
</script>

<style scoped>
</style>