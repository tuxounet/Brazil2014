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

                //Retour du premier résultat 
                debugger; 
                //successCB(results.rows.item(0));
            }, failedCB);
        }, failedCB);

    }
}



