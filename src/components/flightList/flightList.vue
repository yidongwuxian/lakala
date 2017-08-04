<template>
	<div id="flightList">
		<header>
			<ul>
				<li class="iconfont" @click="back">&#xe67e;</li>
				<li>{{diffTripType.title}}</li>
				<li class="font099fde"></li>
			</ul>
		</header>
		<div class="main">
			<div class="main_">
				<div class="flightGoMess" v-show="flightGoMess_show">
					<div class="flightGoMess_">
						<span class="qucheng">去程</span>
						<span>05-17 (周三)</span>
						<span>07:20-09:35</span>
						<span>CA155</span>
						<span class="iconfont">&#xe7d0;</span>
					</div>
				</div>
				<div class="changeDate">
					<div><span class="iconfont">&#xe67e;</span>前一天</div>
					<div class="currentDate">{{diffTripType.currentDate}}</div>
					<div>后一天<span class="iconfont">&#xe7d0;</span></div>
				</div>
				<div class="flightList">
					<ul>
						<li v-for="item in flightList" @click="chooseFlight(item)">
							<div class="item_top">
								<div>
									<div class="time">{{item.fromTime}}</div>
									<div class="airport">{{item.fromA}}{{item.fromT}}</div>
								</div>
								<div><span class="iconfont to">&#xe620;</span></div>								
								<div>
									<div class="time">{{item.toTime}}</div>
									<div class="airport">{{item.arrA}}{{item.toT}}</div>
								</div>
								<div></div>
								<div>
									<div class="price">￥{{item.price}}</div>
								</div>
							</div>
							<div class="item_bottom">{{item.airlineCompany}}{{item.flightNo}} | {{item.aircraft}}</div>
						</li>
					</ul>
				</div>
				<div class="orderBy">
					<div @click="sort('filter_1')"><span class="iconfont filter_1">&#xe68f;</span> 筛选</div>
					<div @click="sort('filter_2')"><span class="iconfont filter_2">&#xe624;</span> 出发时间</div>
					<div @click="sort('filter_3')"><span class="iconfont filter_3">&#xe605;</span> 价格</div>
				</div>
			</div>			
		</div>		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title:"",
				flightList:"",
				tripType:"",//单程或者往返
				chooseSeg:1,//选择默认的航段
				flightGoMess_show:false, //默认隐藏已选航班信息的div
				currentDate:"",//搜索框的日期
				choosedFirst:"",//第一程所选航班信息
				fromTimeOrderBy:true,//日期排序 默认由早至晚
				priceOrderBy:true//价格排序  默认由底到高
			};
		},
		methods: {
			back(){
				this.$router.go(-1);
			},
			chooseFlight(flight){				
				if(this.tripType=="OW"){
					this.$router.push({path: '/pay'});
				}
				if(this.tripType=="RT"){
					if(this.chooseSeg==1){
						this.flightGoMess_show = true;
					}
					if(this.chooseSeg==2){
						this.$router.push({path: '/pay'});											
					}
					this.chooseSeg = 2;
				}				
			},
			sort(type){
				if(type=="filter_1"){
					alert("暂时不支持条件筛选！")
				}
				if(type=="filter_2"){
					if(this.fromTimeOrderBy){
						this.flightList = _.orderBy(this.flightList, 'fromTime');//由低到高						
					}else{
						this.flightList = (_.orderBy(this.flightList, 'fromTime')).reverse();
					}
					this.fromTimeOrderBy = !this.fromTimeOrderBy;
				}
				if(type=="filter_3"){
					if(this.priceOrderBy){
						this.flightList = _.orderBy(this.flightList, 'price');//由低到高
					}else{
						this.flightList = (_.orderBy(this.flightList, 'price')).reverse();						
					}	
					this.priceOrderBy = !this.priceOrderBy;
				}
			}
		},
		computed:{
			diffTripType(){
				var queryData = this.$route.query;
				this.tripType = queryData.tripType;
				if(queryData.tripType=="OW"){
					this.title = queryData.cityGo +"-"+ queryData.cityBack;
					this.currentDate = queryData.fromDate;
				}else if(queryData.tripType=="RT"){
					if(this.chooseSeg==1){
						this.currentDate = queryData.fromDate;
						this.title = "选去程：" + queryData.cityGo +"-"+ queryData.cityBack;
					}else{
						this.currentDate = queryData.arrDate;
						this.title = "选回程：" + queryData.cityBack +"-"+ queryData.cityGo;
					}
					
				}
				return {
					title:this.title,
					currentDate:this.currentDate
				};
			}					
		},
		created() {
			var that = this;
			this.$axios.get('/api/flightList')
				.then(function(data){
					that.flightList = data.data.data;
				})
			this.$nextTick(() => {
					
			});
		},
		components: {

		}
	};
</script>
<style lang="scss">
	#flightList{
		width:100%;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		header ul {			
			height: 44px;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			line-height: 44px;
			border-bottom: 1px solid #c4c4c4;	
			li:first-child {
				margin-left: 30px;
				width: 34px;
			}
			li:last-child {
				margin-right: 30px;
				width: 34px;
				font-size: 12px;
			}
			.iconfont {
				font-size: 16px;
			}
		}
		.main{
			flex-grow: 1;
			background: #f3f4f6;
			.main_{
				width:7.5rem;
				margin:0 auto;
				.flightGoMess{
					height:0.65rem;
					background: #f0eff4;
					display: flex;				
					align-items:center;
					.flightGoMess_{
						width:7.15rem;
						height:0.45rem;
						background: #d8d8d8;
						border-radius: 0.05rem;	
						margin:0 auto;
						display: flex;
						justify-content: space-around;							
						font-size: 0.2rem;
						line-height:0.5rem;
						.qucheng{	
							height:0.3rem;
							width:0.5rem;
							text-align: center;
							line-height:0.34rem;
							background: #099fde;
							margin-top:0.08rem;
							color:white;
							border-radius:3px;
						}				
					}
				}
				.changeDate{
					height:0.88rem;
					background: #099fde;
					font-size: 0.26rem;
					color:white;
					display: flex;
					justify-content: space-between;
					align-items:center;
					line-height: 0.9rem;
					>div{
						margin:0 30px;
						.iconfont{
							font-size: 0.2rem;
						}
					}
					.currentDate{
						background: white;
						color:#099fde;
						text-align: center;
						line-height: 0.65rem;
						font-weight: 600;
						width:3rem;
						height:0.6rem;
						border-radius:0.04rem;
						margin:0;
					}
				}
				.flightList{
					padding-bottom: 50px;			
					>ul>li{
						width:7.15rem;
						margin:0 auto;
						border-radius: 0.05rem;
						background: white;
						height:1.67rem;
						margin-top:0.15rem;
						border-bottom: 1px solid #cfd4d7;	
						padding-left:0.22rem;					
						.item_top{
							display: flex;
							justify-content: space-between;
							height:1.2rem;
							padding-top:0.3rem;
							.time{
								font-size: 0.32rem;
								font-weight:600;
								
							}
							.airport{
								font-size:0.2rem;
								color:#666666;
							}
							.to{
								color:red;
								line-height:0.6rem;
								font-size: 0.35rem;
							}
							.price{
								margin-right:0.22rem;
								font-size: 0.32rem;	
								font-weight: 600;							
								color:#ff9938;
							}
						}
						.item_bottom{
							font-size: 0.22rem;
						}
					}
				}
			}
		}
		.orderBy{
			width: 7.5rem;
			position: fixed;
			bottom: 0;
			height:44px;
			line-height: 44px;
			color: white;
			background: #0fa0df;
			display: flex;
			justify-content: space-around;
			font-size: 0.26rem;
			.iconfont{
				font-size:0.3rem;
			}
			.filter_1{
				font-size: 0.36rem;
			}			
		}
	}
	
</style>