module.exports = {
  enterprise: "ws",
  project: "oms",
  loadMode: "mongodb",       //mongodb：直接转存；RESTful：通过RESTful服务转存
  restfulServiceUrl: "http://localhost:3000/",
  debug: true,

  mssql: {
    "user": "excel",
    "password": "iloveumybaby",
    "server": "localhost",
    "database": "wsOMS",
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
    url: "222.92.97.116:27017/",
  },

  data: [{
    table: "(select top 100 percent convert(char(6),docDate,112) YM,cast(sum(amount*exchangeRate) as numeric(18,2)) amount from saleOrder where lock=1 group by convert(char(6),docDate,112) order by 1) a",   //可以是"(select * from ...) a"这样的
    collection: "so",
    fields: "*",
    keys: "YM",  //主键，暂未用
    updateKey: "YM",    //以 YM 字段为新增和更新起点的判断依据
    updateCriterion: 13  //1~n，按 updateKey 倒序，取第 updateCriterion 个作为分界点，删除大于分界点的数据再新增
  }]
}
