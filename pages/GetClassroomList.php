<?php include_once "Common.php"; ?>
<?php
function getClassroomData()
{   
    // 创建连接
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $oResult = $VMPDB->query("SELECT * FROM Classroom_ID WHERE Delete_Flag=0");
    
    $oClassroomData = array();
   
    while ($oResult && $oRow = $oResult->fetch_assoc())
    {
        array_push($oClassroomData,$oRow);
    }

    $VMPDB->close();
    echo json_encode($oClassroomData);
}

getClassroomData();
?>