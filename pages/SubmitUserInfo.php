<?php
function register()
{   
    $sName = $_POST["Name"];
    $sUserName = $_POST["UserName"];
    $sType = $_POST["Type"];
    $sCollege = $_POST["College"];
    $sPassword = "123456";
    
    $VMPDB = new mysqli("localhost", "root", "123", "CRSdatabase");
    if ($VMPDB->connect_error) {
        die("连接失败: " . $VMPDB->connect_error);
    } 
    $VMPDB->query("set names 'utf8' ");   
    $VMPDB->query("set character_set_client=utf8");   
    $VMPDB->query("set character_set_results=utf8"); 
    
    $sPassword = md5($sPassword);

    $sSql = "INSERT INTO User (Name, User_Name, Type, College, Password) 
             VALUES ('{$sName}', '{$sUserName}','{$sType}' ,'{$sCollege}', '{$sPassword}')";

    $bInsertDone = $VMPDB->query($sSql);
    
    if ($bInsertDone)
    {
        echo "<script>alert(\"导入成功\")</script>";
        echo "<script>window.location.href = \"AddUser.html\" </script>";
    }
    else
    {
        echo "<script>alert(\"导入失败,用户名已存在\")</script>";
        echo "<script>window.location.href = \"AddUser.html\" </script>";
    }
}

register();
?>