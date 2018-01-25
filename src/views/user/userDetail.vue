<template>
  <section class="wrapperDetail">
    <div class="row">
<!--       <div class="col-lg-12 ">
        <div class="white-bg pd-20 clearfix usertitle">
            <div class="homeicon fl"></div>
            <ul class="page_hiostory fl ">
              <li>主页 -> </li>
              <li>用户管理  -> </li>
              <li>用户详情</li>
            </ul>
        </div>
      </div> -->
      <div class="col-lg-12">
        <div class="white-bg pd-20 clearfix">
            <h1>基本信息</h1>

            <!--信息tab切换-->
            <div class="user_info_tab">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div class="row">
                        <div class="col-lg-2" style="overflow: hidden;">
                            <div class="header_box fl" style="margin:0 20px;">
                            <p class="username txtcenter">{{userInfo.realname}}－{{userInfo.username}}</p>
                            <div class="imgbox">
                              <img src="static/img/usericon.svg" v-if="userInfo.headImgUrl==null" style="width: 85px;">
                              <img :src="userInfo.headImgUrl" v-else style="width: 85px;">
                            </div>
                             <el-popover v-if="usertagsList!=null" ref="poptag" placement="bottom" width="400" trigger="click" v-model="poptag" >
                                <div class="taglist clearfix">
                                  <div class="fl" style="width:50%;min-height:120px;">
                                    <span class="tagtitle">已添加标签</span>
                                    <ul class="tagul">
                                      <li v-for="(item,index) in usertagsList"  :key="index"><el-button type="success" size="small" @click="deleteTag(item.tagInfoId)">{{item.tagName}}</el-button></li>
                                    </ul>
                                  </div>
                                  <div class="fr" style="width:50%;padding-left:10px;border-left:1px solid #dcdcdc;">
                                    <span class="tagtitle">标签名称</span>
                                    <template>
                                      <el-checkbox-group  v-model="checkedTags" class="tagcheck">
                                        <el-checkbox v-for="(item,index) in tagListClick" :label="item.tagInfoId" :key="item.tagInfoId">{{item.tagName}}</el-checkbox>
                                      </el-checkbox-group>
                                    </template>
                                  </div>
                                    
                                </div>
                                <div class="fotter taglistfooter">
                                  
                                  <el-button type="primary" @click="addTags">确认</el-button>
                                  <el-button @click="poptag=false">取消</el-button>
                                </div>
                                <el-button slot="reference"  class="biaoqianbtn2">
                                钻石玩家<i class=" el-icon-menu"></i></el-button>
                            </el-popover>
                            </div>
                        </div>
                        <div class="col-lg-2 tagclassType" style="overflow: hidden;">
                            <ul class="userdetail_set">
                              <li @click="dialogFormVisible = true">
                                  <i class="icon-file-text2"></i><span>编辑用户</span>
                              </li>
                              <li @click="dialogFormVisible2 = true">
                                <i class="icon-unlock-alt3"></i><span>修改密码</span>
                              </li>
                              <li @click="goChange">
                              <i class=" icon-yen2"></i><span>调整金额</span>
                              </li>
                            </ul>
                            <el-popover ref="poptag2" placement="right" width="400" trigger="click" v-model="poptag2" >
                                <div class="taglist clearfix">
                                  <div class="fl" style="width:50%;min-height:120px;">
                                    <span class="tagtitle">已添加标签</span>
                                    <ul class="tagul">
                                      <li v-for="(item,index) in usertagsList"  :key="index"><el-button type="success" size="small" @click="deleteTag(item.tagInfoId)">{{item.tagName}}</el-button></li>
                                    </ul>
                                  </div>
                                  <div class="fr" style="width:50%;padding-left:10px;border-left:1px solid #dcdcdc;">
                                    <span class="tagtitle">标签名称</span>
                                    <template>
                                      <el-checkbox-group  v-model="checkedTags" class="tagcheck">
                                        <el-checkbox v-for="(item,index) in tagListClick" :label="item.tagInfoId" :key="item.tagInfoId">{{item.tagName}}</el-checkbox>
                                      </el-checkbox-group>
                                    </template>
                                  </div>
                                    
                                </div>
                                <div class="fotter taglistfooter">
                                  
                                  <el-button type="primary" @click="addTags">确认</el-button>
                                  <el-button @click="poptag2 = false">取消</el-button>
                                </div>
                                <el-button slot="reference" class="biaoqianbtn">
                                <i class="icon-tag2"></i>标签分组</el-button>
                            </el-popover>

                        </div>
                        <div class="col-lg-8" style="overflow: hidden;">
                            <ul class="info_tab1 clearfix">
                              <li>
                                  <label>姓  名:</label>
                                  <span>{{userInfo.realname}}</span>
                              </li>
                              <li>
                                <label>年  龄:</label>
                                <span>{{returnAge(userInfo.birthday)}}</span>
                              </li>
                              <li>
                                <label>出生地:</label>
                                <span>{{userInfo.birthplace}}</span>
                              </li>
                              <li>
                                <label>用户名:</label>
                                <span>{{userInfo.username}}</span>
                              </li>
                              <li>
                                <label>国  家:</label>
                                <span>{{userInfo.country}}</span>
                              </li>
                              <li>
                                <label>现居地:</label>
                                <span>{{userInfo.presentCountry}}	</span>
                              </li>
                              <li>
                                <label>国  籍:</label>
                                <span>{{userInfo.nationality}}</span>
                              </li>
                              <li>
                                <label>性  别:</label>
                                <span>{{returnSex(userInfo.sex)}}</span>
                              </li>
                              <li>
                                <label>地  址: </label>
                                <span>{{userInfo.address}}</span>
                              </li>
                              <li>
                                <label>语  言:</label>
                                <span>{{userInfo.language}}</span>
                              </li>
                            </ul>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册信息" name="second">
                  <div class="row">
                  <div class="col-lg-2">
                      <!--<div class="header_box fl"></div>-->
                      <p class="username txtcenter">{{userInfo.realname}}－{{userInfo.username}}</p>
                      <div class="imgbox">
                        <img src="static/img/usericon.svg" style="width: 85px;" v-if="userInfo.headImgUrl==null">
                        <img :src="userInfo.headImgUrl" v-else>
                      </div>
                  </div>
                    <div class="col-lg-10">
                      <ul class="info_tab1 clearfix">
                        <li>
                          <label>所属代理:</label>
                          <span>{{ userInitInfo.invitationName }}</span>
                        </li>
                        <li>
                          <label>注册日期:</label>
                          <span>{{fomatTime(userInfo.createdAt)}}</span>
                        </li>
                        <li>
                          <label>好友推荐码:</label>
                          <span>{{userInfo.recommendCode}}</span>
                        </li>
                        <li>
                          <label>推荐人数:</label>
                          <span>{{userInitInfo.recommendedQuantity}}</span>
                        </li>
                        <li>
                          <label>来自好友推荐:</label>
                          <span>{{userInitInfo.invitationName}}</span>
                        </li>
                        <li>
                          <label>最近登录:</label>
                          <span>{{fomatTime(userInfo.lastLoginTime)}}</span>
                        </li>
                        <li class="borderno">
                          <label>注册ip:</label>
                          <span>{{userInfo.lastLoginIp}}</span>
                        </li>
                        <li>
                          <label>最后一次登录城市:</label>
                          <span>{{userInitInfo.city}}</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="联络信息" name="third">
                  <div class="row">
                  <div class="col-lg-2">
                      <!--<div class="header_box fl"></div>-->
                      <p class="username txtcenter">{{userInfo.realname}}－{{userInfo.username}}</p>
                      <div class="imgbox">
                        <img src="static/img/usericon.svg" style="width: 85px;" v-if="userInfo.headImgUrl==null">
                        <img :src="userInfo.headImgUrl" v-else>
                      </div>
                  </div>
                    <div class="col-lg-10">
                      <ul class="info_tab1 info_tab2 clearfix">
                        <li>
                          <label>手机号:</label>
                          <span class="title">{{userInfo.phone}}</span>
                          <el-popover ref="popover3" placement="bottom" width="120" trigger="click" v-model="popPhone" >
                              <div class="authTypeDiv">
                                  确认修改手机认证状态?
                              </div>
                              <div class="fotter">
                                
                                <el-button type="primary" size="mini" @click="updateStatus('phone',userInfo.phoneVerification)">确认</el-button>
                                <el-button size="mini" @click="popPhone=false">取消</el-button>
                              </div>
                              <el-button type="success" size="mini" v-if="userInfo.phoneVerification==1" slot="reference">认证</el-button>
                              <el-button type="warning" size="mini" slot="reference" v-else>未认证</el-button>
                          </el-popover>


                        </li>
                        <li>
                          <label>手机号2:</label>
                          <span class="title">{{userInfo.phone2}}</span>
                          <el-popover ref="popover2" placement="bottom" width="120" trigger="click" v-model="popPhone2" >
                              <div class="authTypeDiv">
                                  确认修改手机2认证状态?
                              </div>
                              <div class="fotter">
                                
                              <el-button type="primary" size="mini" @click="updateStatus('phone2',userInfo.phoneVerification2)">确认</el-button>
                              <el-button size="mini" @click="popPhone2=false">取消</el-button>
                              </div>
                              <el-button type="success" size="mini" v-if="userInfo.phoneVerification2==1" slot="reference">认证</el-button>
                              <el-button type="warning" size="mini" v-else slot="reference">未认证</el-button>
                          </el-popover>
 
                        </li>
                        <li>
                          <label>邮箱:</label>
                          <span class="title">{{userInfo.email}}</span>
                          <el-popover ref="popover1" placement="bottom" width="120" trigger="click" v-model="popEmail" >
                              <div class="authTypeDiv">
                                  确认修改邮箱认证状态?
                              </div>
                              <div class="fotter">
                                
                                <el-button type="primary" size="mini" @click="updateStatus('email',userInfo.emailVerification)">确认</el-button>
                                <el-button size="mini" @click="popEmail=false">取消</el-button>
                              </div>
                              <el-button type="success" size="mini" v-if="userInfo.emailVerification==1" slot="reference">认证</el-button>
                              <el-button type="warning" size="mini" v-else slot="reference">未认证</el-button>
                          </el-popover>
 
                        </li>
                        <li>
                          <label>{{returnTypeName(userInfo.accountType)}}:</label>
                          <span>{{userInfo.accountId}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="账户信息" name="fourth">
                  <div class="row">
                    <div class="col-lg-2">
                      <!--<div class="header_box fl"></div>-->
                      <p class="username txtcenter">苏菲娅－SUFEIYA</p>
                      <div class="imgbox">
                        <img src="static/img/usericon.svg" style="width: 85px;" alt="">
                      </div>
                    </div>
                    <div class="col-lg-10">
                      <div class="row">
                        <ul class="col-lg-4 zhbox">
                            <li>
                                <h2>钱包信息</h2>
                            </li>
                            <li>
                                <label>主钱包</label><span>{{userBalance.wallet/100}}</span>
                            </li>
                            <li>
                              <label>MG钱包</label><span>{{userBalance.mg/100}}</span>
                            </li>
                            <li>
                              <label>Nt钱包</label><span>{{userBalance.nt/100}}</span>
                            </li>
                            <li>
                              <label>PT钱包</label><span>{{userBalance.pt/100}}</span>
                            </li>
                        </ul>
                        <ul class="col-lg-4 zhbox">
                          <li>
                            <h2>存款信息</h2>
                          </li>
                          <li>
                            <label>存款总数</label><span>{{userCharge.count}}</span>
                          </li>
                          <li>
                            <label>存款总额</label><span>{{returnAmount(userCharge.amount_total)}}</span>
                          </li>
                          <li>
                            <label>平均存款</label><span>{{returnAmount(userCharge.amount_avg)}}</span>
                          </li>
                          <li>
                            <label>首次存取</label><span>{{userCharge.first_time}}</span>
                          </li>
                        </ul>
                        <ul class="col-lg-4 zhbox">
                          <li>
                            <h2>取款信息</h2>
                          </li>
                          <li>
                            <label>取款总数</label><span>{{userWithdraw.count}}</span>
                          </li>
                          <li>
                            <label>提取总额</label><span>{{returnAmount(userWithdraw.amount_total)}}</span>
                          </li>
                          <li>
                            <label>平均取款</label><span>{{returnAmount(userWithdraw.amount_avg)}}</span>
                          </li>
                          <li>
                            <label>首次取款事件</label><span>{{userWithdraw.first_time}}</span>
                          </li>
                        </ul>
                        <ul class="col-lg-4 zhbox border-top1">
                          <li>
                            <h2>奖金信息</h2>
                          </li>
                          <li>
                            <label>玩家组存款总奖金</label><span>{{returnAmount(userFavApply.depositBonus)}}</span>
                          </li>
                          <li>
                            <label>总反水奖金</label><span>{{returnAmount(userFavApply.returnBonus)}}</span>
                          </li>
                          <li>
                            <label>总推荐奖金</label><span>{{returnAmount(userFavApply.recommendBonus)}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

        </div>
      </div>
      <!--资金变动-->
      <div class="col-lg-12 mt-10">
          <user-money :userid="userid"></user-money>
      </div>

      <!--游戏信息-->
      <div class="col-lg-12 mt-10">
        <user-game :userid="userid"></user-game>

      </div>

      <!--银行信息-->
      <div class="col-lg-12 mt-10">
          <user-bank :userid="userid"></user-bank>
      </div>

      <!--玩家记录-->
      <div class="col-lg-12 mt-10">
          <user-gameplayer :userid="userid" :gameAccount="userInfo.gameAccount"></user-gameplayer>
      </div>

      <!--帐号与活动日志-->
      <div class="col-lg-12 mt-10">
        <user-log :userid="userid"></user-log>
      </div>

    </div>
  <div class="user_bounced"></div>
  <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" size="small" custom-class="newinputbox">
    <el-form>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="userInfo.realname" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="userInfo.sex" placeholder="选择性别" class="newselect">
        <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="birthdayTime"  type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input v-model="userInfo.email" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="userInfo.phone" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="手机2" :label-width="formLabelWidth">
        <el-input v-model="userInfo.phone2" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="聊天类型" :label-width="formLabelWidth">
        <el-select v-model="userInfo.accountType" placeholder="聊天工具"  class="newselect">
        <el-option v-for="item in accountTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="聊天账号" :label-width="formLabelWidth">
        <el-input v-model="userInfo.accountId" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="国家" :label-width="formLabelWidth">
        <el-input v-model="userInfo.country" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="国籍" :label-width="formLabelWidth">
        <el-input v-model="userInfo.nationality" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="出生地" :label-width="formLabelWidth">
        <el-input v-model="userInfo.birthplace" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-input v-model="userInfo.city" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="语言" :label-width="formLabelWidth">
        <el-input v-model="userInfo.language" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="现居地" :label-width="formLabelWidth">
        <el-input v-model="userInfo.presentCountry" auto-complete="off" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subUpdate">确 定</el-button>
    </div>
  </el-dialog>

    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" size="tiny" custom-class="new new2">
      <el-form :model="form">
        <el-form-item label="您的新密码" :label-width="formLabelWidth">
          <el-input v-model="password"  auto-complete="off"></el-input>
        </el-form-item>
<!--         <p class="frstp">你的密码不能与其他个人信息太相似。</p>
        <p>你的密码必须包含至少 8 个字符。</p>
        <p>你的密码不能是大家都爱用的常见密码。</p>
        <p class="lastp">你的密码不能全部为数字。</p>
        <el-form-item label="确认新密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="subUpdatePass">确 定</el-button>
      </div>
    </el-dialog>

    <!--删除用户提示框-->
  </section>
</template>
<script>
import multiplechoicebar from '../../components/multiple/multiplechoicebar.vue'
import datepickerbar from '../../components/datepicker/datepickerbar.vue'
import userMoney from '../../components/user/money.vue'
import userGame from '../../components/user/game.vue'
import userBank from '../../components/user/bank.vue'
import userGameplayer from '../../components/user/gameplayer.vue'
import userLog from '../../components/user/log.vue'

import {getUserInfo,getInvitatione,getUserBalance,updateUserInfo,updateUserPass,getUserCharge,getUserWithdraw,marketUserFavApply,getTagList,addUserTags,setUserVerification,deleteUserTags} from '../../service/getData'
import selectbar from '../../components/selectbar/selectbar.vue'
import Pagination from '../../components/Pagination/pagination.vue'
import {getTimeDate,jsGetAge,getFormtDate,getDateToTimes ,getTimeDateNoH} from '../../config/mUtils'


  export default {
    components: {
      multiplechoicebar,
      selectbar,
      datepickerbar,
      userMoney,
      userGame,
      userBank,
      userGameplayer,
      userLog
    },
    created(){
      this.getUserInfoData();
      this.getInvitationeData();
      this.getUserBalanceData();
      this.getUserChargeData();
      this.getUserWithdrawData();
      this.marketUserFavApplyData();
      this.getTagListData();
      this.tagListClickData();
      
    },
    computed:{
      userid(){
        return this.$route.query.id;
      },
    },
    data() {
      return {
        birthdayTime:'',
        tagListClick:null,
        poptag:false,
        poptag2:false,
        popPhone:false,
        popPhone2:false,
        popEmail:false,
        activeName: 'first',
        radio: '1',
        userInfo:null,
        userInitInfo:null,
        userBalance:null,
        listLoading:false,
        password:null,
        userCharge:null,
        userWithdraw:null,
        userFavApply:null,
        usertagsList:null,
        tabTpyeList2:[
        {title:'充值记录'},
        {title:'提现记录'},
        {title:'操作记录'},
        {title:'IP历史'},
        {title:'银行卡账户'},
        {title:'更新历史'},
        {title:'游戏历史'}
        ],
        sexList:[
          {label:'男',value:1},
          {label:'女',value:0},
          {label:'未知',value:2},
        ],
        accountTypeList:[
          {label:'微信',value:0},
          {label:'QQ',value:1},
        ],
        tabTpyeList3:[
          {title:'活动历史'},
          {title:'重复帐号'}
        ],
        statusList:[
          {value:'pending',label:'待处理'},
          {value:'success',label:'成功'},
          {value:'reject',label:'拒绝'}
        ],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
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
        checkedTags:[],
        tagList:null,

      };
    },
    methods: {
      returnSex(sex) {
        return sex==1?'男':'女';
      },
      returnAmount(s) {
          if(s==null){
              return '';
          }else{
            return (s/100).toFixed(2);
          }
      },
      returnAge(time) {
        return jsGetAge(getTimeDate(time));
      },
      fomatTime(time){
         return getTimeDate(time);
      },
      returnTypeName(type) {
        if(type==0){
          return '微信';
        }else{
          return 'QQ';
        }
      },
      async tagListClickData() {
        let id = this.$route.query.id;
        let res = await getUserInfo(id);
        let list = res.data.tags;
        this.usertagsList = list;
        let returnList = [];
        let list2 = this.tagList;
        list2.forEach(function (value) {
          let flop = true;
            list.forEach(function (val) {
                if(value.tagInfoId == val.tagInfoId){
                    flop = false;
                }
                
            });
            if(flop) returnList.push(value);
        });
        this.tagListClick = returnList;
      },
      getTagListData() {
        let status = 0;
        getTagList(status).then((res) => {
          this.tagList = res.data;
        });
        
      },
      addTags(){
        let query ={};
        query.userId = parseInt(this.userid);
        query.tagIds = this.checkedTags;
        addUserTags(query).then((res) => {
        if(res.status){
          this.tagListClickData();
        }else{
          this.$message.error(res.message);
        }
      });
      },
      deleteTag(id){
          let query ={};
          query.userId = parseInt(this.userid);
          query.tagId = id;
          deleteUserTags(query).then((res) => {
          if(res.status){
            this.tagListClickData();
          }else{
            this.$message.error(res.message);
          }
        });
      },
      async getUserInfoData() {
        let id = this.$route.query.id;
        let res = await getUserInfo(id);
        this.userInfo = res.data;
        this.birthdayTime = getTimeDateNoH(this.userInfo.birthday);
      },
      getInvitationeData() {
        let id = this.$route.query.id;
        getInvitatione(id).then((res) => {
          this.userInitInfo = res.data;
        });
      },
      getUserBalanceData() {
        let id = this.$route.query.id;
        getUserBalance(id).then((res) => {
          this.userBalance = res.data;
        });
      },
      getUserChargeData() {
        let id = this.$route.query.id;
        getUserCharge(id).then((res) => {
          this.userCharge = res.data;
        });
      },
      getUserWithdrawData() {
        let id = this.$route.query.id;
        getUserWithdraw(id).then((res) => {
          this.userWithdraw = res.data;
        });
      },

      marketUserFavApplyData() {
        let id = this.$route.query.id;
        marketUserFavApply(id).then((res) => {
          if(res.status){
            this.userFavApply = res.data;
          }
        });
      },
      subUpdate() {
          this.dialogFormVisible = false;
          this.userInfo.birthday = getDateToTimes(this.birthdayTime);
          updateUserInfo(this.userInfo).then((res) => {
          this.listLoading = false;
          if(res.status){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });
      },
      subUpdatePass() {
          this.dialogFormVisible2 = false;
          let query = {};
          query.id = this.userid;
          query.password = this.password;
          updateUserPass(query).then((res) => {
          this.listLoading = false;
          if(res.status){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });
      },
      updateStatus(name,v) {
          
          let query = {};
          let value = null;
          if(v==1){
            value = false;
          }else{
            value = true;
          }
          if(name == 'phone'){
            this.popPhone =false;
            query.phoneVerification = value;
          }else if(name == 'phone2'){
            this.popPhone2 = false;
            query.phoneVerification2 = value;
          }else if(name == 'email'){
            this.popEmail = false;
            query.emailVerification = value;
          }
          query.id = this.userid;
          
          setUserVerification(query).then((res) => {
          this.listLoading = false;
          if(res.status){
            this.getUserInfoData();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });

      },
      goChange(){

          this.$router.push({path:'/user/userchange_money',query: {'id': this.userid}})
        
      }
    }
  };
</script>

<style scope="scope">
  .user_bounced .el-tabs__header{
   margin-bottom: 40px;
 }
 .user_bounced .el-table th>.cell{
   text-align: center;
 }
 .search-box2 input{
   width: 200px;
 }

 .newinputbox .el-form-item{
   float: left;
   width: 50%;
 }
 .newinputbox .el-input{
   width: 200px !important;
 }

 .newinputbox2 .el-input{
   width: 550px !important;
 }

 .newinputbox2 p{
   color: grey;
   text-indent: 82px;
 }

 .newinputbox2 .frstp{
   margin-top: -20px;
 }

 .newinputbox2 .lastp{
   margin-bottom: 20px;
 }

 .user_bounced .el-dialog__body{
   display: table;
   width: 100%;
 }

.newinputbox .el-form-item__label{
   width: 80px;
 }
 .user_bounced .modify-ul .inline-block{
    width: 100px;
  }
 .user_bounced .set_box2 .modify-ul .el-input__inner{
    width: 385px;
  }

  .user_bounced .el-select__tags{
    margin-left: 10px !important;
  }

  .newselect{
    min-width: 200px !important;
  }

  .new2 .el-input{
    width: 70%;
  }
  button.el-button--default{
    background-color:#fff;
    border:1px solid #c4c4c4;
    color:#1f2d3d;
    border-radius:4px;
  }
  .tagclassType button.el-button--default:hover{
    border:1px solid #20a0ff;
    color:#20a0ff;
  }

  .tagclassType .el-button:focus, .el-button:hover{
    border:1px solid #20a0ff;
    color:#20a0ff;
  }
  .taglist .tagtitle{
    float: left;
    width: 100%;
    margin-bottom:5px;
    margin-top: 5px;
  }
  .taglist .tagul li{
    float:left;
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .taglist .el-checkbox-group{
    float: left;
    width: 100%;
    margin-bottom: 5px;
  }
  .taglist .el-checkbox-group .el-checkbox{
    margin-left: 10px;
  }
  .fotter{
    float: right;
    margin-right: 5px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .fotter .el-button{
    float: left;
  }
</style>
