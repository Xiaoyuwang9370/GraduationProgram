GetUserInfo();
//导入用户信息
function GetUserInfo() {
	$.ajax({
		type: "post",
		url: "GetUserInfo.php", //后台添加方法url
		dataType: "JSON",
		timeout: 1000,
		beforesecd: loadfunction,
		success: function(data) {
			var sTypes = data.Types;
			var sUsers = data.Users;
			for(var i = 0; i < sUsers.length; i++) {
				var oUser = sUsers[i];
				var sName = oUser.Name;//用户名
				var sUserTypeID = oUser.User_Type;//用户名ID
				var sOptionlist = "";//用户类型集合
				
				for(var j = 0; j < sTypes.length; j++){
				    var oType = sTypes[j];
				    if (oType.Type == sUserTypeID)
				    {
				    	sOptionlist += "<option value='" + oType.Type + "' selected='selected'>" + oType.Name + "</option>";
				    }
				    else
				    {
				    	sOptionlist += "<option value='" + oType.Type + "'>" + oType.Name + "</option>";
				    }
				    
			    }
				var first_td = "<td value = '" + sName + "'>" + sName + "</td>";//第一个单元格内容
				var second_td = "<td><select name='Type_" + sName + "'>" + sOptionlist + "</select></td>"; //第二个单元格内容
				var third_td = "<td><input type = 'checkbox' name = 'Delete_" + sName + "'></input></td>"; //第三个单元格内容
				//var third_td = "<td><button class='btn btn-danger btn-xs' id = 'delBtn' value = '删除'>删除</button></td>";
				$("#tbody").append("<tr value = '" + sName + "' >" + first_td + second_td + third_td + "</tr>");
			}
		},
		error: function(data) {
            // alert("GetUser err");
            console.log(data);
		}
	});

	function loadfunction() {
		alert("加载中...");
	}
}

//修改确认
function confirmChanged() {
	if(confirm("确定要修改吗？")) {
		return true;
	} else {
		return false;
	}
}

