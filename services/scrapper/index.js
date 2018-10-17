// require modules
const Nightmare = require('nightmare');
const config = require('../../config');
const Promise = require('promise');

// set proxy details
/* --> Uncomment for Proxy Setup <--
let proxy = 'http://'+ config.host + ':' + config.port;
*/

// construct Nightmare instance
/* --> Uncomment for Proxy Setup <--
const nightmare = Nightmare({
	show: false,
	switches: {
		'proxy-server': proxy
	}
});
*/
// --> Comment for Proxy Setup : Line 20-24
const nightmare = Nightmare({
	show: true
});

/**
 * Scraps wikipedia using nightmare for predefined queries and given search string
 *
 * @param  {String} searchString String to search for on wikipedia
 * @return {Array} Array containing the scrapped info
 */
const scrapWiki = (searchString) => {
	return new Promise((resolve, reject) => {
		let selector = '#mw-content-text table.infobox tr';
		/* --> Uncomment for Proxy Setup <--
		nightmare.authentication(config.proxyUsername, config.proxyPassword) // comment this to disable proxy authentication
		*/
	nightmare
		.goto('https://en.wikipedia.org')
		.wait('#searchInput')
		.type('#searchInput', searchString)
		.click('#searchButton')
		.wait('#content')
		.evaluate((selector) => {
			let nodeList = (document.querySelectorAll(selector))
			// map array from the obtained NodeList
			let arr = [].slice.call(nodeList).map(nodeList =>  nodeList.innerText)
			return arr;
		}, selector)
		.end()
		.then((result) => {
			console.log('[Scrapper] \tInfo collected from wikipedia');
			resolve(result);
		})
		.catch((err) => {
			console.log('[Scrapper] \tCan not collect info from wikipedia');
			reject(err);
		});
	})
};

/**
* Scraps emedexpert using nightmare for predefined query
 *
 * @return {String} String containing scrapped medication
 */
const scrapEMed = () => {
	return new Promise((resolve, reject) => {
		let selector = 'table.listtable tr td';
		/* --> Uncomment for Proxy Setup <--
		nightmare.authentication(config.proxyUsername, config.proxyPassword) // comment this to disable proxy authentication
		*/
	nightmare
		.goto('https://www.emedexpert.com/lists/conditions.shtml')
		.wait('#fb-root')
		.wait(3000)
		.evaluate((selector) => {
			let nodeList = document.querySelectorAll(selector)
			// map array from the obtained NodeList
			let arr = [].slice.call(nodeList).map(nodeList => nodeList.innerText)
			return arr
		}, selector)
		.end()
		.then((result) => {
			console.log('[Scrapper] \tInfo collected from emedexpert');
			resolve(result);
		})
		.catch((err) => {
			console.log('[Scrapper] \tCan not collect info from emedexpert');
			reject(err);
		});
	})
};

/**
 * Extract the required info out of array from scrapping wikipedia using string match
 *
 * @param  {Array} keywords Array of strings to match in 'array'
 * @param  {Array} array    Array of scarpped data
 * @return {Array} Array of strings containing required data extract
 */
const extractFromWiki = (keywords, array) => {
	console.log('[Scrapper] \tExtracting info from wikipedia');
	let data = [];
	array.forEach((index) => {
		for (let j = 0; j< keywords.length; j++) {
			if (index.toLowerCase().startsWith(keywords[j].toLowerCase())) {
				data[j] = index.slice(keywords[j].length).trim().replace(/\\n|\d|\n|[[\]]/g, '');
			}
		}
	})
	console.log('[Scrapper] \tInfo extracted');
	return data;
};

/**
 * Extract the required info out of string from emedexpert scrapping using string match
 *
 * @param  {String} condition String to match in 'array'
 * @param  {Array} array     Array of scrapped data
 * @return {String} String containing required data extract
 */
const extractFromEMed = (condition, array) => {
	console.log('[Scrapper] \tExtracting info from emedexpert');
	let data = '';
	for (let i = 0; i < array.length; i++) {
		if (array[i].toLowerCase().startsWith(condition.toLowerCase())) {
			data = array[i+1];
			console.log('[Scrapper] \tInfo extracted');
			return data;
		}
	}
	data = 'Please consult physician. Could not find medications.';
	console.log('[Scrapper] \tInfo extracted');
	return data;
};

module.exports = {
	scrapWiki,
	scrapEMed,
	extractFromWiki,
	extractFromEMed
};
