var GroupDetailDataProvider = function (groupName) {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "GroupDetail-" + groupName);

    var self = this;

    self.fetchItem = function (cacheFirst, callback) {
        self.getDatas("/api/GroupDetail/" + groupName, cacheFirst, callback);
    };
}