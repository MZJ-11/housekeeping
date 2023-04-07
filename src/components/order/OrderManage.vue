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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号">
              <span>{{ props.row.orderId }}</span>
            </el-form-item>
            <el-form-item label="所属公司">
              <span>{{ props.row.company_name }}</span>
            </el-form-item>
            <el-form-item label="省">
              <span>{{ props.row.address_city }}</span>
            </el-form-item>
            <el-form-item label="市">
              <span>{{ props.row.address_county }}</span>
            </el-form-item>
            <el-form-item label="区">
              <span>{{ props.row.address_street }}</span>
            </el-form-item>
            <el-form-item label="具体地址">
              <span>{{ props.row.address_detail }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag
                  :type="
                 props.row.order_status == 0
                ? 'info'
                : props.row.order_status == 1
                ? 'primary'
                : props.row.order_status == 2
                ? 'warning'
                : 'success'
            "
                  disable-transitions
              >{{
                  props.row.order_status == 0
                      ? "已派遣"
                      : props.row.order_status == 1
                          ? "已完成"
                          : props.row.order_status == 2
                              ? "已评价"
                              : "已送达"
                }}
              </el-tag>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="orderId" label="订单ID" align="center" width="60"> </el-table-column>
      <el-table-column prop="userNickName" label="雇主姓名" align="center" width="150"></el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="150"></el-table-column>
      <el-table-column prop="orderStartTime" label="开始时间" align="center" width="180"> </el-table-column>
      <el-table-column prop="orderFinishTime" label="结束时间" align="center" width="180"> </el-table-column>
      <el-table-column prop="address_detail" label="具体地址" align="center" width="180">
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions effect="plain">{{
              scope.row.address_detail
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order_status" label="订单状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag
              :type="
                 scope.row.order_status == 0
                ? 'info'
                : scope.row.order_status == 1
                ? 'primary'
                : scope.row.order_status == 2
                ? 'warning'
                : 'success'
            "
              disable-transitions
          >{{
                   scope.row.order_status == 0
                      ? "已派遣"
                      : scope.row.order_status == 1
                          ? "已完成"
                          : scope.row.order_status == 2
                              ? "已评价"
                              : "已送达"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
              :disabled="scope.row.order_status != 0"
              size="small"
              type="danger"
              @click="completeOrder(scope.row.orderId)"
          >完成订单</el-button
          >
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
  </div>
</template>

<script>
export default {
  name: "OrderManage",
  data() {
    return {
        userList: [ ],
      account: "",
      realName: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      workerId: JSON.parse(sessionStorage.getItem("info")).object.workerId,
      centerDialogVisible: false,
      form: {
        account: "",
        realName: "",
        password: "",
        phone: "",
        sex: 1,
      },
      rules: {

      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields();
    },
    completeOrder(orderId) {
      this.$confirm("你正在执行完成订单操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let result = await this.$API.orderAPI.finishorder(orderId);
        if (result.data.code == "200") {
          await this.getAllList();
          this.$message({
            type: "success",
            message: "完成订单成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: result.data.message,
          });
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
    //获取该登录工人的所有信息
    async getAllList() {
      // let result = await this.$API.orderAPI.selcetOrdersByWorker({
      //   workerId:this.workerId,
      //   page:this.page,
      //   recPerPage:this.recPerPage
      // });
      let result = {
       data:{
         code:"200",
         message:'查询成功',
         data:[
           {
             orderId: 1,
             userNickName: "徐先生",
             price: "1212",
             orderStartTime:'2023-1-1',
             orderFinishTime: '2023-1-3',
             address_city:'福州',
             address_county:'闽侯',
             address_street:'上街',
             address_detail:'福州大学',
             order_status:'0',
             company_name:"天天向上"
           },
           {
             orderId: 2,
             userNickName: "林先生",
             price: "289",
             orderStartTime:'2023-1-1',
             orderFinishTime: '2023-1-3',
             address_city:'福州',
             address_county:'闽侯',
             address_street:'上街',
             address_detail:'福州大学',
             order_status:'1',
             company_name:"澳门旅游"
           },
           {
             orderId: 3,
             userNickName: "李先生",
             price: "289",
             orderStartTime:'2023-1-1',
             orderFinishTime: '2023-1-3',
             address_city:'福州',
             address_county:'闽侯',
             address_street:'上街',
             address_detail:'福建农林大学',
             order_status:'2',
             company_name:"中兴"
           },
         ]
       }
      };
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
  },
  beforeMount() {
    this.getAllList();
  },
};
</script>

<style scoped>
</style>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>