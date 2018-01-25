<template>
    <section class="wrapper">
        <!--头部三个模块-->
        <div class="row">
              <div class="col-lg-6 mbot20">
                  <div class=" white-bg borderbox gamehistory_box clearfix">
                      <ul>
                          <li>
                              <p class="title">总投资(查询范围内)：</p>
                              <p class="number" title="6,748,954,854">6,748,954,854</p>
                          </li>
                          <li>
                              <p class="title">总输：</p>
                              <p class="number" title="4,758,955,755">4,758,955,755</p>
                          </li>
                          <li>
                              <p class="title">总输赢：</p>
                              <p class="number" title="5,459,831">5,459,831</p>
                          </li>
                          <li>
                              <p class="title">总赢：</p>
                              <p class="number" title="52,484,120">52,484,120</p>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="col-lg-6 mbot20">
                  <div class=" white-bg borderbox gamehistory_box gb2 clearfix">
                      <ul>
                          <li>
                            <p class="title" title="87466.21"><span class="gameleftspan">GAMEPLAY Bet :</span><span>87466.21</span></p>
                          </li>
                          <li>
                              <p class="title" title="8746611233.21"><span class="gameleftspan">NT Loss :</span>8746611233.21</span></p>
                          </li>
                          <li>
                              <p class="title" title="811232137466.21"><span class="gameleftspan">GAMEPLAY result :</span><span>811232137466</span></p>
                          </li>
                          <li>
                              <p class="title" title="87466.21"><span class="gameleftspan">PT Loss :</span><span>87466.21</span></p>
                          </li>
                          <li>
                              <p class="title" title="66.21"><span class="gameleftspan">GAMEPLAY Loss :</span><span>66.21</span></p>
                          </li>
                          <li>
                              <p class="title" title="12387466.21"><span class="gameleftspan">MG Bet  :</span><span>12387466.21</span></p>
                          </li>
                          <li>
                              <p class="title" title="3344487466.21"><span class="gameleftspan">NT Bet :</span><span>3344487466.21</span></p>
                          </li>
                          <li>
                              <p class="title" title="66.21"><span class="gameleftspan">NT win  :</span><span>66.21</span></p>
                          </li>
                      </ul>
                  </div>
              </div>
        </div>
        <!--头部三个模块end-->
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20 no-border">
                      <div class="inline"><h1 class="f-black inline mr20">游戏历史</h1></div>

                  </div>
                  <div class="usl-select-tj  white-bg pd-20 pbom10 ptop0 clearfix">
                      <selectbar class="fl height33 mr20 radius0"></selectbar>
                      <div class="inline fl search-box">
                        <input type="text" placeholder="">
                        <div  class="inline"  @click="handleFilterClose"><i class="el-icon-close" style="font-size:12px;"></i></div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                <div class="pad20 white-bg margin0 clearfix">
                    <el-table
                      :data="tableData"
                      stripe
                      style="width: 100%">
                      <el-table-column label="优惠活动标题" width="120">
                          <template slot-scope="scope">
                            <span>{{scope.row.actName}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column label="语言" width="70">
                        <template slot-scope="scope">
                          <span>{{ scope.row.language }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="优惠活动描述" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column  label="优惠活动缩略图" width="110">
                        <template slot-scope="scope">
                          <span>
                          <img v-if="scope.row.imgUrl.length>0" :src="scope.row.imgUrl" width="100px">
                          <span v-else>暂无图片</span>
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="优惠规则详情" width="100">
                        <template slot-scope="scope">
                          <span>{{scope.row.detail}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="创建人" width="70">
                        <template slot-scope="scope">
                          <span>{{scope.row.createUser}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="创建于" width="">
                        <template slot-scope="scope">
                          <span>{{scope.row.createTime}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="更新人" width="">
                        <template slot-scope="scope">
                          <span>{{ scope.row.modifyUser }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="更新" width="70">
                        <template slot-scope="scope">
                          <span>{{scope.row.modifyTime}}</span>
                        </template>
                       </el-table-column>
                      <el-table-column label="状态" width="70">
                        <template slot-scope="scope">
                          <span>{{ scope.row.status }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="125">
                        <template slot-scope="scope">
                            <el-button size="small" @click="open2(scope.row)">编辑</el-button>
                            <el-button size="small" @click="open2(scope.row)">删除</el-button>
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
import { marketActivityQuery } from '../../service/getData'
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
      inputVisible: false,
      inputValue: '',
      listLoading: true,
      total:null,
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        fuleId: null,
        actName: null,
      },
    };
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    getList() {
      this.listLoading = true;
      marketActivityQuery(this.listQuery).then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
      });

    },
    handleFilter() {
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

  }

}
</script>
<style scoped>
.gamehistory_box ul .number{max-width: none;}
.gamehistory_box ul .number{width: auto;}
.gamehistory_box p{width: auto;}
</style>


