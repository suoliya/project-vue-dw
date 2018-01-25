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
                      <div class="inline"><h1 class="f-black inline mr20" style="margin-top: 5px;">用户游戏报表</h1></div>
                      <!--搜索-->
                      <div class="inline fr search-box search-box2">
                        <input type="text" placeholder="搜索用户名
                        " v-model="listQuery.account">
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                  <div class="usl-select-tj  white-bg pd-20 clearfix pdtop-0">
                      <label class="ml10">报表日期：</label>
                      <date-set  @timeSet="handleFilter" ref="datepick" style="width:200px !important;"></date-set>
                  </div>
                <!--列表-->
                <div class="pad20 white-bg margin0 clearfix pdtop-0">
                  <div class="table_container">
                  <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="日期" width="120">
                        <template slot-scope="scope">
                          <span>{{scope.row.gameDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.account }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="总投注额" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.totalBen) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="总赢" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.totalWin) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="pt赢" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.ptWin) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="pt投注额" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.ptBen) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="mg投注额" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.mgBen) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="mg赢" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.mgWin) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="nt投注额" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.ntBen) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="nt赢" width="">
                      <template slot-scope="scope">
                        <span>{{ numFix(scope.row.ntWin) }}</span>
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
import {gameUserReoprtList} from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
import dateSet from '../../components/moudle/dateSet.vue'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    dateSet
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
        account: null,
        date:null,
      },

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
    numFix(num) {
      return num.toFixed(2);
    },
    getList() {
      this.listLoading = true;
      gameUserReoprtList(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        //console.log(this.tableData);
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.date = getFormtDate(this.$refs.datepick.value1, "yyyy-MM-dd");
      this.getList();
    },
    handleFilterClose(){
      this.listQuery.account = null;
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



