if (sUserType > 3) {
    location.href = "/CRSystem/pages/404.html";
}

function showUserInfo(nUserType)
{
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

    $("#Name").attr("value", sUser);
    $("#UserName").attr("value", sUserName);
    $("#Type").attr("value", sUserType);
    $("#Phone").attr("value", sPhone);
    $("#College").attr("value", sCollege);
}

showUserInfo(sUserType);