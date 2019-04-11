if (sUserType > 1) {
    location.href = "/CRSystem/pages/404.html";
}

function deleteClassroom(sButtonName) {
    $.ajax({
        type: "post",
        url: "QueryCRSDB.php",
        data: {"SqlScript":"UPDATE classroom_id,classroom_data SET classroom_id.Delete_Flag=1,classroom_data.Delete_Flag=1 WHERE classroom_id.Classroom='" + sButtonName + "' AND classroom_data.Classroom='" + sButtonName + "'"},
        success: function (result) {
            alert(sButtonName + "教室删除成功！");
            window.location.reload();
        },
        error: function (oErrorMSG){
            alert(sButtonName + "教室删除失败！");
            window.location.reload();
        }
    });
}

function confirmChanged(sButtonName) {
	if (confirm("确定要删除" + sButtonName + "教室吗？")) {
		return deleteClassroom(sButtonName);
	} else {
		return false;
	}
}

function generateTbody(oClassroomList) {
    let nCount = 0;
    for (let i = 0; i < oClassroomList.length; i++) {
        let sClassroom = oClassroomList[i].Classroom;
        let nClassroomID = oClassroomList[i].Classroom_ID;
        nCount += 1;
        let sNumberTd = "<td>" + nCount + "</td>";
        let sClassroomTd = "<td>" + sClassroom + "</td>";
        let sViewTd = "<td><button class=\"btn btn-xs btn-primary\" onclick=\"window.location.href='../index.html?ClassroomID=" + nClassroomID + "'\">查看</button></td>";
        let sDelTd = "<td><button name='" + sClassroom + "' class=\"btn btn-xs btn-danger delBtn\">删除</button></td>";
        let sTr = "<tr value='" + sClassroom + "'>" + sNumberTd + sClassroomTd + sViewTd + sDelTd +"</tr>";
        $("#tbody").append(sTr);
    }

    $(".delBtn").click(function(){
        let sButtonName = $(this).attr("name");
        confirmChanged(sButtonName);
    });
}

function getClassroomData() {
    $.ajax({
        type: "post",
        url: "GetClassroomList.php",
        dataType: "json",
        success: function (result) {
            generateTbody(result);
        },
        error: function (oErrorMSG) {
            console.log(oErrorMSG);
        }
    });
}

getClassroomData();