$(document).ready(function() {

    const urlParams = new URLSearchParams(window.location.search);

    paramNames = [
        ['from', 'value'],
        ['via', 'value'],
        ['to', 'value'],
        ['date', 'value'],
        ['time', 'value'],
        ['timeRole', 'radio']
    ];
    let params = {};
    for (let i = 0; i < paramNames.length; i++) {
        let currentParam = paramNames[i];
        let name = currentParam[0];
        let value = urlParams.get(name);
        if (value) {
            params[name] = value;
        }

        if (currentParam[1] === 'value') {
            $('#journeyPlannerParams input[id="' + name + '"]').attr('value', value);
        } else if (currentParam[1] === 'radio') {
            $('#journeyPlannerParams input[id="' + value + '"]').prop('checked', true);
        }
    }

    console.log(params); //debug

});