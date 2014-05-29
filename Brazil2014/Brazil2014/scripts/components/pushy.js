/*! Pushy - v0.9.1 - 2013-9-16
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */


var PushyClass = function (domElement) {
    var self = this;

    self.DOM = domElement;

    var pushy = $('.pushy'), //menu css class
         body = $('body'),
         container = $('#container', self.DOM), //container css class
         push = $('.push', self.DOM), //css class to add pushy capability
         siteOverlay = $('.site-overlay', self.DOM), //site overlay
         pushyClass = "pushy-left pushy-open", //menu position & menu open class
         pushyActiveClass = "pushy-active", //css class to toggle site overlay
         containerClass = "container-push", //container open class
         pushClass = "push-push", //css class to add pushy capability
         menuBtn = $('.menu-btn, .pushy a', self.DOM), //css classes to toggle the menu
         menuSpeed = 200, //jQuery fallback menu speed
         menuWidth = pushy.width() + "px"; //jQuery fallback menu width

    self.state = false;
    function togglePushy() {
        body.toggleClass(pushyActiveClass); //toggle site overlay
        pushy.toggleClass(pushyClass);
        container.toggleClass(containerClass);
        push.toggleClass(pushClass); //css class to add pushy capability
    }

    function openPushyFallback() {
        body.addClass(pushyActiveClass);
        pushy.animate({ left: "0px" }, menuSpeed);
        container.animate({ left: menuWidth }, menuSpeed);
        push.animate({ left: menuWidth }, menuSpeed); //css class to add pushy capability
    }

    function closePushyFallback() {
        body.removeClass(pushyActiveClass);
        pushy.animate({ left: "-" + menuWidth }, menuSpeed);
        container.animate({ left: "0px" }, menuSpeed);
        push.animate({ left: "0px" }, menuSpeed); //css class to add pushy capability
    }

    function legacy_menuBtnClick() {
        if (self.state) {
            openPushyFallback();
            self.state = false;
        } else {
            closePushyFallback();
            self.state = true;
        }

    }
    function legacy_siteOverlay() {
        if (self.state) {
            openPushyFallback();
            self.state = false;
        } else {
            closePushyFallback();
            self.state = true;
        }

    }

    self.toggle = function () {
        if (boot.isLegacy) {
            legacy_menuBtnClick();
        }
        else {
            togglePushy();
        }


    }

    self.build = function () {
        if (boot.isLegacy) {
            //jQuery fallback
            pushy.css({ left: "-" + menuWidth }); //hide menu by default
            container.css({ "overflow-x": "hidden" }); //fixes IE scrollbar issue

            //keep track of menu state (open/close)
            self.state = true;

            //toggle menu
            menuBtn.on("click", legacy_menuBtnClick);

            //close menu when clicking site overlay
            siteOverlay.on("click", legacy_siteOverlay);
        } else {
            //toggle menu
            menuBtn.on("click", togglePushy);
            //close menu when clicking site overlay
            siteOverlay.on("click", togglePushy);
        }

    }

    self.destroy = function () {
        if (boot.isLegacy) {
            //toggle menu
            menuBtn.off("click", legacy_menuBtnClick);

            //close menu when clicking site overlay
            siteOverlay.off("click", legacy_siteOverlay);
        } else {
            //toggle menu
            menuBtn.off("click", togglePushy);
            //close menu when clicking site overlay
            siteOverlay.off("click", togglePushy);
        }
    }
}
