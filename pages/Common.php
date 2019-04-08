<?php
    function connectDB($sHost, $sUser, $sKey, $sDB, $sCharSet)
    {
        try
        {
            $oDB = new mysqli($sHost, $sUser, $sKey, $sDB);
        }
        catch (Exception $e)
        {
            die('连接数据库失败: ' . $oDB->connect_error);
            return null;
        }
        if ($oDB->connect_error) {
            die('连接数据库失败: ' . $oDB->connect_error);
            return null;
        } 
        $oDB->query("set names '{$sCharSet}' ");   
        $oDB->query("set character_set_client={$sCharSet}");   
        $oDB->query("set character_set_results={$sCharSet}"); 
        return $oDB;
    }
?>