import axios from 'axios';
import qs from 'qs';
import Router from '@/router'

const baseUrl = '';

export const _request = (method, url, requestData) => {
	return new Promise(async (resolve, reject) => {
		const token = localStorage.getItem('token');
		let headers = {};

		let requestUrl = baseUrl + url;
		if (method === 'GET') {
			requestUrl += `?${qs.stringify(requestData)}`
		}

		try {
			const res = await axios({
				method,
				url: requestUrl,
				data: requestData,
				headers,
			});

			const {status, data} = res;
			if (/^2/.test(status)) {
				resolve(data);
			}
			reject();

		} catch (error) {
			console.log(error.message)
			if (error.message === 'Request failed with status code 401') {
				Router.push('/passport?type=login')
			}
		}
	})
};

const request = {
	get: (url, data) => {
		return _request.call(null, 'GET', url, data);
	},
	post: (url, data) => {
		return _request.call(null, 'POST', url, data);
	}
}
export const createUser = (model) => {
	return request.get('/users', model);
}

export const userLogin = (model) => {
	return request.post('/auth', model);
}