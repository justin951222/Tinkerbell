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


router.post("/mlist", (req, res) => {
console.log(req.body)
connection.query(
      `SELECT * FROM memberview where cid="${req.body.cid}"`,
      (err, rows, fields) => {
          if(err)
              console.log(`회원 목록 불러오기 오류!`, err);
          else{
              console.log(`회원 목록 불러오기 성공!`);
              res.send(rows);
          }
      }
  )
});


router.post('/madd', (req,res)=>{
  console.log("Request for add")        

  var power=req.body.power;
  var sid = req.body.sid;
  var cid = req.body.cid;
 
  var sql = `INSERT INTO members VALUES ("${sid}","${cid}","${power}")`
  connection.query(sql,(err,rows,fields)=>{
    if(err)
      console.log(err)
      else{
        console.log(rows)
      }
  })
});




router.post('/mrm', (req,res)=>{
  console.log(req.body)
  var sql = `DELETE FROM members WHERE sid=${req.body.sid} and cid=${req.body.cid}`
  connection.query(sql,(err,rows,fields)=>{
    if(err)
    console.log( "삭제 실패",err)
    else{
      console.log("삭제 성공",rows)
    }
  }) 
});

export default router;
