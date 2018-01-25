<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">

            <div class="" style="overflow:hidden;padding:5px 0 25px 0;">
                <h3 class="heaTitle">IP管理</h3>
                <a class="create-trade" @click="dialogFormVisible = true"><i class="el-icon-edit mr10 mt"></i>创建白名单规则</a>
            </div>
            <div class="table_container">
                <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="ip"
                  label="IP"
                  width="">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="操作"
                  width="">
                  <template slot-scope="scope">
                      <el-button v-if="scope.row.status==0" type="info" size="small" @click="amendStatusIp(scope.row.id,scope.row.status)">关闭</el-button>
                      <el-button v-if="scope.row.status==1" type="success" size="small" @click="amendStatusIp(scope.row.id,scope.row.status)">开启</el-button>
                      <el-button type="danger" size="small" @click="removeIPBtn(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="ipList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="ipList.limit"
                    :total="total">
                </el-pagination>
            </div>

            <!-- 弹窗 -->
            <div class="openWindow">
                <el-dialog title="新建白名单规则" :visible.sync="dialogFormVisible" size="small">
                        <el-form :model="addIpName" ref="addIpName">
                            <el-form-item label="地址:" label-width="85px" :rules="[
                              { required: true, message: '请输入地址'}
                            ]">
                                <el-input v-model="addIpName.ip" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addIp3()">新建</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>

<script>
import {queryIPList,removeIP,statusIp,addIp} from '../../service/getData'
export default {
    components: {

    },
    data() {
        return {
            tableData:[],
            total:null,
            ipList:{
                limit:10,
                pageNum:1
            },
            statusIp:{
                id:'',
                status:null,
            },
            addIpName:{
                ip:''
            },
            dialogFormVisible:false,
            // rules:{
            //     ipName:[
            //         {required: true, message: '请输入地址', trigger: 'blur' }
            //     ],
            // },

        }
    },
    mounted () {
        this.list();
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        },
        handleSizeChange(val) {
            this.ipList.limit = val;
            this.list();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.ipList.pageNum = val;
            this.list();
            console.log(`当前页: ${val}`);
        },
        list () {
            queryIPList(this.ipList).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(this.total);
                console.log(res.data.list);
            })
        },
        removeIPBtn(ipId){
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, '确认要删除IP？ ')
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
                  removeIP(ipId).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
                          this.list();
                      }else{
                          this.$message({
                            type: 'info',
                            message:res.message
                          });
                      }
                  })
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
              });
        },
        // 修改ip状态
        amendStatusIp(ipId,status){
            var amendText = '';
            if(status == 0){
                amendText = "确定要关闭IP？";
                this.statusIp.id = ipId;
                this.statusIp.status = 1;
            }else{
                amendText = "确定要开启IP？";
                this.statusIp.id = ipId;
                this.statusIp.status = 0;
            }
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                  h('span', null, amendText)
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
                  statusIp(this.statusIp).then((res)=>{
                      if(res.status){
                          this.$message({
                            type: 'success',
                            message: '操作成功!'
                          });
                          this.list();
                      }else{
                          this.$message({
                            type: 'info',
                            message:res.message
                          });
                      }
                  })
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
              });
        },
        addIp3(){
            console.log(this.addIpName.ip);
            this.$refs.addIpName.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.addIpName);
                  addIp(para).then((res) => {
                      if(res.code == '0'){
                         this.$message({
                             type: 'success',
                             message: '创建成功！'
                         });
                         this.list();
                         this.addIpName.ip = '';
                         this.dialogFormVisible = false;
                     }else{
                         this.$message({
                             type: 'info',
                             message: res.message
                         });
                     }
                })
              }
            })
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
    float: left;
    margin-top:5px;
    /*padding-bottom: 26px;*/
    color: #333;
    font-size: 20px;
}
.table_container{
    float: left;
    width: 100%;
    margin-top: -5px;
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
a:hover{
    color: #fff;
}
</style>
