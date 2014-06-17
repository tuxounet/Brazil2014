/// <reference path="../vendor/jquery-2.1.0.intellisense.js" />
/// <reference path="../vendor/jquery-2.1.0.min.js" />
function BasePage() {
    var self = this;

    self.DOM = null;
    self.isLoaded = ko.observable(false);
    self.uriDatas  = null; 
    self.bind = function (domObject, datas) {


        self.DOM = domObject;
        self.uriDatas = datas; 
        self.loading();

        try {
            //Branchement du ViewModel
            ko.applyBindings(self, self.DOM);

        } catch (e) {
            logger.error(e);
            return;
        }

        if (self.load != null) {
            //Affichage de l'indicateur de chargement 
            Brazil.app.F7.showIndicator();

            //Chargement de la page 
            self.load(datas);
        }



    }
    self.reload = function () {

        if (self.load)
        {
            self.load(self.uriDatas);
        }
    }
    self.unbind = function () {
    
        ko.cleanNode(self.DOM);

    }

    self.loading = function () {
        self.isLoaded(false);
        //On masque l'indictauer de chargement
        Brazil.app.F7.showIndicator();        
    }

    self.loadCompleted = function () {
        self.isLoaded(true);
        //On masque l'indictauer de chargement
        Brazil.app.F7.hideIndicator(); 
    }

    self.unloading = function () {
        self.isLoaded(false);
    };

    self.pageFaulted = function () {
        logger.error("Page en erreur non gerée");
    }
}