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

router.post("/ilist", function (req, res) {
  console.log("req.body\n");
  console.log(req.body);

  var sql = 'SELECT eid, ename, DATE_FORMAT(eday, \'%Y-%m-%d\' ) as eday, amount, note, eid, clubid as club FROM inventory where clubid=\'' + req.body.cid + '\'';
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log('\uBE44\uD488 \uBAA9\uB85D \uBD88\uB7EC\uC624\uAE30 \uC624\uB958!', err);else {
      console.log(rows);
      console.log('\uBE44\uD488 \uBAA9\uB85D \uBD88\uB7EC\uC624\uAE30 \uC131\uACF5!');
      res.send(rows);
    }
  });
});

router.post('/iadd', function (req, res) {
  console.log("Request for add");

  var cid = req.body.cid;
  var ename = req.body.ename;
  var eday = req.body.eday;
  var amount = req.body.amount;
  var note = req.body.note;

  connection.query('insert into inventory (ename,eday,amount,note,clubid) values (?,?,?,?,?)', [ename, eday, amount, note, cid], function (err, rows, fields) {
    if (err) console.log(err);else {
      console.log(rows);
    }
  });
});

router.post('/erm', function (req, res) {
  var sql = 'DELETE FROM inventory WHERE eid="' + req.body.eid + '"';
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("삭제 실패", err);else {
      console.log("삭제 성공", rows);
    }
  });
});

exports.default = router;