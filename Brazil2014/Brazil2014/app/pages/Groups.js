var groups_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;

    self.groups = ko.observableArray();
    self.isLoading = ko.observable(true);


    self.hasGroups = ko.observable(false);
    self.teamGroupTemplate = null;

    self.load = function (uriParameters) {

        new GroupDataProvider().getAllGroups(
            function (groups) {
                //Generation du slider par date
                var groupsTmpl = tmpl("groups_group_tmpl");
                var result = "";
                for (var i = 0; i < groups.length; i++) {
                    var item = groups[i];
                    result += groupsTmpl(item);
                }
                //Ajout du résultat au dom 
                $(".groups-list", self.DOM).html(result);

                //Remplissage des équipes
                for (var i = 0; i < groups.length; i++) {
                    var item = groups[i].Libelle;
                    self.fetchGroup(item);
                }


                self.hasGroups(true);
                self.loadCompleted();


            },
            function (tx, err) {
                self.hasGroups(false);
                self.loadCompleted();
                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de charger la liste des groupes");
                    Brazil.app.mainView.goBack();
                }
            });


    };


    self.fetchGroup = function (groupName) {
        //Compilation du template de match
        if (self.teamGroupTemplate == null) self.teamGroupTemplate = tmpl("team_group_tmpl");

        new GroupDataProvider().getTeamGroup(groupName,
          function (teams) {
              var ret = "";

              //Templating des équipes
              for (var i = 0; i < teams.length; i++) {
                  var item = teams[i];
                  ret += self.teamGroupTemplate(item);
              }

              //Ajout du markup au DOM 
              $(".groups-list li[data-id=" + groupName + "] .teams", self.DOM).html(ret);


          },
          function (err) {
              if (err != null) {
                  logger.error(err);
              }
          });


    }


    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {

        Brazil.storage.fillEntityFromServer("Teams", function () { self.reload() });

    }


};
