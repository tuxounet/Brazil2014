
window.Brazil = {

    router: null,
    app: null,
    storage: null,
    connectivity: new connectivity(),
    start: function () {

        //Branchement du systeme d'erreur
        window.onerror = Brazil.onerror;

        Brazil.run(function () {

            //Indique que le chargement est terminé
            Brazil.started();
        });

    },

    /* Lancement pur de l'application */
    run: function (callback) {

        //Tracage du contexte
        if (boot.isPhoneGap)
            logger.log("Mode PhoneGap");
        else
            logger.log("Mode Web");


        //Initalisation des libs
        moment.lang("fr");

        Brazil.app = new appClass();
        Brazil.app.initalize();

        logger.log("Navigation");

        Brazil.load(function () {
            if (navigator.splashscreen)
                navigator.splashscreen.hide();
            if (callback) callback();
        });


    },

    started: function () {


        Brazil.app.started();
    },


    restart: function () {

        location.hash = "";
        window.location.reload();

    },


    fetchInto: function (pageUrl, target) {
        $.ajax({
            url: pageUrl,
            async: false
        }).done(function (Result) {
            $(target).append(Result);
        })
    },


    load: function (callback) {

        //Initialisation de la couche de données une fois l'application démarrée
        Brazil.storage = new LocalStorageClass();
        Brazil.storage.createIfNotExists(function (returnCode) {
            //Initialisation terminée, on analyse le code de retour 

            var initial = false;
            if (returnCode != "OK") {
                initial = true;
            }

            if (Brazil.connectivity.isOnline() == true) {

                //Rafrachissement initial des données
                Brazil.storage.fillFromServer(true, null, function () {
                    //Alimentation effectuée, démarrage
                    logger.info("Chargement des données terminée");
                    if (callback) callback();
                });
            } else {
                logger.info("Chargement des données terminée");
                if (callback) callback();
            }
        });





    },

    fatal: function () {
        $(".kernelLoader .loader").hide();
        $(".kernelLoader .restart").show();
        logger.error("L'application est arrêtée, veuillez redemarrer");
    },

    showLogs: function () {
        Brazil.app.F7.popup('.popup-logs');
    },

    onerror: function (e) {
        var message = "Erreur : ";
        if (typeof (e) == "object") {
            if (e.status != null && e.statusText != null) {
                //Erreur AJAX 
                message = "Erreur réseau : " + e.statusText + "(" + e.status + ")";
            }
            else {
                try {
                    message = "Erreur : " + JSON.stringify(e);
                } catch (e) {
                    message = "Erreur : " + e;
                }

            }
        }
        else {
            message = "Erreur : " + e;
        }
        logger.error(message);
        alert(message);
        //On masque l'indictauer de chargement
        if (Brazil.app != null && Brazil.app.F7 != null)
            Brazil.app.F7.hideIndicator();

    }
};

