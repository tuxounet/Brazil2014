ko.bindingHandlers.trimLengthText = {};
ko.bindingHandlers.trimText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var trimmedText = ko.computed(function () {
            var untrimmedText = ko.utils.unwrapObservable(valueAccessor());
            var defaultMaxLength = 20;
            var minLength = 5;
            var maxLength = ko.utils.unwrapObservable(allBindingsAccessor().trimTextLength) || defaultMaxLength;
            if (maxLength < minLength) maxLength = minLength;
            var text = untrimmedText.length > maxLength ? untrimmedText.substring(0, maxLength - 1) + '...' : untrimmedText;
            return text;
        });
        ko.applyBindingsToNode(element, {
            text: trimmedText
        }, viewModel);

        return {
            controlsDescendantBindings: true
        };
    }
};



ko.bindingHandlers.teamBinding = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        var val = valueAccessor();
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
        ko.applyBindingsToNode(element, {
            attr: {
                width: 32,
                src: "../../contents/datas/teams/" + result + ".png"
            }
        }, viewModel);

        return {
            controlsDescendantBindings: true
        };
    }
};




ko.bindingHandlers.stadiumBinding = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        debugger;
        ko.applyBindingsToNode(element, {
            attr: {      
                src: "../../contents/datas/stadiums/" + valueAccessor() + ".jpg"
            }
        }, viewModel);

        return {
            controlsDescendantBindings: true
        };
    }
};