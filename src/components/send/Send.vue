<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input
          v-model="companyName"
          placeholder="公司名称"
          suffix-icon="el-icon-search"
          style="width: 200px"
          @keyup.enter.native="getAllList"
      ></el-input>
      <el-input
          v-model="lowPrice"
          placeholder="最低价格"
          suffix-icon="el-icon-search"
          style="width: 200px"
          @keyup.enter.native="getAllList"
      ></el-input>
      <el-input
          v-model="highPrice"
          placeholder="最高价格"
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
        :data="companyList"
        :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
        border
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="公司昵称">
              <span>{{ props.row.company_nickname }}</span>
            </el-form-item>
            <el-form-item label="公司电话">
              <span>{{ props.row.company_phone }}</span>
            </el-form-item>
            <el-form-item label="省">
              <span>{{ props.row.company_city }}</span>
            </el-form-item>
            <el-form-item label="市">
              <span>{{ props.row.company_county }}</span>
            </el-form-item>
            <el-form-item label="区">
              <span>{{ props.row.company_street }}</span>
            </el-form-item>
            <el-form-item label="具体地址">
              <span>{{ props.row.company_detail }}</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>{{ props.row.company_name }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.company_price }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="company_nickname" label="公司昵称" align="center" width="60"> </el-table-column>
      <el-table-column prop="company_phone" label="公司电话" align="center" width="150"></el-table-column>
      <el-table-column prop="company_city" label="省" align="center" width="150"></el-table-column>
      <el-table-column prop="company_county" label="市" align="center" width="180"> </el-table-column>
      <el-table-column prop="company_street" label="区" align="center" width="180"> </el-table-column>
      <el-table-column prop="company_detail" label="具体地址" align="center" width="180">
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions effect="plain">{{
              scope.row.company_detail
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="company_price" label="价格" align="center" width="180"> </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="add(scope.row)"
                    >下单</el-button
                    >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="下单" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.userNickname" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phoneSend" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="用户住址">
          <v-distpicker
              @province="onChangeProvinceSend"
              @city="onChangeCitySend"
              @area="onChangeAreaSend"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.addressDetail" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
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
import VDistpicker from 'v-distpicker'
export default {
  components: {
    VDistpicker,
  },
  name: "Send",
  data() {
    return {
      companyList: [ ],
      city:'',
      county:'',
      street:'',
      lowPrice:'',
      highPrice:'',
      companyName:'',
      companyId:'',
      orderPrice:'',
      recPerPage: 5,
      page: 1,
      total: 0,
      userId: JSON.parse(sessionStorage.getItem("info")).object.userId,
      centerDialogVisible: false,
      form: {
        userNickname: '',
        phoneSend: '',
        addressCity: '',
        addressCounty: '',
        addressStreet: '',
        addressDetail: ''
      },
      rules: {
        userNickname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phoneSend: [{ required: true, message: '请输入电话', trigger: 'blur' },],
        addressCity: [{ required: true, message: '请选择所在省份', trigger: 'change' }],
        addressCounty: [{ required: true, message: '请选择所在城市', trigger: 'change' }],
        addressStreet: [{ required: true, message: '请选择所在区县', trigger: 'change' }],
        addressDetail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
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
      this.companyName = "";
      this.lowPrice = "";
      this.highPrice = "";
      this.getAllList();
    },
    onChangeProvinceSend(val) {
      this.form.addressCity = val.value;
    },
    onChangeCitySend(val) {
      this.form.addressCounty = val.value;
    },
    onChangeAreaSend(val) {
      this.form.addressStreet = val.value;
    },
    add(row) {
     // alert(row.company_id)
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.companyId = row.company_id;
        this.orderPrice = row.company_price;
        this.resetForm();
      });
    },
    async save() {
      let result = await this.$API.orderAPI.addorder({
        userId: this.userId,
        userNickname: this.form.userNickname,
        companyId: this.companyId,
        orderPrice: this.orderPrice,
        addressCity: this.form.addressCity,
        addressCounty: this.form.addressCounty,
        addressStreet: this.form.addressStreet,
        addressDetail: this.form.addressDetail,
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
    //获取公司信息
    async getAllList() {
      // let result = await this.$API.systemAPI.companys({
      //   city:this.city,
      //   county:this.county,
      //   street:this.street,
      //   lowPrice:this.lowPrice,
      //   highPrice:this.highPrice,
      //   companyName:this.companyName,
      //   recPerPage: this.recPerPage,
      //   page: this.page,
      // })
      let result = {
        data:{
          code:"200",
          message:'查询成功',
          data:[
            {
              company_id:"1",
              company_nickname:"小当家",
              company_password:"123435",
              company_phone:"17302213225",
              company_name:"福寿集团",
              company_status:"0",
              company_city:"福建省",
              company_county:"三明市",
              company_street:"三元区",
              company_detail:"城关",
              company_price:"1500"
            },
            {
              company_id:"2",
              company_nickname:"大当家",
              company_password:"123435",
              company_phone:"17302213225",
              company_name:"福寿集团",
              company_status:"0",
              company_city:"天津市",
              company_county:"天津市",
              company_street:"北辰区",
              company_detail:"河工大",
              company_price:"2000"
            },
          ]
        }
      };
      if (result.data.code == "200") {
       // console.log(result)
        this.companyList = result.data.data;
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