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



// GET MEMO LIST
router.get('/', (req, res) => {
    var sql = `select * from Club`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
});


export default router;