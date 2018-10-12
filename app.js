const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const tunnel = require('tunnel');
 
const agent = tunnel.httpsOverHttp({
  proxy: {
    host: config.host,
	port: config.port,
	proxyAuth: config.proxyAuth,
  }
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* 
Get auth token from Apimedic API
*/
const hash = CryptoJS.HmacMD5(config.uriLogin, config.password);
const hashString = hash.toString(CryptoJS.enc.Base64);
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

	return token;
}).catch((error) => {
	console.log(error);
	return null;
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
