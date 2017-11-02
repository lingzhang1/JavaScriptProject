//获取并修改CSS样式
function setStyle(obj,attr,value){
		if (arguments.length==2) {
			return getComputedStyle(obj,false)[attr];
		}
		else if(arguments.length==3) 
		{
			obj.style[attr]=value;
		}
	};


function setStyle_Json(obj,json){
		var attr="";
		for(attr in json)
		{
			obj.style[attr]=json[attr];
		}
	};
