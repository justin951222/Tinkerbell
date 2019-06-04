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

router.post("/flist", function (req, res) {
  console.log("req.body\n");
  console.log(req.body);

  var sql = 'SELECT price, DATE_FORMAT(payday, \'%Y-%m-%d\' ) as payday,  note,  club ,seqno FROM finance where club=\'' + req.body.cid + '\'';
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log('\uC7A5\uBD80 \uBD88\uB7EC\uC624\uAE30 \uC624\uB958!', err);else {
      console.log('\uC7A5\uBD80 \uBD88\uB7EC\uC624\uAE30 \uC131\uACF5!');
      res.send(rows);
    }
  });
});

router.post('/fadd', function (req, res) {
  console.log("Request for add");
  var price = req.body.price;
  var payday = req.body.payday;
  var note = req.body.note;
  var cid = req.body.cid;

  var sql = 'INSERT INTO finance (price,payday,note,club) VALUES ("' + price + '","' + payday + '","' + note + '","' + cid + '")';
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("삽입 실패", err);else {
      console.log("삽입 성공", rows);
    }
  });
});

router.post('/frm', function (req, res) {
  console.log("Request for remove");
  var sql = 'DELETE FROM finance where seqno=' + req.body.seqno;
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("삭제 실패", err);else {
      console.log("삭제 성공", rows);
    }
  });
});

exports.default = router;