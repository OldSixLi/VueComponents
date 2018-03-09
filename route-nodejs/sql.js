var mysql = require('mysql');
var TEST_DATABASE = 'nodesql';
var TEST_TABLE = 'user';
//创建连接
var client = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  port: '3306'
});
client.connect();
//和哪个数据库建立连接
client.query("use " + TEST_DATABASE);

const getMusicUser = (pageindex = 1) => {
  //sql语句
  var sql = "select * from music_users ORDER BY ID limit " + (pageindex - 1) * 30 + "," + 30;

  return new Promise(function(resolve, reject) {
    client.query(sql, function(err, result) {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  getMusicUser: getMusicUser
}