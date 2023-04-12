<template>
  <div style="
  text-align: center;
  /* background-color: #f1f1; */
  height: 100%;
  padding: 0;
  margin: 0px
">
    <h1 style="font-size: 50px">{{ user.object.nickname + "，欢迎使用！" }}</h1>
    <el-descriptions title="个人中心" :column="2" size="40" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          账号
        </template>
        {{ user.object.nickname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-phone"></i>
          电话
        </template>
        {{ user.object.phone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          真实姓名
        </template>
        {{ user.object.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          角色
        </template>
        <el-tag type="success" disable-transitions>{{
          user.roleId == 1
            ? "用户"
            : user.roleId == 2
            ? "公司"
            : user.roleId == 3
            ? "家政人员"
            : "超级管理员"
        }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <DateUtils></DateUtils>
  </div>
</template>

<script>
import DateUtils from "./DateUtils";
export default {
  name: "Home",
  components: { DateUtils },
  data() {
    return {
      user: {},
    };
  },
  computed: {},
  methods: {},
  created() {
    this.user = JSON.parse(sessionStorage.getItem("info"));
  },
};
</script>

<style scoped>
.el-descriptions {
  width: 90%;

  margin: 0 auto;
  text-align: center;
}
</style>