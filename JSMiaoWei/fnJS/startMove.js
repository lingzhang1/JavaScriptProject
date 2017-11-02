
//缓冲任意值运动框架
function startMove(obj,attr,iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iCur=0;
		if (attr=="opacity") {
			iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
		//乘以100将小数换成十位数
		// alert(iCur);
		// alert(0.07*100); 
		//结果7.000001避免使用小数
		//使用parseInt，去掉小数部分。
		} 
		else {
			iCur=parseInt(getStyle(obj,attr));
		}
		// alert(iCur);
		//替换offsetWidth
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if (iCur==iTarget) {
			clearInterval(obj.timer);
		} 
		else 
		{
			if (attr=="opacity") {
				obj.style.opacity=(iCur+iSpeed)/100;
				obj.style.filter='alpha(opacity='+(iCur+iSpeed)+')';
			} 
			else {
				obj.style[attr]=iCur+iSpeed+"px";
				//当样式是变量的时候，不可以用style.attr形式
			}
		}
	},30);
};
//获取样式
function getStyle(obj,attr){
    if (obj&&obj.currentStyle) {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
};