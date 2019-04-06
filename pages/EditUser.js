function generateTbody(data) {
	var oUserType = data.Types;
	var oUserInfo = data.Users;

	for (var i = 0; i < oUserInfo.length; i++) {
		var oUser = oUserInfo[i];
		var sName = oUser.Name;//用户名
		var sUserName = oUser.User_Name;//姓名
		var sUserTypeID = oUser.Type_ID;//用户类型
		var sOptionlist = "";//用户类型集合

		for (var j = 0; j < oUserType.length; j++) {
			var oType = oUserType[j];

			if (oType.Type_ID == sUserTypeID) {
				sOptionlist += "<option value='" + oType.Type_ID + "' selected='selected'>" + oType.Name + "</option>";
			}
			else {
				sOptionlist += "<option value='" + oType.Type_ID + "'>" + oType.Name + "</option>";
			}

		}

		var first_td = "<td value = '" + sName + "'>" + sName + "</td>";//第一个单元格内容
		var second_td = "<td value = '" + sUserName + "'>" + sUserName + "</td>";//第二个单元格内容
		var third_td = "<td><select name='Type_" + sName + "'>" + sOptionlist + "</select></td>"; //第三个单元格内容
		var fourth_td = "<td><input type = 'checkbox' name = 'Delete_" + sName + "'></input></td>"; //第四个单元格内容
		
		$("#tbody").append("<tr value = '" + sName + "' >" + first_td + second_td + third_td + fourth_td + "</tr>");
	}
}

function GetUserInfo() {
	$.ajax({
		type: "post",
		url: "GetUserInfo.php", //后台添加方法url
		dataType: "JSON",
		timeout: 1000,
		beforesecd: loadfunction,
		success: function (data) {
			generateTbody(data);
		},
		error: function (data) {
			// alert("GetUser err");
			console.log(data);
		}
	});

	function loadfunction() {
		alert("加载中...");
	}
}

GetUserInfo();

//修改确认
function confirmChanged() {
	if (confirm("确定要修改吗？")) {
		return true;
	} else {
		return false;
	}
}

