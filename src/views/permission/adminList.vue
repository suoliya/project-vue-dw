<template>
  <section class="wrapper">
    <!--财务管理-->
    <div class="row">
      <div class="col-lg-12 getheight">

        <div class="usl-top-box white-bg pd-20">
          <div class="inline"><h1 class="f-black inline mr20">管理员列表</h1></div>
          <div class="inline fr search-box search-box2">
            <input type="text" placeholder="请输入要查询的用户名" v-model="listQuery.searchText">
            <div class="inline" v-if="listQuery.searchText==null">
              <i class="el-icon-search" style="font-size:12px;"></i>
            </div>
            <div class="inline" @click="handleFilterClose" v-else>
              <i class="el-icon-close" style="font-size:12px;"></i>
            </div>
            <div style="background-color: #dcdcdc;padding: 10px 20px;border-radius:  0;display:inline-block;"
                 @click="handleFilter">搜索
            </div>
          </div>
        </div>
        <div class="usl-select-tj  white-bg pd-20 clearfix pdtop-0">
          <router-link target=_blank  :to="{path:'/permission/adminEdit'}" class="create-trade fr adminAdd">
            添加账户
          </router-link>
<!--           <a class="create-trade fr adminAdd" @click="goEdit">添加账户</a>
 -->        </div>
        <div class="pad20 white-bg margin0 clearfix adminEdit pdtop-0">
          <div class="table_container adminAdd_table mt-0">
            <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange"
                      tooltip-effect="dark" ref="multipleTable">

              <el-table-column label="用户名" width="100">
                <template slot-scope="scope">
                  <router-link target=_blank  :to="{path:'/permission/adminEdit',query: {'id': scope.row.id}}">
                    {{scope.row.userName}}
                  </router-link>

                </template>
              </el-table-column>
              <el-table-column label="用户姓名" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.firstName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="电话" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.mobile }}</span>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="">
                <template slot-scope="scope">
                  <span>{{ FormtDate(scope.row.dateJoined) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最后登录时间" width="">
                <template slot-scope="scope">
                            <span>{{ FormtDate(scope.row.lastLogin
                            ) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="角色" align="left" style="padding-bottom:10px;" width="">
                <template slot-scope="scope">

                  <el-tag type="primary" v-for="(item,index) in scope.row.roleList" :key="index">
                    <router-link target=_blank  :to="{path:'/permission/roleEdit',query: {'id': item.id}}">
                      {{item.roleName}}
                    </router-link>

                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    v-if="scope.row.isActive==0"
                    @click="setStatus(scope.row.id)">启用
                  </el-button>
                  <el-button
                    size="small"
                    v-else
                    @click="setStatusDel(scope.row.id)">禁用
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
          <div class="pagination fr">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.pageNum" :page-sizes="[10, 20, 30,40]"
                           layout="sizes,prev, pager, next" :page-size="listQuery.limit" :total="total">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>

    </div>


  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { ServiceAdminList, updateAdmin } from '../../service/getData'
  import { getFormtDate, getTimeDate } from '../../config/mUtils'

  //import tagbar from '../../components/tagbar/tagbar.vue'
  export default {
    components: {},
    created () {
      this.getList()
    },
    data () {
      return {
        total: null,
        listLoading: true,
        tableData: null,
        listQuery: {
          pageNum: 1,
          limit: 10,
          searchText: null
        },
        transferSureList: null
      }
    },
    computed: {},
    methods: {
      FormtDate: function (time) {
        return getTimeDate(time)
      },
      getList () {
        this.listLoading = true
        ServiceAdminList(this.listQuery).then((res) => {
          this.tableData = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter () {
        this.getList()
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange (val) {
        this.listQuery.pageNum = val
        this.getList()
      },
      handleFilterClose () {
        this.listQuery.searchText = null
        this.handleFilter()
      },
      goEdit () {
        this.$router.push({path: '/permission/adminEdit'})
      },
      setStatus (id) {
        const h = this.$createElement
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认启用用户？ ')
          ]),
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {

            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 1000)
            } else {
              done()
            }
          }
        }).then(action => {
          let query = {}
          query.id = id
          query.isActive = 1
          updateAdmin(query).then((res) => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getList()
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
            }
          })
        }).catch(() => {

          this.$message({
            type: 'info',
            message: '已取消'
          })

        })

      },
      setStatusDel (id) {
        const h = this.$createElement
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认禁用用户？ ')
          ]),
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {

            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 1000)
            } else {
              done()
            }
          }
        }).then(action => {
          let query = {}
          query.id = id
          query.isActive = 0
          updateAdmin(query).then((res) => {
            if (res.status) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getList()
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
            }
          })
        }).catch(() => {

          this.$message({
            type: 'info',
            message: '已取消'
          })

        })

      },

    }

  }
</script>
<style>
  .search-box2 input {
    width: 310px;
  }

  .adminEdit .el-tag {
    margin-bottom: 2px;
    margin-top: 2px;
    height: 16px;
    font-size: 10px;
    line-height: 10px;
    padding: 3px;
    border: none;
  }

  .adminEdit .el-button {
    font-size: 10px;
    padding: 5px;
    border: none;
  }

</style>


