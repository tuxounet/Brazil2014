var LocalStorageClass = function () {


    var self = this;


    /* Provider d'accès aux données compatible*/
    self.currentProvider = null;


    //#region Méthodes publiques 


    /* Initialisation du référentiel local si il n'existe pas déjà */
    self.createIfNotExists = function (callback) {
        logger.log("Initialisation des données locales");
        self.currentProvider = getAvailableProvider();
        logger.log("Provider séléctionné : " + self.currentProvider.name);
        self.currentProvider.createIfNotExists(callback);
    }





    /*Aliemnte le contenu de la base de données a partir des données du serveur*/
    self.fillFromServer = function (isInitial, callback) {

        //Récupération du provider courant
        if (self.currentProvider == null)
            self.currentProvider = new getAvailableProvider();
        logger.log("Provider séléctionné : " + self.currentProvider.name);

        logger.log("Récuperation des données depuis le serveur")


        $.ajax({
            cache: false,
            timeout: 2000,
            url: boot.config.remoteUrl + "/API/Repository"
        })
        .done(function (datas) {
            logger.info("Récuperation de l'état de la base de données effectuée");
            self.currentProvider.fillFromServer(datas, callback);
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
                    self.currentProvider.fillFromServer(datas, callback);
                }).fail(function (e) {
                    logger.error("Echec de récuparation des données de l'etat inital local");
                    throw e;
                });
            }
        });




    }


    //#endregion 


    //#region Méthodes privées

    function getAvailableProvider() {
        if (Modernizr.websqldatabase == true) {
            //Mode WebSQL 
            return new WebSQLProviderClass();
        }
        if (Modernizr.indexeddb == true) {
            //Mode IndexDB
            return new IndexedDBProviderClass();
        }

        throw "Impossible de trouver un support de stockage compatible sur ce terminal";
    }
    //#endregion



}