	function getByClass(oParent,sClass)
{
	var aEle=oParent.getElementsByTagName("*");
	var aResult=[];
	var re=new RegExp("\\b"+sClass+"\\b","i");
	//sClass必须是独立的单词
	//\b单词边界
	var i=0;
	for (var i = 0; i < aEle.length; i++) 
	{
		// if (aEle[i].className.search(sClass)!=-1)
		if (re.test(aEle[i].className)) 
		{
			aResult.push(aEle[i]);
		}
		
	}
	return aResult;
}