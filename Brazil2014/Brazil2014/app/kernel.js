
window.Brazil = {

    router: null,
    app: null,
    storage: null,
    start: function () {

        //Branchement du systeme d'erreur
        window.onerror = Brazil.onerror;

        Brazil.run(function () {

            //Initialisation de la couche de données une fois l'application démarrée
            Brazil.storage = new LocalStorageClass();
            Brazil.storage.createIfNotExists(function (returnCode) {
                //Initialisation terminée, on analyse le code de retour 
                if (returnCode != "OK") {
                    //Le code de retour n'est pas "OK", alors le ontenu de la base de données a besoin d'etre initialisée
                    Brazil.storage.fillFromServer(true, function () {
                        //Alimentation effectuée, démarrage
                        logger.info("Chargement des données terminée");
                    });
                }
            });

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

        //naivgation initiale
        if (location.hash != "") {
            Brazil.load(callback);
        }
        else {
            //Navigation sur l'acceuil
            Brazil.load(callback);
        }


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

        //Départ différé pour afficher correctement le splash
        setTimeout(function () {

            if (navigator.splashscreen)
                navigator.splashscreen.hide();

            if (callback) callback();

        }, 2000);


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

