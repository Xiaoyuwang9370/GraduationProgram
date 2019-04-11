if (sUserType > 3) {
    location.href = "/CRSystem/pages/404.html";
}

$("#Name").attr("value", sUser);

function alter()
{
    var sUserName = $("#Name").val();
    var sOldPwd = $("#OldPwd").val();
    var sNewPwd = $("#NewPwd").val();
    var sCheck = $("#Check").val();
    var regex=/^[/s]+$/; //声明一个判断用户名前后是否有空格的正则表达式 
    
    if (regex.test(sUserName))//判断用户名前后是否有空格
    {
        alert("用户名格式不对！");
        return false;
    }

    if (regex.test(sOldPwd))
    {
        alert("原密码格式不对！");
        return false;
    }

    if (regex.test(sNewPwd))
    {
        alert("新密码格式不对！");
        return false;
    }

    if (sOldPwd == sNewPwd)
    {
        alert("新密码不能与原密码相同！");
        // alter(sOldPwd + " " + sNewPwd);
        console.log("原" + sOldPwd);
        console.log("新" + sNewPwd);
        return false;
    }

    if (sNewPwd == sUserName)
    {
        alert("新密码不能与用户名相同！");
        return false;
    }

    if (sNewPwd != sCheck)
    {
        alert("两次密码输入不一样！");
        return false;
    }
    
    return true;
}