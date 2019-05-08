if (sUserType > 1) {
	location.href = "/CRSystem/pages/404.html";
}

//修改确认
function confirmChanged() {
	if (confirm("确定要修改吗？")) {
		return true;
	} else {
		return false;
	}
}

function generateTbody(data) {
	var oUserType = data.Types;
	var oUserInfo = data.Users;
	console.log(oUserInfo);
	for (var i = 0; i < oUserInfo.length; i++) {
		var oUser = oUserInfo[i];
		var sName = oUser.Name;//用户名
		var sUserName = oUser.User_Name;//姓名
		var sUserTypeID = oUser.Type_ID;//用户类型
		var sPhone = "";
		if (oUser.Phone == 0)
		{
			sPhone = "无";
		}
		else
		{
			sPhone = oUser.Phone;
		}
		var sCollege = oUser.College;
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
		var second_td = "<td class='list_one' value = '" + sUserName + "'>" + sUserName + "</td>";//第二个单元格内容
		var third_td = "<td><select name='Type_" + sName + "'>" + sOptionlist + "</select></td>"; //第三个单元格内容
		var fourth_td = "<td><input type = 'checkbox' name = 'Delete_" + sName + "'></input></td>"; //第四个单元格内容
		var fifth_td = "<td>" + sPhone + "</td>"; //第五个单元格内容
		var sixth_td = "<td>" + sCollege + "</td>"; //第六个单元格内容
		
		$("#tbody").append("<tr value = '" + sName + "' >" + first_td + second_td + third_td + fourth_td + fifth_td + sixth_td +"</tr>");
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
			console.log(data);
		}
	});

	function loadfunction() {
		alert("加载中...");
	}
}

GetUserInfo();

function searchBox()
{
	$("#SeachInput").change(function () {
        var searchText = $(this).val();//获取输入的搜索内容
        var searchTr = "";//预备对象，用于存储匹配出的tr

		if (searchText != "")
		{

          //获取所有匹配的tr
          searchTr = $("#tbody").find('td:contains('+ searchText +')').parent();
          //将内容清空
          $("#tbody").html("");
        }
        
        //将获取的元素追加到列表中
        $("#tbody").html(searchTr).clone();

        //判断搜索内容是否有效，若无效，输出not find
        if (searchTr.length <= 0) {
          $("#tbody").html("<tr>未找到匹配项</tr>")
        }
      })

      $("#SeachInput").click(function () {
        $("searchText").change();
      })
}

searchBox();

