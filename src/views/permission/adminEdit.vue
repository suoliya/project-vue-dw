<template>
  <section class="wrapperDetail admin_edit">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-30 clearfix">
                    <div class="user_header borderb clearfix mbot20">
                        <h1 class="f-black mr20 mbot20">编辑 / 修改用户</h1>
<!--                         <ul class="userinfo-edit">
    <li><span><i class="icon-list-alt"></i><span>历史</span></span></li>
    <li><span><i class="icon-trash"></i><span>删除</span></span></li>
</ul> -->
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="fl ml55" style="width: 95%;">

                            <div class="set_box1 adminedit">
                              <el-form  :model="adminInfo"  :rules="rules" ref="ruleForm">

                              <p class="f-black inline mr20 mbot20 recommend_h1">个人信息</p>
                              <ul class="modify-ul">
                                <li>
                                  <el-form-item  prop="userName">
                                    <div class="inline-block">用户名：</div>
                                    <el-input v-if="adminId!=null" v-model="adminInfo.userName" :disabled="true"></el-input>
                                    <el-input v-else v-model="adminInfo.userName" placeholder="用户名"></el-input>
                                    <span class="font-gray ml20" >必填。150个字符或者更少。包含字母，数字和仅有的@/./+/-/_符号。</span>
                                  </el-form-item>
                                  
                                </li>
                                <li>
                                  <div v-if="adminId!=null">
                                      <el-form-item>
                                        <div class="inline-block">密码：</div>
                                        <el-input  placeholder="*************" :disabled="true"></el-input>
                                        <span class="font-gray ml20">原始密码不存储，所以没有办法看到这个用户的密码； <span style="color: #ce0000;cursor: pointer;" @click="dialogFormVisible2 = true">修改密码 </span></span>
                                      </el-form-item>
          
                                  </div>
                                  <div v-else>
                                      <el-form-item  prop="password">
                                        <div class="inline-block">密码：</div>
                                        <el-input v-model="adminInfo.password"  placeholder="填写密码" ></el-input>
                                        <span class="font-gray ml20">6-20个字母、数字和特殊字符</span>
                                      </el-form-item>
                                  </div>
                                </li>
                                <li>
                                  <el-form-item prop="firstName">
                                    <div class="inline-block">姓名：</div>
                                    <el-input v-model="adminInfo.firstName" placeholder="姓名"></el-input>
                                  </el-form-item>
                                </li>
                                <li>
                                  <el-form-item  prop="email">
                                    <div class="inline-block">邮箱：</div>
                                    <el-input v-model="adminInfo.email" placeholder="邮箱"></el-input>
                                  </el-form-item>
                                </li>
                                <li>
                                  <div>
                                    <el-form-item>
                                      <div class="inline-block">电   话：</div>
                                      <el-input  v-model="adminInfo.mobile" placeholder="电话"></el-input>
                                    </el-form-item>
                                  </div>
                                </li>
                                <li>
                                <li>
                                  <el-form-item>
                                    <div class="inline-block">是否激活：</div>
                                    <el-switch
                                       v-model="adminInfo.isActive"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949"
                                       active-value="1"
                                       inactive-value="0" 
                                       style="margin-left:10px;">
                                     </el-switch>
                                  </el-form-item>
                                </li>

                                  <el-form-item  prop="recharge">
                                    <div class="inline-block" style="float:left">手动充值：</div>
                                    <el-input type="number" style="float:left" v-model.number="adminInfo.recharge" auto-complete="off" class="sbox">
                                        <template slot="append">元</template>
                                    </el-input>
                                    <!--<span class="font-gray ml20"></span>-->
                                  </el-form-item>
                                </li>
                                <li>
                                  <el-form-item prop="increaseBalance" style="margin-top:20px;">
                                    <div class="inline-block" style="float:left">手动增加：</div>
                                    <el-input type="number" style="float:left" v-model.number="adminInfo.increaseBalance" auto-complete="off"  class="sbox">
                                      <template slot="append">元</template>
                                    </el-input>
                                   
                                  </el-form-item>
                                </li>
                              </ul>
                              </el-form>
                            </div>

                            <div class="set_box2 tree_class">
                                <p class="f-black inline mr20 mbot20 recommend_h1">权限 </p>
                                <el-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                <el-checkbox-group v-model="adminRoleList" @change="handleCheckedCitiesChange">
                                <el-checkbox v-model="checked" v-for="(item,index) in roleList" :label="item.id" :key="index">{{item.roleName}}</el-checkbox>
                                </el-checkbox-group>

                            </div>
                            <ul class="sub_box">
<!--                               <li>
  <i>+</i>
  <span class="editbtn">保存并增加另一个</span>
</li>
<li>
  <i class="icon-edit"></i>
  <span class="editbtn">保存并继续编辑</span>
</li> -->
                              <li style="  background-color: #eb6100;color: #fff;cursor:pointer;border-radius:5px;" @click="submitForm('ruleForm')">
                                <i class="icon-edit"></i>
                                <span class="save">保存</span>
                              </li>
                            </ul>
                        </div>

                      </div>
                    </div>

                  </div>
            </div>
      </div>
      <!--修改密码-->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" size="tiny" custom-class="new new2">
        <el-form :model="form">
          <el-form-item label="您的新密码" :label-width="formLabelWidth">
            <el-input v-model="password"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="subUpdatePass">确 定</el-button>
        </div>
      </el-dialog>
  </section>
</template>
<script>
  import multiplechoicebar from '../../components/multiple/multiplechoicebar.vue'
  import datepickerbar from '../../components/datepicker/datepickerbar.vue'
  import {getAdminInfo,getRoleList,getAdminRoleInfo,addAdmin,updateAdmin,updateRole,adminRoleLists} from '../../service/getData'

  export default {
    components: {
      multiplechoicebar,
      datepickerbar
    },
    created(){
      this.getAdminInfoData();
      this.getRoleListData();
    },
    data() {
      return {
        dialogFormVisible2:false,
        isIndeterminate:false,
        password:null,
        checkAll:false,
        adminId:null,
        adminInfo:{
          userName:null,
          password:null,
          firstName:null,
          email:null,
          recharge:null,
          increaseBalance:null,
          isActive:"1",
          mobile:null,
        },
        roleList:null,
        roleTagList:[],
        adminRoleList:[],
        listLoading:false,
        rules: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          firstName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '电话不能为空', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
          ],
          recharge: [
            { type: 'number', message: '必须为整数' }
          ],
          increaseBalance: [
            { type: 'number', message: '必须为整数' }
          ],



        }
      };
    },
    computed:{

    },
    methods: {
      async getAdminInfoData() {
        let id = this.$route.query.id;
        if(id!=null){
          this.adminId = id;
          getAdminInfo(this.adminId).then((res) => {
            this.adminInfo = res.data;
            this.adminInfo.recharge = this.adminInfo.recharge/100;
            this.adminInfo.increaseBalance = this.adminInfo.increaseBalance/100;
            this.adminInfo.isActive = String(this.adminInfo.isActive);
            if(this.adminInfo.userName){
              getAdminRoleInfo(this.adminInfo.userName).then((res) => {
                let list = res.data.roleList;
                for(var item of list){
                    if(item.id !== undefined){
                      this.adminRoleList.push(item.id);
                    }
                 }
              });
            }
          });

        }
      },

      async getRoleListData(){
        let query = {pageNum:1,limit:1000};
        adminRoleLists().then((res) => {
          this.roleList = res.data;
          for(var item of this.roleList){
              if(item.id !== undefined){
                this.roleTagList.push(item.id);
              }
           }
        });
      },
      handleCheckAllChange(event){

        this.adminRoleList = event.target.checked ? this.roleTagList : [];
        this.isIndeterminate = false;
        console.log(this.adminRoleList);
      },
      handleCheckedCitiesChange(value){

          let checkedCount = value.length;
          this.checkAll = checkedCount === this.roleList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length;
      },
      submitForm(formName){

        this.$refs[formName].validate((valid) => {
             if (valid) {
                
                let result = {};
                let roleIds = this.adminRoleList;
                if(this.adminId!=null){
                  this.adminInfo.id = this.adminId;
                  this.adminInfo.isActive = parseInt(this.adminInfo.isActive);
                  delete(this.adminInfo.password);
                  updateAdmin(this.adminInfo).then((res) => {
                      if(res.status){
                        result.status = true;
                        updateRole({'userId':this.adminId,'roleIds':roleIds}).then((res) => {
                          if(res.status){
                              this.$message({
                                type: 'success',
                                message: '保存成功!'
                              });
                              this.$router.push({path:'/permission/adminList'});
                          }else{
                            this.$message({
                              type: 'info',
                              message:res.message
                            });
                          }
                        });
                      }else{

                          this.$message({
                            type: 'info',
                            message:res.message
                          });
                        
                      }
                  });
                }else{

                  addAdmin(this.adminInfo).then((res) => {
                      if(res.status){
                        result.status = true;
                        if(res.data!=null){
                          updateRole({'userId':res.data,'roleIds':roleIds}).then((res) => {
                            if(res.status){
                                this.$message({
                                  type: 'success',
                                  message: '保存成功!'
                                });
                                this.$router.push({path:'/permission/adminList'});
                            }else{
                              this.$message({
                                type: 'info',
                                message:result.message
                              });
                             
                            }
                          });
                        }else{
                          result.status = false;
                          result.message = "添加权限失败!";
                        }

                      }else{
                        this.$message({
                          type: 'info',
                          message:res.message
                        });
                      }
                  });

                }
                
             } else {
               this.$message({
                 type: 'info',
                 message:'表单未验证通过！'
               });
               return false;
             }
        });
      },
      subUpdatePass() {
          this.dialogFormVisible2 = false;
          let query = {};
          query.id = parseInt(this.$route.query.id);
          query.password = this.password;
          updateAdmin(query).then((res) => {
          this.listLoading = false;
          if(res.status){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message.error(res.message);
          }
        });
      },
    }
  };
</script>

<style>
  .modify-ul .inline-block{
    width: 100px;
  }
  .set_box2 .modify-ul .el-input__inner{
    width: 385px;
  }

  .el-select__tags{
    margin-left: 10px !important;
  }
  .admin_edit .el-input, .admin_edit .el-input__inner{
    width: auto;
  }
  .adminedit .el-form-item__error{
    margin-left: 120px;
  }
  .sbox input{
    width: 138px !important;
  }
  .tree_class .el-checkbox__inner{
    width: 14px;
    height: 14px;
  }
</style>
