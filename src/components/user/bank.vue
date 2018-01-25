<template>	
    <div class="white-bg pd-20 clearfix tbnoscroll">
      <h1 style="margin-bottom:10px;width:100%;float:left;">银行信息 
      <el-button type="primary" class="fr" @click="creatBankPanel=true" style="margin-top: -10px;">新建银行卡</el-button></h1>

      <!--银行信息tab-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="时间 " width="">
        <template slot-scope="scope">
          <span>{{FormtDate(scope.row.createdAt)}}</span>
        </template>
        </el-table-column>
        <el-table-column label="银行名称" width="">
        <template slot-scope="scope">
          <span>{{scope.row.accountBankName}}</span>
        </template>
        </el-table-column>
        <el-table-column label="银行卡号">
        <template slot-scope="scope">
          <span>{{scope.row.accountCode}}</span>
        </template>
        </el-table-column>
        <el-table-column label="支行名称">
        <template slot-scope="scope">
          <span>{{scope.row.accountBankBranch}}</span>
        </template>
        </el-table-column>
        <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.accountUserName}}</span>
        </template>
        </el-table-column>
        <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1" size="mini" @click="updateStatus(scope.row.id,0)" >开启</el-button>
          <el-button type="danger" v-else size="mini"  @click="updateStatus(scope.row.id,1)">关闭</el-button>
        </template>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="updateBankOpen(scope.row)">编辑</span>
        </template>
        </el-table-column>
      </el-table>
      <div class="pagination fr">
        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
        </el-pagination>
      </div>
      <!-- 创建银行卡 -->
      <el-dialog title="创建银行卡" :visible.sync="creatBankPanel" size="small" custom-class="newinputbox">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="creatBankQuery.accountUserName" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="卡号" :label-width="formLabelWidth">
            <el-input v-model="creatBankQuery.accountCode" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="银行名称" :label-width="formLabelWidth">
            <el-select v-model="creatBankQuery.accountBankName" placeholder="银行名称">
            <el-option v-for="item in banklist" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户行" :label-width="formLabelWidth">
            <el-input v-model="creatBankQuery.accountBankBranch" auto-complete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="creatBankPanel = false">取 消</el-button>
          <el-button type="primary" @click="creatBank">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改银行卡 -->
       <el-dialog title="编辑银行卡" :visible.sync="updateBankPanel" size="small" custom-class="newinputbox">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="updateBankQuery.accountUserName" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="卡号" :label-width="formLabelWidth">
            <el-input v-model="updateBankQuery.accountCode" auto-complete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="银行名称" :label-width="formLabelWidth">
            <el-select v-model="updateBankQuery.accountBankName" placeholder="银行名称">
            <el-option v-for="item in banklist" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户行" :label-width="formLabelWidth">
            <el-input v-model="updateBankQuery.accountBankBranch" auto-complete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateBankPanel = false">取 消</el-button>
          <el-button type="primary" @click="updateBankData">确 定</el-button>
        </div>
      </el-dialog> 


    </div>
</template>

<script>
import {bankCustomerList,updateBankStatus,createBank,updateBank} from '../../service/getData'
import {getTimeDate,jsGetAge } from '../../config/mUtils'
  export default {
    components: {

    },
    created(){
      this.getList();
    },
    computed:{  

    },
    name: 'userBank',
    data() {
      return {
        visible2:false,
        creatBankPanel:false,
        updateBankPanel:false,
        activeName: 'first',
        listLoading:false,
        listQuery: {
          pageNum: 1,
          limit: 10,
          userId:null,
        },
        tableData:null,
        creatBankQuery:{
          accountBankBranch:null,
          accountUserName:null,
          accountCode:null,
          accountBankName:null
        },
        updateBankQuery:{
          accountBankBranch:null,
          accountUserName:null,
          accountCode:null,
          accountBankName:null
        },
        banklist:[
          '中国银行','中国建设银行','中国工商银行','中国农业银行','招商银行','交通银行','浦发银行','民生银行','兴业银行','广发银行','浦发银行'
        ],
      }
    },
    props: {
      userid: {
        type: Number
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        this.listQuery.userId = this.userid;
        bankCustomerList(this.listQuery).then((res) => {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.listLoading = false;
        });
      },
      FormtDate(time){
         return getTimeDate(time);
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },

      updateStatus(id,s) {

        this.$confirm('确认更换银行卡状态?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {

            let query = {};
            query.id = id;
            query.status = s;
            query.userId = this.userid;

            updateBankStatus(query).then((res) => {
              if(res.status){
                this.getList();
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }else{
                this.$message.error(res.message);
              }
            });

         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消修改'
           });          
         });
      },
      creatBank() {
        this.creatBankPanel = false;
        this.creatBankQuery.userId = this.userid;
        createBank(this.creatBankQuery).then((res) => {
          if(res.status){
            this.getList();
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });

      },
      updateBankOpen(row) {

        this.updateBankPanel = true;
        this.updateBankQuery = row;

      },
      updateBankData() {
        this.updateBankPanel = false;
        updateBank(this.updateBankQuery).then((res) => {
          if(res.status){
            this.getList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });

      }
    }
  }
</script>

<style>
.tbnoscroll .el-table__body-wrapper{
  overflow-x:hidden;
}
</style>