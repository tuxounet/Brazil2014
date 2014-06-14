var videos_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;
    self.videos = ko.observableArray();
    self.hasDatas = ko.computed(function () {
        
        if (self.videos == null || self.videos() == null) {
            return false;
        }
        if (self.videos().length < 1) {
            return false;
        }
        return true;
    });

    

    self.load = function (uriParameters) {
        
        new VideoDataProvider().getVideos(
            function (videos) {
                //Récuperation des videos OK
                self.videos(videos);
                self.loadCompleted();
                

            },
            function (tx, err) {
                self.loadCompleted();
                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de charger la liste des vidéos");
                    Brazil.app.mainView.goBack();
                }
            });
    };

    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        logger.info("REFRESH QUERY")
    }
};



