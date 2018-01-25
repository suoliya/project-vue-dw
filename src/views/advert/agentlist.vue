<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
            <h3 class="heaTitle">代理列表</h3>
            <div class="input">
                <el-input
                    width="180"
                    placeholder="代理用户名 / 邮箱"
                    icon="search"
                    v-model="agentList.searchText"
                    :on-icon-click="searchBtn">
                </el-input>
            </div>
            <a class="create-trade" style="position: relative;top: -30px;"  @click="gotoRegister()"><i class="el-icon-edit mr10 mt"></i>添加代理</a>
            <div class="table_container">
                <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop=""
                  label="用户名"
                  width="">
                  <template slot-scope="scope">
                      <router-link target = _blank :to="{path:'/advert/agenDetails',query: {'id': scope.row.id,'uuid':scope.row.uuid}}">{{scope.row.account}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="invitationcode"
                  label="追踪代码"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="邮箱"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="parentName"
                  label="父级"
                  width="">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="注册时间"
                  width="">
                    <template slot-scope="scope">
                        <span>{{fromDate(scope.row.createdat)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="钱包"
                  width="">
                </el-table-column>
                <el-table-column prop="" label="状态" width="">
                    <template slot-scope="scope">
                        {{getStatus(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status==0" type="info" size="small" @click="open2(scope.row.id,scope.row.status)">禁用</el-button>
                        <el-button v-if="scope.row.status==1" type="success" size="small" @click="open2(scope.row.id,scope.row.status)">开启</el-button>
                        <el-button type="danger" size="small" @click="open2(scope.row.id,2)">删除</el-button>
                        <!-- <div style="cursor:pointer" class="el-icon-delete2" @click="open2(scope.row)">删除</div> -->
                    </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="agentList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="agentList.limit"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import {adventList,removerStatis} from '../../service/getData'
import {getTimeDate} from '../../config/mUtils'
export default {
    data() {
        return {
            input2: '',
            "currentPage1":1,
            tableData:[],
            total:null,
            agentList:{
                limit:10,
                pageNum:1,
                searchText:'',
            },
            removerList: {
                status:null,
                id:null
            },
        }
    },
    mounted () {
        this.aglist();

    },
    components: {

    },
    methods: {
        aglist () {
            adventList(this.agentList).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(this.total);
                console.log(res.data.list);
            })
        },
        getStatus: function (status) {
            let statusName = null;
            if(status == '0'){
                statusName = '正常';
            }else{
                statusName = '禁用';
            }
            return statusName;
        },
        handleSizeChange(val) {
            this.agentList.limit = val;
            this.aglist();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.agentList.pageNum = val;
            this.aglist();
            console.log(`当前页: ${val}`);
        },
        searchBtn(){
            console.log(this.agentList.searchText);
            this.aglist();
        },
        // 跳转到代理注册页面
        gotoRegister(){
            // alert("1");
            this.$router.push('/advert/register');
        },
        open2(id,status){
            var amendText = '';
            this.removerList.id = id;
            if(status == 0){
                amendText = "确定要禁用？";
                this.removerList.status = 1;
            }else if(status == 1){
                amendText = "确定要开启？";
                this.removerList.status = 0;
            }else{
                amendText = "确定要删除？";
                this.removerList.status = 2;
            }
            console.log(this.removerList.id);
            console.log(this.removerList.status);
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null,amendText)
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
                  removerStatis(this.removerList).then((res) => {
                      if(res.code == 0){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
                          this.aglist();
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
                    message: '已取消'
                  });
              });
          },
        // 跳转到代理详情
        // gotoAgenDetail(item){
        //     this.$router.push({
        //         path: '/advert/agenDetails',
        //         query: { id:item.id,uuid:item.uuid}
        //     });
        // },
        fromDate(time) {
            return getTimeDate(time);
        },

    }
}

</script>

<style scoped>
.content{
    padding:0 47px;
    padding-top: 12px;
    background-color: #fff;
}
.heaTitle{
    padding-bottom: 10px;
    color: #333;
    font-size: 20px;
    margin-top: 5px;
}
.table_container{
    display: inline-block;
    width: 100%;
    margin-top:-5px;
}
.pagination{
    /*float: right;*/
    width: 100%;
    text-align: right;
}
.input{
    width: 300px;
    height: 32px;
}
a:hover {
    color: #fff;
}
</style>
