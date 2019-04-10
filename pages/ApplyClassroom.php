<?php include_once "Common.php"; ?>
<?php
function ApplyClassroom()
{   
    $sClassroom = $_POST["Classroom"];
    $sDate = $_POST["Date"];
    $sLesson = "Lesson" + $_POST["Lesson"];
    $sCollege = $_POST["College"];
    $sSubject = $_POST["Subject"];
    $sName = $_POST["Name"];
    echo $sClassroom;
    echo $sDate;
    echo $_POST["Lesson"];
    
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $sInsertToData = $VMPDB->query("INSERT INTO Classroom_Data (Classroom_ID) SELECT Classroom_ID FROM Classroom_ID WHERE Classroom='{$sClassroom}'");

    $oResult = $VMPDB->query("UPDATE classroom_data,classroom_id SET classroom_id.Status_ID=1, classroom_data.Status_ID=1, classroom_data.Classroom_ID=classroom_id.Classroom_ID, classroom_data.Date='{$sDate}', classroom_data.'{$sLesson}'=1, classroom_data.College='{$sCollege}', classroom_data.Subject='{$sSubject}', classroom_data.User_Name='{$sName}' WHERE classroom_data.Classroom_ID=classroom_id.Classroom_ID AND classroom_id.Classroom='{$sClassroom}'");
    
    $nUpdateRows = mysqli_affected_rows($VMPDB);
    echo $nUpdateRows;
    if ($nUpdateRows == 2 || $nUpdateRows == 1)
    {
        echo "<script>alert('预约教室成功！');</script>";
        // echo "<script>location.href = '../index.html';</script>";
    }

    else
    {
        echo "<script>alert(\"教室已经被预约！\")</script>";
        // echo "<script>location.href = '../index.html';</script>";
    }

    $VMPDB->close();
}
if (true)
{
    ApplyClassroom();
}

?>