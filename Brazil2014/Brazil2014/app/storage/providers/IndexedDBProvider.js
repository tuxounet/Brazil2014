/// <reference path="IndexedDBProvider.init.js" />
var IndexedDBProviderClass = function () {
    var self = this;

    /*Nom du provider*/
    self.name = "IndexedDB";

    /*Initialise le référentiel de données*/
    self.createIfNotExists = function (callback) {
        //Instancation de l'initer 
        var initer = new IndexedDBProviderInitClass();
        initer.performInit(callback);        
    }



}