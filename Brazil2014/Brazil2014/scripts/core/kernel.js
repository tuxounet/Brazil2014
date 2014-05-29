﻿/// <reference path="../../app/services/appClient.js" />
window.Brazil = {

    router: new routerClass("#container"),

    start: function () {

        window.onerror = Brazil.onerror;

        FastClick.attach(document.body);


        //Router 
        Brazil.router
        Brazil.router.initialize();

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
            Brazil.router.navigate("#home");
            Brazil.load();
        }
        else {
            //Navigation sur l'acceuil
            Brazil.router.navigate("#home");
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
        $(".kernelLoader").show();
        $(".kernelLoader").css("opacity", 1);
        $(".kernelLoader .loader").hide();
        $(".kernelLoader ._core_hidelogs").show();
    },

    hideLogs: function () {
        $(".kernelLoader").css("opacity", 0);
        $(".kernelLoader").hide();
        $(".kernelLoader .loader").show();
        $(".kernelLoader ._core_hidelogs").hide();

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

        //Mise en mode erreur de la page
        if (Brazil.router.currentPage != null && Brazil.router.currentPage.pageFaulted !=null)
        {
            Brazil.router.currentPage.pageFaulted();
        }
        
       
        Brazil.router.goBack();
    }
};
