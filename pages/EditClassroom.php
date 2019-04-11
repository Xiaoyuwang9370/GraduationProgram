<?php include_once "Common.php"; ?>
<?php
function EditClassroom()
{   
    $sClassroom = $_POST["Classroom"];
    $sDate = $_POST["Date"];
    if ($_POST["Lesson"] == "晚自习")
    {
        $sLesson = "LessonNight";
    }
    else
    {
        $sLesson = "Lesson" . $_POST["Lesson"];
    }
    $sApplyName = $_POST["ApplyName"];
    $sCollege = $_POST["College"];
    $sSubject = $_POST["Subject"];
    $sName = $_POST["Name"];
    
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $bInsertDone = $VMPDB->query("INSERT INTO Classroom_Data (Classroom,Date) VALUES ('{$sClassroom}','{$sDate}')");
    $sUpdateID = $VMPDB->query("UPDATE classroom_id SET Status_ID=1 WHERE Classroom='{$sClassroom}'");
    $oResult = $VMPDB->query("UPDATE classroom_data SET {$sLesson}=1, College='{$sCollege}', Subject='{$sSubject}', User_Name='{$sName}', Apply_Name='{$sApplyName}', Status_ID=1 WHERE Classroom='{$sClassroom}' AND Date='{$sDate}'");
    $nUpdateRows = mysqli_affected_rows($VMPDB);
    
    $sUserType = $_COOKIE['UserName'];
    if ($nUpdateRows == 1)
    {
        echo "<script>alert('修改预约成功！');</script>";
        if ($sUserType == 1)
        {
            echo "<script>location.href = 'ApplyManage.html';</script>";
        }
        else
        {
            echo "<script>location.href = 'ApplyInfo.html';</script>";
        }
        
    }
    else
    {
        echo "<script>alert(\"预约已经存在！\")</script>";
        if ($sUserType == 1)
        {
            echo "<script>location.href = 'ApplyManage.html';</script>";
        }
        else
        {
            echo "<script>location.href = 'ApplyInfo.html';</script>";
        }
    }

    $VMPDB->close();
}
if (true)
{
    EditClassroom();
}

?>