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

router.post("/mlist", function (req, res) {
  console.log(req.body);
  connection.query('SELECT * FROM memberview where cid="' + req.body.cid + '"', function (err, rows, fields) {
    if (err) console.log('\uD68C\uC6D0 \uBAA9\uB85D \uBD88\uB7EC\uC624\uAE30 \uC624\uB958!', err);else {
      console.log('\uD68C\uC6D0 \uBAA9\uB85D \uBD88\uB7EC\uC624\uAE30 \uC131\uACF5!');
      res.send(rows);
    }
  });
});

router.post('/madd', function (req, res) {
  console.log("Request for add");

  var power = req.body.power;
  var sid = req.body.sid;
  var cid = req.body.cid;

  var sql = 'INSERT INTO members VALUES ("' + sid + '","' + cid + '","' + power + '")';
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log(err);else {
      console.log(rows);
    }
  });
});

router.post('/mrm', function (req, res) {
  console.log(req.body);
  var sql = 'DELETE FROM members WHERE sid=' + req.body.sid + ' and cid=' + req.body.cid;
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("삭제 실패", err);else {
      console.log("삭제 성공", rows);
    }
  });
});

exports.default = router;