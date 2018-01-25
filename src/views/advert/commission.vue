<template>
    <section class="wrapper">
        <el-row class="bg-white" style="margin-left:5px;margin-right:5px;">
            <el-col :span="24" class="header_dl">
                <h3>代理佣金设置</h3>
            </el-col>
            <el-form :label-position="labelPosition" :model="formLabelAlign" :inline="true" ref="formLabelAlign" label-width="165px">
                <el-col :span="12" :offset="2">
                    <h5 class="smHeader_dl">广告代理设置</h5>
                    <el-form-item label="总计活跃玩家：" prop="coustomnumber" :rules="[{ required: true, message: '请输入总计活跃玩家'},]">
                      <el-input v-model="formLabelAlign.coustomnumber" size="small">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="每个玩家最少存款：" prop="mintotalbetting" :rules="[{ required: true, message: '请输入每个玩家最少存款'},]">
                      <el-input v-model="formLabelAlign.mintotalbetting" size="small"></el-input>
                      <!-- <span>活跃玩家:当月完成大于或等于所有要求的存款和投注额</span> -->
                    </el-form-item>
                    <el-form-item label="默认代理百分比：" prop="commissionrate" :rules="[{ required: true, message: '请输入默认代理百分比'},]">
                      <el-input v-model="formLabelAlign.commissionrate" size="small">
                          <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="最低投注金额：" prop="mintoaldeposit" :rules="[{ required: true, message: '请输入最低投注金额'},]">
                      <el-input v-model="formLabelAlign.mintoaldeposit" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="centerBox"></el-col>
                <el-col :span="12" :offset="2">
                    <h5 class="smHeader_dl">下级代理佣金设置</h5>
                    <el-form-item label="下级给上级的百分比：" prop="subagentrate" :rules="[{ required: true, message: '请输入下级代理百分比'},]">
                      <el-input v-model="formLabelAlign.subagentrate" size="small">
                          <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label=" 一级代理百分比：" prop="commission" :rules="[{ required: true, message: '请输入代理百分比'},]">
                      <el-input v-model="formLabelAlign.commission" size="small">
                          <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-col :span="12" :offset="8">
                        <el-form-item>
                           <el-button type="warning" @click="submitBtn()">保存</el-button>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
        </el-row>
    </section>
</template>

<script>
import {getCommission,setCommission} from '../../service/getData'
export default {
    data(){
        return{
            labelPosition: 'right',
            formLabelAlign: {
                "coustomnumber":'', //活跃用户数
                "mintotalbetting":'' ,//最第投注金额
                "mintoaldeposit": '',//最低充值金额
                "commissionrate": '',// 一级代理佣金百分比
                "subagentrate": '',//二级代理佣金百分比
                "commission":''//一级代理对二级代理百分比
            },

        }
    },
    mounted(){
        this.list();
    },
    methods:{
        list () {
            getCommission('').then((res) => {
                this.formLabelAlign = res.data;
                console.log(res.data)
            })
        },
        submitBtn () {
            this.$refs.formLabelAlign.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.formLabelAlign);
                  setCommission(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '设置成功！',
                         });
                     }else{
                         this.$message({
                             type: 'info',
                             message: res.message
                         });
                     }
                })
              }
            })
        },
    }

}
</script>

<style scoped>
    .bg-white{
        background-color: #fff;
    }
    .header_dl{
        width: 92%;
        margin:0 30px;
        margin-left: 20px;
        border-bottom:1px solid #D8D5D0;
    }
    .header_dl>h3{
        /*padding-top:10px;*/
        padding-bottom: 10px;
        font-size: 20px;
        color: #333;
    }
    .smHeader_dl{
        font-size: 16px;
        color: #333;
        padding-top: 2%;
        padding-bottom: 4%;
        font-size: bold;
    }
    .centerBox{
        width:100%;
        height:16px;
        background-color:#DEDEDE;
    }

    .el-form-item{
        margin-bottom: 10px;
    }
    .el-form-item__label{
        font-weight: normal;
    }
    label{font-weight: normal;}
</style>
