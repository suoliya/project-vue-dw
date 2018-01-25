<template>
  <section class="wrapper">
      <div class="row amountbox">
            <div class="col-lg-12">
                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20">批量调整余额</h1>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="加奖金" name="first">
                          <h1 class="f-black inline mr20 mbot20">主钱包</h1>

                          <ul class="modify-ul">
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>用户名：</div>
                                <input type="text" value="" v-model="username"/>
                                <el-dropdown @command="handleCommand">
                                  <el-button type="primary" v-on:click.stop="selectUserList">搜索</el-button>
                                  <el-dropdown-menu slot="dropdown" style="width: 180px;margin-right:60px;" visible-change="true" v-if="userlist==null">
                                      <el-dropdown-item command="">无数据</el-dropdown-item>
                                  </el-dropdown-menu>
                                  <el-dropdown-menu slot="dropdown" style="width: 180px;margin-right:60px;" visible-change="true" v-else>
                                      <el-dropdown-item v-for="(item,index) in userlist" :command="item" :key="index">{{ item.username }}</el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                              </li>
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>充值活动金额：</div>
                                <input type="text" value="" v-model="addActiveQuery.rechargeSum" />
                              </li>
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>优惠活动:</div>
                                <el-select v-model="addActiveQuery.actId" placeholder="请选择活动" popper-class="activebox" style="width:208px;" class="newsel">
                                  <el-option v-for="(item,index) in activeList" :label="item.ruleName" :value="item.id" :key="index"></el-option>
                                </el-select>
                              </li>
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>原因：</div>
                                <textarea class="textarea ml10" placeholder="请输入原因 ..." v-model="addActiveQuery.description"></textarea>
                              </li>
                          </ul>
                          <button class="submit-button" @click="setMoney">保存</button>
                      </el-tab-pane>
                      <el-tab-pane label="手动增加余额" name="second">
                          <h1 class="f-black inline mr20 mbot20">主钱包</h1>
                          <div class="download_btn">
                            <a href="https://github.com/xiahua/doc/blob/master/template.xlsx?raw=true" download="下载模板">下载模板</a>
                            <el-upload
                              class="upload-demo"
                              :action="updateUrl1" 
                              :headers="headers" 
                              :on-success="handleSuccess"
                              :on-error="handleReror" 
                              :on-progress="handlePro" 
                              :show-file-list="false" 
                              >
                              <el-button size="small" type="primary">上传Excel</el-button>
                            </el-upload>
                          </div>
                          <ul class="modify-ul">
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>用户名：</div>
                              <input type="text" value="" v-model="username"/>
                              <el-dropdown @command="handleCommand">
                                <el-button type="primary" v-on:click.stop="selectUserList">搜索</el-button>
                                <el-dropdown-menu slot="dropdown" style="width: 180px;margin-right:60px;" visible-change="true" v-if="userlist==null">
                                    <el-dropdown-item command="">无数据</el-dropdown-item>
                                </el-dropdown-menu>
                                <el-dropdown-menu slot="dropdown" style="width: 180px;margin-right:60px;" visible-change="true" v-else>
                                    <el-dropdown-item v-for="(item,index) in userlist" :command="item" :key="index">{{ item.username }}</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </li>
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>增加金额：</div>
                              <input type="text" value="" v-model="balanceQuery.money" />
                            </li>
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>原因：</div>
                              <textarea class="textarea ml10" placeholder="请输入原因 ..." v-model="balanceQuery.reason"></textarea>
                            </li>
                          </ul>
                          <button class="submit-button" @click="setBalance">保存</button>
                      </el-tab-pane>
                      <el-tab-pane label="手动减少余额" name="third">
                          <h1 class="f-black inline mr20 mbot20">主钱包</h1>
                          <div  class="download_btn">
                            <a href="https://github.com/xiahua/doc/blob/master/template.xlsx?raw=true" download="下载模板">下载模板</a>
                            <el-upload
                              class="upload-demo"
                              :action="updateUrl2" 
                              :headers="headers" 
                              :on-success="handleSuccess"
                              :on-error="handleReror" 
                              :on-progress="handlePro" 
                              :show-file-list="false" 
                              >
                              <el-button size="small" type="primary">上传Excel</el-button>
                            </el-upload>
                          </div>
                          <ul class="modify-ul">
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>用户名：</div>
                              <input type="text" value="" v-model="username"/>
                              <el-dropdown @command="handleCommand">
                                <el-button type="primary" v-on:click.stop="selectUserList">搜索</el-button>
                                <el-dropdown-menu slot="dropdown" style="width: 180px;margin-right:60px;" visible-change="true" v-if="userlist==null">
                                    <el-dropdown-item command="">无数据</el-dropdown-item>
                                </el-dropdown-menu>
                                <el-dropdown-menu slot="dropdown" style="width: 180px;margin-right:60px;" visible-change="true" v-else>
                                    <el-dropdown-item v-for="(item,index) in userlist" :command="item" :key="index">{{ item.username }}</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </li>
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>减少金额：</div>
                              <input type="text" value="" v-model="balanceQuery.money" />
                            </li>
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>原因：</div>
                              <textarea class="textarea ml10" placeholder="请输入原因 ..." v-model="balanceQuery.reason"></textarea>
                            </li>
                          </ul>
                          <button class="submit-button" @click="setBalance">保存</button>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
            </div>
      </div>
  </section>
</template>
<script>
import {marketRuleQuery,addActiveMoney,UserListForUsername,updateAdjustment,actSignAdd} from '../../service/getData'
import {mapState} from 'vuex'
import {getStore} from '../../config/mUtils'
import { Loading } from 'element-ui'
import {baseUrl,baseUrl_2} from '../../config/env'

  export default {
    created(){
      this.getActiveListData();
    },
    computed: {
      ...mapState([
        'adminId'
        ])
    },
    data() {
      return {
        updateUrl1:baseUrl+'/customers/customer/upload/excel/addMoney',
        updateUrl2:baseUrl+'/customers/customer/upload/excel/reduceMoney',
        headers:{
         
          'Authorization':getStore('token')
        },
        loadingInstance:null,
        dataType:0,
        activeName: 'first',
        activeList:null,
        addActiveQuery: {
          userId:null,
          actId:null,
          rechargeSum:null,
          description:null,
          userName:null

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
      handleClick(tab, event) {
        this.dataType = tab.index;
      },
      getActiveListData() {
        let query = {};
        query.pageNum = 1;
        query.limit = 100;
        marketRuleQuery(query).then((res) => {
            this.activeList = res.data.list;
        });

      },
      setMoney() {
        this.addActiveQuery.userId = this.clickUserDetail.id;
        this.addActiveQuery.userName = this.clickUserDetail.username;
        this.addActiveQuery.rechargeSum = parseInt(this.addActiveQuery.rechargeSum);
        actSignAdd(this.addActiveQuery).then((res) => {
          if(res.status){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });
      },
      handleCommand(command) {

        this.clickUserDetail = command;
        this.username = this.clickUserDetail.username;

      },
      selectUserList() {
          UserListForUsername(this.username).then((res) => {
              this.userlist = res.data;
          });
      },
      setBalance() {
            
            if(this.dataType ==1){
              this.balanceQuery.type = 0;
            }else if(this.dataType==2){
              this.balanceQuery.type = 1;
            }
            this.balanceQuery.userId = this.clickUserDetail.id;
            this.balanceQuery.operator_id = this.adminId;
            this.balanceQuery.money = this.balanceQuery.money;
            updateAdjustment(this.balanceQuery).then((res) => {
            if(res.status){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
/*              setTimeout(() => {
                window.location.reload(); 
              }, 3000);*/
             
            }else{
              this.$message.error(res.message);
            }
          });

      },

      handleSuccess(response,file, fileList) {
        this.loadingInstance.close();
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
      },
      handleReror(err,file) {
        this.loadingInstance.close();
        this.$message.error("上传失败！");
      },
      handlePro(event, file) {
        this.loadingInstance = Loading.service({ fullscreen: true });
      }
    }
  };
</script>

<style>
.amountbox .modify-ul .el-input__inner{
    width: 175px;
    height: 36px;
    border-radius: 0;
    border: 1px solid #a9a9a9;
}

.amountbox .el-button--primary{
    padding: 8px 15px;
    margin-left: 10px;
}

.newsel input{
  width:197px !important;
}

.amountbox input{
  width:197px !important;
}

.upload-demo  .el-upload__input{
    display: none;
  }
  .download_btn{
    float: left;
    width: 100%;
    margin-top: 0px;
    margin-bottom: 30px;

  }
  .download_btn a{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid #4db3ff !important;
    color: #fff !important;
    padding: 8px 15px;
    margin-left: 10px;
    font-size: 12px;
    border-radius: 4px;
    background-color: #20a0ff;
    float: left;
    margin-left: 230px;
  }
</style>
