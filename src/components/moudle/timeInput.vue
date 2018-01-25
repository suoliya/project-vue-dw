<template>
<div class="inline">
  <el-date-picker
    v-model="value2"
    type="datetime"
    placeholder="选择日期时间"
    align="right"
    :picker-options="pickerOptions1">
  </el-date-picker>
</div>
</template>

<script>
 export default {
   data() {
     return {
       pickerOptions1: {
         shortcuts: [{
           text: '今天',
           onClick(picker) {
             picker.$emit('pick', new Date());
           }
         }, {
           text: '昨天',
           onClick(picker) {
             const date = new Date();
             date.setTime(date.getTime() - 3600 * 1000 * 24);
             picker.$emit('pick', date);
           }
         }, {
           text: '一周前',
           onClick(picker) {
             const date = new Date();
             date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
             picker.$emit('pick', date);
           }
         }]
       },
       value1: '',
       value2: ''
     };
   }
 };
</script>
<style type="text/css">
  .datetime_bar .el-button.is-plain:focus, .datetime_bar .el-button.is-plain:hover{

  }
  .datetime_bar .el-button--default{
      border:1px solid #d8dce5;
      color: #5a5e66;
      padding: 12px 20px;
      border-radius: 4px;
  }
</style>
