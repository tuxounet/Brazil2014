var VideoDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Video");

    var self = this;

    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Video", cacheFirst, callback);
    }

    self.fetchItem = function (id, cacheFirst, callback) {
        self.getItem(id, "/api/Video/" + id, cacheFirst, callback);
    };
}