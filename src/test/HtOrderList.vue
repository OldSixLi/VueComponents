<template>
    <div class="row">
        <!--
        ██╗     ██╗███████╗████████╗
        ██║     ██║██╔════╝╚══██╔══╝
        ██║     ██║███████╗   ██║
        ██║     ██║╚════██║   ██║
        ███████╗██║███████║   ██║
        ╚══════╝╚═╝╚══════╝   ╚═╝
        -->

        <div v-show="showLoading" style="height: 300px;">
            <loading></loading>
        </div>
        <div v-show="!showLoading">
            <div class="col-md-12" v-show="currentPanel=='list'">
                <panel title="订单列表">
                    <ht-table slot="outer" ajaxurl="ma/sales/order/asyncQueryList" :search-data="searchData">
                        <column slot align="center" data-key="id" name="订单号"></column>
                        <column slot align="center" data-key="nsrmc" name="客户名称"></column>
                        <column slot align="center" data-key="amount" name="订单金额"></column>
                        <column slot align="center" data-key="time" name="订单日期"></column>
                        <column slot align="center" data-key="user_name" name="销售人员"></column>
                        <column slot align="left" data-key="flag_invoice" name="发票状态" filter="invoiceState"></column>
                        <column slot align="left" data-key="flag_agreement" name="协议状态" filter="flagAgreement"></column>
                        <column slot align="center" data-key="pay_type" name="支付方式" filter="payTypeWord"></column>
                        <column slot align="center" data-key="ly" name="订单来源"></column>
                        <column slot align="center" data-key="total_score" name="订单积分"></column>
                        <column slot align="center" data-key="id" name="操作" filter="sellFun"></column>
                    </ht-table>
                </panel>
                <p class="text-right" style="font-size:18px;">交易次数：<span style="color:#EA8E06">32</span>　　合计（元）：<span style="color:#EA8E06">20226.03</span></p>
            </div>
            <!--
            ██████╗ ███████╗████████╗ █████╗ ██╗██╗
            ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║██║
            ██║  ██║█████╗     ██║   ███████║██║██║
            ██║  ██║██╔══╝     ██║   ██╔══██║██║██║
            ██████╔╝███████╗   ██║   ██║  ██║██║███████╗
            ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝
            -->
            <div class="col-md-12" v-show="currentPanel=='detail'">
                <h2 class="text-center">订单详情</h2>
                <div class="row">
                    <!--  <div class="col-xs-12"> -->
                    <div class="propaganda-info">
                        <!--
                         '########::'########:'##:::::::'########:'########:'########:
                          ##.... ##: ##.....:: ##::::::: ##.....::... ##..:: ##.....::
                          ##:::: ##: ##::::::: ##::::::: ##:::::::::: ##:::: ##:::::::
                          ##:::: ##: ######::: ##::::::: ######:::::: ##:::: ######:::
                          ##:::: ##: ##...:::: ##::::::: ##...::::::: ##:::: ##...::::
                          ##:::: ##: ##::::::: ##::::::: ##:::::::::: ##:::: ##:::::::
                          ########:: ########: ########: ########:::: ##:::: ########:
                         ........:::........::........::........:::::..:::::........::
                         -->
                        <div v-if="detail.locState=='7'">
                            <div class="panel panel-default noPadding scroll-target" id="softo">
                                <div class="panel-heading">
                                    <h3 class="panel-title">作废信息</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="form-horizontal">
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">作废人员</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" :value="detail.orderRepealed.userId" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="time" class="col-sm-2 control-label">作废时间</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" :value="detail.orderRepealed.time|toNormalTime" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">作废原因</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" :value="detail.orderRepealed.reason" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">订单积分</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" :value="order.totalScore||'0'" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">实际退款金额</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" :value="order.refundFee" readonly>
                                            </div>
                                        </div>
                                        <div v-if="detail.wftqkyy">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">无法退全款原因</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" :value="order.wftqkyy" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                            :'######::'########:'##::: ##:'########::'########::'########:'########::::'###::::'####:'##:::::::
                            '##... ##: ##.....:: ###:: ##: ##.... ##: ##.... ##: ##.....::... ##..::::'## ##:::. ##:: ##:::::::
                             ##:::..:: ##::::::: ####: ##: ##:::: ##: ##:::: ##: ##:::::::::: ##:::::'##:. ##::: ##:: ##:::::::
                            . ######:: ######::: ## ## ##: ##:::: ##: ##:::: ##: ######:::::: ##::::'##:::. ##:: ##:: ##:::::::
                            :..... ##: ##...:::: ##. ####: ##:::: ##: ##:::: ##: ##...::::::: ##:::: #########:: ##:: ##:::::::
                            '##::: ##: ##::::::: ##:. ###: ##:::: ##: ##:::: ##: ##:::::::::: ##:::: ##.... ##:: ##:: ##:::::::
                            . ######:: ########: ##::. ##: ########:: ########:: ########:::: ##:::: ##:::: ##:'####: ########:
                            :......:::........::..::::..::........:::........:::........:::::..:::::..:::::..::....::........::
                            -->
                        <div v-if="detail.invoiceSendInfo.FLAG_INVOICE=='4'">
                            <div v-if
                                "detail.invoiceSendInfo.FPLXDM == '004' || detail.invoiceSendInfo.FPLXDM == '007' || detail.invoiceSendInfo.FPLXDM == '026'}">
                                <div class="panel panel-default noPadding scroll-target">
                                    <div class="panel-heading">发票信息</div>
                                    <div class="panel-body">
                                        <div class="form-horizontal">
                                            <div v-if="detail.invoiceSendInfo.FPLXDM == '004'">
                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">发票类型</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" value="专票" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">抬头</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.NSRMC" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">专用发票公司地址</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.ADDRESS" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">专用发票联系电话</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.MOBILE_PHONE" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">专用发票银行卡号</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.BANK_CARD" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">专用发票开户行</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.BANK_NAME" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if "${invoiceSendInfo.FPLXDM == '007'}">
                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">发票类型</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" value="普票" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">抬头
                                                      </label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.NSRMC" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="detail.invoiceSendInfo.FPLXDM == '026'">
                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">发票类型</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" value="电子发票" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">抬头</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.NSRMC" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">邮箱</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.EMAIL" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">电话</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.MOBILE_PHONE" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="point" class="col-sm-2 control-label">所属税务分局</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" :value="detail.invoiceSendInfo.SSFJ" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--
                            :'######::'########:'##::: ##:'########::
                            '##... ##: ##.....:: ###:: ##: ##.... ##:
                             ##:::..:: ##::::::: ####: ##: ##:::: ##:
                            . ######:: ######::: ## ## ##: ##:::: ##:
                            :..... ##: ##...:::: ##. ####: ##:::: ##:
                            '##::: ##: ##::::::: ##:. ###: ##:::: ##:
                            . ######:: ########: ##::. ##: ########::
                            :......:::........::..::::..::........:::
                            -->
                        <div class="panel panel-default">
                            <div class="panel-heading">收件人信息</div>
                            <div class="panel-body">
                                <div class="form-horizontal">
                                    <div class="form-group">
                                        <label for="point" class="col-sm-2 control-label">收件人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.invoiceSendInfo.LINK_MAN||'无'" readonly>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="point" class="col-sm-2 control-label">收件地址</label>
                                        <div class="col-sm-10">

                                            <input type="text" class="form-control" :value="detail.invoiceSendInfo.LINK_ADDRESS||'无'" readonly>

                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="point" class="col-sm-2 control-label">快递联系电话</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.invoiceSendInfo.LINK_PHONE||'无'" readonly>

                                        </div>
                                    </div>

                                    <div class="form-group">

                                        <label for="point" class="col-sm-2 control-label">快递单号</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.invoiceSendInfo.TRACKING_NO||'无'" readonly>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="point" class="col-sm-2 control-label">快递类型</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.invoiceSendInfo.TRACKING_TYPE||'无'" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                            '########:::'#######::'####:'##::: ##:'########:
                             ##.... ##:'##.... ##:. ##:: ###:: ##:... ##..::
                             ##:::: ##: ##:::: ##:: ##:: ####: ##:::: ##::::
                             ########:: ##:::: ##:: ##:: ## ## ##:::: ##::::
                             ##.....::: ##:::: ##:: ##:: ##. ####:::: ##::::
                             ##:::::::: ##:::: ##:: ##:: ##:. ###:::: ##::::
                             ##::::::::. #######::'####: ##::. ##:::: ##::::
                            ..::::::::::.......:::....::..::::..:::::..:::::
                            -->
                        <div class="panel panel-default noPadding scroll-target" id="softo">
                            <div class="panel-heading">
                                <h3 class="panel-title">点位信息</h3>
                            </div>
                            <div class="panel-body">
                                <div class="form-horizontal">
                                    <div class="form-group">
                                        <label for="point" class="col-sm-2 control-label">所属点位</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.point" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                            '########:'####:'##::::'##:'########:
                            ... ##..::. ##:: ###::'###: ##.....::
                            ::: ##::::: ##:: ####'####: ##:::::::
                            ::: ##::::: ##:: ## ### ##: ######:::
                            ::: ##::::: ##:: ##. #: ##: ##...::::
                            ::: ##::::: ##:: ##:.:: ##: ##:::::::
                            ::: ##::::'####: ##:::: ##: ########:
                            :::..:::::....::..:::::..::........::
                            -->
                        <div class="panel panel-default noPadding scroll-target" id="softo">
                            <div class="panel-heading">
                                <h3 class="panel-title">购买时间</h3>
                            </div>
                            <div class="panel-body">
                                <div class="form-horizontal">
                                    <div class="form-group">
                                        <label for="time" class="col-sm-2 control-label">购买时间</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.order.time|toNormalTime" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                            '##::::'##::'######::'########:'########::'####:'##::: ##:'########::'#######::
                             ##:::: ##:'##... ##: ##.....:: ##.... ##:. ##:: ###:: ##: ##.....::'##.... ##:
                             ##:::: ##: ##:::..:: ##::::::: ##:::: ##:: ##:: ####: ##: ##::::::: ##:::: ##:
                             ##:::: ##:. ######:: ######::: ########::: ##:: ## ## ##: ######::: ##:::: ##:
                             ##:::: ##::..... ##: ##...:::: ##.. ##:::: ##:: ##. ####: ##...:::: ##:::: ##:
                             ##:::: ##:'##::: ##: ##::::::: ##::. ##::: ##:: ##:. ###: ##::::::: ##:::: ##:
                            . #######::. ######:: ########: ##:::. ##:'####: ##::. ##: ##:::::::. #######::
                            :.......::::......:::........::..:::::..::....::..::::..::..:::::::::.......:::
                            -->
                        <div class="panel panel-default noPadding scroll-target" id="softa">
                            <div class="panel-heading">
                                <h3 class="panel-title">客户信息</h3>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">纳税人识别号(统一社会信用代码)</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.shxydm" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEmail3" class="col-sm-2 control-label">纳税人名称</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.nsrmc" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">联系地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.address" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">联系邮编</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.zip" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">授权服务电话</label>
                                        <div class="col-sm-10" id="phoneList">
                                            <div class="col-xs-12" style="padding:10px 0;" v-for="c in (detail.info.phone&&detail.info.phone.length>0?detail.info.phone.split(','):[''])">
                                                <input type="text" class="form-control" :value="c" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">联系人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.contact" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">联系人手机号码</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.mobilePhone" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword3" class="col-sm-2 control-label">联系人职位</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="detail.info.jobs" readonly>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!--
                            '########::::'###::::'########::'####::::'###:::::'#######::
                             ##.....::::'## ##::: ##.... ##:. ##::::'## ##:::'##.... ##:
                             ##::::::::'##:. ##:: ##:::: ##:: ##:::'##:. ##:: ##:::: ##:
                             ######:::'##:::. ##: ########::: ##::'##:::. ##: ##:::: ##:
                             ##...:::: #########: ##.....:::: ##:: #########: ##:::: ##:
                             ##::::::: ##.... ##: ##::::::::: ##:: ##.... ##: ##:::: ##:
                             ##::::::: ##:::: ##: ##::::::::'####: ##:::: ##:. #######::
                            ..::::::::..:::::..::..:::::::::....::..:::::..:::.......:::
                            -->
                        <!-- 2018年03月05日 增加发票服务期限备注信息 -->
                        <div v-if="detail.order.remarksInvoice != '' && detail.order.remarksInvoice != null">
                            <div class="panel panel-default noPadding scroll-target">
                                <div class="panel-heading">发票信息</div>
                                <div class="panel-body">
                                    <div class="form-horizontal">
                                        <div class="form-group">
                                            <label for="point" class="col-sm-2 control-label">发票备注信息</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" :value="detail.order.remarksInvoice" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                            :'######::::'#######:::'#######::'########:::'######::
                            '##... ##::'##.... ##:'##.... ##: ##.... ##:'##... ##:
                             ##:::..::: ##:::: ##: ##:::: ##: ##:::: ##: ##:::..::
                             ##::'####: ##:::: ##: ##:::: ##: ##:::: ##:. ######::
                             ##::: ##:: ##:::: ##: ##:::: ##: ##:::: ##::..... ##:
                             ##::: ##:: ##:::: ##: ##:::: ##: ##:::: ##:'##::: ##:
                            . ######:::. #######::. #######:: ########::. ######::
                            :......:::::.......::::.......:::........::::......:::
                            -->
                        <div class="panel panel-default noPadding scroll-target" id="softb">
                            <div class="panel-heading">
                                <h3 class="panel-title">购买产品信息</h3>
                            </div>
                            <table class="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th class="text-center">产品ID</th>
                                        <th class="text-center">产品名称</th>
                                        <th class="text-center">打印名称</th>
                                        <th class="text-center">数量</th>
                                        <th class="text-center">含税价</th>
                                        <th class="text-center">税率</th>
                                        <th class="text-center">单价</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="g in detail.goods">
                                        <td class="text-center">{{g.orderGoods.goodsId}}</td>
                                        <td class="text-center">{{g.goodsName}}</td>
                                        <td class="text-center">{{g.orderGoods.printName}}</td>
                                        <td class="text-center">{{g.orderGoods.quantity}}</td>
                                        <td class="text-center">
                                            {{g.orderGoods.price?g.orderGoods.price.toFixed(2):'0.00'}}
                                        </td>
                                        <td class="text-center">{{g.orderGoods.sl*100}}%</td>
                                        <td class="text-center">
                                            {{g.orderGoods.amount?g.orderGoods.amount.toFixed(2):'0.00'}}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot id="right" style="display: table-footer-group;">
                                    <tr>
                                        <td class="text-right" colspan="8">
                                            <strong>总价 : </strong>
                                            <span id="totlePrice">
                                                {{detail.order.amount?detail.order.amount.toFixed(2):'0.00'}}&nbsp;&nbsp;&nbsp;</span>
                                            <strong>积分 : </strong>
                                            <span id="">
                                                {{detail.order.totalScore||0}}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!--
                            '##:::'##:'##::::'##::::'###::::'##::: ##:::::::'##:'####::::'###::::'##::: ##:
                            . ##:'##:: ##:::: ##:::'## ##::: ###:: ##::::::: ##:. ##::::'## ##::: ###:: ##:
                            :. ####::: ##:::: ##::'##:. ##:: ####: ##::::::: ##:: ##:::'##:. ##:: ####: ##:
                            ::. ##:::: ##:::: ##:'##:::. ##: ## ## ##::::::: ##:: ##::'##:::. ##: ## ## ##:
                            ::: ##:::: ##:::: ##: #########: ##. ####:'##::: ##:: ##:: #########: ##. ####:
                            ::: ##:::: ##:::: ##: ##.... ##: ##:. ###: ##::: ##:: ##:: ##.... ##: ##:. ###:
                            ::: ##::::. #######:: ##:::: ##: ##::. ##:. ######::'####: ##:::: ##: ##::. ##:
                            :::..::::::.......:::..:::::..::..::::..:::......:::....::..:::::..::..::::..::
                            -->
                        <div class="panel panel-default noPadding scroll-target" id="softc">
                            <div class="panel-heading">
                                <h3 class="panel-title">产品所包含的元件信息</h3>
                            </div>
                            <table class="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th class="text-center">元件名</th>
                                        <th class="text-center">类型</th>
                                        <th class="text-center">数量</th>
                                        <th class="text-center">模块</th>
                                        <th class="text-center">服务次数</th>
                                        <th class="text-center">服务期限(月)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in detail.items">
                                        <td class="text-center">{{item.goodsItem.itemName}}</td>
                                        <td class="text-center">
                                            <div v-if="item.goodsItem.itemType == '1'">
                                                硬件
                                            </div>
                                            <div v-if="item.goodsItem.itemType == '2'">
                                                软件
                                            </div>
                                            <div v-if="item.goodsItem.itemType == '3'">
                                                服务
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <div v-if="item.goodsItem.itemType == '2'">
                                                -
                                            </div>
                                            <div v-if="item.goodsItem.itemType == '3'">
                                                -
                                            </div>
                                            <div v-if="item.goodsItem.itemType == '1'">
                                                ${item.num}
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            {{item.moduls||'-'}}
                                        </td>
                                        <td class="text-center">
                                            {{item.numOfService > 0?item.numOfService:'-'}}
                                        </td>
                                        <td class="text-center">
                                            {{item.months > 0?item.months:'-'}}

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--
                            :'######:::'####:'########:'########::'######::
                            '##... ##::. ##:: ##.....::... ##..::'##... ##:
                             ##:::..:::: ##:: ##:::::::::: ##:::: ##:::..::
                             ##::'####:: ##:: ######:::::: ##::::. ######::
                             ##::: ##::: ##:: ##...::::::: ##:::::..... ##:
                             ##::: ##::: ##:: ##:::::::::: ##::::'##::: ##:
                            . ######:::'####: ##:::::::::: ##::::. ######::
                            :......::::....::..:::::::::::..::::::......:::
                            -->
                        <div class="panel panel-default noPadding scroll-target" id="softd">
                            <div class="panel-heading">
                                <h3 class="panel-title">促销品信息</h3>
                            </div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center col-xs-6">促销品名</th>
                                        <th class="text-center col-xs-6">数量</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="detail.gifts&&order.detail.length>0" v-for="vt in detail.gifts">
                                        <td class="text-center">{{vt.giftName }}</td>
                                        <td class="text-center">{{ vt.gift.quantity}}</td>
                                    </tr>
                                </tbody>
                                <tr v-if="detail.gifts==null||detail.gifts.length<=0">
                                    <td colspan="100" class="text-center notFound">
                                        没有相关数据
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--
                            '########::'##::::'##:'########:'########::'#######::'##::: ##::'######::
                             ##.... ##: ##:::: ##:... ##..::... ##..::'##.... ##: ###:: ##:'##... ##:
                             ##:::: ##: ##:::: ##:::: ##::::::: ##:::: ##:::: ##: ####: ##: ##:::..::
                             ########:: ##:::: ##:::: ##::::::: ##:::: ##:::: ##: ## ## ##:. ######::
                             ##.... ##: ##:::: ##:::: ##::::::: ##:::: ##:::: ##: ##. ####::..... ##:
                             ##:::: ##: ##:::: ##:::: ##::::::: ##:::: ##:::: ##: ##:. ###:'##::: ##:
                             ########::. #######::::: ##::::::: ##::::. #######:: ##::. ##:. ######::
                            ........::::.......::::::..::::::::..::::::.......:::..::::..:::......:::
                            -->
                        <div class="text-right">
                            <div v-if="detail.agree">
                                <a class="btn btn-warning pull-left" href="${agree.imageUrl}" target="_blank">点击查看凭证图片</a>
                            </div>
                            <div v-if="detail.locState != '6' ">
                                <a class="btn btn-primary pull-right" @click="back()">返回列表</a>
                            </div>
                            <div v-if="detail.locState == '6' ">
                                <a class="btn btn-primary pull-right" onclick="javascript:cancelConfirm('${order.id}')">确认作废</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </div>
            </div> -->
            </div>

        </div>
</template>
<script>
    export default {
        name: "HtOrderList",
        props: {
            currentOrderId: String, //查看详情时的OrderId
            queState: String,
            customerShxydm: String
            //对外获取的数据
        },
        // '########:::::'###::::'########::::'###::::
        //  ##.... ##:::'## ##:::... ##..::::'## ##:::
        //  ##:::: ##::'##:. ##::::: ##:::::'##:. ##::
        //  ##:::: ##:'##:::. ##:::: ##::::'##:::. ##:
        //  ##:::: ##: #########:::: ##:::: #########:
        //  ##:::: ##: ##.... ##:::: ##:::: ##.... ##:
        //  ########:: ##:::: ##:::: ##:::: ##:::: ##:
        // ........:::..:::::..:::::..:::::..:::::..::
        data: function () {

            //组件内数据部分
            return {
                // currentOrderId:"",
                showLoading: false,
                searchData: {
                    currentPage: 1,
                    customerShxydm: this.customerShxydm
                },
                locState: '2',
                currentPanel: "list",
                sellOrderDetail: {
                    "point": "",
                    "order": {},
                    "items": [],
                    "invoiceSendInfo": {},
                    "goods": [],
                    "gifts": null,
                    "locState": 2,
                    "agree": null,
                    "orderId": "",
                    "info": {}
                },
                detail: {
                    "point": "",
                    "order": {},
                    "items": [],
                    "invoiceSendInfo": {},
                    "goods": [],
                    "gifts": [],
                    "locState": 2,
                    "agree": null,
                    "orderId": "",
                    "info": {}
                },
            }
        },
        // '##::::'##::'#######::'##::::'##:'##::: ##:'########:'########:'########::
        //  ###::'###:'##.... ##: ##:::: ##: ###:: ##:... ##..:: ##.....:: ##.... ##:
        //  ####'####: ##:::: ##: ##:::: ##: ####: ##:::: ##:::: ##::::::: ##:::: ##:
        //  ## ### ##: ##:::: ##: ##:::: ##: ## ## ##:::: ##:::: ######::: ##:::: ##:
        //  ##. #: ##: ##:::: ##: ##:::: ##: ##. ####:::: ##:::: ##...:::: ##:::: ##:
        //  ##:.:: ##: ##:::: ##: ##:::: ##: ##:. ###:::: ##:::: ##::::::: ##:::: ##:
        //  ##:::: ##:. #######::. #######:: ##::. ##:::: ##:::: ########: ########::
        // ..:::::..:::.......::::.......:::..::::..:::::..:::::........::........:::
        mounted: function () {
            var self = this;
            //组件生成时调用
            eventBus.$on('newOrder', (id) => {
                if (id) {
                    self.currentOrderId = id;
                }
            });

            eventBus.$on('init', (id) => {
                if (!id) {
                    self.currentOrderId = "";
                    self.currentPanel = "list";
                }
            });


            window.HtmlFun.extend({
                sellOrderDetail: function (orderId) {
                    eventBus.$emit('newOrder', orderId)
                },
                sellFun: function (id) {
                    return '<a href="javascript:;" onclick="HtmlFun.sellOrderDetail(\'' + id +
                        '\')">查看详情</a>';
                },
                invoiceState: function (state) {
                    // <c:if test="${vt.flag_invoice eq '1' || empty vt.flag_invoice}">
                    //                 <span class="text-danger">未开票</span>
                    //               </c:if>
                    //               <c:if test="${vt.flag_invoice eq '2' }">
                    //                 <span class="text-danger">已开票</span>
                    //               </c:if>
                    //               <c:if test="${vt.flag_invoice eq '3' }">
                    //                 <span class="text-success">已打印</span>
                    //               </c:if>
                    //               <c:if test="${vt.flag_invoice eq '4' }">
                    //                 <span>不需要发票</span>
                    //               </c:if>

                    switch (state) {
                        case '':
                            return '未开票';
                            break;
                        case '1':
                            return '未开票';
                            break;
                        case '2':
                            return '已开票';
                            break;
                        case '3':
                            return '已打印';
                            break;
                        case '4':
                            return '不需要发票';
                            break;
                        default:
                            return '未开票';

                    }
                },
                flagAgreement: function (state) {
                    switch (state) {
                        case '':
                            return '不需要协议';
                            break;
                        case '1':
                            return '不需要协议';
                            break;
                        case '2':
                            return '已打印协议，未上传';
                            break;
                        case '3':
                            return '已上传协议';
                            break;
                        default:
                            return '不需要协议';
                    }

                    // <c:if test="${vt.pay_type eq '0' }">
                    //                 <span>现金</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '1' }">
                    //                 <span>支票</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '2' }">
                    //                 <span>微信</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '3' }">
                    //                 <span>线上支付</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '4' }">
                    //                 <span>赠送</span>
                    //               </c:if>
                },
                payTypeWord: function (state) {
                    switch (state) {
                        case '0':
                            return '现金';
                            break;
                        case '1':
                            return '支票';
                            break;
                        case '2':
                            return '微信';
                            break;
                            case '3':
                            return '线上支付';
                            break;
                            case '4':
                            return '赠送';
                            break;
                        default:
                            return '-';
                    }

                    // <c:if test="${vt.pay_type eq '0' }">
                    //                 <span>现金</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '1' }">
                    //                 <span>支票</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '2' }">
                    //                 <span>微信</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '3' }">
                    //                 <span>线上支付</span>
                    //               </c:if>
                    //               <c:if test="${vt.pay_type eq '4' }">
                    //                 <span>赠送</span>
                    //               </c:if>
                }
            })
        },
        computed: {},
        filters: {
            toNormalTime: function (val) {
                function toNormalTime(shijianchuo) {
                    var time = new Date(parseInt(shijianchuo));
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' +
                        add0(s);
                }

                function add0(m) {
                    return m < 10 ? '0' + m : m;
                }
                return toNormalTime(val);
            }
        },
        // '##::::'##:'########:'########:'##::::'##::'#######::'########:::'######::
        //  ###::'###: ##.....::... ##..:: ##:::: ##:'##.... ##: ##.... ##:'##... ##:
        //  ####'####: ##:::::::::: ##:::: ##:::: ##: ##:::: ##: ##:::: ##: ##:::..::
        //  ## ### ##: ######:::::: ##:::: #########: ##:::: ##: ##:::: ##:. ######::
        //  ##. #: ##: ##...::::::: ##:::: ##.... ##: ##:::: ##: ##:::: ##::..... ##:
        //  ##:.:: ##: ##:::::::::: ##:::: ##:::: ##: ##:::: ##: ##:::: ##:'##::: ##:
        //  ##:::: ##: ########:::: ##:::: ##:::: ##:. #######:: ########::. ######::
        // ..:::::..::........:::::..:::::..:::::..:::.......:::........::::......:::
        methods: {
            back() {
                this.currentPanel = "list";
                this.detail = {
                    "point": "",
                    "order": {},
                    "items": [],
                    "invoiceSendInfo": {},
                    "goods": [],
                    "gifts": [],
                    "locState": 2,
                    "agree": null,
                    "orderId": "",
                    "info": {}
                };
                this.currentOrderId = "";
            }
        },
        watch: {
            currentOrderId: function () {

                var self = this;
                var id = self.currentOrderId;
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log(id);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                if (!id) {
                    self.currentPanel = "list";
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: "ma/sales/ordermaintenance/asyncDetail",
                    data: {
                        orderId: id,
                        locState: 2
                    },
                    beforeSend: function () {
                        self.showLoading = true;
                    },
                    dataType: "json",
                    success: function (data, textStatus, jqXHR) {
                        if (data != null && data != "") {
                            if (data.success) {
                                self.detail = data.bean;
                                self.currentPanel = "detail";
                            } else {
                                tool.alert("提示", "保存失败");
                                self.currentPanel = "list";
                            }
                        } else {
                            tool.alert("提示", "未获取到数据!");
                            self.currentPanel = "list";
                        }
                    },
                    error: function (response) {
                        tool.alert("提示", "请求服务失败,请重试!");
                        self.currentPanel = "list";
                    },
                    complete: function () {
                        self.showLoading = false;
                    }
                });
            },
            customerShxydm() {
                this.searchData.customerShxydm = this.customerShxydm;
            }
        }
    }
</script>
<style scoped>
</style>