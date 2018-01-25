<template>
    <div class="white-bg pd-20 clearfix tbnoscroll">
      <h1>游戏信息</h1>

      <!--游戏信息tab-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;text-align: center;" >
        <el-table-column label="游戏供应商" >
          <template slot-scope="scope">
            <span>{{returnName(scope.row.platform)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="游戏账号">
         <template slot-scope="scope">
           <span>{{scope.row.gameAccount}}</span>
         </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>正常</span>
          </template>        
        </el-table-column>
        
        <el-table-column label="投注数">
          <el-table-column label="统（数量）">
            <template slot-scope="scope">
              <span>{{scope.row.betCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="平均">
            <template slot-scope="scope">
              <span>{{returnAmount(scope.row.betAverage/100)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数额">
             <template slot-scope="scope">
               <span>{{returnAmount(scope.row.betTotal/100)}}</span>
             </template>
          </el-table-column>
        </el-table-column>

        <!--赢的数值-->
        <el-table-column label="赢">
            <el-table-column label="统（数量）">
              <template slot-scope="scope">
                <span>{{scope.row.winCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="平均">
              <template slot-scope="scope">
               <span>{{returnAmount(scope.row.winAverage/100)}}</span>
             </template>
            </el-table-column>
            <el-table-column label="数额">
              <template slot-scope="scope">
                <span>{{returnAmount(scope.row.winTotal/100)}}</span>
              </template>
            </el-table-column>
          </el-table-column>

        <!--输的数值-->
        <el-table-column label="输">
          <el-table-column label="统（数量）">
            <template slot-scope="scope">
              <span>{{scope.row.loseCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="平均">
            <template slot-scope="scope">
              <span>{{returnAmount(scope.row.loseAverage/100)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数额">
           <template slot-scope="scope">
             <span>{{returnAmount(scope.row.loseTotal/100)}}</span>
           </template>
          </el-table-column>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import {getStatistics} from '../../service/getData'
import {getTimeDate,jsGetAge } from '../../config/mUtils'

  export default {

    created(){
      this.getList();
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
      }
    },
    props: {
      userid: {
        type: Number
      }
    },
    methods: {
      returnName(name){
        if(name=='ALL'){
            return '总计';
        }else{
          return name;
        }
      },
      returnAmount(s) {
          if(s==null){
              return 0;
          }else{
            return s.toFixed(2);
          }
      },
      FormtDate(time){
         return getTimeDate(time);
      },
      getList(){
        getStatistics(this.userid).then((res) => {
            this.tableData = res.data;
        });
      },
    }
  }
</script>

<style>
.tbnoscroll .el-table__body-wrapper{
  overflow-x:hidden;
}
</style>