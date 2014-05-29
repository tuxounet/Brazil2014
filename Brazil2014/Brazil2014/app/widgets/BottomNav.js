var widget_BottomNavClass = function () {


    //Heritage de la page de base
    BaseWidget.call(this)


    var self = this;

    self.items = ko.observableArray();

    self.load = function () {
        self.items.push({ target: "#calendar", image: "contents/images/footer-calendar.png", title: "Calendrier", isActive: window.location.hash == "#calendar" });
        self.items.push({ target: "#results", image: "contents/images/footer-results.png", title: "Résultats", isActive: window.location.hash == "#results" });
        self.items.push({ target: "#videos", image: "contents/images/footer-videos.png", title: "Vidéos", isActive: window.location.hash == "#videos" });

    }


}