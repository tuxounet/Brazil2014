var MatchDataProvider = function () {

    //Appel de la classe parente
    BaseDataProviderClass.call(this, "Match");


    var self = this;


    self.fetchDatas = function (cacheFirst, callback) {
        self.getDatas("/api/Match", cacheFirst, callback);
    }

    self.fetchItem = function (kind, cacheFirst, callback) {
        self.getDatas("/api/Match/?kind=" + encodeURI(kind), cacheFirst, callback);
    };



}