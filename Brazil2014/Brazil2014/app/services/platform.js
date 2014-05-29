


var platform = {


    deviceInfos: null,

    fetchInfos: function () {
        logger.log("Collecte de l'identifiant du terminal");

        if (boot.isPhoneGap) {
            platform.deviceInfos = {
                UUID: device.uuid,
                Model: device.model,
                Platform: device.platform,
                PlatformVersion: device.version,
               
            };
        } else {
            platform.deviceInfos = {
                UUID: "WebBrowser",
                Model: "Navigateur Web",
                Platform: navigator.userAgent,
                PlatformVersion: "N/A",             
            };
        }

    },


    deviceId: function () {
        
        if (boot.isPhoneGap)
        { return device.uuid; }
        else { return "WebBrowser"; }

    },


    deviceName: function () {
        return platform.deviceInfos.Model;
        
    }







}