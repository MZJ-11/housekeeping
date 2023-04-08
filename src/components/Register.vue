<template>
  <div class="registerBody">
    <div class="registerDiv">
      <h1 class="register-title">用户注册</h1>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">立即注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="login">
        <span @click="toLogin">
          <i class="el-icon-refresh-right"></i>&nbsp;返回登录
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        nickname: "",
        password: "",
        name: "",
        phone: "",
        roleId: 1, //写死，注册只能是普通用户
      },
      rules: {
        nickname: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result = await this.$API.userAPI.register(this.registerForm);
          console.log(result);
          if (result.data.code == "200") {
            console.log(this.registerForm);
            this.$message({
              type: "success",
              message: "注册成功",
            });
            this.$router.replace("/");
          } else {
            this.$message({
              type: "danger",
              message: "网络开小差，请重试！",
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请按要求填写信息！",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.registerBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b3c0d1;
  background-image: url("../assets/login.png");
  background-size: cover;
  background-position: center;
}

.registerDiv {
  position: absolute;
  margin-top: 1%;
  margin-left: 20%;
  /* width: 400px; */
  /* height: 250px; */
  width: 40%;
  height: 60%;
  padding: 3%;
  background: #fff;
  border-radius: 2%;
}

.register-title {
  margin: 20px 0;
  text-align: center;
}

.login {
  text-align: right;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #409eff;
  font-size: 20px;
}

.demo-ruleForm {
  padding: 5% 5%;
}
</style>