if (sUserType > 2) {
    location.href = "/CRSystem/pages/404.html";
}

function generateTitleInfo(oApplyInfo) {
    oApplyInfo = oApplyInfo.split(",");
    
    let sSelectedClassroom = "";
    let sDate = "";
    let sLesson = "";
    for (let i = 0; i < oApplyInfo.length; i++) {
        sSelectedClassroom = oApplyInfo[0];
        sDate = oApplyInfo[1];
        sLesson = oApplyInfo[2];
    }
    
    if (sLesson == "night")
    {
        sLesson = "晚自习";
    }
    
    $("#classroom").attr("value",sSelectedClassroom);
    $("#date").attr("value",sDate);
    $("#lesson").attr("value",sLesson);
    $("#applyName").attr("value",sUserName);
}

generateTitleInfo(getUrlParam("ApplyInfo"));