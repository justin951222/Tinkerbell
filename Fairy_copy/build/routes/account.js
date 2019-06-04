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

router.post('/signup', function (req, res) {
    //회원가입
    /* req.body.username req.body.password */
    console.log("----------test------------");
    console.log(req.body);
    console.log("----------test------------");

    //6월 첫주까지
    //다음주는 이메일로 전달, 스카이프 //최소한 결과(조건부렌더링,회원레벨에 따른)
    // CHECK PASS LENGTH

    var sql = 'select * from usr where sid = \'' + req.body.username + '\'';
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else if (rows.length != 0) {
            //exists
            res.send('Auth Error: Username exists!');
        } else {

            var sid = req.body.username;
            var passwordd = req.body.password;
            var cid = req.body.clubid;
            var crank = req.body.job;
            var sname = req.body.name;

            var cid2 = req.body.clubid2;
            var crank2 = req.body.job2;

            /*var sqll = `insert into usr value('${req.body.username}','${req.body.password}')`;*/
            connection.query('insert into usr value(?,?,?)', [sid, passwordd, sname], function (err, rows, fields) {
                if (!err) {

                    connection.query('insert into members value(?,?,?)', [sid, cid, crank], function (err, rows, fields) {

                        if (!err && cid2) {

                            connection.query('insert into members value(?,?,?)', [sid, cid2, crank2], function (err, rows, fields) {

                                if (!err) {

                                    return res.json({ success: 'members 2개 그룹 성공' });
                                } else {
                                    res.send('err1: ' + err);
                                }
                            });
                        } else {
                            res.send('err1: ' + err);
                        }
                    });
                } else {
                    res.send('err2: ' + err);
                }
            });
        }
    });
});

router.post('/signin', function (req, res) {
    /* post /api/account/signin  */

    console.log("----------test------------");
    console.log(req.body);
    console.log("----------test------------");

    if (typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    var sql = 'select * from usr where sid = \'' + req.body.username + '\' and password = \'' + req.body.password + '\'';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length === 0) {
            console.log("exists\n");
            console.log(result.length);
            console.log("exists\n");

            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        } else {
            //존재


            var sql_ = 'select * from members where sid = \'' + req.body.username + '\'';
            connection.query(sql_, function (err, result) {
                console.log("body==============test\n");
                console.log(result.length); //1

                var session = req.session;

                if (result.length != 2) {
                    //1
                    session.loginInfo = {
                        username: req.body.username,
                        password: req.body.password,
                        clubid: result[0].cid,
                        job: result[0].crank,
                        clubid2: "",
                        job2: ""
                    };
                } else {
                    //2
                    session.loginInfo = {
                        username: req.body.username,
                        password: req.body.password,
                        clubid: result[0].cid,
                        job: result[0].crank,
                        clubid2: result[1].cid,
                        job2: result[1].crank
                    };
                }

                console.log("session test\n");
                console.log(session);

                return res.json({
                    success: true
                });
            });
        }
    });
});

router.get('/getinfo', function (req, res) {

    console.log("getinfo test\n");
    console.log(req.session);

    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    var sql = 'select * from usr where sid = \'' + req.session.loginInfo.username + '\'';
    connection.query(sql, function (err, exists) {
        if (err) throw err;

        if (!exists) {
            return res.status(409).json({
                error: "USERNAME not EXISTS",
                code: 3
            });
        }
    });

    return res.json({ info: req.session.loginInfo });
});

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ sucess: true });
});
exports.default = router;