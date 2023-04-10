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

    </div>

    <el-table
        :data="Orderlist"
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
            <el-form-item label="评价">
              <span>{{ props.row.order_comment }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <!-- 用户roleid：1 显示用户订单状态-->
              <el-tag v-if="info.roleId == 1 ||info.roleId == 0"
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
                      ? "已下单"
                      : props.row.order_status == 1
                      ? "已接单"
                      : props.row.order_status == 2
                          ? "已完成"
                          : "已评价"
                }}
              </el-tag>
              <!-- 公司roleid：2 显示公司订单状态-->
              <el-tag v-if="info.roleId == 2"
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
                      ? "未接单"
                      : props.row.order_status == 1
                      ? "已接单"
                      : props.row.order_status == 2
                          ? "已完成"
                          : "已评价"
                }}
              </el-tag>
              <!-- 工人roleid：3 显示工人订单状态-->
              <el-tag v-if="info.roleId == 3"
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
      <el-table-column prop="userNickName" label="雇主姓名" align="center" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="100"></el-table-column>
      <el-table-column prop="orderStartTime" label="开始时间" align="center" width="150"> </el-table-column>
      <el-table-column prop="orderFinishTime" label="结束时间" align="center" width="150"> </el-table-column>
      <el-table-column prop="address_detail" label="具体地址" align="center" width="180">
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions effect="plain">{{
              scope.row.address_detail
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order_status" label="订单状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag v-if="info.roleId == 1 ||info.roleId == 0"
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
                  ? "已下单"
                  : scope.row.order_status == 1
                  ? "已接单"
                  : scope.row.order_status == 2
                      ? "已完成"
                      : "已评价"
            }}
          </el-tag>
          <el-tag v-if="info.roleId == 2"
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
                  ? "未接单"
                  : scope.row.order_status == 1
                  ? "已接单"
                  : scope.row.order_status == 2
                      ? "已完成"
                      : "已评价"
            }}
          </el-tag>
          <el-tag v-if="info.roleId == 3"
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
          <el-button v-if="info.roleId == 3"
              :disabled="scope.row.order_status != 0"
              size="small"
              type="danger"
              @click="completeOrder(scope.row.orderId)"
          >完成订单</el-button
          >
          <el-button
              v-if="info.roleId == 1"
              :disabled="scope.row.order_comment != ''"
              size="small"
              type="primary"
              @click="rate(scope.row)"
          >评价</el-button
          >
          <el-select v-if="info.roleId == 2" v-model="selectedWorker[index]" placeholder="请选择工人" @focus="getWorkers">
            <el-option
                v-for="worker in workers"
                :key="worker.id"
                :label="worker.name"
                :value="worker.id"
            ></el-option>
          </el-select>
          <el-button v-if="info.roleId == 2" type="primary" @click="acceptOrder(scope.row, selectedWorker[index])">接单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单详情" :visible.sync="centerDialogVisible">
      <el-descriptions direction="vertical" :column="4" border size="big">
        <el-descriptions-item label="订单号">{{
            form2.orderId
          }}</el-descriptions-item>
        <el-descriptions-item label="价格"
        >{{ form2.price }}元</el-descriptions-item
        >
        <el-descriptions-item label="账户"
        >{{ form2.userNickName }}</el-descriptions-item
        >
        <el-descriptions-item label="公司名称">{{
            form2.company_name
          }}</el-descriptions-item>
        <el-descriptions-item label="地址"
        >{{ form2.address_city }}{{ form2.address_county
          }}{{ form2.address_street
          }}{{ form2.address_detail }}</el-descriptions-item
        >
        <el-descriptions-item label="下单时间">{{
            form2.orderStartTime
          }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{
            form2.order_status
          }}</el-descriptions-item>
        <el-descriptions-item label="评分">
          <el-rate v-model="form2.order_comment" :max="5"></el-rate>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
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
      Orderlist: [],
      info: {},
      workers: [],
      selectedWorker:[],
      account: "",
      realName: "",
      recPerPage: 5,
      page: 1,
      total: 0,
      centerDialogVisible: false,
      form2: {
        orderId: 1,
        userNickName: "",
        price: "",
        orderStartTime:'',
        orderFinishTime: '',
        address_city:'',
        address_county:'',
        address_street:'',
        address_detail:'',
        order_status:'',
        company_name:"",
        order_comment:""
      },
      rules: {
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields();
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
    completeOrder(orderId) {
      this.$confirm("你正在执行完成订单操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let result = await this.$API.orderAPI.finishorder(orderId);
        if (result.data.code == "200") {
        //  this.orderList=result.data.data
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
    async getWorkers(){
      this.workers=[
        { id: 1234, name: '工人1' },
        { id: 2, name: '工人2' },
        { id: 3, name: '工人3' },
      ]
      // let result = await this.$API.systemAPI.companyworkerswithoutpage({
      //   companyId: this.info.object.companyId,
      // })
      // if (result.data.code == "200") {
      //   this.workers = result.data.data;
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: result.data.message,
      //   });
      // }
    },
    async acceptOrder(row, workerId) {
      let result = await this.$API.orderAPI.acceptorder({
        orderId:row.orderId,
        workerId: workerId,
        workerName:this.workers.find((worker) => worker.id === workerId).name,
      })
      if (result.data.code == "200") {
        this.$message({
          type: "success",
          message: result.data.message,
        });
      } else {
        this.$message({
          type: "error",
          message: result.data.message,
        });
      }
      alert(`订单号为 ${row.orderId}，工人姓名为 ${this.workers.find((worker) => worker.id === workerId).name} 的工人接单成功！`);
    },
    //打开评价窗口
    rate(row) {
      //console.log(row);
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        //赋值到表单
        this.form2.orderId = row.orderId;
        this.form2.userNickName = row.userNickName;
        this.form2.price = row.price;
        this.form2.orderStartTime = row.orderStartTime;
        this.form2.orderFinishTime = row.orderFinishTime;
        this.form2.address_city = row.address_city;
        this.form2.address_county = row.address_county;
        this.form2.order_comment = row.order_comment;
      });
    },
    //保存用户评价
    async save() {
      let result = await this.$API.orderAPI.comment({
        orderId:this.form2.orderId,
        orderComment:this.form2.order_comment
      });
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
    //获取该登录用户的订单信息
    async getAllList() {
     // console.log(this.info.object.userId)
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
              company_name:"天天向上",
              order_comment:"",
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
              company_name:"澳门旅游",
              order_comment:"",
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
              company_name:"中兴",
              order_comment:"",
            },
            {
              orderId: 4,
              userNickName: "林先生",
              price: "289",
              orderStartTime:'2023-1-1',
              orderFinishTime: '2023-1-3',
              address_city:'福州',
              address_county:'闽侯',
              address_street:'上街',
              address_detail:'福州大学',
              order_status:'3',
              company_name:"澳门旅游",
              order_comment:"4",
            },
          ]
        }
      };
      if (result.data.code == "200") {
            this.Orderlist = result.data.data;
            this.total = result.data.pager.recTotal;
          }
      //用户订单列表
      // if (this.info.roleId == 1) {
      //   let result = await this.$API.orderAPI.userorders({
      //     userId:this.info.object.userId,
      //     page:this.page,
      //     recPerPage:this.recPerPage
      //   });
      //   if (result.data.code == "200") {
      //     this.Orderlist = result.data.data;
      //     this.total = result.data.pager.recTotal;
      //   }
      // } //管理员订单列表
      // else if (this.info.roleId == 0) {
      //   let result = await this.$API.orderAPI.orders({
      //     recPerPage: this.recPerPage,
      //     page: this.page,
      //   });
      //   if (result.data.code == "200") {
      //     this.Orderlist = result.data.data;
      //     this.total = result.data.pager.recTotal;
      //   }
      // }
      // //公司订单列表
      // else if (this.info.roleId == 2) {
      //   let result = await this.$API.orderAPI.companyorders({
      //     companyId: this.info.object.companyId,
      //     recPerPage: this.recPerPage,
      //     page: this.page,
      //   });
      //   if (result.data.code == "200") {
      //     this.Orderlist = result.data.data;
      //     this.total = result.data.pager.recTotal;
      //   }
      // }//工人订单列表
      // else if (this.info.roleId == 3) {
      //   let result = await this.$API.orderAPI.workerorders({
      //     workerId:this.info.object.workerId,
      //     page:this.page,
      //     recPerPage:this.recPerPage
      //   });
      //   if (result.data.code == "200") {
      //     this.Orderlist = result.data.data;
      //     this.total = result.data.pager.recTotal;
      //   }
      // }
    },
  },
  beforeMount() {
    this.getAllList();
    this.info = JSON.parse(sessionStorage.getItem("info"));
    this.selectedWorker = new Array(this.Orderlist.length).fill(null);
    //alert(this.info.roleId);
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