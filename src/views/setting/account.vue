<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
            <div class="" style="overflow:hidden;margin-top:5px;">
                <h3 class="heaTitle">收款账户</h3>
                <span style="float:left;display:none;">
                    <a class="edit-trade mrgL10" style="position: relative;top: -10px;"><i class="el-icon-document">导出报表</i></a>
                </span>
                <a class="create-trade mrgL10" style="position: relative;top: -1px;" @click="openWindowAdd()">添加银行卡</a>
                <div class="inline fr search-box search-box2" style="margin-bottom:20px;height:37px;">
                    <input type="text" placeholder="银行名称/账户名称"  v-model="accountList.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                    <div  class="inline" v-if="accountList.searchText==null">
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
                  prop="accountBankName"
                  label="银行名称"
                  align='center'
                  width="">
                </el-table-column>
                <el-table-column
                  prop="providerName"
                  label="银行支付类型"
                  width=""
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="accountUserName"
                  label="账户名称"
                  width=""
                 align='center'>
                </el-table-column>
                <el-table-column
                  prop="createdAt"
                  label="账户"
                  width=""
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="accountBankBranch"
                  label="支行名称"
                  width=""
                 align='center'>
                </el-table-column>
                <el-table-column
                  prop="minDeposit"
                  label="每笔最低存款额"
                  width=""
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="maxDeposit"
                  label="每笔最大存款额"
                  width=""
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="totalDeposit"
                  label="存款额总限制"
                  width=""
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  width=""
                  align='center'>
                  <template slot-scope="scope">
                      <el-button v-if="scope.row.status==1" type="success" size="small" @click="open2(scope.row)">开启</el-button>
                      <el-button v-if="scope.row.status==0" type="danger" size="small" @click="open2(scope.row)">停止</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="" align='center'>
                    <template slot-scope="scope">
                        <span style="cursor:pointer;" class="el-icon-edit" @click="dialogEditBankCar(scope.row)">编辑</span>
                    </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="accountList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="accountList.limit"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <div class="openWindow">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" size="small">
                <el-col :span="24" class="content_dl">
                    <el-form :model="bankCarForm" :rules="rules" ref="bankCarForm">
                        <el-col :span="8">
                            <el-form-item label="姓名:" label-width="85px" prop="accountUserName">
                                <el-input v-model="bankCarForm.accountUserName" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="卡号:" label-width="85px" prop="accountCode">
                                <el-input v-model="bankCarForm.accountCode" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="银行名称:" label-width="85px" prop="accountBankBranch">
                                <el-input v-model="bankCarForm.accountBankBranch" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行:" label-width="85px" prop="accountBankName">
                                <el-input v-model="bankCarForm.accountBankName" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="支付商:" label-width="85px">
                                <el-select v-model="providerId" placeholder="请选择" style="width:200px;">
                                  <el-option
                                    v-for="item in providerList"
                                    :key="item.id"
                                    :label="item.providerName"
                                    :value="item.id">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="每笔存款最低金额:" label-width="230px" required>
                                <el-input v-model="bankCarForm.minDeposit" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="每笔存款最高金额:" label-width="230px" required>
                                <el-input v-model="bankCarForm.maxDeposit" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="存款额总限制:" label-width="230px" required>
                                <el-input v-model="bankCarForm.totalDeposit" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="玩家级别:" label-width="230px" required>
                                <el-input v-model="bankCarForm.playerLevel" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-col>
                <div slot="footer" class="dialog-footer" style="margin-top:210px;">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button v-show="addAndEdit==1" type="primary" @click="addBankCar()">添加银行卡</el-button>
                    <el-button v-show="addAndEdit==2" type="primary" @click="editBankCar()">编辑银行卡</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import {account,changeStatus,setBankCar,payProviderList,editBankCar} from '../../service/getData'
export default {
    data() {
        return {
            tableData:[],
            total:null,
            accountList:{
                limit:10,
                pageNum:1,
                searchText:null,
                status:'',
                payProviderId:''
            },
            // 变更状态
            bankStatus:{
                id:'',
                status:null
            },
            // 区分新建和编辑
            addAndEdit:1,
            // 创建银行卡
            bankCarForm:{
                accountBankBranch:'',    //支行名称
                accountUserName:'',     //用户名
                accountCode:'',	       //卡号
                accountBankName:'',       //开户行
                minDeposit:'',	     //每笔最底
                maxDeposit:'',	    //每笔最高存款金额
                totalDeposit:'',     //总计
                playerLevel:'',      //玩家级别
                payProviderId:'',   //第三方id
            },
            // 第三方支付列表
            providerList:[],
            providerId:'',
            // 弹窗
            dialogTitle:'',
            dialogFormVisible:false,
            rules:{
                accountUserName:[
                    {required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                accountCode:[
                    {required: true, message: '请输入卡号', trigger: 'blur' }
                ],
                accountBankBranch:[
                    {required: true, message: '请输入银行名称', trigger: 'blur' }
                ],
                accountBankName:[
                    {required: true, message: '请输入开户行', trigger: 'blur' }
                ],
                payProviderId:[
                    {required: true, message: '请选择支付商', trigger: 'change' }
                ],
                minDeposit:[
                    {required: true, message: '请输入最低金额', trigger: 'blur' }
                ],
                maxDeposit:[
                    {required: true, message: '请输入最高金额', trigger: 'blur' }
                ],
                totalDeposit:[
                    {required: true, message: '请输入存款额总限制', trigger: 'blur' }
                ],
                playerLevel:[
                    {required: true, message: '请输入玩家级别', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.list();
        this.payProviderList();
    },
    components: {

    },
    methods: {
        // 搜索
        handleIconClick() {
            // alert(this.accountList.searchText);
            this.list();
        },
        handleFilterClose(){
          this.accountList.searchText = null;
          this.list();
        },
        handleSizeChange(val) {
            this.accountList.limit = val;
            this.list();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.accountList.pageNum = val;
            this.list();
            console.log(`当前页: ${val}`);
        },
        list () {
            account(this.accountList).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(this.total);
                console.log(res.data.list);
            })
        },
        payProviderList(){
            payProviderList('').then((res) => {
                this.providerList = res.data;
            })
        },
        // 打开新建弹窗
        openWindowAdd(){
            this.bankCarForm = {};
            this.addAndEdit = 1;
            this.providerId = '';
            this.dialogTitle = '添加银行卡';
            this.dialogFormVisible=true;
        },
        // 添加银行卡
        addBankCar(){
            this.bankCarForm.payProviderId = this.providerId;
            console.log(this.bankCarForm);
            this.$refs.bankCarForm.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.bankCarForm);
                  setBankCar(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '添加成功！',
                         });
                         this.list();
                         this.dialogFormVisible = false
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
        // 编辑银行卡
        dialogEditBankCar(item){
            this.addAndEdit = 2;
            this.dialogFormVisible=true;
            this.bankCarForm = item;
            this.dialogTitle = '编辑银行卡';
        },
        // 编辑银行卡
        editBankCar(){
            console.log(this.bankCarForm);
            this.$refs.bankCarForm.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.bankCarForm);
                  editBankCar(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '编辑成功！',
                         });
                         this.list();
                         this.dialogFormVisible = false
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
        open2(item){
            var amendText = '';
            if(item.status == 0){
                amendText = "确定要开启银行卡状态？";
                this.bankStatus.id = item.id;
                this.bankStatus.status = 1;
            }else{
                amendText = "确定要关闭银行卡状态？";
                this.bankStatus.id = item.id;
                this.bankStatus.status = 0;
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
                  this.statusChange();
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
              });
          },
        statusChange(){
            console.log(this.bankStatus);
            changeStatus(this.bankStatus).then((res) => {
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
}
.heaTitle{
    float: left;
    margin-top: 5px;
    padding-bottom: 10px;
    font-size: 20px;
    color: #333;
}
.table_container{
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
.edit-trade {
    background-color: #ccc;
    color: #3A3A3A;
    padding: 10px 20px;
    float: right;
    cursor: pointer;
}
.mrgL10 {margin-left: 10px;}
.el-form-item{
    margin-top: 20px;
}
.el-dialog__wrapper .el-dialog{
    width: 57% !important;
}
a:hover{
    color: #fff;
}
</style>
