<template>
  <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="height: 100%"
    default-active="/home" :collapse="isCollapse" :collapse-transition="false" router>
    <el-menu-item :index="'/index/' + item.menuClick" v-for="(item, i) in authMenu" :key="i">
      <i :class="item.menuIcon"></i>
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("info")),
      menu: [
        {
          menuClick: "home",
          menuName: "首页",
          menuIcon: "el-icon-star-off",
          auth: [1, 2, 3, 4],
        },
        {
          menuClick: "user",
          menuName: "用户管理",
          menuIcon: "el-icon-user-solid",
          auth: [4],
        },
        {
          menuClick: "worker",
          menuName: "家政人员管理",
          menuIcon: "el-icon-s-custom",
          auth: [2, 4],
        },
        {
          menuClick: "company",
          menuName: "公司管理",
          menuIcon: "el-icon-menu",
          auth: [4],
        },
        {
          menuClick: "order",
          menuName: "订单管理",
          menuIcon: "el-icon-s-management",
          auth: [1, 2, 3, 4],
        },
        {
          menuClick: "send",
          menuName: "用户下单",
          menuIcon: "el-icon-s-management",
          auth: [1,],
        }
      ],
    };
  },
  computed: {
    authMenu() {
      return this.menu.filter((item) => {
        return item.auth.indexOf(this.user.roleId) >= 0
      });
    },
  },
  methods: {

  },
  props: {
    isCollapse: Boolean,
  },
};
</script>

<style scoped></style>