String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function arraySize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function getCookie(sCookieName) {
    sCookies = (document.cookie).split(";");
    for (var i = 0; i < sCookies.length; i++) {
        sCookie = sCookies[i].trim();
        if (sCookie.indexOf(sCookieName + "=") == 0) {
            return sCookie.substr(sCookieName.length + 1, sCookie.length);
        }
    }
    if (sCookieName == "VMP_User_Type") {
        return "5";
    }
    return null;
}

function checkPermission(nUserType) {
    nUserType = (nUserType == 0 ? 5 : nUserType);
    for (var i = nUserType - 1; i > 0; i--) {
        $(".Permission" + i).remove();
    }
}

function setCookie(sName, sValue, nExpireDays) {
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + (nExpireDays * 24 * 60 * 60 * 1000));
    var sExpireDays = "";
    if (nExpireDays != 0) {
        sExpireDays = ";expires=" + oDate.toGMTString();
    }

    document.cookie = sName + "=" + sValue + sExpireDays + ";path=/";
}

function getUrlParam(sName) {
    var sUrl = window.location.href;
    var oRegexp = new RegExp("[\\?|\\&]" + sName + "\\=([^\\&]+)");
    var sMatch = sUrl.match(oRegexp);
    if (sMatch) {
        return sMatch[1];
    }
    return;
}
//点击链接改变cookie
function setCookieFeature() {
    setCookie("BranchTypeID", 1, 0);
}

function setCookieIntegration() {
    setCookie("BranchTypeID", 2, 0);
}

function setCookiePublished() {
    setCookie("BranchTypeID", 3, 0);
}

function hasClass(elementOne, cName) {
    return !!elementOne.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}

function addClass(elementOne, cName) {
    if (!hasClass(elementOne, cName)) {
        elementOne.className += " " + cName;
    };
}

function removeClass(elementOne, cName) {
    if (hasClass(elementOne, cName)) {
        elementOne.className = elementOne.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
    };
}

function checkUser(sUser, sUserType) {
    if (sUser != null && sUserType != null) {
        var LoginButton = document.getElementById("LoginButton");
        LoginButton.style.display = "none";
        $("#UserName").html(sUser);
    }
    else {
        var LogoutButton = document.getElementById("LogoutButton");
        LogoutButton.style.display = "none";
        var UserName = document.getElementById("UserName");
        UserName.style.display = "none";
        //$("#UserName").remove();
    }
}
function doLogout() {
    if (window.confirm("是否注销登录用户" + sUser)) {
        setCookie("VMP_User", "", -1);
        setCookie("VMP_User_Type", "", -1);
        location.reload();
    }
}

function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    var dayTime = 0;// 天
    if (secondTime > 60) {
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
            //如果小时数大于24，将小时转换成天
            if (hourTime > 24) {
                dayTime = parseInt(hourTime / 24);
                hourTime = parseInt(hourTime % 24);
            }
        }
    }

    var result = "";
    if (dayTime > 0) {
        result = dayTime + "天" + hourTime + "小时";
    }
    else if (hourTime > 0) {
        result = hourTime + "小时" + minuteTime + "分钟";
    }
    else if (minuteTime > 0) {
        result = minuteTime + "分钟" + secondTime + "秒";
    }
    else {
        result = secondTime + "秒";
    }
    return result;
}

function toPercent(point) {
    var str;
    if (point == 1) {
        str = Number(point * 100);
        str += "%";
    }
    else if (point == 0) {
        str = Number(point);
    }
    else {
        str = Number(point * 100).toFixed(1);
        str += "%";
    }
    return str;
}

function getPageCounts(sPageUrl, sUserName) {
    $.ajax({
        type: "get",
        url: "GetPageVisits.php",
        data: {
            PageUrl: sPageUrl,
            UserName: sUserName
        },
        dataType: "json",
        success: function (result) {
            var nVisits = result.Visits;
            $("body").append("<div style='clear:both;'></div><p style='float:right;margin-top:30px;'>访问次数：" + nVisits + "</p>");
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}

function timestampToTime(timestamp) {
    var time = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    if (m >= 1 && m <= 9) {
        m = "0" + m;
    }
    if (d >= 0 && d <= 9) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}