<template>
<el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
          type="selection"
          width="55">
        </el-table-column>
    <el-table-column
      fixed
      prop="level"
      label="用户等级"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="qq"
      label="微信/QQ"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="150">
    </el-table-column>
    <el-table-column
          prop="email"
          label="邮箱"
          width="150">
    </el-table-column>
    <el-table-column
          prop="date"
          label="注册时间"
          width="150">
    </el-table-column>
    <el-table-column
          prop="ip"
          label="登录IP"
          width="300">
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">踢出</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:'tablebarItem',
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(){

      }
    },

    data() {
      return {
        tableData3: [{
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        },
        {
          level:'10',
          date: '2016-05-03',
          name: 'Vincet',
          username: '王小虎',
          gender: '男',
          qq: '221133',
          phone: '13589334477',
          ip: '12.31.22.41'
        }]
      }
    }
  }
</script>
