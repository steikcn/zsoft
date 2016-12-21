var sql = require("mssql");
// sql.Promise = require('bluebird')

var config = {
    server: '222.92.97.115', // You can use 'localhost\\instance' to connect to named instance
    user: 'reader',
    password: 'kswmreader',
    database: 'kswmerp',
    pool: {
      max: 10,
      min: 1,
      idleTimeoutMillis: 30000
    },
    options: {
      tdsVersion: '7_1'
    }
  };


exports.query = (strSql, callback) => {
  var conn = new sql.Connection(config);

  conn.connect().then(()=>{

    var req = new sql.Request(conn)
    req.query(strSql).then((recordset)=>{
      callback(recordset)
    }).catch((err)=>{
      console.error(err)
    }).then(function(){
      conn.close()
    })

  }).catch((err)=>{
    console.error(err)
  })

}
