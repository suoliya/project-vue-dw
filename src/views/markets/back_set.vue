<template>
    <section class="wrapper">
        <div class="content">
          <el-row>
              <h3 class="heaTitle">返水周期设置</h3>
              <p class="ml55">最后一次支付返水：<i class="font-orange f20">{{ backSetData.lastPayReturn}}</i></p>
          </el-row>

           <div class="contentA ml55 fs_box mt20" >
              <el-form  label-width="100px" class="demo-ruleForm ">
                  <el-form-item label="开始天数：" >
                  <div class="el-input" style="width: 193px;"><input type="text" class="date el-input__inner" v-model="setBactSetQuery.beforeDay"/></div>
              </el-form-item>


              <el-form-item label="开始时间" >
                <time-input ref="startTime" style="width: 193px;"></time-input>
              </el-form-item>

              <el-form-item label="结束时间">
                <time-input ref="endTime" style="width: 193px;"></time-input>
              </el-form-item>
              <el-form-item label="支付时间">
                <time-input ref="payTime" style="width: 193px;"></time-input>
              </el-form-item>
              <el-form-item>
                <el-button  @click="setCancel">取消</el-button>
                <el-button type="primary" @click="subBackSet">确定</el-button>
              </el-form-item>

            </el-form>
           </div>

        </div>
    </section>
</template>

<script>
import timeInput from '../../components/moudle/timeInput.vue'
import { marketLastBackSet,marketAddBackSet } from '../../service/getData'
import {getFormtDate,getDateToTimes } from '../../config/mUtils'

export default {
    components: {
      timeInput,
    },
    created(){
      this.getLastData();
    },
    data() {
        return {
          backSetData:null,
          listQuery: {
            pageNum: 1,
            limit: 1,
          },
          setBactSetQuery: {
            beforeDay:null,
            beginTime:null,
            endTime:null,
            payTime:null,
            lastPayReturn:null
          }
        }
    },
    methods: {
      getLastData() {
        marketLastBackSet(this.listQuery).then((res) => {
            this.backSetData = res.data.list[0];
            this.setBactSetQuery.lastPayReturn = getDateToTimes(this.backSetData.lastPayReturn);
        });

      },
      subBackSet() {
        this.setBactSetQuery.beginTime = getDateToTimes(getFormtDate(this.$refs.startTime.value2));
        this.setBactSetQuery.endTime = getDateToTimes(getFormtDate(this.$refs.endTime.value2));
        this.setBactSetQuery.payTime = getDateToTimes(getFormtDate(this.$refs.payTime.value2));
        marketAddBackSet(this.setBactSetQuery).then((res) => {
            if(res.status){
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
            }else{

              this.$message.error(res.message);
            }
        });
      },
      setCancel() {
        this.setBactSetQuery.beforeDay = '';
        this.$refs.startTime.value2 = '';
        this.$refs.endTime.value2 = '';
        this.$refs.payTime.value2 = '';
      }

      
    },
}

</script>

<style scoped>
.content{
    padding:0 47px;
    padding-top: 12px;
    background-color: #fff;
    height:100%;
}
.el-row{
   margin-bottom:10px;
   border-bottom: 1px solid #f1f2f7;
}
.heaTitle{
    padding-bottom: 26px;
    color: #333;
}
.nav{
  font-size: 16px;
  color: #48576a;
  padding-left:20px;
}
.nav li{
  top:0;
  float:left;
  padding:0 10px;
  border-bottom:4px solid #fff;
}
.nav li:active{
  border-bottom:4px solid red;
}
.contentA{
  width:100%;
  height:100%;
}
.el-textarea{
  width:400px;
  resize:none;

  height:200px;
}
.el-textarea__inner{
 width:200px;
  resize:none;
  overflow:scroll;
  height:200px;
}
</style>
