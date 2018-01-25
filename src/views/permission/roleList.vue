<template>
    <section class="wrapper">
        <!--财务管理-->
        <div class="row">
              <div class="col-lg-12 getheight">
                
                <div class="usl-top-box white-bg pd-20">
                    <div class="inline"><h1 class="f-black inline mr20">角色列表</h1></div>
                    <div class="inline fr search-box search-box2">
                        <input type="text" placeholder="请输入要查询的角色名称"  v-model="listQuery.searchText">
                        <div  class="inline"  v-if="listQuery.searchText==null">
                        <i class="el-icon-search" style="font-size:12px;"></i>
                        </div>
                        <div  class="inline"  @click="handleFilterClose" v-else>
                        <i class="el-icon-close" style="font-size:12px;"></i>
                        </div>
                        <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;" @click="handleFilter">搜索</div>
                    </div>
                </div>
                <div class="usl-select-tj  white-bg pd-20 clearfix pdtop-0">
                    <router-link target = _blank :to="{path:'/permission/roleEdit'}"  class="create-trade fr adminAdd">
                    添加角色
                    </router-link>
                    <!-- <a class="create-trade fr adminAdd"  @click="goEdit">添加角色</a>  -->
                </div>

                <div class="pad20 white-bg margin0 clearfix  pdtop-0">
                  <div class="table_container adminAdd_table">
                  <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">

                        <el-table-column label="角色Id" width="100">
                          <template slot-scope="scope">
                            {{scope.row.id}}
                          </template>
                        </el-table-column>
                        <el-table-column label="角色编码" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleCode }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="角色名称" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="用户数量" width="">
                          <template slot-scope="scope">
                            <span>{{ scope.row.count }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" width="">
                          <template slot-scope="scope">
                              <router-link target = _blank :to="{path:'/permission/roleEdit',query: {'id': scope.row.id}}">
                              <el-button size="small">修改</el-button>
                              </router-link>
                              
                              <el-button size="small" @click="roleDel(scope.row.id)">删除</el-button>
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
import {getRoleList,deleteRole} from '../../service/getData'
import {getFormtDate,getTimeDate} from '../../config/mUtils'


//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
  },
  created(){
    this.getList();
  },
  data() {
    return {
      total: null,
      listLoading: true,
      tableData: null,
      listQuery: {
        pageNum: 1,
        limit: 10,
        searchText:null
      },
      transferSureList: null
    }
  },
  computed: {

  },
  methods: {
    FormtDate: function (time) {
       return getTimeDate(time);
    },
    getList() {
      this.listLoading = true;
      getRoleList(this.listQuery).then((res) => {
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
    handleFilterClose(){
      this.listQuery.searchText = null;
      this.handleFilter();
    },
    goEdit(){
      this.$router.push({path:'/permission/roleEdit'})
    },
    goEditId(id){
      this.$router.push({path:'/permission/roleEdit',query: {'id': id}})
    },
    roleDel(id){
      this.$confirm('确定删除角色？', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
         deleteRole(id).then((res) =>{
             if(res.status){
                 this.$message({
                   type: 'success',
                   message: '删除成功!'
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
    }
  }

}
</script>
<style>
  .search-box2 input{
    width: 310px;
  }
</style>


