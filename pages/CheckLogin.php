<?php
    function checkPermission($sUserType, $nLimitType = 10, $sUrl = "", $sTips = '权限不足')
    {
        $nUserType = (int)$sUserType;
        if ($nUserType == 0)
        {
            $nUserType = 5;
        }
        if ($nUserType > $nLimitType)
        {
            echo "<script>alert(\"${sTips}\")</script>";
            echo "<script>window.location.href=\"${sUrl}\"</script>";
            return false;
        }
        else
        {
            return true;
        }
    }
?>