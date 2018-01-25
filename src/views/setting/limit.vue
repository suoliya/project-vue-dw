<template>
  <section class="wrapper">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20" style="margin-bottom:0;padding-top:5px;">取款设置</h1>
                    <h3 style="font-size:16px;margin-left:50px;">额度设置</h3>
                      <ul class="modify-ul">
                          <li>
                            <div class="inline-block"><i class="keyinput">*</i>免稽核额度设置：</div>
                            <input v-model="exempt_audit_quota.value" type="text" placeholder="5">
                            <button class="submit-button mrgL10" @click="submitBtn()">保存</button>
                          </li>
                      </ul>
                      <h3 style="font-size:16px;margin-left:50px;">流水倍数设置</h3>
                      <ul class="modify-ul">
                        <li>
                          <div class="inline-block"><i class="keyinput">*</i>存款流水倍数X：</div>
                          <input v-model="ordinary_deposit_flow_times.value" type="text" placeholder="1">
                          <button class="submit-button mrgL10" @click="submitBtn2()">保存</button>
                        </li>
                      </ul>
                  </div>
            </div>
      </div>
  </section>
</template>
<script>
import {configAll,updataConfig} from '../../service/getData'
 export default {
    data() {
      return {
          exempt_audit_quota:{
              name:'',
              value:null,
          },
          ordinary_deposit_flow_times:{
              name:'',
              value:null,
          },
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
                    if(item.name =='exempt_audit_quota'){
                        this.exempt_audit_quota.name = item.name;
                        this.exempt_audit_quota.value = item.value;
                    }else if(item.name == 'ordinary_deposit_flow_times'){
                        this.ordinary_deposit_flow_times.name = item.name;
                        this.ordinary_deposit_flow_times.value = item.value;
                    }
                })
            })
        },
        // 保存补偿金额设置
        submitBtn(){
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, '确认要保存补偿金额设置？ ')
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
                  updataConfig(this.exempt_audit_quota).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
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
        // 保存存款X
        submitBtn2(){
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, '确认要保存存款X？ ')
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
                  updataConfig(this.ordinary_deposit_flow_times).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
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
    .modify-ul{
        margin:0;
    }
    .cancel_button {
        padding: 5px 40px;
        background-color: #ccc;
        color: #fff;
        border: 0;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .mrgL10 {margin-left: 20px;}
    .submit-button{
        border-radius: 3px;
    }
</style>
