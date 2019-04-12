if (sUserType > 2) {
    location.href = "/CRSystem/pages/404.html";
}

function cancelClassroomReserved(oButtonInfo) {
    let sClassroom = "";
    let sDate = "";
    let sLesson = "";
    for (let i = 0; i < oButtonInfo.length; i++) {
        sClassroom = oButtonInfo[0];
        sDate = oButtonInfo[1];
        sLesson = oButtonInfo[2];
    }

    $.ajax({
        type: "post",
        url: "QueryCRSDB.php",
        data: {"SqlScript":"DELETE FROM Classroom_Data WHERE Classroom='" + sClassroom + "' AND Date='" + sDate + "' AND Lesson='" + sLesson + "'"},
        success: function (result) {
            alert(sClassroom + "教室在" + sDate + " | " + sLesson + "的预约取消成功！");
            window.location.reload();
        },
        error: function (oErrorMSG){
            alert(sClassroom + "教室在" + sDate + " | " + sLesson + "的预约取消失败！");
            window.location.reload();
        }
    });
}

function confirmChanged(oButtonInfo) {
    let sClassroom = "";
    let sDate = "";
    let sLesson = "";
    for (let i = 0; i < oButtonInfo.length; i++) {
        sClassroom = oButtonInfo[0];
        sDate = oButtonInfo[1];
        sLesson = oButtonInfo[2];
    }
    
    if (confirm("确定要取消" + sClassroom + "教室在" + sDate + " | " + sLesson + "的预约吗？"))
    {
		return cancelClassroomReserved(oButtonInfo);
	} else {
		return false;
	}
}

function dateToWeek(sDate) {
    let day = new Date(sDate).getDay();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    sWeek = weekday[day];
    return sWeek;
}

function generateTbody(oClassroomData) {
    for (let i = 0; i < oClassroomData.length; i++) {
        let sClassroom = oClassroomData[i].Classroom;
        let sDate = oClassroomData[i].Date;
        let sWeek = dateToWeek(sDate);
        let sLesson = oClassroomData[i].Lesson;
        let nLesson = "";
        let sCollege = oClassroomData[i].College;
        let sSubject = oClassroomData[i].Subject;
        let sName = oClassroomData[i].User_Name;
        let sApplyName = oClassroomData[i].Apply_Name;
        let sStatus = "";
        let nStatusID = oClassroomData[i].Status_ID;

        if (sLesson == "1-2节") {
            nLesson = "1-2";
        }

        if (sLesson == "3-4节") {
            nLesson = "3-4";
        }

        if (sLesson == "5-6节") {
            nLesson = "5-6";
        }

        if (sLesson == "7-8节") {
            nLesson = "7-8";
        }

        if (sLesson == "晚自习") {
            nLesson = "night";
        }

        if (nStatusID == 1) {
            sStatus = "已预约";
        }

        let sEditTd = "<td><a href='EditClassroom.html?ApplyInfo=" + sClassroom + "," + sDate + "," + nLesson + "' class='btn btn-xs btn-primary'>修改</a></td>";
        let sCancelTd = "<td><button name='" + sClassroom + "," + sDate + "," + sLesson + "' class='btn btn-xs btn-danger delBtn'>取消</button></td>";
        let sTr = "<tr><td>" + sClassroom + "</td><td>" + sDate + "</td><td>" + sWeek + "</td><td>" + sLesson + "</td><td>" + sCollege + "</td><td>" + sSubject + "</td><td>" + sName + "</td><td>" + sApplyName + "</td><td>" + sStatus + "</td>" + sEditTd + sCancelTd + "</tr>";
        $("#tbody").append(sTr);
    }

    $(".delBtn").click(function () {
        let sButtonInfo = $(this).attr("name");
        let oButtonInfo = sButtonInfo.split(",");
        confirmChanged(oButtonInfo);
    });
}

function getClasssroomDataReservedOwn(sUserName) {
    $.ajax({
        type: "post",
        url: "GetClassroomDataReservedOwn.php",
        dataType: "json",
        data: { "UserName": sUserName },
        success: function (result) {
            generateTbody(result);
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}
getClasssroomDataReservedOwn(sUserName);