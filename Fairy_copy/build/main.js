'use strict';

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HTTP REQUEST LOGGER


var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var http = require('http');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

var mysql = require('mysql');

var connection = mysql.createConnection({

    "host": "133.186.246.199",
    "user": "root",
    "password": "qwe123!@#",
    "port": "4540",
    "database": "fairy"
});

app.use(cookieParser());
app.use((0, _morgan2.default)('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

var db = connection.connect();

var options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'welcome1', //데이터베이스 접근 비밀번호
    database: 'fairy' //데이터베이스의 이름
};
var sessionStore = new MySQLStore(options);

var devPort = 4000;

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    var config = require('../webpack.dev.config');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);
    devServer.listen(devPort, function () {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}
/** setup routers & static directory */


app.use('/api', _routes2.default);
app.use('/', express.static(path.join(__dirname, './../public')));

app.use((0, _morgan2.default)('dev'));
app.use(bodyParser.json());

/** support client-side routing */
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/** handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/hello', function (req, res) {
    return res.send('Hello CodeLab');
});

app.listen(port, function () {
    console.log('Express is listening on port', port);
});