//弹性运动
function startMove(obj,attr,iTarget){
	var fAttr=0;//引入位置变量
	var iSpeed=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		fAttr=parseInt(getStyle(obj.attr));
		iSpeed+=(iTarget-fAttr)/5;
		iSpeed*=0.7;//摩擦力
		fAttr+=iSpeed;
		if (Math.abs(iSpeed)<1&&Math.abs(iTarget-fAttr)<1) {
			//停止条件判断：距离小于一，速度小于一
			clearInterval(obj.timer);
			obj.style[attr]=iTarget+"px";
			//保证关闭后严格到达目标点
		} else {
			obj.style[attr]=fAttr+"px";
			//将速度和位置值小数值保留下来
		}
	},30);
};
