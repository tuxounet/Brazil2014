var widget_OffMenuClass = function () {


    //Heritage de la page de base
    BaseWidget.call(this)


    var self = this;

    self.pushy = null;

    self.showLogs = function () {
        Brazil.showLogs();
    };


    self.restart = function () {
        self.isLoading = ko.observable(true);
        Brazil.restart();
        self.isLoading = ko.observable(false);
    };


    self.load = function () {
        var $page = $(self.DOM).closest(".page");

        self.pushy = new PushyClass($page);
        self.pushy.build();


        //Application de la classe active en fonction de la page 
        var currentPage = window.location.hash;
        $("a[href='" + currentPage + "']", self.DOM).addClass("active");

        //swipe
        $(".page").swipe({
          
            swipeRight: function (event, direction, distance, duration, fingerCount) {
                logger.log("swipe right");
              
                if (self.pushy.state == false) {
                    self.pushy.toggle();
                }
            },
            swipeLeft: function (event, direction, distance, duration, fingerCount) {
                logger.log("swipe Left");
                if (self.pushy.state == true) {
                    self.pushy.toggle();
                }
            },
            threshold: 100
        });

    };


   


    self.unload = function () {
        self.pushy.destroy();



    };

}