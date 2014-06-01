var results_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;



    self.groups = ko.observableArray();
    self.eighth = ko.observableArray();
    self.quarter = ko.observableArray();
    self.semi = ko.observableArray();
    self.final = ko.observableArray();
    self.slider = null;

    self.load = function (uriParameters) {
        self.slider = Brazil.app.F7.slider('.slider-container', {
            pagination: '.slider-pagination'
        });
        self.refresh(self.loadCompleted);
    };

    self.slideToGroups = function () {
        self.slider.slideTo(0, 500);
    };


    self.slideToEighth = function () {
        self.slider.slideTo(1, 500);
    };

    self.slideToQuarter = function () {
        self.slider.slideTo(2, 500);
    };

    self.slideToSemi = function () {
        self.slider.slideTo(3, 500);

    };
    self.slideToFinal = function () {
        self.slider.slideTo(4, 500);

    };
    self.unload = function () {


    };


    self.refresh = function (callback) {

        new MatchDataProvider().fetchItem("Groupe", false, function (result) {
            self.groups(result);
        });
        new MatchDataProvider().fetchItem("Huitièmes de finale", false, function (result) {
            self.eighth(result);
        });
        new MatchDataProvider().fetchItem("Quarts de finale", false, function (result) {
            self.quarter(result);
        }); new MatchDataProvider().fetchItem("Demi-finales", false, function (result) {
            self.semi(result);
        });
        new MatchDataProvider().fetchItem("Match pour la troisième place", false, function (result) {
            var list = [];

            list.push(result[0]);

            new MatchDataProvider().fetchItem("Finale", false, function (result) {
                list.push(result[0]);
                self.final(list);
            });
        });
        if (typeof (callback) == "function") callback();
    }


};

