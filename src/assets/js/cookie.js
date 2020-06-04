export function getCookie(name){
    var arr, reg = new RegExp("(^| )"+name+"=[^;]*(;|$)");
    
    if(arr = document.cookie.match(reg)){
        var arr2 = arr[0].split(';')
        var arr3 = arr2[0].split('=');
        // console.log(arr3);
        return (arr3[1]);
    }else{
        return null;
    }
};

export function setCookie(c_name, value, expiredays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null)?"":";expires=" + exdate.toGMTString());
};

export function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null){
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};