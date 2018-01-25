<template>
  <section class="wrapper">
    <!--财务管理-->
    <div class="row">
      <div class="col-lg-12 getheight">
        <div class="usl-top-box white-bg pd-20 no-border">
          <div class="inline"><h1 class="f-black inline mr20">日志列表</h1></div>

        </div>
        <div class="usl-select-tj  white-bg pd-20 pbom10 ptop0 clearfix">

          <!--查询条件-->
          <span class="inline-block mr20 fl line35">选择用户：</span>
          <el-select v-model="listQuery.operatorId" placeholder="请选择"  @change="handleFilter" class="fl height33 mr20 radius0">
          <el-option  label="全部"></el-option>
            <el-option
              v-for="item in adminlist"
              :key="item.id"
              :label="item.userName"
              :value="item.id">
            </el-option>
          </el-select>

          <!--时间选择-->
          <span class="inline-block fl line35">时间范围：</span>
          <list-time-area ref="datepick" @timeValue="handleFilter" class="fl height33 mr20 radius0" style="width:300px;"></list-time-area>


          <!--搜索-->
          <div class="inline fr search-box">
            <input type="text" placeholder="用户名/账号/日志描述" v-model="listQuery.searchText">
            <div  class="inline"  v-if="listQuery.searchText==null">
            <i class="el-icon-search" style="font-size:12px;"></i>
            </div>
            <div  class="inline" @click="handleFilterClose" v-else>
            <i class="el-icon-close" style="font-size:12px;"></i>
            </div>
            <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
          </div>
        </div>
        <!--列表-->
        <div class="pad20 white-bg margin0 clearfix">
          <div class="table_container">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column align="center" label="操作时间" >
                  <template slot-scope="scope">
                    <span>{{FormtDate(scope.row.createdAt)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="IP">
                  <template slot-scope="scope">
                    <span>{{scope.row.ip}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="用户名">
                  <template slot-scope="scope">
                    <span>{{scope.row.userName }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="账号">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="日志描述">
                  <template slot-scope="scope">
                    <span>{{scope.row.description}}</span>
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
import { ServiceAdminList,getUserLogs} from '../../service/getData'
import tablebar from '../../components/tablebar/tablebar.vue'
import selectbar from '../../components/selectbar/selectbar.vue'
import Pagination from '../../components/Pagination/pagination.vue'
import listTimeArea from '../../components/moudle/listTimeArea.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    tablebar,
    selectbar,
    listTimeArea
  },
  mounted () {
  },
  created(){
    this.getList();
    this.adminlistAll();
  },
  data() {
    return {
      adminlist:null,
      total:null,
      inputVisible: false,
      inputValue: '',
      dialogFormVisible: false,
      listLoading: true,
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        operatorId: null,
        start: null,
        end: null,
        searchText: null,
      }
    }
  },
  computed: {
    ...mapState([
      'adminName','adminId'
      ])
  },
  methods: {
    setheight(){
       var height = $(".getheight").height();
       $(".tagbox").height(height);
    },
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    FormtStatus: function (status) {
        let statusName = null;
        if(status == 'pending'){
          statusName = '提现申请中';
        }else if(status == 'transferring'){
          statusName = '申请中';
        }else if(status == 'reject'){
          statusName = '申请不通过';
        }else if(status == 'transfer_failed'){
          statusName = '打款失败';
        }else if(status == 'transfer_success'){
          statusName = '打款成功';
        }
        return statusName;
    },
    getList() {
      this.listLoading = true;
      getUserLogs(this.listQuery).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      });

    },
    adminlistAll() {
        let query = {pageNum:1,limit:100};
        ServiceAdminList(query).then((res) => {
            this.adminlist = res.data.list;
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




