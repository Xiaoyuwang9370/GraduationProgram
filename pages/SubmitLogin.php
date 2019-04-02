<script>
function setCookie(sName, sValue, nExpireDays)
{
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + (nExpireDays*24*60*60*1000));
    var sExpireDays = "";
    if (nExpireDays != 0)
    {
        sExpireDays = ";expires=" + oDate.toGMTString();
    }
    
    document.cookie = sName + "=" + sValue + sExpireDays + ";path=/";
}
</script>

<script>
<?php
function login()
{
    $sName = $_POST["Name"];
    $sPassword = $_POST["Password"];
    
    $VMPDB = new mysqli("localhost", "root", "123", "crsdatabase");
    if ($VMPDB->connect_error) {
        die("连接失败: " . $VMPDB->connect_error);
    } 
    $VMPDB->query("set names 'utf8' ");   
    $VMPDB->query("set character_set_client=utf8");   
    $VMPDB->query("set character_set_results=utf8"); 
    
    $sPassword = md5($sPassword);

    $oResult = $VMPDB->query("SELECT user.Name,user.User_Name,user_type.Type_ID,user.College,user.Password FROM user,user_type WHERE user.Name='${sName}' AND user.Type=user_type.Name");
    if ($oResult && $oUser = $oResult->fetch_assoc())
    {
        if ($oUser['Password'] != $sPassword)
        {
            Header("Location: Login.php?msg=密码错误!!");
        }
        else
        {
            if (isset($_POST['Remember']) && $_POST['Remember'] == 'on')
            {
                echo "setCookie(\"CRS_User\", \"${sName}\", 14);" . PHP_EOL;
                echo "setCookie(\"CRS_User_Type\", \"" . $oUser['Type_ID'] . "\", 14);" . PHP_EOL;
            }
            else
            {
                echo "setCookie(\"CRS_User\", \"${sName}\", 0);" . PHP_EOL;
                echo "setCookie(\"CRS_User_Type\", \"" . $oUser['Type_ID'] . "\", 0);" . PHP_EOL;
            }
            echo "window.location.href='../index.html'";
        }
    }
    else
    {
        Header("Location: Login.php?msg=用户名不存在!!");
    }
}

login();
?>
</script>