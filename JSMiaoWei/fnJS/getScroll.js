
//返回scrollTop和scrollLeft的对象
function scroll(){
    return {
        scrollTop:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scorllLeft:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
}