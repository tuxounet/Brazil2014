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