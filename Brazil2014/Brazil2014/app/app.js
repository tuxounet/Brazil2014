var appClass = function () {
    var self = this;


    self.F7 = null;
    self.mainView = null;
    self.currentPage = null;


    self.onPreparePage = function (content, url) {
        logger.log(url);
        return content;
    };


    self.navigate = function (target) {
        self.mainView.loadPage(target);

    }



    self.onPageInit = function (e) {
        logger.log("PAGE INIT:" + e.detail.page.url);
        //gestion du bottom app bar 
        var targetUrl = e.detail.page.url;
        $(".bz-bottomNav a").removeClass("active");
        $(".bz-bottomNav a[href='" + targetUrl + "']").addClass("active");



    }

    self.onPageTransitionEnded = function (e) {

        var pageInstance = ko.dataFor(e.detail.page.container);


        if (pageInstance instanceof AppVMClass) {
            //La page est bindée sur le model générél
            //Instanciation de la page
            var targetClass = e.detail.page.name + "_PageClass";
            if (eval("typeof " + targetClass + " == 'undefined'") == false) {
                //Instanciation de la page          
                self.currentPage = eval("new " + targetClass + "()");

                if (self.currentPage.bind != null) {
                    //Binding KnockOut
                    self.currentPage.bind(e.detail.page.container, e.detail.page.query);
                }


            }
            else {
                self.currentPage = null;
            }
        }
        else {
            //La page est déja bindée
            self.currentPage = pageInstance;
        }



    }



    self.invokeOnPage = function (functionName) {
        if (self.currentPage == null) {
            logger.warn("Aucune instance de page associée");
            return;
        }

        var func = self.currentPage[functionName];
        if (func == null || typeof func != 'function') {
            logger.warn("Invocation non autorisée");
            return
        }

        func();


    }



    self.initalize = function () {

        //Généralisation du selecteur F7
        window.$$ = Framework7.$;


        self.F7 = new Framework7({
            // Default title for modals
            modalTitle: 'Brazil 2014',
            swipePanel: 'left',
            swipeBackPage: false,
            // If it is webapp, we can enable hash navigation:
            pushState: false,
            preprocess: self.onPreparePage,
            // Hide and show indicator during ajax requests
            onAjaxStart: function (xhr) {
                self.F7.showIndicator();
            },
            onAjaxComplete: function (xhr) {
                self.F7.hideIndicator();
            }
        });



        self.mainView = self.F7.addView('.view-main', {
            // Enable Dynamic Navbar for this view
            dynamicNavbar: true
        });
        self.mainView.hideNavbar();
        self.mainView.hideToolbar();
        self.F7.showIndicator();

        // Expose Internal DOM library
        var $$ = Framework7.$;
        // Events for specific pages when it initialized
        $$(document).on('pageInit', self.onPageInit);
        $$(document).on('pageAfterAnimation', self.onPageTransitionEnded);
        //Construction du view model
        self.VM = new AppVMClass();
        //Binding du viewmodel général
        self.VM.bind();


    }

    self.started = function () {
     
        $(".bz-bottomNav").show();
        $(".navbar").show();
        self.mainView.showNavbar();
        self.mainView.showToolbar();
        self.F7.hideIndicator();


    };






}