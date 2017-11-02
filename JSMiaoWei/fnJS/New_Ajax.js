function ajax(url,fnSucc,fnFaild){ 
				//创建Ajax对象
				var oAjax=new XMLHttpRequest("Microsoft.XMLHTTP");
				//连接服务器
				oAjax.open("GET",url,true);
				//发送请求
				oAjax.send();
				//请求状态监控
				oAjax.onreadystatechange=function(){
					//请求状态
					if (oAjax.readyState==4) {
						//请求结果
						if (oAjax.status==200) {
							fnSucc(oAjax.responseText);
						}
						else{
							if (fnFaild) {
							fnFaild();	
							}
						}
					}
				};
			};
		};