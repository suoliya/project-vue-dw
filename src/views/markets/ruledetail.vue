<template>
  <section class="wrapperDetail">
      <div class="row rulebox">
      <!--<el-form  :model="ruleInfo"  ref="ruleForm">-->
            <div class="col-lg-12">

                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20">优惠规则详情</h1>
<!--                     <div class="dsbox fr">
                        <button class="cancel-button"  >取消</button>
                        <button class="submit-button ml20" >保存</button>
                    </div> -->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="选择存款优惠" name="first">
                          <h1 class="f-black inline mr20 mbot20 f16">基本信息:</h1>
                          <el-form ref="form" :model="form" label-width="160px">
                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-6">
                                      <el-form-item label="优惠规则名称：">
                                        <el-input v-model="ruleInfo.ruleName" :rows="3" placeholder="每日存款活动" :disabled="true"></el-input>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-6 randombox">
                                      <el-form-item label="优惠码："  label-width="100px">
                                        <el-input v-model="ruleInfo.favId" :rows="3" placeholder=""  :disabled="true"></el-input>
                                        
                                      </el-form-item>
                                      <!--<el-button type="primary" size="small" style="display:inline-block;" @click="getRend">随机生成</el-button>-->
                                      
                                  </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-6">
                                      <el-form-item label="申请有效期开始时间：">
                                        <el-date-picker
                                          v-model="ruleInfo.beginTime"
                                          type="datetime"
                                          placeholder="选择日期时间" readonly="true">
                                        </el-date-picker>
                                        
                                        <!--<date-input ref="datepick" v-bind:timeSet="ruleInfo.beginTime" class="fl height33 mr20 radius0"></date-input>-->
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-6 randombox">
                                       <!--
                                        <el-date-picker
                                        v-model="ruleInfo.endTime"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions0">
                                      </el-date-picker><span class="fl" style="line-height:35px;color:#333;margin-right:5px;">失效时间：</span>
                                        <date-input ref="datepick" v-bind:timeSet="ruleInfo.endTime" class="fl height33 mr20 radius0"></date-input>-->
                                        <el-form-item label="失效时间：" label-width="100px">
                                        <el-date-picker
                                          v-model="ruleInfo.endTime"
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
                                          v-model="ruleInfo.description" style="width: 330px;" :disabled="true">
                                        </el-input>
                                      </el-form-item>
                                  </div>
                                 
                                </div>
                            </div>
                            <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">存款条件</h1>
                              <div>
                                 <el-radio-group v-model="radio2" style="width:140px;float:left;">
                                    <el-radio :label="3" disabled  style="margin-left:0;line-height:40px;">存款金额：</el-radio>
                                    <el-radio :label="4" disabled  style="margin-left:0;line-height:40px;">存款金额区间：</el-radio>
                                  </el-radio-group>
                                  <el-form ref="form" :model="form" label-width="0px" style="float:left;">
                                        <el-form-item label="" style="height:35px;">
                                            <el-input v-model="ruleInfo.depositDetail.depositBeginSum" :rows="3"  :disabled="true" v-if="this.saves==1"></el-input>
                                        </el-form-item>  
                                        <el-form-item label="" style="display:inline-block;float:left">
                                            <el-input v-model="ruleInfo.depositDetail.depositBeginSum" :rows="3" style="float:left"  :disabled="true"></el-input>
                                        </el-form-item>     
                                        <span style="float:left;width:30px;position: relative;top: 10px;text-align: center;">至</span>
                                        <el-input v-model="ruleInfo.depositDetail.depositEndSum" :rows="3" style="float:left;width:150px;" :disabled="true"></el-input>   
                                  </el-form>
                              </div>
                              
                            </div>
                          </div>

                          <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">奖金发放条件</h1>
                              <el-form ref="form" :model="form" label-width="160px">
                                <div class="row">
                                  <div class="col-lg-2">
                                      <div style="    margin-left: 10px;text-align: right;padding-right: 10px;border-right: 1px solid #dcdcdc;line-height: 70px;margin-top: 10px;">成功存款</div>
                                  </div>
                                  <div class="col-lg-10">
                                      <div style="margin-left:30px;">
                                          <span>存款次数：</span>
                                          <el-radio-group v-model="ruleInfo.depositDetail.grantConDepositType">
                                            <el-radio :label="2" disabled>首次笔笔存</el-radio>
                                            <el-radio :label="3" disabled>非首次笔笔存</el-radio>
                                            <el-radio :label="4" disabled>第N次存款</el-radio>
                                          </el-radio-group>
                                          <span><el-input v-model="ruleInfo.depositDetail.grantConDepositVal" placeholder="" style="width:70px;margin-left:30px;margin-right:10px;"  :disabled="true"></el-input>次存款（必填）</span>
                                      </div>
                                      <div style="margin-left:30px;margin-top:20px;">
                                          <span>在此周期内：</span>
                                          <el-radio-group v-model="ruleInfo.depositDetail.grantConPeriodType">
                                            <el-radio label="1" disabled>自注日期算起(默认) </el-radio>
                                            <el-radio label="2" disabled>奖金有效期</el-radio>
                                          </el-radio-group>
                                      </div>
                                  </div>
                                </div>
                                <div class="row"  style="margin-top:30px;" >
                                  <div class="col-lg-2">
                                      <div style="margin-left: 10px;text-align: right;padding-right: 10px;border-right: 1px solid #dcdcdc;line-height: 27px;margin-top: 2px;">申请(单次或多次)</div>
                                  </div>
                                  <div class="col-lg-10">
                                      <div style="margin-left:30px;">
                                          <el-radio-group v-model="savesum2">
                                            <el-radio label="-1" disabled>无限定次数</el-radio>
                                            <el-radio label="ran" disabled>限定次数</el-radio>
                                          </el-radio-group>

                                          <span>
                                            <el-input v-model="savesum" placeholder="" style="width:70px;margin-left:30px;margin-right:10px;" :disabled="true"></el-input>
                                          </span>
                                      </div>
                                     
                                  </div>
                                </div>
                              </el-form>
                            </div>
                          </div>

                          <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">奖金发放</h1>
                              <el-form ref="form" :model="form" label-width="160px">
                                <div class="row">
                                  <div class="col-lg-2">
                                  </div>
                                  <div class="col-lg-10">
                                      <div style="margin-left:0;">
                                          <el-radio-group  v-model="ruleInfo.depositDetail.grantSumType">
                                            <el-radio :label="1" disabled>固定奖金数额:</el-radio>
                                            <el-radio :label="2" disabled>按比例浮动
                                              <el-input v-model="ruleInfo.depositDetail.grantSumTypeBegin" placeholder="" style="width:70px;margin-left:30px;margin-right:10px;"  :disabled="true"></el-input>
                                            </el-radio>
                                          </el-radio-group>
                                          <span>奖金,上限至<el-input v-model="ruleInfo.depositDetail.grantSumTypeEnd" placeholder="" style="width:70px;margin-left:30px;margin-right:10px;" :disabled="true"></el-input></span>
                                      </div>
                                      <div style="margin-left:0;margin-top:20px;">
                                          <el-radio-group v-model="ruleInfo.depositDetail.grantStyle">
                                            <el-radio :label="1" disabled>自动</el-radio>
                                            <el-radio :label="0" disabled>手动</el-radio>
                                          </el-radio-group>
                                      </div>
                                  </div>
                                </div>
                              </el-form>
                            </div>
                          </div>

                          <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">有效游戏范围</h1>
                              <el-form ref="form" :model="form" label-width="160px">
                                <div class="row">
                                  <div class="col-lg-2">
                                  </div>
                                  <div class="col-lg-10">
                                      <div style="margin-left:0;">
                                           <el-checkbox-group v-model="ruleInfo.depositDetail.allowedGameScope">
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

                          <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <h1 class="f-black inline mr20 mbot20 f16">取款要求</h1>
                              <el-form ref="form" :model="form" label-width="160px">
                                <div class="row">
                                  <div class="col-lg-2">
                                  </div>
                                  <div class="col-lg-10">
                                      <div style="margin-left:0;">
                                           <el-radio-group v-model="ruleInfo.depositDetail.withdrawalsRequire">
                                              <el-radio :label="1" name="type" disabled>投注额要求=(存款+奖金)</el-radio>
                                              <span>×</span>
                                              <el-input v-model="ruleInfo.depositDetail.withdrawalsRequireVal" placeholder="" style="width:70px;margin-left:0px;margin-right:10px;"  :disabled="true"></el-input>
                                              
                                              <el-radio-group v-model="ruleInfo.depositDetail.withdrawalsRequireSub" style="width:400px;">
                                                <el-radio :label="1" disabled>要减去存款优惠</el-radio>
                                                <el-radio :label="0" disabled>要减去存款优惠</el-radio>
                                              </el-radio-group>
                                              

                                              <el-radio :label="2" name="type"  style="display:block;margin-top: 10px;" disabled>无任何取款要求</el-radio>
                                            </el-radio-group>
                                      </div>
                                  </div>
                                </div>
                              </el-form>
                            </div>
                          </div>
<!--                           <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <button class="cancel-button"  >取消</button>
                              <button class="submit-button ml20" @click="submitForm()">保存</button>
                            </div>
                          </div> -->
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
import { marketRuleAdd,marketRuleEdit,marketRuleDetail } from '../../service/getData'
import {getFormtDate,getTimeDate,getTimeTmpDay} from '../../config/mUtils'

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
        gameList:['MG','PT','NT'],
        allowedGameScope:[],
        savesum2:null,
        savesum:null,
        radio2:4,
        ruleInfo:null,
        startnum:null,
        endnum:null,
        timeData1:null,
        timeData2:null,
        timeData3:null,
        timeData4:null,
        timeData5:null,
        timeData6:null,
        saves:null,
        saves2:null,
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
      };
    },
    methods: {
      getRuleInfoData() {
        let id = this.$route.query.id;
        
        if(id!=null){ 

          marketRuleDetail(id).then((res) => {
            
            this.ruleInfo = res.data;
            this.ruleInfo.depositDetail.allowedGameScope = JSON.parse(this.ruleInfo.depositDetail.allowedGameScope);
            if(this.ruleInfo.depositDetail.depositEndSum==null){
              this.saves=1;
            }
            else{
              this.saves=2;
            }

            if(this.ruleInfo.depositDetail.grantConApplySum != "-1"){
              this.savesum=this.ruleInfo.depositDetail.grantConApplySum;
              this.savesum2 = "ran";
            }
            else{
              this.savesum2 = "-1";
            }
            
          });

        }
      },

      getRend(){
        let num = getMyRand();
        this.ruleInfo.favId = num;
      },
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
