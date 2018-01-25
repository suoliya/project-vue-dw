import {
	baseUrl,
	baseUrl_2
} from './env'
import {getStore} from './mUtils'

export default async(url = '', data = {}, type = 'GET',route = 1, method = 'fetch') => {
	type = type.toUpperCase();
	if(route == 2){
		url = baseUrl_2 + url;
	}else{
		url = baseUrl + url;
	}
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			if( data[key] !=null){
				dataStr += key + '=' + data[key] + '&';
			}
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;

		}
	}
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			//credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':getStore('token')
			},
			mode: "cors"
			/*cache: "force-cache"*/
		}

		if (type == 'POST' || type == 'PUT' || type=='DELETE') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}