var config = require("./config");
var Sql = require('./mssql')
var sql = new Sql()

var monk = require('monk')
var mdb = monk(config.mongo.url+config.enterprise+'_'+config.project)

mdb.then(() => {

  config.data.forEach((item)=>{
    var set = mdb.get(item.collection)

    set.aggregate([{$group:{_id:"$"+item.updateKey}},{$sort:{_id:-1}},{$skip:item.updateCriterion},{$limit:1}])
    .then((res)=>{
      console.log('保留点：',res)

      var sqlStr="select "+item.fields+" from "+item.table
      var params
      if(res.length){
        sqlStr += " where "+item.updateKey+">@key"
        params = {key:res[0]._id}

        var obj={}
        obj[item.updateKey]={$gt:res[0]._id}
        set.remove(obj).then((result)=>{console.log('删除文档：',result.result)})
      }else{
        set.remove().then((result)=>{console.log('删除文档：',result.result)})
      }

      sql.query(sqlStr,params).then((recordset)=>{
        set.insert(recordset).then((doc)=>{
          console.log('新增文档：',doc.length)
        }).catch((err)=>console.error(err))
      }).catch((err)=>console.error(err))

    }).catch((err)=>{console.error(err)})
  })
  
  setTimeout(()=>{
    mdb.close()
  },config.mongo.timeout)

}).catch((err)=>{
  console.error(err)
})

