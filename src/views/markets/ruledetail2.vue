<template>
  <section class="wrapperDetail">
      <div class="row rulebox">
      <!--<el-form  :model="ruleInfo"  ref="ruleForm">-->
            <div class="col-lg-12">

                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20">优惠规则详情 </h1>
<!--                     <div class="dsbox fr">
                        <button class="cancel-button"  >取消</button>
                        <button class="submit-button ml20" >保存</button>
                    </div> -->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="非存款优惠" name="first">
                          <h1 class="f-black inline mr20 mbot20 f16">基本信息:</h1>
                          <el-form ref="form" :model="form" label-width="160px">
                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-6">
                                      <el-form-item label="优惠规则名称：">
                                        <el-input v-model="ruleInfo2.ruleName" :rows="3" placeholder="每日存款活动" :disabled="true"></el-input>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-6 randombox">
                                      <el-form-item label="优惠码：" label-width="100px">
                                        <el-input v-model="ruleInfo2.favId" :rows="3" placeholder="" :disabled="true"></el-input>
                                        
                                      </el-form-item>
                                      
                                      
                                  </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-6">
                                      <el-form-item label="申请有效期开始时间：">
                                        <!--<el-date-picker
                                          v-model="ruleInfo2.beginTime"
                                          type="date"
                                          placeholder="选择日期"
                                          :picker-options="pickerOptions0">
                                        </el-date-picker>-->
                                        <el-date-picker
                                          v-model="ruleInfo2.beginTime"
                                          type="datetime"
                                          placeholder="选择日期时间" readonly="true">
                                        </el-date-picker>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-6 randombox">
                                       <el-form-item label="失效时间：" label-width="100px">
                                        <!--<el-date-picker
                                        v-model="ruleInfo.endTime"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions0">
                                      </el-date-picker>-->
                                        <el-date-picker
                                          v-model="ruleInfo2.endTime"
                                          type="datetime"
                                          placeholder="选择日期时间" readonly="true">
                                        </el-date-picker>
                                      </el-form-item>
                                  </div>
                                
                                </div>
                            </div>

                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-10">
                                      <el-form-item label="优惠活动描述：">
                                        <el-input
                                          type="textarea"
                                          :autosize="{ minRows: 2, maxRows: 4}"
                                          placeholder="请输入内容"
                                          v-model="ruleInfo2.description" style="width: 330px;" :disabled="true">
                                        </el-input>
                                      </el-form-item>
                                  </div>
                                 
                                </div>
                            </div>
                            <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;border-top:1px solid #dcdcdc;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">存款条件</h1>
                              <div  style="margin-top:20px;">
                                  <el-form-item label="验证类型：">
                                  <el-radio-group v-model="ruleInfo2.nonDepositDetail.depositCheckType">
                                    <el-radio :label="1" disabled>邮箱</el-radio>
                                    <el-radio :label="2" disabled>手机</el-radio>
                                  </el-radio-group>
                                  </el-form-item>
                              </div>
                              <div  style="margin-top:20px;">
                                  <el-form-item label="注册类型：">
                                  <el-radio-group v-model="ruleInfo2.nonDepositDetail.depositRegisterType"  style="width:300px;">
                                    <el-radio :label="1" disabled>已注册用户</el-radio>
                                    <el-radio :label="2" disabled>完成注册资料</el-radio>
                                  </el-radio-group>
                                  </el-form-item>
                              </div>

                              <div style="margin-top:20px;width:300px;" >
                                  <el-form-item label="操作类型：">
                                  <el-radio-group v-model="ruleInfo2.nonDepositDetail.depositOperateType" style="width:400px;">
                                    <el-radio :label="1" disabled>以投注为条件</el-radio>
                                    <el-radio :label="2" disabled>以输钱为条件</el-radio>
                                    <el-radio :label="3" disabled>以赢钱为条件</el-radio>
                                  </el-radio-group>
                                  </el-form-item>
                              </div>

                               <div  style="margin-top:20px;">
                                  <el-form-item label="总投注要求：">
                                        <el-input v-model="ruleInfo2.nonDepositDetail.depositRequire" :rows="3" placeholder=""  :disabled="true"></el-input>
                                  </el-form-item>
                               </div>

                               <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-4">
                                      <el-form-item label="投注记录开始时间：">
                                        <!--<el-date-picker
                                          v-model="ruleInfo2.beginTime"
                                          type="date"
                                          placeholder="选择日期"
                                          :picker-options="pickerOptions0">
                                        </el-date-picker>-->
                                        <el-date-picker
                                          v-model="ruleInfo2.nonDepositDetail.depositBeginTime"
                                          type="datetime"
                                          placeholder="选择日期时间" readonly="true">
                                        </el-date-picker>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-4 randombox">
                                       <el-form-item label="投注记录结束时间：">
                                        <!--<el-date-picker
                                        v-model="ruleInfo2.nonDepositDetail.depositBeginTime"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions0">
                                      </el-date-picker>-->
                                       <el-date-picker
                                          v-model="ruleInfo2.nonDepositDetail.depositBeginTime"
                                          type="datetime"
                                          placeholder="选择日期时间" readonly="true">
                                        </el-date-picker>
                                      </el-form-item>
                                  </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                                <div class="white-bg pd-20 clearfix">
                                  <h1 class="f-black inline mr20 mbot20 f16">奖金发放</h1>
                                  <el-form-item label="固定奖金数额：">
                                      <el-input
                                        type="input"
                                        v-model="ruleInfo2.nonDepositDetail.grantSum" style="width: 130px;"  :disabled="true">
                                      </el-input>
                                    </el-form-item>
                                </div>
                            </div>

                            <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                                <div class="white-bg pd-20 clearfix">
                                  <h1 class="f-black inline mr20 mbot20 f16">有效游戏范围</h1>
                                  <el-form ref="form" :model="form" label-width="160px">
                                    <div class="row">
                                      <div class="col-lg-10">
                                          <div style="margin-left:50px;">
                                               <el-checkbox-group v-model="ruleInfo2.nonDepositDetail.allowedGameScope">
                                                  <el-checkbox label="MG" disabled></el-checkbox>
                                                  <el-checkbox label="PT" disabled></el-checkbox>
                                                  <el-checkbox label="NT" disabled></el-checkbox>
                                                </el-checkbox-group>
                                          </div>
                                      </div>
                                    </div>
                                  </el-form>
                                </div>
                            </div>

<!--                             <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                                <div class="white-bg pd-20 clearfix">
                                  <h1 class="f-black inline mr20 mbot20 f16">用户等级</h1>
                                  <el-form-item label="有效用户等级：">
                                      <el-input
                                        type="input"
                                        v-model="ruleInfo2.nonDepositDetail.userLevel" style="width: 130px;" :disabled="true">
                                      </el-input>
                                    </el-form-item>
                                </div>
                            </div> -->

                            <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">取款要求</h1>
                              <el-form ref="form" :model="form" label-width="160px">
                                <div class="row">
                                  <div class="col-lg-10" style="margin-left: 50px;">
                                      <div style="margin-left:0;">
                                           <el-radio-group v-model="ruleInfo2.nonDepositDetail.withdrawalsRequire">
                                              <el-radio :label="1" name="type" disabled>投注额要求=(存款+奖金)</el-radio>
                                              <span>×</span>
                                              <el-input v-model="ruleInfo2.nonDepositDetail.withdrawalsRequireVal" placeholder="" style="width:70px;margin-left:10px;margin-right:10px;" :disabled="true"></el-input>
                                              <el-radio-group v-model="ruleInfo2.nonDepositDetail.withdrawalsRequireSub" style="width:400px;">
                                                <el-radio :label="1" disabled>要减去存款优惠</el-radio>
                                                <el-radio :label="0" disabled>要减去存款优惠</el-radio>
                                              </el-radio-group>
                                             
                                            </el-radio-group>
                                      </div>
                                  </div>
                                </div>
                              </el-form>
                            </div>
                          </div>

                          </div>
                          </el-form>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
            </div>
            
      <!--</el-form>-->
      </div>
  </section>
</template>
<script>
import {getActiveList} from '../../service/getData'
import dateInput from '../../components/moudle/dateInput.vue'
import {mapState} from 'vuex'
import {getMyRand } from '../../config/mUtils'
import { marketRuleAdd,marketRuleEdit ,marketRuleDetail} from '../../service/getData'
import {getFormtDate,getTimeDate,getTimeTmpDay,getStore} from '../../config/mUtils'

  export default {
    components: {
      dateInput
    },
    created(){
      this.getRuleInfoData();
    },
    computed: {
      ...mapState([
        'adminId'
      ]),
      ruleId() {
        return this.$route.query.id;
      },
      mounted(){
        this.getRuleInfoData();
      }
      
    },
    data() {
      return {
        save3sss:null,
        letNum:1,
        radio2:3,
        grantSumTypeBegin:null,
        grantSumTypeEnd:null,
        allowedGameScope:[],
        allowedGameScope2:[],
        ruleInfo:{
          ruleName:null,//规则名称
          favType:1,//优惠类型ID
          favId:null,//优惠码
          description:null,
          operator_id:null,//创建人
          beginTime:null,//生效时间
          endTime:null,//失效时间
          favStyle:1,//优惠方式（1存款优惠、2非存款优惠）
          
          depositDetail:{//存款优惠规则详情
              depositBeginSum:null,//存款条件：区间开始金额，不为区间时相等即可
              depositEndSum:null,//存款条件：区间结束金额，不为区间时相等即可
              grantConDepositType:null,//奖金发放条件：成功存款的类型，1存款金额、2首次笔笔存、3非首次笔笔存、4第N次存款
              grantConDepositVal:null,//奖金发放条件：成功存款类型的取值，第N次存款的次数值
              grantConPeriodType:null,//奖金发放条件：在此周期类型，1自注册日期算起、2奖金有效期
              grantConApplySum:null,//奖金发放条件：申请次数，-1无限次、输入限定次数
              grantSumType:null,//奖金发放：金额数额类型，1固定奖金数额、2按比例浮动
              grantSumTypeBegin:null,//奖金发放：数额类型的取值，固定奖金数额值/起始百分比奖金
              grantSumTypeEnd:null,//奖金发放：数额类型的取值，固定奖金数额值/上限的奖金
              grantStyle:null,//奖金发放：发放的方式，1自动、0手动
              allowedGameScope:[],//有效游戏范围：存游戏ID，多个以分号隔开（后面根据游戏量确认要不要单独建表维护）
              userLevel: null,//有效玩家等级
              withdrawalsRequire:null,//取款要求：要求类型，1投注额计算、2无任何取款要求
              withdrawalsRequireVal:null,//取款要求：要求类型的取值
              withdrawalsRequireSub:null//取款要求：投注额计算时，是否要减去存款优惠，1是，0否
          }
        },
        ruleInfo2:null,
        roleSave:[],
        startnum:null,
        endnum:null,
        timeData1:null,
        timeData2:null,
        timeData3:null,
        timeData4:null,
        timeData5:null,
        timeData6:null,
        timeset:null,
        dataType:0,
        activeName: 'first',
        activeList:null,
        addActiveQuery: {
          userName:null,
          actId:null,
          rechargeSum:null,
          description:null,

        },
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
        username:null,
        userlist:null,
        clickUserDetail:{
            id:null,
            username:null,
            phone:null,
            balance:null
        },
        balanceQuery:{
          money:null,
          reason:null
        },
        startnumone:null
      };
    },
    methods: {

      getRend2(){
        let num = getMyRand();
        this.ruleInfo2.favId = num;
      },
      getTimeArea(times){
          if(times==null) times = new Date();
          let nowyear=parseInt(times.getFullYear());
          let nowmonth=parseInt(times.getMonth());
          let nowday=parseInt(times.getDate());
          this.timeset = [new Date(nowyear,nowmonth,nowday,0,0,0), new Date(nowyear,nowmonth,nowday,23,59,59)];
      },
      getRuleInfoData() {
        let id = this.$route.query.id;
        
        if(id!=null){ 

          marketRuleDetail(id).then((res) => {
            console.log(res.data)
            this.ruleInfo2 = res.data;
            for (let item in this.ruleInfo2) {  
                this.roleSave.push(this.ruleInfo2[item]);
            }  
            var zancun = this.ruleInfo2.nonDepositDetail.allowedGameScope;
            
            this.ruleInfo2.nonDepositDetail.allowedGameScope = JSON.parse(this.ruleInfo2.nonDepositDetail.allowedGameScope);
            if(ruleInfo.depositDetail.depositEndSum==null){
              this.saves=1;
            }
            else{
              this.saves=2;
            }
            
            //console.log(this.ruleInfo);
          });

        }
      },
      radioChange1(val){
          if(this.ruleInfo.depositDetail.withdrawalsRequire==2){
              this.ruleInfo.depositDetail.withdrawalsRequireSub =null;
          }

      },
      radioChange2() {
          if(this.ruleInfo.depositDetail.grantConApplySum!='' &&this.ruleInfo.depositDetail.grantConApplySum!=null){
              this.letNum = this.ruleInfo.depositDetail.grantConApplySum;
          }else{
            this.letNum = 1;
          }
      },
    }
  };
</script>
<style>
  .rulebox .el-form-item__content{
    width:200px;
  }

  .randombox .el-form-item{
    float:left;
    margin-right:10px;
  }

  .rulebox .el-date-editor{
    width:200px !important;
  }
</style>
