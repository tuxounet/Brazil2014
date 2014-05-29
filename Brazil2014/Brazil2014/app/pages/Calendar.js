/// <reference path="Home.html" />
var calendar_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;


    self.groupedMatches = ko.observableArray();

    self.isLoading = ko.observable(true);
    self.swiper = null;
    self.load = function (uriParameters) {

        self.refresh(
            function () {        
                //Centrage sur la date du jour 
                var today = moment(moment().format("YYYY-MM-Do")).unix();
                var $daySlides = $(".swiper-slide.day-item");
                var allDays = []
                $daySlides.each(function (index, item) {
                    allDays.push($(item).data().id);
                }).promise().done(function () {

                    var firstDay = allDays[0];
                    var lastDay = allDays[allDays.length - 1];


                    var targetid = 0;
                    if (today <= firstDay) {
                        targetid = firstDay;

                    } else {
                        if (today >= lastDay) {
                            targetid = lastDay
                        }
                        else {
                            //Le plus proche 
                            var goal = today;
                            var closest = null;

                            $.each(allDays, function () {
                                if (closest == null || Math.abs(this - goal) < Math.abs(closest - goal) || this == goal) {
                                    closest = this;
                                }
                            });

                            if (closest == null)
                                targetid = firstDay;
                            else
                                targetid = Number(closest);

                        }

                    }
                    //recuperation de l'index 
                    var index = allDays.indexOf(targetid);
                    self.swiper.swipeTo(index);


                    self.loadCompleted();

                });



            });
    };

    self.hasDatas = ko.computed(function () {
        if (self.groupedMatches == null || self.groupedMatches() == null) {
            return false;
        }
        if (self.groupedMatches().length < 1) {
            return false;
        }
        return true;
    });




    self.unload = function () {

    };


    self.refresh = function (callback) {
        var useCache = typeof (callback) == "function";

        self.isLoading(true);
        self.loading();
        self.groupedMatches(null);
        new MatchDataProvider().fetchDatas(useCache, function (result) {
            self.groupedMatches(result);


            self.isLoading(false);
            self.loadCompleted();

            if (self.swiper != null) self.swiper.destroy();
            self.swiper = new Swiper('.swiper-container', {
                pagination: '.pagination',
                paginationClickable: false,
                useCSS3Transforms : !boot.isLegacy
            });




            if (typeof (callback) == "function") callback();



        });

    }
};

