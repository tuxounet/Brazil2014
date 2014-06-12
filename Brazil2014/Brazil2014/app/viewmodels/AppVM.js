var AppVMClass = function () {
    var self = this;

    self.bind = function () {
        //Branchement du ViewModel
        ko.applyBindings(self, document.body);

    };


    self.unbind = function () {
        
        ko.cleanNode(document.body);
    }


    self.showLogs = function () {
        Brazil.showLogs();
    };


    self.restart = function () {
        self.isLoading = ko.observable(true);
        Brazil.restart();
        self.isLoading = ko.observable(false);
    };


    self.syncAllDatas = function () {

    //Reinitialisation de la base
        Brazil.storage.createIfNotExists(function () {
           
            //Remplisaage initial
            Brazil.storage.fillFromServer(true);
        })

        
    }   
    
    


    self.onTabChanged = function () {
        debugger;
    }

}