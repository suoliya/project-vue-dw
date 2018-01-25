
<template>
<div class="inline">
<el-date-picker
  v-model="value1"
  type="date"
  placeholder="选择日期时间">
</el-date-picker>
</div>
</template>

<script>
 export default {
   data() {
     return {
        value1:null,
     };
   },
   props: {
     timeSet: {
       type: Object
     }
   },
   watch:{
     timeSet(){
       this.value1 = this.timeSet;
     }
   },
 };
</script>
