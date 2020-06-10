import axios from 'axios'

var dataAcquisition = {
    store:{ //配置项
        storeVer     : '1.0.3',     //版本号
        storePage    : "ACPAGE",    //页面采集标记
        storeClick   : "ACCLIK",    //点击事件采集标记
        storeTiming  : "ACTIME",    //页面时间采集标记
        storeStuGrade: "GET_GRADE",  //学生查看成绩标记
        storeStuCourse: "CHOOSE_COURSE", //学生选课标记
        storeStuTable: "STUDENT_COURSE_TABLE", //学生查看课表标记
        storeStuUpdate: "STUDNET_UPDATE_INFO",  //学生修改个人档案
        storeTeaGrade: "TEACHER_RECORD_GRADE",  //教师登记成绩
        storeTeaTable: "TEACHER_COURSE_TABLE",  //教师查看课表
        storeTeaUpdate: "TEACHER_UPDATE_INFO",  //教师修改个人档案
        storeLogin:    "LOGIN",     //登记标记
        
        userSha      : 'userSha',   //用户标识
        // classTag     : '',          //自动埋点,数据大
        classTag     : 'isjs-ac',   //主动埋点标识, 自动埋点时请配置空字符串
        loginTag     :  'userLogin', //特殊埋点
        checkGradeTag:  'checkGrade',    //学生查看成绩
        recordGradeTag: 'recordGrade',   //教师登记成绩
        stuInfoTag   :  'studentInfo'    ,   //学生修改档案
        teaInfoTag   :  'teacherInfo'    ,   //教师修改档案
        stuTableTag  :  'studentTable'   ,   //学生查看课表
        teaTableTag  :  'teacherTable'   ,   //教师查看课表
        chooseCourse :  'chooseCourse',  //学生选课
        logoutTag    :  'userlogout'      ,     //退出按钮标记

        maxDays      : 5,           //cookie期限
        acbLength    : 2,           //点击元素采集层数，自动埋点时会向上层查找，该选项可以配置查找层数
        useStorage   : false,       //自动检测是否使用storage，不要手动更改
        openClick    : true,        //是否开启点击数据采集
    },
    util: { //工具函数
        isNullOrEmpty: function (obj) {
            return ( obj !== 0 || obj !== "0" ) && ( obj === undefined || typeof obj === "undefined" || obj === null || obj === "null" || obj === "" );
        },
        setCookie: function (name, value, Day) {
            if (dataAcquisition.store.useStorage) {
                window.localStorage.setItem(name, value);
            } else {
                if (!Day)Day = dataAcquisition.store.maxDays;
                var exp = new Date();
                exp.setTime(exp.getTime() + Day * 24 * 60 * 60000);
                document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + ";path=/";
            }
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (!name)return null;
            if (dataAcquisition.store.useStorage) {
                return window.localStorage.getItem(name);
            } else {
                if (arr = document.cookie.match(reg)) {
                    return (decodeURIComponent(arr[2]));
                } else {
                    return null;
                }
            }
        },
        delCookie: function (name) {
            if (dataAcquisition.store.useStorage) {
                window.localStorage.removeItem(name);
            } else {
                this.setCookie(name, '', -1);
            }
        },
        getAccount: function () {
            var account = localStorage.getItem('account');

            console.log("getAccount in dataAcquisition")
            console.log(account)
            
            return account;
        },
        getTimeStr: function () {
            var date = new Date();
            var now = date.getFullYear() + "/";
            now += (date.getMonth() + 1) + "/";
            now += date.getDate() + " ";
            now += date.getHours() + ":";
            now += date.getMinutes() + ":";
            now += date.getSeconds() + "";
            return now;
        }
    },
    init: function () {
        var _this = this, _ACIDoms = document.querySelectorAll(this.store.selector);

        this.store.useStorage = (typeof window.localStorage != 'undefined');
        this.util.setCookie(this.store.storePage, window.location.href);

        if (!this.util.isNullOrEmpty(this.util.getCookie(this.store.userSha))) {
            console.log("init userSa")
            this.util.setCookie(this.store.userSha, this.util.getAccount())
        }

        this.postData();

        //点击事件监听
        if(this.store.openClick){
            //对本页面添加监听（ios兼容性问题）
            if (/iphone|ipad|ipod/i.test(window.navigator.userAgent)) {
                var elements = document.getElementsByTagName("body")[0].childNodes;
                for (var z = 0, length = elements.length; z < length; z++) {
                    elements[z].addEventListener("click", function () {
                    });
                }
            }

            document.addEventListener("click", function (e) {
                var event = window.event || e;
                var target = event.srcElement ? event.srcElement : event.target;
                _this.getACBtarget(target);
            });
        }
        return this;
    },
    getACBtarget: function (node, length) {//冒泡场景下将除document外所有父元素添加点击事件
        if (this.util.isNullOrEmpty(length)) {
            length = 0;
        }
        //length限制采集内容大小，只采集有效数据
        if (!this.util.isNullOrEmpty(node)) {
            var parentNode = node && node.parentNode;
            /* 自动埋点采集点击数据时,使用下面的建议*/
            this.setClickAc(node);
            if (Object.prototype.toString.call(parentNode) !== Object.prototype.toString.call(document) && length < this.store.acbLength) {
                this.getACBtarget(parentNode, ++length);
            }
        }
    },
    setClickAc: function (e) {  //元素点击数据保存
        if (this.util.isNullOrEmpty(e.id) && this.util.isNullOrEmpty(e.className)) {
            return;
        }
        //主动埋点生效
        if(!this.util.isNullOrEmpty(this.store.classTag) && e.className.indexOf(this.store.classTag) < 0){
            return;
        }
        var storeString = this.util.getCookie(this.store.storeClick);
        var ACBdata = this.util.isNullOrEmpty(storeString) ? [] : JSON.parse(storeString);

        var nowStr = this.util.getTimeStr();
        var clickData = {
            userID: this.util.getAccount(),
            type: this.store.storeClick,
            path: window.location.href,
            efID: e.id,
            className: e.className,
            val: e.value || e.innerText,
            sfTime: nowStr,
            efTime: nowStr,
            action:''

        };

        //判断是否为特殊的按钮，添加action
        if(e.className.indexOf(this.store.loginTag) > 0){
            clickData.action = this.store.storeLogin
        }

        if(e.className.indexOf(this.store.checkGradeTag) > 0){
            clickData.action = this.store.storeStuGrade
        }

        if(e.className.indexOf(this.store.recordGradeTag) > 0){
            clickData.action = this.store.storeTeaGrade
        }

        if(e.className.indexOf(this.store.stuInfoTag) > 0){
            clickData.action = this.store.storeStuUpdate
        }

        if(e.className.indexOf(this.store.teaInfoTag) > 0){
            clickData.action = this.store.storeTeaUpdate
        }

        if(e.className.indexOf(this.store.stuTableTag) > 0){
            clickData.action = this.store.storeStuTable
        }

        if(e.className.indexOf(this.store.teaTableTag) > 0){
            clickData.action = this.store.storeTeaTable
        }

        if(e.className.indexOf(this.store.chooseCourse) > 0){
            clickData.action = this.store.storeStuCourse
        }

        if(e.className.indexOf(this.store.logoutTag) > 0){
            this.postData()
            return
        }

        ACBdata.push(clickData);
        console.log("setClickAc in dataAcquisition")
        console.log(ACBdata)
        this.util.setCookie(this.store.storeClick, JSON.stringify(ACBdata))
        if(ACBdata.length >= 50){
            this.postData()
        }
    },
    getAc2Type: function (type) {  //获取本地数据
        var storeArr = [];
        var storeString = this.util.getCookie(type);
        if (!this.util.isNullOrEmpty(storeString)) {
            storeArr = JSON.parse(storeString);
        }
        
        this.util.delCookie(type);
        return storeArr;
    },
    postData: function () {//数据上报
        var data = [],
            clickAcData = this.getAc2Type(this.store.storeClick);
        
        //上报数据

        data = clickAcData
        console.log("postData in dataAcquisition")
        console.log(data)
        axios.post('/user/updateAction',data)
        .then(res => {
            if(res.state){
                console.log("用户轨迹发送成功")
            }
        })
        .catch(function(error){
            console.log("发送数据产生错误！")
        })
       
    },
}
if (typeof define === "function" && define.amd) {
    define("dataAc", ['jquery'], function () {
        return dataAcquisition.init();
    });
} else {
    window['dataAc'] = dataAcquisition.init();
}
window.onbeforeunload = function () {
    this.dataAcquisition.postData();
}