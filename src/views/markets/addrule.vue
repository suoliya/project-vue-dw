<template>
  <section class="wrapperDetail">
      <div class="row rulebox">
      <!--<el-form  :model="ruleInfo"  ref="ruleForm">-->
            <div class="col-lg-12">

                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20">新增优惠规则 </h1>
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
                                        <el-input v-model="ruleInfo.ruleName" :rows="3" placeholder="每日存款活动"></el-input>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-6 randombox">
                                      <el-form-item label="优惠码："  label-width="100px">
                                        <el-input v-model="ruleInfo.favId" :rows="3" placeholder=""></el-input>
                                        
                                      </el-form-item>
                                      <el-button type="primary" size="small" style="display:inline-block;" @click="getRend">随机生成</el-button>
                                      
                                  </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-6">
                                      <el-form-item label="申请有效期开始时间：">
                                        <el-date-picker
                                          v-model="timeData1"
                                          type="datetime"
                                          placeholder="选择日期时间">
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
                                          v-model="timeData2"
                                          type="datetime"
                                          placeholder="选择日期时间">
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
                                          v-model="ruleInfo.description" style="width: 330px;">
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
                                    <el-radio :label="3"  style="margin-left:0;line-height:40px;">存款金额：</el-radio>
                                    <el-radio :label="4" style="margin-left:0;line-height:40px;">存款金额区间：</el-radio>
                                  </el-radio-group>
                                  <el-form ref="form" :model="form" label-width="0px" style="float:left;">
                                        <el-form-item label="">
                                            <el-input v-model="startnumone" :rows="3" :disabled="radio2!=3"></el-input>
                                        </el-form-item>  
                                        <el-form-item label="" style="display:inline-block;float:left">
                                            <el-input v-model="startnum" :rows="3" style="float:left" :disabled="radio2!=4"></el-input>
                                        </el-form-item>     
                                        <span style="float:left;width:30px;position: relative;top: 10px;text-align: center;">至</span><el-input v-model="endnum" :rows="3" style="float:left;width:200px;" :disabled="radio2!=4"></el-input>   
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
                                            <el-radio :label="2">首次笔笔存</el-radio>
                                            <el-radio :label="3">非首次笔笔存</el-radio>
                                            <el-radio :label="4">第N次存款</el-radio>
                                          </el-radio-group>
                                          <span><el-input v-model="ruleInfo.depositDetail.grantConDepositVal" placeholder="" style="width:70px;margin-left:30px;margin-right:10px;" :disabled="ruleInfo.depositDetail.grantConDepositType!=4"></el-input>次存款（必填）</span>
                                      </div>
                                      <div style="margin-left:30px;margin-top:20px;">
                                          <span>在此周期内：</span>
                                          <el-radio-group v-model="ruleInfo.depositDetail.grantConPeriodType">
                                            <el-radio label="1" >自注日期算起(默认) </el-radio>
                                            <el-radio label="2" >奖金有效期</el-radio>
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
                                          <el-radio-group v-model="ruleInfo.depositDetail.grantConApplySum">
                                            <el-radio label="" >无限定次数</el-radio>
                                            <el-radio :label="letNum">限定次数</el-radio>
                                          </el-radio-group>

                                          <span><el-input v-model="ruleInfo.depositDetail.grantConApplySum" style="width:70px;margin-left:30px;margin-right:10px;" :disabled="ruleInfo.depositDetail.grantConApplySum==''||ruleInfo.depositDetail.grantConApplySum==null" :change="radioChange2()"></el-input></span>
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
                                            <el-radio :label="1">固定奖金数额:
                                              <el-input v-model="ruleInfo.depositDetail.grantSumTypeBegin"  style="width:70px;margin-left:30px;margin-right:10px;" :disabled="ruleInfo.depositDetail.grantSumType!=1"></el-input>
                                            </el-radio>
                                            <el-radio :label="2">按比例浮动
                                              <el-input v-model="grantSumTypeBegin"  style="width:70px;margin-left:30px;margin-right:10px;" :disabled="ruleInfo.depositDetail.grantSumType!=2"></el-input>
                                            </el-radio>
                                          </el-radio-group>
                                          <span>奖金,上限至<el-input v-model="grantSumTypeEnd" style="width:70px;margin-left:30px;margin-right:10px;" :disabled="ruleInfo.depositDetail.grantSumType!=2"></el-input></span>
                                      </div>
                                      <div style="margin-left:0;margin-top:20px;">
                                          <el-radio-group v-model="ruleInfo.depositDetail.grantStyle">
                                            <el-radio :label="1">自动</el-radio>
                                            <el-radio :label="0">手动</el-radio>
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
                                           <el-checkbox-group v-model="allowedGameScope">
                                              <el-checkbox label="MG"></el-checkbox>
                                              <el-checkbox label="PT"></el-checkbox>
                                              <el-checkbox label="NT"></el-checkbox>
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
                                              <el-radio :label="1" name="type">投注额要求=(存款+奖金)</el-radio>
                                              <span>×</span>
                                              <el-input v-model="ruleInfo.depositDetail.withdrawalsRequireVal" style="width:70px;margin-left:0px;margin-right:10px;" :disabled="ruleInfo.depositDetail.withdrawalsRequire!=1"></el-input>
                                              <el-radio-group  v-model="ruleInfo.depositDetail.withdrawalsRequireSub">
                                                  <el-radio label="1" >要减去存款优惠</el-radio>
                                                  <el-radio label="0">不要减去存款优惠</el-radio>
                                              </el-radio-group>
                                              

                                              <el-radio :label="2" name="type"  style="display:block;margin-top: 10px;" :change="radioChange1()">无任何取款要求</el-radio>
                                            </el-radio-group>
                                      </div>
                                  </div>
                                </div>
                              </el-form>
                            </div>
                          </div>
                          <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                            <div class="white-bg pd-20 clearfix">
                              <button class="cancel-button"  >取消</button>
                              <button class="submit-button ml20" @click="submitForm()">保存</button>
                            </div>
                          </div>
                          </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="选择非存款优惠" name="second">
                          <h1 class="f-black inline mr20 mbot20 f16">基本信息:</h1>
                          <el-form ref="form" :model="form" label-width="160px">
                            <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-6">
                                      <el-form-item label="优惠规则名称：">
                                        <el-input v-model="ruleInfo2.ruleName" :rows="3" placeholder="每日存款活动"></el-input>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-6 randombox">
                                      <el-form-item label="优惠码：" label-width="100px">
                                        <el-input v-model="ruleInfo2.favId" :rows="3" placeholder=""></el-input>
                                        
                                      </el-form-item>
                                      <el-button type="primary" size="small" style="display:inline-block;" @click="getRend2">随机生成</el-button>
                                      
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
                                          v-model="timeData3"
                                          type="datetime"
                                          placeholder="选择日期时间">
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
                                          v-model="timeData4"
                                          type="datetime"
                                          placeholder="选择日期时间">
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
                                          v-model="ruleInfo2.description" style="width: 330px;">
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
                                    <el-radio :label="1">邮箱</el-radio>
                                    <el-radio :label="2">手机</el-radio>
                                  </el-radio-group>
                                  </el-form-item>
                              </div>
                              <div  style="margin-top:20px;">
                                  <el-form-item label="注册类型：">
                                  <el-radio-group v-model="ruleInfo2.nonDepositDetail.depositRegisterType"  style="width:300px;">
                                    <el-radio :label="1">已注册用户</el-radio>
                                    <el-radio :label="2">完成注册资料</el-radio>
                                  </el-radio-group>
                                  </el-form-item>
                              </div>

                              <div style="margin-top:20px;width:300px;" >
                                  <el-form-item label="操作类型：">
                                  <el-radio-group v-model="ruleInfo2.nonDepositDetail.depositOperateType" style="width:400px;">
                                    <el-radio :label="1">以投注为条件</el-radio>
                                    <el-radio :label="2">以输钱为条件</el-radio>
                                    <el-radio :label="3">以赢钱为条件</el-radio>
                                  </el-radio-group>
                                  </el-form-item>
                              </div>

                               <div  style="margin-top:20px;">
                                  <el-form-item label="总投注要求：">
                                        <el-input v-model="ruleInfo2.nonDepositDetail.depositRequire" :rows="3" placeholder=""></el-input>
                                  </el-form-item>
                               </div>

                               <div class="row">
                                <div class="white-bg clearfix" style="border:0;">
                                
                                  <div class="col-lg-5">
                                      <el-form-item label="投注记录开始时间：">
                                        <!--<el-date-picker
                                          v-model="ruleInfo2.beginTime"
                                          type="date"
                                          placeholder="选择日期"
                                          :picker-options="pickerOptions0">
                                        </el-date-picker>-->
                                        <el-date-picker
                                          v-model="timeData5"
                                          type="datetime"
                                          placeholder="选择日期时间" style="margin-left:-5px;">
                                        </el-date-picker>
                                      </el-form-item>
                                  </div>
                                  <div class="col-lg-5 randombox">
                                       <el-form-item label="投注记录结束时间：">
                                        <!--<el-date-picker
                                        v-model="ruleInfo2.endTime"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions0">
                                      </el-date-picker>-->
                                       <el-date-picker
                                          v-model="timeData6"
                                          type="datetime"
                                          placeholder="选择日期时间">
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
                                        v-model="ruleInfo2.nonDepositDetail.grantSum" style="width: 130px;">
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
                                               <el-checkbox-group v-model="allowedGameScope2">
                                                  <el-checkbox label="MG"></el-checkbox>
                                                  <el-checkbox label="PT"></el-checkbox>
                                                  <el-checkbox label="NT"></el-checkbox>
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
                                        v-model="ruleInfo2.nonDepositDetail.userLevel" style="width: 130px;">
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
                                              <el-radio :label="1" name="type">投注额要求=(存款+奖金)</el-radio>
                                              <span>×</span>
                                              <el-input v-model="ruleInfo2.nonDepositDetail.withdrawalsRequireVal" placeholder="" style="width:70px;margin-left:10px;margin-right:10px;" :disabled="ruleInfo2.nonDepositDetail.withdrawalsRequire!=1"></el-input>
                                              <el-radio-group  v-model="ruleInfo2.nonDepositDetail.withdrawalsRequireSub">
                                                  <el-radio label="1" >要减去存款优惠</el-radio>
                                                  <el-radio label="0">不要减去存款优惠</el-radio>
                                              </el-radio-group>

                                             
                                            </el-radio-group>
                                      </div>
                                  </div>
                                </div>
                              </el-form>
                            </div>
                          </div>

                          </div>
                          <div class="col-lg-12" style="margin-top:10px;margin-bottom:10px;">
                              <div class="white-bg pd-20 clearfix">
                                <button class="cancel-button"  >取消</button>
                                <button class="submit-button ml20" @click="submitForm2()">保存</button>
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
import { marketRuleAdd,marketRuleEdit } from '../../service/getData'
import {getFormtDate,getTimeDate,getTimeTmpDay,getStore} from '../../config/mUtils'

  export default {
    components: {
      dateInput
    },
    created(){
    },
    computed: {
      ...mapState([
        'adminId'
      ]),
      ruleId() {
        return this.$route.query.id;
      },
      mounted(){
       
      }
      
    },
    data() {
      return {
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
        ruleInfo2:{
          ruleName:null,//规则名称
          favType:1,//优惠类型ID
          favId:null,//优惠码
          description:null,
          operator_id:null,//创建人
          beginTime:null,//生效时间
          endTime:null,//生效时间
          favStyle:2,//优惠方式（1存款优惠、2非存款优惠）
          nonDepositDetail:{//非存款优惠规则详情
              depositCheckType:null,//存款条件：验证类型，1邮箱、2手机、3救援金
              depositRegisterType:null,//存款条件：注册类型，1已注册用户、2完成注册资料
              depositOperateType:null,//存款条件：操作类型，1以投注为条件、2以输钱为条件、3以赢钱为条件
              depositRequire:null,//存款条件：总投注要求
              depositBeginTime:null,//存款条件：投注记录开始时间
              depositEndTime:null,//存款条件：投注记录结束时间
              grantSum:null,//奖金发放：固定金额数
              allowedGameScope:[],//有效游戏范围：存游戏ID，多个以分号隔开（后面根据游戏量确认要不要单独建表维护）
              userLevel: null,//有效玩家等级
              withdrawalsRequire:1,//取款要求：要求类型，1投注额计算、2>=投注额
              withdrawalsRequireVal:null,//取款要求：要求类型的取值
              withdrawalsRequireSub:null//取款要求：投注额计算时，是否要减去存款优惠，1是，0否
          }
        },
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
      submitForm(formName){
        if(this.radio2 == 3){
            this.ruleInfo.depositDetail.depositBeginSum =parseInt(this.startnumone);
            this.ruleInfo.depositDetail.depositEndSum = parseInt(this.startnumone);
        }
        else{
            this.ruleInfo.depositDetail.depositBeginSum =parseInt(this.startnum);
            this.ruleInfo.depositDetail.depositEndSum = parseInt(this.endnum);
        }
        if(this.ruleInfo.depositDetail.grantConApplySum==''){
          this.ruleInfo.depositDetail.grantConApplySum = -1;
        }
        if(this.ruleInfo.depositDetail.grantSumType==1){
          this.ruleInfo.depositDetail.grantSumTypeBegin = parseInt(this.ruleInfo.depositDetail.grantSumTypeBegin);
          this.ruleInfo.depositDetail.grantSumTypeEnd = this.ruleInfo.depositDetail.grantSumTypeBegin;
        }else{
          this.ruleInfo.depositDetail.grantSumTypeEnd = parseInt(this.grantSumTypeEnd);
          this.ruleInfo.depositDetail.grantSumTypeBegin = parseInt(this.grantSumTypeBegin);
        }
        this.ruleInfo.depositDetail.grantConDepositVal = parseInt(this.ruleInfo.depositDetail.grantConDepositVal);
        this.ruleInfo.depositDetail.grantConDepositVal = parseInt(this.ruleInfo.depositDetail.grantConPeriodType);
        //时间格式转化
        this.ruleInfo.beginTime = getFormtDate(this.timeData1,"yyyy-MM-dd hh:mm:ss");
        this.ruleInfo.endTime = getFormtDate(this.timeData2,"yyyy-MM-dd hh:mm:ss");
        this.ruleInfo.depositDetail.allowedGameScope = JSON.stringify(this.allowedGameScope);
        marketRuleAdd(this.ruleInfo).then((res) => {
            if(res.status){
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
            }else{

              this.$message.error(res.message);
            }
        });

      },
      submitForm2(formName){
        this.ruleInfo2.beginTime = getFormtDate(this.timeData3,"yyyy-MM-dd hh:mm:ss");
        this.ruleInfo2.endTime = getFormtDate(this.timeData4,"yyyy-MM-dd hh:mm:ss");
        this.ruleInfo2.nonDepositDetail.depositBeginTime = getFormtDate(this.timeData5,"yyyy-MM-dd hh:mm:ss");
        this.ruleInfo2.nonDepositDetail.depositEndTime = getFormtDate(this.timeData6,"yyyy-MM-dd hh:mm:ss");
        let userinfo = getStore('userInfo');
        this.ruleInfo2.operator_id = userinfo.id;
        this.ruleInfo2.nonDepositDetail.allowedGameScope = JSON.stringify(this.allowedGameScope2);
        //console.log(this.ruleInfo2.depositDetail.allowedGameScope)
         marketRuleAdd(this.ruleInfo2).then((res) => {
            if(res.status){
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
            }else{

              this.$message.error(res.message);
            }
        });
        
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
