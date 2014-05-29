/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
window.ModalEffects =
    {

        currentModalId: null,
        clickableOverlay: true,

        showOverlay: function () {
           
            var $overlay = $(".md-overlay");
            $overlay.css("visibility", "visible");
            $overlay.css("opacity", "0.8");
        


        },

        hideOverlay: function () {
            var $overlay = $(".md-overlay");
            $overlay.css("opacity", "0");
            $overlay.css("visibility", "hidden");
        },



        showModal: function () {
            
            var modal = document.getElementById(ModalEffects.currentModalId);
            $("#" + ModalEffects.currentModalId).addClass("md-show");
       
            var close = modal.querySelector('.md-close');
            if (close != null)
                close.addEventListener('click', ModalEffects.closeHandler);

            if (ModalEffects.clickableOverlay == true) {
                var overlay = document.querySelector('.md-overlay');
                overlay.addEventListener('click', ModalEffects.removeModalHandler);

            }
            ModalEffects.showOverlay();
        },

        hideModal: function () {
            var modal = document.getElementById(ModalEffects.currentModalId);
            classie.remove(modal, 'md-show');

            var close = modal.querySelector('.md-close');
            if (close != null)
                close.removeEventListener('click', ModalEffects.closeHandler);

            if (ModalEffects.clickableOverlay == true) {
                var overlay = document.querySelector('.md-overlay');
                overlay.removeEventListener('click', ModalEffects.removeModalHandler);
            }
            ModalEffects.currentModalId = null;
            ModalEffects.hideOverlay();
        },



        closeHandler: function (ev) {
            ev.stopPropagation();
            ModalEffects.removeModalHandler();
        },

        removeModalHandler: function () {
            ModalEffects.hideModal();

        },


        showEffectModal: function (id, clickableOverlay) {
            if (clickableOverlay != null)
                ModalEffects.clickableOverlay = clickableOverlay;

            ModalEffects.currentModalId = id;
            ModalEffects.showModal();
        }




    };




