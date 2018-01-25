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
    line-height: 2;
  }
  @media screen and (min-width: 1600px) {
      .newuserbox .userlistthree{
          padding-right:0;
          padding-left:0;
      }
  }
</style>
<template>
    <section class="wrapper newuserbox">
        <!--头部三个模块-->
        <div class="row userlistthree ordersearch">
              <div class="col-lg-3 mbot20">
                    <div class="white-bg borderbox topthree ">
                        <p class="red-color title">今日游戏总金额</p>
                        <!-- <p class="datep p2">{{ nowDay }}</p> -->
                        <p class="red-color p3">投注总额：{{totalCount.allBen==null?totalCount.allBen:totalCount.allBen.toFixed(2)}}</p>
                        <p class="red-color p3">总赢：{{totalCount.allWin ==null?totalCount.allWin:totalCount.allWin.toFixed(2)}}</p>
                    </div>
              </div>
              <div class="col-lg-3 mbot20">
                  <div class="white-bg borderbox topthree">
                      <p class="green-color title">今日MG总金额</p>
                      <p class="red-color p3">MG投注额：{{totalCount.mgBen==null?totalCount.mgBen:totalCount.mgBen.toFixed(2)}}</p>
                      <p class="red-color p3">MG总赢：{{totalCount.mgWin==null?totalCount.mgWin:totalCount.mgWin.toFixed(2)}}</p>
                  </div>
              </div>
              <div class="col-lg-3 mbot20">
                  <div class=" white-bg borderbox topthree">
                      <p class="red-color title">今日PT总金额</p>
                      <p class="red-color p3">PT投注额：{{totalCount.ptBen==null?totalCount.ptBen:totalCount.ptBen.toFixed(2)}}</p>
                      <p class="red-color p3">PT总赢：{{totalCount.ptWin==null?totalCount.ptWin:totalCount.ptWin.toFixed(2)}}</p>
                  </div>
              </div>
              <div class="col-lg-3 mbot20">
                  <div class=" white-bg borderbox topthree">
                    <p class="gray-color title">今日NT总金额</p>
                    <p class="red-color p3">NT投注额：{{totalCount.ntBen==null?totalCount.ntBen:totalCount.ntBen.toFixed(2)}}</p>
                    <p class="red-color p3">NT总赢：{{totalCount.ntWin==null?totalCount.ntWin:totalCount.ntWin.toFixed(2)}}</p>
                  </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <div class="row margin-10">
          <div class="col-lg-12 getheight userlist_search" >
              <div class="usl-top-box white-bg pd-20" style="min-height:200px;">
                  <div class="clearfix">
                  <h1 class="f-black" style="margin-bottom:10px;margin-left:6px;">游戏搜索</h1>
                  <div class="js_box fl">
                    <div style="display:inline-block">
                        <label class="ml10">用户账号：</label>
                        <el-input v-model="listQuery.playerName" style="width:150px"></el-input>
                    </div>
                  </div>
                  <div class="js_box fl">
                    <div>
                        <label class="ml10">游戏名称：</label>
                        <el-input v-model="listQuery.gameName" style="width:150px"></el-input>
                    </div>
                  </div>
                  <div class="js_box fl">
                    <div>
                        <label class="ml10">游戏代码：</label>
                        <el-input v-model="listQuery.gameCode" style="width:150px"></el-input>
                    </div>
                  </div>
                  <div class="js_box fl">
                    <div>
                        <label class="ml10">平台：</label>
                        <el-select placeholder="" v-model="listQuery.platform" style="width:150px;">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="PT" value="PT"></el-option>
                            <el-option label="NT" value="NT"></el-option>
                            <el-option label="MG" value="MG"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="js_box fl" style="float:right;">
                    <div>
                        <el-button style="width:150px;" type="primary" @click="handleFilter()">搜索</el-button>
                    </div>
                  </div>
                  <br>
                  <div class="js_box order_time" style="margin-top:50px;">
                      <div>
                          <label class="ml10 fl" style="line-height:36px;">开始结束时间：</label>
                          <list-time-area class="time_search" ref="datepick" style="width:350px;margin-left:10px;"></list-time-area>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <!--用户列表-->
        <div class="pad20 margin0 white-bg clearfix" v-if="tableData!=null">
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
import {queryGamesList,queryGamesTotal} from '../../service/getData'
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

  },
  data() {
    return {
      listQuery:{
        playerName:'',
        gameName:'',
        gameCode:'',
        platform:'',
        start:null,
        end:null,
        pageNum: 1,
        limit: 10,
      },
      total: null,
      listLoading: true,
      tableData: null,
      totalCount:{},

    };
  },
  computed: {
     nowDay() {
        let nowdate = new Date();
        return getFormtDate(nowdate, "yyyy-MM-dd");
     }
  },
  mounted(){
      this.$nextTick(()=>{
          this.getqueryGamesTotal();
          this.getList();
      })
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    getqueryGamesTotal(){
      queryGamesTotal().then((res) => {
        this.totalCount = res.data;
      });
    },
    getList() {
        this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
        this.listQuery.endTime = getFormtDate(this.$refs.datepick.value4[1]);
        this.listLoading = true;
        queryGamesList(this.listQuery).then((res) => {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.listLoading = false;
        });
    },
    handleFilter() {
      this.getList();
    },
    // handleFilterClose(){
    //   this.listQuery.searchText = null;
    //   this.getList();
    // },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    // selectOrderList(){
    //   this.dialogFormVisible = false;
    //   this.listQuery.start = getFormtDate(this.$refs.datepick.value4[0]);
    //   this.listQuery.end = getFormtDate(this.$refs.datepick.value4[1]);
    //   this.listQuery.pageNum = 1;
    //   getOrderList(this.listQuery).then((res) => {
    //       if(res.status){
    //         this.tableData = res.data.list;
    //         this.total = res.data.total;
    //           this.$message({
    //             type: 'success',
    //             message: '操作成功!'
    //           });
    //           console.log(res);
    //       }else{
    //         this.$message({
    //           type: 'info',
    //           message:res.message
    //         });
    //       }
    //   });
    //
    // }

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
</style>
