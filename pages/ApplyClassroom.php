<?php include_once "Common.php"; ?>
<?php
function ApplyClassroom()
{   
    $sClassroom = $_POST["Classroom"];
    $sDate = $_POST["Date"];
    $sLesson = $_POST["Lesson"];
    $sApplyName = $_POST["ApplyName"];
    $sCollege = $_POST["College"];
    $sSubject = $_POST["Subject"];
    $sName = $_POST["Name"];
    
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $bInsertDone = $VMPDB->query("INSERT INTO Classroom_Data (Classroom,Date,Lesson) VALUES ('{$sClassroom}','{$sDate}','{$sLesson}')");
    $sUpdateID = $VMPDB->query("UPDATE classroom_id SET Status_ID=1 WHERE Classroom='{$sClassroom}'");
    $oResult = $VMPDB->query("UPDATE classroom_data SET College='{$sCollege}', Subject='{$sSubject}', User_Name='{$sName}', Apply_Name='{$sApplyName}', Status_ID=1 WHERE Classroom='{$sClassroom}' AND Date='{$sDate}' AND Lesson='{$sLesson}'");
    $nUpdateRows = mysqli_affected_rows($VMPDB);
    
    if ($nUpdateRows == 1)
    {
        echo "<script>alert('预约教室成功！');</script>";
        echo "<script>location.href = '../index.html';</script>";
    }
    else
    {
        echo "<script>alert(\"教室已经被预约！\")</script>";
        echo "<script>location.href = '../index.html';</script>";
    }

    $VMPDB->close();
}
if (true)
{
    ApplyClassroom();
}

?>