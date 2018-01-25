<style scoped>

  .search-box2 input{
    min-width:280px !important;
  }

  .borderb{
    margin-bottom: 15px;
    overflow: hidden;
  }

  .userlistthree .topthree{
    height: 120px;
  }
</style>
<template>
    <section class="wrapper newuserbox">
        <!--图表内容-->
        <div class="margin0 white-bg clearfix" style="margin-left:5px;margin-right:5px;">
          <div class="col-lg-12 getheight userlist_search" >
              <div class="usl-top-box white-bg pd-20" style="margin-left:-10px;">
                  <div class="inline" style="width:100%;">
                    <h1 class="f-black inline mr20" style="margin-top: 5px;">PT游戏</h1><span class="f25">PT Game</span>
                  </div>
                  <div class="clearfix" style="margin-top:20px;">
                      <div class="js_box fl order_time">
                          <div>
                              <label class="ml10 fl" style="line-height:36px;">游戏开始结束时间：</label>
                              <list-time-area class="time_search" ref="datepick" style="width:350px;margin-left:10px;"></list-time-area>
                          </div>
                      </div>
                      <div class="inline fr search-box search-box2">
                          <input type="text" placeholder="游戏名称/游戏代码/账号
                          " v-model="listQuery.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                          <div  class="inline"   v-if="listQuery.searchText==null">
                              <i class="el-icon-search" style="font-size:12px;"></i>
                          </div>
                          <div  class="inline" v-else @click="handleFilterClose">
                              <i class="el-icon-close" style="font-size:12px;"></i>
                          </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="searchBtn">搜索</div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <!--用户列表-->
        <div class="pad20 margin0 white-bg clearfix" style="margin-left:5px;margin-right:5px;padding-top:0;">
            <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable">
              <el-table-column label="游戏代码" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.gameCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="平台">
                <template slot-scope="scope">
                  <span>{{ scope.row.platform }}</span>
                </template>
              </el-table-column>
              <el-table-column label="游戏名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.gameName}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="账号" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.playerName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="投注金额" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.bet }}</span>
                </template>
              </el-table-column>
              <el-table-column label="结果" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.win }}</span>
                </template>
              </el-table-column>
              <el-table-column label="钱包余额" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.balance }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" width="">
                <template slot-scope="scope">
                  <span>{{ FormtDate(scope.row.gameDate) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination fr">
              <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"  :page-sizes="[10, 20, 30,40]" layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
              </el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import {queryGamesList} from '../../service/getData'
import selectbar from '../../components/selectbar/selectbar.vue'
import datepickerbar from '../../components/moudle/datepickerbar.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
import listTimeArea from '../../components/moudle/listTimeArea.vue'

export default {
  components: {
    selectbar,
    datepickerbar,
    listTimeArea
  },
  created(){
      this.getList();
  },
  data() {
    return {
      listQuery:{
        // playerName:'',
        // gameName:'',
        // gameCode:'',
        platform:'PT',
        start:null,
        end:null,
        pageNum: 1,
        limit: 10,
        searchText:null,
      },
      total: null,
      listLoading: true,
      tableData: [],

    };
  },
  computed: {
     nowDay() {
        let nowdate = new Date();
        return getFormtDate(nowdate, "yyyy-MM-dd");
     }
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    getList() {
        this.listLoading = true;
        queryGamesList(this.listQuery).then((res) => {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.listLoading = false;
        });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    searchBtn(){
        console.log(this.listQuery.searchText);
        this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
        this.listQuery.endTime = getFormtDate(this.$refs.datepick.value4[1]);
        this.getList();
    },
    handleFilterClose(){
      this.listQuery.searchText = null;
      this.getList();
    },

  }

}
</script>
<style scoped>

.col-md-1-5 {

width: 20%;

float: left;

}

.col-xs-1-5,.col-sm-1-5,.col-md-1-5,.col-lg-1-5 {

min-height: 1px;

padding-left: 10px;

padding-right: 0px;

position: relative;

}
@media (min-width: 768px) {

.col-sm-1-5 {

width: 20%;

float: left;

}

}

@media (min-width: 992px) {

.col-md-1-5 {

width: 20%;

float: left;

}

}

@media (min-width: 1200px) {

.col-lg-1-5 {

width: 20%;

float: left;

}

}

.order_id{
  margin-right: 10px;
}
.ordersearch .topthree{
  padding-top: 10px;

}
.ordersearch p{
  margin-bottom: 5px;

}
.ordersearch .title{
  font-size: 14px;

}
.margin-10{
    /*margin-bottom: 0 !important;*/
}
</style>
