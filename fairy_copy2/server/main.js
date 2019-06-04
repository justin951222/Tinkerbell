
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan'; // HTTP REQUEST LOGGER


var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var http = require('http');
var path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const mysql = require('mysql');

const connection = mysql.createConnection({

    "host": "133.186.246.199",
    "user": "root",
    "password": "qwe123!@#",
    "port": "4540",
    "database": "fairy"
});


app.use(cookieParser()); 
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const db = connection.connect();

var options = {
    host    : '127.0.0.1',
    port    : 3306,
    user    : 'root',
    password: 'welcome1',       //데이터베이스 접근 비밀번호
    database: 'fairy'        //데이터베이스의 이름
};
var sessionStore = new MySQLStore(options);

const devPort = 4000;

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));


if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
/** setup routers & static directory */
import api from './routes';

app.use('/api', api);
app.use('/', express.static(path.join(__dirname, './../public')));

app.use(morgan('dev'));
app.use(bodyParser.json());

/** support client-side routing */
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
})

/** handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
})