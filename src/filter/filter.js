import Vue from 'vue';
Vue.filter("tripType", function(input) {
	if(input == null || input == undefined || input == "") return "";
	switch(input.toString()) {
		case "OW":
			return "单程";
		case "RT":
			return "往返";
		default:
			return "未知类型"
	}
})
