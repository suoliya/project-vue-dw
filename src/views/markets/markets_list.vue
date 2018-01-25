<template>
    <section class="wrapper">
        <!--头部三个模块-->
        <div class="row littlethree">

              <div class="col-lg-6 mbot20">
                  <div class="white-bg borderbox topthree clearfix">
                    <div class="iconmakemoney icon2 fl"></div>
                        <div class="fl fsset ml30">
                          <p class="f25 f-black">好友推荐奖金设置</p>
                          <p class="gray-color">设置好友推荐奖金</p>
                        </div>
                        <router-link class="usl-detail gray-bg white-font fr usl-detail2" target = _blank :to="{path:'/markets/recommend_set'}">设置</router-link>
                  </div>
              </div>
              <div class="col-lg-6 mbot20">
                  <div class=" white-bg borderbox topthree clearfix">
                    <div class="iconmakemoney icon3 fl"></div>
                      <div class="fl fsset ml30">
                        <p class="f25 f-black">优惠规则设置</p>
                        <p class="gray-color bjbw">新增</p>
                      </div>
                      <router-link class="usl-detail gray-bg white-font fr usl-detail2" target = _blank :to="{path:'/markets/addrule'}">设置</router-link>
                  </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20 no-border">
                      <div class="inline"><h1 class="f-black inline mr20">活动列表</h1></div>

                  </div>
                  <div class="usl-select-tj  white-bg pd-20 pbom10 ptop0 clearfix">
                  <el-select v-model="favStyle" @change="handleFilter" class="fl height33 mr20 radius0" placeholder="请选择">
                      <el-option  label="全部" value=""></el-option>
                      <el-option  label="存款优惠" value="1"></el-option>
                      <el-option  label="非存款优惠" value="2"></el-option>
                      </el-select>
                      <div class="inline fl search-box">
                        <input type="text" placeholder="请输入你要搜索的活动名称" v-model="listQuery.ruleName">
                           <div  class="inline"  v-if="listQuery.ruleName==null">
                           <i class="el-icon-search" style="font-size:12px;"></i>
                           </div>
                           <div  class="inline"  @click="handleFilterClose" v-else>
                           <i class="el-icon-close" style="font-size:12px;"></i>
                           </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>

<!--                       <ul class="fr markets-edit-table">
                          <li>
                            <a><i class="icon-pencil"></i><span>新增优惠规则</span></a>
                          </li>
                      </ul> -->
                  </div>
                <div class="pad20 white-bg margin0 clearfix">
                    <el-table
                      :data="tableData"
                      stripe
                      style="width: 100%">
                      <el-table-column label="优惠活动名称" width="120">
                          <template slot-scope="scope">
                            <span>{{scope.row.ruleName}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column label="优惠码" >
                        <template slot-scope="scope">
                          <span>{{ scope.row.favId }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="优惠类型" >
                        <template slot-scope="scope">
                          <span>{{ returnType(scope.row.favStyle) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="创建于" width="150">
                        <template slot-scope="scope">
                          <span>{{scope.row.createTime}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="创建人" width="">
                        <template slot-scope="scope">
                          <span>{{scope.row.createUserName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="开始时间" width="150">
                        <template slot-scope="scope">
                          <span>{{scope.row.beginTime}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="结束时间" width="150">
                        <template slot-scope="scope">
                          <span>{{ scope.row.endTime }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="状态">
                        <template slot-scope="scope">
                          <span>{{ returnStatus(scope.row.status) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="140px;">
                        <template slot-scope="scope">
                        <router-link v-if="scope.row.favStyle==1" target = _blank :to="{path:'/markets/ruledetail',query: {'id': scope.row.id}}">
                        <el-button size="small">查看</el-button>
                        </router-link>

                        <router-link v-else target = _blank :to="{path:'/markets/ruledetail2',query: {'id': scope.row.id}}">
                        <el-button size="small">查看</el-button>
                        </router-link>
                            
                            <el-button v-show="scope.row.status!=0" size="small" @click="open2(scope.row)">结束</el-button>
                        </template>
                      </el-table-column>

                    </el-table>

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
import { marketRuleQuery,updateRuleInfo } from '../../service/getData'
import selectbar from '../../components/selectbar/selectbar.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'
export default {
  components: {
    selectbar
  },
  created(){
    this.getList();
  },
  data() {
    return {
      favStyle:null,
      inputVisible: false,
      inputValue: '',
      listLoading: true,
      total:null,
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        favStyle: null,
        ruleName: null,
      },
    };
  },
  methods: {
    returnType(type) {
      if(type===1){
        return "存款优惠";
      }else{
        return "非存款优惠";
      }
    },
    returnStatus(status){
      if(status==0){
        return "已结束";
      }else if(status==1){
        return "进行中";
      }else if(status==2){
        return "未开始";
      }
    },
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    getList() {
      this.listLoading = true;
      marketRuleQuery(this.listQuery).then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
      });

    },
    handleFilter() {
      this.listQuery.favStyle = parseInt(this.favStyle);
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleFilterClose(){
      this.listQuery.ruleName = null;
      this.handleFilter();
    },
    open2(row) {
       this.$confirm('确定结束活动？', '结束活动', {
         confirmButtonText: '确定',
         cancelButtonText: '取消'
       }).then(() => {
          let query = {};
          query.id = row.id;
          query.status = 0;
          updateRuleInfo(query).then((res) =>{
              if(res.status){
                  
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  });
                  this.handleFilter();
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



