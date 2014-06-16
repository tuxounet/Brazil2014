/// <reference path="WebSQLProvider.init.js" />
var WebSQLProviderClass = function () {

    var self = this;

    /*Nom du provider*/
    self.name = "WebSQL";

    /* Fournisseur de requete métiers */
    self.queryProvider = null;

    /* Instance de la base de données WebSQL */
    self.db = null; 

    //#region Variables privées
    var dbName = "Brazil2014Datas";
    var dbCurrentVersion = "1.0.11";
    var dbErrorVersion = "0.0";
    var dbDescrption = "Datas of Brazil2014";
    var dbSize = 2000000;

    //#endregion

    /*Initialise le référentiel de données*/
    self.createIfNotExists = function (callback) {

        //Instancation de l'initer 
        var initer = new WebSQLProviderInitClass();


        //obtention de la base de données
        self.db = openDatabase(dbName, '', dbDescrption, dbSize);

        if (!self.db) {
            throw "Impossible d'ouvrir la base de données";
        }
        logger.info("Version actuelle de la base " + self.db.version);

        if (self.db.version === '') {
            logger.info("Initilalisation de la base de données");
            //Pas de version positionnée, la base de données n'est pas initialisée            
            self.db.changeVersion(self.db.version, dbCurrentVersion,
                function (tx) {
                    initer.performInit(self.db, function () {
                        logger.info("Initialisation réussie");
                        if (callback) callback("CREATED");
                    },
                    function () {
                        logger.error("Initialisation échouée");
                        debugger;
                    })
                }, self.providerError);
        }
        else {
            if (self.db.version != dbCurrentVersion) {
                logger.warn("Migration de base de donnée disponible!")
                try {
                    //Une migration est dispobibe
                    self.db.changeVersion(self.db.version, dbCurrentVersion,
                           function (tx) {
                               initer.performInit(self.db, function () {
                                   logger.info("Migration réussie");
                                   if (callback) callback("MIGRATED");
                               },
                               function (e) {
                                   logger.error("Migration échoué");
                                   self.db.changeVersion(dbCurrentVersion, dbErrorVersion, function (tx) {
                                       logger.warn("Rollback de la version de la base");
                                   }, self.providerError, function () {
                                       logger.info("Rollabck de la version de la base terminée");
                                   });
                               })
                           }, self.providerError);

                } catch (e) {
                    logger.error("Echec de la migration");
                    self.providerError(e);
                }
            }
            else {
                logger.info("Base de données à jour");
                if (callback) callback("OK");
            }
        }
    }


    /* Alimente la base de donnée WebSQL a partir des données du serveur*/
    self.fillFromServer = function (serverDatas, callback) {

        //Récuperation de la base de données
        self.db = openDatabase(dbName, '', dbDescrption, dbSize);

        if (!self.db) {
            throw "Impossible d'ouvrir la base de données";
        }


        //Instanciation du remplisseur
        var filler = new WebSQLProviderFillClass();
        filler.fillFromServer(self.db, serverDatas,
            function () {
                logger.info("Remplissage effectué avec succès");
                if (callback) callback();
            }, function (e) {
                
                logger.warn("Erreur lors du remplissage de la base de données");
                console.dir(e);
            });
    }

    /* Obtient l'instance du gestionnaire de requete métier */
    self.getQueryProvider = function () {
        
        if (self.queryProvider == null)
            self.queryProvider = new WebSQLProviderQueryClass(self);
       
        return self.queryProvider;

    }



    self.providerError = function (e) {
        console.dir(e);
        throw e;
    }


}