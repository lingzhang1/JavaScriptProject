//链式运动框架
function startMove(obj,attr,iTarget,fn)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iCur=0;
			if (attr=="opacity") 
			{
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
			} 
			else 
			{
				iCur=parseInt(getStyle(obj,attr));
			}
			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if (iCur==iTarget) 
			{
				clearInterval(obj.timer);
				if (fn) 
				{
					fn();
				} //运动完成后增加执行函数
			} 
			else 
			{
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
		},30);
//获取样式
function getStyle(obj,attr){
    if (obj&&obj.currentStyle) {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
};