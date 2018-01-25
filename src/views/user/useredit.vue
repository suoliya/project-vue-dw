<template>
  <section class="wrapper">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-20 clearfix">
                    <div class="user_header borderb clearfix mbot20">
                        <h1 class="f-black mr20 mbot20">编辑 / 修改用户</h1>
                        <ul class="userinfo-edit">
                            <li><span><i class="icon-list-alt"></i><span>历史</span></span></li>
                            <li><span><i class="icon-trash"></i><span>删除</span></span></li>
                        </ul>
                    </div>
                    <div class="row">
                      <div class="col-lg-1">
                        <div class="header_box fl">
                          <div class="img_box">

                            <img src="static/img/header.png" v-if="userInfo.headImgUrl==null" alt="">
                            <img :src="userInfo.headImgUrl" v-else alt="">
                          </div>
                          <p>{{}}</p>
                        </div>
                      </div>
                      <div class="col-lg-11">
                        <div class="fl ml55" style="width: 95%;">

                            <div class="set_box1">
                              <p class="f-black inline mr20 mbot20 recommend_h1">个人信息</p>
                              <ul class="modify-ul">
                                <li>
                                  <div class="inline-block">用户名：</div>
                                  <input type="text" :value="userInfo.username">
                                  <span class="font-gray ml20">必填。150个字符或者更少。包含字母，数字和仅有的@/./+/-/_符号。</span>
                                </li>
                                <li>
                                  <div class="inline-block">密码：</div>
                                  <input type="password"  value="*************" disabled/>
                                  <span class="font-gray ml20">原始密码不存储，所以没有办法看到这个用户的密码； <span style="color: #ce0000" @click="changepsd">修改密码 </span></span>
                                </li>
                                <li>
                                  <div class="inline-block">姓名：</div>
                                  <input type="text"  :value="userInfo.realname" />
                                </li>
                                <li>
                                  <div class="inline-block">Email：</div>
                                  <input type="text"  :value="userInfo.email" />
                                </li>
                              </ul>
                            </div>

                            <div class="set_box2">
                              <p class="f-black inline mr20 mbot20 recommend_h1">权限 </p>
                              <ul class="modify-ul">
                                  <li>
                                      <el-radio class="radio" v-model="radio" label="1" style="margin-left: 30px;">有效</el-radio>
                                      <p class="font-gray" style="margin-left: 73px">指明用户是否被认为活跃的。以反选代替删除帐号。</p>
                                  </li>
                                  <li>
                                      <el-radio class="radio" v-model="radio" label="2" style="margin-left: 30px;">职员状态</el-radio>
                                      <p class="font-gray" style="margin-left: 73px">指明用户是否可以登录到这个管理站点。</p>
                                  </li>
                                  <li>
                                    <el-radio class="radio" v-model="radio" label="3" style="margin-left: 30px;">超级用户状态</el-radio>
                                    <p class="font-gray" style="margin-left: 73px">指明该用户缺省拥有所有权限。</p>
                                  </li>
                                  <li>
                                    <div class="inline-block">用户组：</div>
                                    <multiplechoicebar style="width: 400px"></multiplechoicebar>
                                    <p class="font-gray" style="margin-left: 133px;margin-top: 10px;">该用户归属的组。一个用户将得到其归属的组的所有权限。</p>
                                  </li>
                                  <li>
                                    <div class="inline-block">用户权限：</div>
                                    <multiplechoicebar style="width: 400px"></multiplechoicebar>
                                  </li>
                              </ul>


                            </div>
                            <div class="set_box3">
                                <p class="f-black inline mr20 mbot20 recommend_h1">重要日期</p>
                                <ul class="modify-ul">
                                  <li>
                                    <div class="inline-block">上次登录：</div>
                                    <datepickerbar style="margin-right: 10px;"></datepickerbar>
                                    <el-time-select
                                      v-model="value1"
                                      :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                  }"
                                      placeholder="选择时间">
                                    </el-time-select>
                                  </li>
                                  <li>
                                    <div class="inline-block">加入日期：</div>
                                    <datepickerbar style="margin-right: 10px;"></datepickerbar>
                                    <el-time-select
                                      v-model="value1"
                                      :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                  }"
                                      placeholder="选择时间">
                                    </el-time-select>
                                   </li>

                                </ul>
                          </div>
                            <ul class="sub_box">
                              <li>
                                <i>+</i>
                                <span class="editbtn">保存并增加另一个</span>
                              </li>
                              <li>
                                <i class="icon-edit"></i>
                                <span class="editbtn">保存并继续编辑</span>
                              </li>
                              <li style="  background-color: #eb6100;color: #fff;">
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
  import {getUserInfo} from '../../service/getData'

  export default {
    components: {
      multiplechoicebar,
      datepickerbar
    },
    created(){
    this.getUserInfoData();
    },
    data() {
      return {
        activeName: 'second',
        radio: '1',
        userInfo:null,
        listLoading:false
      };
    },
    computed:{
      userid(){
        return this.$route.query.id;
      },
    },
    methods: {
      getUserInfoData() {
        this.listLoading = true;
        let id = this.userid;
        getUserInfo(id).then((res) => {
          this.userInfo = res.data;
          this.listLoading = false;
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
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
      }
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
</style>
