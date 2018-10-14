const express = require('express');
const router = express.Router();
const axios = require('axios');
const services = require('../services');
const config = require('../config');
const tunnel = require('tunnel');

const agent = tunnel.httpsOverHttp({
		proxy: {
			host: config.host,
			port: config.port,
			proxyAuth: config.proxyAuth,
		}
	});

// get symptoms
router.get('/symptoms', (req, res, next) => {
	let hash = services.genHashString();
	services.getToken()
	.then((hashToken) => {
		axios({
			method: 'get',
			url: 'https://sandbox-healthservice.priaid.ch/symptoms',
			headers: {
				'Authorization': `Bearer ${config.username}:${hash}`
			},
			proxy: false,
			httpsAgent: agent,
			params: {
				token: hashToken,
				language: 'en-gb'
			}
		}).then((resp) => {
			console.log(resp.data);
			res.json(resp.data);
			res.end();
		}).catch((err) => {
			console.error(err);
			res.end();
		})
	}).catch((err) => {
		console.error(err);
		res.end();
	});
});

module.exports = router;