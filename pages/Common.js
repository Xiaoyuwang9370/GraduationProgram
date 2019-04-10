var sUser = getCookie("CRS_User");
var sUserName = getCookie("CRS_User_Name");
var sUserType = getCookie("CRS_User_Type");
var sCollege = getCookie("CRS_College");

function getCookie(sCookieName) {
    sCookies = (document.cookie).split(";");
    for (var i = 0; i < sCookies.length; i++) {
        sCookie = sCookies[i].trim();
        if (sCookie.indexOf(sCookieName + "=") == 0) {
            return sCookie.substr(sCookieName.length + 1, sCookie.length);
        }
    }
    if (sCookieName == "CRS_User_Type") {
        return "4";
    }
    return null;
}

function checkPermission(nUserType) {
    nUserType = (nUserType == 0 ? 4 : nUserType);
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

function checkUser(sUser, sUserName, nUserType, sCollege) {
    var sUserType = "";

    if (nUserType == 1) {
        sUserType = "管理员";
    }
    else if (nUserType == 2) {
        sUserType = "教师";
    }
    else if (nUserType == 3) {
        sUserType = "学生";
    }
    else {
        sUserType = "游客";
    }

    if (sUserName != null && nUserType != null) {
        $("#LoginButton").html(sUserName);
        $(".User").html(sUser);
        $(".UserName").prepend(sUserName);
        $(".UserType").html(sUserType);
        $(".College").html(sCollege);
    }
    else {
        $("#LoginButton").html("登录");
        $("#LoginButton").attr("data-toggle", "none");

    }
}

function doLogout() {
    if (window.confirm("是否注销登录用户" + sUser)) {
        setCookie("CRS_User", "", -1);
        setCookie("CRS_User_Name", "", -1);
        setCookie("CRS_User_Type", "", -1);
        setCookie("CRS_College", "", -1);
        location.href = "/CRSystem/Pages/Login.php";
    }
}

function getUrlParam(sName)
{
    var sUrl = window.location.href;
    var oRegexp = new RegExp("[\\?|\\&]" + sName + "\\=([^\\&]+)");
    var sMatch = sUrl.match(oRegexp);
    if (sMatch)
    {
        return sMatch[1];
    }
    return;
}