<style>
  .search-box2 input{
    width: 300px;
  }
</style>
<template>
    <section class="wrapper">
        <!--财务管理-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20 no-border">
                      <div class="inline"><h1 class="f-black inline mr20" style="margin-top: 5px;">锁定用户列表</h1></div>
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
                <div class="pad20 white-bg margin0 clearfix pdtop-0">
                  <div class="table_container">
                  <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="等级" width="70">
                        <template slot-scope="scope">
                          <span>{{scope.row.level}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户名" width="90">
                      <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.realname }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  label="性别" width="">
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
                    <el-table-column label="操作" width="150">
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          @click="open2(scope.row)">解锁用户</el-button>

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
            </div>

        </div>


    </section>
</template>

<script>
import {mapState} from 'vuex'
import {getUserList,setUserStatus} from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
  },
  created(){
    this.getList();
  },
  data() {
    return {
      total: null,
      listLoading: true,
      tableData: null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        status: 1,//正常用户
        tagId: null,
        searchText: null,
      },
      setUserStateQuery: {
          status:null,
          ids:[]
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
    open2(item){
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
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
          this.setUserStateQuery.status = 0;
          this.setUserState(item.id);
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
    setUserState(id) {
      this.setUserStateQuery.ids.push(id);
      setUserStatus(this.setUserStateQuery).then((res) => {
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
    }

  }

}
</script>

<style scoped>
  .el-button {
    border: none !important;
  }

</style>

