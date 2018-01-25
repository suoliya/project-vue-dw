<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
            <el-row>
            <el-col :span="8">
                <h3 class="heaTitle">代理月度收入</h3>
            </el-col>
            <el-col :span="16" >
             <el-form :inline="true" >
                <el-form-item >
                  <div class="block">
                    <el-date-picker
                      v-model="incomeList.month"
                      type="month"
                      placeholder="请选择月份"
                      value-format="yyyy-MM">
                    </el-date-picker>
                  </div>
                </el-form-item>
                <!-- <el-form-item>
                  <el-input v-model="incomeList.searchText"  placeholder="代理用户名/姓名" style="width:220px;margin-right:10px;"></el-input>
                </el-form-item>
                <el-form-item>
                 <el-button @click="searchBtn" type="primary" style="color:#797979;" icon="search">搜索</el-button>
                </el-form-item> -->
                <div class="inline fr search-box search-box2" style="margin-top:2px;">
                     <input type="text" placeholder="代理用户名/姓名"  v-model="incomeList.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                     <div  class="inline"   v-if="incomeList.searchText==null">
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
                  width="">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="真实姓名"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="monthStatistic.customerNumber"
                  label="活跃玩家数量"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.monthStatistic==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="monthStatistic.totalBets"
                  label="投注金额"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.monthStatistic==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="monthStatistic.amount"
                  label="充值金额"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.monthStatistic==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="monthStatistic.commission"
                  label="代理佣金"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.monthStatistic==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="monthStatistic.subAgentCommission"
                  label="子代理佣金"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.monthStatistic==null">
                      0
                  </template>
                </el-table-column>
                <el-table-column
                  prop="monthStatistic.totalCommission"
                  label="总佣金"
                  width="">
                  <template slot-scope="scope" v-if="scope.row.monthStatistic==null">
                      0
                  </template>
                </el-table-column>
               <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    >删除</el-button>
                </template>
              </el-table-column> -->
              </el-table>
            </div>

            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="incomeList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="incomeList.limit"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import {income} from '../../service/getData'
export default {
    data() {
        return {
            tableData:[],
            total:null,
            incomeList:{
                limit:10,
                pageNum:1,
                month:"2017-09",
                searchText:null,
            },
        }
    },
    mounted(){
        this.list();
    },
    methods: {
        list () {
            income(this.incomeList).then((res) => {
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
            this.incomeList.limit = val;
            this.list();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.incomeList.pageNum = val;
            this.list();
            console.log(`当前页: ${val}`);
        },
        searchBtn(){
            console.log(this.incomeList.searchText);
            this.list();
        },
        handleFilterClose(){
          this.incomeList.searchText = null;
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
    margin-top:10px;
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
