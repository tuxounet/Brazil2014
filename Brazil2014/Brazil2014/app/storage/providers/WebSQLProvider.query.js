var WebSQLProviderQueryClass = function (provider) {

    var self = this;

    self.name = "WebSQLQuery";
    self.provider = provider;

    function getDb() {
        var db = self.provider.db;
        if (db == null) throw "Impossible d'executer le composant de requete sur une base de données non initialisée";
        return db;
    }


    self.getStadium = function (id, successCB, failedCB) {

        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Stade WHERE Id = ? ", [id], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour du premier résultat 
                successCB(results.rows.item(0));
            }, failedCB);
        }, failedCB);


    }



    self.getAllVideos = function (successCB, failedCB)
    {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Video ORDER BY Date DESC ", [], function (tx, results) {
   
                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);
                
            }, failedCB);
        }, failedCB);

    }


    self.getVideo = function (id, successCB, failedCB) {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Video WHERE Id = ? ", [id], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour du premier résultat 
                successCB(results.rows.item(0));

            }, failedCB);
        }, failedCB);

    }

    self.getAllGroups = function (successCB, failedCB) {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM [Group] ORDER BY Libelle ASC", [], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }



    self.getTeamGroup = function (id, successCB, failedCB) {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Team WHERE [Group] = ?", [id], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }
    self.getGroupScores = function (id, successCB, failedCB) {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM GroupResult WHERE GroupName = ?", [id], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }



    self.getGroupScoresById = function (id, successCB, failedCB) {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM GroupResult WHERE [Group] = ?", [id], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }
    self.getMatchDates = function (successCB, failedCB)
    {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT DISTINCT Date FROM Match ORDER BY Date ASC", [], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }
    self.getMatchAtDate = function (date, successCB, failedCB)
    {
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Match WHERE Date = ? ORDER BY Date ASC ", [date], function (tx, results) {
   
                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);
                
            }, failedCB);
        }, failedCB);

    }
    self.getMatchForGroupName = function (group, successCB, failedCB) {
        
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Match WHERE MatchGroup = ? ORDER BY Date ASC ", [group], function (tx, results) {
                
                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }
      self.getMatchForGroupId = function (group, successCB, failedCB) {
        
        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Match, [Group] WHERE [Group].Libelle = Match.MatchGroup And  [Group].ID = ? ORDER BY Date ASC ", [group], function (tx, results) {
                
                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }

    self.getMatchForType = function (type, successCB, failedCB) {

        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Match  WHERE MatchTypeName  = ? ORDER BY Date ASC ", [type], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }

    self.getNews = function (successCB, failedCB) {

        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM News ORDER BY Date DESC ", [], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour des resultats 
                var ret = [];
                for (var i = 0; i < results.rows.length; i++) {
                    ret.push(results.rows.item(i));
                }
                successCB(ret);

            }, failedCB);
        }, failedCB);

    }

    self.getNewsById = function (id, successCB, failedCB) {

        //OBtention de la base de données 
        var db = getDb();
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM News WHERE id = ?  ", [id], function (tx, results) {

                //Si pas de résultat
                if (results.rows.length == 0) { failedCB(null); return; }

                //Retour du premier résultat 
                successCB(results.rows.item(0));

            }, failedCB);
        }, failedCB);

    }
}



