<template>
    <section class="wrapper">
        <!--头部三个模块-->
        <div class="row preferential_box littlethree">
              <div class="col-lg-4 mbot20">
                    <div class="white-bg borderbox topthree clearfix">
                        <div class="iconmakemoney prefere fl"></div>
                        <div class="fl fsset ml30">
                            <p class="f25 f-black">等待请求</p>
                        </div>
                        <h2 class="fr font-blue">{{ countStatus.waitSum }}</h2>
                    </div>
              </div>
              <div class="col-lg-4 mbot20">
                  <div class="white-bg borderbox topthree clearfix">
                    <div class="iconmakemoney prefere icon2 fl"></div>
                        <div class="fl fsset ml30">
                          <p class="f25 f-black">已同意请求</p>
                        </div>
                        <h2 class="fr font-green">{{ countStatus.agreeSum }}</h2>
                  </div>
              </div>
              <div class="col-lg-4 mbot20 ">
                  <div class=" white-bg borderbox topthree clearfix">
                    <div class="iconmakemoney prefere icon3 fl"></div>
                      <div class="fl fsset ml30">
                        <p class="f25 f-black">已拒绝请求</p>
                      </div>
                      <h2 class="fr font-orange">{{ countStatus.refuseSum }}</h2>
                  </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20 no-border">
                      <div class="inline"><h1 class="f-black inline mr20">优惠申请</h1></div>

                  </div>
                  <div class="clearfix white-bg pd-20 ruleInvit">
                      <div class="js_box fl">
                        <label class="ml10">状态:</label>
                        <el-select v-model="status"  @change="handleFilter" placeholder="请选择">
                          <el-option label="全部"value=""></el-option>
                          <el-option  label="等待" value="0"></el-option>
                          <el-option  label="同意" value="1"></el-option>
                          <el-option  label="拒绝" value="2"></el-option>
                          <el-option  label="完成" value="3"></el-option>
                        </el-select>
                        <label class="ml10">活动名称:</label>
                        <el-select v-model="activityId"  @change="handleFilter" placeholder="请选择">
                          <el-option label="全部"value=""></el-option>
                          <el-option
                            v-for="item in activity"
                            :key="item.id"
                            :label="item.actName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                        <div style="display:inline-block">
                        <label class="ml10">时间范围：</label>
                        <list-time-area ref="datepick" @timeValue="handleFilter" style="width: 300px !important;"></list-time-area>
                        </div>
                    </div>
                    <div class="inline fr search-box search-box2">
                          <input type="text" placeholder="用户名/活动名称"  v-model="listQuery.searchText" style="min-width:200px !important;font-size: 10px;width:200px !important">
                          <div  class="inline"   v-if="listQuery.searchText==null">
                          <i class="el-icon-search" style="font-size:12px;"></i>
                          </div>
                          <div  class="inline" v-else  @click="handleFilterClose">
                          <i class="el-icon-close" style="font-size:12px;"></i>
                          </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                    </div>
<!--                     <div class="usl-select-tj clearfix">

                        <ul class="fr markets-edit-table">

                            <li>
                              <a><i class="icon-ban-circle"></i><span>拒绝验证</span></a>
                            </li>
                            <li>
                              <a><i class=" icon-check"></i><span>同意审核</span></a>
                            </li>
                            <li>
                              <a><i class=" icon-remove-sign"></i><span>拒绝审核</span></a>
                            </li>
                        </ul>
                    </div> -->

                  </div>
                <div class="pad20 white-bg margin0 clearfix">
                    <div class="table_container">
                    <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark" ref="multipleTable">

                          <el-table-column label="用户名">
                            <template slot-scope="scope">
                              <span>{{ scope.row.playerName }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column  label="活动名称" >
                            <template slot-scope="scope">
                              <span>{{ scope.row.ruleName }} </span>
                            </template>
                          </el-table-column>
                          <el-table-column label="存款">
                            <template slot-scope="scope">
                              <span>{{ scope.row.rechargeSum/100 }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="申请加入时间" width="180">
                            <template slot-scope="scope">
                              <span>{{ scope.row.joinTime }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="处理时间" width="180">
                            <template slot-scope="scope">
                              <span>{{ scope.row.processTime }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="奖金发放金额">
                            <template slot-scope="scope">
                              <span>{{ scope.row.bonusSum/100 }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="审核状态">
                            <template slot-scope="scope">
                              <span>{{ FormtStatus(scope.row.status) }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="200px;">
                            <template slot-scope="scope" v-if="scope.row.status!=1&&scope.row.status!=2">
                                <el-button size="small" @click="open2(scope.row)">同意</el-button>
                                <el-button size="small" @click="open3(scope.row)">拒绝</el-button>
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
import {getGavApply,marketActivityQuery,updateGavApply,gavApplyCountStatus} from '../../service/getData'
import tablebar from '../../components/tablebar/tablebar.vue'
import selectbar from '../../components/selectbar/selectbar.vue'
import listTimeArea from '../../components/moudle/listTimeArea.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
export default {
  components: {
    tablebar,
    selectbar,
    listTimeArea,
  },
  mounted () {
      this.getList();
      this.getActivityList();
      this.getCountStatus();
  },
  data() {
    return {
      inputVisible: false,
      activityId:null,
      countStatus:null,
      multiple:null,
      inputValue: '',
      tableData:null,
      activity:null,
      status:null,
      listQuery:{
        status:null,
        pageNum:1,
        limit:10,
        dealBeginTime:null,
        dealEndTime:null,
        searchText:null,
        activityId:null,
      },
    };
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    FormtStatus(status) {
      if(status == 0){
        return "等待";
      }else if(status == 1){
        return "同意";
      }else if(status == 2){
        return "拒绝";
      }else if(status == 3){
        return "完成";
      }
    },
      getActivityList() {
        let query = {};
        query.limit = 100;
        query.pageNum = 1;
        marketActivityQuery(query).then((res) => {
            this.activity = res.data.list;
        });

      },
      getList() {
        this.listQuery.status = parseInt(this.status);
        this.listQuery.activityId = parseInt(this.activityId);
        getGavApply(this.listQuery).then((res) => {
            this.tableData = res.data.list;
            this.total = res.data.total;
        });

      },
      getCountStatus() {

        gavApplyCountStatus().then((res) => {
            this.countStatus = res.data;
        });

      },
      handleFilter() {
        this.listQuery.dealBeginTime = getFormtDate(this.$refs.datepick.value4[0]);
        this.listQuery.dealEndTime = getFormtDate(this.$refs.datepick.value4[1]);
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
      open2(row) {
         this.$confirm('确定通过审核？', '通过审核', {
           confirmButtonText: '确定',
           cancelButtonText: '取消'
         }).then(() => {
            let query = {};
            query.id = row.id;
            query.status = 1;
            updateGavApply(query).then((res) =>{
                if(res.status){
                    this.handleFilter();
                    this.$message({
                      type: 'success',
                      message: '通过审核!'
                    });
                }else{
                  this.$message({
                    type: 'info',
                    message:res.message
                  });
                }
            });
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '取消操作'
           });
         });
      },
      open3(row) {
         this.$confirm('确定拒绝审核', '拒绝审核', {
           confirmButtonText: '确定',
           cancelButtonText: '取消'
         }).then(() => {
            let query = {};
            query.id = row.id;
            query.status = 2;
            updateGavApply(query).then((res) =>{
                if(res.status){
                    this.handleFilter();
                    this.$message({
                      type: 'success',
                      message: '拒绝审核!'
                    });
                }else{
                  this.$message({
                    type: 'info',
                    message:res.message
                  });
                }
            });
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '取消操作'
           });
         });
      },
    }
}


</script>
<style>

  .ruleInvit .usl-select-tj li{

    margin-right: 0px;
    margin-left: 10px;
  }
  .ruleInvit .usl-select-tj{

    padding-top:20px;
  }

</style>


