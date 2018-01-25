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
      var nowyear=parseInt(new Date().getFullYear());
      var nowmonth=parseInt(new Date().getMonth());
      var nowday=parseInt(new Date().getDate());
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
        value4:[new Date(nowyear,nowmonth,nowday,0,0,0), new Date(nowyear,nowmonth,nowday,23,59,59)],
      };
    },
    props: {
      timeArea: {
        type: Object
      }
    },
    computed: {

    },
    watch:{
      value4() {
        this.$emit('timeValue', this.value4);
      },
      timeArea(){

        this.value4 = this.timeArea;
      }
    },

  };
</script>

