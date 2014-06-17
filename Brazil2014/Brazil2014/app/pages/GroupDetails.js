var groupDetails_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;

    self.isLoading = ko.observable(true);

    self.group = ko.observable();

    self.groupName = ko.observable();
    self.title = ko.computed(function () {

        return "Groupe " + self.groupName();

    });

    self.matchTemplate = null;
    self.load = function (datas) {

        self.groupName(datas.group);
        $(".page-on-center .title").text(self.title());




        if (datas.id != null) {
            //Récuperation des scores
            new GroupDataProvider().getGroupScoresById(datas.id,
               function (scores) {
                   //Generation du slider par date
                   var scoretmpl = tmpl("group_score_tmpl");
                   var result = "";
                   for (var i = 0; i < scores.length; i++) {
                       var item = scores[i];
                       result += scoretmpl(item);
                   }
                   //Ajout du résultat au dom 
                   $(".group-score-details", self.DOM).html(result);

                   self.loadCompleted();
               },
               function (tx, err) {
                   self.loadCompleted();
                   if (err != null) {
                       logger.error(err);
                       //Erreur de récuperation de stade
                       Brazil.onerror("Impossible de charger la liste des scores");
                   }
               });

            //Récuperation des matchs
            new MatchDataProvider().getMatchForGroupId(datas.id,
               function (matchs) {
                   //Generation du slider par date
                   var matchtmpl = tmpl("MatchTemplate");
                   var result = "";
                   for (var i = 0; i < matchs.length; i++) {
                       var item = matchs[i];
                       result += matchtmpl(item);
                   }
                   //Ajout du résultat au dom 
                   $(".matchs", self.DOM).html(result);

                   self.loadCompleted();
               },
               function (tx, err) {
                   self.loadCompleted();
                   if (err != null) {
                       logger.error(err);
                       //Erreur de récuperation de stade
                       Brazil.onerror("Impossible de charger la liste des scores");
                   }
               });

        }

        if (datas.group != null) {

            //Récuperation des scores
            new GroupDataProvider().getGroupScores(datas.group,
               function (scores) {
                   //Generation du slider par date
                   var scoretmpl = tmpl("group_score_tmpl");
                   var result = "";
                   for (var i = 0; i < scores.length; i++) {
                       var item = scores[i];
                       result += scoretmpl(item);
                   }
                   //Ajout du résultat au dom 
                   $(".group-score-details", self.DOM).html(result);

                   self.loadCompleted();
               },
               function (tx, err) {
                   self.loadCompleted();
                   if (err != null) {
                       logger.error(err);
                       //Erreur de récuperation de stade
                       Brazil.onerror("Impossible de charger la liste des scores");
                   }
               });

            //Récuperation des matchs
            new MatchDataProvider().getMatchForGroupName(datas.group,
               function (matchs) {
                   //Generation du slider par date
                   var matchtmpl = tmpl("MatchTemplate");
                   var result = "";
                   for (var i = 0; i < matchs.length; i++) {
                       var item = matchs[i];
                       result += matchtmpl(item);
                   }
                   //Ajout du résultat au dom 
                   $(".matchs", self.DOM).html(result);

                   self.loadCompleted();
               },
               function (tx, err) {
                   self.loadCompleted();
                   if (err != null) {
                       logger.error(err);
                       //Erreur de récuperation de stade
                       Brazil.onerror("Impossible de charger la liste des scores");
                   }
               });

        }



    };


    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        Brazil.storage.fillEntityFromServer("Matchs", function () {
            Brazil.storage.fillEntityFromServer("GroupResults", function () { self.reload() });
        });

    }


};

