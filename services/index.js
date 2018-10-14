const config = require('../config');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const tunnel = require('tunnel');
const Promise = require('promise');

const agent = tunnel.httpsOverHttp({
		proxy: {
			host: config.host,
			port: config.port,
			proxyAuth: config.proxyAuth,
		}
	});

const genHashString = () => {
		const hash = CryptoJS.HmacMD5(config.uriLogin, config.password);
		const hashString = hash.toString(CryptoJS.enc.Base64);
		return hashString;
}

const getToken = () => {
	return new Promise((resolve, reject) => {
		let hashString = genHashString();
		axios({
			method: 'post',
			url: config.uriLogin,
			headers: {
				'Authorization': `Bearer ${config.username}:${hashString}`
			},
			proxy: false,
			httpsAgent: agent
		}).then((response) => {
			let token = response.data.Token;
			console.log(`Token: ${token}`);
			resolve(token);	
		}).catch((error) => {
			console.log('error token');
			reject(error);
		});
	})
};

module.exports = {
	genHashString,
	getToken
}