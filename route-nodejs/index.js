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
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());
router.all('/', function (req, res, next) {
  res.send("此接口不返回任何有效信息");
});
//返回CF人物名称与人物LIST
router.get('/person', function (req, res, next) {
  var absolutePath = path.resolve(__dirname, './../json/personList.json');
  try {　　
    // 此处是可能产生例外的语句
    var data = fs.readFileSync(absolutePath, "utf-8");
    var obj = JSON.parse(data);
    setTimeout(function () {
      res.json(obj);
    }, 0);
  } catch (error) {　　
    res.json([]);
    console.log(error);　　
  }
});

router.post('/users', function (req, res, next) {
  try {　　
    // var currentPage = request.params.currentPage;
    var currentPage = req.body.currentPage || 1;
    var dirPath = path.resolve(__dirname, './../json/users' + currentPage + '.json');
    var data = fs.readFileSync(dirPath, "utf-8");
    var obj = JSON.parse(data);
    setTimeout(function () {
      res.json(obj);
    }, 0);
  } catch (error) {
    setTimeout(function () {
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
    setTimeout(function () {
      res.json({
        success: true,
        data: result
      })
    }, 2000);
  }, err => {
    res.json({
      success: false,
      errorMessage: err
    })
  });
});



router.post('/sales/order/asyncQueryList', function (req, res, next) {
  try {　　 
    var obj = JSON.parse('{"success":true,"message":null,"bean":{"pageNum":1,"pageSize":10,"pageCount":67,"rowCount":661,"data":[{"nsrmc":"kkkk","total_score":0,"point_name":"园区","goods_name":"0502CS      ","contact":"离得啊啊啊啊","ly":"销售系统","amount":6666.0,"shxydm":"120117777303334","id":"20180502111656941000000000000002","user_name":"管理员","flag_invoice":"1","mobile_phone":"15902212707","time":1525231016000,"pay_type":"0","flag_agreement":"2"},{"nsrmc":"kkkk","total_score":0,"point_name":"园区","goods_name":"测试商品1","contact":"离得啊啊啊啊","ly":"销售系统","amount":0.01,"shxydm":"120117777303334","id":"20180425155736380000000000000004","user_name":"管理员","flag_invoice":"1","mobile_phone":"15902212707","time":1524643056000,"pay_type":"0","flag_agreement":"2"},{"nsrmc":"kkkk","total_score":0,"point_name":"园区","goods_name":"测试商品3  ","contact":"离得啊啊啊啊","ly":"销售系统","amount":0.01,"shxydm":"120117777303334","id":"20180425155529483000000000000003","user_name":"管理员","flag_invoice":"1","mobile_phone":"15902212707","time":1524642929000,"pay_type":"0","flag_agreement":"2"},{"nsrmc":"个人","total_score":11,"point_name":"在线支付","goods_name":"测试自动结束2","contact":"个人","ly":"微信","amount":30.0,"shxydm":"100000000000000","id":"20180419112049937000000000000009","user_name":"online","flag_invoice":"4","mobile_phone":null,"time":1524108049000,"pay_type":"3","flag_agreement":"1"},{"nsrmc":"1","total_score":0,"point_name":"在线支付","goods_name":"1902cs","contact":"12","ly":"微信","amount":20.0,"shxydm":"1","id":"20180419103334274000000000000007","user_name":"online","flag_invoice":"1","mobile_phone":"18222601240","time":1524105214000,"pay_type":"2","flag_agreement":"1"},{"nsrmc":"1","total_score":0,"point_name":"在线支付","goods_name":"1901cs","contact":"12","ly":"微信","amount":90.0,"shxydm":"1","id":"20180419100405832000000000000006","user_name":"online","flag_invoice":"1","mobile_phone":"18222601240","time":1524103445000,"pay_type":"3","flag_agreement":"1"},{"nsrmc":"1","total_score":0,"point_name":"在线支付","goods_name":"1901cs","contact":"12","ly":"微信","amount":90.0,"shxydm":"1","id":"20180419100324983000000000000005","user_name":"online","flag_invoice":"1","mobile_phone":"18222601240","time":1524103405000,"pay_type":"2","flag_agreement":"1"},{"nsrmc":"1","total_score":0,"point_name":"在线支付","goods_name":"1901cs","contact":"12","ly":"微信","amount":90.0,"shxydm":"1","id":"20180419100226116000000000000004","user_name":"online","flag_invoice":"1","mobile_phone":"18222601240","time":1524103346000,"pay_type":"2","flag_agreement":"1"},{"nsrmc":"1","total_score":0,"point_name":"在线支付","goods_name":"1901cs","contact":"12","ly":"微信","amount":90.0,"shxydm":"1","id":"20180419100213997000000000000003","user_name":"online","flag_invoice":"1","mobile_phone":"18222601240","time":1524103334000,"pay_type":"2","flag_agreement":"1"},{"nsrmc":"1","total_score":0,"point_name":"在线支付","goods_name":"1901cs","contact":"12","ly":"微信","amount":90.0,"shxydm":"1","id":"20180419095108985000000000000002","user_name":"online","flag_invoice":"1","mobile_phone":"18222601240","time":1524102669000,"pay_type":"3","flag_agreement":"1"}]}}');
    setTimeout(function () {
      res.json(obj);
    }, 1000);
  } catch (error) {
    setTimeout(function () {
      res.json("请求出错");
    }, 0);
    console.log(error);　　
  }
});


router.post('/sales/ordermaintenance/asyncDetail', function (req, res, next) {
  try {　　 
    var obj = JSON.parse('{"success":true,"message":null,"bean":{"point":"园区","order":{"id":"20180425155529483000000000000003","customerId":8806,"time":1524642929000,"salesman":"admin","amount":0.01,"state":"Y","flagPay":"Y","payType":"0","flagInvoice":"1","flagAgreement":"2","remarks":null,"pointId":"000","sendStatus":null,"ly":"XSXT","totalScore":0,"remarksInvoice":"智慧财税服务有效期:2021年01月10日"},"items":[{"goodsItem":{"id":1052,"goodsId":"TEST-03","itemId":"90000000","itemName":"VIP电话咨询","itemType":"3","times":null,"quantity":null},"moduls":"","num":1,"numOfService":-1,"months":12,"showMonths":"","isOnce":"N"},{"goodsItem":{"id":1053,"goodsId":"TEST-03","itemId":"90000002","itemName":"系统巡检（上门/远程）","itemType":"3","times":null,"quantity":null},"moduls":"","num":1,"numOfService":-1,"months":12,"showMonths":"","isOnce":"N"}],"invoiceSendInfo":{"TRACKING_NO":null,"LINK_ADDRESS":null,"TRACKING_TYPE":null,"NSRMC":null,"BANK_CARD":null,"ADDRESS":null,"LINK_MAN":null,"BANK_NAME":null,"LINK_PHONE":null,"SSFJ":null,"MOBILE_PHONE":null,"EMAIL":null,"FPLXDM":null,"FLAG_INVOICE":"1"},"goods":[{"orderGoods":{"id":null,"orderId":"20180425155529483000000000000003","goodsId":"TEST-03","quantity":1,"price":0.01,"amount":0.01,"sl":0.17,"spbm":"1060301029900000000","printName":"浩天财税通-通用财务系统","isRenew":null,"score":null},"goodsName":"测试商品3  ","gift":null,"giftName":null,"score":null,"alone":"N","yj":"N","onlyCompany":"Y"}],"gifts":null,"locState":2,"agree":null,"orderId":"20180425155529483000000000000003","info":{"id":8806,"type":"1","shxydm":"120117777303334","gsNsrsbh":"","dsNsrsbh":"","nsrmc":"kkkk","address":"的撒啊萨达大事的撒打算","zip":"123123","phone":"15902212707","contact":"离得啊啊啊啊","wechatOpenid":"123","qqOpenid":null,"mobilePhone":"15902212707","vipLevel":1,"regTime":1510802155000,"modifyTime":1526291136000,"source":null,"jobs":"公司负责人","ukeyId":null,"djxh":null}}}');
    setTimeout(function () {
      res.json(obj);
    }, 1000);
  } catch (error) {
    setTimeout(function () {
      res.json("请求出错");
    }, 0);
    console.log(error);　　
  }
});

module.exports = router;