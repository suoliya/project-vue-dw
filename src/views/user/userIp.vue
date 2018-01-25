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
                      <div class="inline"><h1 class="f-black inline mr20" style="margin-top: 5px;">IP搜索用户</h1></div>
                      <!--搜索-->
                      <div class="inline fr search-box search-box2">
                        <input type="text" placeholder="请输入要查询的ip
                        " v-model="listQuery.ip">
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                  <div class="usl-select-tj  white-bg pd-20 clearfix pdtop-0">
                      <label class="ml10">登录时间范围：</label>
                      <list-time-area  @timeValue="handleFilter" ref="datepick" style="width:340px !important;"></list-time-area>
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
                        <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.realname }}</span>
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
                    <el-table-column label="登录IP" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.loginIp }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="登录时间" width="">
                      <template slot-scope="scope">
                        <span>{{ FormtDate(scope.row.loginTime) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="注册IP" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.registerIp }}</span>
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
import {getUserAllListIp} from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
import listTimeArea from '../../components/moudle/listTimeArea.vue'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    listTimeArea
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
        ip: null,
        start:null,
        end:null
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
  
    getList() {
      this.listLoading = true;
      getUserAllListIp(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        //console.log(this.tableData);
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
      this.listQuery.end = getFormtDate(this.$refs.datepick.value4[1]);
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
    

  }

}
</script>



