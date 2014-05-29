var NewsDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "News");


    var self = this;


    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/News", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/News/" + id, cacheFirst, callback);

    };



}