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
    <section class="wrapper">
        <!--头部三个模块-->
        <div class="row userlistthree">
              <div class="col-lg-4 mbot20">
                    <div class="white-bg borderbox topthree">
                        <div class="usl-icon user"></div>
                        <p class="usl-middle-font"><i>会员总数：</i><span class="red-color max5rem" title="5158798">{{ totalCustomer }}</span><span>位</span></p>                    </div>
              </div>
              <div class="col-lg-4 mbot20">
                  <div class="white-bg borderbox topthree">
                        <div class="usl-icon xf"></div>
                        <p class="usl-middle-font"><i>提现总额:</i><span class="green-color max5rem" title="5158798">￥{{ chargeByDate }}</span></p>
                        <router-link class="usl-detail gray-bg white-font fr" target = _blank :to="{path:'/user/userexpense'}">详情</router-link>
                  </div>
              </div>
              <div class="col-lg-4 mbot20">
                  <div class=" white-bg borderbox topthree">
                      <div class="usl-icon top"></div>
                      <p class="usl-middle-font"><span>消费TOP10会员</span></p>
                      <router-link class="usl-detail purple-bg white-font fr" target = _blank :to="{path:'/user/usertopten'}">详情</router-link>
                  </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-10 getheight">
                  <div class="usl-top-box white-bg pd-20">
                      <div class="inline"><h1 class="f-black inline mr20">用户管理</h1><span class="f25">user management</span></div>
                      <div class="inline fr search-box search-box2 mt20">
                          <input type="text" placeholder="请输入要查询的 用户名 / 手机号码 / QQ号码" v-model="listQuery.searchText">
                          <div class="inline" @click="handleFilter"><i class="icon-search"></i></div>
                      </div>
                  </div>
                  <div class="usl-select-tj  white-bg pd-10 clearfix">
                      <ul class="fr usl-select-tj-2">
                        <li class="fl" @click="open2"><i class="icon-unlock-alt mr10"></i>解锁用户</li>
<!--                         <li class="fl"><i class="icon-jpy mr10"></i>加金返水</li>
 -->                        <!-- <li class="fl"><i class="icon-sitemap mr10"></i>移至分组</li> -->
                      </ul>
                  </div>
                  <div class="pad20 margin0 white-bg clearfix">
                      <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">
                      <el-table-column type="selection" width="30"></el-table-column>
                        <el-table-column label="用户等级" width="68">
                            <template slot-scope="scope">
                              <span>{{scope.row.level}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户名" width="70">
                          <template slot-scope="scope">
                            <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column label="用户姓名" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.realname }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column  label="性别" width="45">
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
                        <el-table-column label="注册时间" width="">
                          <template slot-scope="scope">
                            <span>{{ FormtDate(scope.row.createdAt) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="登录IP" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.lastLoginIp }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" width="">
                          <template slot-scope="scope">
                              踢出
                          </template>
                        </el-table-column>
                      </el-table>

                      <div class="pagination fr">
                        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
                        </el-pagination>
                      </div>
                  </div>


              </div>
              <div class="col-lg-2">
                <div class="tagbox ">
                  <div class="pd-10 borderb">
                  <i v-if="tagTypeIndex==='all'" class="icon-calendar mr20 f20" style=""><span style="font-size: 14px;margin-left: 5px;margin-top: 2px;">标签</span></i>
                  <span v-else style="float:left;cursor:pointer;position: relative;top: 2px;" @click="openTagDelete">-删除标签</span>
                  <span style="float:right;cursor:pointer;position: relative;top: 2px;" @click="openTag">+ 添加标签</span></div>
                  <ul class="tagbox">
                      <li @click="tagClick('all')" :class="{active:(tagTypeIndex==='all')}">全部用户<span>({{tagAllTotal}})</span></li>
                      <li @click="tagClick(item.tagInfoId,index)" v-for="(item,index) in tagList" :key="index" :class="{active:(tagTypeIndex==index)}">{{item.tagName}}<span>({{item.userCount}})</span></li>
                  </ul>
                </div>

              </div>
            </div>

        </div>

    </section>
</template>

<script>
import {getUserList,getUserTotalCustomer,getChargeByDate,setUserStatus,getTagList,setNewTag,deleteTag} from '../../service/getData'
import selectbar from '../../components/selectbar/selectbar.vue'
import datepickerbar from '../../components/datepicker/datepickerbar.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
export default {
  components: {
    selectbar,
    datepickerbar
  },
  created(){
    this.getList();
    this.getTotalCount();
    this.getTagList();
  },
  data() {
    return {
      tagTypeIndex:'all',
      tagList:null,
      tagAllTotal:null,
      tagClickId:null,
      multiple:null,
      dynamicTags: ['标签一', '标签二'],
      inputVisible: false,
      inputValue: '',
      total: null,
      listLoading: true,
      tableData: null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        tagId: null,
        searchText: null,
      },
      totalCustomer:null,
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
    },
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        if(this.tagTypeIndex === 'all'){
          this.tagAllTotal = res.data.total;
        }
        this.listLoading = false;
      });
    },
    getTagList() {
      let status = 0;
      getTagList(status).then((res) => {
        this.tagList = res.data;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    setheight(){
       var height = $(".getheight").height();
       $(".tagbox").height(height);
    },
    list () {
      test().then((res) => { console.log(res.data) })
    },

    handleSelectionChange(val) {
      let list = val;
      let ary = [];
      list.forEach((v,i)=> {
        ary[i] = v.id

      });
      this.multiple = ary;

    },
    open2(){
      let ids = this.multiple;
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '确认允许用户登录？ ')
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
            }, 1000);
          } else {
            done();
          }
        }
      }).then(action => {
          this.setUserState(ids);
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });

          });
      },
      setUserState(ids) {
        let query = {};
        query.status = 0;
        query.ids = ids;
        setUserStatus(query).then((res) => {
            if(res.status){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
            }else{
              this.$message({
                type: 'info',
                message:res.message
              });
            }
        });
      },
      setUserTag(ids) {
        let query = {};
        query.status = 0;
        query.ids = ids;
        setUserStatus(query).then((res) => {
            if(res.status){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
            }else{
              this.$message({
                type: 'info',
                message:res.message
              });
            }
        });
      },
      openTag() {
       this.$prompt('标签名称', '新建标签', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         inputPattern: /^[\s\S]{1,12}$/,
         inputErrorMessage: '标签不要超15个字符'
       }).then(({ value }) => {
          let query = {};
          query.status = 0;
          query.type = 0;
          query.tagName = value;
          setNewTag(query).then((res) =>{
              if(res.status){
                  this.getTagList();
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
              }else{
                this.$message({
                  type: 'info',
                  message:res.message
                });
              }
          });
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '取消输入'
         });
       });
     },
     openTagDelete() {
        this.$confirm('确定删除标签？', '删除标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
           deleteTag(this.listQuery.tagId).then((res) =>{
               if(res.status){
                   this.getTagList();
                   this.$message({
                     type: 'success',
                     message: '删除成功!'
                   });
               }else{
                 this.$message({
                   type: 'info',
                   message:res.message
                 });
               }
           });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
     },
     tagClick(t,i) {
        if(t=='all'){
          this.listQuery.tagId = '';
          this.tagTypeIndex = 'all';

        }else{
          this.listQuery.tagId = t;
          this.tagTypeIndex = i;
        }
        this.getList();
     },
  }

}
</script>



