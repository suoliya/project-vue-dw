<template>
  <section class="wrapper">
    <!--财务管理-->
    <div class="row">
      <div class="col-lg-12 getheight">
        <div class="usl-top-box white-bg pd-30 no-border">
          <div class="inline"><h1 class="f-black inline mr20">提现存款</h1></div>

        </div>
        <div class="usl-select-tj  white-bg pd-30 ptop0 clearfix">

          <!--查询条件-->
          <span class="inline-block fl line35">订单状态：</span>
          <el-select v-model="listQuery.status" placeholder="请选择"  @change="handleFilter" class="fl height33 mr20 radius0 smallsel">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="inline-block fl line35">选择处理人：</span>
          <el-select v-model="listQuery.staffId" placeholder="请选择"  @change="handleFilter" class="fl height33 mr20 radius0 smallsel">
          <el-option  label="全部" value=""></el-option>
            <el-option
              v-for="item in adminlist"
              :key="item.id"
              :label="item.userName"
              :value="item.id">
            </el-option>
          </el-select>

          <!--时间选择-->
          <span class="inline-block fl line35">时间范围：</span>
          <list-time-area ref="datepick" @timeValue="handleFilter" class="fl height33 mr20 radius0" style="width:330px;"></list-time-area>


          <!--搜索-->
          <div class="inline fr search-box">
            <input type="text" placeholder="请输入你要搜索的订单号" v-model="listQuery.searchText">
            <div  class="inline"  v-if="listQuery.searchText==null">
            <i class="el-icon-search" style="font-size:12px;"></i>
            </div>
            <div  class="inline" @click="handleFilterClose" v-else>
            <i class="el-icon-close" style="font-size:12px;"></i>
            </div>
            <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
          </div>
        </div>
        <!--列表-->
        <div class="pd-30 pdtop-0 white-bg margin0 clearfix">
          <div class="table_container">
            <el-table :data="tableData" stripe style="width: 100%">

                <el-table-column align="center" label="提现订单号" width="205">
                  <template slot-scope="scope">
                  <router-link target = _blank :to="{path:'/trade/withdrawalsdetail',query: {'id': scope.row.id,'source':2,'userid':scope.row.userId}}">
                  <span>{{scope.row.orderId}}</span>
                  </router-link>
                    
                  </template>
                </el-table-column>
                <el-table-column align="center" label="提现申请时间" width="155">
                  <template slot-scope="scope">
                    <span>{{FormtDate(scope.row.createdAt)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="审核通过时间" width="155">
                  <template slot-scope="scope">
                    <span>{{FormtDate(scope.row.checkOpTime)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="用户名" width="125">
                  <template slot-scope="scope">
                  <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.userId}}"><span>{{scope.row.username }}</span></router-link>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="户名">
                  <template slot-scope="scope">
                    <span>{{scope.row.accountUserName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="开户行">
                  <template slot-scope="scope">
                    <span>{{scope.row.accountBankName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="银行卡号" width="155">
                  <template slot-scope="scope">
                    <span >{{scope.row.accountCode}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="提现金额">
                  <template slot-scope="scope">
                    <span>{{scope.row.amount/100}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="客服处理人">
                  <template slot-scope="scope">
                    <span>{{scope.row.checkStaff}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="交易状态">
                  <template slot-scope="scope">
                    <span>{{ FormtStatus(scope.row.status) }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="100" >
                  <template slot-scope="scope">
                    <div  v-if="scope.row.status=='transferring'">
                      <el-button
                        size="small"
                        @click="open2(scope.row)">确认转账</el-button>
                    </div>
                  </template>
                </el-table-column>

            </el-table>
          </div>
          <div class="pagination fr">
            <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>

    </div>


  </section>
</template>

<script>
import {mapState} from 'vuex'
import { UserListForUsername,ServiceUserWithdraw,ServiceWithdrawList,ServiceAdminList,ServiceWithdrawSure } from '../../service/getData'
import tablebar from '../../components/tablebar/tablebar.vue'
import selectbar from '../../components/selectbar/selectbar.vue'
import Pagination from '../../components/Pagination/pagination.vue'
import listTimeArea from '../../components/moudle/listTimeArea.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    tablebar,
    selectbar,
    listTimeArea
  },
  mounted () {
  },
  created(){
    this.getList();
    this.adminlistAll();
  },
  data() {
    return {
      adminlist:null,
      total:null,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      dialogFormVisible: false,
      username:null,
      userlist:null,
      clickUserDetai: null,
      clickFormItem:false,
      clickUserDetail:{
          username:null,
          phone: null,
          accountUserName: null,
          balance: null
      },
      listLoading: true,
      statusList:[
        {value:'',label:'全部'},
        {value:'transferring',label:'提现申请中'},
        {value:'transfer_failed',label:'打款失败'},
        {value:'transfer_success',label:'打款成功'}
      ],
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        status: '',
        staffId: '',
        beginTime: null,
        endTime: null,
        searchText: null,
      }
    }
  },
  computed: {
    ...mapState([
      'adminName','adminId'
      ])
  },
  methods: {
    setheight(){
       var height = $(".getheight").height();
       $(".tagbox").height(height);
    },
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    FormtStatus: function (status) {
        let statusName = null;
        if(status == 'pending'){
          statusName = '提现申请中';
        }else if(status == 'transferring'){
          statusName = '申请中';
        }else if(status == 'reject'){
          statusName = '申请不通过';
        }else if(status == 'transfer_failed'){
          statusName = '打款失败';
        }else if(status == 'transfer_success'){
          statusName = '打款成功';
        }
        return statusName;
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleCreate() {
      this.dialogFormVisible = true;
    },
    selectUserList() {
        this.clickFormItem = false;
        UserListForUsername(this.username).then((res) => {
            this.userlist = res.data;
        });
    },
    getList() {
      this.listLoading = true;
      let query = {};
      query.pageNum = this.listQuery.pageNum;
      query.limit = this.listQuery.limit;
      query.staffId= this.listQuery.staffId;
      query.beginTime= this.listQuery.beginTime;
      query.endTime= this.listQuery.endTime;
      query.searchText= this.listQuery.searchText;
      
      if(this.listQuery.status == null || this.listQuery.status == ''){
/*        let mystatus = ['pending','transfer_failed','transfer_success'];
*/        query.status =  'transferring,transfer_failed,transfer_success';
      }else{
        //let status = this.listQuery.status;
        query.status =  this.listQuery.status;
      }
      ServiceWithdrawList(query).then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
      });

    },
    adminlistAll() {
        let query = {pageNum:1,limit:100};
        ServiceAdminList(query).then((res) => {
            this.adminlist = res.data.list;
        });
    },
    handleFilter() {
      this.listQuery.beginTime = getFormtDate(this.$refs.datepick.value4[0]);
      this.listQuery.endTime = getFormtDate(this.$refs.datepick.value4[1]);
      this.getList();
    },
    handleFilterClose(){
      this.listQuery.searchText = null;
      this.handleFilter();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    open2(item){
        const h = this.$createElement;
        this.$msgbox({
          title: '审核',
          message: h('p', null, [
            h('span', null, '确认转账 '),
            h('p', { style: 'color: gray' }, '本次提现'+item.amount/100+'元？ ')
          ]),
          type:'warning',
          showCancelButton: true,
          confirmButtonText: '通过',
          cancelButtonText: '拒绝',
          beforeClose: (action, instance, done) => {

            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(action => {
            this.ServiceWithdrawSureData(item.id,'transfer_success');
        }).catch(() => {
              this.$prompt('请输入拒绝原因', '提示', {
                  confirmButtonText: '确认拒绝',
                  cancelButtonText: '取消操作',
                  inputPattern: /\S/,
                  inputErrorMessage: '原因不能为空'
                }).then(({ value }) => {
                  this.ServiceWithdrawSureData(item.id,'transfer_failed',value);
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });       
                });
            });
        },
        ServiceWithdrawSureData(id,status,reason=''){
          let query = {};
          query.id = id;
          query.status = status;
          query.reason = reason;
          ServiceWithdrawSure(query).then((res) => { 
              if(res.status){
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  });
                  this. handleFilter();
              }else{
                this.$message({
                  type: 'info',
                  message:res.message
                });
              }
          });

        }
  }

}
</script>




