'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    "host": "133.186.246.199",
    "user": "root",
    "password": "qwe123!@#",
    "port": "4540",
    "database": "fairy"
});

connection.connect();

router.get("/calendarlist", function (req, res) {
    // cid: 'ez13', Clubid2: 'zad13', job: 'A', job2: 'C' }

    var sql = 'SELECT* FROM calendar where cid=\'' + req.body.cid + '\'';
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log('\uCE98\uB9B0\uB354\uC624\uB958!', err);else {
            console.log(rows);
            console.log('\uCE98\uB9B0\uB354 \uC131\uACF5!');
            res.json(rows);
        }
    });
});

router.post("/calendarlist/:cid", function (req, res) {
    // cid: 'ez13', Clubid2: 'zad13', job: 'A', job2: 'C' 
    console.log("postcid\n");
    console.log(req);

    var sql = 'SELECT* FROM calendar where cid=\'' + req.params.cid + '\'';
    connection.query(sql, function (err, rows, fields) {
        if (err) console.log('\uCE98\uB9B0\uB354\uC624\uB958', err);else {
            console.log(rows);
            console.log('\uCE98\uB9B0\uB354 \uC131\uACF5');
            res.json(rows);
        }
    });
});

router.post("/calendarinfo", function (req, res) {
    // cid: 'ez13', Clubid2: 'zad13', job: 'A', job2: 'C' }
    //selectedDate:day,            cid:this.state.cid
    console.log("calinfoform\n");
    console.log(req.body);

    var date = req.body.selectdate;
    var cid = req.body.cid;
    //DATE_FORMAT(payday, '%Y-%m-%d' ) as payday
    var sql_ = 'SELECT* FROM calendar where cid="' + cid + '" and  date(cal_date)="' + date + '"';
    connection.query(sql_, function (err, rows, fields) {
        if (err) console.log('\uCE98\uB9B0\uB354 Info \uC624\uB958!', err);else {
            console.log(rows);
            console.log('\uCE98\uB9B0\uB354 Info \uC131\uACF5!');
            res.json(rows);
        }
    });
});

exports.default = router;