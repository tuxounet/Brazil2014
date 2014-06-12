var stadium_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;
    self.stadiumId = ko.observable();
    self.stadiumName = ko.observable();
    self.stadium = ko.observable();


    self.stadiumImageUrl = ko.computed(function () {

        if (self.stadiumId() != null) {
            return "../../contents/datas/stadiums/" + self.stadiumId() + ".jpg";
        }
        else
            return null;
    });



    self.load = function (datas) {

        var stadeId = datas.id;

        new StadiumDataProvider().getStade(stadeId,
            function (stade) {
                //Récupération du stade OK
                self.stadiumId(stadeId);

                self.stadium(stade);
                self.stadiumName(stade.Libelle);

                self.loadCompleted();

            },
            function (err) {
                if (err != null) logger.error(err);
                //Erreur de récuperation de stade
                Brazil.onerror("Impossible de trouver le stade demandé");
                Brazil.app.mainView.goBack(); 
            });
    };

    self.unload = function () {
        logger.log("UNLOAD");
    };

    self.refresh = function () {
        logger.log("REFRESH QUERY");
    }


};

