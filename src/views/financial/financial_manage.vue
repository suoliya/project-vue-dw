<template>
    <section class="wrapper">
        <!--财务管理-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-30 no-border ">
                      <div class="inline"><h1 class="f-black inline mr20">客服转账审核</h1></div>

                  </div>
                  <div class="usl-select-tj  white-bg pd-30 ptop0 clearfix">
                      <!--查询条件-->
                      <span class="inline-block fl line35">处理状态：</span>
  
                      <el-select v-model="listQuery.status" placeholder="请选择" @change="handleFilter" class="fl height33 mr20 radius0 smallsel">
                      <el-option v-for="item in selectStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <span class="inline-block  fl line35">选择处理人：</span>

                        <el-select v-model="listQuery.staffId" @change="handleFilter" placeholder="请选择"  class="fl height33 mr20 radius0 smallsel">
                        <el-option  label="全部" value=""></el-option>
                          <el-option
                            v-for="item in adminlist"
                            :key="item.id"
                            :label="item.userName"
                            :value="item.id">
                          </el-option>
                        </el-select>

                      <!--时间选择-->
                      <span class="inline-block fl line35">时间范围：</span>
                      <list-time-area  @timeValue="handleFilter"   ref="datepick" style="width:300px;"></list-time-area>

                      <!--搜索-->
                      <div class="inline fr search-box">
                        <input type="text" placeholder="请输入你要搜索的订单号" v-model="listQuery.searchText">
                        <div  class="inline"  v-if="listQuery.searchText==null">
                        <i class="el-icon-search" style="font-size:12px;"></i>
                        </div>
                        <div  class="inline"  @click="handleFilterClose" v-else>
                        <i class="el-icon-close" style="font-size:12px;"></i>
                        </div>
                          <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                      </div>
                  </div>
                <!--列表-->
                <div class="pd-30 white-bg margin0 clearfix pdtop-0">
                  <div class="table_container">
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column label="客服转账订单号" width="230">
                        <template slot-scope="scope">
                          <span>{{scope.row.orderId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="客服转账申请时间" width="180">
                      <template slot-scope="scope">
                        <span>{{ FormtDate(scope.row.transferDate) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="申请客服" width="180">
                      <template slot-scope="scope">
                        <span>{{ scope.row.applyStaff }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  label="转账金额" width="">
                      <template slot-scope="scope">
                        <span>{{ scope.row.amount/100 }} </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="支付方式" width="">
                      <template slot-scope="scope">
                        <span>{{ returnPay(scope.row.paymentMode) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="处理状态" width="">
                      <template slot-scope="scope">
                        <span>{{ FormtStatus(scope.row.status) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                      <template slot-scope="scope">
                        <el-button
                          size="small" 
                          v-if="scope.row.status=='pending'" 
                          @click="open2(scope.row)">确认转账</el-button>
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
import {ServiceTransferList,ServiceAdminList,ServiceTransferSure} from '../../service/getData'
import tablebar from '../../components/tablebar/tablebar.vue'
import listTimeArea from '../../components/moudle/listTimeArea.vue'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    tablebar,
    listTimeArea
  },
  created(){
    this.getList();
    this.adminlistAll();
  },
  data() {
    return {
      adminlist:null,
      list: null,
      total: null,
      listLoading: true,
      input2: '',
      selectStatus:[
        {value:'',label:'全部'},
        {value:'pending',label:'待处理'},
        {value:'success',label:'成功'},
        {value:'reject',label:'拒绝'}
      ],
      selectPeople:null,
      tableData: null,
      listQuery: {
        pageNum: 1,
        limit: null,
        status: '',
        staffId: '',
        beginTime: null,
        endTime: null,
        searchText: null,
      },
      transferSureQuery: {
          financeStaffId:null,
          status:null,
          orderId:null,
          failureMsg:null
      },
      transferSureList: null
    }
  },
  computed: {
    ...mapState([
      'adminName','adminId'
      ])
  },
  methods: {
    returnPay(p) {
      if(p == 'wx'){
        return '微信';
      }else if(p == 'cash'){
        return '现金';
      }else if(p == 'alipay'){
        return '支付宝';
      }
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
    setheight(){
       var height = $(".getheight").height();
       $(".tagbox").height(height);
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
    showmsg(data) {
      console.log(data);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    open2(item){
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '确认客服已打款 '),
          h('p', { style: 'color: gray' }, '确认已转'+item.amount/100+'元？ ')
        ]),
        type:'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {

          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
          this.transferSureQuery.status = 'success';
          this.transferSure(item.orderId);
      }).catch(() => {
            this.$prompt('请输入拒绝原因', '提示', {
                confirmButtonText: '确认拒绝',
                cancelButtonText: '取消操作',
                inputPattern: /\S/,
                inputErrorMessage: '原因不能为空'
              }).then(({ value }) => {
                this.transferSureQuery.status = 'reject';
                this.transferSure(item.orderId,value);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });       
              });
          });
      },
    adminlistAll() {
        let query = {pageNum:1,limit:100};
        ServiceAdminList(query).then((res) => {
            this.adminlist = res.data.list;
        });
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
    transferSure(id,re) {
      this.transferSureQuery.orderId = id;
      this.transferSureQuery.failureMsg = re;
      ServiceTransferSure(this.transferSureQuery).then((res) => { 
          if(res.status){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
          }else{
            this.$message({
              type: 'info',
              message:res.message
            });
          }
      });
    }

  }

}
</script>



