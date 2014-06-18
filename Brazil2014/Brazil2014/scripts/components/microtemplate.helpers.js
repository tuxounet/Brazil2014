window.mth_getTeamImage = function (val) {
    var result = "unknow";
    if (val == null || val.length == 0) {
        result = "unknow";
    }
    else {
        if (val[0] == '[') {
            result = "unknow";
        }
        else {
            result = val;
        }
    }
    return "../../contents/datas/teams/" + result + ".png";

}


window.mth_getMatchHour = function (date, hour) {

    var today = moment().format("YYYY-MM-DD");
    var matchDate = moment(date).format("YYYY-MM-DD");
    if (today == matchDate) {
        return moment(hour + 'Z', 'HH:mm:ssZ').format('HH:mm');
    }
    else {
        return moment(hour + 'Z', 'HH:mm:ssZ').format('HH:mm') + "<br/>" + moment(date).format("DD MMM");
    }


}

window.mth_getMatchPastDate = function (date, hour) {

    var today = moment().format("YYYY-MM-DD");
    var matchDate = moment(date).format("YYYY-MM-DD");
    if (today == matchDate) {
        return "";
    }
    else {
        return moment(date).format("DD MMM") + "<br/>";
    }


}