var resultsDetails_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;



    self.load = function (uriParameters) {

        setTimeout(function () {
            self.loadCompleted();
        }, 3000);
    };

    self.unload = function () {

    };
};

