<template>
<div class="inline datetime_bar">
  <el-date-picker
    v-model="value4"
    type="datetimerange"
    :picker-options="pickerOptions2"
    placeholder="选择时间范围" 
    align="right">
  </el-date-picker>
</div>
</template>

<script>
  export default {
    data() {

      return {

        pickerOptions2: {
          shortcuts: [

          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],
        },
        value4:'',
      };
    },
    watch:{
      value4() {
        this.$emit('timeValue', this.value4);
      }
    },

  };
</script>
