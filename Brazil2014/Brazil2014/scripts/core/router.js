//Router basé sur le hashchange
var routerClass = function (sliderSelector) {



    //Initialisation des variables
    this.currentPage = null;
    this.sliderSelector = sliderSelector;
    this.initialized = null;
    this.inAnimation = 23;
    this.outAnimation = 24;

    var stateHistory = [];


    //Intialize le router
    this.initialize = function (callback) {
        //Si le router est déja initialisée 
        if (this.initialized) return;
        stateHistory = [];
        //Branchement sur l'evement de changement de hash du navigateur
        $(window).on('hashchange', this.route);

        this.initialized = true;

    };

    //Arrete le router
    this.destroy = function () {
        //Si le router n'est pas initialisé, sortie
        if (!this.initialized) return;

        //DéBranchement sur l'evement de changement de hash du navigateur
        $(window).off('hashchange', this.route);

        //Vidage des variables
        this.slider = null;
        this.currentPage = null;
        stateHistory = [];
    };


    //Au changement de hash operé sur le navigateur
    this.route = function (event, callback) {
        var page,
            hash = window.location.hash,
            param;

        if (hash == "") {
            //Pas de hash ? on ne fait rien
            return;
        }

        //Avec parametres ?
        if (hash.indexOf("/") != -1) {
            //Extration des données
            param = hash.substr(hash.indexOf("/") + 1, hash.length);
            hash = hash.substr(0, hash.indexOf("/"));
        }
        else {
            //Non, sans parametres
            param = null;
        }

        //reccherche par id, pages statiques 
        var content = $(hash + "_page").html();
        if (content != null) {
            page = content;
        }
        else {
            //On ne trouve pas le contenut
            throw "La page " + hash + " est introuvable ou n'est pas correctement incorporée";
        }


        //Dechargement de la page courante
        Brazil.router.unloadCurrent(function () {

            var $target = $(page);

            var anim = Brazil.router.inAnimation;

            var l = stateHistory.length, state = window.location.hash;

            if (state === stateHistory[l - 2]) {
                stateHistory.pop();
                anim = Brazil.router.outAnimation;
            } else {
                stateHistory.push(state);
                anim = Brazil.router.inAnimation;
            }


            PageTransitions.slidePage($target, anim,
                function () {

                    //On tente d'initialiser la nouvelle page
                    if (eval("typeof " + hash.substring(1, hash.length) + "_PageClass === 'undefined'") == false) {
                        var pageInstance = eval("new " + hash.substring(1, hash.length) + "_PageClass()");

                        Brazil.router.currentPage = pageInstance;
                        if (pageInstance == null) {
                            Brazil.router.currentPage = new BasePage();
                            Brazil.router.currentPage.DOM = $target[0];
                            Brazil.router.currentPage.loadCompleted();
                        }
                        else {

                            //Binding de la page sur la cible
                            if (pageInstance.bind) {
                                pageInstance.bind($target[0]);
                            }
                            else {
                                Brazil.router.currentPage.DOM = $target[0];
                            }

                            //Chargement de la page
                            if (pageInstance.load) {
                                //départ différé du chargement effectif
                                setTimeout(function () {
                                    pageInstance.load(param);
                                }, 10);

                            }
                            else { Brazil.router.currentPage.loadCompleted(); }
                        }

                    } else {
                        Brazil.router.currentPage = new BasePage();
                        Brazil.router.currentPage.DOM = $target[0];
                        Brazil.router.currentPage.loadCompleted();

                    }
                },
                function () {
                    //Tacking de la nav               
                    if (typeof (ga) != 'undefined') {
                        ga('send', 'event', 'Navigation', 'Navigated', window.location.hash);
                    }

                    if (callback) callback();
                });


        });
    };


    this.unloadCurrent = function (callback) {

        //Si il y a déja une page en cours et qu'elle possede un destructeur => On la détruit
        if (Brazil.router.currentPage != null && Brazil.router.currentPage.unload != null) {
            if (Brazil.router.currentPage.unloading)
                Brazil.router.currentPage.unloading();

            Brazil.router.currentPage.unload();



        }


        //On reinitialise la notion de "page courante"
        Brazil.router.currentPage = null;

        if (callback) callback();

    };



    //Navigue sur le hash demandé
    this.navigate = function (hash, force, callback) {
        if (window.location.hash != hash) {
            window.location.hash = hash;

            if (callback) callback();
        }
        else {
            if (this.currentPage == null) {
                force = true;
            }

        }
        if (force) {
            if (this.currentPage == null) {
                this.route(null, function () {
                    if (callback) callback();
                });
            }
        }
    };



    //Va sur la page précédente du navigateur 
    this.goBack = function () {
        window.history.back();
    };

};

