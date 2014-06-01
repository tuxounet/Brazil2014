
window.home_PageClass = function () {

    //Heritage de la page de base
    BasePage.call(this)

    var self = this;

    self.load = function (uriParameters) {
          
        
        self.loadCompleted();   

    };

    self.unload = function () {
   
    };
  
};

