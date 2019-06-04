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



router.post("/ilist", (req, res) => {
console.log("req.body\n");  
console.log(req.body);

var sql=`SELECT eid, ename, DATE_FORMAT(eday, '%Y-%m-%d' ) as eday, amount, note, eid, clubid as club FROM inventory where clubid='${req.body.cid}'`;
connection.query(sql,(err, rows, fields) => {
          if(err)
              console.log(`비품 목록 불러오기 오류!`, err);
          else{
              console.log(rows);
              console.log(`비품 목록 불러오기 성공!`);
              res.send(rows);
          }
      }
  )

});


router.post('/iadd', (req,res)=>{
  console.log("Request for add")        

  var cid=req.body.cid;
  var ename = req.body.ename;
  var eday = req.body.eday;
  var amount = req.body.amount;
  var note = req.body.note;
 
  
connection.query('insert into inventory (ename,eday,amount,note,clubid) values (?,?,?,?,?)',[ename,eday,amount,note,cid],function(err,rows,fields){
    if(err)
      console.log(err)
      else{
        console.log(rows)
      }
  })
});



router.post('/erm', (req,res)=>{
 var sql = `DELETE FROM inventory WHERE eid="${req.body.eid}"`
  connection.query(sql,(err,rows,fields)=>{
    if(err)
    console.log( "삭제 실패",err)
    else{
      console.log("삭제 성공",rows)
    }
  }) 
});

export default router;

