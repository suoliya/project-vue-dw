<template>
  <section class="wrapperDetail admin_edit">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-30 clearfix">
                    <div class="user_header borderb clearfix mbot20">
                        <h1 class="f-black mr20 mbot20">编辑 / 修改角色</h1>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="fl ml55" style="width: 95%;">

                            <div class="set_box1 adminedit">
                              <el-form  :model="roleInfo"  :rules="rules" ref="ruleForm">

                              <p class="f-black inline mr20 mbot20 recommend_h1">角色信息</p>
                              <ul class="modify-ul">
                                <li>
                                  <el-form-item  prop="roleCode">
                                    <div class="inline-block">角色编码：</div>
                                    <el-input v-model="roleInfo.roleCode" class="unewinput"></el-input>
                                    <span class="font-gray">必填。包含字母，数字。</span>
                                  </el-form-item>
                                  
                                </li>
                                <li>
                                  <el-form-item  prop="roleName">
                                    <div class="inline-block">角色名称：</div>
                                    <el-input v-model="roleInfo.roleName"  class="unewinput"></el-input>
                                    <span class="font-gray">必填。包含字母，数字，汉字。</span>
                                  </el-form-item>
                                </li>
                                <li>
                                  <el-form-item prop="type">
                                    <div class="inline-block">类型：</div>
                                    <el-select v-model="roleInfo.type" placeholder="请选择" class="roledit_in">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </li>

                              </ul>
                              </el-form>
                            </div>
                            
                            <div class="set_box2 tree_class">
                                <p class="f-black inline mr20 mbot20 recommend_h1">角色添加权限 </p>
                                <el-tree
                                  :data="powerList"
                                  show-checkbox
                                  node-key="id"
                                  :default-expanded-keys="myselectList"
                                  :default-checked-keys="myselectList"
                                  :props="defaultProps" 
                                  @check-change="setSelectList" 
                                  ref="tree">
                                </el-tree>

                            </div>
                            <ul class="sub_box">
                              <li style="  background-color: #eb6100;color: #fff;cursor:pointer;" @click="submitForm('ruleForm')">
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
  </section>
</template>
<script>
  import multiplechoicebar from '../../components/multiple/multiplechoicebar.vue'
  import datepickerbar from '../../components/datepicker/datepickerbar.vue'
  import {getRoleInfo,updateRole,PowerList,rolePowerList,updateRoleInfo,updateRolePower,addRole} from '../../service/getData'
  import {removeAryItem} from '../../config/mUtils'
  export default {
    components: {
      multiplechoicebar,
      datepickerbar
    },
    created(){
      this.getRoleInfoData();
      this.getPowerList();
    },
    data() {
      return {
        powerList:null,
        checkAll:true,
        roleId:null,
        roleInfo:{
          roleName:null,
          roleCode:null,
          type:1,
        },
        roleList:null,
        roleTagList:[],
        adminRoleList:[],
        listLoading:false,
        options:[
          {'label':'普通角色','value':1},
          {'label':'管理角色','value':2},
          {'label':'系统角色','value':3},
          {'label':'其他角色','value':4},
        ],
        rules: {
          roleName: [
            { required: true, message: '角色编码不能为空', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
          ],
          roleCode: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
          ],

        },
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        selectList:[],
        myselectList:[],
      };
    },
    computed:{

    },
    methods: {
      async getRoleInfoData() {
        let id = this.$route.query.id;
        if(id!=null){
          this.roleId = id;
          let roleres = await getRoleInfo(this.roleId);
          if(roleres.status){
            this.roleInfo = roleres.data;
          };
         
          let query = {};
          query.limit = 1000;
          query.pageNum = 1;
          query.roleId = parseInt(this.roleId);
          let powlistres = await rolePowerList(query);
          if(powlistres.status){
            let list = powlistres.data.list;
            for(var item of list){
              if(item.resId !== undefined){
                this.myselectList.push(item.resId);
              }
            }
          };
        }
        this.getPowerList();
      },

      async getPowerList(){
        let res = await PowerList();
        if(res.status) {
          this.powerList = res.data;
        };
      },
      setSelectList(ary,is,c){
        this.myselectList = [];
        let list =this.$refs.tree.getCheckedNodes();
        for (var i = 0; i < list.length; i++) {
            this.myselectList.push(list[i].id);

            if(list[i].pid!=-1){
              if(this.myselectList.indexOf(list[i].pid)==-1){
                  this.myselectList.push(list[i].pid);
              }
            }
        }
      },

      submitForm(formName){

        this.$refs[formName].validate((valid) => {
             if (valid) {
                
                let result = {};
                let resIds = this.myselectList;
                if(this.roleId!=null){
                  this.roleInfo.id = parseInt(this.roleId);
                  updateRoleInfo(this.roleInfo).then((res) => {
                      if(res.status){
                        result.status = true;
                        updateRolePower({'roleId':this.roleId,'resIds':resIds}).then((r) => {
                            if(r.status){
                              this.$message({type: 'success',message: '保存成功!'});
                              this.$router.push({path:'/permission/roleList'});
                            }else{
                              this.$message({type: 'info',message:r.message});
                            }
                        });

                      }else{
                        this.$message({type: 'info',message:res.message});
                      }
                  });
                  
                }else{
                  this.roleInfo.pid = -1;
                  addRole(this.roleInfo).then((res) => {
                      if(res.status){
                        result.status = true;
                        if(res.data!=null){
                          updateRolePower({'roleId':res.data,'resIds':resIds}).then((r) => {
                              if(r.status){
                                this.$message({type: 'success',message: '保存成功!'});
                                this.$router.push({path:'/permission/roleList'});
                                
                              }else{
                                this.$message({type: 'info',message:r.message});

                              }
                          });
                        }else{
                          this.$message({type: 'info',message:'添加权限失败！'});
                        }

                      }else{
                        this.$message({type: 'info',message:res.message});
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
  .unewinput input{
    width: 210px !important;
    margin-right: 10px;
  }
  .el-tree-node__children .el-tree-node__content{
    float: left;
    margin-left: 5px;
  }
  .roledit_in{
    width:220px;
  }
   .admin_edit .roledit_in .el-input__inner{
    width: 210px;
   }
   .tree_class .el-checkbox__inner{
     width: 14px;
     height: 14px;
   }
</style>
