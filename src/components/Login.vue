<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">家政服务系统</h1>
        <el-form :model="loginForm" label-width="100px" :rules="rules" ref="loginForm">
          <el-form-item label="账号" prop="nickname">
            <el-input style="width: 200px" type="text" v-model="loginForm.nickname" autocomplete="off"
              size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="width: 200px" type="password" v-model="loginForm.password" show-password autocomplete="off"
              size="small" @keyup.enter.native="confirm('loginForm')"></el-input>
          </el-form-item>
          <el-form-item style="display: flex">
            <el-button type="primary" @click="confirm('loginForm')" :disabled="confirm_disabled">登 录</el-button>
            <el-button type="info" @click="reset" :disabled="confirm_disabled">重 置</el-button>
          </el-form-item>
        </el-form>
        <div class="register">
          <span @click="toRegister">
            用户注册&nbsp;<i class="el-icon-position"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      confirm_disabled: false,
      loginForm: {
        nickname: "",
        password: "",
        roleId: 4,
      },
      roles: [
        {
          roleId: 1,
          roleName: "用户",
        },
        {
          roleId: 2,
          roleName: "公司",
        },
        {
          roleId: 3,
          roleName: "家政人员",
        },
        {
          roleId: 4,
          roleName: "超级管理员",
        },
      ],
      rules: {
        nickname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    async getRoleId() {
      let result = await this.$API.systemAPI.login({
        nickname: this.loginForm.nickname,
        password: this.loginForm.password
      });
      console.log(result)
      if (result.data.code == "200") {
        console.log(result);
        //这里获取并传递token保存到浏览器
        sessionStorage.setItem("token", result.data.token); 
        this.loginForm.roleId = result.data.data.roleId;
        this.$router.push("/index");
      } else {
        this.$router.replace("/");
        this.$message({
          type: "error",
          message: result.data.message,

        });
      }
    },

    async confirm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.getRoleId();
          // let jsonobj = {
            // roleId: this.loginForm.roleId,
            // object: {
              // nickname: this.loginForm.nickname,
              // password: this.loginForm.password,
              // name: this.loginForm.name,
              // phone:this.loginForm.phone,
            // },
          // }
          // sessionStorage.setItem("info", JSON.stringify(jsonobj));
          

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async reset() {
      this.loginForm = {
        nickname: "",
        password: "",
        roleId: 4,
      };
      // let result = await this.$API.loginAPI.test()
      // console.log(result)
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b3c0d1;
  background-image: url("../assets/login.png");
  background-size: cover;
  background-position: center;
  /* position: relative; */
}

.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 450px;
  height: 380px;
  background: #fff;
  border-radius: 5%;
  /* opacity: 0.8; */
}

.login-title {
  margin: 20px 0;
  text-align: center;
}

.login-content {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}

.register {
  text-align: right;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #409eff;
}
</style>