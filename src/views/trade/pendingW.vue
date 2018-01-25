<style>
.el-table__body,.el-table__header{
  width: 100% !important;
}

.tx-dialog .el-form{
  float: left;
  }


.search-box2 input{
  min-width:280px !important;
}

</style>
<template>
    <section class="wrapper">
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20">
                      <div class="inline"><h1 class="f-black inline mr20">提现申请</h1></div>
                      <div class="inline fr search-box search-box2 mt20">
                          <input type="text" placeholder="请输入要查询的 用户名 / 姓名 / 提现单号"  v-model="listQuery.searchText">
                          <div  class="inline"  v-if="listQuery.searchText==null">
                          <i class="el-icon-search" style="font-size:12px;"></i>
                          </div>
                          <div  class="inline"  @click="handleFilterClose" v-else>
                          <i class="el-icon-close" style="font-size:12px;"></i>
                          </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                  <div class="usl-select-tj  white-bg pd-20 clearfix">

                      <label class="ml10">时间范围：</label>
                      <list-time-area  @timeValue="handleFilter" ref="datepick" style="width:340px !important;"></list-time-area>
                  </div>

                  <div class="pd-20 white-bg clearfix">
                  <el-table :data="tableData" stripe>

                      <el-table-column align="center" label="提现订单号"  width="205">
                        <template slot-scope="scope">
                          <span>
                          <router-link target = _blank :to="{path:'/trade/withdrawalsdetail',query: {'id': scope.row.id,'userid':scope.row.userId}}">
                          {{scope.row.orderId}}
                          </router-link>
                          
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="提现申请时间"  width="160"> 
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.createdAt)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用户名"  width="120">
                        <template slot-scope="scope">
                          <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.userId}}"><span>{{scope.row.username }}</span></router-link>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="姓名">
                        <template slot-scope="scope">
                          <span>{{scope.row.realname}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="户名">
                        <template slot-scope="scope">
                          <span>{{scope.row.accountUserName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="开户行" >
                        <template slot-scope="scope">
                          <span>{{scope.row.accountBankName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="银行卡号">
                        <template slot-scope="scope">
                          <span >{{scope.row.accountCode}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column align="center" label="提现金额">
                        <template slot-scope="scope">
                          <span>{{scope.row.amount/100}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column align="center" label="交易状态">
                        <template slot-scope="scope">
                          <span>{{ FormtStatus(scope.row.status) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="客服处理人">
                        <template slot-scope="scope">
                          <span>{{scope.row.checkStaff}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="财务处理人">
                        <template slot-scope="scope">
                          <span>{{scope.row.financeStaff}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                        <router-link target = _blank :to="{path:'/trade/withdrawalsdetail',query: {'id': scope.row.id,'userid':scope.row.userId}}"  v-if="scope.row.status =='pending'" >
                          <el-button size="small">审核</el-button>
                        </router-link>

                        </template>
                      </el-table-column>
                  </el-table>
                      <div class="pagination fr">
                        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
                        </el-pagination>
                      </div>
                  </div>
              </div>

            </div>

        </div>

      <!-- 对话框 -->
      <div class="tx-dialog">
        <el-dialog title="新建提现订单" :visible.sync="dialogFormVisible" size="small">
          <el-form class="small-space" label-position="left" label-width="70px" style=' margin-left:50px;'>
            <el-form-item label="用户名">
              <el-input type="text" placeholder="输入用户名搜索" v-model="username" style="width: 250px"></el-input>
              <el-dropdown @command="handleCommand">
                <el-button type="primary" v-on:click.stop="selectUserList">搜索</el-button>
                <el-dropdown-menu slot="dropdown" style="width: 310px;" visible-change="true" v-if="userlist&&userlist.length>0">
                  <el-dropdown-item v-for="(item,index) in userlist" :command="item" :key="index">{{ item.username }}</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu slot="dropdown" style="width: 310px;" visible-change="true" v-else>
                  <el-dropdown-item command="">无数据</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-form-item>
            <div v-show="clickFormItem">
              <el-form-item label="姓名">
                <span>{{ clickUserDetail.username }}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{ clickUserDetail.phone }}</span>
              </el-form-item>
              <el-form-item label="余额">
                <span>{{ clickUserDetail.balance/100 }} 元</span>
              </el-form-item>
              <el-form-item label="开户行" v-if="clickUserDetail.accountBankName=='' || clickUserDetail.accountBankName==null">
                <span>未绑定开户行不能提现</span>
              </el-form-item>
              <el-form-item label="开户行" v-else>
                <span>{{ clickUserDetail.accountBankName }}</span>
              </el-form-item>
              <el-input type="hidden" placeholder="选中用户id" v-model="createForm.userId" style="width: 250px"></el-input>
              <el-input type="hidden" placeholder="选中用户银行名字" v-model="createForm.accountBankName" style="width: 250px"></el-input>
              <el-input type="hidden" placeholder="选中用户开户名字" v-model="createForm.accountUserName" style="width: 250px"></el-input>
              <el-input type="hidden" placeholder="选中用户银行账号" v-model="createForm.accountCode" style="width: 250px"></el-input>
            </div>

            <el-form-item label="提现金额">
              <el-input type="text" placeholder="提现金额" v-model="createForm.amount" style="width: 250px"></el-input>
            </el-form-item>
          </el-form>
          <ul class="font-gray txuserinfo">
              <li>
                  <p>姓名：<span>白阿繁</span></p>
              </li>
              <li>
                <p>电话：<span>186458456354</span></p>
              </li>
              <li>
                <p>余额：<span>￥125,255,10</span></p>
              </li>
          </ul>
          <div class="clearfix"></div>
          <p style="color: #eb6100;text-align: center;">注意：未绑定银行卡无法提现</p>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button  type="primary" @click="create">确 定</el-button>
          </div>
        </el-dialog>
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
      createForm:{
        applyStaffId:null,
        userId:null,
        amount:null,
        accountBankName:null,
        accountUserName:null,
        accountCode:null
      },
      listLoading: true,
      statusList:[
        {value:'',label:'全部'},
        {value:'pending',label:'提现申请中'},
        {value:'transferring',label:'申请通过，打款中'},
        {value:'reject',label:'申请不通过'},
        {value:'transfer_failed',label:'打款失败'},
        {value:'transfer_success',label:'打款成功'}
      ],
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: null,
        status: 'pending',
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
          statusName = '申请通过，打款中';
        }else if(status == 'reject'){
          statusName = '申请不通过';
        }else if(status == 'transfer_failed'){
          statusName = '打款失败';
        }else if(status == 'transfer_success'){
          statusName = '打款成功';
        }
        return statusName;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
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
      this.clickFormItem = false;
      this.dialogFormVisible = true;
    },
    selectUserList() {
        this.clickFormItem = false;
        UserListForUsername(this.username).then((res) => {
            this.userlist = res.data;
        });
    },
    handleCommand(command) {

      this.clickUserDetail.username = command.username;
      this.clickUserDetail.phone = command.phone;
      this.clickUserDetail.balance = command.balance;
      this.clickUserDetail.accountBankName = command.bankList[0].accountBankName;
      this.createForm.userId = command.id;
      this.createForm.accountCode = command.bankList[0].accountCode;
      this.createForm.accountBankName = command.bankList[0].accountBankName;
      this.createForm.accountUserName = command.bankList[0].accountUserName;
      this.clickFormItem = true;

    },
    create() {

        this.createForm.applyStaffId = this.adminId;
        ServiceUserWithdraw(this.createForm).then((res) => {
            this.dialogFormVisible = false;
            if(res.data!=''&&res.data!=null){
              this.$message({
                message: '创建成功!',
                type: 'success'
              });
              this.handleFilter();
            }else{

              this.$message.error(res.message);
            }
        });

    },
    getList() {
      this.listLoading = true;
      ServiceWithdrawList(this.listQuery).then((res) => {
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
          h('span', null, '确认客户提现 '),
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
          this.ServiceWithdrawSureData(item.id,'transferring');
      }).catch(() => {
            this.$prompt('请输入拒绝原因', '提示', {
                confirmButtonText: '确认拒绝',
                cancelButtonText: '取消操作',
                inputPattern: /\S/,
                inputErrorMessage: '原因不能为空'
              }).then(({ value }) => {
                this.ServiceWithdrawSureData(item.id,'reject',value);
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
