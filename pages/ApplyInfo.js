if (sUserType > 2) {
    location.href = "/CRSystem/pages/404.html";
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
        let sLesson = "";
        let nLesson = "";
        let nLesson1_2 = oClassroomData[i].Lesson1_2;
        let nLesson3_4 = oClassroomData[i].Lesson3_4;
        let nLesson5_6 = oClassroomData[i].Lesson5_6;
        let nLesson7_8 = oClassroomData[i].Lesson7_8;
        let nLessonNight = oClassroomData[i].LessonNight;
        let sCollege = oClassroomData[i].College;
        let sSubject = oClassroomData[i].Subject;
        let sName = oClassroomData[i].User_Name;
        let sApplyName = oClassroomData[i].Apply_Name;
        let sStatus = "";
        let nStatusID = oClassroomData[i].Status_ID;
        
        if (nLesson1_2 == 1) {
            sLesson = "1-2节";
            nLesson = "1_2";
        }

        if (nLesson3_4 == 1) {
            sLesson = "3-4节";
            nLesson = "3_4";
        }

        if (nLesson5_6 == 1) {
            sLesson = "5-6节";
            nLesson = "5_6";
        }

        if (nLesson7_8 == 1) {
            sLesson = "7-8节";
            nLesson = "7_8";
        }

        if (nLessonNight == 1) {
            sLesson = "晚自习";
            nLesson = "night";
        }

        if (nStatusID == 1) {
            sStatus = "已预约";
        }
        
        let sEditTd = "<td><a href='EditClassroom.html?ApplyInfo=" + sClassroom + "," + sDate + "," + nLesson + "' class='btn btn-xs btn-primary'>修改</a></td>";
        let sCancelTd = "<td><button class='btn btn-xs btn-danger'>取消</button></td>";
        let sTr = "<tr><td>" + sClassroom + "</td><td>" + sDate + "</td><td>" + sWeek + "</td><td>" + sLesson + "</td><td>" + sCollege + "</td><td>" + sSubject + "</td><td>" + sName + "</td><td>" + sApplyName + "</td><td>" + sStatus + "</td>" + sEditTd + sCancelTd + "</tr>";
        $("#tbody").append(sTr);
    }
}

function getClasssroomDataReservedOwn(sUserName) {
    $.ajax({
        type: "post",
        url: "GetClassroomDataReservedOwn.php",
        dataType: "json",
        data: {"UserName":sUserName},
        success: function (result) {
            generateTbody(result);
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}
getClasssroomDataReservedOwn(sUserName);