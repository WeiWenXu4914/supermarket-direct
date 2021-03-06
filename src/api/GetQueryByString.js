export const GetQueryByString = (str,name) => {

	//获取？号出现几次
	var tempArr = str.split('?');

	// //如果大于1
	if(tempArr.length-1>1){
		var rt = null;
		for(var i in tempArr){
			var s = tempArr[i]
			var reg1 = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r1 = s.match(reg1); //匹配目标参数
			if (r1 != null) {
				rt = decodeURIComponent(r1[2]);//一直覆盖，要最后的就行了
			}
		}

		return rt
	}

	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	if(!str.split("?")[1])return null;
	var r = str.split("?")[1].match(reg); //匹配目标参数

	if (r != null) {
		return decodeURIComponent(r[2]);

	}
	return null; //返回参数值
}