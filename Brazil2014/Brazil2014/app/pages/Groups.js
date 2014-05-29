var groups_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;

    self.groups = ko.observableArray();
    self.isLoading = ko.observable(true);

    self.load = function (uriParameters) {
        self.refresh(self.loadCompleted);
    };

    self.unload = function () {

    };


    self.refresh = function (callback) {
        var useCache = typeof (callback) == "function";
        self.isLoading(true);
        self.loading();


        new GroupDataProvider().fetchDatas(useCache, function (result) {
            self.groups(result);

            if (typeof (callback) == "function") callback();
            self.isLoading(false);
            self.loadCompleted();
        });

    }



};
