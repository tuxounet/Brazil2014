var WebSQLProviderInitClass = function () {

    var self = this;


    /*Initialise concretement le référentiel de données*/
    self.performInit = function (db, successCB, errorCB ) {

        db.transaction(function (tx) {
            tx.executeSql("DROP TABLE IF EXISTS Table1;");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Table1(Id TEXT, Value TEXT);");

        }, errorCB, successCB);
    }



}