require('dotenv').config();

const config = {};

config.username = process.env.user_name;
config.password = process.env.password;
config.uriLogin = process.env.uri_login;
config.baseUrl = process.env.base_url;
config.host = process.env.host;
config.port = process.env.port;
config.proxyUsername = process.env.proxy_username;
config.proxyPassword = process.env.proxy_password;

console.log(`App started with config
	username: ${config.username}
	password: ${config.password}
	Proxy: {
		host: ${config.host}
		port: ${config.port}
		username: ${config.proxyUsername}
		password: ${config.proxyPassword}
	}
`);

module.exports = config;