module.exports = {
  enterprise: "kswm",
  project: "czlb",
  loadMode: "mongodb",       //mongodb：直接转存；RESTful：通过RESTful服务转存
  restfulServiceUrl: "http://localhost:3000/",
  debug: true,

  mssql: {
    "user": "reader",
    "password": "kswmreader",
    "server": "192.168.0.252",
    "database": "kswmerp",
    "pool": {
      "max": 10,
      "min": 1,
      "idleTimeoutMillis": 30000
    },
    "options": {
      "tdsVersion": "7_1"
    }
  },
  mongo: {
    url: "localhost:27017/",
    timeout: 1*1000,     //timeout后关闭连接，实在找不到关闭连接的时机
  },

  data: [{
    table: "czlb_data",   //可以是"(select * from ...) a"这样的
    collection: "cc",
    fields: "*",
    keys: "YM,chartsID,seriesID,categoryID",  //主键，暂未用
    updateKey: "YM",    //以 updateKey 字段为新增和更新起点的判断依据
    updateCriterion: 2  //0~n，按 updateKey 倒序，前 updateCriterion 个 updateKey 对应的数据，删除再新增。
  }]
}
