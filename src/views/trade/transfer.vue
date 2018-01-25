<style>
.el-table__body,.el-table__header{
  width: 100% !important;
}

.el-dialog .el-date-editor.el-input{
  width: 250px;
}

.el-dialog--tiny {
  width: auto;
  padding-right: 20px;
}

.el-dialog__body {
  padding: 50px 30px 0px 30px;
  color: #48576a;
  font-size: 14px;
}

.search-box2 input{
  min-width:280px !important;
}

  .customtime .el-date-editor{
      width: 250px !important;
  }
</style>
<template>
    <section class="wrapper">
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight clearfix" >
                  <div class="usl-top-box white-bg pd-20">
                      <div class="inline"><h1 class="f-black inline mr20">财务对接</h1></div>
                      <div class="inline fr search-box search-box2 mt20">
                          <input type="text" placeholder="请输入您要查询的订单号"  v-model="listQuery.searchText">
                          <div  class="inline"  v-if="listQuery.searchText==null">
                          <i class="el-icon-search" style="font-size:12px;"></i>
                          </div>
                          <div  class="inline"  @click="handleFilterClose" v-else>
                          <i class="el-icon-close" style="font-size:12px;"></i>
                          </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                  <div class="usl-select-tj  white-bg pd-20 clearfix">

                      <!--<datepickerbar></datepickerbar>-->
<!--                       <span class="transfernum fl"><i>180798.987</i>元</span>
                       -->                     
                      <div class="inline fl">
                          <label class="ml10">交易状态：</label>
                          <el-select v-model="listQuery.status" @change="handleFilter" placeholder="请选择">
                            <el-option
                              v-for="item in statusList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>

                          <label class="ml10">选择处理人：</label>
                          <el-select v-model="listQuery.staffId" @change="handleFilter" placeholder="请选择">
                          <el-option  label="全部" value=""></el-option>
                            <el-option
                              v-for="item in adminlist"
                              :key="item.id"
                              :label="item.userName"
                              :value="item.id">
                            </el-option>
                          </el-select>

                          <label class="ml10">时间范围：</label>
                          <list-time-area  @timeValue="handleFilter" ref="datepick"></list-time-area>
                      </div>
                      <a class="create-trade fr" @click="handleTransfer"><i class="el-icon-news mr10"></i>提案</a>

                  </div>
                <div class="white-bg clearfix">
                    <div class="table_container pd-20 pdtop-0">
                      <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column label="转账订单号"  width="205">
                            <template slot-scope="scope">
                              <span>{{scope.row.orderId}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="转账申请时间"  width="160">
                          <template slot-scope="scope">
                            <span>{{ FormtDate(scope.row.createdAt) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="财务处理时间"  width="160">
                          <template slot-scope="scope">
                            <span>{{ FormtDate(scope.row.financeOpTime) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column  label="转账金额">
                          <template slot-scope="scope">
                            <span>{{scope.row.amount/100}} </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="支付方式">
                          <template slot-scope="scope">
                            <span>{{returnTypeName(scope.row.paymentMode)}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="财务处理人">
                          <template slot-scope="scope">
                            <span>{{scope.row.financeStaff}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="申请人">
                          <template slot-scope="scope">
                            <span>{{scope.row.applyStaff}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="交易状态">
                          <template slot-scope="scope">
                            <span>{{ FormtStatus(scope.row.status) }}</span>
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
        <!-- 客服转账弹框 -->

            <el-dialog title="客服转账" :visible.sync="dialogFormVisible" size="tiny">
              <el-form class="small-space"  label-position="left" label-width="70px" style=' margin-left:20px;'>

                <el-form-item label="转账金额">
                  <el-input type="text" placeholder="转账金额 元" v-model="transferQuery.amount"></el-input>
                </el-form-item>
                <el-form-item label="转账日期">
                  <time-input ref="timeValue" class="customtime"></time-input>
                </el-form-item>
                <el-form-item label="支付方式">
                  <el-select v-model="transferQuery.paymentMode" clearable placeholder="请选择" style="width: 250px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button  type="primary" @click="transfer">确 定</el-button>
              </div>

            </el-dialog>



    </section>
</template>

<script>

import {mapState} from 'vuex'
import { ServiceTransferList,ServicTransfer,ServiceAdminList } from '../../service/getData'
import tablebar from '../../components/tablebar/tablebar.vue'
import selectbar from '../../components/selectbar/selectbar.vue'
import listTimeArea from '../../components/moudle/listTimeArea.vue'
import timeInput from '../../components/moudle/timeInput.vue'
import Pagination from '../../components/Pagination/pagination.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    tablebar,
    selectbar,
    listTimeArea,
    timeInput
  },
  created(){
    this.getList();
    this.adminlistAll();
  },
  data() {
    return {
      adminlist:null,
      input2: '',
      "currentPage1":1,
      listLoading: true,
      selectStatus:[
        {value:'',label:'全部'},
        {value:'pending',label:'待处理'},
        {value:'success',label:'成功'},
        {value:'reject',label:'拒绝'}
      ],
      total:null,
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: null,
        status: '',
        staffId: null,
        beginTime: null,
        endTime: null,
        searchText: null,
      },
      dialogFormVisible:false,
      options: [
        {
         value: 'cash',
         label: '现金'
       },{
        value: 'wx',
        label: '微信'
      }, {
        value: 'alipay',
        label: '支付宝'
      },
      ],
      transferQuery:{
        amount:null,
        paymentMode: '',
        transferDate:null,
        staffId:null
      },
      statusList:[
          {
            value: '',
            label: '全部'
          },
         {
           value: 'pending',
           label: '待处理'
         },{
          value: 'success',
          label: '成功'
        }, {
          value: 'reject',
          label: '拒绝'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'adminId'
      ])
  },
  methods: {
    adminlistAll() {
        let query = {pageNum:1,limit:100};
        ServiceAdminList(query).then((res) => {
            this.adminlist = res.data.list;
        });
    },
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
          statusName = '待处理';
        }else if(status == 'success'){
          statusName = '成功';
        }else if(status == 'reject'){
          statusName = '拒绝';
        }

        return statusName;
    },
    returnTypeName(type){
      if(type == 'wx'){
        return '微信支付';
      }else if(type == 'cash'){
        return '现金支付';
      }else if(type == 'alipay'){
        return '支付宝支付';
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    getList() {
      this.listLoading = true;
      ServiceTransferList(this.listQuery).then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
      });

    },
    handleFilter() {
      this.listQuery.beginTime = getFormtDate(this.$refs.datepick.value4[0]);
      this.listQuery.endTime = getFormtDate(this.$refs.datepick.value4[1]);
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
    handleTransfer() {
      this.dialogFormVisible = true;
    },
    transfer() {
      this.transferQuery.transferDate = getFormtDate(this.$refs.timeValue.value2);
      ServicTransfer(this.transferQuery).then((res) => {
          this.dialogFormVisible = false;
          if(res.data!=''&&res.data!=null){
            this.$message({
              message: '创建成功!',
              type: 'success'
            });
            this.handleFilter();
          }else{

            this.$message.error('创建失败');
          }
      });

    }
  }

}
</script>
<style scoped>
  .el-input, .el-input__inner{
      width: 250px;
  }
</style>
