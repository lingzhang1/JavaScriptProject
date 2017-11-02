//自定义滚动条 obj:拖拽方块 obj2：滚动条 obj3:随滚轮移动的内容外框  obj4：随滚轮移动位置
//可用于横向或者纵向滚动条
var iSpeedX=0;
var iSpeedY=0;
var scale=0;
function Drag(obj,obj2,obj3,obj4){
	var oDiv=document.getElementById(obj);
	var oDiv2=document.getElementById(obj2);
	var oDiv3=document.getElementById(obj3);
	var oDiv4=document.getElementById(obj4);
	var lastY=0;
	var lastX=0;
	//鼠标滚轮控制自定义滚动条
	function onMouseScroll(ev){
		oEvent=ev||event;
		var bDown=true;
		bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		//横向滚动
		if (oDiv2.offsetWidth>oDiv2.offsetHeight) {
			if (bDown) {
				setLeft(oDiv.offsetLeft+10);
				startMove(obj);
			} 
			else {
				setLeft(oDiv.offsetLeft-10);
				startMove(obj);
			}
		} 
		//纵向滚动
		else {
			if (bDown) {
				setTop(oDiv.offsetTop+10);
				startMove("div2");
			} 
			else {
				setTop(oDiv.offsetTop-10);
				startMove("div2");
			}
		}
		oEvent.preventDefault();//阻止默认事件
	};
	document.addEventListener("DOMMouseScroll",onMouseScroll,false);
	document.addEventListener("mousewheel",onMouseScroll,false);

	oDiv.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		//解决IE兼容问题
		if (oDiv.setCapture) {
			oDiv.onmousemove=fnMove;
			oDiv.onmouseup=fnUp;
			oDiv.setCapture();//解除捕获
			}
		else{//火狐和谷歌
			document.onmousemove=fnMove;
			document.onmouseup=fnUp;
			return false;
			}	
		function fnMove(ev){
			oEvent=ev||event;
			var l=oEvent.clientX-disX;
			var t=oEvent.clientY-disY;
			
			//横向滚动
			if (oDiv2.offsetWidth>oDiv2.offsetHeight) {
				setLeft(l);
			} 
			//纵向滚动
			else 
			{
				setTop(t);
			}	
		};
		function fnUp(){
			this.onmousemove=null;
			//缓冲运动 摩擦 无重力
			startMove(obj);
			this.onmouseup=null;
			if (this.releaseCapture) {
				this.releaseCapture();
				//事件捕获
			}
		};
	};
	//碰撞运动+重力运动框架
	function startMove(obj){
		var oDiv=document.getElementById(obj);
		clearInterval(oDiv.timer);
		oDiv.timer=setInterval(function(){
		 // iSpeedY+=3;//去除重力
			var l=oDiv.offsetLeft+iSpeedX;
			var t=oDiv.offsetTop+iSpeedY;
			iSpeedY*=0.8;
			iSpeedX*=0.8;
			if (t<0) {
				t=0;
			}
			else if (t>oDiv2.offsetHeight-oDiv.offsetHeight) {
				t=oDiv2.offsetHeight-oDiv.offsetHeight;
			}
			if (l<0) {
				l=0;
			}
			else if (l>oDiv2.offsetWidth-oDiv.offsetWidth) {
				l=oDiv2.offsetWidth-oDiv.offsetWidth;
			}
			if (Math.abs(iSpeedX)<1) {
				iSpeedX=0;
			}
			if (Math.abs(iSpeedY)<1) {
				iSpeedY=0;
			}//防止速度出现负数小数值时，滑块一直反向运动
			if (iSpeedX==0&&iSpeedY==0) 
			{
				clearInterval(oDiv.timer);
			} 
			else 
			{
			oDiv.style.left=l+"px";
			oDiv.style.top=t+"px";
			//横向运动
			if (oDiv2.offsetWidth>oDiv2.offsetHeight) {
				scale=oDiv.offsetLeft/(oDiv2.offsetWidth-oDiv.offsetWidth);
			} 
			//纵向滚动
			else 
			{
				scale=oDiv.offsetTop/(oDiv2.offsetHeight-oDiv.offsetHeight);
			}	
			
			oDiv4.style.top=-scale*(oDiv4.offsetHeight-oDiv3.offsetHeight)+"px";
			}
		},30);
	};
	function setTop(t){
		if (t<0) {
				t=0;
			}
			else if (t>oDiv2.offsetHeight-oDiv.offsetHeight) {
				t=oDiv2.offsetHeight-oDiv.offsetHeight;
			}
			oDiv.style.top=t+"px";
			scale=t/(oDiv2.offsetHeight-oDiv.offsetHeight);
			oDiv4.style.top=-scale*(oDiv4.offsetHeight-oDiv3.offsetHeight)+"px";
			iSpeedX=0;
		 	iSpeedY=t-lastY;
			lastY=t;
	};
	function setLeft(l){
		if (l<0) {
			l=0;
		}
		else if (l>oDiv2.offsetWidth-oDiv.offsetWidth) {
			l=oDiv2.offsetWidth-oDiv.offsetWidth;
		}
			oDiv.style.left=l+"px";
			//滚动条拖拽比例
			scale=l/(oDiv2.offsetWidth-oDiv.offsetWidth);
			oDiv4.style.top=-scale*(oDiv4.offsetWidth-oDiv3.offsetWidth)+"px";
			iSpeedX=l-lastX;
		 	iSpeedY=0;
			lastX=l;	
	};
};