<?php
function submitClassroom($sClassroom)
{   
    $VMPDB = new mysqli("localhost", "root", "123", "CRSdatabase");
    if ($VMPDB->connect_error) {
        die("连接失败: " . $VMPDB->connect_error);
    } 
    $VMPDB->query("set names 'utf8' ");   
    $VMPDB->query("set character_set_client=utf8");   
    $VMPDB->query("set character_set_results=utf8"); 

    $sSql = "INSERT INTO Classroom_ID (Classroom) VALUES ('{$sClassroom}')";
    $sSqlData = "INSERT INTO Classroom_Data (Classroom_ID) SELECT Classroom_ID FROM Classroom_ID WHERE Classroom='{$sClassroom}'";
    $sSqlUpdateFlag = "UPDATE classroom_id,classroom_data SET Classroom_ID.Delete_Flag=0,classroom_data.Delete_Flag=0 WHERE classroom_id.Classroom='{$sClassroom}' AND classroom_data.Classroom_ID=classroom_id.Classroom_ID";

    $bInsertDone = $VMPDB->query($sSql);
    $bInsertDataDone = $VMPDB->query($sSqlData);

    if ($bInsertDone)
    {
        echo "<script>alert(\"导入成功\")</script>";
        echo "<script>window.location.href = \"ClassroomManage.html\" </script>";
    }
    else
    {
        $bUpdateFlag = $VMPDB->query($sSqlUpdateFlag);
        $nUpdateRows = mysqli_affected_rows($VMPDB);
        if ($nUpdateRows == 2)
        {
            echo "<script>alert(\"导入成功\")</script>";
            echo "<script>window.location.href = \"ClassroomManage.html\" </script>";
        }
        else
        {
            echo "<script>alert(\"导入失败,教室名已存在\")</script>";
            echo "<script>window.location.href = \"ClassroomManage.html\" </script>";
        }
        
    }
}

if (isset($_POST["Classroom"]))
{
    submitClassroom($_POST["Classroom"]);
}
?>