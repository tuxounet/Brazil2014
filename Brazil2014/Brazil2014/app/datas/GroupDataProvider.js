var GroupDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Group");
    
    var self = this;

    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Group", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/Group/" + id, cacheFirst, callback);
    };
}