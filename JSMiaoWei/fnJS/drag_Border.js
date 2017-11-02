
//虚线框拖拽
function Drag(obj){
	var oDiv=document.getElementById(obj);
	oDiv.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;

		//带边框拖拽
		var oNewDiv=document.createElement("div");
		oNewDiv.className="dragBox";
		oNewDiv.style.left=oDiv.offsetLeft+"px";
		oNewDiv.style.top=oDiv.offsetTop+"px";
		oNewDiv.style.width=oDiv.offsetWidth+"px";
		oNewDiv.style.height=oDiv.offsetHeight+"px";
		document.body.appendChild(oNewDiv);
		// alert(oNewDiv);

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
			//磁性吸附加限制范围
			if (l<50) {
				l=0;
			}
			else if (l>document.documentElement.clientWidth-oDiv.offsetWidth-50) {
				l=document.documentElement.clientWidth-oDiv.offsetWidth;
			}
			if (t<50) {
				t=0;
			}
			else if (t>document.documentElement.clientHeight-oDiv.offsetHeight-50) {
				t=document.documentElement.clientHeight-oDiv.offsetHeight;
			}
			oNewDiv.style.left=l+"px";
			oNewDiv.style.top=t+"px";
		};
	function fnUp(){
		this.onmousemove=null;
		this.onmouseup=null;
		oDiv.style.left=oNewDiv.offsetLeft+"px";
		oDiv.style.top=oNewDiv.offsetTop+"px";
		document.body.removeChild(oNewDiv);
		//鼠标抬起，删除虚线框
		if (this.releaseCapture) {
			this.releaseCapture();
			//事件捕获
		}
		};	
	};
};