<template>
    <el-card style="width: 500px;">
        <el-form label-width="80px " size="small" >
          <el-form-item label="用户名">
            <el-input v-model="form.userName" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-select v-model="form.userNickname" placeholder="请选择昵称" style="width:100%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.userPhone" autocomplete="off" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.userPassword" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">确定</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </template>
  
  <script>
  
  
//   import { person } from '../api/person'
  export default {
    name: "ModInfo",
    data(){
      return{
        form:{userNickname:'',
              userPhone:'',
              userPassword:'',
              userName:'',
  
        },
    //     options: [{
    //       value: 'user',
    //       label: '用户'
    //     }, {
    //       value: 'company',
    //       label: '公司'
    //     }, {
    //       value: 'worker',
    //       label: '工人'
    //     }, {
    //       value: 'admin',
    //       label: '管理员'
    //     }],
      }
    },
    // created() {
  
    // },
    // methods:{
    //   async save() {
    //     await person(this.form)
    //         .then((res) => {
    //           console.log('保存成功：' + res)
    //           this.$message.success('成功')
    //         })
    //         .catch((error) => {
    //           console.log('保存失败：' + error)
    //           this.$message.error('失败')
    //         })
    //   }
    // }
  
  
  }
  </script>
  
  <style scoped>
  
  </style>