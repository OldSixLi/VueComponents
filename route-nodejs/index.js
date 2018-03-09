/*
 * 设置/ma请求目录下处理(Nojs路由部分)
 * @Author:OldSixLi (oldsixli@gmail.com)
 * @Date: 2017年11月15日13:21:49
 * @Last Modified by: mashaobo
 * @Last Modified time:2017年12月27日13:59:17
 */

var express = require('express');
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
var fs = require('fs');
var url = require('url');
let SqlHelper = require('./sql');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
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

router.post('/users', function(req, res, next) {
  try {　　
    // var currentPage = request.params.currentPage;
    var currentPage = req.body.currentPage || 1;
    var dirPath = path.resolve(__dirname, './../json/users' + currentPage + '.json');
    var data = fs.readFileSync(dirPath, "utf-8");
    var obj = JSON.parse(data);
    setTimeout(function() {
      res.json(obj);
    }, 0);
  } catch (error) {
    setTimeout(function() {
      res.json("请求出错");
    }, 0);
    console.log(error);　　
  }
});

router.get('/musicUserList', (req, res, next) => {
  var params = url.parse(req.url, true).query;
  let page = params.pageindex;
  console.log(page);
  SqlHelper.getMusicUser(page).then(result => {
    setTimeout(function() {
    res.json({
      success: true,
      data: result
    })},2000);
  }, err => {
    res.json({
      success: false,
      errorMessage: err
    })
  });
});

module.exports = router;