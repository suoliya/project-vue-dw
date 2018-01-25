<style>
.el-table__body,.el-table__header{
  width: 100% !important;
}

.search-box2 input{
  min-width:280px !important;
}
</style>
<template>
    <section class="wrapperDetail">
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20">
                      <div class="inline"><h1 class="f-black inline mr20">{{typeName}}</h1></div>
                  </div>

                <div class="pd-20 white-bg clearfix">
                  <el-table v-if="type==1 || type==2" :data="tableData" stripe style="width: 100%">
                      <el-table-column align="center" label="时间"  width="">
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.createdAt)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用户名" width="">
                        <template slot-scope="scope">
                            <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.userId}}">{{scope.row.username}}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="账户名">
                        <template slot-scope="scope">
                          <span>{{scope.row.realname}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column  align="center" label="交易金额" width="">
                        <template slot-scope="scope">
                          <span>{{scope.row.amount/100}}</span>
                        </template>
                      </el-table-column>
                  </el-table>

                  <el-table v-if="type==3 || type==4" :data="tableData" stripe style="width: 100%">
                      <el-table-column align="center" label="时间"  width="">
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.createdAt)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用户名" width="">
                        <template slot-scope="scope">
                            <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.userId}}">{{scope.row.name}}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="金额">
                        <template slot-scope="scope">
                          <span>{{scope.row.amount/100}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column v-if="type==3" align="center" label="转入平台" width="">
                        <template slot-scope="scope">
                          <span>{{scope.row.to}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column v-else-if="type==4" align="center" label="转出平台" width="">
                        <template slot-scope="scope">
                          <span>{{scope.row.to}}</span>
                        </template>
                      </el-table-column>

                  </el-table>

                  <el-table v-if="type==5 || type==6" :data="tableData" stripe style="width: 100%">
          
                      <el-table-column align="center" label="用户名" width="">
                        <template slot-scope="scope">
                            <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                        </template>
                      </el-table-column>

                      <el-table-column align="center" label="登录时间"  width="">
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.updatedAt)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="注册时间"  width="">
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.createdAt)}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column align="center" label="真实姓名" width="">
                        <template slot-scope="scope">
                        <span>{{scope.row.realname}}</span>
                        </template>
                      </el-table-column>

                  </el-table>
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
import { ServiceChargeList,ServiceWithdrawList,getTodayMuv,getTodayRegister,todayGameRecord } from '../../service/getData'

import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {

  created(){
    this.changeTableData();
  },
  data() {
    return {
      total: null,
      listLoading: true,
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        start: null,
        end: null,
      }
    }
  },
  computed: {
    ...mapState([
      'adminId'
      ]),
    type(){
      return this.$route.query.type;
    },
    typeName() {
      return this.$route.query.typeName;
    },

  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    todaySet() {
      let nowdate = new Date();
      let nowtime = getFormtDate(nowdate, "yyyy-MM-dd");
      this.listQuery.start = nowtime+' 00:00:00';
      this.listQuery.end = nowtime+' 23:59:59';
    },
    changeTableData(){
      this.listLoading = true;
      this.todaySet();
      let res = {};
      if(this.type == 1){
        let query = {};
        query.pageNum = this.listQuery.pageNum;
        query.limit = this.listQuery.limit;
        query.beginTime  = this.listQuery.start;
        query.endTime = this.listQuery.end;
        res = ServiceChargeList(query);
        res.then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
      }else if(this.type == 2){

        let query = {};
        query.pageNum = this.listQuery.pageNum;
        query.limit = this.listQuery.limit;
        query.beginTime  = this.listQuery.start;
        query.endTime = this.listQuery.end;
        res = ServiceWithdrawList(query);
        res.then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
      }else if(this.type == 3){
        let query = {};
        query = this.listQuery
        query.type = 'transform_to_game';
        res = todayGameRecord(query);
        res.then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
      }else if(this.type == 4){
        let query = {};
        query = this.listQuery

        query.type = 'transform_to_main';
        res = todayGameRecord(query);
        res.then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
      }else if(this.type == 5){

        res = getTodayMuv(this.listQuery);
        res.then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
      }else if(this.type == 6){
        res = getTodayRegister(this.listQuery);
        res.then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
      }
      this.listLoading = false;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.changeTableData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.changeTableData();
    },
  }

}
</script>
