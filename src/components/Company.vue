<template>
    <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <ht-tabs active="产品销售">
                <ht-tab title="产品销售">
                    <ht-sell></ht-sell>
                </ht-tab>
                <!-- <ht-tab title="销售列表组件">
                  <ht-order-list></ht-order-list>
                </ht-tab> -->
                <ht-tab title="课程组件">
                    <ht-class :config="config" :data="classData" @result="result" @cancel="cancel"></ht-class>
                </ht-tab>
               
            </ht-tabs>
          </div> 
        </div>
      </div>
</template>
<script>
  export default {
    name: "Company",
    props: {
      //对外获取的数据
    },
    data: function() {
      //组件内数据部分
      return {
        //课程赋默认值
        classData: {
          // "wholeDisable": true, //全部文档禁用(只读)NOTE 此属性针对整个文档适用
          "studentCount": 4510,
          "feeType": "P",
          "transVip": "",
          "scoreRadio": "1",
          "scoreKindRadio": "1",
          "allowVip": ["allowVip", "allowAbsent", "vipBest", "vipfree", "allowAbandon"],
          "useCourseTicket": "Y",
          "name": "自定义名称课程",
          "type": "D",
          "lineType": "F",
          "vipPrice": 0,
          //   "transVipArr": ["not_vip_give", "trans_vip"],
          "begin_time": "2018-04-10 17:33:13",
          "end_time": "2018-04-26 17:30:15",
          "mutiplySale": "M*N",
          "mutiplDes": "单价乘以人数",
          "courdetail": [{
            "address": "线上",
            "time": "2018-04-10 17:33:31"
          }],
          "teacherId": "3",
          "singleCount": 123,
          "nonVipPrice": 13,
          "score": "123",
          "phone": "312",
          "introduction": "213213",
          "name_err": "请填写相关姓名",
          "vipGoodsId": "TEST-04",
          "notVipGoodsId": "TEST-03"
        },

        //配置项
        config: {
          //课程名称
          name: {
            disabled: false,
            default: "默认课程名称",
            show: true
          },
          // 任课教师
          teacherId: {
            default: ""
          },
          // 课程类型 D:单次课程 X:系列课程
          type: {
            default: "D"
          },
          // 听课方式 O:线上课程 F:线下课程
          lineType: {
            default: "F"
          },
          transVipArr: {
            default: ["not_vip_give", "trans_vip"]
          },
          // 课程属性[checkbox以数组形式存储值] ["vipfree", "allowVip"]
          allowVip: {
            default: []
          },
          // 报名人数
          studentCount: {
            default: ""
          }, // 单账户参加人数
          singleCount: {
            default: ""
          }, // 报名开始时间
          begin_time: {
            default: ""
          }, // 报名结束时间
          end_time: {
            default: ""
          },
          // [赠送标志]会员赠送 NOTE:只允许"" 和 "Y" 值
          transVip: {
            default: ""
          },
          // [赠送标志]非会员赠送 NOTE:只允许"" 和 "Y" 值
          notVipGive: {
            default: ""
          },
          // 会员赠送产品
          vipGoodsId: {
            default: ""
          },
          // 非会员赠送产品
          notVipGoodsId: {
            default: ""
          },
          // 收费类型 F:免费  P:收费
          feeType: {
            default: "F"
          },
          // 会员价格 与 非会员差价 NOTE 两者show属性必须保持一致
          vipPrice: {
            default: ""
          },
          nonVipPrice: {
            default: ""
          },
          // 是否赠送积分 1:是 3:否

          scoreRadio: {
            default: ""
          },
          // 积分赠送方式  1:价格百分比 2:固定积分
          scoreKindRadio: {
            default: ""
          },

          // 积分计算规则 百分比或固定数值
          score: {
            default: ""
          },
          // 是否需使用听课券
          useCourseTicket: {
            default: ""
          },
          // 咨询电话
          phone: {
            default: ""
          },
          // 多人参加计费规则(一般设置为固定值)
          mutiplySale: {
            default: "M*N"
          },
          // 规则说明(一般设置为固定值)
          courdetail: {
            default: [],
            show: false
          },
          mutiplDes: {
            default: ""
          },
          // 课程介绍
          introduction: {
            default: ""
          }
        },


      }
    },
    mounted: function() {
      //组件生成时调用
    },
    methods: {
      cancel() {
        // alert('s')
        this.$alert(
          "提示",
          "取消保存",
          function($content) {
            //点击确定按钮进行操作(YES)

          },
          function($content) {
            //提示框显示出来之后的操作(Ready)

          }
        );
      },
      result(data) {
        this.$alert(
          "提示",
          JSON.stringify(data),
          function($content) {
            //点击确定按钮进行操作(YES)

          },
          function($content) {
            //提示框显示出来之后的操作(Ready)

          }
        );
      },
    }
  }
</script>
<style scoped>

</style>