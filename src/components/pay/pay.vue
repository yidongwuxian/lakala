<template>
	<div id="pay">
		<h1>out</h1>
		<div>
			<mu-raised-button label="退出" @click="open" />
			<mu-dialog :open="dialog" title="logOUT" @close="close">
				确认退出此账号么？
				<mu-flat-button slot="actions" @click="close" primary label="取消" />
				<mu-flat-button slot="actions" primary @click="sure" label="确定" />
			</mu-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialog: false
			};
		},
		methods: {
			open() {
				this.dialog = true
			},
			close() {				
				this.dialog = false;
				this.$router.go(-1);
			},
			sure(){
				window.localStorage.removeItem('loginData');
				this.$store.commit('logOUT');
				this.$router.push({path: '/'});
			},
			//向history添加历史记录
			pushHistory() {
				var state = {
					title: "modal-box",
					url: ""
				};
				if(history.state == null) {
					window.history.pushState(state, null, "");
				} else if(history.state.title != "modal-box") {
					window.history.pushState(state, null, "");
				}
			}
		},
		watch: {
			dialog: function(newVal, oldVal) {
				if(newVal) {
					this.pushHistory();
				}
			}
		},
		created() {
			var that = this;
			window.onpopstate = function(e) {
				if(that.dialog == true) {
					that.dialog = false;
				}
			};
		},
		components: {

		}
	};
</script>
<style lang="scss">
	#pay {
		width: 100%;
		background: burlywood;
		height: 200vh;
	}
</style>