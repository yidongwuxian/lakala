<template>
	<div id="searchPage">
		<div id="OUT" v-show="OUT_show">再按一次退出伊翔</div>
		<div ref="searchPage">
			<div>
				<header>
					<ul>
						<li class="iconfont" @click="back"></li>
						<li>机票搜索</li>
						<li class="iconfont"></li>
					</ul>
				</header>
				<div class="main">
					<div class="topPart">
						<div class="myOrders" @click="goOrderList"><span class="iconfont">&#xe634;</span><span>我的订单</span></div>
						<div class="city">							
							<li>
								<div class="cityTitle">选择始发地</div>
								<div class="depCity" @click="cityChoose('go')">{{cityGo.name}}</div>
								<div class="depCitySpell">{{cityGo.spell}}</div>
							</li>
							<li class="cityChange animated" @click="cityChange" :class="{ wobble : cityChange_animate }"><span class="iconfont">&#xe603;</span></li>
							<li>
								<div class="cityTitle">选择目的地</div>
								<div class="arrCity" @click="cityChoose('back')">{{cityBack.name}}</div>
								<div class="arrCitySpell">{{cityBack.spell}}</div>
							</li>
						</div>
						<div class="date">
							<div class="date_">
								<div class="date_main">
									<div class="goBackDate">
										<li class="goLi"><span class='iconfont font099fde'>&#xe609;</span>
											<mu-date-picker hintText="选择出发日期" v-model="fromDate" />
										</li>
										<li class="backLi animated" v-show="backLi_show" :class="{ bounceOutDown:backLiFadeOut,bounceInDown:!backLiFadeOut }"><span class='iconfont font099fde'>&#xe7cb;</span>
											<mu-date-picker hintText="选择达到日期" v-model="arrDate"/>
										</li>
									</div>
									<div class="wangfan" @click="checkGoBack">往返 <span class="iconfont checkGoBack" :type="tripType" :class="{ fontaaa:!checkGoBackColor,font099fde:checkGoBackColor }"> &#xe644;</span></div>
								</div>
								<div class="passenger">
									<li><span class="iconfont passengerIcon font099fde">&#xe6e5;</span>成人<span v-show="child">、儿童</span></li>
									<li><span @click="checkPassenger" type="1" ref="checkPassenger" class="iconfont checkPassenger fontaaa"> &#xe644;</span></li>
								</div>
								<div class="seatRank">
									<li @click="checkSeatRank" :class="{ active: isActive }">经济舱</li>
									<li @click="checkSeatRank" :class="{ active: !isActive }">头等舱/商务舱</li>
								</div>
							</div>
						</div>
					</div>
					<div style="height:0.68rem;" v-show="backDiv_show"></div>
					<div class="bottomPart">
						<div class="buttonDiv" @click="search"><span>搜索</span></div>
						<p class="help fontaaa">查看帮助中心 <span class="iconfont font099fde"> &#xe639;</span></p>
						<div class="record fontaaa" ref="recordScroll">
							<!-- <ul ref="scrollUl"> -->
							<ul ref="scrollUl">
								<li v-for="group in recordList">
									<span @click="useRecord(item)" v-for="item in group">{{item.tripType|tripType}} {{item.fromCity}}-{{item.toCity}}</span>
								</li>
							</ul>
						</div>
						<div class="banner"></div>
						<p class="servicePhone fontaaa">客服电话：4001355500&nbsp;&nbsp;&nbsp;本服务由伊翔运达提供</p>
					</div>
				</div>
			</div>
		</div>
		<div>
			<cityChoose :type="type" :show="cityChoose_show" v-on:listenToChildEvent="getChildData"></cityChoose>
		</div>
	</div>
</template>
<script>
	
	import BScroll from 'better-scroll';
	import cityChoose from '../cityChoose/cityChoose.vue';
	const ERR_OK = 0;
	const REM = innerWidth / 750 * 100;
	export default {
		data() {
			return {
				OUT_show: false, //退出提示框的隐藏
				child: false, //是否选中儿童
				isActive: true, //舱位的激活状态
				backLiFadeOut: false, //往返按钮的默认状态 
				backDiv_show: true, //填充高度的DIV
				backLi_show: true, //回程日历Li
				cityChoose_show: false, //城市选择组件的显示与隐藏
				type: "", //选择城市的类型
				tripType: "RT", //默认的行程类型
				checkGoBackColor: true, //往返按钮颜色
				cityGo: { //默认的选中城市
					name: "北京",
					spell: "BEIJING"
				},
				cityBack: {
					name: "上海",
					spell: "SHANGHAI"
				},
				fromDate:"", //出发日期
				arrDate:"",  //达到日期
				cityChange_animate: false, //交换城市动画
				recordList: [] //搜索城市记录
			};
		},
		watch: {
			tripType: function(newTripType, oldTripType) {
				var that = this;
				if(newTripType == "RT") {
					this.checkGoBackColor = true;
					this.backLiFadeOut = false;
					setTimeout(function() {
						that.backLi_show = true;
						that.backDiv_show = true;
					}, 0)
				}
				if(newTripType == "OW") {
					this.checkGoBackColor = false;
					this.backLiFadeOut = true;
					setTimeout(function() {
						that.backLi_show = false;
						that.backDiv_show = false;
					}, 1000)
				}
			}
		},
		methods: {
			//点击后退按钮
			back: function() {
				//this.$router.go(-1);
			},
			//点击往返的复选框
			checkGoBack: function() {
				if(this.tripType == "RT") {
					this.tripType = "OW"
				} else {
					this.tripType = "RT"
				}
			},
			//点击乘机人的复选框
			checkPassenger: function() {
				var $checkPassenger = this.$refs.checkPassenger;
				var type = $checkPassenger.getAttribute("type");
				if(type == "1") {
					$checkPassenger.setAttribute("type", "0");
					$checkPassenger.style.color = "#099fde";
					this.child = true;
				} else {
					$checkPassenger.setAttribute("type", "1");
					$checkPassenger.style.color = "#aaaaaa";
					this.child = false;
				}
			},
			//交换出发城市与到达城市
			cityChange: function() {
				var go = this.cityGo;
				var back = this.cityBack;
				this.cityGo = back;
				this.cityBack = go;
				//执行动画
				this.cityChange_animate = true;
				var that = this;
				setTimeout(function() {
					that.cityChange_animate = false;
				}, 1000)
			},
			//选择舱位
			checkSeatRank: function() {
				this.isActive = !this.isActive;
			},
			//点击城市显示城市组件
			cityChoose: function(type) {
				this.type = type; //所要选择的城市类型
				this.cityChoose_show = true; //显示城市选择插件
			},
			//使用历史记录
			useRecord: function(data) {
				this.cityGo = {
					name: data.fromCity,
					spell: data.fromCitySpell
				};
				this.cityBack = {
					name: data.toCity,
					spell: data.toCitySpell
				};
				this.tripType = data.tripType;
			},
			goOrderList:function(){
				this.$router.push("/orderList");
			},
			search:function(){
				this.$store.commit("tripType",this.tripType);//存入行程类型
				var queryData = {
					"tripType":this.tripType,
					"cityGo":this.cityGo.name,
					"cityBack":this.cityBack.name,
					"fromDate":this.fromDate,
					"arrDate":this.arrDate
				};
				this.$router.push({path: '/flightList', query: queryData});
			},
			//与子组件通信,接收子组件的字段
			getChildData: function(data) { //接收子组件发送的数据
				if(data.length == 1) {
					this.cityChoose_show = data[0]; //影藏子组件
				} else {
					this.type = data[1]; //判断获得城市的类型	
					this.cityChoose_show = data[0]; //影藏子组件
					if(this.type == "go") {
						this.cityGo = data[2];
					} else {
						this.cityBack = data[2];
					}
				}

			}
		},
		created() {
			var that = this;
			this.$axios.get('/api/cityRecord')
				.then((res) => {
					res = res.data
					if(res.errno === ERR_OK) {
						this.recordList = res.data;
						this.$nextTick(() => {
							var $scrollUl = this.$refs.scrollUl;
							var liLength = $scrollUl.getElementsByTagName("li").length;
							$scrollUl.style.width = REM * 6.9 * liLength + 'px';
							this.recordScroll = new BScroll(this.$refs.recordScroll, {
								scrollX: true,
								click: true
							});
						});
					}
				}).catch((error) => {
					console.warn(error)
				})
			//控制物理返回键
			OUT();
			function OUT() {
				//进入页面则向历史记录pushState
				pushHistory();
				//监听popstate事件
				window.onpopstate = function(e) {
					showBox("再按一次退出程序", 2000, function() {						
						pushHistory();
					});
				};
				//向历史记录pushState
				function pushHistory(){	
					var state = {
						title: "mainPage",
						url: ""
					};
					//增加判断1.避免多次添加history.state以至于无法退出					
					if(history.state==null){	
						window.history.pushState(state,null, "");
					}else if(history.state.title!="mainPage"){
						window.history.pushState(state, null, "");
					}
				}
				//在点击物理放回键时，判断页面各组件的显示状态，为显示状态则关闭
				function showHide(){					
					if(that.cityChoose_show==true){
						that.cityChoose_show = false;
						pushHistory();
						return false;
					}else{
						that.OUT_show = true; //显示退出框
					}
				}
				//出发popstate事件的执行函数
				function showBox(msg, timeOut, onTimeOut) {
					showHide();
					if(typeof timeOut === "undefined") timeOut = 2000;
					var t = setTimeout(function() {
						that.OUT_show = false; //如果不退出，隐藏
						if(typeof onTimeOut !== "undefined") onTimeOut(); //不退出则pushState
					}, timeOut);
				}
			}
			//从本地获取账号密码
			login();
			function login(){
				//window.sessionStorage.removeItem('loginData');
				var loginData = window.localStorage.getItem('loginData');
				if(loginData) that.$store.commit('login');//存储登录状态	
			}
		},
		components: {
			cityChoose
		}
	};
</script>
<style lang="scss">
	#searchPage {
		font-size: 0.22rem;
		width:100%;
		#OUT {
			color: white;
			text-align: center;
			font-size: 0.3rem;
			height: 0.52rem;
			line-height: 0.56rem;
			width: 50%;
			border-radius: 10px;
			background: rgba(0, 0, 0, 0.7);
			position: fixed;
			bottom: 1.5rem;
			left: 50%;
			transform: translateX(-50%);
			z-index: 1000;
		}
		header ul {
			height: 44px;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			line-height: 44px;
			li:first-child {
				margin-left: 30px;
				width: 34px;
			}
			li:last-child {
				margin-right: 30px;
				width: 34px;
			}
			.iconfont {
				font-size: 16px;
			}
		}
		.topPart {
			width: 7.5rem;
			height: 3.22rem;
			margin: 0 auto;
			background: #099fde;
			position: relative;
			.myOrders{
				position: absolute;
				right:0;
				top:0.16rem;
				width:1.2rem;
				height:0.54rem;
				text-align: right;
				font-size: 0.2rem;
				color:#fff600;
				background: #066f9c;
				line-height: 0.54rem;
				border-radius:5px 0 0 5px;
				.iconfont{
					font-size: 0.2rem;
				}
			}
			.city {
				height: 2.4rem;
				width: 6.9rem;
				margin: 0 auto;
				display: flex;
				justify-content: space-around;
				color: white;				
				>li {
					text-align: center;
					margin-top: 0.5rem;
				}
				>li:first-child,>li:last-child{
					width:3rem;
				}
				.cityChange>span {
					font-size: 0.46rem;
					line-height: 1.6rem;
				}
				.cityTitle,
				.depCitySpell,
				.arrCitySpell {
					font-size: 0.2rem;
				}
				.depCity,
				.arrCity {
					font-size: 0.54rem;
				}
			}
			.date {
				width: 6.9rem;
				padding-bottom: 0.45rem;
				background: white;
				margin: 0 auto;
				border-radius: 0.05rem;
				box-shadow: 0 0 15px #c5e6f4;
				.date_ {
					width: 6.22rem;
					margin: 0 auto;
					.date_main {
						border-bottom: 1px solid #ededed;
						display: flex;
						padding: 0.16rem 0;
						transition: 2s;
						/*更改Muse-Ui日期选择的部分样式*/
						.mu-date-picker {
							width: 4rem;
							.mu-text-field {
								width: 4rem;
								border: none;
								hr {
									background: white;
								}
							}
						}
						.goBackDate li {
							height: 0.68rem;
							line-height: 0.68rem;
							.iconfont {
								font-size: 0.3rem;
								margin-right: 0.16rem;
							}
							input[type=text] {
								border: none;
								font-size: 0.28rem;
								height: 100%;
								outline: none;
							}
						}
						.wangfan {
							flex-grow: 1;
							text-align: right;
							font-size: 0.26rem;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							.checkGoBack {
								font-size: 0.35rem;
								margin-left: 0.05rem;
								position: relative;
								top: 0.02rem;
							}
						}
					}
					.passenger {
						height: 1rem;
						line-height: 1rem;
						display: flex;
						li:last-child {
							flex-grow: 1;
							text-align: right;
							.checkPassenger {
								font-size: 0.35rem;
							}
						}
						li:first-child {
							font-size: 0.28rem;
							.passengerIcon {
								font-size: 0.3rem;
								margin-right: 0.16rem;
							}
						}
					}
					.seatRank {
						display: flex;
						border: 1px solid #099fde;
						border-radius: 0.03rem;
						height: 0.6rem;
						line-height: 0.6rem;
						font-size: 0.25rem;
						li {
							width: 50%;
							text-align: center;
							color: #099fde;
							background: white;
						}
						.active {
							color: white;
							background: #099fde;
						}
					}
				}
			}
		}
		.bottomPart {
			width: 6.9rem;
			margin: 0 auto;
			.buttonDiv {
				height: 0.82rem;
				background: #faa000;
				border-radius: 0.05rem;
				text-align: center;
				line-height: 0.82rem;
				color: white;
				font-size: 0.32rem;
				margin-top: 2.67rem;
			}
			.help {
				text-align: right;
				margin-top: 0.2rem;
				.iconfont {
					font-size: 0.22rem;
				}
			}
			.record {
				overflow: hidden;
				margin: 0.3rem 0;
				ul {
					display: flex;
					/*width:6.9rem*3;*/
					li {
						width: 6.9rem;
						display: flex;
						justify-content: space-around;
					}
				}
			}
			.banner {
				height: 2.15rem;
				border-radius: 0.05rem;
				border: none;
				background: url(../../assets/img/logo.png) no-repeat center center;
				background-size: cover;
			}
			.servicePhone {
				margin-top: 0.3rem;
				line-height: 0.7rem;
				text-align: center;
			}
		}
	}
</style>