import { RECORD_USERINFO, GET_USERINFO, RETSET_NAME,DELETE_USERINFO} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

export default {
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = 1;
		state.adminId = info.id;
		state.adminName = info.userName;
		let curTime = new Date().getTime();
		setStore('login', 1);
		setStore('token', info.token);
		setStore('userInfo', info);
		setStore('menuList', info.menuList);
		setStore('loginTime', curTime);
	},
	[DELETE_USERINFO](state) {
		state.userInfo = null;
		state.login = 0;
		state.adminId = null;
		state.adminName = null;
		setStore('login', 0);
		setStore('token', null);
		setStore('userInfo', null);
		setStore('menuList', null);
		setStore('loginTime',null);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	}
	
}
