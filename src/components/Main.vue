<template>
	<div id="app" class="container" v-cloak>
		<div class="row">
			<!-- 消除外边距 -->
			<div class="col-md-12">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">表单</a></li>
					<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">布局组件</a></li>
					<li role="presentation" class=""><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">其他组件</a></li>
				</ul>
				<!-- Tab panes -->
				<div class="tab-content">
					<!-- 第一个 -->
					<div role="tabpanel" class="tab-pane active" id="home">
						<div class="row">
							<div class="col-md-6">
								<!-- 表单 -->
								<panel title="表单组件">
									<!-- 标题 -->
									<h3 style="margin-bottom:15px;text-align:center;">CF武器列表</h3>
									<!-- Form表单 -->
									<ht-form ref="wuqiku" info-type="info" :horizontal="true">
										<ht-form-group label="M4A1-蓝钻：" label-width="20" name="lanzuan" :require="true" require-message="请输入武器价格">
											<input type="text" name="lanzuan" v-model="lanzuan" class="form-control" placeholder="请输入武器价格">
										</ht-form-group>
										<ht-form-group label="9A91-S：" label-width="20" name="aaa" min="91" max="200" max-message="您输入的值超出了范围">
											<input type="text" name="aaa" v-model="aaa" class="form-control" placeholder="请输入武器价格">
										</ht-form-group>
										<ht-form-group label="黄金警棍啊：" label-width="20" name="jinggun" maxlength="10" maxlength-message="最多输入10个字符" minlength="3" :require="true">
											<input type="text" name="jinggun" v-model="jinggun" class="form-control" placeholder="请输入武器价格">
										</ht-form-group>
										<ht-form-group label="M240B-苍雷：" label-width="20" name="canglei" minlength="10">
											<textarea rows="5" cols="15" v-model="canglei" class="form-control" name="canglei"></textarea>
										</ht-form-group>
										<ht-form-group label="破天狂龙：" label-width="20" name="kuanglong" pattern="^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])" pattern-message="破天狂龙邀请你请输入正确的邮箱格式">
											<input type="text" name="kuanglong" v-model="kuanglong" class="form-control" placeholder="请输入武器价格">
										</ht-form-group>
										<ht-form-group label="塞尔维亚M21：" label-width="20" name="weiya" :require="true" require-message="请选择您的武器">
											<select class="form-control" name="weiya">
													<option value="">请选择</option>
													<option value="FR-F2 寒冰">FR-F2 寒冰</option>
													<option value="绿色烟雾弹">绿色烟雾弹</option>
													<option value="金砖">金砖</option>
													<option value="碳合金小刀">碳合金小刀</option>
												</select>
										</ht-form-group>
										<ht-form-group label="购买人物：" label-width="20" name="cfWuqi" :require="true" require-message="请至少选择一个人物" min='2' min-message="请至少选择两位CF人物">
											<label v-for="x in formPersonsList">
	                          <ht-checkbox v-model="formTotalPrice" :label='x.price' name='cfWuqi'> {{x.name+'('+x.price+'元)　'}}</ht-checkbox>
	                        </label>
										</ht-form-group>
										<hr>
										<div class="text-right">
											<button type="button" class="btn btn-default" @click="cancelCheckForm('wuqiku')">取消</button>
											<button type="button" class="btn btn-large btn-primary" @click="submitForm('wuqiku')">保存</button>
										</div>
									</ht-form>
								</panel>
								</panel>
								<panel title="单选按钮组件">
									<ht-radio v-model="radio" label="1" @click="alerts()" @change="change()" name="cfPerson">灵狐者</ht-radio>
									<ht-radio v-model="radio" label="2" @click="alerts()" @change="change()" name="cfPerson">猎狐者</ht-radio>
									<ht-radio v-model="radio" label="3" @click="alerts()" @change="change()" name="cfPerson">夜玫瑰</ht-radio>
									<ht-radio v-model="radio" label="4" @click="alerts()" @change="change()" name="cfPerson">曼陀罗</ht-radio>
									<p>当前选项的值是:{{radio}}</p>
									<div id="clickRecord" class="col-md-6"></div>
									<div id="changeRecord" class="col-md-6"></div>
								</panel>
								<panel title="复选框组件">
									<label v-for="x in PersonsList">
	                      <ht-checkbox v-model="totalPrice" :label='x.price' name='cfWuqis'> {{x.name+'('+x.price+'元)　'}}</ht-checkbox>
	                    </label>
									<p> 总共花费了 {{totalPrice.sum()}}元</p>
								</panel>
							</div>
							<div class="col-md-6">
								<panel title="分页组件">
									<button type="button" slot="header" class="btn-link pull-right" @click="changePage" style="outline: none;">随机生成总页数与页码</button>
									<ht-page :param="pageOptions"></ht-page>
									<!-- <button type="button" class="btn btn-primary pull-right" @click="changePage">随机生成总页数与页码</button> -->
									<!-- <div slot="footer">底部的内容</div> -->
								</panel>
								<panel title="Modal提示框">
									<div class="text-center">
										<button type="button" class="btn btn-success " @click="modalControl()">显示modal</button></div>
									<!-- Modal提示框 -->
								</panel>
								<ht-modal :is-show="showModal" @states="modalControl" title="提示框">
									<!-- <p>&lt;ht-modal&gt;组件里边包裹的是&lt;app&gt;组件</p> -->
									<img src="/src/assets/img/usericon/usericon_2.jpg" alt="" class="img-responsive">
								</ht-modal>
								<!-- 人物列表 -->
								<panel title="动画效果" style="background-color: #ddd;">
									<info-block img-src="/src/assets/img/usericon/xun.jpg" title="陈奕迅" intro="Eason,歌手,演员" word="拦路雨偏似雪花饮泣的你冻吗这风褛我给你磨到有襟花连调了职也不怕怎么始终牵挂苦心选中今天想车你回家原谅我不再送花伤口应要结疤花瓣铺满心里坟场才害怕如若你非我不嫁彼此终必火化一生一世等一天需要代价谁都只得那双手靠拥抱亦难任你拥有要拥有必先懂失去怎接受曾沿着雪路浪游为何为好事泪流谁能凭爱意要富士山私有何不把悲哀感觉假设是来自你虚构试管里找不到它染污眼眸前尘硬化像石头随缘地抛下便逃走我绝不罕有往街里绕过一周我便化乌有"
									    style="width:32%;margin-left: 1%;"></info-block>
									<info-block img-src="/src/assets/img/usericon/zhou.jpg" title="周杰伦" intro="歌手,演员" word="对这个世界如果你有太多的抱怨跌倒了 就不敢继续往前走为什么 人要这么的脆弱 堕落请你打开电视看看 多少人为生命在努力勇敢的走下去我们是不是该知足珍惜一切 就算没有拥有还记得你说家是唯一的城堡随着稻香河流继续奔跑微微笑 小时候的梦我知道不要哭让萤火虫带着你逃跑乡间的歌谣永远的依靠回家吧 回到最初的美好" style="width:32%;"></info-block>
									<info-block img-src="/src/assets/img/usericon/qian.jpg" title="薛之谦" intro="歌手" word="简单点说话的方式简单点递进的情绪请省略你又不是个演员别设计那些情节没意见我只想看看你怎么圆你难过的太表面 像没天赋的演员观众一眼能看见该配合你演出的我演视而不见在逼一个最爱你的人即兴表演什么时候我们开始收起了底线顺应时代的改变看那些拙劣的表演可你曾经那么爱我干嘛演出细节我该变成什么样子才能延缓厌倦原来当爱放下防备后的这些那些才是考验"
									    style="width:32%;"></info-block>
								</panel>
							</div>
						</div>
					</div>
					<!-- 第二个 -->
					<div role="tabpanel" class="tab-pane" id="profile">
						<div class="row">
							<div class="col-md-2">
								<!-- <img  v-random-img >  -->
								<panel title="随便测试的组件">
									<pr-list ref="pianduan">
										<pr slot min="1" length="2" :has-error="false" message="昵索的对">父组件获取到这句话并进行校验</pr>
										<pr slot min="32" length="10" message="something wrong!">显示相关的内容</pr>
										<pr slot="red" min="3333" length="3" message="something3333!">slot='red'的组件内容</pr>
									</pr-list>
									<button type="button" class="btn btn-success" @click="likai('pianduan')">自定义BUTTON</button>
								</panel>
							</div>
							<div class="col-md-8">
								<div class="panel panel-default" style="margin-top: 15px;">
									<div class="panel-heading">搜索建议组件</div>
									<div class="panel-body">
										<ajax-search @suggestClick="suggestClick"></ajax-search>
										<panel title="歌曲详情">
											<div class="row" style="margin-top: 15px;" v-show="song.showDetail">
												<div class="col-md-3">
													<p class="text-right"><img :src="song.songImg" alt="" class="img-responsive img-thumbnail" style="width:100px;height: 100px;"></p>
												</div>
												<div class="col-md-9">
													<p>名称:{{song.name}}</p>
													<p>作者:{{song.author}}</p>
													<p style="word-break: break-all;">链接: <a :href="song.url" class="btn-link" v-show="song.name" :download="song.name+'.mp3'">点此下载</a> </p>
												</div>
											</div>
											<!-- 动画效果 -->
											<div style="position: relative; height: 100px;" v-show="!song.showDetail">
												<loading></loading>
											</div>
										</panel>
									</div>
								</div>
								<!-- 生成随机图片 -->
								
							</div>
							<div class="col-md-2">
								{{$store.name}}
								<button type="button" class="btn btn-primary btn-block" @click="changeName">改变全局sote中的名称</button>
							 </div>
						</div>
					</div>
					<!-- 第三个 -->
					<div role="tabpanel" class="tab-pane " id="messages">
						<panel title="表格组件">
							<span slot="header" class="pull-right"><b>2017年11月8日11:25:07 生成</b></span>
							<panel title="人员列表">
								<ht-table slot="outer" ajaxurl="ma/users" :search-data="searchData" class="">
									<!--内部组件-->
									<!-- http://localhost:3001/users/allUser -->
									<column slot name="名称" data-key="name"></column>
									<column slot name="性别" data-key="gender" align="center" filter="toGender"></column>
									<column slot name="时间" data-key="Regtime" align="center" filter="toNormalTime"></column>
									<column slot name="头像" data-key="iconUrl" align="center" filter="toImg"></column>
									<column slot name="编辑" data-key="ID,name,Regtime" align="center" filter="testMultiParams"></column>
								</ht-table>
							</panel>
						</panel>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import router from './../router/index.js';
	import HtDate from './../ht/HtDate.vue';
	import store from './../store/index';
	export default {
		name: "Main",
		props: {
			//对外获取的数据
		},
		data: function() {
			//组件内数据部分
			return {
				song: {
					id: "",
					name: "",
					author: "",
					songImg: "",
					url: "",
					showDetail: true
				},
				showModal: false,
				age: 45,
				zhoujielun: "周杰伦",
				price: 188,
				lanzuan: 15,
				aaa: 156,
				jinggun: 213,
				canglei: 8888888888888888,
				kuanglong: '321@qq.com',
				linghu: "1",
				searchData: {
					currentPage: 1
				},
				searchWord: "李老六",
				show: true,
				// 分页控件参数:
				pageOptions: {
					currentPage: 1,
					totalPage: 10,
					showItem: 5,
					// prevText: "上一页",
					// nextText: "下一页",
					click: function(currentPage) {
						console.log("当前方法显示的页数是:" + currentPage);
					}
				},
				timepicker: "2017/11/14",
				radio: "2",
				totalPrice: [58],
				PersonsList: [{
					name: "猎狐者",
					price: 38
				}],
				formPersonsList: [{
					"name": "猎狐者",
					"price": 38
				}, {
					"name": "飞虎队",
					"price": 58
				}, {
					"name": "灵狐者",
					"price": 108
				}, {
					"name": "夜玫瑰",
					"price": 18
				}, {
					"name": "刀锋战士",
					"price": 36
				}, {
					"name": "潘多拉",
					"price": 19
				}],
				formTotalPrice: [19]
			}
		},
		mounted: function() {
			this.getPerson();
		},
		methods: {
			/**
			 * 修改Vuex中属性的方法 
			 * 要求必须使用commit修改属性,这样数据流更加清晰和容易维护
			 * @returns
			 */
			changeName(){
                store.commit('changeName');
            },
			getPerson: function() {
				var _self = this;
				$.ajax({
					type: "GET",
					url: "/ma/person",
					dataType: "json",
					success: function(data) {
						if (data != null && data != "") {
							_self.PersonsList = data;
						} else {
							_self.PersonsList = [];
						}
					},
					error: function(response) {
						console.log("Mian.vue获取人物列表失败,请重试");
					}
				});
			},
			//不推荐使用JQ操作DOM  但是此处只是展示效果
			alerts: function alerts(e) {
				$("#clickRecord").append('<p><b>@click</b>事件：每次<b>点击</b>都会增加内容，当前点击的值为：' + this.radio + '，可以根据此来进行相关操作</p>');
			},
			change: function change() {
				$("#changeRecord").append('<p><b>@change</b>事件：如果值发生改变，提示当前改变后的值为：' + this.radio + '可以根据此进行相关操作</p>');
				return false;
			},
			daterSelect: function(val) {
				alert('当前选择的日期为' + val);
			},
			suggestClick: function(state, result) {
				if (state == 'begin') {
					this.song.showDetail = false;
					this.song.name = '获取中...';
					this.song.author = '';
					this.song.songImg = '';
					this.song.url = '';
					this.song.id = '';
				} else if (state == 'end') {
					//歌曲详情
					this.song.id = result.id;
					this.song.name = result.name;
					this.song.author = result.author;
					this.song.songImg = result.songImg;
					this.song.url = result.url;
					this.song.showDetail = true;
				}
			},
			changePage: function() {
				var num = parseInt(Math.random() * 20 + 1);
				this.pageOptions.currentPage = num;
				this.pageOptions.totalPage = parseInt(Math.random() * (40 - 30) + 30);
				/**
				 * 生成随机数（不包含起止点）
				 * 
				 * @param {any} start 起点
				 * @param {any} end 终点
				 */
				function radomNum(start, end) {
					end = start > end ? [start, start = end][0] : end; //保证End最大  
					return
				}
			},
			modalControl: function() {
				this.showModal = !this.showModal;
			},
			likai: function(formName) {
				this.$refs[formName].check();
			},
			submitForm: function(formName) {
				this.$refs[formName].checkItem(function(isPass, errorList) {
					if (isPass) {
						console.log("通过");
					} else {
						console.error("通不过");
						console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
						console.info("用户自定义处理错误" + errorList.join('&&&&&'));
						console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
					}
				});
			},
			cancelCheckForm: function(formName) {
				this.$refs[formName].clearValidate();
			},
			test(id, name) {
				alert('不知道好不好使啊')
			},
			search: function(value) {
				console.log(
					new Date().getHours() +
					':' + new Date().getMinutes() +
					':' + new Date().getSeconds() + "的值是:" +
					value);
			}
		},
		components: {
			HtDate
		}
	}
</script>
<style scoped>
	[v-cloak] {
		display: none;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
</style>