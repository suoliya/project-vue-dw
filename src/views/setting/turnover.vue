<template>
  <section class="wrapper">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20">补偿金额设置</h1>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="补偿金设置" name="first">
                          <ul class="modify-ul">
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>补偿金额设置：</div>
                                <input type="text" value="" />
                              </li>
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>补偿金额比例：</div>
                                <input type="text" placeholder="1">
                              </li>
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>补偿金额上限：</div>
                                <input type="text" placeholder="100"/>
                              </li>
                          </ul>
                          <button class="submit-button">保存</button>
                          <button class="cancel_button">取消</button>
                      </el-tab-pane>
                      <el-tab-pane label=" 免稽核额度设置" name="second">
                          <ul class="modify-ul">
                              <li>
                                <div class="inline-block"><i class="keyinput">*</i>补偿金额设置：</div>
                                <input type="text" placeholder="停用">
                                <button class="submit-button mrgL10">保存</button>
                              </li>
                          </ul>
                      </el-tab-pane>
                      <el-tab-pane label="普通存款流水倍数设置" name="third">
                          <ul class="modify-ul">
                            <li>
                              <div class="inline-block"><i class="keyinput">*</i>存款X：</div>
                              <input type="text" placeholder="1">
                              <button class="submit-button mrgL10">保存</button>
                            </li>
                          </ul>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
            </div>
      </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'third'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style scoped>
    .cancel_button {
        padding: 5px 40px;
        background-color: #ccc;
        color: #fff;
        border: 0;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .mrgL10 {margin-left: 20px;}
</style>
