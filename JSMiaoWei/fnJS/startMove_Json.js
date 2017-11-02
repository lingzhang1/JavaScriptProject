//链式运动+json传数据+回调函数
function startMove(obj,json,fn)
	{
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		//检测json中所有制都到达目标点
		for(attr in json){
			//属性为层级的情况
			if (attr=="zIndex") {
				obj.style.zIndex=json[attr];
			}
			//非层级的情况
			else
			{
				var iCur=0;
				if (attr=="opacity") 
				{
					iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
				}
				else 
				{
					iCur=parseInt(getStyle(obj,attr));
				}
				var target=json[attr];
				var iSpeed=(target-iCur)/8;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				if (iCur!=target) {
					bStop=false;
					//判断所有变量都已经达到目标点。如果没达到则返回false。
				}
				if (attr=="opacity") 
				{
					obj.style.opacity=(iCur+iSpeed)/100;
					obj.style.filter="alpha(opacity="+(iCur+iSpeed)+")";
				} 
				else 
				{
					obj.style[attr]=iCur+iSpeed+"px";
				}
			}
		}
		//全部执行完毕再关闭定时器
		if (bStop) 
		{ 
			clearInterval(obj.timer);
			if (fn) 
			{
				fn();
			} 
		} 
	},30);
}
//获取样式
function getStyle(obj,attr){
    if (obj&&obj.currentStyle) {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
};