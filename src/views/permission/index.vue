<template>
    <section class="wrapper">
        <!--金额流水展示-->
        <div class="row">
             <div class="col-lg-8">
                <div class="bg palr40">
                  <h2 class="inline mr20 f-black">认证和授权管理</h2><span class="f-grey op5">WMI ADMIN</span>
                  <ul class="useredit_box">
                    <li>
                      <div class="row">
                        <div class="col-lg-9">
                            <i class="icon-user appusericon f25"></i><span class="f20">用户</span>
                        </div>
                        <div class="col-lg-3">
                            <ul class="app_editbox">
                              <li><i>+</i><span class="ml10">增加</span></li>
                              <li @click='changepsd'><i class="icon-edit"></i><span class="ml10">修改</span></li>
                            </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-lg-9">
                          <i class="icon-group appusericon f25"></i><span class="f20">组</span>
                        </div>
                        <div class="col-lg-3">
                          <ul class="app_editbox">
                            <li @click='addusergroup'><i>+</i><span class="ml10">增加</span></li>
                            <li @click='changepsd'><i class="icon-edit"></i><span class="ml10"  >修改</span></li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
               <div class="bg palr40 appedituser mt10 rel clearfix">
                    <i class="icon-remove appclose fr mt20"></i>
                    <form>
                     <ul class="nameandpas">
                           <li>
                              <label class="col-lg-2 label-grey">用户昵称:</label>
                              <div class="col-lg-10"><input class="form-control" type="text" name="name" placeholder="请输入你的用户名"/></div>
                           </li>
                           <li>
                             <label class="col-lg-2 label-grey">管理密码:</label>
                             <div class="col-lg-10"><input class="form-control"  type="password" name="password" placeholder="请输入你要设置的密码,150个字符或者更少。包含字母，数字和仅有的@/./+/-/_符号。"/></div>
                           </li>
                           <li>
                             <label class="col-lg-2 label-grey">确认密码:</label>
                             <div class="col-lg-10"><input class="form-control"  type="password" name="password" placeholder="为了校验，请输入与上面相同的密码。"/></div>
                           </li>
                     </ul>
                     </form>
                     <p class="textright f-grey">首先，输入一个用户名和密码。然后，你就可以编辑更多的用户选项。</p>
                     <div class="fr mt20 mbot30">
                         <a class="btn btn-danger btn-lg border-radus0"> 保存并增加另一个 </a>
                         <a class="btn btn-danger btn-lg ml10 border-radus0"> 保 存 </a>
                     </div>

                </div>
              </div>
              <div class="col-lg-4">
                <div class="bg pa20">

                  <ul class="m-bot45">
                      <li  class="mt20 ml30"><div class="pd-10 borderb"><i class="icon-calendar mr20 f20"></i><span>最近动作</span></div></li>
                      <li class="mt20">
                          <i class="editicon">+</i>
                          <span class="ml10 inline">
                              <span class="block f-blue">admin2</span>
                              <span class="block">用户</span>
                          </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon icon-edit"></i>
                        <span class="ml10 inline">
                                <span class="block f-blue">admin11</span>
                                <span class="block">用户速度是多少</span>
                            </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon">+</i>
                        <span class="ml10 inline">
                                <span class="block f-blue">admin2</span>
                                <span class="block">用户</span>
                            </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon">+</i>
                        <span class="ml10 inline">
                                  <span class="block f-blue">admin1</span>
                                  <span class="block">用户试试</span>
                              </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon">+</i>
                        <span class="ml10 inline">
                                  <span class="block f-blue">是多少</span>
                                  <span class="block">多岁的</span>
                              </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon">+</i>
                        <span class="ml10 inline">
                                  <span class="block f-blue">admin2</span>
                                  <span class="block">用户</span>
                              </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon">+</i>
                        <span class="ml10 inline">
                                <span class="block f-blue">admin2</span>
                                <span class="block">用户</span>
                            </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon icon-edit"></i>
                        <span class="ml10 inline">
                                  <span class="block f-blue">admin11</span>
                                  <span class="block">用户速度是多少</span>
                              </span>
                      </li>
                      <li class="mt20">
                        <i class="editicon">+</i>
                        <span class="ml10 inline">
                                  <span class="block f-blue">admin2</span>
                                  <span class="block">用户</span>
                              </span>
                      </li>


                  </ul>
                </div>
              </div>

        </div>


    </section>
</template>

<script>
import {test} from '../../service/getData'
import tablebar from '../../components/tablebar/tablebar.vue'
import multiplechoicebar from '../../components/multiple/multiplechoicebar.vue'
//import tagbar from '../../components/tagbar/tagbar.vue'
export default {
  components: {
    multiplechoicebar
  },
  mounted () {
  },
  methods: {
    changepsd(){
      const h = this.$createElement;
      this.$msgbox({
        title: '密码修改',
        customClass:'changepsdbox',
        message: h('ul', null, [
          h('li', {style:'margin-bottom:20px'}, [
            h('span',  {style:'margin-left:2rem'}, '你的旧密码：'),
            h('input', {style:'width:400px;padding:5px 10px;'}, '请输入您的旧密码'),
          ]),
          h('li', {style:'margin-bottom:20px'}, [
            h('span', {style:'margin-left:2rem'}, '你的新密码：'),
            h('input', {style:'width:400px;padding:5px 10px;'}, '请输入您的新密码'),
            h('p', {class:'mm',style:'color:gray;text-indent:9rem;margin-top:10px;'}, '你的密码不能与其他个人信息太相似。'),
            h('p', {class:'mm',style:'color:gray;text-indent:9rem;margin-top:10px;'}, '你的密码必须包含至少 8 个字符。'),
            h('p', {class:'mm',style:'color:gray;text-indent:9rem;margin-top:10px;'}, '你的密码不能是大家都爱用的常见密码。'),
            h('p', {class:'mm',style:'color:gray;text-indent:9rem;margin-top:10px;'}, '你的密码不能全部为数字。'),
          ]),
          h('li', {style:'margin-bottom:20px'}, [
            h('span',  {style:'margin-left:2rem'}, '确认新密码：'),
            h('input', {style:'width:400px;padding:5px 10px;'}, '请输入您的新密码'),
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: '确认修改',
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
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
    addusergroup(){
      const h = this.$createElement;
      this.$msgbox({
        title: '增加组',
        customClass:'changepsdbox',
        message: h('ul', null, [
          h('li', {style:'margin-bottom:20px'}, [
            h('span',  {style:'margin-left:2rem'}, '添加组名：'),
            h('input', {style:'width:400px;padding:5px 10px;',placeholder:'请输入要添加的组名'}, null),
          ]),

          h('li', {style:'margin-bottom:20px'}, [
            h('span',  {style:'margin-left:2rem'}, '选择权限：'),
            h('multiplechoicebar', {style:'width:400px;padding:0;'}, ''),
          ]),
          h('li', {style:'margin-bottom:20px'}, [
            h('el-button',{style:'color:#fff;background-color:#eb6100;float:right;margin-right:45px;'},[
              h('span',null,'保 存')
            ]),
            h('el-button',{style:'color:#333;float:right;margin-right:15px;margin-left:0'},[
              h('i',{class:'icon-edit',style:'margin-right:5px;'},null),
              h('span',null,'保存并继续编辑')
            ]),
            h('el-button',{style:'color:#333;float:right;margin-right:15px;margin-left:0'},[
                h('i',{style:'margin-right:5px'},'+'),
                h('span',null,'保存并增加另一个')
            ])
          ])
        ]),
        showCancelButton: false,
        showConfirmButton: false,
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
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    }
  }

}
</script>

