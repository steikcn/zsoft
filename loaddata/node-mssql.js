var config = require("./config");
var sql = require("mssql");

/*全局连接
sql.connect(config.mssql,(err)=>{
  if (err) console.error(err)
  sql.close()
})
*/

/*全局连接，promise版本，也可以then((conn)=>{})
sql.connect(config.mssql).then(()=>{
  sql.close()
}).catch((err)=>{
  console.error(err)
})
*/

/*连接变量
var conn = new sql.Connection(config.mssql)
conn.connect((err)=>{
  if (err) console.error(err)
  conn.close()
})
*/
/*连接变量，promise版本
var conn = new sql.Connection(config.mssql)
conn.connect().then((cn)=>{
  console.dir(cn===conn)  //true：cn 和 conn 相同
  conn.close()
}).catch((err)=>{
  console.error(err)
})
*/
/*连接变量，构造函数版本
var conn = new sql.Connection(config.mssql,(err)=>{
  if (err) console.error(err)
  conn.close()
})
*/
/*连接变量，promise版本，then((conn)=>{})
new sql.Connection(config.mssql).connect().then((conn)=>{
  conn.close()
}).catch((err)=>{
  console.error(err)
})
*/


/*从sql、conn都可以直接发起查询，${parameter}
  sql.query`select * from mytable where id = ${value}`.then((recordset)=>{
  // conn.query`select * from mytable where id = ${value}`.then((recordset)=>{
    console.dir(recordset)
  }).catch((err)=>{
    console.error(err)
  })
*/


// request变量
// var req = new sql.Request()      //全局连接下适用
// var req = new sql.Request(conn)  //连接变量下适用
// var req = conn.request()         //连接变量下适用
// req.multiple = true
// 
/*request.query
  req.query("select 1 n",(err,recordset,affected)=>{
    if(err) console.error(err)
    console.dir(recordset)
  })
*/
/*request.query，promise版本
  req.query("select 1 n").then((recordset)=>{
    console.dir(recordset)
  }).catch((err)=>{
    console.error(err)
  })
*/

sql.connect(config.mssql).then((conn)=>{
  var request = new sql.Request();
  // request.input('myval', sql.VarChar, '-- commented');
  request.input('myval', '-- commented');
  request.query('select @myval as myval', function(err, recordset) {
      console.dir(recordset);
  });
})

/*request.query，stream版本
  req.stream = true;
  req.query("select top 3 * from czlb_data")

  req.on('recordset',(columns)=>{`
    // Emitted once for each recordset in a query
    console.dir(columns)
  })

  req.on('row',(row)=>{
    // Emitted for each row in a recordset
    console.dir(row)
  })

  req.on('info',(message)=>{
    // Emitted for informational message
    console.dir(message)
  })

  req.on('error',(err)=>{
    console.error(err)
  })

  req.on('done',(affected)=>{
    // Always emitted as the last one
    console.log(affected)
  })
*/
/*
streamObj - Writable stream in object mode
request.pipe(streamObj)
request.query('select * from mytable');
streamObj.on('error', function(err) {});
streamObj.on('finish', function() {});
*/