<script>
    function setCookie(sName, sValue, nExpireDays) {
        var oDate = new Date();
        oDate.setTime(oDate.getTime() + (nExpireDays * 24 * 60 * 60 * 1000));
        var sExpireDays = "";
        if (nExpireDays != 0) {
            sExpireDays = ";expires=" + oDate.toGMTString();
        }

        document.cookie = sName + "=" + sValue + sExpireDays + ";path=/";
    }
</script>

<?php
    function editPwd()
    {
        $sName = $_POST["Name"];
        $sPwd = $_POST["OldPassword"];
        $sNewPwd = $_POST["NewPassword"];
        $sCheck = $_POST["Check"];

        $VMPDB = new mysqli("localhost", "root", "123", "CRSdatabase");

        if ($VMPDB->connect_error)
        {
            die("连接失败: " . $VMPDB->connect_error);
        }

        $VMPDB->query("set names 'utf8' ");   
        $VMPDB->query("set character_set_client=utf8");   
        $VMPDB->query("set character_set_results=utf8"); 
        
        $sPwd = md5($sPwd);
        $sNewPwd = md5($sNewPwd);

        $oUpdate = $VMPDB->query("UPDATE User SET Password='{$sNewPwd}' WHERE Name='{$sName}' AND Password='{$sPwd}'");
        $nUpdateRows = mysqli_affected_rows($VMPDB);
        
        if ($nUpdateRows == 1)
        {
            echo "<script>setCookie('CRS_User', '', -1);</script>";
            echo "<script>setCookie('CRS_User_Name', '', -1);</script>";
            echo "<script>setCookie('CRS_User_Type', '', -1);</script>";
            echo "<script>setCookie('CRS_College', '', -1);</script>";
            echo "<script>alert('密码修改成功！');</script>";
            echo "<script>location.href = 'Login.php';</script>";
        }
        else
        {
            echo "<script>alert(\"原密码错误！\")</script>";
            echo "<script>location.href = 'AlterPwd.html';</script>";
        }
    }

    editPwd();
?>
