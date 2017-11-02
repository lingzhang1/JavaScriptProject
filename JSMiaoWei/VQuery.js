//用class选择元素
function getByClass(oParent,sClass){
	var arr=[];
	var aEle=oParent.getElementsByTagName('*');
	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className==sClass) {
			arr.push(aEle[i]);
		}
	}
	return arr;
};
//绑定事件
function myAddEvent(obj,sEv,fn){
	if (obj.attachEvent) {
		obj.attachEvent("on"+sEv,function(ev){
			// fn.call(obj);
			/*事件绑定,attach中，this指的是window。
			addEventListener中this指的是事件对象obj
			利用call来改变this的值*/
			if (false==fn.call(obj)) {
				ev.cancelBubble=true;
				//阻止冒泡
				return false;
				//阻止IE10及以下默认事件
			}
		});
	}
	else{
		// obj.addEventListener( sEv,fn,false);
		obj.addEventListener( sEv,function(ev){
			if (false==fn.call(obj)) {
				ev.preventDefault();
				//兼容火狐、谷歌、IE10，
				//绑定事件中不适用return false;
				//但IE10及以下要用return false
				ev.cancelBubble=true;
				//阻止冒泡
			}
		},false);
	}
};
//获取和设置样式
function getByStyle(obj,attr,value){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};
//将类数组转换成数组
function appendArr(arr1,arr2){
	for (var i = 0; i < arr2.length; i++) {
		arr1.push(arr2[i]);
	}
};
//获取对象的在所有兄弟节点中的索引值
function getIndex(obj){
	//获取所有兄弟节点
	var aBrother=obj.parentNode.children;
	//遍历所有兄弟节点
	for (var i = 0; i < aBrother.length; i++) {
		//与obj相同便返回
		if (aBrother[i]==obj) {
			return i;
		}
	}
};

//构造函数
function VQuery(vArg){
	//用来保存选中的元素
	this.elements=[];
	//检测传入数据类型
	switch(typeof vArg)
	{
		case "function":
			// window.onload=vArg;
			myAddEvent(window,"load",vArg);
			break;
		case "string":
			switch(vArg.charAt(0)){
				case "#"://ID
					var obj=document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case "."://class
					this.elements=getByClass(document,vArg.substring(1));
					break;
				default://标签
					this.elements=document.getElementsByTagName(vArg);
			}
			break;
		case "object":
			this.elements.push(vArg);
	}
};
//对象原型添加方法
VQuery.prototype={
	click:function(fn){
		for (var i = 0; i < this.elements.length; i++) {
			myAddEvent(this.elements[i],'click',fn);
		}
		return this;
	},
	show:function(){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display="block";
		}
		return this;
	},
	hide:function(){
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display="none";
		}
		return this;
	},
	hover:function(fnOver,fnOut){
		for (var i = 0; i < this.elements.length; i++) {
			myAddEvent(this.elements[i],"mouseover",fnOver);
			myAddEvent(this.elements[i],"mouseout",fnOut);
		}
		return this;
	},
	css:function(attr,value){
		//获取第一个匹配元素的样式值
		//获取样式
		if (arguments.length==1) {
			//直接写css("width");
			if (typeof attr=="string") {
				return getByStyle(this.elements[0],attr);
			}
			//JSON形式
			else{
				for (var i = 0; i < this.elements.length; i++) {
					for (var j in attr ) {
						this.elements[i].style[j]=attr[j];
					}
				}
			}
		}
		//设置样式
		else if(arguments.length==2){
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].style[attr]=value;
			}
		}
		return this;//将对象返回，完成链式设置
	},
	toggle:function(){
		//存储变量
		var _arguments=arguments;
		for (var i = 0; i < this.elements.length; i++) {
			addToggle(this.elements[i]);
		}
		//创建点击函数，通过闭包，局部变量每次每次调用都
		//重新声明，将每次事件计数分离
		function addToggle(obj){
			var count=0;
			myAddEvent(obj,"click",function(){
				//循环调用参数，使用存储变量，
				//在事件绑定中，arguments无法正确指向事件对象
				_arguments[count%_arguments.length].call(obj);
				count++;
			});
		};
		return this;
	},
	attr:function(attr,value){
		if (arguments.length==2) {
			for (var i = 0; i < this.elements.length; i++) {
				// this.elements[i].setAttribute(attr,value);
				this.elements[i][attr]=value;
			}
		}
		else if(arguments.length==1){
			// return this.elements[0].getAttribute(attr);
			return this.elements[0][attr];
		}
		return this;
	},
	eq:function(num){
		return $(this.elements[num]);
		//找出第num个原生元素对象，存入elements，
		//然后用$创建对象才可以调用对象方法
	},
	find:function(str){
		//标签名 	 class
		var aResult=[];
		for (var i = 0; i < this.elements.length; i++) {
			switch(str.charAt(0))
			{
				case ".":
					//获取class数组
					var aEle=getByClass(this.elements[i],str.substring(1));
					aResult=aResult.concat(aEle);
					break;
				default:
					//获取标签
					var aEle=this.elements[i].getElementsByTagName(str);		
					//类数组不可用concat连接
					// aResult=aResult.concat(aEle);
					appendArr(aResult,aEle);
			}
		}
		//重新创建一个空VQ对象，把aResult数组赋值给属性elements
		var newVquery=$();
		newVquery.elements=aResult;
		return newVquery;
	},
	index:function(){
		//获取所有获取元素中第一个元素的索引值
		return getIndex(this.elements[0]);
	},
	bind:function(sEvent,fn){
		for (var i = 0; i < this.elements.length; i++) {
			myAddEvent(this.elements[i],sEvent,fn);
		}
	},
	size:function(){
		return this.elements.length;
	},
	extend:function(name,fn){
		VQuery.prototype[name]=fn;
		//添加插件
	}
};

//添加animate插件
$().extend("animate",function(json,fn){
	for (var i = 0; i < this.elements.length; i++) {
		startMove(this.elements[i],json,fn);
	}
	function startMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var bStop=true;
			//检测json中所有值都到达目标点
			for(var attr in json){
				var iCur=0;
				if (attr=="opacity") 
				{
					iCur=parseInt(parseFloat(getComputedStyle(obj,false)[attr])*100);
				} 
				else 
				{
					iCur=parseInt(getComputedStyle(obj,false)[attr]);
				}
				var iSpeed=(json[attr]-iCur)/8;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				if (iCur!=json[attr]) {
					bStop=false;
					//判断所有变量都已经达到目标点。如果没达到则返回false。
				}
				if (attr=="opacity") 
				{
					obj.style.opacity=(iCur+iSpeed)/100;
				} 
				else 
				{
					obj.style[attr]=iCur+iSpeed+"px";
					//不可以用style.attr形式
				}
			}
			if (bStop) 
			{ 
				clearInterval(obj.timer);
				if (fn) 
				{
					fn();
				} 
			} //一次json内容执行完以后判断是否要关闭定时器
		},30);
	};
});
//添加拖拽插件
$().extend("drag",function(){
	for (var i = 0; i < this.elements.length; i++) {
		Drag(this.elements[i]);
	}
	//拖拽
	function Drag(obj){
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
});
//用$代替用new创建对象
function $(vArg){
	return new VQuery(vArg);
};