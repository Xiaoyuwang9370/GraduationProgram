//检查权限
checkUser(sUser, sUserName, sUserType, sCollege);
checkPermission(Number(sUserType));
if (sUserType > 3) {
    location.href = "/CRSystem/pages/Login.php";
}

function timestampToDate(timestamp) {
    var time = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
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

function getMonDate() {
    var d = new Date(),
        day = d.getDay(),
        date = d.getDate();
    return d;
}
// 0-6转换成中文名称
function getDayName(day) {
    var day = parseInt(day);
    if (isNaN(day) || day < 0 || day > 6)
        return false;
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekday[day];
}

function generateTbody(oClassroomList, oClassroomInfo, sSelectedClassroomID, sSelectedClassroom) {
    let nStatusID = 0;
    for (let i = 0; i < oClassroomList.length; i++) {
        if (oClassroomList[i].Classroom_ID == sSelectedClassroomID) {
            nStatusID = parseInt(oClassroomList[i].Status_ID);
        }
    }

    // d是当前星期一的日期对象
    let d = getMonDate();
    for (let i = 0; i < 14; i++) {
        d.setDate(d.getDate() + 1);
        sDate = timestampToDate(d);
        sWeek = getDayName(d.getDay());
        let sDateTd = "<td value=" + sDate + ">" + sDate + "</td>";
        let sWeekTd = "<td>" + sWeek + "</td>";
        let sStatus1_2= "预约";
        let sStatus3_4 = "预约";
        let sStatus5_6 = "预约";
        let sStatus7_8 = "预约";
        let sStatus_Night = "预约";

        if (nStatusID == 1) {
            for (let j = 0; j < oClassroomInfo.length; j++) {
                let nLesson1_2 = oClassroomInfo[j].Lesson1_2;
                let nLesson3_4 = oClassroomInfo[j].Lesson3_4;
                let nLesson5_6 = oClassroomInfo[j].Lesson5_6;
                let nLesson7_8 = oClassroomInfo[j].Lesson7_8;
                let nLesson_Night = oClassroomInfo[j].LessonNight;

                if (oClassroomInfo[j].Status_ID == 1 && oClassroomInfo[j].Date == sDate)
                {
                    if (nLesson1_2 == 1)
                    {
                        sStatus1_2 = "<span class='college'>" + oClassroomInfo[j].College + "</span><br><span class='subject'>" + oClassroomInfo[j].Subject + "</span><br><span class='name'>主讲人：" + oClassroomInfo[j].User_Name + "</span>";
                    }
                    
                    if (nLesson3_4 == 1)
                    {
                        sStatus3_4 = "<span class='college'>" + oClassroomInfo[j].College + "</span><br><span class='subject'>" + oClassroomInfo[j].Subject + "</span><br><span class='name'>主讲人：" + oClassroomInfo[j].User_Name + "</span>";
                    }

                    if (nLesson5_6 == 1)
                    {
                        sStatus5_6 = "<span class='college'>" + oClassroomInfo[j].College + "</span><br><span class='subject'>" + oClassroomInfo[j].Subject + "</span><br><span class='name'>主讲人：" + oClassroomInfo[j].User_Name + "</span>";
                    }

                    if (nLesson7_8 == 1)
                    {
                        sStatus7_8 = "<span class='college'>" + oClassroomInfo[j].College + "</span><br><span class='subject'>" + oClassroomInfo[j].Subject + "</span><br><span class='name'>主讲人：" + oClassroomInfo[j].User_Name + "</span>";
                    }

                    if (nLesson_Night == 1)
                    {
                        sStatus_Night = "<span class='college'>" + oClassroomInfo[j].College + "</span><br><span class='subject'>" + oClassroomInfo[j].Subject + "</span><br><span class='name'>主讲人：" + oClassroomInfo[j].User_Name + "</span>";
                    }
                                        
                }
                
            }
        }
        
        let sStatusTd_1 = "<td class='status' id='" + sDate + "_1-2'><a href='pages/ApplyClassroom.html?ApplyInfo=" + sSelectedClassroom + "," + sDate + "," + "1_2" + "'>" + sStatus1_2 + "</a></td>";
        let sStatusTd_2 = "<td class='status' id='" + sDate + "_3-4'><a href='pages/ApplyClassroom.html?ApplyInfo=" + sSelectedClassroom + "," + sDate + "," + "3_4" + "'>" + sStatus3_4 + "</a></td>";
        let sStatusTd_3 = "<td class='status' id='" + sDate + "_5-6'><a href='pages/ApplyClassroom.html?ApplyInfo=" + sSelectedClassroom + "," + sDate + "," + "5_6" + "'>" + sStatus5_6 + "</a></td>";
        let sStatusTd_4 = "<td class='status' id='" + sDate + "_7-8'><a href='pages/ApplyClassroom.html?ApplyInfo=" + sSelectedClassroom + "," + sDate + "," + "7_8" + "'>" + sStatus7_8 + "</a></td>";
        let sStatusTd_5 = "<td class='status' id='" + sDate + "_night'><a href='pages/ApplyClassroom.html?ApplyInfo=" + sSelectedClassroom + "," + sDate + "," + "night" + "'>" + sStatus_Night + "</a></td>";
        let sTr = "<tr>" + sDateTd + sWeekTd + sStatusTd_1 + sStatusTd_2 + sStatusTd_3 + sStatusTd_4 + sStatusTd_5 + "</tr>";
        $("#tbody").append(sTr);
    }
}

function getClasssroomData(oClassroomList, sSelectedClassroomID, sSelectedClassroom) {
    $.ajax({
        type: "get",
        url: "pages/GetClassroomData.php",
        data: {
            "ClassroomID":sSelectedClassroomID
        },
        dataType: "json",
        success: function (result) {
            generateTbody(oClassroomList, result, sSelectedClassroomID, sSelectedClassroom);
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}

function generateOptionList(oClassroomList, ClassroomID) {
    let sSelectedClassroomID = "";
    let sOptionList = "";
    for (let i = 0; i < oClassroomList.length; i++) {
        if (ClassroomID != undefined) {
            sSelectedClassroomID = ClassroomID;
        }
        else {
            sSelectedClassroomID = oClassroomList[0].Classroom_ID;
        }

        let sClassroom = oClassroomList[i].Classroom;
        let sClassroomID = oClassroomList[i].Classroom_ID;
        if (sClassroomID == sSelectedClassroomID) {
            sOptionList += "<option value='" + sClassroomID + "' selected='selected'>" + sClassroom + "</option>";
        }
        else {
            sOptionList += "<option value='" + sClassroomID + "'>" + sClassroom + "</option>";
        }

    }
    $("#classroomList").append(sOptionList);
    let sSelectedClassroom = $("#classroomList option:selected").text();
    $(".classroom").html(sSelectedClassroom);
    getClasssroomData(oClassroomList, sSelectedClassroomID, sSelectedClassroom);

    $("#classroomList").change(function () {
        let sSelectedClassroomID = $("#classroomList option:selected").val();
        window.location.href = "index.html?ClassroomID=" + sSelectedClassroomID;
        let sOptionList = "";
        for (let i = 0; i < oClassroomList.length; i++) {
            if (ClassroomID != undefined) {
                sSelectedClassroomID = ClassroomID;
            }
            else {
                sSelectedClassroomID = oClassroomList[0].Classroom_ID;
            }

            let sClassroom = oClassroomList[i].Classroom;
            let sClassroomID = oClassroomList[i].Classroom_ID;
            if (sClassroomID == sSelectedClassroomID) {
                sOptionList += "<option value='" + sClassroomID + "' selected='selected'>" + sClassroom + "</option>";
            }
            else {
                sOptionList += "<option value='" + sClassroomID + "'>" + sClassroom + "</option>";
            }

        }
        $("#classroomList").append(sOptionList);
        let sSelectedClassroom = $("#classroomList option:selected").text();
        $(".classroom").html(sSelectedClassroom);
        getClasssroomData(oClassroomList, sSelectedClassroomID, sSelectedClassroom);
    });
    
}

function getClasssroomList() {
    $.ajax({
        type: "post",
        url: "pages/GetClassroomList.php",
        dataType: "json",
        success: function (result) {
            generateOptionList(result, getUrlParam("ClassroomID"));
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}

getClasssroomList();