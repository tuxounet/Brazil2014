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
            //    ret.push('INSERT INTO Stade(ID, Libelle, City, Capacity) VALUES ("' + item.ID + '", "' + item.Libelle + '", "' + item.City + '", "' + item.Capacity + '");');
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



    //#endregion


}
