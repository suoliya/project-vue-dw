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
                      <div class="inline"><h1 class="f-black inline mr20" style="margin-top: 5px;">年度报表</h1></div>
                      <!--搜索-->
                  </div>
                <!--列表-->
                <div class="pad20 white-bg margin0 clearfix pdtop-0">
                  <div class="table_container">
                  <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="时间" width="70">
                        <template slot-scope="scope">
                          <span>{{scope.row.year}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号总数" width="90">
                      <template slot-scope="scope">
                        <span>{{ scope.row.accountTotal }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="新增账号" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.accountYear }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="充值金额" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.recharge/100 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="提现金额" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.cash/100 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="转入游戏" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.gameRecharge/100 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="转出游戏" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.gameCash/100 }}</span>
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
import {yearReoprtList} from '../../service/getData'
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
      yearReoprtList(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        //console.log(this.tableData);
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.date = getFormtDate(this.$refs.datepick.value1);
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



