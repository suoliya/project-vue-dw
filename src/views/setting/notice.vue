<template>
    <section class="wrapper">
        <div class="content" style="margin-left:5px;margin-right:5px;">
            <div class="" style="overflow:hidden;margin-bottom:20px;margin-top:5px;">
                <h3 class="heaTitle">系统公告</h3>
                <a class="create-trade" @click="dialogFormVisible = true"><i class="el-icon-edit mr10 mt"></i>增加通知</a>
            </div>
            <div class="table_container">
                <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="通知id"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="通知内容"
                  width="">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="创建时间"
                  width="">
                    <template slot-scope="scope">
                        <span>{{fromDate(scope.row.createdAt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="通知状态"
                  width="">
                  <template slot-scope="scope">
                      <el-button v-if="scope.row.status==0" type="info" size="small" @click="amendStatus(scope.row.id,scope.row.status)">关闭</el-button>
                      <el-button v-if="scope.row.status==1" type="success" size="small" @click="amendStatus(scope.row.id,scope.row.status)">启用</el-button>
                      <el-button type="danger" size="small" @click="amendStatus(scope.row.id,2)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="noticeList.pageNum"
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30,40]"
                    :page-size="noticeList.limit"
                    :total="total">
                </el-pagination>
            </div>

            <!-- 弹窗 -->
            <div class="openWindow">
                <el-dialog title="增加通知" :visible.sync="dialogFormVisible" size="small">
                        <el-form :model="addContent" ref="addContent">
                            <el-form-item label="内容:" label-width="85px" :rules="[
                              { required: true, message: '请输入内容'}
                            ]">
                                <el-input v-model="addContent.content" auto-complete="off" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addContent1()">新建</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>

<script>
import {queryNotice,addNoticeContent,changeNoticeStatus} from '../../service/getData'
import {getTimeDate} from '../../config/mUtils'
export default {
    components: {

    },
    data() {
        return {
            tableData:[],
            total:null,
            noticeList:{
                limit:10,
                pageNum:1
            },
            noticeStatus:{
                id:'',
                status:null,
            },
            addContent:{
                content:''
            },
            dialogFormVisible:false,

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
            this.noticeList.limit = val;
            this.list();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.noticeList.pageNum = val;
            this.list();
            console.log(`当前页: ${val}`);
        },
        list () {
            queryNotice(this.noticeList).then((res) => {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(this.total);
                console.log(res.data.list);
            })
        },
        // 修改ip状态
        amendStatus(ipId,status){
            var amendText = '';
            if(status == 0){
                amendText = "确定要关闭通知？";
                this.noticeStatus.id = ipId;
                this.noticeStatus.status = 1;
            }else if(status == 1){
                amendText = "确定要开启通知？";
                this.noticeStatus.id = ipId;
                this.noticeStatus.status = 0;
            }else{
                amendText = "确定要删除通知？";
                this.noticeStatus.id = ipId;
                this.noticeStatus.status = 2;
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
                  changeNoticeStatus(this.noticeStatus).then((res)=>{
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
        addContent1(){
            console.log(this.addContent.content);
            this.$refs.addContent.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.addContent);
                  addNoticeContent(para).then((res) => {
                      if(res.code == '0'){
                         this.$message({
                             type: 'success',
                             message: '增加成功！'
                         });
                         this.list();
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
    float: left;
    margin-top: 5px;
    padding-bottom: 10px;
    color: #333;
    font-size: 20px;
}
.table_container{
    float: left;
    width: 100%;
    margin-top: -10px;
    /*margin-top:35px;*/
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
