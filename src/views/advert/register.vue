<template lang="html">
    <section class="wrapper">
        <el-row class="bg-white" style="margin-left:5px;margin-right:5px;">
          <el-col :span="12" class="header_dl">
              <h3>代理系统注册</h3>
          </el-col>
            <el-col :span="12" class="content_dl">
                <el-form :label-position="labelPosition" label-width="100px" :model="registerForm" :rules="rules" ref="registerForm">
                    <el-col :span="8">
                        <el-form-item label="用户名：" prop="account" required>
                          <el-input v-model="registerForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="password" required>
                          <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名：" prop="name" required>
                          <el-input v-model="registerForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="生日：" prop="birthday" required>
                          <el-date-picker
                            @change="setBirthdayDate"
                            class="birthday"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder=""
                            v-model="birthdayDate"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="公司：">
                            <el-input v-model="registerForm.compay"></el-input>
                        </el-form-item>
                        <el-form-item label="网站：">
                            <el-input v-model="registerForm.website"></el-input>
                        </el-form-item>
                        <el-form-item label="微信：">
                            <el-input v-model="registerForm.wechart"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请码：">
                            <el-input v-model="registerForm.parentagent"></el-input>
                        </el-form-item>
                        <el-form-item>
                           <el-button type="warning" @click="submitBtn()" style="width:100%;">保存</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-form-item label="电子邮箱：" prop="email" required>
                          <el-input v-model="registerForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：" prop="checkpass" required>
                          <el-input type="password" v-model="registerForm.checkpass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别：" prop="sex" required>
                            <el-select placeholder="" v-model="registerForm.sex" style="width:100%;">
                                <el-option label="女" value="0"></el-option>
                                <el-option label="男" value="1"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="行业：">
                          <el-input v-model="registerForm.industry"></el-input>
                        </el-form-item>
                        <el-form-item label="电话：" required>
                          <el-input v-model="registerForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编：">
                          <el-input v-model="registerForm.zipcode"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ：">
                          <el-input v-model="registerForm.qq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import {registerList} from '../../service/getData'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkpass !== '') {
            this.$refs.registerForm.validateField('checkpass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
            labelPosition: 'right',
            birthdayDate:'',
            registerForm: {
              account: '',
              password: '',
              checkpass:'',
              email: '',
              birthday:'',
              sex:'',
              phone:'',
              compay:'',
              industry:'',
              zipcode:'',
              county:'',
              website:'',
              wechart:'',
              qq:'',
              name:'',
              money:'',
              parentagent:'',
            },
            rules:{
                account:[
                    {required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password:[
                    {validator: validatePass, trigger: 'blur' }
                ],
                checkpass:[
                    {validator: validatePass2, trigger: 'blur' }
                ],
                email:[
                    {required: true, message: '请输入您的邮箱', trigger: 'blur' }
                ],
                birthday:[
                    // {required: true, message: '请输入您的生日', trigger: 'blur' }
                ],
                sex:[
                    {required: true, message: '请选择您的性别', trigger: 'change' }
                ],
                phone:[
                    {required: true, message: '请输入您的电话', trigger: 'blur' }
                ],
                name:[
                    {required: true, message: '请输入姓名', trigger: 'blur' }
                ]

            },

        }
    },
    mounted(){

    },
    methods:{
        setBirthdayDate(val){
            console.log(val);
            this.birthdayDate = val;
        },
        submitBtn () {
            let time = Date.parse(new Date(this.birthdayDate));
            this.registerForm.birthday = time/1000;
            console.log(this.registerForm.birthday);
            this.$refs.registerForm.validate((valid) => {
              if (valid) {
                  let para = Object.assign({}, this.registerForm);
                  registerList(para).then((res) => {
                      if(res.code == 0){
                          this.$message({
                              type: 'success',
                              message: '注册成功！',
                         });
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
    },
}
</script>

<style scoped>
    .bg-white{
        background-color: #fff;
    }
    .header_dl{
        width: 92%;
        margin:0 30px;
        margin-left: 20px;
        border-bottom:1px solid #D8D5D0;
    }
    .header_dl>h3{
        /*padding-top:10px;*/
        padding-bottom: 10px;
        font-size: 20px;
        color: #333;
    }
    .content_dl{
        width: 90%;
        /*margin-top: 20px;*/
        margin-left: 8%;
    }
    label{
        font-weight: normal !important;
    }
    .birthday{
        width: 100% !important;
    }
    .el-form-item{
        margin-top: 25px !important;
    }
</style>
