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
        new StadiumDataProvider().fetchItem(datas.id, true, function (result) {
            if (result == null)
            {
                Brazil.onerror("Impossible de trouver le stade demandé");
                Brazil.router.goBack();
                return;
            }
            self.stadiumId(datas.id);
            self.stadium(result);
            self.stadiumName(result.Name);
            self.loadCompleted();

        });


    };

    self.unload = function () {

    };

   
};

