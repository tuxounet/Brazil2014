/// <reference path="../../app/services/appClient.js" />
window.Brazil = {

    router: null,
    app : null, 
    start: function () {

        window.onerror = Brazil.onerror;

       
        Brazil.app = new appClass();
        Brazil.app.initalize();

   
        moment.lang("fr");

        if (boot.isPhoneGap)
            logger.log("Mode PhoneGap");
        else
            logger.log("Mode Web");

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

