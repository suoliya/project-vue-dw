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

</style>
<template>
    <section class="wrapperDetail">
        <!--用户列表-->
        <div class="row">
           <div class="col-lg-12 ">
              <div class="white-bg pd-20 clearfix usertitle" style="border:0;">
                  <ul class="page_hiostory fl ">
                    <li style="font-size:18px;">充值详情</li>
                  </ul>
              </div>
            </div>
             <div class="col-lg-12 ">
                <div class="white-bg pd-20 clearfix" style="border:0;">
                    <div v-if="chargeInfo.status=='unpaid'">
                        <div class="tx-status st2"></div><span class="status-ft "><span  style="font-weight:bold;">充值状态:</span>  <span>待处理</span></span>
                    </div>
                    <div v-else-if="chargeInfo.status=='success'">
                        <div class="tx-status st2"></div><span class="status-ft "><span  style="font-weight:bold;">充值状态:</span>  <span>充值成功</span></span>
                    </div>
                    <div v-else-if="chargeInfo.status=='reject'">
                        <div class="tx-status st2"></div><span class="status-ft "><span  style="font-weight:bold;">充值状态:</span>  <span>已拒绝</span></span>
                    </div>
                    <div class="fr" style="margin-top: 0px;margin-right: 50px;" v-if="chargeInfo.status=='unpaid'">
                        <div  style="margin-bottom: 30px;">
                            <el-button type="primary" @click="setStatus()">确认</el-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="row">
             <div class="col-lg-12 ">
                <div class="white-bg clearfix detailDiv" style="border:0;min-height:500px;">
                    <table class="detailTable">
                        <thead>
                          <tr>
                            <th class="detailTable_title">用户信息<span></span></th>
                            <th>用户名</th>
                            <th>用户姓名</th>
                            <th>充值金额</th>
                            <th>充值方式</th>
                            <th>交易账号</th>
                          </tr>
                          
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>{{chargeInfo.username}}</td>
                            <td>{{chargeInfo.realname}}</td>
                            <td>{{chargeInfo.amount/100}}</td>
                            <td>{{ FormchargeTyp(chargeInfo.chargeType) }}</td>
                            <td>{{chargeInfo.chargeAccount}}</td>
                          </tr>
                        </tbody>
                    </table>
                    <table class="detailTable mt-20">
                        <thead>
                          <tr>
                            <th class="detailTable_title changeColor">交易信息<span></span></th>
                            <th>充值订单号</th>
                            <th>充值时间</th>
                            <th>充 值 IP</th>
                            <th>充值城市</th>
                          </tr>
                          
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>{{chargeInfo.orderId}}</td>
                            <td>{{FormtDate(chargeInfo.createdAt)}}</td>
                            <td>{{chargeInfo.chargeIp}}</td>
                            <td>{{chargeInfo.chargeCity}}</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

       <!--  <div class="row">
           <div class="col-lg-12 ">
               <div class="white-bg clearfix" style="border:0;">
                    <ul class="titlet">
                        <li>充值信息</li>
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
                              <li>充值金额: {{chargeInfo.amount/100}}元</li>
                              <li>充值方式: {{ FormchargeTyp(chargeInfo.chargeType) }}</li>
                              <li>交易账号: {{chargeInfo.chargeAccount}}</li>
                          </ul>
                      </li>
                      <li>
                          <ul>
                              <li>用户名: {{chargeInfo.username}}</li>
                              <li>用户姓名: {{chargeInfo.realname}}</li>
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
                        <li>交易信息</li>
                        <li>收款账户</li>
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
                              <li>充值订单号: {{chargeInfo.orderId}}</li>
                              <li>充值时间:{{FormtDate(chargeInfo.createdAt)}}</li>
                              <li>充 值 IP:{{chargeInfo.chargeIp}}</li>
                              <li>充值城市:{{chargeInfo.chargeCity}}</li>
                          </ul>
                      </li>
                      <li>
                          <ul>
                              <li>收款类型:</li>
                          </ul>
                      </li>
                  </ul>
            </div>
            </div>
        </div> -->

    </section>
</template>

<script>
import {mapState} from 'vuex'
import {chargeDetail,setChargeToOk } from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {

  },
  mounted () {
  },
  created(){
    this.getChargeInfo();
  },
  data() {
    return {
       chargeInfo:null,
       listLoading: false,
    }
  },
  computed: {
    ...mapState([
      'adminName','adminId'
      ]),
    chargeId(){
      return this.$route.query.id;
    },
  },
  methods: {
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
      FormtDate: function (time) {
         return getTimeDate(time);
      },
      getChargeInfo(){
        this.listLoading = true;
        chargeDetail(this.chargeId).then((res) => {
            this.chargeInfo = res.data;
            console.log(this.chargeInfo);
            this.listLoading = false;
        });
      },
      setStatus(){
      
        this.$confirm('已支付成功？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let query = {};
            query.orderId = this.chargeInfo.orderId;
            setChargeToOk(query).then((res) => {
                if(res.status==true&&res.data==true){
                  console.log(res);
                  this.$message({
                    message: '已支付成功!',
                    type: 'success'
                  });
                  this.getChargeInfo();
                }else{

                  this.$message.error('支付失败!');
                }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
        
      },
  }

}
</script>
