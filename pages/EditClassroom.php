<?php include_once "Common.php"; ?>
<?php
function EditClassroom()
{   
    $sClassroom = $_POST["Classroom"];
    $sDate = $_POST["Date"];
    $sLesson = $_POST["Lesson"];
    $sApplyName = $_POST["ApplyName"];
    $sCollege = $_POST["College"];
    $sSubject = $_POST["Subject"];
    $sName = $_POST["Name"];
    
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $oResult = $VMPDB->query("UPDATE classroom_data SET College='{$sCollege}', Subject='{$sSubject}', User_Name='{$sName}', Apply_Name='{$sApplyName}' WHERE Classroom='{$sClassroom}' AND Date='{$sDate}' AND Lesson='{$sLesson}'");
    $nUpdateRows = mysqli_affected_rows($VMPDB);
    
    $sUserType = $_COOKIE['CRS_User_Type'];
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