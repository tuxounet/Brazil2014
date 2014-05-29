// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () { };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

window.logger = {
    debug: true,
    messages: [],
  

    
    log: function (message) {
        if (logger.debug == true) {
            console.log(message);
            logger.messages.push({ Level: "LOG", Message: message });
            if (document.getElementById("_core-debug") != null)
                document.getElementById("_core-debug").innerHTML += "<strong>LOG</strong>&nbsp;<span>" + message + "</span><br/>";
        }
    },
    info: function (message) {

        console.info(message);
        logger.messages.push({ Level: "INFO", Message: message });
       
        if (logger.debug == true) {
            if (document.getElementById("_core-debug") != null)
                document.getElementById("_core-debug").innerHTML += "<strong>INFO</strong>&nbsp;<span>" + message + "</span><br/>";
        }
    
    },
    warn: function (message) {
        console.warn(message);
        logger.messages.push({ Level: "WARN", Message: message });
       
        if (logger.debug) {
            if (document.getElementById("_core-debug") != null)
                document.getElementById("_core-debug").innerHTML += "<strong>WARN</strong>&nbsp;<span style='color:purple'>" + message + "</span><br/>";
        }
       
    },
    error: function (message) {
        console.error(message);
        logger.messages.push({ Level: "ERROR", Message: message });
     
        if (logger.debug) {
            if (document.getElementById("_core-debug") != null)
                document.getElementById("_core-debug").innerHTML += "<strong>ERROR</strong>&nbsp;<span style='color:red'>" + message + "</span><br/>";
        }
     
    },
    clear: function () {

        logger.messages = [];
    }
}