<?php
    if (!isset($_POST['SubmitManageUser']) || $_POST['SubmitManageUser'] != '提交')
    {
        header('Location: ../index.html');
        die();
    }
?>
<?php include_once "Common.php" ?>
<?php include_once "CheckLogin.php"; ?>
<?php
function manageUser()
{
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $oUsers = $VMPDB->query("SELECT user.User_ID,user.Name,user.User_Name,user_type.Type_ID,user.College FROM user,user_type WHERE user.Type=user_type.Name");
    while ($oUser = $oUsers->fetch_assoc())
    {
        $sName = $oUser['Name'];
        $sDeleteId = "Delete_" . $sName;
        if (isset($_POST[$sDeleteId]) && $_POST[$sDeleteId] == 'on')
        {
            $VMPDB->query("DELETE FROM User WHERE Name='{$sName}'");
            continue;
        }

        $sTypeId = "Type_" . $sName;
        if (isset($_POST[$sTypeId]) && $_POST[$sTypeId] != $oUser['Type_ID'])
        {
            $nUserType = $_POST[$sTypeId];
            $VMPDB->query("UPDATE User,user_type SET user.Type=user_type.Name WHERE user.Name='{$sName}' AND user_type.Type_ID='{$nUserType}'");
        }
    }
    echo "<script>window.alert('修改完成');</script>";
    echo "<script>window.location.href = 'EditUser.html';</script>";
}

if (isset($_COOKIE["CRS_User_Type"]) && checkPermission($_COOKIE["CRS_User_Type"], 1, '../index.html'))
{
    manageUser();
}
?>