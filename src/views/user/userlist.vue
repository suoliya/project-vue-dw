<style>

  .search-box2 input{
    min-width:280px !important;
  }

  .borderb{
    margin-bottom: 15px;
    overflow: hidden;
  }

  .userlistthree .topthree{
    height: 120px;
  }
</style>
<template>
    <section class="wrapper newuserbox">
        <!--头部三个模块-->
        <div class="row userlistthree biguserbox">
              <div class="col-lg-3 mbot20">
                    <div class="white-bg borderbox topthree">
                        <div class="usl-icon userall"></div>
                        <p class="usl-middle-font"><i>会员总数：</i></p>
                        <div class="newuserjebox">
                             <span class="red-color max5rem">{{ totalCustomer }}</span><span>位</span>
                        </div>
                    </div>
              </div>
              <div class="col-lg-3 mbot20">
                    <div class="white-bg borderbox topthree">
                        <div class="usl-icon user"></div>
                        <p class="usl-middle-font"><i>今日新注册用户：</i></p>
                        <div class="newuserjebox">
                            <span class="red-color max5rem">{{ todaySignups.todayReg }}</span><span>位</span>
                        </div>
                    </div>
              </div>
              <div class="col-lg-3 mbot20">
                  <div class="white-bg borderbox topthree">
                        <div class="usl-icon xf"></div>
                        <p class="usl-middle-font"><i>累计消费：</i><!-- <span class="date">{{nowDay}}</span> --></p>
                        <div class="newuserjebox">
                           <span class="green-color max5rem">￥{{ chargeByDate }}</span>
                        </div>
                        <router-link class="usl-detail gray-bg white-font fr" target = _blank :to="{path:'/user/userexpense'}">详情</router-link>
                  </div>
              </div>
              <div class="col-lg-3 mbot20">
                  <div class=" white-bg borderbox topthree">
                      <div class="usl-icon top"></div>
                      <p class="usl-middle-font"><span>消费TOP10会员</span></p>
                      <router-link class="usl-detail purple-bg white-font fr" target = _blank :to="{path:'/user/usertopten'}">详情</router-link>
                      <!-- <span class="date" style="margin-top:10px;display:block;text-align: right;">{{nowDay}}</span> -->
                  </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <!--图表-->
        <div class="row margin-10">
          <div class="col-lg-12 getheight userlist_search" >
              <div class="usl-top-box white-bg pd-20" style="min-height:130px;">
                  <div class="inline">
                    <h1 class="f-black inline mr20">用户检索</h1>
                  </div>
                    <div>
                      <div class="inline fr sxbox"  @click="dialogFormVisible = true" style="background-color: #dcdcdc;border-radius:0;cursor: pointer;">筛选</div>
                      <div class="inline fr search-box search-box2">
                            <input type="text"
                                   placeholder="姓名/用户/手机号/邮箱/qq/微信"
                                   v-model="listQuery.searchText"
                                   style="min-width:200px !important;font-size: 10px;width:200px !important"
                                   @keyup.enter="handleFilter"
                             />
                            <div  class="inline"   v-if="listQuery.searchText==null">
                            <i class="el-icon-search" style="font-size:12px;"></i>
                            </div>
                            <div  class="inline" v-else @click="handleFilterClose">
                            <i class="el-icon-close" style="font-size:12px;"></i>
                            </div>
                            <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                    </div>
                  </div>

              </div>
          </div>
        </div>
        <!--用户列表-->
        <div class="pad20 margin0 white-bg clearfix" v-if="tableData!=null">
            <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">
              <el-table-column label="等级" align="center" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.row.level}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="用户名">
                <template slot-scope="scope">
                  <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="姓名">
                <template slot-scope="scope">
                  <span>{{ scope.row.realname }}</span>
                </template>
              </el-table-column>
              <el-table-column  label="性别">
                <template slot-scope="scope">
                  <span>{{ sexType(scope.row.sex) }} </span>
                </template>
              </el-table-column>
              <el-table-column label="微信/QQ" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.accountId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="电话" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
              <el-table-column label="余额" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.balance/100 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="注册时间" width="">
                <template slot-scope="scope">
                  <span>{{ FormtDate(scope.row.createdAt) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最后一次登录IP" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.lastLoginIp }}</span>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination fr">
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
              </el-pagination>
            </div>
        </div>
        <!-- Form -->
        <el-dialog title="条件筛选" :visible.sync="dialogFormVisible" width="90%">
          <el-form :model="form">

            <div class="xgsx">
                <div class="row">
                  <div class="col-lg-12">
                      <div class="row">
                          <div class="col-lg-3">
                          <el-input placeholder="请输入内容" v-model="listQuery.country">
                            <template slot="prepend">国家</template>
                          </el-input>
                          </div>
                          <div class="col-lg-3">
                          <el-input placeholder="请输入内容" v-model="listQuery.city">
                            <template slot="prepend">城市</template>
                          </el-input>
                          </div>
                          <div class="col-lg-3">
                          <el-input placeholder="请输入内容" v-model="listQuery.ip">
                            <template slot="prepend">IP</template>
                          </el-input>
                          </div>
                          <div class="col-lg-3">
                          <el-input placeholder="请输入内容" v-model="listQuery.beInvitedCode">
                            <template slot="prepend">好友推荐码</template>
                          </el-input>
                          </div>
                      </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                      <div class="row">
                          <div class="col-lg-3">
                            <el-select v-model="listQuery.sex" placeholder="性别">
                              <el-option label="女" value="0"></el-option>
                              <el-option label="男" value="1"></el-option>
                              <el-option label="未知" value="2"></el-option>
                            </el-select>
                          </div>
                          <div class="col-lg-3">
                            <el-select v-model="listQuery.status" placeholder="是否被禁止登录">
                              <el-option label="正常" value="0"></el-option>
                              <el-option label="禁止" value="1"></el-option>
                            </el-select>
                          </div>
                          <div class="col-lg-3">
                            <el-select v-model="listQuery.phoneVerification" placeholder="手机状态">
                              <el-option label="未认证" value="0"></el-option>
                              <el-option label="已认证" value="1"></el-option>
                            </el-select>
                          </div>
                          <div class="col-lg-3">
                            <el-select v-model="listQuery.emailVerification" placeholder="邮件状态">
                              <el-option label="未认证" value="0"></el-option>
                              <el-option label="已认证" value="1"></el-option>
                            </el-select>
                          </div>
                      </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-12">
                      <div class="row">
                          <div class="col-lg-3">
                            <el-select v-model="listQuery.balanceMain" placeholder="钱包">
                                <el-option label="钱包" value="main"></el-option>
                                <el-option label="pt" value="pt"></el-option>
                                <el-option label="mg" value="mg"></el-option>
                                <el-option label="nt" value="nt"></el-option>
                            </el-select>
                          </div>
                          <div class="col-lg-3">
                          <el-input placeholder="请输入金额" v-model="listQuery.balanceFrom" :disabled="listQuery.balanceMain==null">
                            <template slot="prepend">钱包（元）>=</template>
                          </el-input>
                          </div>
                          <div class="col-lg-3">
                            <el-input placeholder="请输入金额" v-model="listQuery.balanceTo" :disabled="listQuery.balanceMain==null">
                              <template slot="prepend">钱包（元）<=</template>
                            </el-input>
                          </div>
                          <div class="col-lg-3">
                            <el-select v-model="listQuery.tagId" placeholder="标签">
                              <el-option label="全部"value=""></el-option>
                              <el-option
                                v-for="item in tagList"
                                :key="item.tagInfoId"
                                :label="item.tagName"
                                :value="item.tagInfoId">
                              </el-option>
                            </el-select>
                          </div>
                      </div>
                  </div>

                </div>

                <div class="row">
                  <div class="col-lg-12">
                      <div class="row">
                          <div class="col-lg-6 userlist_search">
                              <el-select v-model="listQuery.type" slot="prepend" placeholder="时间范围" class="userist_select" >
                                <el-option label="注册时间" value="1"></el-option>
                                <el-option label="最后一次登录时间" value="2"></el-option>
                              </el-select>
                              <list-time-area class="time_search" ref="datepick"></list-time-area>
                          </div>
                      </div>
                  </div>

                </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectUserList">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>

<script>
import {getUserList,getUserTotalCustomer,getChargeByDate,setUserStatus,getTagList,setNewTag,deleteTag,getSelectUserList,todayTotal} from '../../service/getData'
import selectbar from '../../components/selectbar/selectbar.vue'
import datepickerbar from '../../components/moudle/datepickerbar.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
import listTimeArea from '../../components/moudle/listTimeArea.vue'

export default {
  components: {
    selectbar,
    datepickerbar,
    listTimeArea
  },
  created(){
    this.getTotalCount();
    this.getTagList();
    this.getList();
  },
  data() {
    return {
      listQuery:{
        sex:null,
        balanceMain:null,
        balanceFrom:null,
        balanceTo:null,
        ip:null,
        tagId:null,
        searchText:null,
        city:null,
        country:null,
        phoneVerification:null,
        emailVerification:null,
        emailVerification:null,
        beInvitedCode:null,
        status:null,
        type:null,
        start:null,
        end:null,
        pageNum: 1,
        limit: 10,
        searchText: null,
      },
      tagList:null,
      total: null,
      listLoading: true,
      tableData: null,
      dialogFormVisible:false,

      totalCustomer:null,
      todaySignups:null,
      chargeByDate:null
    };
  },
  computed: {
     nowDay() {
        let nowdate = new Date();
        return getFormtDate(nowdate, "yyyy-MM-dd");
     }
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    sexType(sex) {

        if(sex==1){
          return '男';
        }else if(sex==0){
          return '女';
        }else{
          return '未知';
        }
    },
    getTotalCount() {
      let today = this.nowDay;
      getUserTotalCustomer({'end_date':today}).then((res) => {
        this.totalCustomer = res.data.count;
      });
      getChargeByDate({"begin_date":"2017-01-01","end_date":today}).then((res) => {
        this.chargeByDate = res.data.amount/100;
      });
      todayTotal().then((res) => {
        this.todaySignups = res.data;
      });
    },
    getTagList() {
      let status = 0;
      getTagList(status).then((res) => {
        this.tagList = res.data;
      });
    },
    getList() {

      this.listLoading = true;
      getSelectUserList(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleFilterClose(){
      this.listQuery.searchText = null;
//      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    selectUserList(){
      this.dialogFormVisible = false;
      this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
      this.listQuery.end = getFormtDate(this.$refs.datepick.value4[1]);
      this.listQuery.pageNum = 1;
      getSelectUserList(this.listQuery).then((res) => {
          if(res.status){
            this.tableData = res.data.list;
            this.total = res.data.total;
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              console.log(res);
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
<style>

.userlist_search .time_search{
  min-width:400px !important;
  margin-left: -6px;
  float: left;
}
/*.userlist_search{
  width: 50%;
}*/
.userlist_search .userist_select{
  min-width:100px !important;
  z-index: 100;
  width: 20%;
  float: left;
}
.userlist_search .userist_select .el-input__inner{
  border-radius: 4px 0px 0px 4px;
}
</style>



