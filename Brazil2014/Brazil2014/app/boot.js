var boot = {

    isPhoneGap: false,
    isLegacy: false,
    config: {
        remoteUrl: "",
        debug: true
    },

    // Application Constructor
    initialize: function () {
        if (LudivineVersion != null)
            logger.info("Brazil " + LudivineVersion);
        else
            logger.warn("Brazil (Version non spécifiée)");

        logger.log("Bâti sur le socle Ludivine 14.2 ((c) Christophe Tiraoui 2014)")
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {


        if (window.location.origin != "http://localhost:8080") {
            boot.isPhoneGap = true;
            //Mode phoneGap
            document.addEventListener('deviceready', this.onDeviceReady, false);

        }
        else {
            //Mode web
            boot.isPhoneGap = false;
            boot.startup();
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        logger.log("Device ready");
        document.addEventListener("pause", boot.onPause, false);
        document.addEventListener("resume", boot.onResume, false);
        document.addEventListener("backbutton", boot.onBackButton, false);
        document.addEventListener("menubutton", boot.onMenuButton, false);
        boot.startup();
    },


    onPause: function () {
        logger.log("App Paused");


    },
    onResume: function () {
        logger.log("App Resume");

    },

    onBackButton : function(){
        logger.log("BackButton");
    
    },
    onMenuButton : function(){
        logger.log("Menu button");

    },

    loadConfig: function () {

        logger.log("Chargement de la config...");
        if (config == null) {
            logger.error("Configuration introuvable");
            Brazil.fatal();
            return;
        }
        boot.config = config;
        logger.log("Config chargée " + JSON.stringify(config));

    },

    //Processus de démarrage
    startup: function () {
        logger.log("Démarrage");

        boot.loadConfig();

        Brazil.start();
    }

};