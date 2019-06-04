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



router.post("/flist", (req, res) => {
console.log("req.body\n");  
console.log(req.body);

var sql=`SELECT price, DATE_FORMAT(payday, '%Y-%m-%d' ) as payday,  note,  club ,seqno FROM finance where club='${req.body.cid}'`;
connection.query(
      sql,
      (err, rows, fields) => {
          if(err)
              console.log(`장부 불러오기 오류!`, err);
          else{
              console.log(`장부 불러오기 성공!`);
              res.send(rows);
          }
      }
  )
});


router.post('/fadd', (req,res)=>{
  console.log("Request for add")        
  var price = req.body.price;
var payday = req.body.payday;
var note = req.body.note;
  var cid=req.body.cid;
  
  
  
 
  var sql = `INSERT INTO finance (price,payday,note,club) VALUES ("${price}","${payday}","${note}","${cid}")`
  connection.query(sql,(err,rows,fields)=>{
    if(err)
      console.log("삽입 실패",err)
      else{
        console.log("삽입 성공",rows)
      }
  })
});




router.post('/frm', (req,res)=>{
 console.log("Request for remove")
  var sql = `DELETE FROM finance where seqno=${req.body.seqno}`
  connection.query(sql,(err,rows,fields)=>{
    if(err)
       console.log("삭제 실패",err)
       else{
         console.log("삭제 성공",rows)
       }
  }) 
});

export default router;
