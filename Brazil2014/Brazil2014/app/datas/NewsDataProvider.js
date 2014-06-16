var NewsDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "News");


    var self = this;


    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/News", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/News/" + id, cacheFirst, callback);

    };

    self.getNews = function (successCB, errorCB) {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getNews(successCB, errorCB);
    }

}