var _Dev_PageClass = function () {

   //Heritage de la page de base
    BasePage.call(this)

    var self = this;

    self.swiper = null;


    self.load = function (uriParameters) {

        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: true,
            useCSS3Transforms: !boot.isLegacy
        })

        //self.swiper = new Swiper($('.swiper-container', self.DOM)[0], {
        //    scrollContainer: true,
        //    mousewheelControl: true,
        //    mode: 'vertical',
        //    //Enable Scrollbar
        //    scrollbar: {
        //        container: $('.swiper-scrollbar', self.DOM)[0],
        //        hide: true,
        //        draggable: false
        //    }
        //})

        self.loadCompleted();
        
    };

    self.unload = function () {
      
    };
};

