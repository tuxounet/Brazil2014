window.mth_getTeamImage = function(val) {
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