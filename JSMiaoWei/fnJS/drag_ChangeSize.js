//左下角同时改变长宽高
//改变大小拖拽 obj：要拖拽的方框  obj2：要改变大小的方框
function Drag(obj,obj2){
	var oDiv=document.getElementById(obj);
	var oDiv2=document.getElementById(obj2);
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
			if (l<0) {
				l=0;
			}
			else if (l>document.documentElement.clientWidth-oDiv.offsetWidth) {
				l=document.documentElement.clientWidth-oDiv.offsetWidth;
			}
			if (t<0) {
				t=0;
			}
			else if (t>document.documentElement.clientHeight-oDiv.offsetHeight) {
				t=document.documentElement.clientHeight-oDiv.offsetHeight;
			}
			//拖动小方块移动
			oDiv.style.left=l-oDiv.offsetWidth+"px";
			oDiv.style.top=t-oDiv.offsetHeight+"px";
			//拖动大方块改变长度和宽度
			oDiv2.style.width=l+"px";
			oDiv2.style.height=t+"px";
		};
	function fnUp(){
		this.onmousemove=null;
		this.onmouseup=null;
		if (this.releaseCapture) {
			this.releaseCapture();
			//事件捕获
		}
		};	
	};
};