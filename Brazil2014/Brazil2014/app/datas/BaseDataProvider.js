var BaseDataProviderClass = function (entityName) {

    var self = this;
    self.entityName = entityName;


    self.getDatas = function (routeUrl, cacheFirst, callback) {
        if (cacheFirst == true) {
            try {
                self.getDataFromCache(function (result) {
                    if (result == null) {
                        self.getDatas(routeUrl, false, callback);
                        return;
                    }
                    else
                        if (callback) callback(result);
                });
            } catch (e) {
                self.getDatas(routeUrl, false, callback);
            }            
        }
        else {
            $.ajax(boot.config.remoteUrl + routeUrl).done(function (result) {
                //L'appel a réussi, on stocke en local le résultat de la projection 
                if (Modernizr.localstorage == false) {
                    logger.warn("Stockage local désactivé");
                }
                else {
                    logger.log("Strockage en cache des données de type " + self.entityName + " depuis le serveur");
                    var cachedItem = { kind: self.entityName, date: moment().format(), data: result };
                    localStorage.setItem("CACHE-" + self.entityName, JSON.stringify(cachedItem));
                }
                

                if (callback) callback(result);

            }).fail(function (e) {
                Brazil.onerror(e);

                //Recuperation depuis le cache
                self.getDataFromCache(callback);

            });
        }
    }

    self.getItem = function (id, routeUrl, cacheFirst, callback) {


        //Désactivation du cache
        if (Modernizr.localstorage == false)
        {
            logger.warn("Stockage local désactivé");
            cacheFirst = false;
        }

        if (cacheFirst == true) {
            self.getDataFromCache(function (result) {
                if (result == null) {
                    //rien n'a été trouvé en cache
                    self.getDatas(routeUrl, false, function (result) {
                        if (result != null) {
                            //De nouvelles données ont été chargée, on reemet l'applel
                            self.getItem(id, routeUrl, true, callback);
                        }
                        else {
                            logger.error("Impossible de récuperer les données de l'entitié " + self.entityName + " à l'Id " + id + " depuis le cache ou apres un appel au service=> abandon");
                            if (callback) callback(null);
                        }
                    });

                }
                else {
                    var cachedItem = null;
                    result.forEach(function (item, index) {
                        if (item.Id == id) {
                            cachedItem = item;
                        }
                    });

                    if (result != null) {
                        if (callback) callback(cachedItem);
                        return
                    }
                    else {
                        self.getDatas(routeUrl, false, callback);
                    }

                }



            });
        }
        else {
            $.ajax(boot.config.remoteUrl + routeUrl).done(function (result) {
                //L'appel a réussi, on stocke en local le résultat de la projection                                  
                if (callback) callback(result);
            }).fail(function (e) {
                Brazil.onerror(e);
                if (callback) callback(null);
            });
        }
    }




    self.getDataFromCache = function (callback) {
        if (Modernizr.localstorage == false)
        {
            logger.warn("Stockage local désactivé");
            if (callback) callback(null);
            return;
        }

        var key = "CACHE-" + self.entityName;
        var cachedDatas = localStorage.getItem(key);
        if (cachedDatas == null) {
            //Aucune données de ce type en cache
            logger.warn("Aucune données du type " + self.entityName + " en cache");
            if (callback) callback(null);
        }
        else {

            var datas = JSON.parse(cachedDatas);
            logger.log("Récupération des données du type " + self.entityName + " depuis le cache");
            if (callback) callback(datas.data);
        }
    }

    self.clearCache = function () {

        if (Modernizr.localstorage == false) {
            logger.warn("Stockage local désactivé");            
            return;
        }

        var key = "CACHE-" + self.entityName;
        localStorage.removeItem(key);
        logger.info("Données du cache " + self.entityName + " supprimées");
    };

}