<template>
  <section class="wrapper">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20" style="margin-bottom:0;padding-top:5px;">存款设置</h1>
                    <h3 style="font-size:16px;margin-left:50px;">额度设置</h3>
                      <ul class="modify-ul" style="margin-top:20px;">
                          <li>
                            <div class="inline-block" style="width:165px;"><i class="keyinput">*</i>补偿金额设置：</div>
                            <el-select v-model="statusValue" placeholder="" style="width:190px;">
                                <el-option label="启用" value="0"></el-option>
                                <el-option label="停用" value="1"></el-option>
                            </el-select>
                          </li>
                          <li>
                            <div class="inline-block" style="width:165px;"><i class="keyinput">*</i>补偿金额比例：</div>
                            <el-input style="width:200px;" v-model="compensate_ratio.value" placeholder="1">
                                <template slot="append">%</template>
                            </el-input>
                          </li>
                          <li>
                            <div class="inline-block" style="width:165px;"><i class="keyinput">*</i>补偿金额上限：</div>
                            <el-input style="width:190px" v-model="compensate_limit.value" placeholder="100"></el-input>
                          </li>
                      </ul>
                      <button class="submit-button" @click="submitBtn()">保存</button>
                  </div>
            </div>
      </div>
  </section>
</template>
<script>
import {configAll,depositSetting} from '../../service/getData'
  export default {
    data() {
      return {
          compensate_limit:{
              name:'',
              value:null,
          },
          compensate_ratio:{
              name:'',
              value:null,
          },
          compensate_status:{
              name:'',
              value:null,
          },
          statusValue:null,

        };
    },
    mounted(){
        this.$nextTick(()=>{
            this.quetyList();
        })
    },
    methods: {
        quetyList(){
            configAll('').then((res)=>{
                res.data.forEach((item,index)=>{
                    if(item.name =='compensate_status'){
                        this.compensate_status.name = item.name;
                        this.compensate_status.value = item.value;
                        if(this.compensate_status.value == '0'){
                            this.statusValue = '启用';
                        }else{
                            this.statusValue = '停用';
                        }
                    }else if(item.name == 'compensate_ratio'){
                        this.compensate_ratio.name = item.name;
                        this.compensate_ratio.value = item.value;
                    }else if(item.name == 'compensate_limit'){
                        this.compensate_limit.name = item.name;
                        this.compensate_limit.value = item.value;
                    }
                })
            })
        },
        // 保存存款设置
        submitBtn(){
            if(this.statusValue == '启用'){
                this.compensate_status.value = 0;
            }else if(this.statusValue == '停用'){
                this.compensate_status.value = 1;
            }else{
                this.compensate_status.value = this.statusValue;
            }
            console.log(this.compensate_status.value);
            console.log(this.compensate_status);
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, '确认要保存取款设置？ ')
                ]),
                type:'warning',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中...';
                    setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                      }, 300);
                    }, 3000);
                  } else {
                    done();
                  }
                }
              }).then(action => {
                  let depositData = [];
                  depositData.push(this.compensate_limit);
                  depositData.push(this.compensate_ratio);
                  depositData.push(this.compensate_status);
                  console.log(depositData);
                  depositSetting(depositData).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
                          this.quetyList();
                      }else{
                          this.$message({
                            type: 'info',
                            message:res.message
                          });
                      }
                  })
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
              });
        },
    }
  };
</script>
<style scoped>
    .cancel_button {
        padding: 5px 40px;
        background-color: #ccc;
        color: #fff;
        border: 0;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .mrgL10 {margin-left: 20px;}
    .modify-ul .el-input__inner{
        width: 100% !important;
    }
    .submit-button{
        border-radius: 3px;
    }
</style>
