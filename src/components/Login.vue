<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">快递配送系统</h1>
        <el-form
          :model="loginForm"
          label-width="100px"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              style="width: 200px"
              type="text"
              v-model="loginForm.account"
              autocomplete="off"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              style="width: 200px"
              type="password"
              v-model="loginForm.password"
              show-password
              autocomplete="off"
              size="small"
              @keyup.enter.native="confirm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-select
              v-model="loginForm.roleId"
              placeholder="请选择身份"
              style="width: 200px"
            >
              <el-option
                v-for="item in roles"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="display: flex">
            <el-button
              type="primary"
              @click="confirm('loginForm')"
              :disabled="confirm_disabled"
              >登 录</el-button
            >
            <el-button type="info" @click="reset" :disabled="confirm_disabled"
              >重 置</el-button
            >
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
        account: "A2022002",
        password: "123456",
        roleId: 0,
      },
      roles: [
        {
          roleId: 0,
          roleName: "超级管理员",
        },
        {
          // 原来是快递站
          roleId: 1,
          roleName: "公司", 
        },
        {
          // 原来是快递员
          roleId: 2,
          roleName: "工人",
        },
        {
          roleId: 3,
          roleName: "用户",
        },
      ],
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    async confirm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let jsonobj = {
            roleId: this.loginForm.roleId,
            object: {
              account: this.loginForm.account,
              password: this.loginForm.password,
              realName: "刘建成",
              sex: 1,
              phone: "1234567890",
            },
          }
          sessionStorage.setItem("info", JSON.stringify(jsonobj));
          this.$router.push("/index");

          // let jsonobj = {
          //   roleId: this.loginForm.roleId,
          //   object: {
          //     account: this.loginForm.account,
          //     password: this.loginForm.password,
          //     realName: "刘建成",
          //     sex: 1,
          //     phone: "1234567890",
          //   },
          // };
          // sessionStorage.setItem("info", JSON.stringify(jsonobj));
          // this.$router.push("/index");

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async reset() {
      this.loginForm = {
        account: "",
        password: "",
        roleId: 0,
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