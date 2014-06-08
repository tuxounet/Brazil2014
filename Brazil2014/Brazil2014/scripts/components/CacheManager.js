var CacheManagerClass = function () {
    var self = this;
    self.WebSQLMode = Modernizr.websqldatabase;

    self.initializeCache = function (callback) {

        

        //Vérification de la disponibilité de WebSQL
        if (self.WebSQLMode == false) {
            //Pas besoin d'initialisation, utilisation du localStorage
            logger.warn("Mode Legacy");
            if (callback) callback();
            return;
        }

        //Creation/Ouverture de la base WebSQL
        getDatabase(function (db) {
            logger.log("Database initialisée")
            if (callback) callback();

        });

    };




    self.storeInCache = function (key, datas, callback) {
        if (self.WebSQLMode == false) {
            //Mode legacy, récuperation depuis le localstorage
            var value = localStorage.getItem(key);
            if (callback) callback(value);
            return;
        }

        getDatabase(function (db) {
            db.transaction(function (tx) {

                tx.executeSql('INSERT OR REPLACE INTO CacheItems (key, value) VALUES (?, ?)', [key, datas], function (tx) {
                    //Données mises en cache
                    if (callback) callback();

                });

            }, onWebSQLError);
        });


    };


    self.loadFromCache = function (key, callback) {
        if (self.WebSQLMode == false) {
            //Mode legacy, récuperation depuis le localstorage
            var value = localStorage.getItem(key);
            if (callback) callback(value);
            return;
        }

        //Recuperation depuis la base webSQL 
        getDatabase(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM CacheItems WHERE key =?', [key], function (tx, results) {
                    //Lecture des valeurs avant retour a l'applelant 
                    if (results.rows.length == 0) {
                        //Pas de données 
                        if (callback) callback(null);
                        return;
                    }
                    else {
                        if (callback) callback(results.rows.item(0).value);
                        return;
                    }
                });

            }, onWebSQLError);
        });

    };



    self.clearCache = function (callback) {


    }


    /* Méthodes privées */
    function getDatabase(callback) {
        var db = null;

        var dbSize = 5 * 1024 * 1024; // 5MB
        var isSupported = openDatabase == null ? false : true;
        var dbName = "BrazilCacheDB";
        var currentVersion = "1.0";
        var dbDescripttion = "Brazil2014/CacheDB"

        var db = openDatabase(dbName, currentVersion, dbDescripttion, dbSize);
        //Creation de la structure
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS CacheItems (key unique, value)');

        }, onWebSQLError, function () {

            //Retour de la base de données à l'applealnt 
            if (callback) callback(db);

        });

    }


    function onWebSQLError(e) {
        console.error(e);
    }

}
