<template>
  <section class="wrapper">
      <div class="row">
            <div class="col-lg-12">
                  <div class="white-bg pd-20">
                    <h1 class="f-black inline mr20 mbot20">好友推荐设置</h1>
                    <div class="set_box1">
                        <p class="f-black inline mr20 mbot20 recommend_h1">推荐人数额</p>
                        <ul class="modify-ul">
                          <li>
                            <div class="inline-block">推荐奖金数额：</div>
                            <el-input-number v-model="setRecommendQuery.bonusSum"  :min="1" ></el-input-number>
                            <span class="ml20 font-gray">元</span>
                            <!-- <span class="unit-man">人</span> -->
                          </li>
                        </ul>
                    </div>

                    <div class="set_box2">
                      <p class="f-black inline mr20 mbot20 recommend_h1">被推荐人要求 </p>
                      <ul class="modify-ul">
                        <li>
                          <div class="inline-block">最少投注统计 ：</div>
                          <el-input-number v-model="setRecommendQuery.leastBetSum"  :min="1" ></el-input-number>
                          <span class="ml20 font-gray">最少投注额必填</span>
                        </li>
                        <li>
                          <div class="inline-block">取款条件：</div>
                          <el-input-number v-model="setRecommendQuery.leastDepositSum"  :min="1" ></el-input-number>
                          <span class="ml20 font-gray">最少投注额必填</span>
                        </li>
                        <li>
                          <div class="inline-block">最少存款统计 ：</div>
                          <el-input-number v-model="setRecommendQuery.leastWithdrawalsBetSum"  :min="1" ></el-input-number>
                          <span class="ml20 font-gray">从推荐日算起</span>
                        </li>

                      </ul>
                      <!--<button class="cancel-button"  @click="setCancel">取消</button>-->
                      <button class="submit-button ml20" @click="subRecommend">保存</button>
                    </div>

                  </div>
            </div>
      </div>
  </section>
</template>
<script>
import timeInput from '../../components/moudle/timeInput.vue'
import { marketUpdateFriend } from '../../service/getData'
import {getFormtDate,getDateToTimes } from '../../config/mUtils'

export default {
    components: {
      timeInput,
    },

    data() {
        return {
          setRecommendQuery: {
            bonusSum:1,
            leastBetSum:1,
            leastDepositSum:1,
            leastWithdrawalsBetSum:1,
          }
        }
    },
    methods: {

      subRecommend() {
        marketUpdateFriend(this.setRecommendQuery).then((res) => {
            if(res.status){
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
            }else{

              this.$message.error(res.message);
            }
        });
      },
      setCancel() {

        this.setRecommendQuery.bonusSum = 1;
        this.setRecommendQuery.leastBetSum = 1;
        this.setRecommendQuery.leastDepositSum = 1;
        this.setRecommendQuery.leastWithdrawalsBetSum = 1;
      }
      
    },
}

</script>
<style scoped>
  .el-input-number{width: auto;}
  .unit-man{left:2em;}
</style>