﻿
window.Brazil = {

    router: null,
    app: null,
    storage: null,
    start: function () {

        //Branchement du systeme d'erreur
        window.onerror = Brazil.onerror;

        //Initialisation de la couche de données
        Brazil.storage = new LocalStorageClass();
        Brazil.storage.createIfNotExists(function (returnCode) {
            //Initialisation terminée, on analyse le code de retour 
            if (returnCode != "OK") {
                //Le code de retour n'est pas "OK", alors le ontenu de la base de données a besoin d'etre initialisée
                Brazil.storage.fillFromServer(true, function () {
                    //Alimentation effectuée, démarrage
                    Brazil.run();
                });
            }
            else {
                //Le contenu de la base de données est a jour 
                Brazil.run();
            }
        });
    },

    /* Lancement pur de l'application */
    run: function () {

        //Tracage du contexte
        if (boot.isPhoneGap)
            logger.log("Mode PhoneGap");
        else
            logger.log("Mode Web");


        //Initalisation des libs
        moment.lang("fr");

        Brazil.app = new appClass();
        Brazil.app.initalize();



        //Id de la platefrome 
        platform.fetchInfos();



        logger.log("Navigation");



        //naivgation initiale
        if (location.hash != "") {
            Brazil.load();
        }
        else {
            //Navigation sur l'acceuil
            Brazil.load();
        }


    },


    restart: function () {

        location.hash = "";
        window.location.reload();

    },

    fetchPage: function (pageUrl) {
        $.ajax({
            url: pageUrl,
            async: false
        }).done(function (Result) {
            $("#pageTemplates").append(Result);
        })
    },



    fetchWidget: function (widgetUrl) {
        $.ajax({
            url: widgetUrl,
            async: false
        }).done(function (Result) {
            $("#widgetTemplates").append(Result);
        })
    },

    fetchTemplate: function (templateUrl) {

        $.ajax({
            url: templateUrl,
            async: false
        }).done(function (Result) {
            $("#templates").append(Result);
        })
    },



    fetchInto: function (pageUrl, target) {
        $.ajax({
            url: pageUrl,
            async: false
        }).done(function (Result) {
            $(target).append(Result);
        })
    },


    load: function () {

        //Départ différé pour afficher correctement le splash
        setTimeout(function () {
            if (boot.isLegacy == false) {
                var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',// Saf 6, Android Browser
                    'MozTransition': 'transitionend',      // only for FF < 15
                    'transition': 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
                };
                transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

                $(".kernelLoader").on(transEndEventName, function (e) {
                    $(".kernelLoader").off(transEndEventName);
                    $(e.target).hide();

                });

                //Affichage du loader
                $(".kernelLoader").css("opacity", 0);
            }
            else {
                $(".kernelLoader").hide();

                //Affichage du loader
                $(".kernelLoader").css("opacity", 0);

            }

        }, 1000);


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

    }
};

