<template>
  <el-select v-model="selectvalue" placeholder="请选择">
    <el-option
      v-for="item in selectlist"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    props: {
      selectlist: {
        type: Array
      },
      selectvalue:''
    },
  }
</script>
