<style>
.el-table__body,.el-table__header{
  width: 100% !important;
}

.search-box2 input{
  min-width:280px !important;
}
</style>
<template>
    <section class="wrapperDetail">
        <!--用户列表-->
        <div class="row">
              <div class="col-lg-12 getheight">
                  <div class="usl-top-box white-bg pd-20">
                      <div class="inline"><h1 class="f-black inline mr20">消费TOP 10会员</h1></div>
                  </div>

                <div class="pd-20 white-bg clearfix">
                  <el-table :data="tableData" stripe style="width: 100%">

                      <el-table-column align="center" label="最后一次交易日期"  width="">
                        <template slot-scope="scope">
                          <span>{{FormtDate(scope.row.createdAt)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用户名" width="">
                        <template slot-scope="scope">
                            <router-link target = _blank :to="{path:'/user/userDetail',query: {'id': scope.row.id}}">{{scope.row.username}}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="账户名">
                        <template slot-scope="scope">
                          <span>{{scope.row.realname}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="交易总金额" width="">
                        <template slot-scope="scope">
                          <span>{{scope.row.total/100}}</span>
                        </template>
                      </el-table-column>

                  </el-table>
                </div>
              </div>

            </div>

        </div>

    </section>
</template>

<script>
import {mapState} from 'vuex'
import { userChargeRankList } from '../../service/getData'

import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {

  created(){
    this.getList();
  },
  data() {
    return {
      total:null,
      listLoading: true,
      tableData:null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        begin_date: null,
        end_date: null,
      }
    }
  },
  computed: {
    ...mapState([
      'adminId'
      ])
  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    getList() {
      this.listLoading = true;
      this.listQuery.begin_date = '2017-01-01';
      let nowtime = new Date();
      this.listQuery.end_date =  getTimeDate(nowtime);
      userChargeRankList(this.listQuery).then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
      });

    },
    
  }

}
</script>
