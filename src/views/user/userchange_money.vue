<template>
  <section class="wrapperDetail">
    <div class="row">
<!--       <div class="col-lg-12 ">
        <div class=" white-bg pd-20 clearfix mbt-20 pd-10">
          <div class="homeicon fl"></div>
          <ul class="page_hiostory fl">
            <li>主页 -> </li>
            <li>用户管理  -> </li>
            <li>用户详情  -> </li>
            <li>调整余额</li>
          </ul>
        </div>
      </div> -->

      <div class="col-lg-12">
          <div class=" white-bg pd-20">
              <h4>调整余额</h4>
              <div class="ucm_infobox">
                  <span>姓名:<span>{{userInfo.realname}}</span></span>
                  <span>等级:<span>{{userInfo.level}}</span></span>
                  <span>玩家开始于:<span>{{fomatTime(userInfo.createdAt)}}</span></span>
              </div>
              <!--固定版table-->
              <div class="pd-20">
                <table class="normaltable">
                  <tr>
                    <th>钱包类型</th>
                    <th>玩家账户余额</th>
                    <th>	操作</th>
                  </tr>
                  <tr>
                    <td>主钱包余额</td>
                    <td>{{userBalance.wallet/100}}</td>
                    <td>
                      <div class="font-blue opbox">
                        <span @click="setDialogType(1)">手动减少余额</span>
                        <span @click="setDialogType(4)">加奖金</span>
                      </div>
                      <div class="font-blue opbox">
                        <span @click="setDialogType(2)">手动增加余额</span>
                        <span @click="setDialogType(3)">返水</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>PT子钱包余额</td>
                    <td>{{userBalance.pt/100}}</td>
                    <td>
                      <div class="font-blue opbox">
                        <span @click="setDialogType(5)">子钱包取回主钱包</span><br/>
                        <span @click="setDialogType(6)">主钱包存到子钱包</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>NT子钱包余额</td>
                    <td>{{userBalance.nt/100}}</td>
                    <td>
                      <div class="font-blue opbox">
                        <span @click="setDialogType(7)">子钱包取回主钱包</span><br/>
                        <span @click="setDialogType(8)">主钱包存到子钱包</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>MG子钱包余额</td>
                    <td>{{userBalance.mg/100}}</td>
                    <td>
                      <div class="font-blue opbox">
                        <span @click="setDialogType(9)">子钱包取回主钱包</span><br/>
                        <span @click="setDialogType(10)">主钱包存到子钱包</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

          </div>


      </div>
      <div class="col-lg-12">
        <div class=" white-bg pd-20 mt20 clearfix">
          <h4>调整记录</h4>

          <el-table :data="tableData"  style="width: 100%">
              <el-table-column prop="date"  align="center" label="时间">
                <template slot-scope="scope">
                  <span>{{fomatTime(scope.row.createTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date"  align="center" label="用户名">
                <template slot-scope="scope">
                  <span>{{scope.row.userName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="change" align="center" label="调整类型">
                <template slot-scope="scope">
                  <span>{{returntypeName(scope.row.type)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="change" align="center" label="调整金额">
                <template slot-scope="scope">
                  <span>{{scope.row.amount/100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="changebefore" align="center" label="调整前">
                <template slot-scope="scope">
                  <span>{{scope.row.oldValue/100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="changeafter" align="center" label="调整后">
                <template slot-scope="scope">
                  <span>{{scope.row.newValue/100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="changeafter" align="center" label="操作人">
                <template slot-scope="scope">
                  <span>{{scope.row.operatorName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="reason" align="center" label="原因">
                <template slot-scope="scope">
                  <span>{{scope.row.reason}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination fr">
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="adjustmentQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="adjustmentQuery.limit" :total="total">
              </el-pagination>
            </div>

        </div>

      </div>

    </div>

    <!--手动调整余额和返水-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="金额：" :label-width="formLabelWidth">
          <el-input v-model="balanceQuery.money" auto-complete="off" placeholder="金额"></el-input>
        </el-form-item>
        <el-form-item label="调整原因：" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="调整原因" v-model="balanceQuery.reason">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setBalance">确 定</el-button>
      </div>
    </el-dialog>

    <!--加奖金-->
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible2" custom-class="dialognew">
      <el-form :model="form">
        <el-form-item label="活动充值金额：" :label-width="formLabelWidth">
          <el-input v-model="addActiveQuery.rechargeSum" auto-complete="off" placeholder="金额"></el-input>
        </el-form-item>
        <el-form-item label="优惠活动：" :label-width="formLabelWidth">
          <el-select v-model="addActiveQuery.actId" placeholder="请选择活动" popper-class="activebox">
            <el-option v-for="(item,index) in activeList" :label="item.ruleName" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整原因：" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="调整原因" v-model="addActiveQuery.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="setMoney">确 定</el-button>
      </div>
    </el-dialog>

    <!--子钱包取回主钱包-->
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible3" custom-class="dialognew">
      <el-form :model="form">
        <el-form-item label="金额：" :label-width="formLabelWidth">
          <el-input v-model="gameQuery.money" auto-complete="off" placeholder="金额"></el-input>
        </el-form-item>
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="gameQuery.recordType" placeholder="选择类型" popper-class="activebox">
            <el-option label="实际补充余额" value="1"></el-option>
            <el-option label="仅补单" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整原因：" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="调整原因" v-model="gameQuery.reason">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="setGame">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
import {mapState} from 'vuex'
import datepickerbar from '../../components/datepicker/datepickerbar.vue'
import {getUserInfo,getUserBalance,updateAdjustment,updateGameAndWallet,getUserAdjustment,marketRuleQuery,addActiveMoney,actSignAdd} from '../../service/getData'
import {getTimeDate} from '../../config/mUtils'

  export default {
    components: {
    },
    created(){
      this.getUserInfoData();
      this.getUserBalanceData();
      this.getUserAdjustmentData();
      this.getActiveListData();
    },
    computed: {
      ...mapState([
        'adminId'
        ]),
      userid(){
        return this.$route.query.id;
      }
    },
    data() {
      return {
        activeList:null,
        addActiveQuery: {
          userId:null,
          userName:null,
          actId:null,
          rechargeSum:null,
          description:null
        },
        tableData:null,
        listLoading:false,
        userInfo:null,
        userBalance:null,
        total:null,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogTitle: null,
        urlType:null,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        balanceQuery:{
          money:null,
          reason:null
        },
        moneyQuery:{
          "userId":20,
          "gameType":1,
          "balanceFrom":"pt",
          "balanceTo":"main",
          "money":100,
          "recordType":1,
          "reason":"ttttt"

        },
        gameQuery:{
          money:null,
          recordType:null,
          reason:null
        },
        adjustmentQuery: {
          pageNum: 1,
          limit: 10,
          userId:null
        },
        formLabelWidth: '100px'
      };
    },
    methods: {
      setlistData(){
        this.getUserBalanceData();
        this.getUserAdjustmentData();
        this.getActiveListData();
      },
      returntypeName(type) {
        if(type==0){
          return '加余额';
        }else if(type==1){
          return '减少余额';
        }else if(type==2){
          return '手动加返水';
        }
      },
      fomatTime(time){
         return getTimeDate(time);
      },
      getUserInfoData() {
        this.listLoading = true;
        let id = this.$route.query.id;
        getUserInfo(id).then((res) => {
          this.userInfo = res.data;
          this.userInfo.birthdayFomat = getTimeDate(this.userInfo.birthday);
          this.listLoading = false;
        });
      },
      getUserBalanceData() {
        this.listLoading = true;
        let id = this.$route.query.id;
        getUserBalance(id).then((res) => {
          this.userBalance = res.data;
          this.listLoading = false;
        });
      },
      getUserAdjustmentData() {
        this.listLoading = true;
        this.adjustmentQuery.userId = this.userid;
        getUserAdjustment(this.adjustmentQuery).then((res) => {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.listLoading = false;
        });

      },
      setDialogType(type) {
        if(type==1){
          this.dialogTitle='手动减少余额';
          this.dialogFormVisible = true;
          this.urlType = 1;
        }else if(type==2){
          this.dialogTitle='手动增加余额';
          this.dialogFormVisible = true;
          this.urlType = 2;
        }else if(type==3){
          this.dialogTitle='手动返水';
          this.dialogFormVisible = true;
          this.urlType = 3;
        }else if(type==4){
          this.dialogTitle='加奖金';
          this.dialogFormVisible2 = true;
          this.urlType = 4;
        }else if(type==5){
          this.dialogTitle='子钱包(pt)取回主钱包';
          this.dialogFormVisible3 = true;
          this.urlType = 5;
        }else if(type==6){
          this.dialogTitle='主钱包存到子钱包(pt)';
          this.dialogFormVisible3 = true;
          this.urlType =6;
        }else if(type==7){
          this.dialogTitle='子钱包(nt)取回主钱包';
          this.dialogFormVisible3 = true;
          this.urlType = 7;
        }else if(type==8){
          this.dialogTitle='主钱包存到子钱包(nt)';
          this.dialogFormVisible3 = true;
          this.urlType = 8;
        }else if(type==9){
          this.dialogTitle='子钱包(mg)取回主钱包';
          this.dialogFormVisible3 = true;
          this.urlType = 9;
        }else if(type==10){
          this.dialogTitle='主钱包存到子钱包(mg)';
          this.dialogFormVisible3 = true;
          this.urlType = 10;
        }
      },
      setBalance() {
        this.dialogFormVisible = false;
            if(this.urlType ==1){
              this.balanceQuery.type = 1;
            }else if(this.urlType==2){
              this.balanceQuery.type = 0;
            }else if(this.urlType==3){
              this.balanceQuery.type = 2;
            }
            this.balanceQuery.userId = this.userid;
            this.balanceQuery.operator_id = this.adminId;
            updateAdjustment(this.balanceQuery).then((res) => {
            if(res.status){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.setlistData();
            }else{
              this.$message.error(res.message);
            }
          });

      },
      setMoney() {
        this.dialogFormVisible2 = false;
        this.addActiveQuery.userId = this.userInfo.id;
        this.addActiveQuery.userName = this.userInfo.username;
        this.addActiveQuery.rechargeSum = parseInt(this.addActiveQuery.rechargeSum);
        actSignAdd(this.addActiveQuery).then((res) => {
          if(res.status){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.setlistData();
          }else{
            this.$message.error(res.message);
          }
        });
      },
      setGame() {
        this.dialogFormVisible3 = false;
        if(this.urlType == 5){
          this.gameQuery.gameType= 1;
          this.gameQuery.balanceFrom = 'pt';
          this.gameQuery.balanceTo = 'main';
        }else if(this.urlType == 6){
          this.gameQuery.gameType= 0;
          this.gameQuery.balanceFrom = 'main';
          this.gameQuery.balanceTo = 'pt';
        }else if(this.urlType == 7){
          this.gameQuery.gameType= 1;
          this.gameQuery.balanceFrom = 'nt';
          this.gameQuery.balanceTo = 'main';
        }else if(this.urlType == 8){
          this.gameQuery.gameType= 0;
          this.gameQuery.balanceFrom = 'main';
          this.gameQuery.balanceTo = 'nt';
        }else if(this.urlType ==9){
          this.gameQuery.gameType= 1;
          this.gameQuery.balanceFrom = 'mg';
          this.gameQuery.balanceTo = 'main';
        }else if(this.urlType == 10){
          this.gameQuery.gameType= 0;
          this.gameQuery.balanceFrom = 'main';
          this.gameQuery.balanceTo = 'mg';
        }
        this.gameQuery.userId = this.userid;
        this.gameQuery.operatorId = this.adminId;
        updateGameAndWallet(this.gameQuery).then((res) => {
        if(res.status){
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.setlistData();
        }else{
          this.$message.error(res.message);
        }
      });

      },
      getActiveListData() {
        let query = {};
        query.pageNum = 1;
        query.limit = 100;
        marketRuleQuery(query).then((res) => {
            this.activeList = res.data.list;
        });

      },
      handleSizeChange(val) {
        this.adjustmentQuery.limit = val;
        this.getUserAdjustmentData();
      },
      handleCurrentChange(val) {
        this.adjustmentQuery.pageNum = val;
        this.getUserAdjustmentData();
      },
    }
  };
</script>

<style>
.dialognew .el-form-item .el-select{
  width: 90%;
}

.dialognew .el-form-item .el-select .el-input{
  width: 100%;
}

  .dialognew .el-input{
    width: 90%;
  }

.dialognew label{
  width: 120px !important;
}

.dialognew .el-textarea{
  width: 90%;
}
</style>
