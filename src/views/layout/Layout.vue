
<template>
	<section id="container" class="">
    <navbar></navbar>
    <sidebar :barlist='menuList'></sidebar>
		<section id="main-content">
			<router-view></router-view>
		</section>
	</section>
</template>

<script >
import {getStore} from '../../config/mUtils'
import navbar from '../../components/navbar/navbar.vue'
import sidebar from '../../components/sidebar/sidebar.vue'
  export default {
    data() {
      return {
        //先期开发左侧导航列表写死在layout里，后期权限以后全部接口获得存储在store里，url暂定为当前名字，开人员修改可以修改当前data，然后在router的index文件里进行配置
        sidebarlist:[
          {title:'首页',url:'home',icon:'icon_nav1'},
          {title:'权限管理',url:'permission',icon:'icon_nav2',
            children:[
              {title:'账号管理',url:'adminList',icon:''},
              {title:'角色管理',url:'roleList',icon:''},
            ]
        },
          {title:'用户管理',url:'user',icon:'icon_nav3',
            children:[
              {title:'搜索用户',url:'userlist',icon:''},
              {title:'正常用户',url:'userNormalList',icon:''},
              {title:'Ip搜索',url:'userIp',icon:''},
              {title:'余额搜索',url:'userBalance',icon:''},
              {title:'锁定用户',url:'userLockList',icon:''},
            ]
          },
          {title:'交易管理',url:'trade',icon:'icon_nav4',
            children:[
              {title:'订单搜索',url:'ordersearch',icon:''},
              {title:'充值记录',url:'recharge',icon:''},
              {title:'平台充值',url:'rechargeP',icon:''},
              {title:'微信充值',url:'rechargeW',icon:''},
              {title:'QQ充值',url:'rechargeQ',icon:''},
              {title:'支付宝充值',url:'rechargeA',icon:''},
              {title:'提现管理',url:'withdrawals',icon:''},
              {title:'提现申请',url:'pendingW',icon:''},
              {title:'财务对接',url:'transfer',icon:''},
            ]
          },
          {title:'财务管理',url:'financial',icon:'icon_nav5',
            children:[
              {title:'提现存款',url:'financial_pay',icon:''},
              {title:'客服转账审核',url:'financial_manage',icon:''},

            ]
          },
          {title:'操作日志',url:'log',icon:'icon_nav6',},
          {title:'活动优惠',url:'markets',icon:'icon_nav7',
            children:[
              {title:'活动列表',url:'list',icon:''},
/*              {title:'游戏历史',url:'gamehistory',icon:''},
*/              {title:'优惠申请',url:'markets_preferential',icon:''},
              {title:'批量调整',url:'modify_amount',icon:''},
/*              {title:'活动规则',url:'markets_manage',icon:''},
*/              {title:'好友推荐设置',url:'recommend_set',icon:''},
/*              {title:'返水设置',url:'back_set',icon:''}*/
            ]
          },
		  {title:'游戏信息',url:'games',icon:'icon_nav10',
			  children:[
			  {title:'游戏搜索',url:'gameSearch',icon:''},
			  {title:'PT游戏',url:'ptGame',icon:''},
			  {title:'NT游戏',url:'ntGame',icon:''},
			  {title:'MG游戏',url:'mgGame',icon:''}
			  ]
	  	  },
          {title:'广告代理',url:'advert',icon:'icon_nav8',
            children:[
              {title:'代理列表',url:'agentlist',icon:''},
              {title:'代理系统注册',url:'register',icon:''},
              {title:'代理佣金设置',url:'commission',icon:''},
              {title:'代理存取款',url:'deposit_withdrawl',icon:''},
              {title:'代理统计',url:'statictis',icon:''},
              {title:'代理月度收入',url:'income',icon:''},
            ]
          },
          {title:'系统设置',url:'setting',icon:'icon_nav9',
            children:[
            {title:'IP规则',url:'iptable',icon:''},
            {title:'存款设置',url:'payment',icon:''},
            {title:'取款设置',url:'limit',icon:''},
            {title:'收款账户',url:'account',icon:''},
			{title:'系统公告',url:'notice',icon:''},
			{title:'第三方支付',url:'thirdPayment',icon:''}
            ]
          },
        ],
        menuList:null,
      }
    },
    created(){
      this.getMenuList();
    },
    components: {
      navbar,
      sidebar
    },
    methods: {
        getMenuList() {

            let list = getStore('menuList');
            this.menuList = JSON.parse(list);
        }
    }
  }
</script>
