<style>
.el-table__body,.el-table__header{
  width: 100% !important;
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
                      <div class="inline"><h1 class="f-black inline mr20">充值记录</h1></div>
                      <div class="inline fr search-box search-box2">
                          <input type="text" placeholder="请输入要查询的 用户名 / 姓名 / 充值单号"  v-model="listQuery.searchText">
                          <div  class="inline"  v-if="listQuery.searchText==null">
                          <i class="el-icon-search" style="font-size:12px;"></i>
                          </div>
                          <div  class="inline"  @click="handleFilterClose" v-else>
                          <i class="el-icon-close" style="font-size:12px;"></i>
                          </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                  <div class="usl-select-tj  white-bg pd-30 pdtop-0 clearfix">
                      <label>交易状态：</label>
                      <el-select v-model="listQuery.status" @change="handleFilter" placeholder="请选择">
                        <el-option
                          v-for="item in statusList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>

                      <label class="ml10">选择处理人：</label>
                      <el-select v-model="listQuery.staffId" @change="handleFilter" placeholder="请选择">
                      <el-option  label="全部" value=""></el-option>
                        <el-option
                          v-for="item in adminlist"
                          :key="item.id"
                          :label="item.userName"
                          :value="item.id">
                        </el-option>
                      </el-select>

                      <label class="ml10">时间范围：</label>
                      <list-time-area ref="datepick" @timeValue="handleFilter" style="width: 340px !important;"></list-time-area>
                      <a class="create-trade"  @click="handleCreate"><i class="el-icon-date mr10"></i>创建充值订单</a>
                  </div>
                <div class="pd-20 white-bg clearfix pdtop-0">
                  <el-table :data="tableData" stripe style="width: 100%">

                      <el-table-column align="center" label="充值订单号" width="205"> 
                        <template slot-scope="scope">
                          <span>
                          <router-link target = _blank :to="{path:'/trade/cdetail',query: {'id': scope.row.id}}">
                          {{scope.row.orderId}}
                          </router-link>
                          
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="充值时间" width="160">
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.createdAt)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用户名">
                        <template slot-scope="scope">
                        <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.userId}}"><span>{{scope.row.username }}</span></router-link>
                          
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="姓名">
                        <template slot-scope="scope">
                          <span>{{scope.row.realname}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="充值方式">
                        <template slot-scope="scope">
                          <span>{{ FormchargeTyp(scope.row.chargeType) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="交易账号">
                        <template slot-scope="scope">
                          <span>{{scope.row.chargeAccount}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="金额">
                        <template slot-scope="scope">
                          <span>{{scope.row.amount/100}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="处理人">
                        <template slot-scope="scope">
                          <span>{{scope.row.staffName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                          <span>{{ FormtStatus(scope.row.status) }}</span>
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
      <el-dialog title="创建充值订单" :visible.sync="dialogFormVisible" size="small">
        <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style=' margin-left:50px;'>
            <el-form-item label="用户名">
              <el-input type="text" placeholder="输入用户名搜索" v-model="username" style="width: 250px"></el-input>
              <el-dropdown @command="handleCommand">
                <el-button type="primary" v-on:click.stop="selectUserList">搜索</el-button>
                <el-dropdown-menu slot="dropdown" style="width: 310px;" visible-change="true" v-if="userlist!=null">
                  <el-dropdown-item v-for="(item,index) in userlist" :command="item" :key="index">{{ item.username }}</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu slot="dropdown" style="width: 310px;" visible-change="true" v-else>
                  <el-dropdown-item command="">无数据</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-form-item>
            <div v-show="clickFormItem" class="search-result">
              <el-form-item label="姓名">
                <span>{{ clickUserDetail.username }}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{ clickUserDetail.phone }}</span>
              </el-form-item>
              <el-form-item label="余额">
                <span>{{ clickUserDetail.balance/100 }} 元</span>
              </el-form-item>
              <el-input type="hidden" placeholder="选中用户id" v-model="clickUserDetail.id" style="width: 250px"></el-input>
            </div>

            <el-form-item label="充值金额">
                <el-input type="text" placeholder="充值金额" v-model="amount" style="width: 250px"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button  type="primary" @click="create">确 定</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
import {mapState} from 'vuex'
import { UserListForUsername,ServiceUserCharge,ServiceChargeList,ServiceAdminList } from '../../service/getData'
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
      temp: {
        userId:null,
        amount:null
      },
      amount:null,
      username:null,
      userlist:null,
      clickUserDetai: null,
      clickFormItem:false,
      clickUserDetail:{
          id:null,
          username:null,
          phone:null,
          balance:null
      },
      createForm:{
        userId:null,
        amount:null
      },
      listLoading: true,
      statusList:[
        {value:'',label:'全部'},
        {value:'unpaid',label:'未成功'},
        {value:'success',label:'成功'},
        {value:'reject',label:'拒绝'}
      ],
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: null,
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
      'adminId'
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
        if(status == 'unpaid'){
          statusName = '未成功';
        }else if(status == 'success'){
          statusName = '成功';
        }else if(status == 'reject'){
          statusName = '拒绝';
        }

        return statusName;
    },
    FormchargeTyp(chargeType) {
        let platname = chargeType;
        if(chargeType == 'platform'){
            platname = '手动充值';
        }else if(chargeType == 'alipay'){
            platname = '支付宝';
        }else if(chargeType == 'qq'){
            platname = 'QQ';
        }else if(chargeType == 'wechat'){
            platname = '微信';
        }
        return platname;
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

      this.clickUserDetail = command;
      this.clickFormItem = true

    },
    create() {

        this.createForm.userId = this.clickUserDetail.id;
        this.createForm.amount = this.amount;
        ServiceUserCharge(this.createForm).then((res) => {
            this.dialogFormVisible = false;
            if(res.data!=''&&res.data!=null){
              console.log(res);
              this.$message({
                message: '创建成功!',
                type: 'success'
              });
              this.getList();
            }else{

              this.$message.error('创建失败');
            }
        });

    },
    getList() {
      this.listLoading = true;
      ServiceChargeList(this.listQuery).then((res) => {
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
  }

}
</script>
