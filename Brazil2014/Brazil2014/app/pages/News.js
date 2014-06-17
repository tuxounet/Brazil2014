var news_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)
    var self = this;
    self.news = ko.observableArray();
    self.hasDatas = ko.computed(function () {

        if (self.news == null || self.news() == null) {
            return false;
        }
        if (self.news().length < 1) {
            return false;
        }
        return true;
    });



    self.load = function (uriParameters) {

        new NewsDataProvider().getNews(
            function (news) {
                //Récuperation des videos OK
                self.news(news);
                self.loadCompleted();


            },
            function (tx, err) {
                self.loadCompleted();
                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de charger la liste des news");
                    Brazil.app.mainView.goBack();
                }
            });
    };
    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        Brazil.storage.fillEntityFromServer("News", function () { self.load() });
    }


};

