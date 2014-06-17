var WebSQLProviderFillClass = function () {


    var self = this;


    /* Alimente la base de donnée WebSQL a partir des données du serveur*/
    self.fillFromServer = function (db, datas, successCB, errorCB) {

        logger.log("Creation du script de mise a jour de la base de données")

        //Creation du script  de mise a jour
        var updateInstructions = [];
        getValuesUpdateScriptForTeam(datas.Teams, updateInstructions);
        getValuesUpdateScriptForStade(datas.Stades, updateInstructions);
        getValuesUpdateScriptForMatch(datas.Matchs, updateInstructions);
        getValuesUpdateScriptForMatchType(datas.MatchTypes, updateInstructions);
        getValuesUpdateScriptForGroup(datas.Groups, updateInstructions);
        getValuesUpdateScriptForVideos(datas.Videos, updateInstructions);
        getValuesUpdateScriptForNews(datas.News, updateInstructions);
        getValuesUpdateScriptForGroupResults(datas.GroupResults, updateInstructions);

        db.transaction(function (tx) {
            logger.info("Execution des scripts de mise a jour");

            //Bouclage sur les instrcutions a aexecuter 
            for (var i = 0; i < updateInstructions.length; i++) {
                var instruction = updateInstructions[i];
                tx.executeSql(instruction);
            }

        }, errorCB, successCB);
    }


    //#region Méthodes privées 

    function getValuesUpdateScriptForTeam(valArray, ret) {
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return;
        ret.push("DELETE FROM Team;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO Team(ID, Libelle, [Group], IdFIFA) VALUES ("' + item.ID + '", "' + item.Libelle + '", "' + item.Group + '", "' + item.IdFIFA + '");');
        }

    };


    function getValuesUpdateScriptForStade(valArray, ret) {
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return ret;
        ret.push("DELETE FROM Stade;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO Stade(ID, Libelle, City, Capacity) VALUES ("' + item.ID + '", "' + item.Libelle + '", "' + item.City + '", "' + item.Capacity + '");');
        }

        //Retour de la valeur
        return ret;
    };



    function getValuesUpdateScriptForMatch(valArray, ret) {
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return ret;
        ret.push("DELETE FROM Match;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO Match(ID, Date, Hour, IdFIFA, IsExtraTime, MatchTime, MatchType, MatchTypeName, MatchGroup, Rank, Stade, StadeName, Team1, Team1Name, Team1IdFIFA, Team1Goal, Team1GoalsBy, Team1Penalty, Team2, Team2Name, Team2IdFIFA,Team2Goal, Team2GoalsBy, Team2Penalty,Broadcaster) VALUES ("' + item.ID + '", "' + item.Date + '", "' + item.Hour + '", "' + item.IdFIFA + '", "' + (item.IsExtraTime ? 1 : 0) + '", "' + item.MatchTime + '", "' + item.MatchTypeId + '", "' + item.MatchTypeName + '", "' + item.MatchGroup + '", "' + item.Rank + '", "' + item.StadeId + '", "' + item.StadeName + '", "' + item.Team1 + '", "' + item.Team1Name + '", "' + item.Team1IdFIFA + '", "' + item.Team1Goal + '", "' + item.Team1GoalsBy + '", "' + item.Team1Penalty + '", "' + item.Team2 + '", "' + item.Team2Name + '", "' + item.Team2IdFIFA + '", "' + item.Team2Goal + '", "' + item.Team2GoalsBy + '", "' + item.Team2Penalty + '", "' + item.Broadcaster + '");');
        }

        //Retour de la valeur
        return ret;
    };


    function getValuesUpdateScriptForMatchType(valArray, ret) {
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return ret;
        ret.push("DELETE FROM MatchType;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO MatchType(ID, Libelle) VALUES ("' + item.ID + '", "' + item.Libelle + '");');
        }

        //Retour de la valeur
        return ret;
    };



    function getValuesUpdateScriptForGroup(valArray, ret) {
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return;
        ret.push("DELETE FROM [Group];");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO [Group](ID, Libelle) VALUES ("' + item.ID + '", "' + item.Libelle + '");');
        }
    };


    function getValuesUpdateScriptForNews(valArray, ret) {
            
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return;
        ret.push("DELETE FROM News;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO News (ID, Date, Title, Content, IdFIFA, Summary, ThumbUrl) VALUES ("' + item.Id + '", "' + item.Date + '", "' + item.Title + '", "' + item.Content + '", "' + item.IdFIFA + '", "' + item.Summary + '", "' + item.ThumbUrl + '");');
        }
    };


    
    function getValuesUpdateScriptForVideos(valArray, ret) {           
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return;
        ret.push("DELETE FROM Video;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];
            ret.push('INSERT INTO Video (ID, Date, Title, VideoLink, IdFIFA, ThumbLink) VALUES ("' + item.Id + '", "' + item.Date + '", "' + item.Title + '", "' + item.VideoLink + '", "' + item.IdFIFA + '", "' + item.ThumbLink + '");');
        }

    };

    
    function getValuesUpdateScriptForGroupResults(valArray, ret) {
        //si pas de valeurs, alors, pas concernée 
        if (valArray == null) return;
        ret.push("DELETE FROM GroupResult;");
        for (var i = 0; i < valArray.length; i++) {
            var item = valArray[i];          
            ret.push('INSERT INTO GroupResult (ID, Libelle,[Group], GroupName, G, P , N , BC, BP, PTS) VALUES ("' + item.Id + '", "' + item.Libelle + '", "' + item.Group + '", "' + item.GroupName + '", "' + item.G + '", "' + item.P + '", "' + item.N + '", "' + item.BC + '", "' + item.BP + '", "' + item.PTS + '");');
        }

    };

    //#endregion


}
