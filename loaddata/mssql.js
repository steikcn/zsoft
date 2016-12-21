var config = require("./config");
var mssql = require("mssql")
var Promise = require('bluebird')

function _Base() {
}

_Base.prototype.query = (sql,params)=>{
  return new Promise(function(fulfill, reject) {
    var conn = new mssql.Connection(config.mssql)
    conn.connect((err) => {
      if(err){
        reject({err:err.message});
        // reject(err)
        // logger.error(err.message)
      }else{
        let sqlReq = new mssql.Request(conn);
        if(params){
          // let ps = Object.keys(params);
          // for(let i = 0; i < ps.length; i++){
          //   sqlReq.input(ps[i],params[ps[i]])
          // }
          for (key in params){
            sqlReq.input(key,params[key])
          }
        }

        if (config.debug) {
          console.log('[sql:]', sql, '[params:]',params);
        }

        sqlReq.query(sql, function(error, result) {
          if (error) {
            conn.close()
            // reject(error);
            reject({err:error.message,sql:sql});
            // logger.error(error.message + ' Sql is : ' + sql)
          } else {
            conn.close()
            fulfill(result);
            // logger.debug(sql)
          }
        });
      }
    });
  });
}

module.exports = _Base
