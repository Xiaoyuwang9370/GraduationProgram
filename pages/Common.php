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
    
    function getTableRow($oDB, $sTableName, $sKeyName, $sKeyValue, $sDstField = "*")
    {
        $sSql = "SELECT * FROM {$sTableName} WHERE {$sKeyName}='{$sKeyValue}'";
        $oRows = $oDB->query($sSql);
        if ($oRows)
        {
            return $oRows->fetch_assoc();
        }
        else
        {
            return null;
        }
    }
    
    function getFieldValue($oDB, $sTableName, $sFieldName, $sKeyName, $sKeyValue)
    {
        $oRow = getTableRow($oDB, $sTableName, $sKeyName, $sKeyValue, $sFieldName);
        if ($oRow )
        {
            return $oRow[$sFieldName];
        }
        else
        {
            return null;
        }
    }
    
    function getValueInRow($oRow, $sFieldName)
    {
        if ($oRow && isset($oRow[$sFieldName]))
        {
            return $oRow[$sFieldName];
        }
        else
        {
            return null;
        }
    }
    
    function getVersionInfo($sKeyValue, $oDB, $sKeyName = 'Version_Id')
    {
        if ($sKeyValue == null)
        {
            return null;
        }
        
        $oRow = getTableRow($oDB, "Version", $sKeyName, $sKeyValue);
        
        $sVersionId = getValueInRow($oRow, 'Version_Id');
        $sName = getValueInRow($oRow, 'ChineseName');
        $sBFtp = getValueInRow($oRow, 'Install_Path');
        $sXFtp = getValueInRow($oRow, 'Install_Path_Xian');
        $sSvnUrl = getValueInRow($oRow, 'Svn_Url');
        $sVersionType = getValueInRow($oRow, 'Version_Type_Id');
        $sGBIMVersion = getValueInRow($oRow, 'GBIM_Version');
        $sGResourceVersion = getValueInRow($oRow, 'GResource_Version');
        $sPublicationScope = getValueInRow($oRow, 'Publication_Scope');
        
        $sAutoInfo = getValueInRow($oRow, 'Auto_Info');
        $sAutoInfoList = explode(';', $sAutoInfo);
        if (Count($sAutoInfoList) >= 3)
        {
            $sAutoInfo = $sAutoInfoList[0] . "<br>发现 " .$sAutoInfoList[1]. " 个bug<br>" . $sAutoInfoList[2];
        }
        
        $oRow = getTableRow($oDB, 'Build_Info', 'Version_Id', $sVersionId);
        
        $sBuildVersion = getValueInRow($oRow, 'Version');
        $sSvnRevision = getValueInRow($oRow, 'Svn_Revision');
        $sDate = getValueInRow($oRow, 'Date');
        
        $sBFtp = $sBFtp . $sDate . "/" . $sBuildVersion;
        $sXFtp = $sXFtp . $sDate . "/" . $sBuildVersion;
        
        $oRow = getTableRow($oDB, 'Pclint_Info', 'Version_Id', $sVersionId);
        $sWarnings = getValueInRow($oRow, 'Warnings');
        
        $oRow = getTableRow($oDB, 'Jira_Info', 'Version_Id', $sVersionId);
        $sBugs = getValueInRow($oRow, 'Bugs_Count');
        
        $oResult = array('Name' => $sName,
                         'BFtp' => $sBFtp,
                         'XFtp' => $sXFtp,
                         'SvnUrl' => $sSvnUrl,
                         'AutoInfo' => $sAutoInfo,
                         'BuildVersion' => $sBuildVersion,
                         'SvnRevision' => $sSvnRevision,
                         'Warnings' => $sWarnings,
                         'Bugs' => $sBugs,
                         'VersionTypeId' => $sVersionType,
                         'GBIMVersion' => $sGBIMVersion,
                         'GResourceVersion' => $sGResourceVersion,
                         'PublicationScope' => $sPublicationScope);
        
        return $oResult;
    }
    
    function getMaxValue($oDB, $sTableName, $sField)
    {
        $oRecords = $oDB->query("SELECT {$sField} FROM {$sTableName} ORDER BY {$sField} DESC");
        if ($oRow = $oRecords->fetch_assoc())
        {
            return $oRow[$sField];
        }
        else
        {
            return null;
        }
    }
    
    function curlGet($sUrl, $sUserAndPwd, $sPassword=null)
    {
        if ($sPassword != null)
        {
            $sUserAndPwd = $sUserAndPwd . ":" . $sPassword;
        }
        
        $oCurl = curl_init();
    
        curl_setopt_array(
            $oCurl,
            array(
                CURLOPT_URL => $sUrl,
                CURLOPT_USERPWD => $sUserAndPwd,
                CURLOPT_RETURNTRANSFER => true
            )
        );
        $sResult = curl_exec($oCurl);
        curl_close($oCurl);
        return $sResult;
    }
    
    function curlPost($sUrl, $sUser, $sPassword, $oData = array(), $oHeader = array())
    {
        $oCurl = curl_init();
        //设置抓取的url
        curl_setopt($oCurl, CURLOPT_URL, $sUrl);
        //设置头文件的信息
        curl_setopt($oCurl, CURLOPT_HTTPHEADER, $oHeader);
        //设置获取的信息以文件流的形式返回，而不是直接输出。
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
        //设置post方式提交
        curl_setopt($oCurl, CURLOPT_POST, 1);
        //设置post数据
        
        curl_setopt($oCurl, CURLOPT_POSTFIELDS, $oData);
        //执行命令
        $sRet = curl_exec($oCurl);
        $oPostResult = [];
        $oPostResult["Url"] = $sUrl;
        if ($sRet === false)
        {
            $oPostResult["Status"] = "Failed";
            $oPostResult["Msg"] = $oPcurl_error($oCurl);
        }
        else
        {
            $oPostResult["Status"] = "Success";
            $oPostResult["Msg"] = $sRet;
        }
        //关闭URL请求
        curl_close($oCurl);
        return $oPostResult;
    }
?>