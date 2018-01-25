<style>

  .search-box2 input{
    min-width:280px !important;
  }

  .borderb{
    margin-bottom: 15px;
    overflow: hidden;
  }

  .userlistthree .topthree{
    height: 120px;
  }
</style>
<template>
    <section class="wrapper newuserbox">
        <!--头部三个模块-->
        <div class="row userlistthree ordersearch">

              <div class="col-md-1-5 mbot20">
                    <div class="white-bg borderbox topthree ">
                        <p class="red-color title">今日充值金额</p>
                        <p class="red-color p3">金额：{{ totalCount.todayChargeOrder/100 }}</p>
                        <p class="red-color p3">笔数：{{ totalCount.todayChargeOrderCount }}</p>
                    </div>
              </div>
              <div class="col-md-1-5 mbot20">
                  <div class="white-bg borderbox topthree">
                      <p class="green-color title">今日提现金额</p>
                      <p class="red-color p3">金额：{{ totalCount.todayWithdraw/100 }}</p>
                      <p class="red-color p3">笔数：{{ totalCount.todayWithdrawCount }}</p>
                  </div>
              </div>
              <div class="col-md-1-5 mbot20">
                  <div class=" white-bg borderbox topthree">
                      <p class="red-color title">今日转入钱包流水</p>
                      <p class="red-color p3">金额：{{ totalCount.todayToMain/100 }}</p>
                      <p class="red-color p3">笔数：{{ totalCount.todayToMainCount }}</p>
                  </div>
              </div>
              <div class="col-md-1-5 mbot20">
                  <div class=" white-bg borderbox topthree">
                    <p class="gray-color title">今日转出钱包流水</p>
                    <p class="red-color p3">金额：{{ totalCount.todayToGame/100 }}</p>
                    <p class="red-color p3">笔数：{{ totalCount.todayToGameCount }}</p>
                  </div>
              </div>
              <div class="col-md-1-5 mbot20">
                    <div class="white-bg borderbox topthree">
                        <p class="red-color title">今日拒绝提现</p>
                        <p class="red-color p3">金额：{{ totalCount.todayWithdrawReject/100 }}</p>
                        <p class="red-color p3">笔数：{{ totalCount.todayWithdrawRejectCount }}</p>
                    </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <!--图表-->
        <div class="row margin-10">
          <div class="col-lg-12 getheight userlist_search" >
              <div class="usl-top-box white-bg pd-20" style="min-height:160px;">
                  <div class="inline" style="width:100%;">
                    <h1 class="f-black inline mr20">订单检索</h1>
                    <div class="clearfix fr">
                      <div class="inline fr sxbox"  @click="dialogFormVisible = true" style="background-color: #dcdcdc;border-radius:0;">筛选</div>
                      <div class="inline fr search-box search-box2">
                            <input type="text" placeholder="姓名/手机号/邮箱/用户名"  v-model="listQuery.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                            <div  class="inline"  v-if="listQuery.searchText==null">
                            <i class="el-icon-search"></i>
                            </div>
                            <div  class="inline" v-else @click="handleFilterClose">
                            <i class="el-icon-close" ></i>
                            </div>
                            <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>

                      <div class="js_box fr order_id">
                        <div style="display:inline-block">
                            <el-input v-model="listQuery.orderId"  placeholder="订单号"></el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="clearfix" style="margin-top:30px;">
                  <div class="js_box fl">
                    <div style="display:inline-block">
                        <label class="ml10">开始金额（元）</label>
                        <el-input v-model="listQuery.amountFrom" style="width:150px"></el-input>
                    </div>
                  </div>
                  <div class="js_box fl">
                    <div>
                        <label class="ml10">结束金额（元）：</label>
                        <el-input v-model="listQuery.amountTo" style="width:150px"></el-input>
                    </div>
                  </div>
                    <div class="js_box fl order_time">
                      <div >
                          <label class="ml10 fl" style="line-height: 36px;margin-right: 10px;">订单时间：</label>
                          <list-time-area class="time_search fl" ref="datepick" style="width:300px"></list-time-area>
                      </div>
                    </div>

                  </div>

              </div>
          </div>
        </div>
        <!--用户列表-->
        <div class="pad20 margin0 white-bg clearfix" v-if="tableData!=null">
            <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">
              <el-table-column label="订单号">
                  <template slot-scope="scope">
                    <span>{{scope.row.orderId}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="订单时间" width="">
                <template slot-scope="scope">
                  <span>{{ FormtDate(scope.row.orderDate) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户名">
                <template slot-scope="scope">
                  <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="用户姓名">
                <template slot-scope="scope">
                  <span>{{ scope.row.realname }}</span>
                </template>
              </el-table-column>

              <el-table-column label="电话" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单类型" width="">
                <template slot-scope="scope">
                  <span>{{ returnTypeName(scope.row.type) }}</span>
                </template>
              </el-table-column>s
            </el-table>

            <div class="pagination fr">
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
              </el-pagination>
            </div>
        </div>
        <!-- Form -->
        <el-dialog title="条件筛选" :visible.sync="dialogFormVisible" width="90%">
          <el-form>
            <div class="jylx">
              <el-checkbox-group v-model="type">
                <div class="row">
                    <div class="col-lg-3">
                      <el-checkbox label="charge">充值</el-checkbox>
                    </div>
                    <div class="col-lg-3">
                      <el-checkbox label="withdraw">提现</el-checkbox>
                    </div>
                    <div class="col-lg-3">
                      <el-checkbox label="reward">加奖金</el-checkbox>
                    </div>
                    <div class="col-lg-3">
                      <el-checkbox  label="admin_charge">管理员充值</el-checkbox>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3">
                      <el-checkbox  label="transform_to_main">子钱包转款至主钱包</el-checkbox>
                    </div>
                    <div class="col-lg-3">
                      <el-checkbox  label="transform_to_gam">主钱包转款到子钱包</el-checkbox>
                    </div>
                    <div class="col-lg-3">
                      <el-checkbox  label="manual_increase">手动增加余额</el-checkbox>
                    </div>
                    <div class="col-lg-3">
                      <el-checkbox label="manual_reduction">手动减少余额</el-checkbox>
                    </div>
                </div>
                <div class="row">
                 <div class="col-lg-3">
                  <el-checkbox label="backwater">返水</el-checkbox>
                </div>
                 <div class="col-lg-3">
                  <el-checkbox label="reject">拒绝提现</el-checkbox>
                </div>
                 <div class="col-lg-3">
                  <el-checkbox label="transfer_failed">提现失败</el-checkbox>
                </div>
                </div>
              </el-checkbox-group>

            </div>

            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectOrderList">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>

<script>
import {getOrderList,nowOrderDetail} from '../../service/getData'
import selectbar from '../../components/selectbar/selectbar.vue'
import datepickerbar from '../../components/moudle/datepickerbar.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
import listTimeArea from '../../components/moudle/listTimeArea.vue'

export default {
  components: {
    selectbar,
    datepickerbar,
    listTimeArea
  },
  created(){
      this.getnowOrderDetail();
      this.getList();
  },
  data() {
    return {
      type:[],
      listQuery:{
        amountFrom:null,
        amountTo:null,
        orderId:null,
        type:null,
        start:null,
        end:null,
        pageNum: 1,
        limit: 10,
        searchText: null,
      },
      ordertype:{

      },
      total: null,
      listLoading: true,
      tableData: null,
      dialogFormVisible:false,
      totalCount:null,

    };
  },
  computed: {
     nowDay() {
        let nowdate = new Date();
        return getFormtDate(nowdate, "yyyy-MM-dd");
     }
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    returnTypeName(type) {
      if(type == 'admin_charge'){
          return '管理员充值';
      }else if(type == 'charge'){
          return '充值';
      }else if(type == 'withdraw'){
          return '提现';
      }else if(type == 'transform_to_game'){
          return '转入游戏钱包';
      }else if(type == 'transform_to_main'){
          return '转出游戏钱包';
      }else if(type == 'backwater'){
          return '返水';
      }else if(type == 'reward'){
          return '奖励（推荐用户充值等）';
      }else if(type == 'manual_increase'){
          return '客服手动增加金额';
      }else if(type == 'manual_reduction'){
          return '客服手动减少金额';
      }else if(type == 'transfer_failed'){
          return '提现失败';
      }else if(type == 'rejet'){
          return '拒绝提现';
      }
    },
    getnowOrderDetail(){
      nowOrderDetail().then((res) => {
        this.totalCount = res.data;
      });
    },
    getList() {
      if(Array.isArray(this.type) && this.type.length != 0){
          this.listQuery.type = this.type;
      }
      this.listLoading = true;
      getOrderList(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
      this.listQuery.endTime = getFormtDate(this.$refs.datepick.value4[1]);
      this.getList();
    },
    handleFilterClose(){
      this.listQuery.searchText = null;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    selectOrderList(){
      this.dialogFormVisible = false;
      this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
      this.listQuery.end = getFormtDate(this.$refs.datepick.value4[1]);
      this.listQuery.pageNum = 1;
      if(Array.isArray(this.type) && this.type.length != 0){
          this.listQuery.type = this.type;
      }
      getOrderList(this.listQuery).then((res) => {
          if(res.status){
            this.tableData = res.data.list;
            this.total = res.data.total;
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              console.log(res);
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
<style slot-scope="scope">

.col-md-1-5 {

width: 20%;

float: left;

}

.col-xs-1-5,.col-sm-1-5,.col-md-1-5,.col-lg-1-5 {

min-height: 1px;

padding-left: 10px;

padding-right: 0px;

position: relative;

}
@media (min-width: 768px) {

.col-sm-1-5 {

width: 20%;

float: left;

}

}

@media (min-width: 992px) {

.col-md-1-5 {

width: 20%;

float: left;

}

}

@media (min-width: 1200px) {

.col-lg-1-5 {

width: 20%;

float: left;

}

}

.order_id{
  margin-right: 10px;
}
.ordersearch .topthree{
  padding-top: 10px;

}
.ordersearch p{
  margin-bottom: 5px;
  
}
.ordersearch .title{
  font-size: 14px;
  
}
.newuserbox .ordersearch .topthree {
  line-height: 2;
}
</style>

