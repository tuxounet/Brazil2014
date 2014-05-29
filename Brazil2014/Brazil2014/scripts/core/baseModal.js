function BaseModal() {
    var self = this;

    self.DOM = null;
    self.isLoaded = ko.observable(false);



    self.bind = function (domObject) {
        self.DOM = domObject;

        //Branchement du ViewModel
        ko.applyBindings(self, self.DOM);
    }


    self.unbind = function () {
        ko.cleanNode(self.DOM);

    }


}