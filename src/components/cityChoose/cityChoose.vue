<template>
	<div id="cityChoose" v-show="show">
		<div>
		<header>
			<ul>
				<li class="iconfont" @click="back" v-show="back_show">&#xe67e;</li>
				<li><input type="text" @focus="searchCity"/></li>
				<li v-show="cancel_show" @click="cancel">取消</li>
			</ul>
		</header>
		<div class="citys">
			<div class="sortCity" v-for="item in cityData">
				<div>
					<p class="title">{{item.title}}</p>
				</div>
				<div class="city">					
					<li @click="checkCity(city)" v-for="(city,index) in item.citys">{{city.name}}</li>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>
<script>	
	var cityData = [{
		title:"最近查询",
		citys:[{name:"北京",spell:"BEIJING"}]
	},{
		title:"国内热门城市",
		citys:[{name:"北京",spell:"BEIJING"},
			   {name:"上海",spell:"SHANGHAI"},
			   {name:"天津",spell:"GUANGZHOU"},
			   {name:"重庆",spell:"SHENZHEN"},
			   {name:"大连",spell:"DALIAN"},
			   {name:"青岛",spell:"QINGDAO"},			
			   {name:"西安",spell:"XIAN"},
			   {name:"南京",spell:"NANJING"},
			   {name:"杭州",spell:"SHANGZHOU"},
			   {name:"厦门",spell:"XIAMEN"},
			   {name:"成都",spell:"CHENGDU"},
			   {name:"深圳",spell:"SHENZHEN"},
			   {name:"广州",spell:"GUANGZHOU"},
			   {name:"昆明",spell:"KUNMING"},
			   {name:"三亚",spell:"SANYA"},
			   {name:"香港",spell:"XIANGGANG"},
			   {name:"澳门",spell:"AOMEN"},
			   {name:"济南",spell:"JINAN"},
			   {name:"长沙",spell:"CHANGSHA"},
			   {name:"福州",spell:"FUZHOU"},
			   {name:"郑州",spell:"ZHENGZHOU"},
			   {name:"台北",spell:"TAIBEI"},
			   {name:"武汉",spell:"WUHAN"}
		]
	},{
		title:"国际热门城市",
		citys:[
			{name:"香港",spell:"XIANGAN"},
			{name:"澳门",spell:"AOMEN"},
			{name:"新加坡",spell:"XINJIAPO"},
			{name:"巴黎",spell:"BALI"},
			{name:"大阪",spell:"DABAN"},
			{name:"东京",spell:"DONGJING"},
			{name:"法兰克福",spell:"FALANKEFU"},
			{name:"釜山",spell:"FUSHAN"},
			{name:"吉隆坡",spell:"JILONGPO"},
			{name:"伦敦",spell:"LUNDUN"},
			{name:"洛杉矶",spell:"LUOSHANJI"},
			{name:"曼谷",spell:"MANGU"},
			{name:"名古屋",spell:"MINGGUWU"},
			{name:"马尼拉",spell:"MANILA"},
			{name:"温哥华",spell:"WENGEHUA"},
			{name:"悉尼",spell:"XINI"},
			{name:"台北",spell:"TAIBEI"},
			{name:"纽约",spell:"NIUYUE"},
			{name:"胡志明市",spell:"HUZHIMINGSHI"}
		]
	},{
		title:"沿海城市",
		citys:[
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"},
			{name:"三亚",spell:"SANYA"}
			
		]
	}]
	export default {
		props:["show","type"],
		data() {
			return {
				"back_show":true,
				"cancel_show":false,
				"cityData":cityData
			};
		},
		methods:{
			back(){
				this.$emit("listenToChildEvent",[false]);
			},
			cancel(){
				this.back_show = true;
				this.cancel_show = false;			
			},
			searchCity(){
				this.back_show = false;
				this.cancel_show = true;	
			},
			checkCity(city){
				var type = this.type;					
				this.$emit("listenToChildEvent",[false,type,city]);
			}
		},
		created() {
			this.$nextTick(() => {				
				
	        });
		},
		components: {
			
		}
	};
</script>
<style lang="scss">

	#cityChoose{					
		width:7.5rem;
		position: fixed;
		height:100%;
		overflow: auto;
		top:0;
		left:50%;
		transform: translateX(-50%);
		z-index: 1000;			
		background: #0e68c0;
		header ul{
			height:44px;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			line-height:44px;
			background: #099fde;
			>li:first-child{
				margin-left:30px;
				width:34px;
			}
			>li:nth-of-type(2){
				width:90%;
				margin-left:0.3rem;
				input{
					height:30px;
					width:95%;
					border-radius:4px;
					border:none;
					outline: none;
				}
			}
			>li:nth-of-type(3){
				font-size: 12px;
				color:white;
				margin-left:20px;
			}
			.iconfont{
				font-size: 16px;
				color:white
			}
		}
		.citys{
			width:6.9rem;			
			margin:0 auto;					
			background: #0e68c0;
			color:white;
			.title{
				color:#97c1ea;
				font-size:0.3rem;
				height:0.8rem;
				line-height:0.8rem;
			}
			.city{
				overflow: hidden;
				font-size:0.32rem;
				li{
					width:1.65rem;
					height:0.6rem;
					border:1px solid white;
					border-radius:2px;
					text-align: center;
					line-height:0.6rem;
					float: left;
					margin:0 0 0.1rem 0.07rem;
				}
			}
		}
	}
</style>