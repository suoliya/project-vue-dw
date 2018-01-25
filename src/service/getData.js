 //接口文档地址http://106.15.199.117:4999/index.php?s=/1&page_id=78
import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
/**
 * 测试接口
 */
export const test = () => fetch('/customer/36', {data:'test'},'GET');
/**
 *登录
 */
 export const adminLogin = (parame) => fetch('/login.admin',parame,'POST');
 /**
 *修改密码 updateAdminPass
 */
 export const updateAdminPass = (parame) => fetch('/authority/admin/user/change/password',parame,'POST');
/**
 *首页
 */
 //首页当天数据统计
export const todayTotal = (parame) => fetch('/customers/customer/total/message',parame,'GET');
//充值金额图表
export const chartCharge = (parame) => fetch('/customers/customer/statistics/charge',parame,'GET');
//提现金额图表
export const chartWithdraw = (parame) => fetch('/customers/customer/statistics/withdraw',parame,'GET');
//活跃用户图表
export const chartCustomerMau = (parame) => fetch('/customers/customer/statistics/mau',parame,'GET');
//新增用户图表
export const chartCustomer = (parame) => fetch('/customers/customer/statistics/customer',parame,'GET');
//转入流水图表
export const chartToGame = (parame) => fetch('/customers/customer/statistics/toGame',parame,'GET');
//转出流水图表
export const chartToMain= (parame) => fetch('/customers/customer/statistics/toMain',parame,'GET');
//pt游戏转入流水图表
export const chartPtGamgeTo= (parame) => fetch('/customers/customer/statistics/toPT',parame,'GET');
//nt游戏转入流水图表
export const chartNtGamgeTo= (parame) => fetch('/customers/customer/statistics/toNT',parame,'GET');
//mg游戏转入流水图表
export const chartMgGamgeTo= (parame) => fetch('/customers/customer/statistics/toMG',parame,'GET');
//pt游戏转出流水图表
export const chartPtGamgeGo= (parame) => fetch('/customers/customer/statistics/fromPT',parame,'GET');
//nt游戏转出流水图表
export const chartNtGamgeGo= (parame) => fetch('/customers/customer/statistics/fromNT',parame,'GET');
//mg游戏转出流水图表
export const chartMgGamgeGo= (parame) => fetch('/customers/customer/statistics/fromMG',parame,'GET');

/**
 * 用户信息
 */
export const getUser = () => fetch('/customer/36', {data:'test'},'GET');
//获取用户列表
export const getUserList = (parame) => fetch('/customers/customer/tags/query', parame,'GET');
//修改用户登录或者禁止登录状态
export const setUserStatus = (parame) => fetch('/customers/customer/update/state',parame,'POST');
//获取用户详情
export const getUserInfo = (id) => fetch('/customers/customer/'+id,'','GET');
//获取用户总数统计不传日期默认当天截止
export const getUserTotalCustomer = (parame) => fetch('/customers/customer/stat/totalCustomer',parame,'GET');
//获取用户注册数
export const getUserTotalRegister = (parame) => fetch('/customers/customer/today/register',parame,'GET');
//获取用消费总额
export const getChargeByDate = (parame) => fetch('/customers/customer/stat/chargeByDate',parame,'GET');
//邀请好友统计 最后一次登录信息
export const getInvitatione = (id) => fetch('/customers/customer/invitation/statistics/'+id,'','GET');
//个人账户钱包
export const getUserBalance = (id) => fetch('/customers/customer/account/balance/'+id,'','GET');
//获取手动动调整 奖励或返水列表
export const getUserAdjustment = (parame) => fetch('/customers/customer/adjustment/query',parame,'GET');
//修改用户信息
export const updateUserInfo = (parame) => fetch('/customers/customer',parame,'PUT');
//修改用户密码
export const updateUserPass = (parame) => fetch('/customers/customer/change/password',parame,'PUT');
//•增加余额调整 或减少余额调整 返水设置
export const updateAdjustment = (parame) => fetch('/customers/customer/market/adjustment',parame,'POST');
//•钱包转游戏或游戏转钱包
export const updateGameAndWallet = (parame) => fetch('/customers/customer/game/wallet',parame,'POST');
//获取用户标签列表getTagList
export const getTagList = (status) => fetch('/customers/tag/state/'+status,'','GET');
//新建标签
export const setNewTag = (parame) => fetch('/customers/tag',parame,'POST');
//用户批量添加标签
export const addUserTags = (parame) => fetch('/customers/customer/tags/add',parame,'POST');
//删除标签
export const deleteTag = (id) => fetch('/customers/tag/'+id,'','DELETE');
//用户充值统计接口
export const getUserCharge = (id) => fetch('/customers/customer/statistics/charge/'+id,'','GET');
//用户提现统计
export const getUserWithdraw = (id) => fetch('/customers/customer/statistics/withdraw/'+id,'','GET');
//用户流水查询
export const getUserStatement = (parame) => fetch('/customers/customer/money/statement',parame,'GET');
//获取用户登录的ip记录
export const getUserIpRecord = (parame) => fetch('/customers/customer/ip/record',parame,'GET');
//获取用户日志
export const getUserLog = (parame) => fetch('/customers/customer/user/log',parame,'GET');
//获取用户个人信息重复的账号统计
export const getUserRepeated = (id) => fetch('/customers/customer/statistics/repeated/'+id,'','GET');
//修改认证状态
export const setUserVerification = (parame) => fetch('/customers/customer',parame,'PUT');
//获取用户游戏记录
export const gameLog = (parame) => fetch('/customers/customer/game/record/query',parame,'GET');
//获取用户充值排行列表
export const userChargeRankList= (parame) => fetch('/customers/customer/stat/chargeByDate/ranking',parame,'GET');
//获取用户消费p排行列表
export const userWithdrawRankList= (parame) => fetch('/customers/customer/stat/withdrawByDate/ranking',parame,'GET');
//删除用户标签
export const deleteUserTags = (parame) => fetch('/customers/customer/tags/delete',parame,'DELETE');
//踢出用户
export const offlineUser = (id) => fetch('/customers/customer/offline/'+id,'','GET');
//获取某一天活跃用户
export const getTodayMuv = (parame) => fetch('/customers/customer/today/muv',parame,'GET');
//获取今日注册用户
export const getTodayRegister = (parame) => fetch('/customers/customer/today/register',parame,'GET');
//用户超级搜索/customer/all/search
export const getSelectUserList = (parame) => fetch('/customers/customer/all/search',parame,'GET');
//订单首页统计接口nowOrderDetail
export const nowOrderDetail = () => fetch('/customers/customer/pay/today','','GET');
//订单搜索customer/pay/search
export const getOrderList = (parame) => fetch('/customers/customer/pay/search',parame,'GET');
//用户投注列表
export const getStatistics = (id) => fetch('/customers/customer/game/win/statistics/'+id,'','GET');
//查找用户列表
export const getUserAllList = (parame) => fetch('/customers/customer/all/search',parame,'GET');
//查找用户列表根据ip
export const getUserAllListIp = (parame) => fetch('/customers/customer/ip/search',parame,'GET');



// 广告代理
export const adventList = (parame) => fetch('/agents/agent/query',parame,'POST');
// 广告代理-代理统计
export const statistic = (parame) => fetch('/agents/agent/statistic/list', parame,'GET');
// 广告代理-删除
export const removerStatis = (parame) => fetch('/agents/agent', parame,'PUT');
// 广告代理-代理系统注册
export const registerList = (parame) => fetch('/agents/agent',parame,'POST');
// 广告代理-获取代理佣金
export const getCommission = (parame) => fetch('/agents/agent/setting/commission', parame,'GET');
// 广告代理-设置代理佣金
export const setCommission = (parame) => fetch('/agents/agent/setting/commission', parame,'POST');
// 广告代理-代理月度收入
export const income = (parame) => fetch('/agents/agent/month/list', parame,'GET');
// 广告代理-代理存取款
export const accessMoney = (parame) => fetch('/agents/agent/order', parame,'POST');
// 代理详情-个人信息
export const queryPersonData = (id) => fetch('/agents/agent/'+id, '','GET');
// 代理详情-获取银行卡
export const queryAccountBank = (parame) => fetch('/agents/agent/bank/account', parame,'POST');
// 代理详情-账号获取订单
export const queryAccountOrder = (parame) => fetch('/agents/agent/order/account', parame,'POST');
// 代理详情-更新银行卡状态
export const changeAccountBank = (parame) => fetch('/agents/agent/bank', parame,'PUT');
// 代理详情-新建银行
export const addAccountBank = (parame) => fetch('/agents/agent/bank', parame,'POST');
// 代理详情-编辑银行
export const editAccountBank = (parame) => fetch('/agents/agent/bank', parame,'PUT');
// 代理详情-修改密码
export const changePassWord = (parame) => fetch('/agents/agent/password', parame,'PUT');
// 代理详情-编辑代理
export const editAgent = (parame) => fetch('/agents/agent', parame,'PUT');



/**
 * 交易管理模块
 */
//根据用户名关键词搜索用户列表
export const UserListForUsername = (parame) => fetch('/customers/customer/search/'+parame,'','GET');
//客服创建用户的充值订单
export const ServiceUserCharge = (parame) => fetch('/payments/payment/platform/charge', parame,'POST');
//获取充值列表
export const ServiceChargeList = (parame) => fetch('/payments/payment/pay/charge', parame ,'GET');
//客服转账 ServicTransfer
export const ServicTransfer = (parame) => fetch('/payments/payment/service/transfer', parame ,'POST');
//获取提现列表
export const ServiceWithdrawList = (parame) => fetch('/payments/payment/pay/withdraw', parame ,'GET');
//客服创建提现订单
export const ServiceUserWithdraw = (parame) => fetch('/payments/payment/pay/withdraw', parame,'POST');
//获取后台管理人员列表
export const ServiceAdminList = (parame) => fetch('/authority/admin/user/query', parame,'POST');
//充值详情chargeDetail
export const chargeDetail = (id) => fetch('/payments/payment/pay/charge/'+id, '' ,'GET');
//提现详情 withdrawDetail
export const withdrawDetail = (id) => fetch('/payments/payment/pay/withdraw/'+id, '' ,'GET');
//修改交易状态/payment/pay/charge
export const setChargeToOk = (parame) => fetch('/payments/payment/pay/charge', parame,'POST');
/**
 * 财务管理模块
 */
//获取客服转账记录
export const ServiceTransferList = (parame) => fetch('/payments/payment/service/transfer', parame,'GET');
//确认转账
export const ServiceTransferSure = (parame) => fetch('/payments/payment/service/transfer', parame,'PUT');
//客服确认提现
export const ServiceWithdrawSure = (parame) => fetch('/payments/payment/pay/withdraw/order', parame,'PUT');
/**
 * 市场管理模块
 */

//优惠规则列表
export const marketRuleQuery = (parame) => fetch('/markets/market/favRule/query', parame ,'POST');
//最后一次返水规则列表
export const marketLastBackSet = (parame) => fetch('/markets/market/rebate/query', parame ,'POST');
//创建反水设定
export const marketAddBackSet = (parame) => fetch('/markets/market/game/add', parame ,'POST');
//更新好友推荐设置
export const marketUpdateFriend = (parame) => fetch('/markets/market/friend/update', parame ,'POST');
//优惠活动列表
export const marketActivityQuery = (parame) => fetch('/markets/market/activity/query', parame ,'POST');
//获取可用的游戏列表
export const marketGameQuery = (parame) => fetch('/markets/market/game/query', parame ,'POST');
//用户奖金信息统计
export const marketUserFavApply = (id) => fetch('/markets/market/favApply/bonusStatistics/'+id, '' ,'GET');
//获取用户日志
export const getUserActivity= (parame) => fetch('/markets/market/favApply/query',parame,'POST');
//活动列表activeList
export const getActiveList= (parame) => fetch('/markets/market/activity/query',parame,'POST');
//给用户添加奖金
export const addActiveMoney= (parame) => fetch('/markets/market/actSign/add/list',parame,'POST');
//修改优惠规则
export const updateRuleInfo= (parame) => fetch('/markets/market/favRule/update',parame,'POST');
//获取优惠申请单
export const getGavApply= (parame) => fetch('/markets/market/favApply/query',parame,'POST');
//修改申请
export const updateGavApply= (parame) => fetch('/markets/market/favApply/update',parame,'POST');
//状态维度清单/market/favApply/countStatus
export const gavApplyCountStatus= (parame) => fetch('/markets/market/favApply/countStatus',parame,'POST');

//新增优惠规则
export const marketRuleAdd = (parame) => fetch('/markets/market/favRule/add', parame ,'POST');
//获取优惠规则
//export const marketRuleDetail = (parame) => fetch('/markets/market/favRule/'+id, parame ,'GET');
export const marketRuleDetail = (id) => fetch('/markets/market/favRule/'+id, '' ,'GET');
//批量增加奖金接口
export const actSignAdd= (parame) => fetch('/markets/market/actSign/add',parame,'POST');

// 系统设置-收款账户
export const account  = (parame) => fetch('/payments/payment/bank', parame ,'GET');
// 系统设置-变更银行卡状态
export const changeStatus  = (parame) => fetch('/payments/payment/bank/status', parame ,'PUT');
// 系统设置-创建银行卡
export const setBankCar  = (parame) => fetch('/payments/payment/bank', parame ,'POST');
// 系统设置-获取第三方支付列表
export const payProviderList  = (parame) => fetch('/payments/payment/payProvider', parame ,'GET');
// 系统设置-编辑银行卡
export const editBankCar  = (parame) => fetch('/payments/payment/bank', parame ,'PUT');
// 系统设置-获取所有存取款设置
export const configAll  = (parame) => fetch('/customers/customer/sys/config/all', parame ,'GET');
// 系统设置-更新存取款设置
export const updataConfig  = (parame) => fetch('/customers/customer/sys/config', parame ,'PUT');
// 系统设置-获取IP列表
export const queryIPList  = (parame) => fetch('/customers/customer/sys/white/list', parame ,'GET');
// 系统设置-删除ip
export const removeIP  = (id) => fetch('/customers/customer/sys/white/list/'+id,'' ,'DELETE');
// 系统设置-修改ip状态
export const statusIp  = (parame) => fetch('/customers/customer/sys/white/list', parame ,'PUT');
// 系统设置-添加ip
export const addIp  = (parame) => fetch('/customers/customer/sys/white/list', parame ,'POST');
// 系统设置-存款设置
export const depositSetting  = (parame) => fetch('/customers/customer/sys/config/list', parame ,'PUT');
// 系统设置-系统公告
export const queryNotice = (parame) => fetch('/customers/sys/notice', parame ,'GET');
//系统设置-系统公告增加通知
export const addNoticeContent = (parame) => fetch('/customers/sys/notice', parame ,'POST');
//系统设置-系统公告修状态
export const changeNoticeStatus = (parame) => fetch('/customers/sys/notice', parame ,'PUT');
// 系统设置-第三方支付
export const queryPayProvider = (parame) => fetch('/payments/payment/payProvider/query', parame ,'GET');
//系统设置-修改第三方支付状态
export const changePayProvider = (parame) => fetch('/payments/payment/payProvider', parame ,'PUT');
//系统设置-增加支付
export const addPayProvider = (parame) => fetch('/payments/payment/payProvider', parame ,'POST');

// 报表管理-用户报表
export const userReoprtList = (parame) => fetch('/customers/statistics/customer', parame ,'GET');
// 报表管理-年度报表
export const yearReoprtList = (parame) => fetch('/customers/statistics/year', parame ,'GET');
export const payReoprtList = (parame) => fetch('/customers/statistics/apply', parame ,'GET');
export const gameReoprtList = (parame) => fetch('/customers/statistics/game', parame ,'GET');
export const gameUserReoprtList = (parame) => fetch('/customers/statistics/game/account', parame ,'GET');
/**
  * 银行卡模块
  */
//获取用户银行卡列表
export const bankCustomerList = (parame) => fetch('/payments/payment/bank/customer', parame,'GET');
//修改银行卡状态
export const updateBankStatus = (parame) => fetch('/payments/payment/bank/customer/status', parame,'PUT');
//创建银行卡
export const createBank = (parame) => fetch('/payments/payment/bank/customer', parame,'POST');
//修改银行卡
export const updateBank = (parame) => fetch('/payments/payment/bank/customer', parame,'PUT');


/**
  * 游戏模块
  */
 //获取某一天游戏转入转出流水
export const todayGameRecord = (parame) => fetch('/customers/customer/today/game/record', parame,'GET');


/**
  * 权限模块
  */
//权限-获取管理员详情getUserAdmiInfo
export const getAdminInfo = (id) => fetch('/authority/admin/user/'+id, '','GET');
//权限-获取管理员角色详情
export const getAdminRoleInfo = (name) => fetch('/authority/admin/auth/loginInfo/'+name, '','GET');
//角色查询
export const getRoleList= (parame) => fetch('/authority/admin/role/query', parame,'POST');
//添加用户/gateway/user/add
export const addAdmin= (parame) => fetch('/authority/admin/user/add', parame,'POST');
//修改用户updateAdmin
export const updateAdmin= (parame) => fetch('/authority/admin/user/update', parame,'POST');
//给用户赋予多个角色/gateway/userRole/addOrUpdate
export const updateRole= (parame) => fetch('/authority/admin/userRole/addOrUpdate', parame,'POST');
//根据id查询角色/market/role/1
export const getRoleInfo= (id) => fetch('/authority/admin/role/'+id, '','GET');
//获取权限列表
export const PowerList= () => fetch('/authority/admin/resource', '','GET');
//获取角色权限列表
export const rolePowerList= (parame) => fetch('/authority/admin/roleRes/query', parame,'POST');
//角色信息修改
export const updateRoleInfo= (parame) => fetch('/authority/admin/role/update', parame,'POST');
//修改角色权限
export const updateRolePower= (parame) => fetch('/authority/admin/roleRes/addOrUpdate', parame,'POST');
//新增角色
export const addRole= (parame) => fetch('/authority/admin/role/add', parame,'POST');
//获取用户角色列表
export const adminRoleLists= () => fetch('/authority/admin/user/role/info', '','GET');
//删除角色
export const deleteRole = (id) => fetch('/authority/admin/role/'+id,'','DELETE');

/**
  * 操作日志
  */
//日志
export const getUserLogs = (parame) => fetch('/customers/log',parame,'GET');

/*** 游戏模块 ***/
// 游戏列表
export const queryGamesList = (parame) => fetch('/games/game/record', parame,'GET');
// 游戏统计
export const queryGamesTotal = (parame) => fetch('/games/game/total', parame,'GET');
