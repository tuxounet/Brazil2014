/// <reference path="../vendor/jquery-2.1.0.intellisense.js" />
/// <reference path="../vendor/jquery-2.1.0.min.js" />
function BaseWidget() {
    var self = this;

    self.DOM = null;

    self.bind = function (domObject) {
        self.DOM = domObject;
     
        //Branchement du ViewModel
        ko.applyBindings(self, self.DOM);
        
        if (self.load)
        {
            self.load();
        }
        
    }

    self.unbind = function () {
        if (self.unload)
        {
            self.unload();
        }

        ko.cleanNode(self.DOM);

    }
}