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
    "host": "127.0.0.1",
    "user": "root",
    "password": "welcome1",
    "port": "3306",
    "database": "fairy"
});

connection.connect();

/*
    writer: String,
    contents: String,
    starred: [String],
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false }

    _id

*/
// WRITE MEMO
///* post /api/memo/ */
router.post('/', function (req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }
    console.log("----------test------------");
    console.log(req.body);
    console.log(req.session.loginInfo.username);
    console.log("----------test------------");
    var contents = req.body.contents;
    var writer = req.session.loginInfo.username;
    console.log(contents);
    console.log(writer);

    connection.query('insert into memo value(?,?)', [writer, contents], function (err, rows, fields) {
        if (!err) {
            return res.json({ success: true });
        } else {
            res.send('err: ' + err);
        }
    });
});

// MODIFY MEMO
router.put('/:id', function (req, res) {

    var sql = 'select * from usr where username = \'' + req.params.id + '\'';
    connection.query(sql, function (err, result) {
        if (err) {
            return res.status(400).json({
                error: "INVALID ID",
                code: 1
            });
        }
    });

    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }
    var brandId = req.params.id;
    var sqll = 'update memo set contents=\'' + req.body.contents + '\'\' where id = ' + brandId + ';';
    connection.query(sqll, function (err, result) {
        if (err) throw err;
        return res.json({
            success: true,
            result: result
        });
    });
});

// DELETE MEMO
router.delete('/:id', function (req, res) {
    var sql = 'select * from memo where id = \'' + req.params.id + '\'';
    connection.query(sql, function (err, result) {
        if (err) {
            return res.status(400).json({
                error: "INVALID ID",
                code: 1
            });
        }
    });

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    var sqll = 'select * from memo where writer = \'' + req.session.loginInfo.username + '\'';
    // FIND MEMO AND CHECK FOR WRITER
    connection.query(sqll, function (err, result) {
        if (err) throw err;

        if (results.length > 0) {
            sql = 'delete from memo where id = ' + req.params.id + ' and writer = \'' + req.session.loginInfo.username + '\'';

            connection.query(sql, function (err1, results1) {
                if (err1) throw err1;
                res.json({ success: true });
            });
        }
    });
});

// GET MEMO LIST
router.get('/', function (req, res) {
    var sql = 'select * from memo';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//get /api/memo/:username
router.get('/:username', function (req, res) {

    var username = req.params.username;

    var sql = 'select * from memo where writer = \'' + username + '\'';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/:id', function (req, res) {

    var username = req.params.id;

    var sql = 'select * from memo where id = \'' + id + '\'';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//router.get('/:username/:listType/:id', (req, res) => {

router.get('/:username/:id', function (req, res) {

    var id = req.params.id;
    var username = req.params.username;

    var sql = 'select * from memo where id = \'' + id + '\' and writer = \'' + username + '\'';
    connection.query(sql, function (err, result) {
        if (err) {
            return res.status(400).json({
                error: "INVALID ID",
                code: 2
            });
        } else {
            return res.json(result);
        }
    });
});

exports.default = router;