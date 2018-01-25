<template>
<div class="headerDlog">
	<header class="header sblue-bg white-font">
	      <div class="navtop-left fl">
         
         
       	  </div>
          <div @click="hideleftfunc" class="fl setnavbtn"><div class="santiao"></div></div>
	      <div class="top-nav">
	          <!--search & user info start-->
	          <ul class="nav pull-right top-menu topmenunew">
				  <!--<li>
	                  <a href="#"><div class="msgbox"><i class="icon-envelope"></i><span>站内消息提醒</span><span class="label label-danger pull-right mail-info fbg">2</span></div></a>
	              </li> -->
	              <li>
	                  <a href="javascript:void(0)" @click="dialogFormVisible=true"><div class="msgbox"><div class="locksvg"></div><span>密码管理</span></div></a>
	              </li>
	              <li>
	                  <a href="javascript:void(0)" @click="loginOut"><div class="msgbox"><div class="laout"></div><span>退出</span></div></a>
	              </li>
	          </ul>
	          <!--search & user info end-->


	      </div>
     
	  </header>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" size="small">
      <el-form class="small-space" :model="query" :rules="rules" ref="passForm" label-position="left" label-width="120px" style=' margin-left:50px;'>
          <el-form-item label="旧密码" prop="oldPassword">
              <el-input type="text" placeholder="旧密码" v-model="query.oldPassword" style="width: 250px"></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="newPassword">
              <el-input type="text" placeholder="新密码" v-model="query.newPassword" style="width: 250px"></el-input>
          </el-form-item>
<!--           <el-form-item label="确认密码" prop="newPasswordS">
              <el-input type="text" placeholder="新密码" v-model="query.newPasswordS" style="width: 250px"></el-input>
          </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button  type="primary" @click="updatePas('passForm')">确 定</el-button>
      </div>
    </el-dialog>

</div>
</template>

<script>

import {mapState, mapMutations} from 'vuex'
import {updateAdminPass} from '../../service/getData'
export default {
	data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.query.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible:false,
        query:{
          oldPassword :null,
          newPassword:null,
          /*newPasswordS:null*/
        },
        rules: {
          oldPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
            { min: 6, max: 26, message: '长度在 6 到 26 个字符', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { min: 6, max: 26, message: '长度在 6 到 26 个字符', trigger: 'blur' },
          ],
          newPasswordS: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 26, message: '长度在 6 到 26 个字符', trigger: 'blur' }
          ],
        },


      }
  	},
  	mounted(){
	    this.init()
	},
  	methods: {
  		...mapMutations([
  		    'DELETE_USERINFO',
  		]),
  		loginOut(){

	      this.DELETE_USERINFO();
	      this.$router.push({path:'/login'});

  		},
  		hideleftfunc(){
        var width = $(window).width();
  			if(!$("#sidebar").hasClass("on")){
  				$("#sidebar").css("width","45px");
  				$(".el-submenu__title").css("padding-left","10px");
  				$(".icon_nav6").parent("li").css("padding-left","10px");
  				$(".navtop-left .logo").hide();
          $("#main-content").css('margin-left', '45px');
  				$(".navtop-left").css({
  					"width":"45px",
  					"padding-left":"14px"
  				})
  				$("#sidebar").addClass("on");
  			}
  			else{
  				$(".el-submenu__title").css("padding-left","20px");
  				$(".icon_nav6").parent("li").css("padding-left","20px");
  				$(".navtop-left .logo").show();
          if(width>=1600){
            $("#main-content").css('margin-left', '224px');
            $(".navtop-left").css({
              "width":"224px",
              "padding-left":"24px"
            })
            $("#sidebar").css("width","224px");
          }
          else{
            $("#main-content").css('margin-left', '180px');
            $("#sidebar").css("width","180px");
            $(".navtop-left").css({
              "width":"180px",
              "padding-left":"24px"
            })
          }
  				
				$("#sidebar").removeClass("on");
  			}
  			
  			$(".user-box").toggle();
  		},
  		init(){
	        $("html").niceScroll();
	    },
      updatePas(formName){

        this.$refs[formName].validate((valid) => {
             if (valid) {
                updateAdminPass(this.query).then((res) => {
                    if(res.status){
                      this.$message({type: 'success',message: '保存成功!'});
                      this.DELETE_USERINFO();
                      this.$router.push({path:'/login'});
                    }else{
                      this.$message({type: 'info',message:res.message});
                    }
                });
                
              }else{

                this.$message({
                  type: 'info',
                  message:'表单未验证通过！'
                });
                return false;
              }
        });
      },
      resetForm(){
        this.dialogFormVisible = false;
        this.query = {
          oldPassword :null,
          newPassword:null,
          /*newPasswordS:null*/
        };

      }


  	}	
}
</script>
<style>
  .headerDlog .el-form-item{
    margin-bottom: 20px;
  }
</style>