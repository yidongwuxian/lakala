<template>
	<div id="login">
		<header>
			<ul>
				<li class="iconfont"></li>
				<li>登录</li>
				<li class="font099fde">注册</li>
			</ul>
		</header>
		<h1>拉卡拉账号登录</h1>
		<div class="main">
			<div><input type="text" v-model="loginData.user" placeholder="国内手机号/用户名/邮箱/卡号"/></div>
			<div><input type="text" v-model="loginData.password" placeholder="登录密码"/></div>
			<div><button @click="login">登录</button></div>
		</div>
		
		<div class="loginWay" v-show="footer">
			<span class="iconfont fontlawngreen">&#xe621;</span>
			<span class="iconfont font099fde">&#xe616;</span>
			<span class="iconfont fontblue">&#xe611;</span>
			<span class="iconfont fontred">&#xe680;</span>
			<span class="iconfont fontfaa000">&#xe7cf;</span>
		</div>
	</div>
</template>
<script>	
	export default {
		data() {
			return {
				footer:true,
				loginData:{
					user:"",
					password:""
				}
			};
		},
		methods:{
			//解决footer因为固定定位引起的问题
			resize:function(){
				var height = innerHeight;
				var that = this;
				window.onresize = function(){
					var height_ = innerHeight;
					if(height==height_){
						that.footer = true;
					}else{
						that.footer = false;
					}
				}
			},
			
			login:function(){
				if(this.loginData.user=="admin"&&this.loginData.password=="123"){
					var loginData = this.loginData;
					//存储账号密码
					window.localStorage.loginData = JSON.stringify(loginData);
					this.$store.commit('login')//存储登录状态	
					var redirect = this.$route.query.redirect;//获取重定向的路径					
					if(redirect){
						this.$router.replace({path: redirect});
					}else{
						this.$router.replace({path: '/'});
					}													
				}else{	
					alert("用户名：admin\n密码：123");
					//this.$store.commit('login')//登录状态	
					//this.$router.replace({path: '/'});
				}
			}
		},
		created() {
			this.$nextTick(() => {				
				this.resize();  
	        });
		},
		components: {
			
		}
	};
</script>
<style lang="scss">
	#login{
		font-size:0.22rem;
		height:100vh;
		position: relative;
		header ul{
			height:44px;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			line-height:44px;
			li:first-child{
				margin-left:30px;
				width:34px;
			}
			li:last-child{
				margin-right:30px;
				width:34px;
				font-size: 12px;
			}
			.iconfont{
				font-size: 16px;
			}
		}
		h1{
			font-weight: normal;
			text-align: center;
			line-height:2rem;
		}
		.main{
			width:6.9rem;
			height:4.5rem;
			margin:0 auto;
			input{
				width:6.9rem;
				border:none;
				height:1rem;
				border-bottom: 1px solid #c7c3bb;
				outline: none;
				font-size: 0.3rem;
			}
			button{
				width:6.9rem;
				height:0.8rem;
				border:none;
				text-align: center;
				line-height: 0.8rem;
				color: white;
				margin-top:0.5rem;
				background: #faa000;
				border-radius:0.05rem;
				font-size: 0.32rem;
			}			
		}
		.loginWay{
			width:6.9rem;
			margin:0 auto;
			height:0.8rem;
			position: fixed;
			bottom:0;
			left:50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-around;
			span{
				font-size:0.5rem;
			}
		}
	}

</style>