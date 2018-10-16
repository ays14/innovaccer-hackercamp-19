const Nightmare = require('nightmare');
const config = require('../../config');
const Promise = require('promise');

let proxy = 'http://'+ config.host + ':' + config.port;
console.log(proxy);

const nightmare = Nightmare({ 
	show: false,
	switches: {
		'proxy-server': proxy
	}
});

const scrapWiki = (searchString) => {
	return new Promise((resolve, reject) => {
		let selector = '#mw-content-text table.infobox tr';
		nightmare
		.authentication(config.proxyUsername, config.proxyPassword)
		.goto('https://en.wikipedia.org')
		.type('#searchInput', searchString)
		.click('#searchButton')
		.wait('#content')
		.evaluate((selector) => {
			let nodeList = (document.querySelectorAll(selector))
			let arr = [].slice.call(nodeList).map(nodeList =>  nodeList.innerText)
			/* 
			let array = arr.filter((i) => {
					return i != "";
				}); 
			*/
			return arr;
		}, selector)
		.end()
		.then((result) => {
			// console.log(result);
			resolve(result);
		})
		.catch((err) => {
			console.log(err);
			reject(err);
		});
	})	
};

const scrapEMed = () => {
	return new Promise((resolve, reject) => {
		let selector = 'table.listtable tr td';
		nightmare
		.authentication(config.proxyUsername, config.proxyPassword)
		.goto('https://www.emedexpert.com/lists/conditions.shtml')
		.wait(3500)
		.evaluate((selector) => {
			let nodeList = document.querySelectorAll(selector)
			let arr = [].slice.call(nodeList).map(nodeList => nodeList.innerText)
			return arr
		}, selector)
		.end()
		.then((result) => {
			// console.log(result);
			resolve(result);
		})
		.catch((err) => {
			console.log(err);
			reject(err);
		});
	})
};

const extractFromWiki = (keywords, array) => {
	let data = [];
	array.forEach((index) => {
		for (let j = 0; j< keywords.length; j++) {
			if (index.toLowerCase().startsWith(keywords[j].toLowerCase())) {
				data[j] = index.slice(keywords[j].length).trim();
			}
		}
	})
	return data;
};

const extractFromEMed = (condition, array) => {
	let data = '';
	/* array.forEach((index) => {
		if (index.toLowerCase().startsWith(condition.toLowerCase())) {
			// data = index.slice(condition.length).trim();
			data = (index)
			console.log(`add
			
			` + `data 
			` + data);
		}
		return
	})
	 */
	 
	for (let i = 0; i < array.length; i++) {
		if (array[i].toLowerCase().startsWith(condition.toLowerCase())) {
			data = array[i+1];
			return data;
		}
	}
	return data;
}; 

module.exports = {
	scrapWiki,
	scrapEMed,
	extractFromWiki,
	extractFromEMed
};