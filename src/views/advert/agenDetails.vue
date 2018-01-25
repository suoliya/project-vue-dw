<template lang="html">
    <section class="wrapper">
        <div style="margin-left:5px;margin-right:5px;">
        <el-row>
            <el-col :span="24">
                <div class="hearder">
                    <div class="homeicon fl" style="margin-top:1%;margin-right:10px;"></div>
                    主页 -> 广告代理 -> 代理详情
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:14px;">
            <el-col :span="24">
                <div class="content1">
                    <h1>代理人基本信息</h1>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="个人信息" name="first">
                            <div style="overflow:hidden;margin-top:20px;padding-bottom:20px;">
                                <!-- <div class="personImg">
                                    <p>个人信息</p>
                                    <img src="" alt="">
                                    <span>代理用户</span>
                                </div> -->
                                <ul class="personBtn">
                                    <li>
                                        <el-button @click="dialogFormVisible3 = true"><i class="icon-file-text2"></i> 编辑代理
                                        </el-button>
                                    </li>
                                    <li>
                                        <el-button @click="dialogFormVisible1 = true"><i class="icon-unlock-alt3"></i> 修改密码
                                        </el-button>
                                    </li>
                                </ul>
                                <div class="personInfo">
                                    <span>用户名：<b>{{personInfo.account}}</b></span>
                                    <span>姓 &nbsp名：<b>{{personInfo.name}}</b></span>
                                    <span>性 &nbsp别：<b>{{personInfo.sex==0?'女':'男'}}</b></span>
                                    <hr>
                                    <span>年 &nbsp龄：<b>{{yoursAge()}}</b></span>
                                    <span>生 &nbsp日：<b ref="birthday">{{fromDate(personInfo.birthday)}}</b></span>
                                    <span>行 &nbsp业：<b>{{personInfo
                                    .industry}}</b></span>
                                    <hr>
                                    <span>公 &nbsp司：<b>{{personInfo.compay}}</b></span>
                                    <span>城 &nbsp市：<b>{{personInfo.county}}</b></span>
                                    <span>域 &nbsp名：<b>{{personInfo.website}}</b></span>
                                    <hr>
                                    <span>上 &nbsp级：<b>{{personInfo.parentName}}</b></span>
                                    <span>邀 请 码：<b>{{personInfo.invitationcode}}</b></span>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="联络信息" name="second">
                             <div class="phoneInfo">
                                <span>邮 &nbsp箱：<b>{{personInfo.email}}</b></span>
                                <span>网 &nbsp站：<b>{{personInfo.website}}</b></span>
                                <span>微 &nbsp信：<b>{{personInfo.wechart}}</b></span>
                                <hr>
                                <span>手 &nbsp机：<b>{{personInfo.phone}}</b></span>
                                <span>城 &nbsp市：<b>{{personInfo.compay}}</b></span>
                                <span>QQ号码：<b>{{personInfo.qq}}</b></span>
                             </div>
                             <hr>
                        </el-tab-pane>
                        <el-tab-pane label="银行信息" name="third">
                            <div class="moneyBox">
                                <span>钱包余额：￥ {{personInfo.money}}</span>
                                <el-button type="danger" style="margin-left:30px;" @click="openWindowAdd()"><i class="el-icon-document"></i>新建银行卡
                                </el-button>
                            </div>
                            <el-table
                              :data="accountBankList"
                              style="width: 100%;margin-top:20px;">
                              <el-table-column
                                prop="createdat"
                                label="时间"
                                width="">
                                <template slot-scope="scope">
                                    <span>{{fromDate(scope.row.createdat)}}</span>
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop="bankname"
                                label="银行名称"
                                width="">
                              </el-table-column>
                              <el-table-column
                                prop="cardnumber"
                                label="银行卡号"
                                width="">
                              </el-table-column>
                              <el-table-column
                                prop="depositbank"
                                label="支付名称"
                                width="">
                              </el-table-column>
                              <el-table-column
                                prop="realname"
                                label="姓名"
                                width="">
                              </el-table-column>
                              <el-table-column
                                prop="state"
                                label="状态"
                                width="">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.state==3" type="success" size="small" @click="changeBank(scope.row.id,scope.row.state)">删除</el-button>
                                    <el-button v-if="scope.row.state==1" type="danger" size="small" @click="changeBank(scope.row.id,scope.row.state)">关闭</el-button>
                                    <el-button v-if="scope.row.state==0" type="success" size="small" @click="changeBank(scope.row.id,scope.row.state)">开启</el-button>
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop=""
                                label="操作"
                                width="">
                                <template slot-scope="scope">
                                    <span style="cursor:pointer;" @click="editOpenWindow(scope.row)">编辑</span>
                                </template>
                              </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="accountBank.pageNum"
                                    layout="sizes, prev, pager, next"
                                    :page-sizes="[10, 20, 30,40]"
                                    :page-size="accountBank.limit"
                                    :total="bankTotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                  </el-tabs>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:14px;">
            <el-col :span="24">
                <div class="content2">
                    <div style="border-bottom:1px solid #E5E5E5;">
                        <h1>历史支付</h1>
                        <div class="inline fr search-box search-box2" style="margin-top:40px;margin-bottom:10px;">
                            <input type="text" placeholder="订单号"  v-model="accountOrder.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                            <div  class="inline"   v-if="accountOrder.searchText==''">
                                <i class="el-icon-search" style="font-size:12px;"></i>
                            </div>
                            <div  class="inline" v-else @click="handleFilterClose">
                                <i class="el-icon-close" style="font-size:12px;"></i>
                            </div>
                            <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleIconClick()">搜索</div>
                        </div>
                        <!-- <a class="create-trade mrgL10" style="position: relative;top: 19px;background-color:#ccc;color:#333;margin-left:10px;" @click="handleIconClick()"><i class="el-icon-search">搜索</i></a>
                        <input v-model="accountOrder.searchText" type="text" style="position: relative;top: 19px;float:right;height:38px;width:280px;"> -->
                    </div>
                    <el-table
                      :data="accountOrderList"
                      style="width: 100%;margin-top:20px;">
                      <el-table-column
                        prop="orderid"
                        label="订单号"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="createdate"
                        label="日期"
                        width="">
                        <template slot-scope="scope">
                            <span>{{fromDate(scope.row.createdate)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="money"
                        label="金额"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="type"
                        label="类型"
                        width="">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 0">收入</span>
                            <span v-if="scope.row.type == 1">取现</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="balance"
                        label="余额"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="operator"
                        label="操作人"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="remarks"
                        label="备注"
                        width="">
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="accountOrder.offset"
                            layout="sizes, prev, pager, next"
                            :page-sizes="[10, 20, 30,40]"
                            :page-size="accountOrder.limit"
                            :total="orderTotal">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:14px;">
            <el-col :span="24">
                <div class="content3">
                    <h1>代理佣金设置</h1>
                    <el-form :inline="true" class="demo-form-inline" label-width="180px">
                        <el-form-item label="总计活跃玩家：" required>
                          <el-input v-model="formLabelAlign.coustomnumber" placeholder="6" :disabled="true">
                              <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="默认代理百分比：" required>
                          <el-input v-model="formLabelAlign.commissionrate" placeholder="8" :disabled="true">
                              <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="每个玩家最少：" required>
                          <el-input v-model="formLabelAlign.mintotalbetting" placeholder="10000" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="最低投注金额：" required>
                          <el-input placeholder="10000" v-model="formLabelAlign.mintoaldeposit" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:14px;">
            <el-col :span="24">
                <div class="content4">
                    <h1>下级代理佣金设置</h1>
                    <el-form :inline="true" class="demo-form-inline" label-width="180px">
                        <el-form-item label="下级代理百分比：" required >
                          <el-input placeholder="6" :disabled="true" v-model="formLabelAlign.subagentrate">
                              <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="代理百分比：" required>
                          <el-input placeholder="10000" :disabled="true" v-model="formLabelAlign.commission">
                              <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>

        <!-- 弹窗-->
        <div class="openWindow">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" size="small">
                <el-col :span="24" class="content_dl">
                    <el-form :model="addBankCarData" :rules="rules" ref="addBankCarData">
                        <el-col :span="8">
                            <el-form-item label="姓名:" label-width="85px" prop="realname" required>
                                <el-input v-model="addBankCarData.realname" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="银行名称:" label-width="85px" prop="bankname" required>
                                <el-input v-model="addBankCarData.bankname" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="卡号:" label-width="180px" prop="" required>
                                <el-input v-model="addBankCarData.cardnumber" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行:" label-width="180px" prop="" required>
                                <el-input v-model="addBankCarData.depositbank" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-col>
                <div slot="footer" class="dialog-footer" style="margin-top:180px;">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button v-show="addAndEdit==1" type="primary" @click="addBankCar()">添加账户</el-button>
                    <el-button v-show="addAndEdit==2" type="primary" @click="editBankCar()">编辑账户</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 弹窗1 -->
        <div class="openWindow">
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible1" size="small">
                <el-col :span="24" class="content_dl">
                    <el-form :model="passWordData" ref="passWordData" :rules="rules1">
                        <el-col :span="8">
                            <el-form-item label="密码:" label-width="85px" prop="password" required>
                                <el-input v-model="passWordData.password" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-col>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="changePassWord()">确认</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 弹窗2 -->
        <div class="openWindow">
            <el-dialog title="编辑代理" :visible.sync="dialogFormVisible3" size="small">
                <el-col :span="24" class="content_dl">
                    <el-form :model="personInfo" ref="personInfo">
                        <el-col :span="8">
                            <el-form-item label="姓名:" label-width="85px" prop="" required>
                                <el-input v-model="personInfo.name" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="生日:" label-width="85px" prop="" required>
                                <el-date-picker
                                  @change="setBirthdayDate"
                                  class="birthday"
                                  type="date"
                                  placeholder=""
                                  v-model="birthdayDate"
                                  style="width:200px;"
                                   ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="公司:" label-width="85px" prop="" required>
                                <el-input v-model="personInfo.compay" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="网站:" label-width="85px" prop="" required>
                                <el-input v-model="personInfo.website" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="微信:" label-width="85px" prop="" required>
                                <el-input v-model="personInfo.wechart" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ:" label-width="85px" prop="" required>
                                <el-input v-model="personInfo.qq" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="电子邮箱:" label-width="180px" prop="" required>
                                <el-input v-model="personInfo.email" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="性别:" label-width="180px" prop="" required>
                                <el-select placeholder="" v-model="personInfo.sex" style="width:200px;">
                                    <el-option
                                      v-for="item in option"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="行业:" label-width="180px" prop="" required>
                                <el-input v-model="personInfo.industry" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="电话:" label-width="180px" prop="" required>
                                <el-input v-model="personInfo.phone" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="邮编:" label-width="180px" prop="" required>
                                <el-input v-model="personInfo.zipcode" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-col>
                <div slot="footer" class="dialog-footer" style="margin-top:180px;">
                    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="editAgent()">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
    </section>
</template>

<script>
import {queryPersonData,getCommission,queryAccountBank,queryAccountOrder,changeAccountBank,addAccountBank,editAccountBank,changePassWord,editAgent} from '../../service/getData.js'
import {getFormtDate,getTimeDate,jsGetAge} from '../../config/mUtils'
export default {
    data(){
        return{
            activeName: 'first',
            personInfo:{},
            id:this.$route.query.id,
            formLabelAlign: {
                "coustomnumber":'', //活跃用户数
                "mintotalbetting":'' ,//最第投注金额
                "mintoaldeposit": '',//最低充值金额
                "commissionrate": '',// 一级代理佣金百分比
                "subagentrate": '',//二级代理佣金百分比
                "commission":''//一级代理对二级代理百分比
            },
            // 获取银行卡
            accountBankList:[],
            bankTotal:null,
            accountBank:{
                "agentuuid":this.$route.query.uuid, //用户的uuid
                 "pageNum" : 1,
                 "limit" : 10
            },
            accountOrderList:[],
            orderTotal:null,
            accountOrder:{
                "agentuuid":this.$route.query.uuid,//uuid 必须 代理用户的uuid
                "searchText":'',
                "offset": 1,
                "limit":10,
                "type":3,
            },
            changeAccountBank:{
                'id':null,
                'state':null,
            },
            // 新建银行卡
            dialogFormVisible:false,
            dialogTitle:"",
            addAndEdit:1,
            addBankCarData:{
                "agentuuid":'',  //用户id
                "cardnumber":"",       //银行卡号
                "realname":"",       // 用户真实姓名
                "bankname":"",       //银行
                "depositbank":"",    //开户行
                "id":'',
            },
            rules:{
                realname:[
                    {required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                bankname:[
                    {required: true, message: '请输入银行名称', trigger: 'blur' }
                ],
            },
            // 修改密码
            dialogFormVisible1:false,
            passWordData:{
                'uuid':this.$route.query.uuid,
                'password':'',
            },
            rules1:{
                password:[
                    {required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            // 编辑代理
            dialogFormVisible3:false,
            birthdayDate:'',
            option:[{
                value: 0,
                label: '女'
            },{
                value: 1,
                label: '男'
            }],
            // editAgentData:{
            //     "email": "",// 邮箱
            //     "birthday": null,//出生日期
            //     "sex": null,//性别 0女 1男 2未知 必须
            //     "phone": "",//手机号码
            //     "compay": null,//公司
            //     "industry": null,//行业
            //     "zipcode": null,//邮编
            //     "website": null,// 网站
            //     "wechart": null,//微信
            //     "qq": null,//qq
            //     "name": "",//姓名 必须
            // },
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.queryPersonInfo();
            this.queryCommission();
            this.queryAccountBank();
            this.queryAccountOrder();
            console.log(this.$route.query.id);
            console.log(this.$route.query.uuid);
        })
    },
    computed:{

    },
    methods:{
        queryPersonInfo(){
            queryPersonData(this.id).then((res)=>{
                this.personInfo = res.data;
                this.birthdayDate = this.fromDate(this.personInfo.birthday);
                console.log(this.birthdayDate);
                console.log(res.data);
            })
        },
        queryCommission () {
            getCommission('').then((res) => {
                this.formLabelAlign = res.data;
                console.log(res.data)
            })
        },
        queryAccountBank(){
            queryAccountBank(this.accountBank).then((res) => {
                this.accountBankList = res.data.list;
                this.bankTotal = res.data.total;
                console.log(res.data);
                console.log(this.bankTotal);
            })
        },
        queryAccountOrder(){
            queryAccountOrder(this.accountOrder).then((res) => {
                this.accountOrderList = res.data.list;
                this.orderTotal = res.data.total;
                console.log(res);
                console.log(this.orderTotal);
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleSizeChange(val) {
            this.accountBank.limit = val;
            this.queryAccountBank();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.accountBank.pageNum = val;
            this.queryAccountBank();
            console.log(`当前页: ${val}`);
        },
        handleSizeChange1(val) {
            this.accountOrder.limit = val;
            this.queryAccountOrder();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange1(val) {
            this.accountOrder.offset = val;
            this.queryAccountOrder();
            console.log(`当前页: ${val}`);
        },
        fromDate(time) {
            return getTimeDate(time);
        },
        yoursAge(){
            let age = this.fromDate(this.personInfo.birthday);
            return jsGetAge(age);
        },
        // 更改银行卡状态
        changeBank(id,state){
            this.changeAccountBank.id = id;
            var amendText = '';
            if(state == 0){
                amendText = "确定要开启银行卡？";
                this.changeAccountBank.state = 1;
            }else if(state == 1){
                amendText = "确定要关闭银行卡？";
                this.changeAccountBank.state = 0;
            }else{
                amendText = "确定要删除银行卡？";
                this.changeAccountBank.state = 3;
            }
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, amendText)
                ]),
                type:'warning',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中...';
                    setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                      }, 300);
                    }, 3000);
                  } else {
                    done();
                  }
                }
              }).then(action => {
                  changeAccountBank(this.changeAccountBank).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
                          this.queryAccountBank();
                      }else{
                          this.$message({
                            type: 'info',
                            message:res.message
                          });
                      }
                  })
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
              });
        },
        // 搜索
        handleIconClick() {
            console.log(this.accountOrder.searchText);
            this.queryAccountOrder();
        },
        handleFilterClose(){
          this.accountOrder.searchText = null;
          this.queryAccountOrder();
        },
        // 新建账户
        openWindowAdd(){
            this.addBankCarData = {};
            this.addBankCarData.agentuuid = this.$route.query.uuid;
            console.log(this.addBankCarData);
            console.log(this.addBankCarData.agentuuid);
            this.dialogTitle = '新建银行卡';
            this.addAndEdit = 1;
            this.dialogFormVisible = true;
        },
        // 编辑账户
        editOpenWindow(item){
            this.addBankCarData = item;
            // this.addBankCarData.id = item.id;
            this.dialogTitle = '编辑账户';
            this.addAndEdit = 2;
            this.dialogFormVisible = true;
        },
        // 添加银行卡
        addBankCar(){
            this.$refs.addBankCarData.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.addBankCarData);
                  addAccountBank(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '添加成功！',
                         });
                         this.queryAccountBank();
                         this.dialogFormVisible = false;
                     }else{
                         this.$message({
                             type: 'info',
                             message: res.message
                         });
                     }
                })
              }
            })
        },
        editBankCar(){
            this.$refs.addBankCarData.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.addBankCarData);
                  editAccountBank(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '编辑成功！',
                         });
                         this.queryAccountBank();
                         this.dialogFormVisible = false
                     }else{
                         this.$message({
                             type: 'info',
                             message: res.message
                         });
                     }
                })
              }
            })
        },
        // 修改密码
        changePassWord(){
            this.$refs.passWordData.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.passWordData);
                  changePassWord(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '修改成功！',
                         });
                         this.dialogFormVisible1 = false;
                     }else{
                         this.$message({
                             type: 'info',
                             message: res.message
                         });
                     }
                })
              }
            })
        },
        setBirthdayDate(val){
            console.log(val);
            this.birthdayDate = val;
            console.log(this.birthdayDate);
        },
        // 编辑代理
        editAgent(){
            let time = Date.parse(new Date(this.birthdayDate));
            this.personInfo.birthday = time/1000;
            console.log(this.personInfo.birthday);
            this.$refs.personInfo.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.personInfo);
                  editAgent(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '修改成功！',
                         });
                         this.dialogFormVisible3 = false;
                     }else{
                         this.$message({
                             type: 'info',
                             message: res.message
                         });
                     }
                })
              }
            })
        },

    }
}
</script>

<style scoped>
    .wrapper{
        color: #000;
        margin-top: 0;
    }
    .hearder{
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 14px;
        background-color: #fff;
        color: #000;
    }
    .content1,.content2,.content3,.content4{
        width: 100%;
        height: auto;
        padding:15px 35px 0 35px;
        background-color: #fff;
    }
    .el-tabs__item{
        margin-right: 30px !important;
    }
    .content2{
        overflow:hidden;
    }
    .content2 h1{
        display: inline-block;
        margin-left: 10px;
        padding-bottom: 25px;
    }
    .pagination{
        float: right;
    }
    .content3,.content4{
        padding-bottom: 50px;
    }
    .content3 h1,.content4 h1{
        padding-bottom: 30px;
    }
    .phoneInfo span{
        display: inline-block;
        width: 25%;
        margin-left: 3%;
        color: #666;
    }
    .phoneInfo b{
        font-weight: normal;
        color: #000;
    }
    .moneyBox{
        width: 100%;
        text-align: right;
        border-bottom: 1px solid #E1E1E1;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .personImg{
        float: left;
        width: 170px;
        height: 190px;
        margin-left: 15px;
        border-right: 1px solid #E1E1E1;
    }
    .personImg>img{
        width: 120px;
        height: 120px;
        border:1px solid #E1E1E1;
    }
    .personImg>span{
        display: inline-block;
        width: 113px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #E1E1E1;
        border-radius: 10px;
    }
    .personBtn{
        float: left;
        margin-left: 25px;
    }
    .personBtn li{
        margin-bottom: 16px;
    }
    .personBtn .el-button{
        width: 120px;
        color: #333;
    }
    .personInfo{
        float: left;
        width: 66%;
        margin-left: 40px;
    }
    .personInfo span{
        display: inline-block;
        width: 30%;
        padding-left: 20px;
        color: #666;
    }
    .personInfo span b{
        font-weight: normal;
        color: #000;
        padding-left: 10px;
    }
    .el-form-item{
        margin-bottom: 25px;
    }
    .el-date-editor.el-input{
        width: 200px !important;
    }
</style>
