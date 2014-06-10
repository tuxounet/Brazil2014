var WebSQLProviderInitClass = function () {

    var self = this;


    /*Initialise concretement le référentiel de données*/
    self.performInit = function (db, successCB, errorCB) {

        db.transaction(function (tx) {
            logger.info("Création de la structure de la base WebSQL");

            //Suppression de la structure 
            tx.executeSql("DROP TABLE IF EXISTS Team;");
            tx.executeSql("DROP TABLE IF EXISTS Stade")
            tx.executeSql("DROP TABLE IF EXISTS Match");
            tx.executeSql("DROP TABLE IF EXISTS Video");
            tx.executeSql("DROP TABLE IF EXISTS News");
            tx.executeSql("DROP TABLE IF EXISTS MatchType");
            tx.executeSql("DROP TABLE IF EXISTS [Group]");


            //Creation de la structure
            tx.executeSql("CREATE TABLE IF NOT EXISTS Team(ID INTEGER unique, Libelle TEXT, [Group] TEXT, IdFIFA TEXT);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS Stade(ID INTEGER unique, Libelle TEXT, City TEXT, Capacity INTEGER);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS Match(ID INTEGER unique, Date DATETIME, Hour TIME, IdFIFA TEXT, IsExtraTime INT2, MatchTime TIME, MatchType INTEGER, Rank INTEGER, Stade INTEGER, Team1 INTEGER, Team1Goal INTEGER, Team1GoalsBy TEXT, Team1Penalty INTEGER, Team2 INTEGER, Team2Goal INTEGER, Team2GoalsBy TEXT, Team2Penalty INTEGER);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS Video(ID INTEGER unique, Date DATETIME, Title TEXT, VideoLink TEXT, IdFIFA TEXT);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS News(ID TEXT unique, Date DATETIME, Title TEXT, Content TEXT, IdFIFA TEXT);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS MatchType(ID INTEGER unique, Libelle TEXT);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS [Group](ID INTEGER unique, Libelle TEXT);")


        }, errorCB, successCB);
    }



}



