var iSpeedX=0;
var iSpeedY=0;
//碰撞运动+重力运动框架
function startMove(obj){
	var oDiv=document.getElementById(obj);
	clearInterval(oDiv.timer);
	oDiv.timer=setInterval(function(){
		 iSpeedY+=3;//重力
		var l=oDiv.offsetLeft+iSpeedX;
		var t=oDiv.offsetTop+iSpeedY;

		if (t>document.documentElement.clientHeight-oDiv.offsetHeight) {
			iSpeedY*=-0.8;//碰到地面Y轴速度逐渐降低,方向改变
			iSpeedX*=0.8;//碰到地面，横轴速度不改变方向，只降低速度
			t=document.documentElement.clientHeight-oDiv.offsetHeight;
			//过界之后将div拉回可视区内，防止出现滚动条
		}
		if (t<=0) {
			iSpeedY*=-0.8;
			iSpeedX*=0.8;//碰到上方墙面，横轴速度不改变方向，只降低速度
			t=0;
		}
		if (l>document.documentElement.clientWidth-oDiv.offsetWidth) {
			iSpeedX*=-0.8; //x轴速度减小
			l=document.documentElement.clientWidth-oDiv.offsetWidth;
		}
		else if (l<=0) {
			iSpeedX*=-0.8;
			l=0;
		}
		if (Math.abs(iSpeedX)<1) {
			iSpeedX=0;
		}
		if (Math.abs(iSpeedY)<1) {
			iSpeedY=0;
		}//防止速度出现负数小数值时，滑块一直反向运动
		if (iSpeedX==0&&iSpeedY==0&&t==document.documentElement.clientHeight-oDiv.offsetHeight) 
		{
			clearInterval(oDiv.timer);
		} 
		else 
		{
			oDiv.style.left=l+"px";
			oDiv.style.top=t+"px";
		}
	},30);
};