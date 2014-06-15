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


        self.slider = $$('.slider-container', self.DOM)[0].f7Slider;

        self.loadForGroup("Groupe", ".groups");
        self.loadForGroup("Huitièmes de finale", ".eighth");
        self.loadForGroup("Quarts de finale", ".quarter");
        self.loadForGroup("Demi-finales", ".semi");
        self.addInGroup("Match pour la troisième place", ".final", function () {
            self.addInGroup("Demi-finales", ".final");
        });


        self.loadCompleted();
    };



    self.loadForGroup = function (groupName, targetArray, callback) {
       
        new MatchDataProvider().getMatchForType(groupName,
            function (matchs) {

              
                //Generation du slider par date
                var matchtmpl = tmpl("MatchTemplate");
                var result = "";
                for (var i = 0; i < matchs.length; i++) {
                    var item = matchs[i];
                    result += matchtmpl(item);
                }
                //Ajout du résultat au dom 
                $(targetArray, self.DOM).html(result);

                if (callback) callback();
            },
            function (tx, err) {

                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de charger la liste des matchs du groupe" + groupName);
                }
            });
    };


    self.addInGroup = function (groupName, targetArray, callback) {

        new MatchDataProvider().getMatchForType(groupName,
            function (matchs) {

                //Generation du slider par date
                var matchtmpl = tmpl("MatchTemplate");
                var result = $(targetArray, self.DOM).html();
                for (var i = 0; i < matchs.length; i++) {
                    var item = matchs[i];
                    result += matchtmpl(item);
                }
                //Ajout du résultat au dom 
                $(targetArray, self.DOM).html(result);

                if (callback) callback();
            },
            function (tx, err) {

                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de charger la liste des matchs du groupe" + groupName);
                }
            });
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
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        logger.info("REFRESH QUERY")
    }


};

