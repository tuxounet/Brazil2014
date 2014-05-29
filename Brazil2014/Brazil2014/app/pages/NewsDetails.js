var newsDetails_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;
        
    self.news = ko.observable();

    self.load = function (uriParameters) {

        new NewsDataProvider().fetchItem(uriParameters, true, function (result) {           
            self.news(result);                   
            self.loadCompleted();
        });
    };

    self.unload = function () {
     
    };

};

