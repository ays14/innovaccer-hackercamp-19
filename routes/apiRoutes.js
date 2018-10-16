const express = require('express');
const router = express.Router();
const axios = require('axios');
const services = require('../services');
const scrapper = require('../services/scrapper');
const config = require('../config');
const tunnel = require('tunnel');

const Conditions = require('../models/Conditions');

const agent = tunnel.httpsOverHttp({
		proxy: {
			host: config.host,
			port: config.port,
			proxyAuth: config.proxyUsername.concat(':').concat(config.proxyPassword),
		}
	});

// get symptoms API 1
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

//get diagnosis for provided symptom API 2
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

router.post('/diagnosis/condition', (req, res) => {
	let queryCondition = (req.body.condition).toLowerCase();
	let keys = ['Treatment', 'Prevention', 'Specialty'];
	Conditions.findOne({condition: queryCondition}).then((doc) => {
		if (doc === null) {
			scrapper.scrapWiki(queryCondition).then((arr) => {
			let info = scrapper.extractFromWiki(keys, arr);
				Conditions.create({
					'condition': queryCondition,
					'treatment': info[0],
					'prevention': info[1],
					'specialty': info[2],
				}).then((data) => {
					console.log('Entry saved in database ' + data);
					res.json({
						'Condition':data.condition,
						'Treatment':data.treatment,
						'Prevention':data.prevention,
						'Specialty':data.specialty
					});
					res.end();
				}).catch((err) => {
					console.log(err);
					res.json({500: 'Database error in create'});
					res.end();
				})
			}).catch((err) => {
				console.log(err);
				res.json({500: 'Scrap error'});
				res.end();
			})
			} else {
				console.log('Entry found in db');
				res.json({
					'Condition':doc.condition,
					'Treatment':doc.treatment,
					'Prevention':doc.prevention,
					'Specialty':doc.specialty
				});
				res.end();
			}
		}).catch((err) => {
			console.log(err)
			res.json({500: 'Database error in find'});
			res.end();
		})
	
});


/*
// scrap data for API 3
router.post('/condition', (req, res) => {
	let queryCondition = req.body.condition;
	let keys = ['Treatment', 'Prevention', 'Specialty'];
	scrapper.scrapEMed().then((drug) => {
		let meds = scrapper.extractFromEMed(queryCondition, drug);
		scrapper.scrapWiki(queryCondition).then((arr) => {
			let info = scrapper.extractFromWiki(keys, arr);
			console.log(info);
			// info.forEach((index) => {
			// 	if (index == null) {
			// 		index = 'Could not find. Try searching on Google.com or please, consult a physician'
			// 	}
			// });
			Conditions.findOne({condition: queryCondition}).then((doc) => {
				if (doc === null) {
					Conditions.create({
						'condition': queryCondition,
						'treatment': info[0],
						'prevention': info[1],
						'specialty': info[2],
						'medication': meds
					}).then((data) => {
						console.log('Entry saved in database ' + data);
						res.json(data);
						res.end();
					}).catch((err) => {
						console.log(err);
						res.json({500: 'Database error in create'});
						res.end();
					})
				} else {
					res.json(doc);
					res.end();
				}
			}).catch((err) => {
				console.log(err)
				res.json({500: 'Database error in find'});
				res.end();
			})
		}).catch((err) => {
			console.log(err);
			res.json({500: 'Scrap error'});
			res.end();
		})
	}).catch((err) => {
		console.log(err);
		res.json({500: 'Invalid condition'});
		res.end();
	})

})
*/
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