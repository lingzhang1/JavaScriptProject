/**
 * Created by Administrator on 2016/6/14.
 */
/**
 * 这是一个兼容获取innerText的能力检测
 * @param element
 * @returns {*}
 */
function getInnerText(element){
    if(element.innerText){ //如果此元素支持innerText的用法
        return element.innerText; //这个是IE8及之前的版本
    }else {
        return element.textContent;//这个是火狐早期版本
    }
}
/**
 * 这是一个设置innerText的能力检测
 * @param element
 * @param value
 */
function setInnerText(element,value){  // 函数就相当于是专门做某件事情的人或机构
    if(element.innerText){ // IE8及之前的浏览器版本
        element.innerText = value;
        //var str = "<ul><li>123</li><li>456</li><li>789</li></ul>";
        //box.innerText = "<ul><li>123</li><li>456</li><li>789</li></ul>";
        // box.innerText=str;
    }else {
        element.textContent = value; // 这个是火狐早期版本
        //box.textContent = "<ul><li>123</li><li>456</li><li>789</li></ul>";
    }
}