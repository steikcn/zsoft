// node.js 使用 mssql 开源库操作 sqlServer 数据库 一介布衣  http://yijiebuyi.com/blog/69ebad54c394487547921ff6b3239622.html
var config = require("./config");
var sql = require("mssql");
var Q = require("q");


function _Base() {
}


_Base.prototype._connect = function (callback) {
    var defer = Q.defer();
    var connection = new sql.Connection(config.mssql);
    defer.resolve(connection);
    return defer.promise.nodeify(callback);
};


_Base.prototype.query = function (sqlstr) {
    if (!sqlstr) {
        var err = new Error("sql is empty!");
        var defer = Q.defer();
        return defer.reject(err);
    }

    //是否打印SQL语句
    if (config.debug) {
        console.log('[SQL:]', sqlstr, '[:SQL]');
    }

    return this._connect().then(function (connection) {
        return connection.connect().then(function () {
            var request = new sql.Request(connection);
            return request.query(sqlstr).then(function (recordset) {
                connection.close();
                return recordset;
            }).catch(function (err) {
                connection.close();
                return err;
            });
        });
    });
};


module.exports = _Base;