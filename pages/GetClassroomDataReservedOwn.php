<?php include_once "Common.php"; ?>
<?php
function getClassroomDataReservedOwn($sUserName)
{   
    // 创建连接
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $oResult = $VMPDB->query("SELECT * FROM classroom_data WHERE Delete_Flag = 0 AND Status_ID=1 AND Apply_Name = '{$sUserName}' ORDER BY Date ASC");

    $oClassroomData = array();
   
    while ($oResult && $oRow = $oResult->fetch_assoc())
    {
        array_push($oClassroomData,$oRow);
    }

    $VMPDB->close();
    echo json_encode($oClassroomData);
}

if (isset($_POST["UserName"]))
{
    getClassroomDataReservedOwn($_POST["UserName"]);
}

?>