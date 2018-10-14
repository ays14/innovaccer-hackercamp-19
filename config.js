require('dotenv').config();

const config = {};

config.username = process.env.user_name;
config.password = process.env.password;
config.uriLogin = process.env.uri_login;
config.baseUrl = process.env.base_url;
config.proxyStatus
config.host = process.env.host;
config.port = process.env.port;
config.proxyAuth = process.env.proxy_auth;

console.log(`App started with config \nusername: ${config.username}\npassword: ${config.password}\n`);
module.exports = config;