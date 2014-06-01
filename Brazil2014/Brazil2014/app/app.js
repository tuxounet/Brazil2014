var appClass = function () {
    var self = this;


    self.F7 = null;
    self.mainView = null;


    self.initalize = function () {
        self.F7 = new Framework7({
            // Default title for modals
            modalTitle: 'Brazil 2014',
            swipePanel: 'left',
            ajaxLinks:"a.ajax",
            // If it is webapp, we can enable hash navigation:
            pushState: true,

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
        // Expose Internal DOM library
        var $$ = Framework7.$;
        // Events for specific pages when it initialized
        $$(document).on('pageInit', self.onPageInit);

        //Construction du view model
        self.VM = new AppVMClass();
        //Binding du viewmodel général
        self.VM.bind();


    }

    self.navigate = function (target) {
        self.mainView.loadPage(target);

    }

    self.onPageInit = function (e) {
        
        var targetClass = e.detail.page.name + "_PageClass";
        if (eval("typeof " + targetClass + " == 'undefined'") == false) {
            //Instanciation de la page          
            var instance = eval("new " + targetClass + "()");
            //Binding KO
            instance.bind(e.detail.page.container);
        }




    }










}