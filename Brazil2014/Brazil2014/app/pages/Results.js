var results_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;


    self.swiper = null;
    self.groups = ko.observableArray();
    self.eighth = ko.observableArray();
    self.quarter = ko.observableArray();
    self.semi = ko.observableArray();
    self.final = ko.observableArray();

    self.load = function (uriParameters) {


        self.swiper = new Swiper('.swiper-container', {
            useCSS3Transforms : !boot.isLegacy,
            speed: 500,
            onSlideChangeStart: self.onSwiperSlideChangeStart
        });

        $(".tabs a", self.DOM).on('touchstart mousedown', self.onSwiperSliding);
        $(".tabs a", self.DOM).on("click", self.onSwiperTabClick);
        self.refresh(self.loadCompleted);
    };


    self.onSwiperSlideChangeStart = function () {
        $(".tabs .active", self.DOM).removeClass('active')
        $(".tabs a", self.DOM).eq(self.swiper.activeIndex).addClass('active')
    };


    self.onSwiperSliding = function (e) {
        e.preventDefault()
        $(".tabs .active", self.DOM).removeClass('active')
        $(this).addClass('active')
        self.swiper.swipeTo($(this).index())
    };

    self.onSwiperTabClick = function (e) {
        e.preventDefault()
    }
    self.unload = function () {

        $(".tabs a", self.DOM).off('touchstart mousedown', self.onSwiperSliding);
        $(".tabs a", self.DOM).off("click", self.onSwiperTabClick);
       

    };


    self.refresh = function (callback) {

        new MatchDataProvider().fetchItem("Groupe", false, function (result) {
            self.groups(result);
        });
        new MatchDataProvider().fetchItem("Huitièmes de finale", false, function (result) {
            self.eighth(result);
        });
        new MatchDataProvider().fetchItem("Quarts de finale", false, function (result) {
            self.quarter(result);
        }); new MatchDataProvider().fetchItem("Demi-finales", false, function (result) {
            self.semi(result);
        });
        new MatchDataProvider().fetchItem("Match pour la troisième place", false, function (result) {
            var list = [];

           list.push(result[0]);

            new MatchDataProvider().fetchItem("Finale", false, function (result) {
                list.push(result[0]);
                self.final(list);
            });
        });
        if (typeof (callback) == "function") callback();
    }


};

