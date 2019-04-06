<?php include_once "Common.php"; ?>
<?php
function getUserName($VMPDB_Name)
{
	$oResult = $VMPDB_Name->query("SELECT user.User_ID,user.Name,user.User_Name,user_type.Type_ID,user.College FROM user,user_type WHERE user.Type=user_type.Name");

    $sUserName = array();
    while ($oRow = $oResult->fetch_assoc())
    {
        $sUserName[] = $oRow;
    }
    return $sUserName;
}

function getUserInfo()
{
	// 创建连接
    $VMPDB_Name = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    $sUserName = getUserName($VMPDB_Name);
    // Check connection
    if ($VMPDB_Name->connect_error) {
        die("连接失败: " . $VMPDB_Name->connect_error);
    } 
    $VMPDB_Name->close();
    return $sUserName;
}

function getUserTypeList($VMPDB)
{
    $oResult = $VMPDB->query("SELECT * FROM User_Type");
    $sUserTypeList = array();
    while ($oRow = $oResult->fetch_assoc())
    {
        $sUserTypeList[] = $oRow;
    }
    return $sUserTypeList;
}

function getUserTypeInfo()
{
	// 创建连接
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    $sUserTypeList = getUserTypeList($VMPDB);
    // Check connection
    if ($VMPDB->connect_error) {
        die("连接失败: " . $VMPDB->connect_error);
    } 
    $VMPDB->close();
    return $sUserTypeList;
}

$sResult = array();
$sResult["Users"] = getUserInfo();
$sResult["Types"] = getUserTypeInfo();
echo json_encode($sResult);
?>