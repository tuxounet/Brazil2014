/// <reference path="../vendor/jquery-2.1.0.intellisense.js" />
/// <reference path="../vendor/jquery-2.1.0.min.js" />
function BasePage() {
    var self = this;

    self.DOM = null;
    self.isLoaded = ko.observable(false);

    /* Gestion des widgets */
    self.widgets = [];

    function loadWidgets() {
        //Chargement des widgets
        var $widgetList = $("div[data-type='widget']", self.DOM);

        $widgetList.each(function (index, item) {

            var $item = $(item);
            var widgetName = $item.data().widget;

            //Ajout du markup 

            var widgetMarkup = $("#widget_" + widgetName);
            if (widgetMarkup.length == 0) {
                logger.error("Le markup de widget " + widgetName + " n'est pas définie ou n'est pas correctement incorporé");
                return;
            }

            $item.html(widgetMarkup.html());

            var className = "widget_" + widgetName + "Class";

            //Pas de classe, rendu html pur
            if (eval("typeof(" + className + ") === 'undefined'") == true) {
                return;
            }

            //Instanciation de la classe
            var widgetClass = eval("new " + className + "()");
            widgetClass.bind($item[0]);

            //Ajout a la liste
            self.widgets.push(widgetClass);
        });


    }

    function unloadWidgets() {
        for (var i = 0; i < self.widgets.length; i++) {
            var item = self.widgets[i];
            item.unbind();
        }

    }

    self.goBack = function () {
        Brazil.router.goBack();
    }


    self.bind = function (domObject, datas) {
        self.DOM = domObject;

        self.loading();

        try {          
            //Branchement du ViewModel
            ko.applyBindings(self, self.DOM);

        } catch (e) {
            logger.error(e);
            return; 
        }

        if (self.load != null)
            self.load(datas);


    }




    self.unbind = function () {
        unloadWidgets();

        ko.cleanNode(self.DOM);

    }

    self.loading = function () {

        var $loader = null;
        $loader = $(".page-loading", self.DOM);


        //Affichage        
        $loader.removeClass("page-loading-invisible");
        $loader.addClass("page-loading-visible");
        $loader.show();
    }

    self.loadCompleted = function () {
        self.isLoaded(true);


    }

    self.unloading = function () {
        $(".content-container", self.DOM).removeClass("page-loaded");
        self.isLoaded(false);

    };

    self.pageFaulted = function () {
        logger.error("Page en erreur non gerée");
    }
}