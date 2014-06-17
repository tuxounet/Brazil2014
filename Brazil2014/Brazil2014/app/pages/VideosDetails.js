window.videosDetails_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;
    self.video = ko.observable();
    self.title = ko.observable();
    self.link = ko.observable();
    self.videoWidth = ko.observable("100%");
    self.videoHeight = ko.observable("100%");
    self.load = function (datas) {

        var videoId = datas.id;

        new VideoDataProvider().getVideo(videoId,
            function (video) {
                //Récupération du stade OK

                self.title(video.Title);
                self.link(video.VideoLink);
                self.loadCompleted();

            },
            function (err) {
                if (err != null) {
                    logger.error(err);
                    //Erreur de récuperation de stade
                    Brazil.onerror("Impossible de trouver la vidéo demandée");
                    Brazil.app.mainView.goBack();
                }
            });


    };


    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        Brazil.storage.fillEntityFromServer("Videos", function () { self.load() });
    }
};

