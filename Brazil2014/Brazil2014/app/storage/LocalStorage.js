var LocalStorageClass = function () {


    var self = this;


    /* Provider d'accès aux données compatible*/
    self.currentDataProvider = null;

    //#region Méthodes publiques 


    /* Initialisation du référentiel local si il n'existe pas déjà */
    self.createIfNotExists = function (callback) {
        logger.log("Initialisation des données locales");
        self.currentDataProvider = getAvailableDataProvider();
        logger.log("Provider séléctionné : " + self.currentDataProvider.name);
        self.currentDataProvider.createIfNotExists(callback);
    }

    /*Aliemnte le contenu de la base de données a partir des données du serveur*/
    self.fillFromServer = function (isInitial, callback) {
        Brazil.app.F7.showIndicator();
        function completed() {
            Brazil.app.F7.hideIndicator()
            if (callback) callback(); 
        }

        
        //Récupération du provider courant
        if (self.currentDataProvider == null)
            self.currentDataProvider = new getAvailableDataProvider();
        logger.log("Provider séléctionné : " + self.currentDataProvider.name);

        logger.log("Récuperation des données depuis le serveur")


        $.ajax({
            cache: false,
            timeout: 10000,
            url: boot.config.remoteUrl + "/API/Repository"
        })
        .done(function (datas) {
            logger.info("Récuperation de l'état de la base de données effectuée");
            self.currentDataProvider.fillFromServer(datas, completed);
        })
        .fail(function (e) {
            logger.error("Erreur lors de la récuperation de l'état de la base de données depuis le serveur");
            console.dir(e);
            if (isInitial) {
                logger.log("Tentative de chargement des données depuis l'état initial");

                $.ajax({
                    cache: false,
                    url: "../../contents/datas/repository.json",
                }).done(function (datas) {
                    //Les données locales ont été trouvées, on les charges 
                    logger.log("Chargement des données de l'etat initial local");
                    self.currentDataProvider.fillFromServer(datas, completed);
                }).fail(function (e) {
                    logger.error("Echec de récuparation des données de l'etat inital local");
                    throw e;
                });
            }
        });
    }



    /* Obtient le gestion de requete de données sur le provider de données compatible */
    self.getQuery = function () {
        
        var provider = getAvailableQueryProvider();

       
        return provider;
    }

    //#endregion 


    //#region Méthodes privées

    function getAvailableDataProvider() {
        if (window.openDatabase) {
            //Mode WebSQL 
            return new WebSQLProviderClass();
        }
        if (window.indexedDB) {
            //Mode IndexDB
            return new IndexedDBProviderClass();
        }

        throw "Impossible de trouver un support de stockage compatible sur ce terminal";
    }





    function getAvailableQueryProvider() {        
        //Obtention du provider de données
        
        if (self.currentDataProvider == null)
            self.currentDataProvider = getAvailableDataProvider();

        return self.currentDataProvider.getQueryProvider();


    }
    //#endregion



}