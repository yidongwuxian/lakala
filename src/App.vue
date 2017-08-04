<template>
	<transition　:name="transitionName">
		<router-view class="childView"></router-view>
	</transition>   
</template>
<script>
	export default {
		data() {
			return {
				transitionName:"slide-left"
			};
		},		
		created() {
			
		},
		watch: {
		    $route (to, from) {
		        if(to.path=="/"&&from.path=="/search"){
		        	this.transitionName = "slide-right";
		        }
		        if(to.path=="/search"&&from.path=="/"){
		        	this.transitionName = "slide-left";
		        }
		    }
		},
		components: {
			
		}
	};
</script>
<style lang="scss">

	.childView {
	    position: absolute;
	    transition: all .8s cubic-bezier(.55,0,.1,1);
	}
	.slide-left-enter, .slide-right-leave-active {
	    opacity: 0;
	    -webkit-transform: translate(50px, 0);
	    transform: translate(50px, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
	    opacity: 0;
	    -webkit-transform: translate(-50px, 0);
	    transform: translate(-50px, 0);
	}
</style>