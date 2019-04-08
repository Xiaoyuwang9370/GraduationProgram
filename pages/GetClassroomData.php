<?php include_once "Common.php"; ?>
<?php
function getClassroomList()
{   
    // 创建连接
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    // $oResult = $VMPDB->query("SELECT classroom_id.Classroom, classroom_data.Date, classroom_data.Week, classroom_data.Lesson, classroom_data.College, classroom_data.Subject, classroom_data.User_Name, status_id.Status FROM classroom_data, classroom_id, status_id WHERE classroom_id.Classroom_ID=classroom_data.Classroom_ID AND status_id.Status_ID=classroom_data.Status_ID");
    $oResult = $VMPDB->query("SELECT Classroom FROM classroom_id WHERE Delete_Flag=0");
    
    $oClassroomList = array();
   
    while ($oResult && $oRow = $oResult->fetch_assoc())
    {
        $oClassroomList[] = $oRow;
    }

    $VMPDB->close();
    echo json_encode($oClassroomList);
}

getClassroomList();
?>