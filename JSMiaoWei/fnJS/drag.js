
//拖拽
function Drag(id){
	var obj=document.getElementById(id);
	obj.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-obj.offsetLeft;
		var disY=oEvent.clientY-obj.offsetTop;
		//解决IE兼容问题
	if (obj.setCapture) {
		obj.onmousemove=fnMove;
		obj.onmouseup=fnUp;
		obj.setCapture();//解除捕获
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
			if (l<0) {
				l=0;
			}
			else if (l>document.documentElement.clientWidth-obj.offsetWidth) {
				l=document.documentElement.clientWidth-obj.offsetWidth;
			}
			if (t<0) {
				t=0;
			}
			else if (t>document.documentElement.clientHeight-obj.offsetHeight) {
				t=document.documentElement.clientHeight-obj.offsetHeight;
			}
			obj.style.left=l+"px";
			obj.style.top=t+"px";
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