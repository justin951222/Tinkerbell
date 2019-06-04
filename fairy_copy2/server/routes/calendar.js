import express from 'express';


const router = express.Router();


var mysql      = require('mysql');
var connection = mysql.createConnection({
    "host": "133.186.246.199",
    "user": "root",
    "password": "qwe123!@#",
    "port": "4540",
    "database": "fairy"
});

connection.connect();



router.get("/calendarlist", (req, res) => {
// cid: 'ez13', Clubid2: 'zad13', job: 'A', job2: 'C' }

var sql=`SELECT* FROM calendar where cid='${req.body.cid}'`;
connection.query(sql,(err, rows, fields) => {
          if(err)
              console.log(`캘린더오류!`, err);
          else{
              console.log(rows);
              console.log(`캘린더 성공!`);
              res.json(rows);
          }
      }
  )

});


router.post("/calendarlist/:cid", (req, res) => {
// cid: 'ez13', Clubid2: 'zad13', job: 'A', job2: 'C' 
console.log("postcid\n");
console.log(req);

var sql=`SELECT* FROM calendar where cid='${req.params.cid}'`;
connection.query(sql,(err, rows, fields) => {
          if(err)
              console.log(`캘린더오류`, err);
          else{
              console.log(rows);
              console.log(`캘린더 성공`);
              res.json(rows);
          }
      }
  )

});


router.post("/calendarinfo", (req, res) => {
// cid: 'ez13', Clubid2: 'zad13', job: 'A', job2: 'C' }
//selectedDate:day,            cid:this.state.cid
console.log("calinfoform\n");
console.log(req.body);

var date = req.body.selectdate;
var cid = req.body.cid;
//DATE_FORMAT(payday, '%Y-%m-%d' ) as payday
var sql_=`SELECT* FROM calendar where cid="${cid}" and  date(cal_date)="${date}"`;
connection.query(sql_,(err, rows, fields) => {
          if(err)
              console.log(`캘린더 Info 오류!`, err);
          else{
              console.log(rows);
              console.log(`캘린더 Info 성공!`);
              res.json(rows);
          }
      }
  )

});





export default router;