/// <reference path="Home.html" />
window.calendar_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;


    self.isLoading = ko.observable(true);



    self.slider = null;
    self.matchTemplate = null;

    self.load = function (uriParameters) {

        //Recuperation du slider 
        self.slider = $$('.calendar-days-container')[0].f7Slider;

        new MatchDataProvider().getMatchDates(
           function (dates) {

               //Generation du slider par date
               var daysTmpl = tmpl("calendar_day_tmpl");
               var result = "";
               for (var i = 0; i < dates.length; i++) {
                   var item = dates[i];
                   result += daysTmpl(dates[i]);
               }
               //Ajout du résultat au dom 
               $(".calendar-days-wrapper", self.DOM).html(result);

               //Remplissage des matchs
               for (var i = 0; i < dates.length; i++) {
                   var item = dates[i].Date;
                   self.fetMatches(item);
               }


               //Mise a jour des slides et de la pagination après injection
               self.slider.updateSlides();
               self.slider.updatePagination();

               //Navigation vers la slide la plus proche du jour
               var nearest = self.getNearsetSlide();
               self.slider.slideTo(nearest);

               self.loadCompleted();

           },
           function (tx, err) {
               self.loadCompleted();
               if (err != null) {
                   logger.error(err);
                   //Erreur de récuperation de stade
                   Brazil.onerror("Impossible de charger la liste des matchs");
                   Brazil.app.mainView.goBack();
               }
           });
    };


    self.getNearsetSlide = function () {

        var allSlides = $(".calendar-days-wrapper .slider-slide", self.DOM);
        var allDays = [];
        for (var i = 0; i < allSlides.length; i++) {
            var id = $(allSlides[i]).data().id;
            allDays.push(id);
        }


        var today = moment(moment().format("YYYY-MM-Do")).unix();
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
        return allDays.indexOf(targetid);


    }

    self.fetMatches = function (date) {



        //Compilation du template de match
        if (self.matchTemplate == null) self.matchTemplate = tmpl("MatchTemplate");

        var dateUnix = moment(date).unix();
      
        new MatchDataProvider().getMatchAtDate(date,
          function (matchs) {
              var ret = "";

              //Templating des matcgs
              for (var i = 0; i < matchs.length; i++) {
                  var item = matchs[i];
                  ret += self.matchTemplate(matchs[i]);
              }

              //Ajout du markup au DOM 
              $(".calendar-days-wrapper .slider-slide[data-id=" + dateUnix + "] .matchs", self.DOM).html(ret);


          },
          function (err) {
              if (err != null) {
                  logger.error(err);
              }
          });

    };

    self.unload = function () {
        logger.info("UNLOAD QUERY")
    };


    self.refresh = function () {
        logger.info("REFRESH QUERY")
    }

};

