<template>
    <section class="wrapper">
        <div class="content">
            <h3 class="heaTitle">第三方银行调整</h3>
            <span style="float:left">
                <a class="edit-trade mrgL10" style="position: relative;top: -10px;">删除</a>
                <a class="edit-trade mrgL10" style="position: relative;top: -10px;">停用</a>
                <a class="edit-trade" style="position: relative;top: -10px;">启用</a>
            </span>
            <a class="create-trade mrgL10" style="position: relative;top: -10px;">新增类型</a>
            <a class="create-trade mrgL10" style="position: relative;top: -10px;background-color:#ccc;color:#333">搜索</a>
            <input type="text" style="position: relative;top: -10px;float:right;height:38px;width:280px;">
            <div class="table_container">
                <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
                <el-table-column
                  prop="account"
                  type="selection"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="ID"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="第三方支付系统名称"
                  align='center'
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="取款"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="存款"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="创建于"
                 align='center'>
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="跟新人"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="更新"
                 align='center'>
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="状态"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="操作"
                 align='center'>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    layout="prev, pager, next"
                    :total="600">
                </el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import {adventList} from '../../service/getData'
export default {
    components: {

    },
    mounted () {
        this.list();
    },
    data() {
        return {
            input2: '',
            "currentPage1":1,
            tableData:[],
        }
    },
    methods: {
        handleIconClick(ev) {
            console.log(ev);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        list () {
            let parame = {
                page:'',
                limit:10,
                searchText:'',
            }
            adventList(parame).then((res) => {
                this.tableData = res.data.list;
                console.log(res.data.list);
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
    padding-bottom: 26px;
    color: #333;
}
.table_container{
    margin-top:35px;
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
.edit-trade {
    background-color: #ccc;
    color: #fff;
    padding: 10px 20px;
    float: right;
    cursor: pointer;
}
.mrgL10 {margin-left: 10px;}
</style>
