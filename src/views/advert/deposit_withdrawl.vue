<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
          <el-row>
            <h3 class="heaTitle">代理存取款</h3>
            <ul class="nav">
              <li :class="{'active':contentA==1}" @click="contentA=1">存入代理</li>
              <li :class="{'active':contentA==2}" @click="contentA=2">取款代理</li>
            </ul>
          </el-row>
           <div class="contentA" v-show="contentA==1">
              <el-form  label-width="100px" class="demo-ruleForm" ref="pushMoney">
               <el-form-item label="代理用户名" required>
                <el-select v-model="pushMoney.name" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.account"
                    :label="item.account"
                    :value="item.account">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="金额" required>
                <el-input v-model="pushMoney.money" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="备注" required>
                  <el-input v-model="pushMoney.remarks" type="textarea" :rows="2"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitBtn()">保存</el-button>
              </el-form-item>
            </el-form>
           </div>

           <div class="contentB" v-show="contentA==2">
              <el-form  label-width="100px" class="demo-ruleForm" ref="popMoney">
               <el-form-item label="代理用户名" required>
                <el-select v-model="popMoney.name" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.account"
                    :label="item.account"
                    :value="item.account">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="金额" required>
                <el-input v-model="popMoney.money" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="popBtn()">保存</el-button>
              </el-form-item>
            </el-form>
           </div>
        </div>
    </section>
</template>

<script>
import {adventList,accessMoney} from '../../service/getData'
export default {
    data() {
        return {
            contentA:'1',
            options:[],
            depositList:{
                limit:10000,
                pageNum:1,
                searchText:'',
            },
            // 存入代理
            pushMoney:{
                name:'',
                type:0,
                money:null,
                operator:null,
                payname:null,
                remarks:''
            },
            // 取出代理
            popMoney:{
                name:'',
                type:1,
                money:null,
                operator:null,
                payname:null
            },

        }
    },
    mounted() {
        this.list();
    },
    methods: {
        list () {
            adventList(this.depositList).then((res) => {
                this.options = res.data.list;
                console.log(res.data)
            })
        },
        // 存入带来
        submitBtn(){
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, '确认要存入代理？ ')
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
                  console.log(this.pushMoney.name);
                  accessMoney(this.pushMoney).then((res)=>{
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
        // 取款代理
        popBtn(){
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, '确认要取款代理？ ')
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
                  console.log(this.popMoney.name);
                  console.log(this.popMoney.money);
                  accessMoney(this.popMoney).then((res)=>{
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
   margin-bottom:60px;
   border-bottom: 1px solid #f1f2f7;
}
.heaTitle{
    padding-bottom: 10px;
    color: #333;
    font-size: 20px;
    margin-top: 5px;
}
.nav{
  font-size: 16px;
  color: #48576a;
  padding-left:20px;
}
.nav li{
  top:0;
  float:left;
  padding:0 20px;
  padding-bottom: 10px;
  margin-right: 40px;
  border-bottom:4px solid #fff;
  cursor: pointer;
}
.nav .active{
  border-bottom:4px solid red;
}
.contentA{
  width:100%;
  height:100%;
}
.el-textarea{
  width:400px;
  resize:none;
}
.el-textarea__inner{
 width:200px;
  resize:none;
  overflow:scroll;
  height:200px;
}
</style>
