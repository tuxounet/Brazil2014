var VideoDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Video");

    var self = this;

    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Video", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/Video/" + id, cacheFirst, callback);
    };


    self.getVideos = function (successCB, errorCB)
    {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getAllVideos(successCB, errorCB);
    }



    self.getVideo = function (successCB, errorCB)
    {
        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getVideo(successCB, errorCB);
    }

}