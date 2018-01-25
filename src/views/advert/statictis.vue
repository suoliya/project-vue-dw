<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
          <el-row>
            <el-col :span="8">
                <h3 class="heaTitle">代理统计</h3>
            </el-col>
            <el-col :span="16" >
             <el-form :inline="true">
                <!-- <el-form-item>
                  <el-input  placeholder="代理用户名/姓名" style="width:220px;margin-right:10px;" v-model="statisList.searchText"></el-input>
                </el-form-item>
                <el-form-item>
                 <el-button type="primary" style="color:#797979;" icon="search" @click="searchBtn">搜索</el-button>
                </el-form-item> -->
                <div class="inline fr search-box search-box2">
                    <input type="text" placeholder="代理用户名/姓名"  v-model="statisList.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                    <div  class="inline"   v-if="statisList.searchText==null">
                        <i class="el-icon-search" style="font-size:12px;"></i>
                    </div>
                    <div  class="inline" v-else @click="handleFilterClose">
                        <i class="el-icon-close" style="font-size:12px;"></i>
                    </div>
                    <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="searchBtn">搜索</div>
                </div>
            </el-form>
            </el-col>
          </el-row>
            <div class="table_container">
                <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="account"
                  label="代理用户名"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="真实姓名"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="subAgentNumber"
                  label="子代理"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.subAgentNumber==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userNumber"
                  label="玩家数量"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.userNumber==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalBets"
                  label="总投注"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.totalBets==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalWin"
                  label="总赢"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.totalWin==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalTransport"
                  label="总输"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.totalTransport==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalRestore"
                  label="总返水"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.totalRestore==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalDeposit"
                  label="总存款"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.totalDeposit==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalWithdrawal"
                  label="总取款"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.totalWithdrawal==null">
                      0
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="statisList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="statisList.limit"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import {statistic} from '../../service/getData'
export default {
    data() {
        return {
            tableData:[],
            total:null,
            statisList:{
                limit:10,
                pageNum:1,
                searchText:null,
            },
        }
    },
    mounted () {
        this.list();
    },
    methods: {
        list () {
            statistic(this.statisList).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(this.total);
                console.log(res.data)
            })
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        handleSizeChange(val) {
            this.statisList.limit = val;
            this.list();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.statisList.pageNum = val;
            this.list();
            console.log(`当前页: ${val}`);
        },
        searchBtn(){
            console.log(this.statisList.searchText);
            this.list();
        },
        handleFilterClose(){
          this.statisList.searchText = null;
          this.list();
        },

    }

}

</script>

<style scoped>
.content{
    padding:0 47px;
    padding-top: 43px;
    background-color: #fff;
    padding-top: 0px !important;
}
.heaTitle{
    color: #333;
    margin-bottom:0px;
    font-size: 20px;
}
.el-row{
   margin-bottom:0px;
   /*height:70px;*/
   /*border-bottom: 1px solid #f1f2f7;*/
}
.el-col-16{
  text-align: right;
  padding-top:20px;
}

.table_container{
    margin-top:20px;
}
.el-table__header-wrapper table thead tr th{
  background-color:red;
}
thead{
  background:red;
}
.el-table th.is-leaf{
  background:#fff;
}
.el-table th{
  background-color:red;
}
.el-table th>.cell{
  background:#fff;
}
.pagination{
    width:100%;
    text-align:right;
    padding-right:0;
}
.el-pager li.active{
  background-color:red;
}
.input{
    width: 300px;
    height: 32px;
}
.el-button--primary{
   background-color: #dcdcdc;
   border: 1px solid #999;
}
</style>
