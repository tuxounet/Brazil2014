var MatchDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Match");


    var self = this;


    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Match", cacheFirst, callback);
    }

    self.fetchItem = function (kind, cacheFirst, callback) {
        self.getDatas("/api/Match/?kind=" + encodeURI(kind), cacheFirst, callback);
    };


    self.getMatchDates = function (successCB, errorCB) {


        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getMatchDates(successCB, errorCB);

    }

    self.getMatchAtDate = function (date, successCB, errorCB) {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getMatchAtDate(date, successCB, errorCB);

    }

     
    self.getCalendarMatches = function (successCB, errorCB) {


        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getCalendarMatches(successCB, errorCB);

    }

}