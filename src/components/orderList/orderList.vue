<template>
	<div id="orderList">
		<header>
			<ul>
				<li class="iconfont" @click="back">&#xe67e;</li>
				<li>订单列表</li>
				<li class="font099fde"></li>
			</ul>
		</header>
		<div class="main">
			<div class="main_">
				<ul>
					<li v-for="item in orderList">
						<div>
							<div class="order_city">{{item.fromCity}}-{{item.toCity}}</div>
							<div class="order_date">{{item.fromDate}} {{item.fromTime}} 至 {{item.toDate}} {{item.fromTime}} ({{item.flightNo}})</div>
							<div class="order_T">{{item.fromT}}-{{item.toT}}</div>
						</div>
						<div class="orderRight">
							<div class="price">￥{{item.price}}</div>
							<div class="status">{{item.status}}</div>
						</div>
					</li>
				</ul>
			</div>			
		</div>		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				orderList:""
			};
		},
		methods: {
			back(){
				this.$router.go(-1);
			}
		},
		created() {
			var that = this;
			this.$axios.get('/api/orderList')
				.then(function(data){
					that.orderList = data.data.data;
				})
			this.$nextTick(() => {
					
			});
		},
		components: {

		}
	};
</script>
<style lang="scss">
	#orderList{
		min-height:100vh;
		display: flex;
		flex-direction:column;
		width:100%;
		header ul {			
			height: 44px;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			line-height: 44px;
			border-bottom: 1px solid #c4c4c4;
			box-shadow: 0 0.16rem 0.16rem #e7e7e7;
			margin-bottom:0.16rem;	
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
				width:7.15rem;
				margin:0 auto;
				ul>li{
					margin-bottom: 0.15rem;
					height:1.67rem;
					border-bottom: 1px solid #cfd4d7;
					background: #ffffff;
					display: flex;
					justify-content: space-around;
					.order_city{
						height:0.8rem;
						line-height: 1rem;
						font-size:0.28rem;
						font-weight: 800;
					}
					.order_date{
						font-size:0.22rem;
					}
					.order_T{
						font-size: 0.24rem;
						line-height: 0.5rem;
						color:#7f7f7f;
					}
					.orderRight{
						text-align: right;
						.price{
							margin-top:0.32rem;
							color:#ff9934;
							font-size: 0.28rem;
							font-weight: 900;
						}
						.status{
							color: red;
							font-size: 0.2rem;
						}
					}
				}
			}		
		}		
	}
	
</style>