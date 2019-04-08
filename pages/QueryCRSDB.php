<?php include_once "common.php"?>
<?php 
function queryCRSDB($sSqlScript)
{
    $VMPDB = connectDB("localhost", "root", "123", "crsdatabase", "utf8");
    
    $oRows = $VMPDB->query($sSqlScript);

    $sResult = array();
    while($oRows && $oRow = $oRows->fetch_assoc())
    {
        array_push($sResult, $oRow);
    }
    $VMPDB->close();
}

if (isset($_POST["SqlScript"]))
{
    queryCRSDB($_POST["SqlScript"]);
}
?>