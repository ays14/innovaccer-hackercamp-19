require('dotenv').config();

const config = {};

config.dbUrl = process.env.db_url;
config.username = process.env.user_name;
config.password = process.env.password;
config.env = process.env.env;

/* --> Uncomment for Proxy Setup <--
config.host = process.env.host;
config.port = process.env.port;
config.proxyUsername = process.env.proxy_username;
config.proxyPassword = process.env.proxy_password;
*/
console.log(`App started with config
	username: ${config.username}
	password: ${config.password}
	env: ${config.env}
`);

/* --> Uncomment for Proxy Setup <--
console.log(`Proxy config
	proxy: {
		host: ${config.host}
		port: ${config.port}
		username: ${config.proxyUsername}
		password: ${config.proxyPassword}
	}
`);
*/
module.exports = config;
