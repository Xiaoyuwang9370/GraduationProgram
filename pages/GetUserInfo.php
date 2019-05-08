<?php include_once "Common.php"; ?>
<?php
function getUserName($VMPDB_Name)
{
	$oResult = $VMPDB_Name->query("SELECT user.User_ID,user.Name,user.User_Name,user_type.Type_ID,user.Phone,user.College FROM user,user_type WHERE user.Type=user_type.Name");

    $oUserName = array();
    while ($oRow = $oResult->fetch_assoc())
    {
        $oUserName[] = $oRow;
    }
    return $oUserName;
}

function getUserInfo()
{
	// 创建连接
    $VMPDB_Name = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    $oUserInfo = getUserName($VMPDB_Name);
    // Check connection
    if ($VMPDB_Name->connect_error) {
        die("连接失败: " . $VMPDB_Name->connect_error);
    } 
    $VMPDB_Name->close();
    return $oUserInfo;
}

function getUserTypeList($VMPDB)
{
    $oResult = $VMPDB->query("SELECT * FROM User_Type");
    $oUserTypeList = array();
    while ($oRow = $oResult->fetch_assoc())
    {
        $oUserTypeList[] = $oRow;
    }
    return $oUserTypeList;
}

function getUserTypeInfo()
{
	// 创建连接
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    $oUserTypeInfo = getUserTypeList($VMPDB);
    // Check connection
    if ($VMPDB->connect_error) {
        die("连接失败: " . $VMPDB->connect_error);
    } 
    $VMPDB->close();
    return $oUserTypeInfo;
}

$sResult = array();
$sResult["Users"] = getUserInfo();
$sResult["Types"] = getUserTypeInfo();
echo json_encode($sResult);
?>