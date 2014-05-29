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
    self.load = function (uriParameters) {
        self.groupName(uriParameters);
        self.refresh(self.loadCompleted);



    };

    self.unload = function () {

    };


    self.refresh = function (callback) {

        var useCache = typeof (callback) == "function";
        self.isLoading(true);
        self.loading();


        new GroupDetailDataProvider(self.groupName()).fetchItem(false, function (result) {
            self.group(result);

            if (typeof (callback) == "function") callback();
            self.isLoading(false);
            self.loadCompleted();
        });     
    };

    var parentFault = self.pageFaulted;
    self.pageFaulted = function () {

        //Suppression de l'entrée du cache
        new GroupDetailDataProvider(self.groupName()).clearCache();

        //Appel au parent 
        parentFault();
    }

};

