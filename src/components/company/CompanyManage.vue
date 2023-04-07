<template>
  <!-- 显示列表 -->
  <el-main>
    <div style="margin-bottom: 5px">
      <el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="width: 200px" />
      <el-button size="small" style="margin-left: 5px" @click="getAllList">查询</el-button>
      <el-button size="small" style="margin-left: 5px" @click="add">新增</el-button>
    </div>

    <el-table :data="tableData" border max-height="250" :header-cell-style="{ background: '#f2f5fc', color: '#555555' }">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id">
      </el-table-column>
      <el-table-column label="商品名称" prop="name">
      </el-table-column>
      <el-table-column label="描述" prop="desc">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :current-page="currentPage" :page-sizes="[5, 10, 50, 100]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>



    <!-- 新增的弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width: 200px"></el-input>

        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </el-main>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "CompanyManage",
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      total: 50, // 总数据条数
      pageSize: 10, // 每页显示的数据条数
      currentPage: 1, // 当前页码
      // dataList: [], // 数据列表
      search: [],

      // dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        account: "",
        name: "",
        region: "",
        stationId: "",
        phone: "",
        sex: 1,
      }


    }
  },
  // computed: {
  //   pageData() {
  //     return this.tableData.slice(
  //       (this.currentPage - 1) * this.pageSize,
  //       this.currentPage * this.pageSize
  //     )
  //   },
  // },

  methods: {
    // 删除方法
    deleteRow(index, rows) {
      rows.splice(index, 1);
      // 在控制台输出删除元素的id
      console.log(this.tableData[index]["id"])
      alert(this.tableData[index]["id"])
    },
    add() {
      this.dialogTableVisible = true;
      this.dialogFormVisible = true
    }

  }

}



</script>

<style scoped>
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