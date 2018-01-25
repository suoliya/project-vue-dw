<style>
  .chartGameTo>div:first-child,.chartGameTo>div>canvas,.chartGameGo>div:first-child,.chartGameGo>div>canvas,.chart>div:first-child,.chart>canvas{
    width: 100% !important;
    height: auto;
  }
</style>
<template>
    <section class="wrapper">
        <!--金额流水展示-->
        <div class="row state-overview pan2">
            <div class="col-lg-2 col-sm-6 ">
                <section class="panel">
                    <router-link class="red-color" target = _blank :to="{path:'/home/todaynum',query: {'type':1,'typeName':'今日充值金额'}}">
                    <p class="red-color">今日充值金额</p>
                    <p class="red-color p3">{{ todayTotalMessage.todayChargeOrder/100 }}</p>
                    </router-link>
                </section>
            </div>
            <div class="col-lg-2 col-sm-6">
                <section class="panel">
                    <router-link class="green-color" target = _blank :to="{path:'/home/todaynum',query: {'type':2,'typeName':'今日提现金额'}}">
                    <p class="green-color">今日提现金额</p>
                    <p class="red-color p3">{{ todayTotalMessage.todayWithdraw/100 }}</p>
                    </router-link>
                </section>
            </div>
            <div class="col-lg-2 col-sm-6">
                <section class="panel">
                    <router-link class="red-color" target = _blank :to="{path:'/home/todaynum',query: {'type':3,'typeName':'今日转入流水'}}">
                    <p class="red-color">今日转入流水</p>
                    <p class="red-color p3">{{ todayTotalMessage.todayToGame/100 }}</p>
                    </router-link>
                </section>
            </div>
            <div class="col-lg-2 col-sm-6">
                <section class="panel">
                    <router-link class="gray-color" target = _blank :to="{path:'/home/todaynum',query: {'type':4,'typeName':'今日转出流水'}}">
                    <p class="gray-color">今日转出流水</p>
                    <p class="red-color p3">{{ todayTotalMessage.todayToMain/100 }}</p>
                    </router-link>
                </section>
            </div>
            <div class="col-lg-2 col-sm-6">
                <section class="panel">
                    <router-link class="red-color" target = _blank :to="{path:'/home/todaynum',query: {'type':5,'typeName':'今日活跃用户个数'}}">
                    <p class="red-color">今日活跃用户个数</p>
                    <p class="red-color p3">{{ todayTotalMessage.todayLogin }}</p>
                    </router-link>
                </section>
            </div>
            <div class="col-lg-2 col-sm-6">
                <section class="panel">
                    <router-link class="blue-color" target = _blank :to="{path:'/home/todaynum',query: {'type':6,'typeName':'今日用户注册'}}">
                    <p class="blue-color">今日用户注册</p>
<!--                     <p class="datep p2">{{ nowDay }}</p>
 -->                    <p class="red-color p3">{{ todayTotalMessage.todayReg }}</p>
                    </router-link>
                </section>
            </div>
        </div>
        <!--金额流水展示 end-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <ul class="select_tj fl">
                        <li v-for="(item,index) in tabTpyeList" class="select_tj_li" :class="{active:(tabTypeIndex==index)}" @click="tabTypeClick(index,item.title)">{{ item.title }}</li>
                    </ul>
                    <datepickerbar ref="datepick" class="fr datepick datesmall1300" style="width:390px" v-bind:timeArea="timeset" @timeValue="pickTime"></datepickerbar>

                    <div class="fr">
                        <ul class="select_date">
                            <li v-for="(item,index) in tabTimeList" :class="{active:(tabTimeIndex==index)}" @click="tabTimeClick(index)">{{ item.title }}</li>
                        </ul>
                    </div>
                    <div class="panel-body">
                        <div id="hero-graph" class="graph">
                            <chartline :chartData="chartMainData" :chartType="tabType" :chartName="tabName"></chartline>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <section class="panel">
                    <header class="panel-heading">
                        游戏转入流水

                        <ul class="fr mr20 homeindexicon">

                            <li>
                              <i class="icon-wrench2" @click="handleChartGame('to')"></i>
                            </li>

                        </ul>
                    </header>
                    <div class="panel-body">
                        <div id="hero-area" class="graph">
                            <chartline-game-to :chartDataPt="today_chartDataPtTo" :chartDataNt="today_chartDataNtTo" :chartDataMg="today_chartDataMgTo"></chartline-game-to>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-lg-6">
                <section class="panel">
                    <header class="panel-heading">
                        游戏转出流水
                        <ul class="fr mr20 homeindexicon">

                          <li>
                            <i class="icon-wrench2" @click="handleChartGame('go')"></i>
                          </li>

                        </ul>
                    </header>
                    <div class="panel-body">
                        <div id="hero-donut" class="graph">
                            <chartline-game-go :chartDataPt="today_chartDataPtGo" :chartDataNt="today_chartDataNtGo" :chartDataMg="today_chartDataMgGo"></chartline-game-go>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <el-dialog :title="chartGametypeName" :visible.sync="dialogFormVisible" width="90%" class="gameline">
            <div class="row">
                <div class="col-lg-12">
                    <section class="panel">
                        <datepickerbar ref="datepick" class="fr datepick" @timeValue="gamePickTime" v-bind:timeArea="gametimeset" style="width:390px"></datepickerbar>
                        <div class="fr">
                            <ul class="select_date">
                                <li v-for="(item,index) in tabTimeList" :class="{active:(gameTimeIndex==index)}" @click="gameTimeClick(index)">{{ item.title }}</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <section class="panel">
                        <div class="panel-body">
                            <div id="hero-donut" class="graph">
                            <chartline-game-to v-if="chartGametype=='to'" :id="chartGameId" :chartDataPt="chartDataPtTo" :chartDataNt="chartDataNtTo" :chartDataMg="chartDataMgTo"></chartline-game-to>
                            <chartline-game-go v-else="chartGametype=='go'" :id="chartGameId" :chartDataPt="chartDataPtGo" :chartDataNt="chartDataNtGo" :chartDataMg="chartDataMgGo"></chartline-game-go>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {todayTotal,chartCharge,chartWithdraw,chartCustomerMau,chartCustomer,chartToGame,chartToMain,chartPtGamgeTo,chartNtGamgeTo,chartMgGamgeTo,chartPtGamgeGo,chartNtGamgeGo,chartMgGamgeGo} from '../../service/getData'
import chartline from '../../components/chart/chartline.vue'
import chartlineGameTo from '../../components/chart/chartlineGameTo.vue'
import chartlineGameGo from '../../components/chart/chartlineGameGo.vue'
import {getFormtDate,getTimeDate,getTimeTmpDay} from '../../config/mUtils'
import datepickerbar from '../../components/moudle/datepickerbar.vue'


export default {
  components: {
    chartline,
    chartlineGameTo,
    chartlineGameGo,
    datepickerbar
  },
  created(){
    this.todayTotalMes();
    this.chartMainChange();
    this.defaultGamePame();
  },
  mounted () {
    this.todayTotalMes();
    this.chartMainChange();
    this.defaultGamePame();
  },
  data() {
    return {
        tabTypeIndex:0,
        timeData:null,
        game_timeData:null,
        tabTpyeList:[
            {title:'充值金额'},
            {title:'提现金额'},
            /*{title:'活跃用户趋势'},*/
            {title:'游戏平台资金转入'},
            {title:'游戏平台资金转出'}
        ],
        tabTimeList:[
            {title:'今天'},
            {title:'前一天'},
            {title:'后一天'},
            {title:'一周'},
            {title:'一个月'}
        ],
        tabTimeIndex:0,
        lineType:null,
        lineTimeQuery:{
            begin_date: null,
            end_date: null
        },
        chartMainData:null,
        chartMainFun:null,
        tabType:1,
        tabName:'充值金额',
        chartDataPtTo:null,
        chartDataNtTo:null,
        chartDataMgTo:null,
        chartDataPtGo:null,
        chartDataNtGo:null,
        chartDataMgGo:null,
        today_chartDataPtTo:null,
        today_chartDataNtTo:null,
        today_chartDataMgTo:null,
        today_chartDataPtGo:null,
        today_chartDataNtGo:null,
        today_chartDataMgGo:null,
        dialogFormVisible: false,
        chartGametypeName:null,
        chartGametype:null,
        chartGameId:null,
        gameTimeIndex:0,
        todayTotalMessage:null,
        timeset:null,
        gametimeset:null,
    }
  },
  computed: {
     nowDay() {

        let nowdate = new Date();
        return getFormtDate(nowdate, "yyyy/MM/dd");
     }

  },
  methods: {
        todayTotalMes() {
           todayTotal().then((res) => {
               if(res.status == true){
                   this.todayTotalMessage = res.data;
               }else{

                   this.$message.error('首页统计数据失败');
               }
           })

        },
        chartMainChange(index=1) {
            if(index==1){
                this.chartMainTimeChange();//时间函数比较重要，必须放到前面
                this.chartMainTypeChange();

            }else{

                this.chartMainTypeChange();
            }
            this.chartMainFun.then((res) => {
                if(res.data!=''&&res.data!=null){
                    this.chartMainData = res.data;

                }else{

                  this.$message.error('趋势图载入失败');
                }
            });


        },
        chartGameToChange(query,p) {
            chartPtGamgeTo(query).then((res)=>{
                this.chartDataPtTo = res.data;
                if(p==0){
                    this.today_chartDataPtTo = this.chartDataPtTo;
                }
            });
            chartNtGamgeTo(query).then((res)=>{
                this.chartDataNtTo = res.data;
                if(p==0){
                    this.today_chartDataNtTo = this.chartDataNtTo;
                }
            });
            chartMgGamgeTo(query).then((res)=>{
                this.chartDataMgTo = res.data;
                if(p==0){
                    this.today_chartDataMgTo = this.chartDataMgTo;
                }
            });
        },
        chartGameGoChange(query,p) {
            chartPtGamgeGo(query).then((res)=>{
                this.chartDataPtGo = res.data;
                if(p==0){
                    this.today_chartDataPtGo = this.chartDataPtGo;
                }
            });
            chartNtGamgeGo(query).then((res)=>{
                this.chartDataNtGo = res.data;
                if(p==0){
                    this.today_chartDataNtGo = this.chartDataNtGo;
                }
            });
            chartMgGamgeGo(query).then((res)=>{
                this.chartDataMgGo = res.data;
                if(p==0){
                    this.today_chartDataMgGo = this.chartDataMgGo;
                }
            });
        },
        chartGameChange(query,p) {
            this.chartGameGoChange(query,p);
            this.chartGameToChange(query,p);
        },
        chartMainTypeChange() {
            if(this.tabTypeIndex == 0){
                this.chartMainFun = chartCharge(this.lineTimeQuery);
                this.tabType = 1;
            }else if(this.tabTypeIndex == 1){
                this.chartMainFun = chartWithdraw(this.lineTimeQuery);
                this.tabType = 1;
            }/*else if(this.tabTypeIndex == 2){
                this.chartMainFun = chartCustomerMau(this.lineTimeQuery);
                this.tabType = 2;
            }*/else if(this.tabTypeIndex == 2){
                this.chartMainFun = chartToGame(this.lineTimeQuery);
                this.tabType = 1;
            }else if(this.tabTypeIndex == 3){
                this.chartMainFun = chartToMain(this.lineTimeQuery);
                this.tabType = 1;
            }
        },
        chartMainTimeChange() {

            let nowdate = new Date();
            let nowtime = getFormtDate(nowdate, "yyyy-MM-dd");
            if(this.tabTimeIndex == 0){
                this.timeData = nowdate;
                this.lineTimeQuery.begin_date = nowtime;
                this.lineTimeQuery.end_date = nowtime;
            }else if(this.tabTimeIndex == 1){

                this.timeData.setTime(this.timeData.getTime()-24*60*60*1000);
                this.lineTimeQuery.end_date = getFormtDate(this.timeData,"yyyy-MM-dd");
                this.lineTimeQuery.begin_date = this.lineTimeQuery.end_date;
                let times = this.timeData;
                this.getTimeArea(times);

            }else if(this.tabTimeIndex == 2){
                this.timeData.setTime(this.timeData.getTime()+24*60*60*1000);
                this.lineTimeQuery.end_date = getFormtDate(this.timeData,"yyyy-MM-dd");
                this.lineTimeQuery.begin_date = this.lineTimeQuery.end_date;
                let timeTmp = getTimeTmpDay(nowtime,this.lineTimeQuery.end_date);
                if(timeTmp>0){
                    this.$message.error('选择时间不能大于当天!');
                    this.timeData = nowdate;
                    this.lineTimeQuery.begin_date = nowtime;
                    this.lineTimeQuery.end_date = nowtime;
                }
                let times = this.timeData;
                this.getTimeArea(times);
            }else if(this.tabTimeIndex == 3){
                this.lineTimeQuery.end_date = nowtime;
                nowdate.setTime(nowdate.getTime()-24*60*60*7*1000);
                this.lineTimeQuery.begin_date = getFormtDate(nowdate,"yyyy-MM-dd");
            }else if(this.tabTimeIndex == 4){
                this.lineTimeQuery.end_date = nowtime;
                nowdate.setTime(nowdate.getTime()-24*60*60*30*1000);
                this.lineTimeQuery.begin_date = getFormtDate(nowdate,"yyyy-MM-dd");

            }
        },
        tabTypeClick(index,name) {

            this.tabTypeIndex = index;
            this.tabName = name;
            this.chartMainChange();

        },
        tabTimeClick(index) {
            this.tabTimeIndex = index;
            this.chartMainChange();

        },
        pickTime(time) {
            if(time!=null){
                let nowdate = new Date();
                let nowtime = getFormtDate(nowdate, "yyyy-MM-dd");
                let time1 = getFormtDate(time[0],"yyyy-MM-dd");
                let time2 = getFormtDate(time[1],"yyyy-MM-dd");
                let timeTmp = getTimeTmpDay(time1,time2);
                if(timeTmp<0){
                    this.$message.error('不能选择小于一天的数');
                }else if(timeTmp>30){
                    this.$message.error('不能选择大于一个月');

                }else if(getTimeTmpDay(nowtime,time1)>0){

                    this.$message.error('开始时间不能大于当天');
                }else if(getTimeTmpDay(nowtime,time2)>0){

                    this.$message.error('截止时间不能大于当天');
                }else{
                    this.lineTimeQuery.begin_date = time1;
                    this.lineTimeQuery.end_date = time2;
                    this.chartMainChange(2);
                }
            }
        },
        defaultGamePame() {
            let nowdate = new Date();
            let lineQuery = {};
            lineQuery.end_date = getFormtDate(nowdate, "yyyy-MM-dd");
/*            nowdate.setTime(nowdate.getTime()-24*60*60*7*1000);
            lineQuery.begin_date = getFormtDate(nowdate,"yyyy-MM-dd");*/
            lineQuery.begin_date  = lineQuery.end_date;
            this.chartGameChange(lineQuery,0);
        },
        handleChartGame(p) {
            this.dialogFormVisible = true;
            this.chartGametype = p;
            if(p == 'to'){
                this.chartGametypeName = "游戏转入流水";
                this.chartGameId = "chartGameToChangeId";
            }else{
                this.chartGametypeName = "游戏转出流水";
                this.chartGameId = "chartGameGoChangeId";
            }
            this.gameTimeClick(0);
        },
        returnQuery(index) {
            let nowdate = new Date();
            let nowtime = getFormtDate(nowdate, "yyyy-MM-dd");
            let query = {};
            if(index == 0){
                this.game_timeData = nowdate;
                query.begin_date = nowtime;
                query.end_date = nowtime;
            }else if(index == 1){

                this.game_timeData.setTime(this.game_timeData.getTime()-24*60*60*1000);
                query.end_date = getFormtDate(this.game_timeData,"yyyy-MM-dd");
                query.begin_date = query.end_date;
                let times = this.game_timeData;
                this.getGameTimeArea(times);
            }else if(index == 2){
                this.game_timeData.setTime(this.game_timeData.getTime()+24*60*60*1000);
                query.end_date = getFormtDate(this.game_timeData,"yyyy-MM-dd");
                query.begin_date = query.end_date;
                let timeTmp = getTimeTmpDay(nowtime,query.end_date);
                if(timeTmp>0){
                    this.$message.error('选择时间不能大于当天!');
                    this.game_timeData = nowdate;
                    query.begin_date = nowtime;
                    query.end_date = nowtime;
                }
                let times = this.game_timeData;
                this.getGameTimeArea(times);
            }else if(index == 3){
                query.end_date = nowtime;
                nowdate.setTime(nowdate.getTime()-24*60*60*7*1000);
                query.begin_date = getFormtDate(nowdate,"yyyy-MM-dd");
            }else if(index == 4){
                query.end_date = nowtime;
                nowdate.setTime(nowdate.getTime()-24*60*60*30*1000);
                query.begin_date = getFormtDate(nowdate,"yyyy-MM-dd");

            }

            return query;
        },
        gameTimeClick(index) {
            this.gameTimeIndex = index;
            let query = this.returnQuery(index);
            if(this.chartGametype == 'to'){
                 this.chartGameToChange(query);
            }else if(this.chartGametype == 'go'){
                this.chartGameGoChange(query);

            }

        },
        gamePickTime(time) {
            if(time!=null){
                let nowdate = new Date();
                let nowtime = getFormtDate(nowdate, "yyyy-MM-dd");
                let time1 = getFormtDate(time[0],"yyyy-MM-dd");
                let time2 = getFormtDate(time[1],"yyyy-MM-dd");
                let timeTmp = getTimeTmpDay(time1,time2);
                let query = {};
                if(timeTmp<0){
                    this.$message.error('不能选择小于一天的数');
                }else if(timeTmp>30){
                    this.$message.error('不能选择大于一个月');

                }else if(getTimeTmpDay(nowtime,time1)>0){

                    this.$message.error('开始时间不能大于当天');
                }else if(getTimeTmpDay(nowtime,time2)>0){

                    this.$message.error('截止时间不能大于当天');
                }else{
                    query.begin_date = time1;
                    query.end_date = time2;
                    if(this.chartGametype == 'to'){
                         this.chartGameToChange(query);
                    }else if(this.chartGametype == 'go'){
                        this.chartGameGoChange(query);

                    }
                }
            }
        },
        getTimeArea(times){
            if(times==null) times = new Date();
            let nowyear=parseInt(times.getFullYear());
            let nowmonth=parseInt(times.getMonth());
            let nowday=parseInt(times.getDate());
            this.timeset = [new Date(nowyear,nowmonth,nowday,0,0,0), new Date(nowyear,nowmonth,nowday,23,59,59)];
        },
        getGameTimeArea(times){
            if(times==null) times = new Date();
            let nowyear=parseInt(times.getFullYear());
            let nowmonth=parseInt(times.getMonth());
            let nowday=parseInt(times.getDate());
            this.gametimeset = [new Date(nowyear,nowmonth,nowday,0,0,0), new Date(nowyear,nowmonth,nowday,23,59,59)];
        },

  }
}
</script>
<style scope="scope">
    .datepick .el-date-editor--datetimerange.el-input{
        width: 200px;
    }
    .select_tj .select_tj_li:after{
        content: '';
        position: absolute;
        width: 1px;
        height: 20px;
        background-color: #c5c5c5;
        right: -10px;
    }

    .select_tj .select_tj_li:last-child:after{
        height: 0;
    }
    .gameline .el-dialog__header{
        padding: 15px 10px 0;
    }
    @media screen and (max-width: 1480px) {
        .row {
          padding-right: 10px;
        }

        .gameline .el-dialog__body{
            padding: 0px 10px;
        }

        .gameline .panel{
            margin-top: 0px;
            padding: 10px 10px !important; ;
        }
        .gameline .panel-body{
            margin-top: 10px;
            padding: 0px 10px;
        }

    }

</style>
