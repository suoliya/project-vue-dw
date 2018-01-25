<template>	
    <div class="white-bg pd-20 clearfix ">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="充值记录" name="first">
          <!--玩家记录tab-->
          <div class="usl-select-tj  white-bg pd-10 clearfix">
            <label>交易状态：</label>
            <el-select v-model="listQuery.status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <label class="ml10">选择处理人：</label>
            <el-select v-model="listQuery.staffId" placeholder="请选择">
            <el-option  label="全部" value=""></el-option>
              <el-option
                v-for="item in adminlist"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>

            <label class="ml10">时间范围：</label>
            <list-time-area ref="datepick1" @timeValue="handleFilter"></list-time-area>
            <div class="inline fr search-box search-box2 search-box2">
              <input type="text" placeholder="订单号" v-model="listQuery.searchText">
              <div class="inline"  @click="handleFilter">
                  <i class="el-icon-search" v-if="listQuery.searchText==null"></i>
                  <i class="el-icon-close" @click="handleFilterClose" v-else></i>
              搜索
              </div>
            </div>
          </div>
          <el-table :data="tableData" stripe style="width: 100%">

              <el-table-column align="center" label="充值订单号" width="200">
                <template slot-scope="scope">
                <router-link target = _blank :to="{path:'/trade/cdetail',query: {'id': scope.row.id}}">
                <span>{{scope.row.orderId}}</span>
                </router-link>
                  
                </template>
              </el-table-column>
              <el-table-column align="center" label="充值时间"  width="180">
                <template slot-scope="scope">
                  <span>{{FormtDate(scope.row.createdAt)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="充值方式" width="100">
                <template slot-scope="scope">
                  <span>{{ FormchargeTyp(scope.row.chargeType) }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="交易账号" width="100">
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
                  <span>{{ FormtChargeStatus(scope.row.status) }}</span>
                </template>
              </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="second">
          <!--玩家记录tab-->
         <div class="usl-select-tj  white-bg pd-10 clearfix">
             <label>交易状态：</label>
             <el-select v-model="listQuery.status" placeholder="请选择">
               <el-option
                 v-for="item in statusList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>

             <label class="ml10">选择处理人：</label>
             <el-select v-model="listQuery.staffId" placeholder="请选择">
             <el-option  label="全部" value=""></el-option>
               <el-option
                 v-for="item in adminlist"
                 :key="item.id"
                 :label="item.userName"
                 :value="item.id">
               </el-option>
             </el-select>

             <label class="ml10">时间范围：</label>
             <list-time-area ref="datepick2" @timeValue="handleFilter"></list-time-area>
             <div class="inline fr search-box search-box2 search-box2">
               <input type="text" placeholder="订单号" v-model="listQuery.searchText">
               <div class="inline"  @click="handleFilter"><i class="icon-search"></i>搜索</div>
             </div>
           </div>
          <el-table :data="tableData" stripe style="width: 100%">

                <el-table-column align="center" label="提现订单号" width="200">
                  <template slot-scope="scope">
                  <router-link target = _blank :to="{path:'/trade/withdrawalsdetail',query: {'id': scope.row.id,'source':source,'userid':scope.row.userId}}">
                  <span>{{scope.row.orderId}}</span>
                  </router-link>
                    
                  </template>
                </el-table-column>
                <el-table-column align="center" label="提现申请时间" width="160">
                  <template slot-scope="scope">
                    <span>{{FormtDate(scope.row.createdAt)}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="户名" >
                  <template slot-scope="scope">
                    <span>{{scope.row.accountUserName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="开户行" >
                  <template slot-scope="scope">
                    <span>{{scope.row.accountBankName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="银行卡号" >
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
                    <span>{{ FormtWithStatus(scope.row.status) }}</span>
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
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="third">
          <!--玩家记录tab-->
        <el-table :data="tableData" stripe style="width: 100%">

            <el-table-column align="center" label="时间">
              <template slot-scope="scope">
                <span>{{FormtDate(scope.row.createdAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="类型">
              <template slot-scope="scope">
                <span>{{returnOperType(scope.row.operationType)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作ip">
              <template slot-scope="scope">
                <span>{{scope.row.ip}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作描述">
              <template slot-scope="scope">
                <span>{{scope.row.description}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作员">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
        </el-table>
        </el-tab-pane>

        <el-tab-pane label="游戏历史" name="fourth">
          <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column align="center" label="玩家用户名">
                <template slot-scope="scope">
                  <span>{{scope.row.playerName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="游戏提供商">
                <template slot-scope="scope">
                  <span>{{scope.row.platform}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="游戏名称">
                <template slot-scope="scope">
                  <span>{{scope.row.gameName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="结果数值">
                <template slot-scope="scope">
                  <span>{{scope.row.win}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="投注+结果">
                <template slot-scope="scope">
                  <span>{{scope.row.win-scope.row.bet}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="过后余额">
                <template slot-scope="scope">
                  <span>{{scope.row.balance}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="交易金额">
                <template slot-scope="scope">
                  <span>{{scope.row.bet}}</span>
                </template>
              </el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>
      <div class="pagination fr">
        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import {ServiceChargeList,getUserInfo,ServiceAdminList,ServiceWithdrawList,getUserIpRecord,getUserLog,gameLog} from '../../service/getData'
import {getTimeDate,jsGetAge,getFormtDate } from '../../config/mUtils'
import listTimeArea from '../../components/moudle/listTimeArea.vue'


  export default {
    components: {
      listTimeArea
    },
    created(){
      this.getUserInfoData();
      this.changeTableData();
      this.adminlistAll();
    },
    computed:{  
      source(){
        return this.$route.query.source;
      },
    },
    name: 'userGamePlayer',
    data() {
      return {
        userInfo:null,
        adminlist:null,
        total:null,
        activeName: 'first',
        dataType:0,
        tableData:null,
        statusList:null,
        listQuery: {
          pageNum: 1,
          limit: 10,
          status: null,
          staffId: null,
          beginTime: null,
          endTime: null,
          searchText: null,
          userId:null
        },
        chargeStatusList:[
          {value:'',label:'全部'},
          {value:'pending',label:'未成功'},
          {value:'success',label:'成功'},
          {value:'reject',label:'拒绝'}
        ],
        withdrawStatusList:[
        {value:'',label:'全部'},
        {value:'pending',label:'提现申请中'},
        {value:'transferring',label:'申请通过，打款中'},
        {value:'reject',label:'申请不通过'},
        {value:'transfer_failed',label:'打款失败'},
        {value:'transfer_success',label:'打款成功'}
        ],
      }
    },
    props: {
      userid: {
        type: Number
      },

    },
    methods: {
      async getUserInfoData() {
        let id = this.userid;
        let res = await getUserInfo(id);
        this.userInfo = res.data;
      },
      adminlistAll() {

          let query = {pageNum:1,limit:100};
          ServiceAdminList(query).then((res) => {
              this.adminlist = res.data.list;
          });
      },
      FormtDate(time){
         return getTimeDate(time);
      },
      FormchargeTyp(chargeType) {
        let platname = chargeType;
        if(chargeType == 'platform'){
            platname = '平台充值';
        }
        return platname;
      },
      FormtChargeStatus(status) {
        let statusName = null;
        if(status == 'pending'){
          statusName = '未成功';
        }else if(status == 'success'){
          statusName = '成功';
        }else if(status == 'reject'){
          statusName = '拒绝';
        }

        return statusName;
      },
      FormtWithStatus(status) {

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
      returnOperType(type) {
        if(type == 'create_bank_account'){
          return '创建银行卡';
        }else if(type == 'edit_bank_account'){
          return  '编辑银行卡信息';
        }else if(type == 'change_bank_account_status'){
          return '更换银行卡状态';
        }else if(type == 'activity_sign'){
          return '活动参加';
        }else if(type == 'userinfo_change'){
          return '玩家信息变更';
        }else if(type == 'login'){
          return '登录';
        }
      },
      changeTableData(){
        let mainFun = null;
        let query = {};
        this.listQuery.userId = this.userid;
        if(this.dataType == 0){
          this.statusList = this.chargeStatusList;
          query = this.listQuery;
          mainFun = ServiceChargeList(query);
        }else if(this.dataType == 1){
          this.statusList = this.withdrawStatusList;
          query = this.listQuery;
          mainFun = ServiceWithdrawList(query);
        }else if(this.dataType == 2){

          query = this.listQuery;          
          mainFun = getUserLog(query);

        }else if(this.dataType == 3){
          query.pageNum = this.listQuery.pageNum;
          query.limit = this.listQuery.limit;
          query.gameAccount = this.userInfo.gameAccount;
          mainFun = gameLog(query);

        }
        this.listLoading = true;
        this.listQuery.userId = this.userid;
        mainFun.then((res) => {
            if(this.dataType == 2){

              let list = res.data.list;
              list.forEach(function (val) {

                val.content = eval('(' + val.content + ')');
                //console.log(val.content);
                  
              });
              this.tableData = list;
            }else{

              this.tableData = res.data.list;

            }
            this.total = res.data.total;
            this.listLoading = false;
        });
      },

      handleClick(tab, event) {
        this.dataType = tab.index;
        this.changeTableData();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.changeTableData();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.changeTableData();
      },
      handleFilter() {
        if(this.dataType == 0){
          this.listQuery.beginTime = getFormtDate(this.$refs.datepick1.value4[0]);
          this.listQuery.endTime = getFormtDate(this.$refs.datepick1.value4[1]);
        }else if(this.dataType == 1){
          this.listQuery.beginTime = getFormtDate(this.$refs.datepick2.value4[0]);
          this.listQuery.endTime = getFormtDate(this.$refs.datepick2.value4[1]);
        }

        this.changeTableData();
      },
      handleFilterClose(){
        this.listQuery.searchText = null;
        this.handleFilter();
      },
    }
  }
</script>