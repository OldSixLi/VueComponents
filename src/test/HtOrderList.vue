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
        <div class="col-md-12" v-show="currentPanel=='list'">
            <panel title="订单列表">
                <ht-table ajaxurl="sales/order/asyncQueryList" :search-data="searchData">
                    <column slot data-key="id" name="订单号"></column>
                    <column slot data-key="nsrmc" name="客户名称"></column>
                    <column slot data-key="amount" name="订单金额"></column>
                    <column slot data-key="time" name="订单日期"></column>
                    <column slot data-key="user_name" name="销售人员"></column>
                    <column slot data-key="flag_invoice" name="发票状态"></column>
                    <column slot data-key="flag_agreement" name="协议状态"></column>
                    <column slot data-key="pay_type" name="支付方式"></column>
                    <column slot data-key="ly" name="订单来源"></column>
                    <column slot data-key="total_score" name="订单积分"></column>
                    <column slot data-key="id" name="操作"></column>
                </ht-table>
            </panel>

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
                    <div class="col-xs-12">
                        <div class="propaganda-info">
                            <!--
                            ██████╗ ███████╗██╗     ███████╗████████╗███████╗
                            ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝
                            ██║  ██║█████╗  ██║     █████╗     ██║   █████╗
                            ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝
                            ██████╔╝███████╗███████╗███████╗   ██║   ███████╗
                            ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝
                            -->
                            <!-- <div v-if="locState=='7'">
                                <div class="panel panel-default noPadding scroll-target" id="softo">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">作废信息</h3>
                                    </div>
                                    <div class="panel-body">
                                        <div class="form-horizontal">
                                            <div class="form-group">
                                                <label for="inputPassword3" class="col-sm-2 control-label">作废人员</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" value="${orderRepealed.userId}" readonly>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="time" class="col-sm-2 control-label">作废时间</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" value="<fmt:formatDate value='${orderRepealed.time}' pattern='yyyy-MM-dd HH:mm:ss'/> "
                                                        readonly>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword3" class="col-sm-2 control-label">作废原因</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" value="${orderRepealed.reason}" readonly>
                                                </div>
                                            </div> 
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">订单积分</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" value="${empty order.totalScore ? '0' : order.totalScore}" readonly>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">实际退款金额</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" value="${refundFee}" readonly>
                                                </div>
                                            </div>
                                            <div v-if="${not empty wftqkyy}">
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">无法退全款原因</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" value="${wftqkyy}" readonly>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <!-- end add by WangYu for cancelOrderDetail at 2017/7/13 -->

                            <!--
                            '##::::::::
                             ##:::'##::
                             ##::: ##::
                             ##::: ##::
                             #########:
                            ...... ##::
                            :::::: ##::
                            ::::::..:::
                            -->
                            <!-- 2017年11月27日14:28:20 新增发送详情 -->
                            <!-- <div v-if="{{detail.invoiceSendInfo.FLAG_INVOICE=='4'}">
                                <div v-if"{{detail.invoiceSendInfo.FPLXDM == '004' || invoiceSendInfo.FPLXDM == '007' || invoiceSendInfo.FPLXDM == '026'}">
                                    <div class="panel panel-default noPadding scroll-target">
                                        <div class="panel-heading">发票信息</div>
                                        <div class="panel-body">
                                            <div class="form-horizontal">
                                                <div v-if"${invoiceSendInfo.FPLXDM == '004'}">
                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">发票类型</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="专票" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">抬头</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.NSRMC}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">专用发票公司地址</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.ADDRESS}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">专用发票联系电话</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.MOBILE_PHONE}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">专用发票银行卡号</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.BANK_CARD}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">专用发票开户行</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.BANK_NAME}" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if"${invoiceSendInfo.FPLXDM == '007'}">
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
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.NSRMC}" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if"${invoiceSendInfo.FPLXDM == '026'}">
                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">发票类型</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="电子发票" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">抬头</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.NSRMC}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">邮箱</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.EMAIL}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">电话</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.MOBILE_PHONE}" readonly>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="point" class="col-sm-2 control-label">所属税务分局</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" value="${invoiceSendInfo.SSFJ}" readonly>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

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
                                                <div v-if="detail.invoiceSendInfo.LINK_MAN != ''&&detail.invoiceSendInfo.LINK_MAN != null">
                                                    <input type="text" class="form-control" value="{{detail.invoiceSendInfo.LINK_MAN}}" readonly>
                                                </div>
                                                <div v-if="detail.invoiceSendInfo.LINK_MAN == ''|| detail.invoiceSendInfo.LINK_MAN == null">
                                                    <input type="text" class="form-control" value="无" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- <div class="form-group">
                                            <label for="point" class="col-sm-2 control-label">收件地址</label>
                                            <div class="col-sm-10">
                                                <div v-if="{{detail.invoiceSendInfo.LINK_ADDRESS != '' && invoiceSendInfo.LINK_ADDRESS != null}}">
                                                    <input type="text" class="form-control" value="${invoiceSendInfo.LINK_ADDRESS}" readonly>
                                                </div>
                                                <div v-if="{{detail.invoiceSendInfo.LINK_ADDRESS == '' || invoiceSendInfo.LINK_ADDRESS == null}}">
                                                    <input type="text" class="form-control" value="无" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="point" class="col-sm-2 control-label">快递联系电话</label>
                                            <div class="col-sm-10">
                                                <div v-if="${invoiceSendInfo.LINK_PHONE != '' && invoiceSendInfo.LINK_PHONE != null}">
                                                    <input type="text" class="form-control" value="${invoiceSendInfo.LINK_PHONE}" readonly>
                                                </div>
                                                <div v-if="${invoiceSendInfo.LINK_PHONE == '' || invoiceSendInfo.LINK_PHONE == null}">
                                                    <input type="text" class="form-control" value="无" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">

                                            <label for="point" class="col-sm-2 control-label">快递单号</label>
                                            <div class="col-sm-10">
                                                <div v-if="${invoiceSendInfo.TRACKING_NO != ''&&invoiceSendInfo.TRACKING_NO != null}">
                                                    <input type="text" class="form-control" value="${invoiceSendInfo.TRACKING_NO}" readonly>
                                                </div>
                                                <div v-if="${invoiceSendInfo.TRACKING_NO == ''|| invoiceSendInfo.TRACKING_NO == null}">
                                                    <input type="text" class="form-control" value="无" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="point" class="col-sm-2 control-label">快递类型</label>
                                            <div class="col-sm-10">

                                                <div v-if="${invoiceSendInfo.TRACKING_TYPE != ''&&invoiceSendInfo.TRACKING_TYPE != null}">
                                                    <input type="text" class="form-control" value="${invoiceSendInfo.TRACKING_TYPE}" readonly>
                                                </div>
                                                <div v-if="${invoiceSendInfo.TRACKING_TYPE == ''|| invoiceSendInfo.TRACKING_TYPE == null}">
                                                    <input type="text" class="form-control" value="无" readonly>
                                                </div>
                                            </div>
                                        </div> -->
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
                            <!-- <div class="panel panel-default noPadding scroll-target" id="softo">
                                <div class="panel-heading">
                                    <h3 class="panel-title">点位信息</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="form-horizontal">
                                        <div class="form-group">
                                            <label for="point" class="col-sm-2 control-label">所属点位</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${point}" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

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
                            <!-- <div class="panel panel-default noPadding scroll-target" id="softo">
                                <div class="panel-heading">
                                    <h3 class="panel-title">购买时间</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="form-horizontal">
                                        <div class="form-group">
                                            <label for="time" class="col-sm-2 control-label">购买时间</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="<fmt:formatDate value='${order.time}' pattern='yyyy-MM-dd HH:mm:ss'/> " readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

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
                                                <input type="text" class="form-control" value="${info.shxydm}" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputEmail3" class="col-sm-2 control-label">纳税人名称</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${info.nsrmc}" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">联系地址</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${info.address}" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">联系邮编</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${info.zip}" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">授权服务电话</label>
                                            <div class="col-sm-10" id="phoneList">
                                                <c:set var="string2" value="${info.phone }" />
                                                <c:set var="names" value="${ fn:split(string2,',') }" />
                                                <c:forEach items="${names}" var="c">
                                                    <div class="col-xs-12" style="padding:10px 0px;">
                                                        <input type="text" class="form-control" value="${c}" readonly>
                                                    </div>
                                                </c:forEach>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">联系人</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${info.contact}" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">联系人手机号码</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${info.mobilePhone}" readonly>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">联系人职位</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" value="${info.jobs }" readonly>
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
                            <!-- <div v-if="${order.remarksInvoice != '' && order.remarksInvoice != null}">
                                <div class="panel panel-default noPadding scroll-target">
                                    <div class="panel-heading">发票信息</div>
                                    <div class="panel-body">
                                        <div class="form-horizontal">
                                            <div class="form-group">
                                                <label for="point" class="col-sm-2 control-label">发票备注信息</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" value="${order.remarksInvoice }" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

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
                            <!-- <div class="panel panel-default noPadding scroll-target" id="softb">
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
                                        <c:forEach items="${goods}" var="g">
                                            <tr>
                                                <td class="text-center">${g.orderGoods.goodsId}</td>
                                                <td class="text-center">${g.goodsName}</td>
                                                <td class="text-center">${g.orderGoods.printName}</td>
                                                <td class="text-center">${g.orderGoods.quantity}</td>
                                                <td class="text-center">
                                                    <fmt:formatNumber value="${g.orderGoods.price}" type="number" pattern="0.00" />
                                                </td>
                                                <td class="text-center">${g.orderGoods.sl*100}%</td>
                                                <td class="text-center">
                                                    <fmt:formatNumber value="${g.orderGoods.amount}" type="number" pattern="0.00" />
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </tbody>
                                    <tfoot id="right" style="display: table-footer-group;">
                                        <tr>
                                            <td class="text-right" colspan="8">
                                                <strong>总价 : </strong>
                                                <span id="totlePrice">
                                                    <fmt:formatNumber value="${order.amount }" type="number" pattern="0.00" />元</span>&nbsp;&nbsp;&nbsp;
                                                <strong>积分 : </strong>
                                                <span id="">
                                                    <fmt:formatNumber value="${not empty order.totalScore ? order.totalScore : 0 }" type="number" pattern="" />
                                                </span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div> -->

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
                            <!-- <div class="panel panel-default noPadding scroll-target" id="softc">
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
                                        <c:forEach items="${items}" var="item">
                                            <tr>
                                                <td class="text-center">${item.goodsItem.itemName}</td>
                                                <td class="text-center">
                                                    <div v-if="${item.goodsItem.itemType == '1'}">
                                                        硬件
                                                    </div>
                                                    <div v-if="${item.goodsItem.itemType == '2'}">
                                                        软件
                                                    </div>
                                                    <div v-if="${item.goodsItem.itemType == '3'}">
                                                        服务
                                                    </div>
                                                </td>
                                                <td class="text-center">
                                                    <div v-if="${item.goodsItem.itemType == '2'}">
                                                        -
                                                    </div>
                                                    <div v-if="${item.goodsItem.itemType == '3'}">
                                                        -
                                                    </div>
                                                    <div v-if="${item.goodsItem.itemType == '1'}">
                                                        ${item.num}
                                                    </div>
                                                </td>
                                                <td class="text-center">
                                                    <c:choose>
                                                        <c:when v-if="${not empty item.moduls}">
                                                            ${item.moduls}
                                                        </c:when>
                                                        <c:otherwise>
                                                            -
                                                        </c:otherwise>
                                                    </c:choose>
                                                </td>
                                                <td class="text-center">
                                                    <c:choose>
                                                        <c:when v-if="${item.numOfService > 0}">
                                                            ${item.numOfService }
                                                        </c:when>
                                                        <c:otherwise>
                                                            -
                                                        </c:otherwise>
                                                    </c:choose>
                                                </td>
                                                <td class="text-center">
                                                    <c:choose>
                                                        <c:when v-if="${item.months > 0}">
                                                            ${item.months}
                                                        </c:when>
                                                        <c:otherwise>
                                                            -
                                                        </c:otherwise>
                                                    </c:choose>
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </tbody>
                                </table>
                            </div> -->

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
                            <!-- <div class="panel panel-default noPadding scroll-target" id="softd">
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
                                    <c:choose>
                                        <c:when v-if="${not empty gifts}">
                                            <tbody>
                                                <c:forEach items="${gifts}" var="vt">
                                                    <tr>
                                                        <td class="text-center">${vt.giftName }</td>
                                                        <td class="text-center">${ vt.gift.quantity}</td>
                                                    </tr>
                                                </c:forEach>
                                            </tbody>
                                        </c:when>
                                        <c:otherwise>
                                            <tr>
                                                <td colspan="100" class="text-center notFound">没有相关数据</td>
                                            </tr>
                                        </c:otherwise>
                                    </c:choose>
                                </table>
                            </div> -->


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
                            <!-- <div class="text-right">
                                <div v-if="${not empty agree }">
                                    <a class="btn btn-warning pull-left" href="${agree.imageUrl}" target="_blank">点击查看凭证图片</a>
                                </div>
                                <div v-if="${locState != '6'}">
                                    <a class="btn btn-primary pull-right" onclick="javascript:history.back(-1)">确定</a>
                                </div>
                                <div v-if="${locState == '6'}">
                                    <a class="btn btn-primary pull-right" onclick="javascript:cancelConfirm('${order.id}')">确认作废</a>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "HtOrderList",
        props: {

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
                locState: '2',
                currentPanel: "detail",
                sellOrderDetail: {},
                detail: JSON.parse(
                    '{"success":true,"message":null,"bean":{"point":"园区","order":{"id":"20180425155529483000000000000003","customerId":8806,"time":1524642929000,"salesman":"admin","amount":0.01,"state":"Y","flagPay":"Y","payType":"0","flagInvoice":"1","flagAgreement":"2","remarks":null,"pointId":"000","sendStatus":null,"ly":"XSXT","totalScore":0,"remarksInvoice":"智慧财税服务有效期:2021年01月10日"},"items":[{"goodsItem":{"id":1052,"goodsId":"TEST-03","itemId":"90000000","itemName":"VIP电话咨询","itemType":"3","times":null,"quantity":null},"moduls":"","num":1,"numOfService":-1,"months":12,"showMonths":"","isOnce":"N"},{"goodsItem":{"id":1053,"goodsId":"TEST-03","itemId":"90000002","itemName":"系统巡检（上门/远程）","itemType":"3","times":null,"quantity":null},"moduls":"","num":1,"numOfService":-1,"months":12,"showMonths":"","isOnce":"N"}],"invoiceSendInfo":{"TRACKING_NO":null,"LINK_ADDRESS":null,"TRACKING_TYPE":null,"NSRMC":null,"BANK_CARD":null,"ADDRESS":null,"LINK_MAN":null,"BANK_NAME":null,"LINK_PHONE":null,"SSFJ":null,"MOBILE_PHONE":null,"EMAIL":null,"FPLXDM":null,"FLAG_INVOICE":"1"},"goods":[{"orderGoods":{"id":null,"orderId":"20180425155529483000000000000003","goodsId":"TEST-03","quantity":1,"price":0.01,"amount":0.01,"sl":0.17,"spbm":"1060301029900000000","printName":"浩天财税通-通用财务系统","isRenew":null,"score":null},"goodsName":"测试商品3  ","gift":null,"giftName":null,"score":null,"alone":"N","yj":"N","onlyCompany":"Y"}],"gifts":null,"locState":2,"agree":null,"orderId":"20180425155529483000000000000003","info":{"id":8806,"type":"1","shxydm":"120117777303334","gsNsrsbh":"","dsNsrsbh":"","nsrmc":"kkkk","address":"的撒啊萨达大事的撒打算","zip":"123123","phone":"15902212707","contact":"离得啊啊啊啊","wechatOpenid":"123","qqOpenid":null,"mobilePhone":"15902212707","vipLevel":1,"regTime":1510802155000,"modifyTime":1526291136000,"source":null,"jobs":"公司负责人","ukeyId":null,"djxh":null}}}'
                ).bean,
            }
        },
        mounted: function () {
            //组件生成时调用
        },
        methods: {}
    }
</script>
<style scoped>
</style>