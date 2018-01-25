<template>	
<div class="white-bg pd-20 clearfix">
  <h1>资金变动</h1>
  <!--信息tab切换-->

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="充值" name="first">
      <el-table :data="tableData"  style="width: 100%">
        <el-table-column prop="date"  align="center" label="时  间">
			<template slot-scope="scope">
			  <span>{{fomatTime(scope.row.createdAt)}}</span>
			</template>
        </el-table-column>
        <el-table-column prop="change" align="center" label="资金变动">
	        <template slot-scope="scope">
	          <span>{{scope.row.amount/100}}</span>
	        </template>
        </el-table-column>
        <el-table-column prop="changebefore" align="center" label="变动前	">
	        <template slot-scope="scope">
	          <span>{{scope.row.oldValue/100}}</span>
	        </template>
        </el-table-column>
        <el-table-column prop="changeafter" align="center" label="变动后">
	        <template slot-scope="scope">
	          <span>{{scope.row.newValue/100}}</span>
	        </template>
        </el-table-column>
        <el-table-column prop="reason" align="center" label="原因">
	        <template slot-scope="scope">
	          <span>{{returnTypeName(scope.row.type)}}</span>
	        </template>
        </el-table-column>
      </el-table>
      <div class="pagination fr">
        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
        </el-pagination>
      </div>
    </el-tab-pane>

    <el-tab-pane label="提现" name="second">
      <el-table :data="tableData"  style="width: 100%">
        <el-table-column prop="date"  align="center" label="时  间">
          <template slot-scope="scope">
            <span>{{fomatTime(scope.row.createdAt)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="change" align="center" label="资金变动">
          <template slot-scope="scope">
            <span>{{scope.row.amount/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changebefore" align="center" label="变动前  ">
          <template slot-scope="scope">
            <span>{{scope.row.oldValue/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeafter" align="center" label="变动后">
          <template slot-scope="scope">
            <span>{{scope.row.newValue/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reason" align="center" label="原因">
          <template slot-scope="scope">
            <span>提现</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination fr">
        <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
        </el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="平台转入游戏" name="third">
            <el-table :data="tableData"  style="width: 100%">
              <el-table-column prop="date"  align="center" label="时  间">
            <template slot-scope="scope">
              <span>{{fomatTime(scope.row.createdAt)}}</span>
            </template>
              </el-table-column>
              <el-table-column prop="change" align="center" label="资金变动">
                <template slot-scope="scope">
                  <span>{{scope.row.amount/100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="changebefore" align="center" label="变动前  ">
                <template slot-scope="scope">
                  <span>{{scope.row.oldValue/100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="changeafter" align="center" label="变动后">
                <template slot-scope="scope">
                  <span>{{scope.row.newValue/100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="reason" align="center" label="原因">
                <template slot-scope="scope">
                  <span>转入游戏钱包({{scope.row.to}})</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination fr">
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
              </el-pagination>
            </div>
    </el-tab-pane>
    <el-tab-pane label="游戏转入平台" name="fourth">
      <el-table :data="tableData"  style="width: 100%">
          <el-table-column prop="date"  align="center" label="时  间">
            <template slot-scope="scope">
              <span>{{fomatTime(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="change" align="center" label="资金变动">
            <template slot-scope="scope">
              <span>{{scope.row.amount/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changebefore" align="center" label="变动前  ">
            <template slot-scope="scope">
              <span>{{scope.row.oldValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changeafter" align="center" label="变动后">
            <template slot-scope="scope">
              <span>{{scope.row.newValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reason" align="center" label="原因">
            <template slot-scope="scope">
              <span>转出游戏钱包({{scope.row.from}})</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination fr">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
          </el-pagination>
        </div>
    </el-tab-pane>
    <el-tab-pane label="返水" name="five">
        <el-table :data="tableData"  style="width: 100%">
          <el-table-column prop="date"  align="center" label="时  间">
        <template slot-scope="scope">
          <span>{{fomatTime(scope.row.createTime)}}</span>
        </template>
          </el-table-column>
          <el-table-column prop="change" align="center" label="资金变动">
            <template slot-scope="scope">
              <span>{{scope.row.amount/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changebefore" align="center" label="变动前  ">
            <template slot-scope="scope">
              <span>{{scope.row.oldValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changeafter" align="center" label="变动后">
            <template slot-scope="scope">
              <span>{{scope.row.newValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reason" align="center" label="原因">
            <template slot-scope="scope">
              <span>返水</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination fr">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
          </el-pagination>
        </div>
    </el-tab-pane>
    <el-tab-pane label="奖励" name="six">
      <el-table :data="tableData"  style="width: 100%">
          <el-table-column prop="date"  align="center" label="时  间">
            <template slot-scope="scope">
              <span>{{fomatTime(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="change" align="center" label="资金变动">
            <template slot-scope="scope">
              <span>{{scope.row.amount/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changebefore" align="center" label="变动前  ">
            <template slot-scope="scope">
              <span>{{scope.row.oldValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changeafter" align="center" label="变动后">
            <template slot-scope="scope">
              <span>{{scope.row.newValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reason" align="center" label="原因">
            <template slot-scope="scope">
              <span>奖励</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination fr">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
          </el-pagination>
        </div>
    </el-tab-pane>
    <el-tab-pane label="全部" name="seven">
      <el-table :data="tableData"  style="width: 100%">
          <el-table-column prop="date"  align="center" label="时  间">
            <template slot-scope="scope">
              <span>{{fomatTime(scope.row.createdAt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="change" align="center" label="资金变动">
            <template slot-scope="scope">
              <span>{{scope.row.amount/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changebefore" align="center" label="变动前  ">
            <template slot-scope="scope">
              <span>{{scope.row.oldValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="changeafter" align="center" label="变动后">
            <template slot-scope="scope">
              <span>{{scope.row.newValue/100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reason" align="center" label="原因">
            <template slot-scope="scope">
              <span>{{returnTypeName(scope.row.type,scope.row.from,scope.row.to)}}</span>
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
import {getUserStatement} from '../../service/getData'
import {getTimeDate,jsGetAge } from '../../config/mUtils'

  export default {
  	components: {

  	},
  	created(){
  		this.changeTableData();
  	},
  	computed:{  

  	},
    name: 'userMoney',
    data() {
      return {
      	total:null,
        activeName: 'first',
        dataType:0,
        tableData:null,
        listQuery: {
          pageNum: 1,
          limit: 10,
          userId:null,
          type:null
        }
    	}
    },
    props: {
      userid: {
        type: Number
      }
    },
    methods: {
    	fomatTime(time){
    	   return getTimeDate(time);
    	},
      returnChargeType(type){
        if(type == 'admin_charge'){
            return '客服充值';
        }else{
          return '充值';
        }
      },
      returnTypeName(type,from,to) {
        if(type == 'admin_charge'){
            return '管理员充值';
        }else if(type == 'charge'){
            return '充值';
        }else if(type == 'withdraw'){
            return '提现';
        }else if(type == 'transform_to_game'){
            return '转入游戏钱包('+to+')';
        }else if(type == 'transform_to_main'){
            return '转出游戏钱包('+from+')';
        }else if(type == 'backwater'){
            return '返水';
        }else if(type == 'reward'){
            return '奖励（推荐用户充值等）';
        }else if(type == 'manual_increase'){
            return '客服手动增加金额';
        }else if(type == 'manual_reduction'){
            return '客服手动减少金额';
        }else if(type == 'transfer_failed'){
            return '提现失败';
        }else if(type == 'reject'){
          return '拒绝提现';
        }
      },
    	changeTableData(){
        let ary = [];
    		if(this.dataType == 0){
         ary = ['admin_charge','charge'];
    		}else if(this.dataType == 1){
    			ary = ['withdraw'];
    		}else if(this.dataType == 2){
          ary = ['transform_to_game'];
        }else if(this.dataType == 3){
          ary = ['transform_to_main'];
        }else if(this.dataType == 4){
          ary = ['backwater'];
        }else if(this.dataType == 5){
          ary = ['reward'];
        }
        this.listQuery.type = JSON.stringify(ary);
        this.getUserStatementData();
    	},
    	getUserStatementData() {
    		this.listLoading = true;
        this.listQuery.userId = this.userid;
    		getUserStatement(this.listQuery).then((res) => {
    		    this.tableData = res.data.list;
    		    this.total = res.data.total;
    		    this.listLoading = false;
    		});
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
