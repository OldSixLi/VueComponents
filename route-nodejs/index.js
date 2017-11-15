/*
 * 设置/ma请求目录下处理(Nojs路由部分)
 * @Author:OldSixLi (oldsixli@gmail.com)
 * @Date: 2017年11月15日13:21:49
 * @Last Modified by: mashaobo
 * @Last Modified time:2017年11月15日13:22:08
 */

var express = require('express');
// var qiniu = require('qiniu'); //七牛云
var url = require('url');
var bodyParser = require("body-parser");
// var DBhelper = require('../mysql/sql.js');
var multiparty = require('multiparty');
var util = require('util');
var path = require('path');
//Express框架相关部分
var app = express();
var router = express.Router();
var fs = require("fs");
var Q = require('promise');

// router.use(bodyParser.urlencoded({ extended: false }));
//NOTE:在接收POST数据时,因为URL中并不存在参数,需要使用此方法转化数据,获取参数
app.use(bodyParser.json({ limit: '1mb', uploadDir: "../image" })); //body-parser 解析json格式数据
// app.use(express.bodyParser({}));
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
router.all('/', function(req, res, next) {
  res.send("此接口不返回任何有效信息");
});
//返回CF人物名称与人物LIST
router.get('/person', function(req, res, next) {
  var absolutePath = path.resolve(__dirname, './../json/personList.json');
  try {　　
    // 此处是可能产生例外的语句
    var data = fs.readFileSync(absolutePath, "utf-8");
    var obj = JSON.parse(data);
    setTimeout(function() {
      res.json(obj);
    }, 0);
  } catch (error) {　　
    res.json([]);
    console.log(error);　　
  }

});

module.exports = router;