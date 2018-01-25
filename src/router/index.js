import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

/* layout */
import layout from '../views/layout/layout'
Vue.use(Router)
//首页
const home = r => require.ensure([], () => r(require('../views/home/index')), 'home')
const todaynum = r => require.ensure([], () => r(require('../views/home/todaynum')), 'todaynum')

//登录
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')

//用户管理
const userlist = r => require.ensure([], () => r(require('../views/user/userlist')), 'userlist')
const userDetail = r => require.ensure([], () => r(require('../views/user/userDetail')), 'userDetail')
const userNormalList = r => require.ensure([], () => r(require('../views/user/userNormal')), 'userNormalList')
const userLockList = r => require.ensure([], () => r(require('../views/user/userLock')), 'userLockList')
const userchangemoney = r => require.ensure([], () => r(require('../views/user/userchange_money')), 'userchangemoney')
const usertopten = r => require.ensure([], () => r(require('../views/user/usertopten')), 'usertopten')
const userexpense = r => require.ensure([], () => r(require('../views/user/userexpense')), 'userexpense')
const newuserlist = r => require.ensure([], () => r(require('../views/user/newuserlist')), 'newuserlist')
const userIp = r => require.ensure([], () => r(require('../views/user/userIp')), 'userIp')
const userBalance = r => require.ensure([], () => r(require('../views/user/userBalance')), 'userBalance')

//权限管理
const permission = r => require.ensure([], () => r(require('../views/permission/index')), 'permission')
const adminList = r => require.ensure([], () => r(require('../views/permission/adminList')), 'adminList')
const adminEdit = r => require.ensure([], () => r(require('../views/permission/adminEdit')), 'adminEdit')
const roleList = r => require.ensure([], () => r(require('../views/permission/roleList')), 'roleList')
const roleEdit = r => require.ensure([], () => r(require('../views/permission/roleEdit')), 'roleEdit')

//交易管理
const advert = r => require.ensure([], () => r(require('../views/advert/agentlist')), 'advert')
const recharge = r => require.ensure([], () => r(require('../views/trade/recharge')), 'recharge')
const transfer = r => require.ensure([], () => r(require('../views/trade/transfer')), 'transfer')
const withdrawals = r => require.ensure([], () => r(require('../views/trade/withdrawals')), 'withdrawals')
const withdrawalsdetail = r => require.ensure([], () => r(require('../views/trade/withdrawalsdetail')), 'withdrawalsdetail')
const cdetail = r => require.ensure([], () => r(require('../views/trade/cdetail')), 'cdetail')
const ordersearch = r => require.ensure([], () => r(require('../views/trade/ordersearch')), 'ordersearch')
const rechargeW = r => require.ensure([], () => r(require('../views/trade/rechargeW')), 'rechargeW')
const rechargeA = r => require.ensure([], () => r(require('../views/trade/rechargeA')), 'rechargeA')
const rechargeQ = r => require.ensure([], () => r(require('../views/trade/rechargeQ')), 'rechargeQ')
const rechargeP = r => require.ensure([], () => r(require('../views/trade/rechargeP')), 'rechargeP')
const pendingW = r => require.ensure([], () => r(require('../views/trade/pendingW')), 'pendingW')


//市场页面
const markets = r => require.ensure([], () => r(require('../views/markets/markets_list')), 'markets')
const marketsmanage = r => require.ensure([], () => r(require('../views/markets/markets_manage')), 'marketsmanage')
const modifyamount = r => require.ensure([], () => r(require('../views/markets/modify_amount')), 'modifyamount')
const marketspreferential = r => require.ensure([], () => r(require('../views/markets/markets_preferential')), 'marketspreferential')
const gamehistory = r => require.ensure([], () => r(require('../views/markets/gamehistory')), 'gamehistory')
const recommendset = r => require.ensure([], () => r(require('../views/markets/recommend_set')), 'recommendset')
const backset = r => require.ensure([], () => r(require('../views/markets/back_set')), 'backset')
const addrule = r => require.ensure([], () => r(require('../views/markets/addrule')), 'addrule')
const ruledetail = r => require.ensure([], () => r(require('../views/markets/ruledetail')), 'ruledetail')
const ruledetail2 = r => require.ensure([], () => r(require('../views/markets/ruledetail2')), 'ruledetail2')


//广告代理
const register = r => require.ensure([], () => r(require('../views/advert/register')), 'register')
const commission = r => require.ensure([], () => r(require('../views/advert/commission')), 'commission')
const deposit_withdrawl = r => require.ensure([], () => r(require('../views/advert/deposit_withdrawl')), 'deposit_withdrawl')
const statictis = r => require.ensure([], () => r(require('../views/advert/statictis')), 'statictis')
const income = r => require.ensure([], () => r(require('../views/advert/income')), 'income')
const agenDetails = r => require.ensure([], () => r(require('../views/advert/agenDetails')), 'agenDetails')

//财务
const financialmanage = r => require.ensure([], () => r(require('../views/financial/financial_manage')), 'financialmanage')
const financialpay = r => require.ensure([], () => r(require('../views/financial/financial_pay')), 'financialpay')

//操作日志
const log = r => require.ensure([], () => r(require('../views/log/log')), 'log')

// 游戏
const gameSearch = r => require.ensure([], () => r(require('../views/games/gameSearch')), 'gameSearch')
const ptGame = r => require.ensure([], () => r(require('../views/games/ptGame')), 'ptGame')
const ntGame = r => require.ensure([], () => r(require('../views/games/ntGame')), 'ntGame')
const mgGame = r => require.ensure([], () => r(require('../views/games/mgGame')), 'mgGame')

// 系统设置
const setting = r => require.ensure([], () => r(require('../views/setting/iptable')), 'setting')
const payment = r => require.ensure([], () => r(require('../views/setting/payment')), 'payment')
const limit = r => require.ensure([], () => r(require('../views/setting/limit')), 'limit')
const account = r => require.ensure([], () => r(require('../views/setting/account')), 'account')
const notice = r => require.ensure([], () => r(require('../views/setting/notice')), 'notice')
const thirdPayment = r => require.ensure([], () => r(require('../views/setting/thirdPayment')), 'thirdPayment')
//报表
const userReport = r => require.ensure([], () => r(require('../views/report/userReport')), 'userReport')
const yearReport = r => require.ensure([], () => r(require('../views/report/yearReport')), 'yearReport')
const payReport = r => require.ensure([], () => r(require('../views/report/payReport')), 'payReport')
const gameReport = r => require.ensure([], () => r(require('../views/report/gameReport')), 'gameReport')
const gameUserReport = r => require.ensure([], () => r(require('../views/report/gameUserReport')), 'gameUserReport')


export default new Router({
  routes: [
    {
      	path: '/',
      	component: layout,
      	children: [
      		//地址为空时跳转home页面
      		{
      			path: '',
      			redirect: '/home'
      		},
      		//首页
      		{
      			path: '/home',
      			component: home,
      		},
          //用户报表
          {
            path: '/report/userReport',
            component: userReport,
          },
          {
            path: '/report/yearReport',
            component: yearReport,
          },
          {
            path: '/report/payReport',
            component: payReport,
          },
          {
            path: '/report/gameReport',
            component: gameReport,
          },
          {
            path: '/report/gameUserReport',
            component: gameUserReport,
          },
          //用户管理
          {
            path: '/user/userlist',
            component: userlist,
          },
          //正常用户列表
          {
            path: '/user/userNormalList',
            component: userNormalList,
          },
          //Ip搜索
          {
            path: '/user/userIp',
            component: userIp,
          },
          //userBalance
          {
            path: '/user/userBalance',
            component: userBalance,
          },
          //已锁定用户列表
          {
            path: '/user/userLockList',
            component: userLockList,
          },
          //新用户列表
          {
            path: '/user/newuserlist',
            component: newuserlist,
          },
          //权限管理
          {
            path: '/permission',
            component: permission,
          },
          //管理员列表页
          {
            path: '/permission/adminList',
            component: adminList,
          },
          //角色列表页
          {
            path: '/permission/roleList',
            component: roleList,
          },
          //广告代理
          {
            path: '/advert/agentlist',
            component: advert,
          },
          // 广告代理-代理系统注册
          {
            path: '/advert/register',
            component: register,
          },
          // 广告代理-代理佣金设置
          {
            path: '/advert/commission',
            component: commission,
          },
          //广告代理-代理存取款
         {
           path: '/advert/deposit_withdrawl',
           component: deposit_withdrawl,
         },
          //广告代理-代理统计
         {
           path: '/advert/statictis',
           component: statictis,
         },
          //广告代理-月度收入
         {
           path: '/advert/income',
           component: income,
         },
         //订单搜索
        {
          path: '/trade/ordersearch',
          component: ordersearch,

        },
           //充值记录
          {
            path: '/trade/transfer',
            component: transfer,

          },
          //充值记录
          {
            path: '/trade/recharge',
            component: recharge,
          },
           //平台搜索
          {
            path: '/trade/rechargeQ',
            component: rechargeQ,

          },
           //平台搜索
          {
            path: '/trade/rechargeA',
            component: rechargeA,

          },
           //平台搜索
          {
            path: '/trade/rechargeW',
            component: rechargeW,

          },
           //平台搜索
          {
            path: '/trade/rechargeP',
            component: rechargeP,

          },
          //提现记录
          {
            path: '/trade/withdrawals',
            component: withdrawals,
          },
          //提现管理进行中
          {
            path: '/trade/pendingW',
            component: pendingW,
          },
          //市场管理
          {
            path: '/markets/list',
            component: markets
          },

          //活动规则
          {
            path: '/markets/markets_manage',
            component: marketsmanage
          },
          //游戏历史
          {
            path: '/markets/gamehistory',
            component: gamehistory
          },
          //余额调整
          {
            path: '/markets/modify_amount',
            component: modifyamount
          },
          //优惠申请
          {
            path: '/markets/markets_preferential',
            component: marketspreferential
          },
          //返水设置
          {
            path: '/markets/back_set',
              component: backset,
          },
          //好友推荐设置
          {
            path: '/markets/recommend_set',
            component: recommendset,
          },
          //操作日志
          {
            path: '/log',
            component: log,
          },
          //游戏搜索
          {
            path: '/games/gameSearch',
            component: gameSearch,
          },
          //PT游戏
          {
            path: '/games/ptGame',
            component: ptGame,
          },
          //NT游戏
          {
            path: '/games/ntGame',
            component: ntGame,
          },
          //MG游戏
          {
            path: '/games/mgGame',
            component: mgGame,
          },
          //财务管理
          {
            path: '/financial/financial_manage',
            component: financialmanage,
          },
          //财务打款
          {
            path: '/financial/financial_pay',
            component: financialpay,
          },
          //系统设置
         {
           path: '/setting/iptable',
           component: setting,
       },
          //系统设置-补偿金设置
         {
           path: '/setting/payment',
           component: payment,
         },
         {
           path: '/setting/account',
           component: account,
         },
         {
           path: '/setting/limit',
           component: limit,
         },
         {
           path: '/setting/notice',
           component: notice,
         },
         {
           path: '/setting/thirdPayment',
           component: thirdPayment,
         }
      	],
        meta:{auth:true},

    },
    //登录
    {
      path: '/login',
      component: login
    },
    //首页详情页
    {
      path: '/home/todaynum',
      component: todaynum,
      meta:{auth:true}
    },
    //提现详情页面
    {
      path: '/trade/withdrawalsdetail',
      component: withdrawalsdetail,
      meta:{auth:true}
    },
    //充值详情页面
    {
      path: '/trade/cdetail',
      component: cdetail,
      meta:{auth:true}
    },
    //用户详情页面
    {
      path: '/user/userDetail',
      component: userDetail,
      meta:{auth:true}
    },
    //用户top10
    {
      path: '/user/usertopten',
      component: usertopten,
      meta:{auth:true}
    },
    //消费详情
    {
      path: '/user/userexpense',
      component: userexpense,
      meta:{auth:true}
    },
    //调整用户余额
    {
      path: '/user/userchange_money',
      component: userchangemoney,
      meta:{auth:true}
    },
    //新增优惠规则
    {
        path: '/markets/addrule',
        component: addrule,
        meta:{auth:true}
    },
    //规则详情
    {
        path: '/markets/ruledetail',
        component: ruledetail,
        meta:{auth:true}
    },
    //规则详情
    {
        path: '/markets/ruledetail2',
        component: ruledetail2,
        meta:{auth:true}
    },
    //广告代理-代理详情
    {
        path: '/advert/agenDetails',
        component: agenDetails,
        meta:{auth:true}
    },
    //用户编辑
    {
      path: '/permission/adminEdit',
      component: adminEdit,
      meta:{auth:true}
    },
    //角色编辑
    {
      path: '/permission/roleEdit',
      component: roleEdit,
      meta:{auth:true}
    },
  ]
})
