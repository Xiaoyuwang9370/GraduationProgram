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
    
    $oUsers = $VMPDB->query("SELECT * From User");
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
        if (isset($_POST[$sTypeId]) && $_POST[$sTypeId] != $oUser['Type'])
        {
            $nUserType = $_POST[$sTypeId];
            $VMPDB->query("UPDATE User SET Type={$nUserType} WHERE Name='{$sName}'");
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