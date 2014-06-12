var StadiumDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Stadium");


    var self = this;


    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Stadium", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/Stadium", cacheFirst, callback);

    };


    


    self.getStade = function (id, successCB, errorCB) {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getStadium(id, successCB, errorCB); 

    };


}