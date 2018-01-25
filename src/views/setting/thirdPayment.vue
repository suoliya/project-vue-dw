<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
            <div class="" style="overflow:hidden;margin-top:5px;">
                <h3 class="heaTitle">第三方支付</h3>
                <div class="" style="float:right;margin-left:30px;">
                    <a class="create-trade" style="" @click="dialogFormVisible = true"><i class="el-icon-edit mr10 mt"></i>增加支付</a>
                </div>
                <div class="inline fr search-box search-box2" style="margin-bottom:30px;height:37px;">
                    <input type="text" placeholder="支付平台名称"  v-model="paymentList.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                    <div  class="inline" v-if="paymentList.searchText==null">
                        <i class="el-icon-search" style="font-size:12px;"></i>
                    </div>
                    <div  class="inline" v-else @click="handleFilterClose">
                        <i class="el-icon-close" style="font-size:12px;"></i>
                    </div>
                    <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleIconClick()">搜索</div>
                </div>
            </div>

            <div class="table_container">
                <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="id"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="provider"
                  label="支付平台英文名称"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="providerName"
                  label="支付平台中文名称 "
                  width="">
                    <!-- <template scope="scope">
                        <span>{{fromDate(scope.row.createdAt)}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column
                  prop=""
                  label="操作"
                  width="">
                  <template slot-scope="scope">
                      <el-button v-if="scope.row.status==0" type="info" size="small" @click="amendStatus(scope.row.id,scope.row.status)">停用</el-button>
                      <el-button v-if="scope.row.status==1" type="success" size="small" @click="amendStatus(scope.row.id,scope.row.status)">启用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="paymentList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="paymentList.limit"
                    :total="total">
                </el-pagination>
            </div>

            <!-- 弹窗 -->
            <div class="openWindow">
                <el-dialog title="增加支付" :visible.sync="dialogFormVisible" size="small">
                        <el-form :model="addContent" ref="addContent">
                            <el-form-item label="支付平台英文名称:" label-width="140px" prop="provider" :rules="[
                              { required: true, message: '请输入支付平台英文名称'}
                            ]" style="margin-bottom:25px;">
                                <el-input v-model="addContent.provider" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :model="addContent" ref="addContent">
                            <el-form-item label="支付平台中文名称:" label-width="140px" prop="providerName" :rules="[
                              { required: true, message: '请输入支付平台中文名称'}
                            ]">
                                <el-input v-model="addContent.providerName" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addContent1()">增加</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>

<script>
import {addPayProvider,queryPayProvider,changePayProvider} from '../../service/getData'
import {getTimeDate} from '../../config/mUtils'
export default {
    components: {

    },
    data() {
        return {
            tableData:[],
            total:null,
            paymentList:{
                searchText:null,
                limit:10,
                pageNum:1
            },
            paymentStatus:{
                id:'',
                status:null,
            },
            addContent:{
                provider:'',
                providerName:''
            },
            dialogFormVisible:false,

        }
    },
    mounted () {
        this.list();
    },
    methods: {
        handleIconClick() {
            this.list();
        },
        handleFilterClose(){
          this.paymentList.searchText = null;
          this.list();
        },
        handleSizeChange(val) {
            this.paymentList.limit = val;
            this.list();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.paymentList.pageNum = val;
            this.list();
            console.log(`当前页: ${val}`);
        },
        list () {
            queryPayProvider(this.paymentList).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(this.total);
                console.log(res.data.list);
            })
        },
        // 修改ip状态
        amendStatus(ipId,status){
            var amendText = '';
            if(status == 0){
                amendText = "确定要停用吗？";
                this.paymentStatus.id = ipId;
                this.paymentStatus.status = 1;
            }else{
                amendText = "确定要启用吗？";
                this.paymentStatus.id = ipId;
                this.paymentStatus.status = 0;
            }
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, amendText)
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
                  changePayProvider(this.paymentStatus).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
                          this.list();
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
        addContent1(){
            this.$refs.addContent.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.addContent);
                  addPayProvider(para).then((res) => {
                      if(res.code == '0'){
                         this.$message({
                             type: 'success',
                             message: '增加成功！'
                         });
                         this.list();
                         this.addContent.provider = '';
                         this.addContent.providerName = '';
                         this.dialogFormVisible = false;
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
        fromDate(time) {
            return getTimeDate(time);
        },

    }
}

</script>

<style scoped>
.content{
    padding:0 47px;
    padding-top: 12px;
    background-color: #fff;
}
.heaTitle{
    float: left;
    margin-top: 5px;
    /*padding-bottom: 26px;*/
    color: #333;
    font-size: 20px;
}
.table_container{
    margin-top: -5px;
    /*margin-top:35px;*/
}
.pagination{
    /*float: right;*/
    width: 100%;
    text-align: right;
}
.input{
    width: 300px;
    height: 32px;
}
a:hover{
    color: #fff;
}
</style>
