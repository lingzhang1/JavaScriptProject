
//拖拽 滚动在可视区
function drag(obj){
	obj.onmousedown=function(ev){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
		var iDisX=ev.clientX+scrollLeft-obj.offsetLeft;
		var iDisY=ev.clientY+scrollTop-obj.offsetTop;
		document.onmousemove=function(ev){
			var l=ev.clientX+scrollLeft-iDisX;
			var t=ev.clientY+scrollTop-iDisY;
			var rightDis=document.documentElement.clientWidth+scrollLeft-obj.offsetWidth;
			var bottomDis=document.documentElement.clientHeight+scrollTop-obj.offsetHeight;
			if (l<0) {
				l=0;//限制拖拽出可视区左侧
			}
			else if (l>rightDis) {
				l=rightDis;//限制拽出可视区右侧
			}
			if (t<0) {
				t=0;
				//限制拖拽出可视区上侧
			}  
			else if (t>bottomDis) {
				//限制拖拽出可视区下侧
				t=bottomDis;
			}
			obj.style.left=l+"px";
			obj.style.top=t+"px";
			window.onresize=function(){
				var rightDis=document.documentElement.clientWidth+scrollLeft-obj.offsetWidth;
			 	var bottomDis=document.documentElement.clientHeight+scrollTop-obj.offsetHeight;
			 	if (obj.offsetLeft>rightDis) {
			 		obj.style.left=rightDis+"px";
			 	}
			 	if (obj.offsetTop>bottomDis) {
			 		obj.style.top=bottomDis+"px";
			 	}
			}; //变化屏幕尺寸，div一直显示在可视区。
		};
		return false;//解决火狐拖拽BUG
		 
	    };
    document.onmouseup=function(){
		document.onmousemove=null;
	    // document.onmouseup=null;
	};
};
