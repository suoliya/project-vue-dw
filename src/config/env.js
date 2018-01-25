/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

// let baseUrl = 'http://106.15.199.117:8084';
// let baseUrl = "http://106.15.199.117:8686/api";
let baseUrl = "http://47.92.164.151:18806/api";
let baseUrl_2 = "http://47.92.164.151:18806";
let routerMode = 'history';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){

	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	baseUrl_2,
	routerMode,
	imgBaseUrl,
}
