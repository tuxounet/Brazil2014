﻿var WebSQLProviderInitClass = function () {

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


            //Creation de la structure
            tx.executeSql("CREATE TABLE IF NOT EXISTS Team(ID INTEGER unique, Libelle TEXT, [Group] TEXT, IdFIFA TEXT);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS Stade(ID INTEGER unique, Libelle TEXT, City TEXT, Capacity INTEGER);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS Match(ID INTEGER unique, Libelle TEXT, City TEXT, Capacity INTEGER);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS Video(ID INTEGER unique, Date DATETIME, Title TEXT, VideoLink TEXT, IdFIFA TEXT);")
            tx.executeSql("CREATE TABLE IF NOT EXISTS News(ID INTEGER unique, Date DATETIME, Title TEXT, Content TEXT, IdFIFA TEXT);")


        }, errorCB, successCB);
    }



}