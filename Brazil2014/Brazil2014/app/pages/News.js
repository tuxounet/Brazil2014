var news_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;


    self.isLoading = ko.observable(false);

    self.news = ko.observableArray();

    self.load = function (uriParameters) {
        self.isLoading(true);

        self.refresh(self.loadCompleted);


    };

    self.unload = function () {


    };


    self.refresh = function (callback) {
        var useCache = typeof (callback) == "function";
        self.isLoading(true);
        self.loading();


        new NewsDataProvider().fetchDatas(useCache, function (result) {
            self.news(result);

            if (typeof (callback) == "function") callback();
            self.isLoading(false);
            self.loadCompleted();
        });

    }


};

