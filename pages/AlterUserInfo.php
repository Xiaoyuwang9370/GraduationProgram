<?php
function alterUserInfo()
{   
    $sName = $_POST["Name"];
    $sUserName = $_POST["UserName"];
    $sType = $_POST["Type"];
    $sPhone = $_POST["Phone"];
    $sCollege = $_POST["College"];
    
    $VMPDB = new mysqli("localhost", "root", "123", "CRSdatabase");
    if ($VMPDB->connect_error) {
        die("连接失败: " . $VMPDB->connect_error);
    } 
    $VMPDB->query("set names 'utf8' ");   
    $VMPDB->query("set character_set_client=utf8");   
    $VMPDB->query("set character_set_results=utf8"); 

    $oResult = $VMPDB->query("UPDATE user SET Phone='{$sPhone}', College='{$sCollege}' WHERE Name='{$sName}'");
    // echo "UPDATE user SET Phone='{$sPhone}', College='{$sCollege}' WHERE Name='{$sName}'";

    $nUpdateRows = mysqli_affected_rows($VMPDB);
 
    if ($nUpdateRows == 1)
    {
        echo "<script>alert(\"用户资料修改成功，重新登录后生效\")</script>";
        echo "<script>window.location.href = \"AlterUserInfo.html\" </script>";
    }
    else
    {
        echo "<script>alert(\"用户资料修改失败\")</script>";
        echo "<script>window.location.href = \"AlterUserInfo.html\" </script>";
    }

    $VMPDB->close();
}

alterUserInfo();
?>