var StadiumDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Stadium");


    var self = this;


    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Stadium", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/Stadium", cacheFirst, callback);

    };



}