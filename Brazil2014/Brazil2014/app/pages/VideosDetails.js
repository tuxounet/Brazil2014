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
     
        new VideoDataProvider().fetchItem(datas.id, true, function (result) {

            if (result == null) {
                Brazil.onerror("Impossible de trouver la vidéo demandé");
                
                return;
            }
            self.video(result);
            self.title(result.Title);
            self.link(result.VideoLink);
            self.loadCompleted();            
        });

        
   };

    self.resize = function () {
        if (window.innerHeight > window.innerWidth) {
            //Landscape 
            
        }
        else {
            //portrait 
              
        }

    };

    self.unload = function () {

    };
};

