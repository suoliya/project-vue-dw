<style>
.el-table__body,.el-table__header{
  width: 100% !important;
}

.tx-dialog .el-form{
  float: left;
  }

.tx-dialog .el-dialog--small{
  width: 830px;
}

.search-box2 input{
  min-width:280px !important;
}

.appdetail span{
  margin-right: 0;
}
</style>
<template>
    <section class="wrapperDetail">
        <!--用户列表-->
        <div class="row">
           <div class="col-lg-12 ">
              <div class="white-bg pd-20 clearfix usertitle" style="border:0;">
                  <ul class="page_hiostory fl ">
                    <li style="font-size:18px;">提现详情</li>
                  </ul>
              </div>
            </div>
             <div class="col-lg-12 ">
                <div class="white-bg pd-20 clearfix" style="border:0;">
                    <div v-if="withdrawInfo.status=='pending'">
                        <div class="tx-status"></div><span class="status-ft">提现状态 : 提现申请中.....</span>
                    </div>
                    <div v-else-if="withdrawInfo.status=='transferring'">
                        <div class="tx-status"></div><span class="status-ft">提现状态 : 申请中.....</span>
                    </div>
                    <div v-else-if="withdrawInfo.status=='reject'">
                        <div class="tx-status"></div><span class="status-ft">提现状态 : 申请不通过.....</span>
                        <div><span class="status-ft">不通过原因：{{withdrawInfo.checkUnpassReason}}</span></div>
                    </div>
                    <div v-else-if="withdrawInfo.status=='transfer_failed'">
                        <div class="tx-status"></div><span class="status-ft">提现状态 : 打款失败.....</span>
                        <div><span class="status-ft">失败原因：{{withdrawInfo.financeUnpassReason}}</span></div>

                    </div>
                    <div v-else-if="withdrawInfo.status=='transfer_success'">
                        <div class="tx-status"></div><span class="status-ft">提现状态 : 打款成功.....</span>
                    </div>

                    <div class="fr appdetail" style="margin-top: 0px;">
                        <div v-if="withdrawInfo.status=='pending'" style="margin-bottom: 30px;">
                            <el-button type="primary" @click="setStatus(1,'transferring')">通过</el-button>
                            <el-button type="danger" @click="setStatus(2,'reject')">拒绝</el-button>
                        </div>
                        <div v-else-if="withdrawInfo.status=='transferring'&&source==2" style="margin-bottom: 30px;">
                            <el-button type="primary" @click="setStatus(1,'transfer_success')">通过</el-button>
                            <el-button type="danger" @click="setStatus(2,'transfer_failed')">拒绝</el-button>

                        </div>
                        <span>财务处理人: {{withdrawInfo.financeStaff}} </span>
                        <span>审核处理人: {{withdrawInfo.checkStaff}} </span>

                    </div>
                </div>
            </div>
        </div>

        <div class="row">
             <div class="col-lg-12 ">
                <div class="white-bg clearfix detailDiv" style="border:0;">
                    <table class="detailTable">
                        <thead>
                          <tr>
                            <th class="detailTable_title">用户信息<span></span></th>
                            <th>用户名</th>
                            <th>用户姓名</th>
                            <th>用户等级</th>
                            <th>创建时间</th>
                            <th>提现金额</th>
                            <th>提现银行</th>
                            <th>交易账号</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>{{withdrawInfo.username}}</td>
                            <td>{{withdrawInfo.realname}}</td>
                            <td>{{withdrawInfo.level}}</td>
                            <td>{{FormtDate(withdrawInfo.userCreatedAt)}}</td>
                            <td>{{withdrawInfo.amount/100}}</td>
                            <td>{{withdrawInfo.accountBankName}}</td>
                            <td>{{withdrawInfo.accountCode}}</td>
                          </tr>
                        </tbody>
                    </table>
                    <table class="detailTable mt-20">
                        <thead>
                          <tr>
                            <th class="detailTable_title changeColor">交易信息<span></span></th>
                            <th>提现订单号</th>
                            <th>提现时间</th>
                            <th>审核通过时间</th>
                            <th>提现成功时间</th>
                            <th>提现IP</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>{{withdrawInfo.orderId}}</td>
                            <td>{{FormtDate(withdrawInfo.createdAt)}}</td>
                            <td>{{FormtDate(withdrawInfo.checkOpTime)}}</td>
                            <td>{{FormtDate(withdrawInfo.financeOpTime)}}</td>
                            <td> {{withdrawInfo.withdrawIp}}</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- <div class="row">
            <div class="col-lg-12 ">
              <div class="white-bg clearfix" style="border:0;">
                    <ul class="titlet">
                        <li>提现信息</li>
                        <li>用户信息</li>
                    </ul>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col-lg-12 ">
          <div class="white-bg clearfix pd-20" style="border:0;">
            
                  <ul class="titlet2">
                      <li>
                          <ul>
                              <li>提现金额: {{withdrawInfo.amount/100}}元</li>
                              <li>提现银行: {{withdrawInfo.accountBankName}}</li>
                              <li>交易账号:{{withdrawInfo.accountCode}}</li>
                          </ul>
                      </li>
                      <li>
                          <ul>
                              <li>用户名: {{withdrawInfo.username}}</li>
                              <li>用户姓名: {{withdrawInfo.realname}}</li>
                              <li>用户等级: {{withdrawInfo.level}}</li>
                              <li>创建时间: {{FormtDate(withdrawInfo.userCreatedAt)}}</li>
                          </ul>
                      </li>
                  </ul>
            </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 ">
              <div class="white-bg clearfix" style="border:0;">
                    <ul class="titlet">
                        <li style="width:100%">交易信息</li>
                    </ul>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col-lg-12 ">  
            <div class="white-bg clearfix pd-20" style="border:0;">
                  <ul class="titlet2">
                      <li>
                          <ul>
                              <li>提现订单号:{{withdrawInfo.orderId}}</li>
                              <li>提现时间: {{FormtDate(withdrawInfo.createdAt)}}</li>
                              <li>审核通过时间: {{FormtDate(withdrawInfo.checkOpTime)}}</li>
                              <li>提现成功时间: {{FormtDate(withdrawInfo.financeOpTime)}}</li>
                              <li>提现IP: {{withdrawInfo.withdrawIp}}</li>
                          </ul>
                      </li>
<!--                       <li>
    <ul>
        <li>收款类型:</li>
    </ul>
</li> -->
                  </ul>
            </div>
            </div>
        </div> -->
        <div class="row">
          <div class="col-lg-12 mt-10">
              <div class="white-bg clearfix pd-20" style="border:0;">
              <!--提现审核-->
                   <h2>提现审核</h2>
                    <user-trade-log :userid="userid" ></user-trade-log>
              </div>
          </div>
        </div>
        


    </section>
</template>

<script>
import {mapState} from 'vuex'
import { withdrawDetail,ServiceWithdrawList,ServiceAdminList,ServiceWithdrawSure} from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
import datepickerbar from '../../components/moudle/datepickerbar.vue'
import userTradeLog from '../../components/trade/userTradeLog.vue'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    datepickerbar,
    userTradeLog
  },
  mounted () {
  },
  created(){
    this.getWithdrawInfo();
  },
  data() {
    return {
       withdrawInfo:null,
       listLoading: false,
       total:null,
       tableData:null,
       adminlist:null,
       userid :null,
    }
  },
  computed: {
    ...mapState([
      'adminName','adminId'
      ]),
    withdrawId(){
      return this.$route.query.id;
    },
    userid(){
      return this.$route.query.userid;
    },
    source(){
      return this.$route.query.source;
    },
  },
  methods: {

      FormtDate: function (time) {
         return getTimeDate(time);
      },
      getWithdrawInfo(){
        this.listLoading = true;
        withdrawDetail(this.withdrawId).then((res) => {
            this.withdrawInfo = res.data;
            this.userid  = this.withdrawInfo.userId;
            this.listLoading = false;
        });
      },
      setStatus(p,status){
        if(p==1){

          this.$confirm('确认提现？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.ServiceWithdrawSureData(status);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        }else{
          
          this.$prompt('请输入拒绝原因', '提示', {
              confirmButtonText: '确认拒绝',
              cancelButtonText: '取消操作',
              inputPattern: /\S/,
              inputErrorMessage: '原因不能为空'
            }).then(({ value }) => {
              this.ServiceWithdrawSureData(status,value);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });       
            });
        }

      },
      ServiceWithdrawSureData(status,reason=''){
        let query = {};
        query.id = this.withdrawInfo.id;
        query.status = status;
        query.reason = reason;
        ServiceWithdrawSure(query).then((res) => { 
            if(res.status){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getWithdrawInfo();
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
