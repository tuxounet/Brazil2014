function secondsToString(seconds) {
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

    var ret = "";

    if (numyears > 0)
        ret += numyears + " années ";
    if (numdays > 0)
        ret += numdays + " jours ";
    if (numhours > 0)
        ret += numhours + " heures ";
    if (numminutes > 0)
        ret += numminutes + " minutes ";
    if (ret == "")
        ret = "quelques secondes"
    return ret;
}

function daysToString(days)
{
    if (days == 0)
        return "Aujourd'hui";
    if (days > 0) {
        return "dans " + days + " jours";
    }
    else {
        if (days == -1)
            return "hier";
        if (days > -5)
            return moment().subtract(days * -1, "days").format("dddd");
        return moment().subtract(days * -1, "days").calendar();        
    }

   

}