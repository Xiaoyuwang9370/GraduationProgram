if (sUserType > 2) {
    location.href = "/CRSystem/pages/404.html";
}

function submitApplyInfo() {
    oApplyInfo = getUrlParam("ApplyInfo").split(",");
    let sSelectedClassroom = "";
    let sDate = "";
    let sLesson = "";
    for (let i = 0; i < oApplyInfo.length; i++) {
        sSelectedClassroom = oApplyInfo[0];
        sDate = oApplyInfo[1];
        sLesson = oApplyInfo[2];
    }
    console.log(sSelectedClassroom);
    console.log(sDate);
    console.log(sLesson);

    $.ajax({
        type: "post",
        url: "ApplyClassroom.php",
        dataType: "JSON",
        data: {
            "Classroom": sSelectedClassroom,"Date": sDate,"Lesson": sLesson
        },
        success: function (result) {
            console.log(result);
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}
submitApplyInfo();

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
    else
    {
        sLesson = sLesson + "节";
    }
    $(".classroom").html(sSelectedClassroom);
    $(".applyTime").html(sDate + " | " + sLesson);
}

generateTitleInfo(getUrlParam("ApplyInfo"));