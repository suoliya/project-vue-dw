<template>	
    <div class="white-bg pd-20 clearfix ">
      <h1>玩家记录</h1>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="充值记录" name="first">
          <!--玩家记录tab-->
          <div class="usl-select-tj  white-bg pd-10 clearfix">
            <label>交易状态：</label>
            <el-select v-model="listQuery.status" placeholder="请选择" class="smallsel2">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <label class="ml10">选择处理人：</label>
            <el-select v-model="listQuery.staffId" placeholder="请选择" class="smallsel2">
              <el-option  label="全部" value=""></el-option>
              <el-option
                v-for="item in adminlist"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>

            <label class="ml10">时间范围：</label>
            <datepickerbar ref="datepick" style="width:300px;"></datepickerbar>
            <div class="inline fr search-box search-box2 search-box2">
              <input type="text" placeholder="充值单号" v-model="listQuery.searchText">
              <div class="inline"  @click="handleFilter"><i class="icon-search"></i>搜索</div>
            </div>
          </div>
          <el-table :data="tableData" stripe style="width: 100%">

              <el-table-column align="center" label="充值订单号" width="200">
                <template slot-scope="scope">
                  <span>
                  <router-link target = _blank :to="{path:'/trade/cdetail',query: {'id': scope.row.id}}">
                  {{scope.row.orderId}}
                  </router-link>
                  </span>
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
             <datepickerbar ref="datepick"></datepickerbar>
             <div class="inline fr search-box search-box2 search-box2">
               <input type="text" placeholder="提现订单号" v-model="listQuery.searchText">
               <div class="inline"  @click="handleFilter"><i class="icon-search"></i>搜索</div>
             </div>
           </div>
          <el-table :data="tableData" stripe style="width: 100%">

                <el-table-column align="center" label="提现订单号" width="210">
                  <template slot-scope="scope">
                    <span>
                      <router-link target = _blank :to="{path:'/trade/withdrawalsdetail',query: {'id': scope.row.id}}">{{scope.row.orderId}}</router-link>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="提现申请时间"  width="180">
                  <template slot-scope="scope">
                    <span>{{FormtDate(scope.row.createdAt)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="用户名" width="130">
                  <template slot-scope="scope">
                    <span>{{scope.row.username }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="户名" width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.accountUserName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="开户行"  width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.accountBankName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="银行卡号" width="250">
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
        <el-tab-pane label="IP历史" name="fourth">
          <!--玩家记录tab-->
        <el-table :data="tableData" stripe style="width: 100%">

            <el-table-column align="center" label="IP">
              <template slot-scope="scope">
                <span>{{scope.row.ip}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="登录时间" >
              <template slot-scope="scope">
                <span>{{FormtDate(scope.row.ceratedAt)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="登录城市">
              <template slot-scope="scope">
                <span>{{scope.row.city}}</span>
              </template>
            </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-tab-pane label="银行卡账户更新历史" name="five">
          
          <el-table :data="tableData" stripe style="width: 100%">

              <el-table-column align="center" label="ID">
                <template slot-scope="scope">
                  <span>{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="类型">
                <template slot-scope="scope">
                  <span>{{returnOperType(scope.row.operationType)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="银行卡">
                <template slot-scope="scope">
                  <span>{{scope.row.content.account_code}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="银行名称">
                <template slot-scope="scope">
                  <span>{{scope.row.content.account_bank_name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="姓名">
                <template slot-scope="scope">
                  <span>{{scope.row.content.account_user_name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="支行名称">
                <template slot-scope="scope">
                  <span>{{scope.row.content.account_bank_branch}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <span>{{scope.row.description}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="登录时间">
                <template slot-scope="scope">
                  <span>{{FormtDate(scope.row.createdAt)}}</span>
                </template>
              </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="游戏历史" name="seven">
          
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
import {ServiceChargeList,ServiceAdminList,ServiceWithdrawList,getUserIpRecord,getUserLog,gameLog} from '../../service/getData'
import datepickerbar from '../../components/moudle/datepickerbar.vue'
import {getTimeDate,jsGetAge,getFormtDate } from '../../config/mUtils'

  export default {
    components: {
      datepickerbar
    },
    created(){
      this.changeTableData();
      this.adminlistAll();
    },
    computed:{  

    },
    name: 'userGamePlayer',
    data() {
      return {
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
          {value:'pending',label:'待处理'},
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
      gameAccount:{
        type:String
      }
    },
    methods: {
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
          statusName = '待处理';
        }else if(status == 'success'){
          statusName = '成功';
        }else if(status == 'reject'){
          statusName = '拒绝';
        }else if(status=='unpaid'){
          statusName = '未支付';
        }

        return statusName;
      },
      FormtWithStatus() {

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
        }
      },
      adminlistAll() {

          let query = {pageNum:1,limit:100};
          ServiceAdminList(query).then((res) => {
              this.adminlist = res.data.list;
          });
      },
      changeTableData(){
        let mainFun = null;
        let query = {};

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
          query = this.listQuery;
          mainFun = getUserIpRecord(query);
          
        }else if(this.dataType == 4){
            query = this.listQuery;
            let typelist = ['create_bank_account','edit_bank_account','change_bank_account_status'];
            query.operationType = JSON.stringify(typelist);
            mainFun = getUserLog(query);
        }else if(this.dataType == 5){
          query.pageNum = this.listQuery.pageNum;
          query.limit = this.listQuery.limit;
          query.gameAccount = this.gameAccount;
          mainFun = gameLog(query);

        }
        this.listLoading = true;
        this.listQuery.userId = this.userid;
        mainFun.then((res) => {
            if(this.dataType == 4 || this.dataType == 2){

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
        this.listQuery.beginTime = getFormtDate(this.$refs.datepick.value4[0]);
        this.listQuery.endTime = getFormtDate(this.$refs.datepick.value4[1]);
        this.changeTableData();
      },
    }
  }
</script>