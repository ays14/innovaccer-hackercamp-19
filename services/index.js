// require modules
const config = require('../config');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const tunnel = require('tunnel');
const Promise = require('promise');

// establish proxy tunnel when working behind a proxy server
/* --> Uncomment for Proxy Setup <--
const agent = tunnel.httpsOverHttp({
		proxy: {
			host: config.host,
			port: config.port,
			proxyAuth: config.proxyUsername.concat(':').concat(config.proxyPassword),
		}
	});
*/

// generate hashed string
const genHashString = () => {
		let uriLogin = 'https://sandbox-authservice.priaid.ch/login';
		let hash = CryptoJS.HmacMD5(uriLogin, config.password);
		let hashString = hash.toString(CryptoJS.enc.Base64);
		console.log('[Service] \tHash generated');
		return hashString;
};

// get token from ApiMedic authservice
const getToken = () => {
	return new Promise((resolve, reject) => {
		// Get hash generated by services function for user's password
		let hashString = genHashString();
		console.log('[Service] \tCollecting token');
		// Make a HTTP POST request to authservice endpoint = /login
		axios({
			method: 'post',
			url: 'https://sandbox-authservice.priaid.ch/login',
			headers: {
				'Authorization': `Bearer ${config.username}:${hashString}`
			},
			proxy: false,
			/* --> Uncomment for Proxy Setup <--
			httpsAgent: agent
			*/
		}).then((response) => {
			console.log('[Service] \tToken collected');
			let token = response.data.Token;
			resolve(token);
		}).catch((error) => {
			console.log('[Service] \tCan not collect token');
			reject(error);
		});
	})
};

module.exports = {
	genHashString,
	getToken
}
