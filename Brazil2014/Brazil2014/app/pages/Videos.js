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

    self.isLoading = ko.observable(true);


    self.load = function (uriParameters) {

        self.refresh(self.loadCompleted);

    };

    self.unload = function () {

    };



    self.refresh = function (callback) {
        
        self.isLoading(true);
        var useCache = typeof (callback) == "function";
        self.loading();
        new VideoDataProvider().fetchDatas(useCache, function (result) {
            self.videos(result);
            if (typeof (callback) == "function") callback();
            self.loadCompleted();
            self.isLoading(false);
        });

    }
};



