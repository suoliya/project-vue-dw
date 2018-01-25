<template>
    <section class="wrapper">
        <!--财务管理-->
        <div class="row">
              <div class="col-lg-10 getheight">
                  <div class="usl-top-box white-bg pd-20 no-border">
                      <div class="inline"><h1 class="f-black inline mr20" style="margin-top: 5px;">正常用户列表</h1></div>
                      <!--搜索-->
                      <div class="inline fr search-box search-box2">
                        <input type="text" placeholder="请输入要查询的 邮箱/手机号码/真实姓名/用户账号" v-model="listQuery.searchText">
                        <div  class="inline"  v-if="listQuery.searchText==null">
                        <i class="el-icon-search" style="font-size:12px;"></i>
                        </div>
                        <div  class="inline"  @click="handleFilterClose" v-else>
                        <i class="el-icon-close" style="font-size:12px;"></i>
                        </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                <!--列表-->
                <div class="usl-select-tj  white-bg pd-20 pdtop-0 clearfix">
                    <ul class="fr usl-select-tj-2" style="background-color:#ec6941;color:#fff;width:120px;margin-bottom:0;border-radius: 5px;">
                      <li class="fl" @click="open2" style="margin-right:0;"><i class="icon-unlock-alt2 mr10"></i>禁止用户登录</li>
<!--                         <li class="fl" style="margin-right:0;"><i class="icon-jpy mr10"></i>加金返水</li>
-->                        <!-- <li class="fl"><i class="icon-sitemap mr10"></i>移至分组</li> -->
                    </ul>
                </div>
                <div class="pad20 white-bg margin0 clearfix pdtop-0">
                  <div class="table_container">
                  <el-table :data="tableData" stripe style="width: 100%;" @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">
                      <el-table-column type="selection" width="50"></el-table-column>
<!--                         <el-table-column label="用户等级" width="90">
                            <template slot-scope="scope">
                              <span>{{scope.row.level}}</span>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="用户名" width="110">
                          <template slot-scope="scope">
                            <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                          </template>
                        </el-table-column>
                        <el-table-column label="用户姓名" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.realname }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column  label="性别" width="60">
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
                        <el-table-column label="登录IP" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.lastLoginIp }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" width="">
                          <template slot-scope="scope">
                          <el-button
                            size="small"
                            @click="offlineUserClicl(scope.row.id)">踢出</el-button>
                          </template>
                        </el-table-column>
                      </el-table>

                  </div>
                  <div class="pagination fr">
                    <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
                    </el-pagination>
                  </div>
                </div>

              </div>

              <div class="col-lg-2">
                <div class="tagbox ">
                  <div class="pd-10 borderb">
                  <i v-if="tagTypeIndex==='all'" class="el-icon-tickets mr20 f20" style="margin-top:3px;"><span style="font-size: 14px;margin-left: 5px;margin-top: 2px;position: relative;
    top: -2px;">标签</span></i>
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
import {mapState} from 'vuex'
import {getUserList,setUserStatus,offlineUser,getTagList,setNewTag,deleteTag} from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
  },
  created(){
    this.getList();
    this.getTagList();
  },
  data() {
    return {
      tagTypeIndex:'all',
      tagList:null,
      tagAllTotal:null,
      tagAllTotall:true,
      tagClickId:null,
      multiple:null,
      total: null,
      listLoading: true,
      tableData: null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        status:0,//正常用户
        tagId: null,
        searchText: null,
      },
      transferSureList: null
    }
  },
  computed: {
    ...mapState([
      'adminName','adminId'
      ])
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
    getTagList() {
      let status = 0;
      getTagList(status).then((res) => {
        this.tagList = res.data;
      });
    },
    open2(item){
      let ids = this.multiple;
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '确认禁止用户登录？ ')
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
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        //console.log(this.tableData);
        this.total = res.data.total;
        if(this.tagTypeIndex === 'all'&&this.tagAllTotall){
          this.tagAllTotal = res.data.total;
          this.tagAllTotall = false;
        }
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleFilterClose(){
      this.listQuery.searchText = null;
      this.handleFilter();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    setUserState(ids) {
      let query = {};
      query.status = 1;
      query.ids = ids;
      setUserStatus(query).then((res) => {
          if(res.status){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.getList();
          }else{
            this.$message({
              type: 'info',
              message:res.message
            });
          }
      });
    },
    handleSelectionChange(val) {
      let list = val;
      let ary = [];
      list.forEach((v,i)=> {
        ary[i] = v.id

      });
      this.multiple = ary;

    },
    offlineUserClicl(id){
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '确认踢出用户？ ')
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
        offlineUser(id).then((res) => {
              if(res.status){
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  });
                  this.getList();
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
            message: '已取消'
          });

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
         this.listQuery.status = 0;

       }else{
         this.listQuery.tagId = t;
         this.tagTypeIndex = i;
         this.listQuery.status = null;
       }
       this.getList();
    },

  }

}
</script>
<style scoped>
  .search-box2 input{
    width: 310px;
  }

  @media screen and (max-width: 1600px){
    .usl-select-tj-2 {
        margin-bottom: 0;
        padding: 5px 10px;
    }
  }

  .el-button {
    border: none;
  }

</style>


