
<template>
	<div class="contain logincontent">
		<div class="mapbox">
			<img src="static/img/loginmap.png" class="fadeInLeft animated" alt="">
		</div>
		<div class="loginbox clearfix">
			<div class="fl leftimgbox rel">
				<img src="static/img/loginfont.png" class="loginfont bounceInDown animated" alt="">
				<img  class="loginquan fadeIn animated" src="static/img/loginquan.png" alt="">
				<img  class="yun bounceInUp animated" src="static/img/loginyun.png" alt="">
			</div>
			<div class="logininfobox fr">
				<img src="static/img/logink.png">
				<el-form ref="form" :model="form" label-width="0" style="width: 80%;margin-left: 10%;">
					<el-form-item label="" style="margin-bottom: 25px;">
				    	<el-input v-model="form.userName" placeholder="用户名"></el-input>
				  	</el-form-item>
				  	<el-form-item label="">
				    	<el-input type="password" v-model="form.password" placeholder="密码"></el-input>
				  	</el-form-item>
				  	<el-form-item>
					    <el-button type="primary" @click="submitForm">登 录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
	
</template>
<script>
import {adminLogin} from '../../service/getData'
import {mapState, mapMutations} from 'vuex'

export default {
	data() {
      return {
        form: {
          userName: '',
          password:''
        },
      }
  	},
  	methods: {
  		...mapMutations([
  		    'RECORD_USERINFO',
  		]),
  		submitForm(){
  			adminLogin(this.form).then((res) => {
  			    if(res.data!=''&&res.data!=null){

  			      this.$message({
  			        message: '登录成功!',
  			        type: 'success'
  			      });
  			      let url = this.$route.query.Rurl;
  			      if (url == null) url ='/';
  			      this.RECORD_USERINFO(res.data);
  			      this.$router.push({path:url});
  			    }else{

  			      this.$message.error(res.message);
  			    }
  			});
  		}
  	}	
}
</script>

<style type="text/css">
body{
	background-color: #fff;
}
</style>

