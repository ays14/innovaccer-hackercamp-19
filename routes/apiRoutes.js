const express = require('express');
const router = express.Router();
const axios = require('axios');
const services = require('../services');
const config = require('../config');
const tunnel = require('tunnel');
const Qs = require('qs');
const request = require('request');

const agent = tunnel.httpsOverHttp({
		proxy: {
			host: config.host,
			port: config.port,
			proxyAuth: config.proxyAuth,
		}
	});

// get symptoms
router.get('/symptoms', (req, res) => {
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
			console.log(err);
			res.json({500: 'Server Error'});
			res.end();
		})
	}).catch((err) => {
		console.log(err);
		res.sendStatus(500);
		res.end();
	});
});

//get diagnosis for provided symptom 
router.post('/diagnosis', (req, res) => {
	let hash = services.genHashString();
	if (req.body.gender == 'male' || req.body.gender == 'female') {
		services.getToken()
		.then((hashToken) => {
			axios({
				method: 'get',
				url: 'https://sandbox-healthservice.priaid.ch/diagnosis',
				headers: {
					'Authorization': `Bearer ${config.username}:${hash}`
				},
				proxy: false,
				httpsAgent: agent,
				params: {
					token: hashToken,
					language: 'en-gb',
					symptoms: JSON.stringify(req.body.symptoms),
					gender: req.body.gender,
					year_of_birth: req.body.year_of_birth,
				},
			}).then((resp) => {
				console.log(resp.data);
				res.json(resp.data);
				res.end();
			}).catch((err) => {
				console.log(err);
				res.json({500: 'Internal Server Error'});
				res.end();	
			})
		}).catch((err) => {
			console.log(err);
			res.json({500: 'Server Error'});
			res.end();
		});
	} else {
		console.log('Invalid query' + req.body.gender);
		res.json({500:'Invalid query'});
		res.end();
	}
});

/*
? The following is the same above code for diagnosis but implemented in request module

router.post('/diagnosis/r', (req, res) => {
	let hash = services.genHashString();
	services.getToken()
	.then((hashToken) => {
		let options = { 
			method: 'GET',
  			url: 'https://sandbox-healthservice.priaid.ch/diagnosis',
  			qs: {
				// symptoms: req.body.symptoms,
				symptoms: '[104,10]',
				year_of_birth: req.body.year_of_birth,
				gender: req.body.gender,
				language: 'en-gb',
				token: hashToken 
			},
			json: true,
			proxy: 'http://fabays:Ashi@202.141.80.20:3128'
		};
		request(options, (err, resp, body) => {
  			if (err) {
				console.log(err);
			}
			console.log(resp);
			console.log(body);
			res.json(body);
		});
	})
 });
 */
module.exports = router;