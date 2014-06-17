var newsDetails_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)
    
    var self = this;
    self.news = ko.observable();
    self.link = ko.observable();
    
    self.load = function (uriParameters) {

        new NewsDataProvider().getNewsById(uriParameters.id,
            function (item) {
                
                
                self.news(item);
                self.link(item.Content);
                self.loadCompleted();


            },
            function (tx, err) {
                self.loadCompleted();
                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de charger l'actualité");
                    Brazil.app.mainView.goBack();
                }
            });
    };

    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        Brazil.storage.fillEntityFromServer("News", function () { self.reload() });
    }


};

