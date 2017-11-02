function fnSetCookie(name,value,iDay){
			var oDate=new Date();
			oDate.setDate(oDate.getDate()+iDay);
			document.cookie=name+"="+value+";expires="+oDate;
		};
		function fnGetCookie(name){
			var arr=document.cookie.split(";");
			for (var i = 0; i < arr.length; i++) {
				var arr2=arr[i].split("=");
				if (arr2[0]==name) {
					return arr2[1];
				}
			}
			return "";
		};
		function fnRemoveCookie(name){
			fnSetCookie(name,"1",-1);
		};