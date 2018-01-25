<template>	
<div class="white-bg pd-20 clearfix ">
    <h1>帐号与活动日志</h1>
    <!--帐号与活动日志tab-->
    <el-tabs v-model="activeName5" @tab-click="handleClick">
      <el-tab-pane label="活动历史" name="first">
        <el-table :data="tableData" stripe style="width: 100%">

            <el-table-column align="center" label="活动类型">
              <template slot-scope="scope">
                <span>{{returnFavStyle(scope.row.favStyle)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="类型">
              <template slot-scope="scope">
                <span>{{scope.row.actName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="参加时间">
              <template slot-scope="scope">
                <span>{{scope.row.joinTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="充值金额">
              <template slot-scope="scope">
                <span>{{returnAmount(scope.row.rechargeSum)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="奖励金额">
              <template slot-scope="scope">
                <span>{{returnAmount(scope.row.bonusSum)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="取款条件">
              <template slot-scope="scope">
                <span>{{scope.row.withdrawalsRequire}}</span>
              </template>
            </el-table-column>
        </el-table>
        <div class="pagination fr">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="重复账号" name="second">
        <el-table :data="tableData" stripe style="width: 100%">

       <el-table-column align="center" label="用户id">
               <template slot-scope="scope">
                 <span>{{scope.row.userId}}</span>
               </template>
             </el-table-column>
             <el-table-column align="center" label="用户名">
               <template slot-scope="scope">
                 <span>{{scope.row.userName}}</span>
               </template>
             </el-table-column>
             <el-table-column align="center" label="重复列名">
               <template slot-scope="scope">
                 <span>{{returnColName(scope.row.columnName)}}</span>
               </template>
             </el-table-column>
             <el-table-column align="center" label="重复列值">
               <template slot-scope="scope">
                 <span>{{scope.row.columnValue}}</span>
               </template>
             </el-table-column>
         </el-table>
         <div class="pagination fr">
           <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
           </el-pagination>
         </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getUserActivity,getUserRepeated} from '../../service/getData'
import {getTimeDate,jsGetAge } from '../../config/mUtils'

  export default {

    created(){
      this.changeTableData();
    },
    computed:{  

    },
    name: 'userLog',
    data() {
      return {

        total:null,
        activeName5: 'first',
        dataType:0,
        tableData:null,
        statusList:null,
        listQuery: {
          pageNum: 1,
          limit: 10,
          userId:null
        },
      }
    },
    props: {
      userid: {
        type: Number
      }
    },
    methods: {
      returnColName(name){
        if(name == 'phone'){
          return '电话';
        }else if(name == 'email'){
          return '邮箱';
        }else if(name == 'user_ip'){
          return '用户ip';
        }
      },
      returnAmount(s) {
          if(s==null){
              return '';
          }else{
            return (s/100).toFixed(2);
          }
      },
      FormtDate(time){
         return getTimeDate(time);
      },
      returnFavStyle(s) {
        if(s==1){
          return '存款优惠';
        }else{
          return '非存款优惠';
        }
      },
      changeTableData(){
        let mainFun = null;
        let query = null;

        if(this.dataType == 0){
          this.listQuery.userId = this.userid;
          query = this.listQuery;
          getUserActivity(query).then((res) => {
              this.tableData = res.data.list;
              this.total = res.data.total;
          });
        }else if(this.dataType == 1){
          getUserRepeated(this.userid).then((res) => {
              this.tableData = res.data;
              this.total = res.data.total;
          });
        }

      },

      handleClick(tab, event) {
        this.dataType = tab.index;
        this.changeTableData();
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