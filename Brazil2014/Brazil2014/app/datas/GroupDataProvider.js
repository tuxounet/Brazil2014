var GroupDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Group");
    
    var self = this;

    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Group", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/Group/" + id, cacheFirst, callback);
    };

    self.getAllGroups = function (successCB, errorCB) {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getAllGroups(successCB, errorCB);
    }



    self.getTeamGroup = function (id, successCB, errorCB) {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getTeamGroup(id, successCB, errorCB);
    }

    self.getGroupScores = function (id, successCB, errorCB) {

        //Obtention d'un objet query sur l'abstraction
        var query = Brazil.storage.getQuery();
        if (query == null)
            throw "Le composant de requete n'est pas disponible pour cette plateforme";

        //invocation de la demande
        query.getGroupScores(id, successCB, errorCB);
    }

}